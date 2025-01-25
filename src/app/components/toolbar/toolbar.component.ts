import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { InputSourceService } from "../three/geometry/three-source.service";
import { ThreeService } from "../three/three.service";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html"
})
export class ToolbarComponent implements OnInit {
  
  isControlOpen: boolean = false;

  url: string =""

  constructor(
    private router: Router,
    private three: ThreeService,
    public source: InputSourceService
  ) { }

  ngOnInit() {
  }


  onToggleControl() {
    this.isControlOpen ? this.three.gui_close() : this.three.gui_open();
    this.isControlOpen = !this.isControlOpen;
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
}

