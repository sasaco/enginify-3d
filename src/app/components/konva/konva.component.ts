import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import Konva from 'konva';
import { KonvaService } from './konva.service';

@Component({
  selector: 'app-konva',
  standalone: true,
  imports: [],
  templateUrl: './konva.component.html'
})
export class KonvaComponent implements AfterViewInit, OnDestroy {
  @ViewChild('konvaContainer', { static: false }) containerRef: ElementRef | undefined;

  private stage!: Konva.Stage;

  constructor( private konva: KonvaService ) { }

  ngAfterViewInit(): void {
    if(!this.containerRef) return;
    const container = this.containerRef.nativeElement;

    this.stage = new Konva.Stage({
      container: container,
      width: container.offsetWidth,
      height: container.offsetHeight,
    });

    this.stage.add(this.konva.layer);
  }

  ngOnDestroy(): void {
    this.stage.destroy();
  }

  
  // ウインドウがリサイズした時のイベント処理
  @HostListener("window:resize", ["$event"])
  onWindowResize = () => {
    if(!this.containerRef) return;

    const container = this.containerRef.nativeElement;
    this.stage.width(container.offsetWidth);
    this.stage.height(container.offsetHeight);
    this.stage.draw();
  }
}
