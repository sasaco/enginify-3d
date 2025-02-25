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
  @ViewChild('stageContainer') stageContainer!: ElementRef;
  public stages: Konva.Stage[] = [];  
  
  constructor(private konva: KonvaService) {}
  
  ngAfterViewInit() {


  }
  
  zoomIn() {
    if (!this.konva.currentStage) return;
    const stage = this.konva.currentStage;
    const scale = stage.scaleX() * 1.2;
    stage.scale({ x: scale, y: scale });
    stage.batchDraw();
  }
  
  zoomOut() {
    if (!this.konva.currentStage) return;
    const stage = this.konva.currentStage;
    const scale = stage.scaleX() / 1.2;
    stage.scale({ x: scale, y: scale });
    stage.batchDraw();
  }
  
  addPage() {
    // Initialize Konva stage with fixed dimensions
    const container = this.stageContainer.nativeElement as HTMLDivElement;
    const stage = new Konva.Stage({
      container: container,
      width: container.offsetWidth,
      height: container.offsetHeight,
      x: 0,
      y: 0,
    });

    // Clear selection when clicking empty stage
    stage.on('click tap', (e) => {
      if (e.target === stage) {
        this.konva.clearSelection();
      }
    });

    this.stages.push(stage);
    this.konva.currentStage = stage;
  }

  ngOnDestroy(): void {
    for(const stage of this.stages){
      stage.destroy();
    }
  }

  public removePage(pageId: string): void {
    if (this.stages.length <= 1) return; // Don't remove last page
    
    const i = this.stages.findIndex(p => p.id() === pageId);
    if (i === -1) return;
    
    const stage = this.stages[i];
    stage.destroy();
    this.stages.splice(i, 1);
    
    if(this.konva.currentStage === null) return;

    if (this.konva.currentStage.id() === pageId) {
      
      this.switchToPage(this.stages[0]?.id);
    }
  }

  public switchToPage(pageId: string): void {
    const page = this.pages.find(p => p.id === pageId);
    if (!page) return;
    
    this.pages.forEach(p => {
      p.layer.visible(p.id === pageId);
      p.isVisible = p.id === pageId;
    });
    this.currentPage = page;
    page.layer.batchDraw();
  }

  public getCurrentPage(): Page | null {
    return this.currentPage;
  }

  public getPages(): Page[] {
    return this.pages;
  }
  

  // ウインドウがリサイズした時のイベント処理
  @HostListener("window:resize", ["$event"])
  onWindowResize = () => {
    if(!this.stageContainer) return;

    const container = this.stageContainer.nativeElement;
    this.konva.stage.width(container.offsetWidth);
    this.konva.stage.height(container.offsetHeight);
    this.konva.stage.draw();
  }
}
