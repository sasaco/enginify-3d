import { ElementRef, Injectable } from '@angular/core';
import Konva from 'konva';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

// 要素の種類を定義
export enum ElementType {
  STICKY_NOTE = 'sticky_note',
  SHAPE = 'shape',
  TEXT = 'text',
  CONNECTOR = 'connector',
  IMAGE = 'image'
}

// 要素の基本インターフェース
export interface CanvasElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  // Konvaの主要なオブジェクト
  private stage: Konva.Stage | null = null;
  private mainLayer: Konva.Layer | null = null;
  private gridLayer: Konva.Layer | null = null;
  
  // キャンバス要素のコレクション
  private elements: Map<string, CanvasElement> = new Map();
  private selected: Set<string> = new Set();
  
  // パンとズーム状態
  private scaleValue: number = 1;
  private minScale: number = 0.1;
  private maxScale: number = 5;
  private stageX: number = 0;
  private stageY: number = 0;
  
  // パンニング状態
  public isPanning: boolean = false;
  private lastX: number = 0;
  private lastY: number = 0;
  
  // 現在のカーソル位置
  private cursorX: number = 0;
  private cursorY: number = 0;
  
  // オブザーバブル
  public elementsChanged = new BehaviorSubject<Map<string, CanvasElement>>(this.elements);
  public selectionChanged = new BehaviorSubject<Set<string>>(this.selected);
  public scaleChanged = new BehaviorSubject<number>(this.scaleValue);

  constructor() { }

  // キャンバスの初期化
  public initializeCanvas(containerRef: ElementRef): void {
    const container = containerRef.nativeElement;
    
    // Konvaステージとメインレイヤーとグリッドレイヤーのセットアップ
    this.stage = new Konva.Stage({
      container: container,
      width: container.offsetWidth,
      height: container.offsetHeight,
      draggable: false, // パンニングは自分で実装
    });
    
    // グリッドレイヤー（最下層）
    this.gridLayer = new Konva.Layer();
    this.stage.add(this.gridLayer);
    
    // メインレイヤー（コンテンツ用）
    this.mainLayer = new Konva.Layer();
    this.stage.add(this.mainLayer);
    
    // 初期位置をキャンバスの中央に設定
    this.centerCanvas();
    
    // イベントリスナーの追加
    this.addEventListeners();
  }
  
  // キャンバスの中央へスクロール
  private centerCanvas(): void {
    if (!this.stage) return;
    
    const stageWidth = this.stage.width();
    const stageHeight = this.stage.height();
    
    this.stageX = stageWidth / 2;
    this.stageY = stageHeight / 2;
    
    this.updateStagePosition();
  }
  
  // ステージの位置を更新
  private updateStagePosition(): void {
    if (!this.mainLayer || !this.gridLayer) return;
    
    this.mainLayer.x(this.stageX);
    this.mainLayer.y(this.stageY);
    this.mainLayer.scale({ x: this.scaleValue, y: this.scaleValue });
    
    this.gridLayer.x(this.stageX);
    this.gridLayer.y(this.stageY);
    this.gridLayer.scale({ x: this.scaleValue, y: this.scaleValue });
    
    this.mainLayer.batchDraw();
    this.gridLayer.batchDraw();
  }
  
  // イベントリスナーの設定
  private addEventListeners(): void {
    if (!this.stage) return;
    
    // ステージのクリックイベント
    this.stage.on('click', (e) => {
      if (e.target === this.stage) {
        this.clearSelection();
      }
    });
  }
  
  // ズーム機能
  public zoom(delta: number): void {
    if (!this.stage) return;
    
    const oldScale = this.scaleValue;
    
    // デルタに基づいてスケールを調整（マウスホイールアップでズームイン、ダウンでズームアウト）
    const newScale = delta > 0 ? oldScale / 1.1 : oldScale * 1.1;
    
    // スケールの範囲を制限
    this.scaleValue = Math.min(Math.max(newScale, this.minScale), this.maxScale);
    
    // カーソル位置を中心にズーム
    const pointer = this.stage.getPointerPosition();
    if (pointer) {
      const mousePointTo = {
        x: (pointer.x - this.stageX) / oldScale,
        y: (pointer.y - this.stageY) / oldScale,
      };
      
      this.stageX = pointer.x - mousePointTo.x * this.scaleValue;
      this.stageY = pointer.y - mousePointTo.y * this.scaleValue;
    }
    
    this.updateStagePosition();
    this.scaleChanged.next(this.scaleValue);
  }
  
  // パンニング開始
  public startPanning(x: number, y: number): void {
    this.isPanning = true;
    this.lastX = x;
    this.lastY = y;
    
    if (this.stage) {
      const container = this.stage.container();
      container.classList.add('panning');
    }
  }
  
  // パンニング更新
  public updatePanning(x: number, y: number): void {
    if (!this.isPanning) return;
    
    const dx = x - this.lastX;
    const dy = y - this.lastY;
    
    this.stageX += dx;
    this.stageY += dy;
    
    this.lastX = x;
    this.lastY = y;
    
    this.updateStagePosition();
  }
  
  // パンニング終了
  public stopPanning(): void {
    this.isPanning = false;
    
    if (this.stage) {
      const container = this.stage.container();
      container.classList.remove('panning');
    }
  }
  
  // カーソル位置の更新
  public updateCursorPosition(x: number, y: number): void {
    this.cursorX = x;
    this.cursorY = y;
  }
  
  // キャンバスのリサイズ
  public resizeCanvas(): void {
    if (!this.stage) return;
    
    const container = this.stage.container();
    this.stage.width(container.offsetWidth);
    this.stage.height(container.offsetHeight);
    this.stage.batchDraw();
  }
  
  // キャンバスの破棄
  public destroyCanvas(): void {
    if (this.stage) {
      this.stage.destroy();
      this.stage = null;
      this.mainLayer = null;
      this.gridLayer = null;
    }
  }
  
  // 新しい要素の追加
  public addElement(type: ElementType, x: number, y: number, data: any = {}): string {
    const id = uuidv4();
    const element: CanvasElement = {
      id,
      type,
      x,
      y,
      width: 100,  // デフォルトサイズ
      height: 100, // デフォルトサイズ
      rotation: 0,
      data
    };
    
    this.elements.set(id, element);
    this.renderElement(element);
    this.elementsChanged.next(this.elements);
    
    return id;
  }
  
  // 要素の描画
  private renderElement(element: CanvasElement): void {
    if (!this.mainLayer) return;
    
    // 既存の要素を削除（更新の場合）
    const existingNode = this.mainLayer.findOne(`#${element.id}`);
    if (existingNode) {
      existingNode.destroy();
    }
    
    let shape: Konva.Node;
    
    switch (element.type) {
      case ElementType.STICKY_NOTE:
        shape = this.createStickyNote(element);
        break;
      case ElementType.SHAPE:
        shape = this.createShape(element);
        break;
      case ElementType.TEXT:
        shape = this.createText(element);
        break;
      case ElementType.CONNECTOR:
        shape = this.createConnector(element);
        break;
      case ElementType.IMAGE:
        shape = this.createImage(element);
        break;
      default:
        shape = new Konva.Group();
    }
    
    shape.id(element.id);
    shape.draggable(true);
    
    // ドラッグ中イベント
    shape.on('dragmove', () => {
      this.updateElementPosition(element.id, shape.x(), shape.y());
    });
    
    // クリックイベント
    shape.on('click', () => {
      this.selectElement(element.id);
    });
    
    this.mainLayer.add(shape);
    this.mainLayer.batchDraw();
  }
  
  // 付箋の作成
  private createStickyNote(element: CanvasElement): Konva.Group {
    const group = new Konva.Group({
      x: element.x,
      y: element.y,
      rotation: element.rotation,
    });
    
    const rect = new Konva.Rect({
      width: element.width,
      height: element.height,
      fill: element.data.color || '#FFFF88',
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOffset: { x: 5, y: 5 },
      shadowOpacity: 0.3,
      cornerRadius: 5,
    });
    
    const text = new Konva.Text({
      text: element.data.text || '',
      width: element.width - 20,
      height: element.height - 20,
      x: 10,
      y: 10,
      fontSize: 16,
      fontFamily: 'Arial',
      fill: 'black',
      padding: 5,
      align: 'left',
      verticalAlign: 'top',
      wrap: 'word',
    });
    
    group.add(rect);
    group.add(text);
    
    return group;
  }
  
  // 図形の作成
  private createShape(element: CanvasElement): Konva.Shape {
    const shapeType = element.data.shapeType || 'rectangle';
    
    switch (shapeType) {
      case 'circle':
        return new Konva.Circle({
          x: element.x + element.width / 2,
          y: element.y + element.height / 2,
          radius: Math.min(element.width, element.height) / 2,
          fill: element.data.fill || 'white',
          stroke: element.data.stroke || 'black',
          strokeWidth: element.data.strokeWidth || 2,
          opacity: element.data.opacity || 1,
        });
      case 'triangle':
        return new Konva.RegularPolygon({
          x: element.x + element.width / 2,
          y: element.y + element.height / 2,
          sides: 3,
          radius: Math.min(element.width, element.height) / 2,
          fill: element.data.fill || 'white',
          stroke: element.data.stroke || 'black',
          strokeWidth: element.data.strokeWidth || 2,
          opacity: element.data.opacity || 1,
          rotation: 30,
        });
      default:  // rectangle
        return new Konva.Rect({
          x: element.x,
          y: element.y,
          width: element.width,
          height: element.height,
          fill: element.data.fill || 'white',
          stroke: element.data.stroke || 'black',
          strokeWidth: element.data.strokeWidth || 2,
          cornerRadius: element.data.cornerRadius || 0,
          opacity: element.data.opacity || 1,
        });
    }
  }
  
  // テキストの作成
  private createText(element: CanvasElement): Konva.Text {
    return new Konva.Text({
      x: element.x,
      y: element.y,
      text: element.data.text || 'テキストを入力してください',
      fontSize: element.data.fontSize || 18,
      fontFamily: element.data.fontFamily || 'Arial',
      fill: element.data.fill || 'black',
      width: element.width,
      height: element.height,
      padding: 5,
      align: element.data.align || 'left',
      wrap: 'word',
    });
  }
  
  // コネクタの作成
  private createConnector(element: CanvasElement): Konva.Arrow {
    return new Konva.Arrow({
      points: element.data.points || [0, 0, 100, 100],
      pointerLength: 10,
      pointerWidth: 10,
      fill: element.data.fill || 'black',
      stroke: element.data.stroke || 'black',
      strokeWidth: element.data.strokeWidth || 2,
    });
  }
  
  // 画像の作成
  private createImage(element: CanvasElement): Konva.Group {
    const group = new Konva.Group({
      x: element.x,
      y: element.y,
      rotation: element.rotation,
    });
    
    // 画像の読み込み処理
    if (element.data.src) {
      const imageObj = new Image();
      imageObj.src = element.data.src;
      
      imageObj.onload = () => {
        const konvaImage = new Konva.Image({
          image: imageObj,
          width: element.width,
          height: element.height,
        });
        
        group.add(konvaImage);
        this.mainLayer?.batchDraw();
      };
    }
    
    return group;
  }
  
  // 要素の位置を更新
  public updateElementPosition(id: string, x: number, y: number): void {
    const element = this.elements.get(id);
    if (!element) return;
    
    element.x = x;
    element.y = y;
    
    this.elements.set(id, element);
    this.elementsChanged.next(this.elements);
  }
  
  // 要素の選択
  public selectElement(id: string, addToSelection: boolean = false): void {
    if (!addToSelection) {
      this.clearSelection();
    }
    
    this.selected.add(id);
    this.selectionChanged.next(this.selected);
    
    // 選択効果の適用
    this.applySelectionEffect();
  }
  
  // 選択解除
  public clearSelection(): void {
    this.selected.clear();
    this.selectionChanged.next(this.selected);
    
    // 選択効果の削除
    this.removeSelectionEffect();
  }
  
  // 選択効果の適用
  private applySelectionEffect(): void {
    if (!this.mainLayer) return;
    
    // 全ての選択効果をリセット
    this.removeSelectionEffect();
    
    // 選択された要素に効果を適用
    this.selected.forEach(id => {
      const node = this.mainLayer?.findOne(`#${id}`);
      if (node) {
        // 選択状態のスタイルを適用（例: ボーダーの色を変更）
        if (node instanceof Konva.Group) {
          const rect = node.findOne('Rect');
          if (rect) {
            rect.stroke('#1E90FF');
            rect.strokeWidth(3);
          }
        } else if (node instanceof Konva.Shape) {
          node.stroke('#1E90FF');
          node.strokeWidth(3);
        }
      }
    });
    
    this.mainLayer?.batchDraw();
  }
  
  // 選択効果の削除
  private removeSelectionEffect(): void {
    if (!this.mainLayer) return;
    
    // すべての要素の選択効果をリセット
    this.elements.forEach((element, id) => {
      const node = this.mainLayer?.findOne(`#${id}`);
      if (node) {
        if (node instanceof Konva.Group) {
          const rect = node.findOne('Rect');
          if (rect) {
            rect.stroke('black');
            rect.strokeWidth(1);
          }
        } else if (node instanceof Konva.Shape) {
          node.stroke('black');
          node.strokeWidth(2);
        }
      }
    });
    
    this.mainLayer?.batchDraw();
  }
  
  // すべての要素を再描画
  public renderAllElements(): void {
    if (!this.mainLayer) return;
    
    // 既存の要素をクリア
    this.mainLayer.destroyChildren();
    
    // すべての要素を再描画
    this.elements.forEach(element => {
      this.renderElement(element);
    });
    
    // 選択状態を再適用
    this.applySelectionEffect();
  }
  
  // 要素の削除
  public removeElement(id: string): void {
    const element = this.elements.get(id);
    if (!element) return;
    
    // 要素の削除
    this.elements.delete(id);
    this.elementsChanged.next(this.elements);
    
    // 選択から削除
    this.selected.delete(id);
    this.selectionChanged.next(this.selected);
    
    // 再描画
    this.renderAllElements();
  }
  
  // 複数の要素を削除
  public removeElements(ids: string[]): void {
    let changed = false;
    
    ids.forEach(id => {
      if (this.elements.has(id)) {
        this.elements.delete(id);
        this.selected.delete(id);
        changed = true;
      }
    });
    
    if (changed) {
      this.elementsChanged.next(this.elements);
      this.selectionChanged.next(this.selected);
      this.renderAllElements();
    }
  }
  
  // スケールの取得
  public getScale(): number {
    return this.scaleValue;
  }
  
  // スクリーン座標からキャンバス座標への変換
  public screenToCanvas(x: number, y: number): { x: number, y: number } {
    if (!this.stage) return { x, y };
    
    return {
      x: (x - this.stageX) / this.scaleValue,
      y: (y - this.stageY) / this.scaleValue
    };
  }
  
  // キャンバス座標からスクリーン座標への変換
  public canvasToScreen(x: number, y: number): { x: number, y: number } {
    return {
      x: x * this.scaleValue + this.stageX,
      y: y * this.scaleValue + this.stageY
    };
  }
  
  // 全てのキャンバス要素をJSON形式でエクスポート
  public exportToJSON(): string {
    const data = Array.from(this.elements.values());
    return JSON.stringify(data);
  }
  
  // JSON形式のデータからキャンバス要素をインポート
  public importFromJSON(json: string): void {
    try {
      const data = JSON.parse(json) as CanvasElement[];
      
      // 既存のデータをクリア
      this.elements.clear();
      this.selected.clear();
      
      // データのインポート
      data.forEach(element => {
        this.elements.set(element.id, element);
      });
      
      this.elementsChanged.next(this.elements);
      this.selectionChanged.next(this.selected);
      
      // 再描画
      this.renderAllElements();
    } catch (error) {
      console.error('インポートエラー:', error);
    }
  }
} 