import { Injectable } from "@angular/core";
import { InputNodesService } from "../components/input/input-nodes/input-nodes.service";

import { SceneService } from "../components/three/scene.service";
import { DataHelperModule } from "./data-helper.module";
import { TranslateService } from "@ngx-translate/core";

import packageJson from '../../../package.json';

@Injectable({
  providedIn: "root",
})
export class InputDataService {
  constructor(
    private helper: DataHelperModule,
    public node: InputNodesService,
    private three: SceneService,
    private translate: TranslateService
  ) {
    this.clear();
  }
  public result: object;
  public getResult(jsonData): void {
    
    const result = jsonData;
    delete result['old_points'];
    delete result['deduct_points'];
    delete result['new_points'];

    this.result = result
  };
  // 初期値
  public code = `
    interface pt {
        x: number, y: number, z: number;
    }

    const gridSize = 6;

    let dir: pt =  { x: 0, y: 0, z: 1 };
    let rad: number = 0.25;
    let len: number = 2;
    let direction = ifcAPI.CreateIfcEntity(model,IFCDIRECTION, [ifcAPI.CreateIfcType(model,IFCREAL,dir.x), ifcAPI.CreateIfcType(model,IFCREAL,dir.y), ifcAPI.CreateIfcType(model,IFCREAL,dir.z)]);
    let profileLocation = ifcAPI.CreateIfcEntity(model,IFCCARTESIANPOINT, [ifcAPI.CreateIfcType(model,IFCLENGTHMEASURE,0), ifcAPI.CreateIfcType(model,IFCLENGTHMEASURE,0)]);
    let profileAxis = ifcAPI.CreateIfcEntity(model,IFCAXIS2PLACEMENT2D, profileLocation, null);
    let profile =  ifcAPI.CreateIfcEntity(model, IFCCIRCLEPROFILEDEF, IFC4.IfcProfileTypeEnum.AREA, ifcAPI.CreateIfcType(model,IFCLABEL,'column-prefab'), profileAxis, ifcAPI.CreateIfcType(model,IFCPOSITIVELENGTHMEASURE,rad));   

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
        
            let pos:pt = {x: i, y: j, z: 0};
       

            let location = ifcAPI.CreateIfcEntity(model,IFCCARTESIANPOINT, [ifcAPI.CreateIfcType(model,IFCLENGTHMEASURE,pos.x), ifcAPI.CreateIfcType(model,IFCLENGTHMEASURE,pos.y),ifcAPI.CreateIfcType(model,IFCLENGTHMEASURE,pos.z)]);
            let placement= ifcAPI.CreateIfcEntity(model, IFCAXIS2PLACEMENT3D, location, null, null);
            

            let solid = ifcAPI.CreateIfcEntity(model, IFCEXTRUDEDAREASOLID, profile, placement, direction, ifcAPI.CreateIfcType(model,IFCPOSITIVELENGTHMEASURE,len));

            let column = ifcAPI.CreateIfcEntity(model,IFCCOLUMN, ifcAPI.CreateIfcType(model, IFCGLOBALLYUNIQUEID,"GUID"), null,ifcAPI.CreateIfcType(model,IFCLABEL,"name"),null, ifcAPI.CreateIfcType(model,IFCLABEL,"label"),  placement, solid,ifcAPI.CreateIfcType(model,IFCIDENTIFIER,"sadf"), null);

            ifcAPI.WriteLine(model, column);
        }
    }
`;

  // データをクリアする ///////////////////////////////////////////////////////////////
  public clear(): void {
    this.node.clear();
    this.result = null
  }

  // ファイルを読み込む ///////////////////////////////////////////////////////////////
  public loadInputData(jsonData: object): void {
    this.clear();
    this.node.setNodeJson(jsonData);
    this.versionChecker(jsonData);

    if ("dimension" in jsonData) {
      this.helper.dimension = jsonData["dimension"] as number;
      this.helper.dimensionInit= jsonData["dimension"] as number;
    }
  }

  /// ファイルのバージョンによってはデータに手を加える必要がある
  private versionChecker(jsonData: object): void {

    /// ファイルのバージョンが 2.0.0 より前のデータの場合、軸が違うので変換する
    const programVer: string = packageJson.version;
    let filetVer: string = '0.0.0';
    if('ver' in jsonData)
      filetVer = jsonData['ver'] as string;

    if(!this.isOlder('2.0.0', filetVer)) {
      this.three.setSetting(jsonData);
      return;
    }

    // y軸, z軸の符号(+, -)を逆にする
    for(const n of this.node.node){
      let y = this.helper.toNumber(n.y);
      if ( y===null) y = 0;
      n.y = -1 * y;
      let z = this.helper.toNumber(n.z);
      if ( z===null) z = 0;
      n.z = -1 * z;
    }

  }

  // バージョン文字列比較処理
  private isOlder(a: string, b: string): boolean {
    if (a === b) return false;
    const aUnits = a.split(".");
    const bUnits = b.split(".");
    // 探索幅に従ってユニット毎に比較していく
    for (var i = 0; i < Math.min(aUnits.length, bUnits.length); i++) {
      if (parseInt(aUnits[i]) > parseInt(bUnits[i])) return true; // A > B
      if (parseInt(aUnits[i]) < parseInt(bUnits[i])) return false;  // A < B
    }
    return false;
  }

