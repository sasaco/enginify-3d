import { Component, HostListener, Inject, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "../../app.component";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { WaitDialogComponent } from "../wait-dialog/wait-dialog.component";

import * as FileSaver from "file-saver";

import { InputDataService } from "../../providers/input-data.service";
import { ThreeService } from "../three/three.service";

import { DataHelperModule } from "src/app/providers/data-helper.module";
import { SceneService } from "../three/scene.service";
import { UserInfoService } from "src/app/providers/user-info.service";
import { LanguagesService } from "src/app/providers/languages.service";
import { ElectronService } from "src/app/providers/electron.service";
import { TranslateService } from "@ngx-translate/core";
import packageJson from '../../../../package.json';

import { MenuService } from "./menu.service";
import { AppService } from "src/app/app.service";
import { Router } from "@angular/router";
import { PresetService } from "../preset/preset.service";
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService, MsalBroadcastService } from "@azure/msal-angular";
import { EventMessage, InteractionStatus, EventType, RedirectRequest, AuthenticationResult, AccountInfo, SsoSilentRequest, PopupRequest, PromptValue, IdTokenClaims } from "@azure/msal-browser";
import { Subject } from "rxjs";
import { takeUntil, filter } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IPC_MESSAGES } from "electron/login/constants";

type IdTokenClaimsWithPolicyId = IdTokenClaims & {
  acr?: string,
  tfp?: string,
};

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss", "../../app.component.scss"],
})
export class MenuComponent implements OnInit {
  loginUserName: string;
  public version: string;
  public userProfile: any | null = null;
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private app: AppComponent,
    private scene: SceneService,
    private helper: DataHelperModule,
    private InputData: InputDataService,
    private http: HttpClient,
    private three: ThreeService,
    public user: UserInfoService,
    public language: LanguagesService,
    public electronService: ElectronService,
    private translate: TranslateService,
    public menuService: MenuService,
    public appService: AppService,
    public presetService: PresetService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {
    this.menuService.fileName = "";
    this.three.fileName = "";
    this.version = packageJson.version;
  }

