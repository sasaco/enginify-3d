import { Component, OnInit, EventEmitter, Output, ViewChild, AfterViewInit, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { UserInfoService } from "./providers/user-info.service";

import { DataHelperModule } from "./providers/data-helper.module";
import { TranslateService } from "@ngx-translate/core";

import { SheetComponent } from "./components/input/sheet/sheet.component";
import { LanguagesService } from './providers/languages.service';
import { AppService } from "./app.service";
import { InputSourceService } from "./components/three/geometry/three-source.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, AfterViewInit {
  @Output() pagerEvent = new EventEmitter<number>();
  @ViewChild("grid") grid: SheetComponent;
  translateY: string = "translateY(0)";
  btnReac!: string;
  isToggled: Boolean = true;
  eventFromChild: number;
  mode: number = 0;

  constructor(
    private _router: Router,
    public helper: DataHelperModule,
    private translate: TranslateService,
    public user: UserInfoService,
    public language: LanguagesService,
    public appService: AppService,
    public source: InputSourceService
  ) {
    this.translate.setDefaultLang("ja");
    if(window.sessionStorage.getItem("openStart") === null) window.sessionStorage.setItem("openStart", "1")
  }
  ngAfterViewInit(): void {
    this.language.tranText();
  }

  ngOnInit() {
    this.helper.isContentsDailogShow = false;
  }

  onScroll(event): void {
    let scrollTop = event.srcElement.scrollTop;
    this.translateY = "translateY(-" + scrollTop + "px)";
    // Interpret the scroll event
    // Do stuff on inner div scroll
  }

  // 計算結果表示ボタンを無効にする
  public disableResultButton() {
  }

  public dialogClose(): void {
    this.appService.dialogClose();
  }

  public contentsDailogShow(id): void {
    this.deactiveButtons();
    document.getElementById(id).classList.add("active");
    this.changePosition();

    if (this.isSameURL(Number(id))) {
      this.toggleContentsDailogShow();
      this.toggleVisibilityOfElements();
    } else {
      this.removeHiddenFromElements();
      this.setContentsDailogShow(true);
    }
    this.mode = id;
  }

  private isSameURL(id: number): boolean {
    return id === this.mode;
  }

  private toggleContentsDailogShow(): void {
    this.helper.isContentsDailogShow = !this.helper.isContentsDailogShow;
  }

  private toggleVisibilityOfElements(): void {
    this.toggleElementVisibility(".panel-element-content-container");
    this.toggleElementVisibility("#my_dock_manager");
    this.toggleElementVisibility(".dialog-floating");
  }
  private toggleElementVisibility(selector: string): void {
    const element = document.querySelector(selector);
    if (element) {
      element.classList.toggle("hidden");
    }
  }
  private setContentsDailogShow(state: boolean): void {
    this.helper.isContentsDailogShow = state;
  }
  private removeHiddenFromElements(): void {
    this.removeHiddenFromClass(".panel-element-content-container");
    this.removeHiddenFromClass("#my_dock_manager");
    this.removeHiddenFromClass(".dialog-floating");
  }
  private removeHiddenFromClass(selector: string): void {
    const element = document.querySelector(selector);
    if (element) {
      element.classList.remove("hidden");
    }
  }
  // フローティングウィンドウの位置
  public dragPosition = { x: 0, y: 0 };
  public changePosition() {
    this.dragPosition = {
      x: this.dragPosition.x,
      y: this.dragPosition.y,
    };
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

  // contents-dialogの高さをウィンドウサイズに合わせる
  setDialogHeight() {
    setTimeout(function () {
      const dialog = document.getElementById("contents-dialog-id");
      // ヘッダ領域を取得
      const header = document.getElementsByClassName("header");
      const container = document.getElementsByClassName("container");
      const headerSize =
        container[0].clientHeight + header[0].clientHeight + 50;
      dialog.style.height = window.innerHeight - headerSize + "px";
      console.log("dialog height:" + dialog.style.height);
    }, 100);
  }

  public getDialogHeight(): number {
    const dialog = document.getElementById("contents-dialog-id");
    let dialogHeight = parseFloat(dialog.style.height); // ヘッダー高さを引く
    if (isNaN(dialogHeight)) {
      dialogHeight = window.innerHeight - 84; // メニューとヘッダー高さを引く
    } else {
      dialogHeight -= 80;
    }
    return dialogHeight;
  }

  public getPanelElementContentContainerHeight(): number {
    let dialog = (document.getElementsByClassName("panel-element-content-container"))[0];
    if (dialog instanceof HTMLElement) {
      let dialogHeight = parseFloat(dialog.style.height); // ヘッダー高さを引く
      if (isNaN(dialogHeight)) {
        dialogHeight = window.innerHeight - 84; // メニューとヘッダー高さを引く
      } else {
        dialogHeight -= 80;
      }
      return dialogHeight;
    }
    return 0;
  }

  toggle(): void {
    this.isToggled = !this.isToggled;
  }
  // 計算
  public async calcrate(): Promise<void> {
    /* ログインしないと計算できない処理を一時的にコメントアウト 
    const user = this.user.userProfile;
    if (!user) {
      this.helper.alert(this.translate.instant("menu.P_login"));
      return;
    }
    */
    await this.source.runCode();
  }


  onPagerEvent(eventData: number) {
    this.pagerEvent.emit(eventData);
  }
  onReceiveEventFromChild(event: number) {
    this.eventFromChild = event;
  }
}


