import { Injectable } from "@angular/core";
import { InputDataService } from "src/app/providers/input-data.service";
import { ThreeService } from "../three/three.service";

@Injectable({
  providedIn: "root",
})
export class MenuService {

  public fileName = "";

  constructor(
    private InputData: InputDataService,
    private three: ThreeService,
  ) { }

  // 新規作成
  async renew(): Promise<void> {
      this.InputData.clear();
      this.three.ClearData();
      this.fileName = "";
  
  }
  // ファイルを開く
  public open(evt){
    this.InputData.clear();
    this.three.ClearData();

    const file = evt.target.files[0];
    this.fileName =file.name;
    evt.target.value = "";
    this.fileToText(file)
      .then((text) => {
        const jsonData: {} = JSON.parse(text);
        this.openJson(jsonData); 
      })
      .catch((err) => {
        alert(err);
      });
  }

  // データを読み込む
  public openJson(jsonData: {}): void {
    this.InputData.loadInputData(jsonData); 
    this.three.loadInputData(this.InputData);
  }

  // ファイルからテキストを読み込む
  public fileToText(file): any {
    const reader = new FileReader();
    reader.readAsText(file);
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
    });
  }

  public getInputJson(): string {
    return JSON.stringify(this.InputData.getInputJson());
  }

  public getFileNameFromUrl(url) {
    return url.replace(/^.*[\\/]/, '')
  }

  public shortenFilename(filename: string, maxLength: number = 30) {
    let tempName = filename;
    tempName = this.getFileNameFromUrl(tempName);
    return tempName.length <= maxLength ? tempName : '...'+ tempName.slice(tempName.length - maxLength);
  }
}