  // データを生成 /////////////////////////////////////////////////////////////////////
  // 計算サーバーに送信用データを生成
  public getCalcText(Properties = {}): string {
    const jsonData: {} = this.getInputJson(0);

    // パラメータを追加したい場合
    for (const key of Object.keys(Properties)) {
      jsonData[key] = Properties[key];
    }

    const result: string = JSON.stringify(jsonData);
    return result;
  }

  // ファイルに保存用データを生成
  public getInputJson(empty: number = null): object {
    // empty = null: ファイル保存時
    // empty = 0: 計算時
    // empty = 1: 印刷時
    let isPrint = false;
    if (empty === 1) {
      empty = null; // 印刷時 は 計算時と同じ
      isPrint = true;
    }

    const jsonData = {
      ver: packageJson.version
    };

    const node: {} = this.node.getNodeJson(empty);
    if (Object.keys(node).length > 0) {
      jsonData["node"] = node;
    } else if (empty === 0) {
      jsonData["node"] = {};
    }

    // 解析するモードの場合
    if (empty === 0) {
      const error = this.checkError(jsonData);
      if (error !== null) {
        jsonData["error"] = error;
        return jsonData;
      }

      if (this.helper.dimension === 2) {
        this.create2Ddata(jsonData);
      }
    }

    if (!isPrint) {
      jsonData["dimension"] = this.helper.dimension;
    }

    return jsonData;
  }

  public create2Ddata(jsonData: any) {
    // ここに、２次元モードで作成したデータを３次元データとして
    // 成立する形に修正する

    // Set_Node のセクション
    for (const n of Object.keys(jsonData.node)) {
      const node = jsonData.node[n];
      node["z"] = 0;
    }
    // Set_Member のセクション
    for (const m of Object.keys(jsonData.member)) {
      const member = jsonData.member[m];
      member["cg"] = 0;
    }
    // Set_Element のセクション
    for (const type of Object.keys(jsonData.element)) {
      for (const row of Object.keys(jsonData.element[type])) {
        const element = jsonData.element[type][row];
        element["G"] = 1;
        element["J"] = 1;
        element["Iy"] = 1;
      }
    }
    // Set_Joint のセクション
    if ("joint" in jsonData) {
      for (const type of Object.keys(jsonData.joint)) {
        for (const row of Object.keys(jsonData.joint[type])) {
          const joint = jsonData.joint[type][row];
          joint["xi"] = 1;
          joint["xj"] = 1;
          joint["yi"] = 1;
          joint["yj"] = 1;
        }
      }
    }

    // Set_Load のセクション
    const fn = {};
    if ("load" in jsonData) {
      for (const icase of Object.keys(jsonData.load)) {
        if ("load_node" in jsonData.load[icase]) {
          for (const load_node of jsonData.load[icase].load_node) {
            load_node["tz"] = 0;
            load_node["rx"] = 0;
            load_node["ry"] = 0;
          }
        }
        const key = jsonData.load[icase].fix_node;
        fn[key] = [];
      }
    }
    // Set_FixNode のセクション
    if (!("fix_node" in jsonData)) {
      jsonData["fix_node"] = fn;
    }
    for (const n of Object.keys(jsonData.node)) {
      for (const type of Object.keys(jsonData.fix_node)) {
        const target = jsonData.fix_node[type];

        if (target.find((e) => e.n === n) === undefined) {
          target.push({ n, tz: 1, rx: 1, ry: 1 });
        } else {
          for (const fix_node of target) {
            fix_node["tz"] = 1;
            fix_node["rx"] = 1;
            fix_node["ry"] = 1;
          }
        }
      }
    }

    // Set_FixMember のセクション
    if ("fix_member" in jsonData) {
      for (const type of Object.keys(jsonData.fix_member)) {
        for (const fix_member of jsonData.fix_member[type]) {
          fix_member["tz"] = 0;
          fix_member["tr"] = 0;
        }
      }
    }
  }

