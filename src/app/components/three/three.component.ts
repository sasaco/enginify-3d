import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SceneService } from './scene.service';
import { CodeService } from './code.service';

@Component({
  selector: 'app-three',
  standalone: true,
  templateUrl: './three.component.html',
  imports: [CommonModule]
  
})
export class ThreeComponent implements AfterViewInit {
  @ViewChild("screen", { static: true }) private screen: ElementRef | undefined;

  private isDragging = false;
  public isLoading = true;

  constructor(
    private scene: SceneService,
    private code: CodeService) { }

  async ngAfterViewInit() {
    if (this.screen) {
        this.scene.OnInit(this.screen.nativeElement as HTMLCanvasElement);
        try {
          await this.code.runCode();
        } catch (err) {
          console.error('Failed to run code:', err);
        } finally {
          this.isLoading = false;
        }
      }
  }

  // マウスクリック時のイベント
  // @HostListener("pointerdown", ["$event"])
  public onMouseDown(event: MouseEvent) {
    this.scene.onPointerDown(event);
    this.isDragging = true;
  }

  // マウスクリック時のイベント
  @HostListener("pointerup", ["$event"])
  public onMouseUp(event: MouseEvent) {
    if (!this.isDragging) return;
    this.scene.onPointerUp(event);
  }

  // マウス移動時のイベント
  @HostListener("mousemove", ["$event"])
  public onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    this.scene.onPointerMove(event);
  }

  // ウインドウがリサイズした時のイベント処理
  @HostListener("window:resize", ["$event"])
  public onResize(event: Event) {
    this.scene.onWindowResize();
  }


}
