import { Injectable } from "@angular/core";
import { DataHelperModule } from "./providers/data-helper.module";

@Injectable({
  providedIn: "root",
})
export class AppService {
  public dataPreset: any[] = [];
  public fileSelected : any;
  public presetLink = "./assets/preset/";
  constructor(
    public helper: DataHelperModule,
  ) {
    
  }
  public dialogClose(): void {
    this.helper.isContentsDailogShow = false;
    this.addHiddenFromElements();

    // 印刷ウィンドウの変数をリセット
    this.resetPrintdialog();
  }

  // 印刷ウィンドウの変数をリセット
  public resetPrintdialog(): void {

  }

  public addHiddenFromElements(): void {
    this.addHiddenFromClass(".panel-element-content-container");
    this.addHiddenFromClass("#my_dock_manager");
    this.addHiddenFromClass(".dialog-floating");
  }

  private addHiddenFromClass(selector: string): void {
    const element = document.querySelector(selector);
    if (element) {
      element.classList.add("hidden");
    }
  }
}
