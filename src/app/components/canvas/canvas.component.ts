import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasService } from './canvas.service';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [CommonModule, ToolbarComponent],
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: false }) containerRef: ElementRef | undefined;

  constructor(private canvasService: CanvasService) { }

  ngAfterViewInit(): void {
    if (this.containerRef) {
      this.canvasService.initializeCanvas(this.containerRef);
    }
  }

  ngOnDestroy(): void {
    this.canvasService.destroyCanvas();
  }

  // マウスホイールイベントでズーム
  onMouseWheel(e: WheelEvent) {
    e.preventDefault();
    this.canvasService.zoom(e.deltaY);
  }

  // ドラッグ開始
  onMouseDown(e: MouseEvent) {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      this.canvasService.startPanning(e.clientX, e.clientY);
    }
  }

  // ドラッグ中
  onMouseMove(e: MouseEvent) {
    this.canvasService.updateCursorPosition(e.clientX, e.clientY);
    if (this.canvasService.isPanning) {
      this.canvasService.updatePanning(e.clientX, e.clientY);
    }
  }

  // ドラッグ終了
  onMouseUp() {
    this.canvasService.stopPanning();
  }

  // マウスがキャンバスを離れた時
  onMouseLeave() {
    this.canvasService.stopPanning();
  }

  // ウインドウリサイズイベント
  @HostListener('window:resize')
  onResize(): void {
    this.canvasService.resizeCanvas();
  }
} 