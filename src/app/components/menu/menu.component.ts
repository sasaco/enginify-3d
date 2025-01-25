import { Component, HostListener, Inject, OnInit } from "@angular/core";
import { AppComponent } from "../../app.component";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import * as FileSaver from "file-saver";

import { UserInfoService } from "src/app/providers/user-info.service";
import { ElectronService } from "src/app/providers/electron.service";
import packageJson from 'package.json';

import { MenuService } from "./menu.service";
import { Router } from "@angular/router";
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
  templateUrl: "./menu.component.html"
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
    private app: AppComponent,
    private http: HttpClient,
    public user: UserInfoService,
    public electronService: ElectronService,
    public menuService: MenuService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {
    this.version = packageJson.version;
  }

  async ngOnInit() {
    this.menuService.fileName = "";

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
          // ログインしていない場合
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

  private getClaims(claims: Record<string, any>) {
    const listClaims = []
    if (claims) {
      Object.entries(claims).forEach((claim: [string, unknown], index: number) => {
        listClaims.push({ id: index, claim: claim[0], value: claim[1] });
      });
    }
    return listClaims;
  }

  private setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  private checkAndSetActiveAccount() {
    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  private setUserProfile(profile: any) {
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


  @HostListener("document:keydown", ["$event"])
  onKeyDown(event: KeyboardEvent): void {
    //Check if Ctrl and S key are both pressed
    if (event.ctrlKey && (event.key === "S" || event.key === "s")) {
      event.preventDefault(); // Prevent default behavior of Ctrl + S
      // Perform your action here
      this.overWrite();
    }
  }

  // 新規作成
  public async renew(): Promise<void> {
    this.menuService.renew();
  }

  // Electron でファイルを開く
  public open_electron() {
    const response = this.electronService.ipcRenderer.sendSync("open");

    if (response.status !== true) {
      alert(
        "ファイルを開くことに失敗しました, status:" + response.status
      );
      return;
    }
    this.menuService.renew();
    this.menuService.fileName = response.path;

    // BOMを除去する
    const cleanText = this.removeBOM(response.text);
    const jsonData: {} = JSON.parse(cleanText);
    this.menuService.openJson(jsonData);
  }

  private removeBOM(text) {
    if (text.charCodeAt(0) === 0xFEFF) {
      return text.slice(1);
    }
    return text;
  }

  // ファイルを開く
  open(evt) {
    this.menuService.open(evt);
  }

  // 上書き保存
  // 上書き保存のメニューが表示されるのは electron のときだけ
  public overWrite(): void {
    if (this.menuService.fileName === "") {
      this.save();
      return;
    }
    const inputJson: string = this.menuService.getInputJson();
    this.menuService.fileName = this.electronService.ipcRenderer.sendSync(
      "overWrite",
      this.menuService.fileName,
      inputJson
    );
  }

  // ファイルを保存
  save(): void {
    const inputJson: string = this.menuService.getInputJson();
    if (this.menuService.fileName.length === 0) {
      this.menuService.fileName = "EnginifyforJS.json";
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


  // ログイン関係
  async login(userFlowRequest?: RedirectRequest | PopupRequest, ignoreAlert?: boolean) {
    if (this.electronService.isElectron) {
      this.electronService.ipcRenderer.send(IPC_MESSAGES.LOGIN);
    } else {

      //If you ignore the alert, it is considered as confirmation to leave the page.
      if (!this.loginDisplay) {
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


  // ヘルプ
  public goToLink() {
    window.open("https://help-frameweb.malme.app/", "_blank");
  }

  // チャットs
  public handelClickChat() {
    const elementChat = document.getElementById("chatplusheader");
    console.log("elementChat", elementChat)
    elementChat.click()
  }
}