  async ngOnInit() {
    this.menuService.fileName = "";
    this.three.fileName = "";

    this.helper.isContentsDailogShow = false;
    this.menuService.setDimension(2);

    if (this.electronService.isElectron) {
      this.electronService.ipcRenderer.on(IPC_MESSAGES.GET_PROFILE, (event, listClaims) => {
        const profile = {
          uid: listClaims.find(item => item.claim === "sub")?.value,
          email: listClaims.find(item => item.claim === "emails")?.value[0],
          givenName: listClaims.find(item => item.claim === "given_name")?.value,
          surname: listClaims.find(item => item.claim === "family_name")?.value
        };
        if (profile.uid) {
          this.setUserProfile(profile)
        } else {
          this.openFile()
        }
      })
    } else {
      this.isIframe = window !== window.parent && !window.opener;
      this.setLoginDisplay();

      this.authService.instance.enableAccountStorageEvents();
      this.msalBroadcastService.msalSubject$
        .pipe(
          filter(
            (msg: EventMessage) =>
              msg.eventType === EventType.ACCOUNT_ADDED ||
              msg.eventType === EventType.ACCOUNT_REMOVED
          )
        )
        .subscribe((result: EventMessage) => {
          if (this.authService.instance.getAllAccounts().length === 0) {
            window.location.pathname = "/";
          } else {
            this.setLoginDisplay();
          }
        });

      this.msalBroadcastService.inProgress$
        .pipe(
          filter((status: InteractionStatus) => status === InteractionStatus.None),
          takeUntil(this._destroying$)
        )
        .subscribe(() => {
          this.setLoginDisplay();
          this.checkAndSetActiveAccount();
          if (this.loginDisplay) {
            const listClaims = this.getClaims(this.authService.instance.getActiveAccount()?.idTokenClaims as Record<string, any>);
            const profile = {
              uid: listClaims.find(item => item.claim === "sub")?.value,
              email: listClaims.find(item => item.claim === "emails")?.value[0],
              givenName: listClaims.find(item => item.claim === "given_name")?.value,
              surname: listClaims.find(item => item.claim === "family_name")?.value
            };
            this.setUserProfile(profile)
          }
        })

      this.msalBroadcastService.msalSubject$
        .pipe(
          filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS
            || msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
            || msg.eventType === EventType.SSO_SILENT_SUCCESS),
          takeUntil(this._destroying$)
        )
        .subscribe(async (result: EventMessage) => {

          let payload = result.payload as AuthenticationResult;
          let idtoken = payload.idTokenClaims as IdTokenClaimsWithPolicyId;

          if (idtoken.acr === environment.b2cPolicies.names.signUpSignIn || idtoken.tfp === environment.b2cPolicies.names.signUpSignIn) {
            this.authService.instance.setActiveAccount(payload.account);
          }


          if (idtoken.acr === environment.b2cPolicies.names.resetPassword || idtoken.tfp === environment.b2cPolicies.names.resetPassword) {
            let signUpSignInFlowRequest: RedirectRequest | PopupRequest = {
              authority: environment.b2cPolicies.authorities.signUpSignIn.authority,
              scopes: [...environment.apiConfig.scopes],
              prompt: PromptValue.LOGIN 
            };

            await this.login(signUpSignInFlowRequest, true);
          }

          return result;
        });

      this.msalBroadcastService.msalSubject$
        .pipe(
          filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_FAILURE || msg.eventType === EventType.ACQUIRE_TOKEN_FAILURE),
          takeUntil(this._destroying$)
        )
        .subscribe(async (result: EventMessage) => {
          if (result.error && result.error.message.indexOf('AADB2C90118') > -1) {
            let resetPasswordFlowRequest: RedirectRequest | PopupRequest = {
              authority: environment.b2cPolicies.authorities.resetPassword.authority,
              scopes: [],
            };

            await this.login(resetPasswordFlowRequest, true);
          };
        });
    }
  }

  getClaims(claims: Record<string, any>) {
    const listClaims = []
    if (claims) {
      Object.entries(claims).forEach((claim: [string, unknown], index: number) => {
        listClaims.push({ id: index, claim: claim[0], value: claim[1] });
      });
    }
    return listClaims;
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  checkAndSetActiveAccount() {
    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  setUserProfile(profile: any) {
    const isOpenFirst = window.sessionStorage.getItem("openStart");
    if (isOpenFirst === "1" || isOpenFirst === null) {
      this.router.navigate([{ outlets: { startOutlet: ["start"] } }]);
      window.sessionStorage.setItem("openStart", "0");
    }
    const userProfile = {
      uid: profile.uid,
      email: profile.email,
      firstName: profile.givenName ?? "User",
      lastName: profile.surname ?? "",
    }
    this.user.setUserProfile(userProfile);
  }

  @HostListener("window:beforeunload", ["$event"])
  onBeforeUnload($event: BeforeUnloadEvent) {
    // if (!this.electronService.isElectron) {
    //   $event.returnValue =
    //     "Your work will be lost. Do you want to leave this site?";
    // }
  }

  @HostListener("document:keydown", ["$event"])
  onKeyDown(event: KeyboardEvent): void {
    //Check if Ctrl and S key are both pressed
    if (event.ctrlKey && (event.key === "S" || event.key === "s")) {
      event.preventDefault(); // Prevent default behavior of Ctrl + S
      // Perform your action here
      this.overWrite();
    }
  }
  public newWindow() {
    this.electronService.ipcRenderer.send("newWindow");
  }
  // 新規作成
  async renew(): Promise<void> {
    const isConfirm = await this.helper.confirm(
      this.translate.instant("window.confirm")
    );
    if (isConfirm) {
      this.app.dialogClose(); // 現在表示中の画面を閉じる
      // this.InputData.clear();
      // this.ResultData.clear();
      // this.PrintData.clear();
      // this.CustomFsecData.clear();
      // this.three.ClearData();
      // this.menuService.fileName = "";
      // this.three.fileName = "";
      // this.three.mode = "";

      // // "新規作成"のとき、印刷パネルのフラグをリセットする
      // this.printCustomFsecService.flg = undefined;
      this.menuService.renew();
    }
  }

  // Electron でファイルを開く
  open_electron() {
    const response = this.electronService.ipcRenderer.sendSync("open");

    if (response.status !== true) {
      this.helper.alert(
        "ファイルを開くことに失敗しました, status:" + response.status
      );
      return;
    }
    this.app.dialogClose(); // 現在表示中の画面を閉じる
    this.appService.addHiddenFromElements();
    this.InputData.clear();
    this.three.ClearData();
    // this.countArea.clear();
    const modalRef = this.modalService.open(WaitDialogComponent);

    this.menuService.fileName = response.path;
    this.three.fileName = response.path;
    this.app.dialogClose(); // 現在表示中の画面を閉じる
    const old = this.helper.dimension;

    // BOMを除去する
    const cleanText = this.removeBOM(response.text);
    const jsonData: {} = JSON.parse(cleanText);

    let resultData: {} = null;
    if ("result" in jsonData) {
      resultData = jsonData["result"];
      delete jsonData["result"];
    }
    this.InputData.loadInputData(jsonData); // データを読み込む
    if (old !== this.helper.dimension) {
      this.menuService.setDimension(this.helper.dimension);
    }
    this.three.fileload();
    modalRef.close();
  }

  private removeBOM(text) {
    if (text.charCodeAt(0) === 0xFEFF) {
      return text.slice(1);
    }
  return text;
  }

  // ファイルを開く
  open(evt) {
    this.appService.dialogClose(); // 現在表示中の画面を閉じる
    this.menuService.open(evt);
  }

  // 上書き保存
  // 上書き保存のメニューが表示されるのは electron のときだけ
  public overWrite(): void {
    if (this.menuService.fileName === "") {
      this.save();
      return;
    }
    const inputJson: string = JSON.stringify(this.InputData.getInputJson());
    this.menuService.fileName = this.electronService.ipcRenderer.sendSync(
      "overWrite",
      this.menuService.fileName,
      inputJson
    );
  }

  // ファイルを保存
  save(): void {
    const inputJson: string = JSON.stringify(this.InputData.getInputJson());
    if (this.menuService.fileName.length === 0) {
      this.menuService.fileName = "EnginifyforJS.json";
      this.three.fileName = "EnginifyforJS.json";
    }
    if (this.helper.getExt(this.menuService.fileName) !== "json") {
      this.menuService.fileName += ".json";
    }
    // 保存する
    if (this.electronService.isElectron) {
      this.menuService.fileName = this.electronService.ipcRenderer.sendSync(
        "saveFile",
        this.menuService.fileName,
        inputJson,
        "json"
      );
    } else {
      const blob = new window.Blob([inputJson], { type: "text/plain" });
      FileSaver.saveAs(blob, this.menuService.fileName);
    }
  }

  // ピックアップファイル出力
  public pickup(): void {

  }

  // ログイン関係
  async login(userFlowRequest?: RedirectRequest | PopupRequest, ignoreAlert?: boolean) {
    if (this.electronService.isElectron) {
      this.electronService.ipcRenderer.send(IPC_MESSAGES.LOGIN);
    } else {

      //If you ignore the alert, it is considered as confirmation to leave the page.
      let isConfirm = false;
      if(ignoreAlert) isConfirm = true;
      else
      {
        isConfirm = await this.helper.confirm(
          this.translate.instant("menu.leave"),  this.translate.instant("window.leaveTitle"),
        );
      }

      if (!this.loginDisplay && isConfirm) {
        this.msalBroadcastService.inProgress$
        .pipe(
          filter(
            (status: InteractionStatus) => status === InteractionStatus.None
          )
        )
        .subscribe(async () => {
          if (this.msalGuardConfig.authRequest) {
            this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest, ...userFlowRequest } as RedirectRequest);
          } else {
            this.authService.loginRedirect(userFlowRequest);
          }
        });
      }
    }
  }

  async logout() {
    if (this.electronService.isElectron) {
      this.electronService.ipcRenderer.send(IPC_MESSAGES.LOGOUT);
      this.user.setUserProfile(null);
      window.sessionStorage.setItem("openStart", "1");
    } else {
      const isConfirm = await this.helper.confirm(
        this.translate.instant("menu.leave"),  this.translate.instant("window.leaveTitle"),
      );
      if(isConfirm){
        this.authService.instance
        .handleRedirectPromise()
        .then((tokenResponse) => {
          if (!tokenResponse) {
            this.user.setUserProfile(null);
            this.authService.logoutRedirect();
            window.sessionStorage.setItem("openStart", "1");
          } else {
            // Do something with the tokenResponse
          }
        })
        .catch((err) => {
          // Handle error
          console.error(err);
        });
      }
    }
  }

  logOut(): void {
    if (this.electronService.isElectron) {
      this.user.setUserProfile(null);
      window.sessionStorage.setItem("openStart", "1");
    } else {
      this.user.setUserProfile(null);
      window.sessionStorage.setItem("openStart", "1");
    }
  }

  //　印刷フロート画面用
  public dialogClose(): void {
    this.helper.isContentsDailogShow = false;
  }

  public preset(): void {
    this.helper.isContentsDailogShow = true;
  }

  public contentsDailogShow(id): void {
    this.deactiveButtons();
    document.getElementById(id).classList.add("active");
    this.helper.isContentsDailogShow = true;
  }

  // アクティブになっているボタンを全て非アクティブにする
  deactiveButtons() {
    for (let i = 0; i <= 13; i++) {
      const data = document.getElementById(i + "");
      if (data != null) {
        if (data.classList.contains("active")) {
          data.classList.remove("active");
        }
      }
    }
  }

  // テスト ---------------------------------------------
  private saveResult(text: string): void {
    const blob = new window.Blob([text], { type: "text/plain" });
    FileSaver.saveAs(blob, "frameWebResult.json");
  }


  public goToLink() {
    window.open("https://help-frameweb.malme.app/", "_blank");
  }

  openFile() {
    this.helper.isContentsDailogShow = false;
    this.appService.addHiddenFromElements();
    this.InputData.clear();
    this.three.ClearData();
    // this.countArea.clear();
    const modalRef = this.modalService.open(WaitDialogComponent);
    this.http.get('./assets/preset/サンプル（門型橋脚）.json', { responseType: 'text' }).subscribe(text => {
      this.menuService.fileName = 'サンプル（門型橋脚）.json';
      this.three.fileName = 'サンプル（門型橋脚）.json';
      const old = this.helper.dimension;
      const jsonData: {} = JSON.parse(text);
      let resultData: {} = null;
      if ("result" in jsonData) {
        resultData = jsonData["result"];
        delete jsonData["result"];
      }
      this.InputData.loadInputData(jsonData); // データを読み込む
      if (old !== this.helper.dimension) {
        this.setDimension(this.helper.dimension);
      }
      this.three.fileload();
      modalRef.close();
    });
  }

  public setDimension(dim: number = null) {
    this.scene.changeGui(this.helper.dimension);
    if (dim === null) {
      if (this.helper.dimension === 2) {
        this.helper.dimension = 3;
      } else {
        this.helper.dimension = 2;
      }
    } else {
      this.helper.dimension = dim;
    }
    this.app.dialogClose(); // 現在表示中の画面を閉じる
    this.scene.changeGui(this.helper.dimension);
  }

  handelClickChat() {
    const elementChat = document.getElementById("chatplusheader");
    console.log("elementChat", elementChat)
    elementChat.click()
  }
}