  private checkError(jsonData: object): string {
    // 存在しない節点を使っているかチェックする
    if (!("node" in jsonData)) {
      return this.translate.instant("providers.input-data.node_nodata");
    }
    const nodes: object = jsonData["node"] as object;
    if (Object.keys(nodes).length <= 0) {
      return this.translate.instant("providers.input-data.node_nodata");
    }

    if (!("member" in jsonData)) {
      if (!("shell" in jsonData)) {
        return this.translate.instant("providers.input-data.member_nodata");
      }
    }
    const members: object = jsonData["member"];
    let memberKeys = [];
    if (members !== undefined) {
      memberKeys = Object.keys(members);
    }
    const shells: object = jsonData["shell"];
    let shellKeys = [];
    if (shells !== undefined) {
      shellKeys = Object.keys(shells);
    }
    if (memberKeys.length + shellKeys.length <= 0) {
      return this.translate.instant("providers.input-data.member_nodata");
    }

    // 部材で使われている 節点番号が存在するか調べる
    const n: object = {};
    for (const key of memberKeys) {
      const m = members[key];
      for (const name of [m.ni, m.nj]) {
        if (!(name in nodes)) {
          return (
            this.translate.instant("providers.input-data.member")
            + key 
            + "で使われている" //翻訳保留
            +  this.translate.instant("providers.input-data.node") 
            + name 
            + "は、存在しません" //翻訳保留
          );
        }
        n[name] = nodes[name];
      }
    }
    //jsonData['node'] = n;

    // パネルで使われている 節点番号が存在するか調べる
    for (const key of shellKeys) {
      //const s = shells[key];
      for (const name of shells[key].nodes) {
        if (!(name in nodes)) {
          return (
            this.translate.instant("providers.input-data.panel")
            + key 
            + "で使われている" //翻訳保留
            + this.translate.instant("providers.input-data.node")
            + name 
            + "は、存在しません" //翻訳保留
          );
        }
        n[name] = nodes[name];
      }
    }
    jsonData["node"] = n;

    if (!("load" in jsonData)) {
      return this.translate.instant("providers.input-data.load_nodata");
    }
    const loads: object = jsonData["load"] as object;
    const loadKeys = Object.keys(loads);
    if (loadKeys.length <= 0) {
      return this.translate.instant("providers.input-data.load_nodata");
    }

    // 荷重ケース毎にエラーチェック
    const elements = jsonData["element"];
    const fix_members = "fix_member" in jsonData ? jsonData["fix_member"] : {};
    const fix_nodes = "fix_node" in jsonData ? jsonData["fix_node"] : {};
    for (const key of loadKeys) {
      const load = loads[key];

      // 断面のチェック
      const e = load.element.toString();
      if (!(e in elements)) {
        return (
        + this.translate.instant("providers.input-data.loadNo")
        + key 
        + "における" //翻訳保留
        + this.translate.instant("providers.input-data.sectionNo")
        + e 
        + "は存在しません。" //翻訳保留
        );
      }

      // バネ支点のチェック
      const fn = load.fix_node.toString();
      const fm = load.fix_member.toString();

      const fix_node = fn in (fix_nodes as object) ? fix_nodes[fn] : [];
      const fix_member = fm in (fix_members as object) ? fix_members[fm] : [];

      if (fix_node.length + fix_member.length <= 0) {
        return (
        this.translate.instant("providers.input-data.loadNo")
        + key 
        + this.translate.instant("providers.input-data.SupSpr")
        );
      }

      let nFlg = false;
      for (const ffn of fix_node) {
        if (!(ffn["n"] in nodes)) {
          return (
            this.translate.instant("providers.input-data.SupType")
            +
            fn +
            "の入力において"+ //翻訳保留
            this.translate.instant("providers.input-data.nodeNo")
            +
            ffn["n"] +
            "は存在しません。" //翻訳保留
          );
        }
        for (const k of ["rx", "ry", "rz", "tx", "ty", "tz"]) {
          if (!(k in ffn)) {
            continue;
          }
          if (ffn[k] === 0) {
            continue;
          }
          nFlg = true;
          break;
        }
      }
      if (nFlg === false) {
        for (const ffm of fix_member) {
          if (!(ffm["m"] in members)) {
            return (
              this.translate.instant("providers.input-data.SprType")
              +
              fm +
              "の入力において" //翻訳保留
              +this.translate.instant("providers.input-data.elementNo")
              +
              ffm["m"] +
              "は存在しません。" //翻訳保留
            );
          }
          for (const k of ["tx", "ty", "tz", "tr"]) {
            if (!(k in ffm)) {
              continue;
            }
            if (ffm[k] === 0) {
              continue;
            }
            nFlg = true;
            break;
          }
        }
      }
      if (nFlg === false) {
        return (
        this.translate.instant("providers.input-data.loadNo")
        + key 
        + this.translate.instant("providers.input-data.SupSpr")
        );
      }

      // 節点荷重の確認
      if ("load_node" in load) {
        for (const ln of load.load_node) {
          if (!(ln["n"] in nodes)) {
            return (
              this.translate.instant("providers.input-data.loadNo")
              +
              key +
              "の" + //翻訳保留
              ln["row"] +
              "行目の入力において"+ //翻訳保留
              this.translate.instant("providers.input-data.nodeNo")
              +
              ln["n"] +
              "は存在しません。" //翻訳保留
            );
          }
        }
      }

      // 要素荷重の確認
      if ("load_member" in load) {
        for (const lm of load.load_member) {
          if (!(lm["m"] in members)) {
            return (
              this.translate.instant("providers.input-data.loadNo")
              +
              key +
              "の" + //翻訳保留
              lm["row"] +
              "行目の入力において"+ //翻訳保留
              this.translate.instant("providers.input-data.elementNo")
              +
              lm["m"] +
              "は存在しません。" //翻訳保留
            );
          }
        }
      }
    } // Next 荷重ケース

    return null;
  }

}
