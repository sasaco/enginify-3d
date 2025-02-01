import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SelectBoxComponent } from '../select-box/select-box.component';
import { SceneService } from './scene.service';
import { CodeService } from './code.service';
import { BoxVisibilityService } from '../box-visibility.service';

@Component({
  selector: 'app-three',
  standalone: true,
  templateUrl: './three.component.html',
  imports: [CommonModule, SelectBoxComponent]
  
})
export class ThreeComponent implements OnInit, AfterViewInit {
  @ViewChild("screen", { static: true }) private screen: ElementRef | undefined;
  @ViewChild("box", { static: true }) private box: ElementRef | undefined;

  private isDragging = false;

  constructor(
    private scene: SceneService,
    private code: CodeService,
    private boxVisibility: BoxVisibilityService) { }

  ngOnInit(): void {
    this.boxVisibility.setVisibility(false);
  }

  ngAfterViewInit() {
    if (this.screen) {
      if(this.scene.OnInit(this.screen.nativeElement as HTMLCanvasElement)) {
        this.code.runCode();
      }
    }
    this.updateBoxStyle();
  }

  private updateBoxStyle() {
    if (!this.box) return;
    const boxElement = this.box.nativeElement as HTMLElement;
    if (this.boxVisibility.visible) {
      boxElement.style.visibility = 'visible';
      if (this.boxVisibility.positionX != null && this.boxVisibility.positionY != null) {
        boxElement.style.top = `${this.boxVisibility.positionY}px`;
        boxElement.style.left = `${this.boxVisibility.positionX}px`;
      }
    } else {
      boxElement.style.visibility = 'hidden';
    }
  }

  // マウスクリック時のイベント
  public onDoubleClick(event: MouseEvent) {
    this.boxVisibility.setVisibility(true, event.offsetX, event.offsetY);
    this.updateBoxStyle();
  }

  // @HostListener("pointerdown", ["$event"])
  public onMouseDown(event: MouseEvent) {
    this.scene.onPointerDown(event);
    this.isDragging = true;
    this.boxVisibility.setVisibility(false);
    this.updateBoxStyle();
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
