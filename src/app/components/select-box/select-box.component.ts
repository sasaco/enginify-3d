import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import * as webifc from 'web-ifc';


@Component({
  selector: 'app-select-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-box.component.html'
})
export class SelectBoxComponent {

  public table_item: { id: string; name: string; }[];

  constructor() { 
    /* webifcのすべてオブジェクトを確認
    Object.keys(webifc).forEach(key => {
      console.log(key);
    });
    */
    webifc.IFCREINFORCINGBAR
    this.table_item = [
      { id: "view port", name: "ビューポート" },

      { id: "IFCCOLUMN", name: "柱" },
      { id: "IFCBEAM", name: "梁" },
      // { id: "IFCBEARING", name: "軸受" },
      // { id: "IFCBUILDINGELEMENTPROXY", name: "建築要素プロキシ" },
      // { id: "IFCCHIMNEY", name: "煙突" },
      // { id: "IFCCOURSE", name: "コース" },
      // { id: "IFCCOVERING", name: "被覆" },
      // { id: "IFCCURTAINWALL", name: "カーテンウォール" },
      // { id: "IFCDEEPFOUNDATION", name: "深基礎" },
      // { id: "IFCDOOR", name: "ドア" },
      { id: "IFCEARTHWORKSELEMENT", name: "土工要素" },
      { id: "IFCFOOTING", name: "基礎" },
      // { id: "IFCKERB", name: "縁石" },
      // { id: "IFCMEMBER", name: "部材" },
      // { id: "IFCMOORINGDEVICE", name: "係留装置" },
      // { id: "IFCNAVIGATIONELEMENT", name: "案内要素" },
      // { id: "IFCPAVEMENT", name: "舗装" },
      // { id: "IFCPLATE", name: "板" },
      // { id: "IFCRAIL", name: "レール" },
      // { id: "IFCRAILING", name: "手すり" },
      // { id: "IFCRAMP", name: "スロープ" },
      // { id: "IFCRAMPFLIGHT", name: "ランプフライト" },
      // { id: "IFCROOF", name: "屋根" },
      // { id: "IFCSHADINGDEVICE", name: "日除け装置" },
      { id: "IFCSLAB", name: "スラブ" },
      // { id: "IFCSTAIR", name: "階段" },
      // { id: "IFCSTAIRFLIGHT", name: "階段フライト" },
      // { id: "IFCTRACKELEMENT", name: "軌道要素" },
      { id: "IFCWALL", name: "壁" },
      // { id: "IFCWINDOW", name: "窓" }
      { id: "IFCREINFORCINGBAR", name: "鉄筋" },
    ];
    
  }

  public selectItem(item: { id: number; name: string; }): void {
    console.log(item);
  }

}
