import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasService, ElementType } from '../canvas.service';

@Component({
  selector: 'app-canvas-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  // ツールの種類
  public readonly ToolType = {
    SELECT: 'select',
    PAN: 'pan',
    STICKY_NOTE: 'sticky_note',
    SHAPE: 'shape',
    TEXT: 'text',
    CONNECTOR: 'connector',
    IMAGE: 'image'
  };

  // 選択中のツール
  public selectedTool: string = this.ToolType.SELECT;

  // 図形サブメニューの表示状態
  public showShapeSubmenu: boolean = false;

  // 選択中の図形タイプ
  public selectedShapeType: string = 'rectangle';

  constructor(private canvasService: CanvasService) { }

  ngOnInit(): void {
  }

  // ツールを選択
  public selectTool(tool: string): void {
    this.selectedTool = tool;
    
    // 図形ツールの場合はサブメニューを表示
    if (tool === this.ToolType.SHAPE) {
      this.showShapeSubmenu = true;
    } else {
      this.showShapeSubmenu = false;
    }
  }

  // 図形タイプを選択
  public selectShapeType(type: string): void {
    this.selectedShapeType = type;
  }

  // キャンバスにアイテムを追加
  public addItem(event: MouseEvent): void {
    if (this.selectedTool === this.ToolType.SELECT || this.selectedTool === this.ToolType.PAN) {
      return;
    }
    
    // マウス位置をキャンバス座標に変換
    const stage = document.querySelector('.canvas-container');
    if (!stage) return;
    
    const rect = stage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // キャンバス座標系に変換
    const canvasCoords = this.canvasService.screenToCanvas(x, y);
    
    switch (this.selectedTool) {
      case this.ToolType.STICKY_NOTE:
        this.canvasService.addElement(ElementType.STICKY_NOTE, canvasCoords.x, canvasCoords.y, {
          color: '#FFFF88',
          text: 'ここにテキストを入力'
        });
        break;
      case this.ToolType.SHAPE:
        this.canvasService.addElement(ElementType.SHAPE, canvasCoords.x, canvasCoords.y, {
          shapeType: this.selectedShapeType,
          fill: 'white',
          stroke: 'black'
        });
        break;
      case this.ToolType.TEXT:
        this.canvasService.addElement(ElementType.TEXT, canvasCoords.x, canvasCoords.y, {
          text: 'テキストを入力',
          fontSize: 18
        });
        break;
      case this.ToolType.CONNECTOR:
        this.canvasService.addElement(ElementType.CONNECTOR, canvasCoords.x, canvasCoords.y, {
          points: [0, 0, 100, 100]
        });
        break;
      case this.ToolType.IMAGE:
        // 画像アップロード処理は別途実装
        break;
    }
    
    // 追加後はSELECTツールに戻す
    this.selectedTool = this.ToolType.SELECT;
  }
} 