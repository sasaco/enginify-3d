import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SceneService, TransformMode } from './scene.service'; // Import TransformMode

@Component({
  selector: 'app-three',
  standalone: true,
  templateUrl: './three.component.html',
  imports: [CommonModule]
})
export class ThreeComponent implements OnInit, AfterViewInit {
  @ViewChild("screen", { static: true }) private screen!: ElementRef<HTMLCanvasElement>;
  public currentModeDisplay: string = 'Camera'; // To display current mode in template

  constructor(private scene: SceneService) { }

  ngOnInit(): void { }

  async ngAfterViewInit() {
    if (this.screen && this.screen.nativeElement) {
      await this.scene.OnInit(this.screen.nativeElement);
      console.log('ThreeComponent ngAfterViewInit: SceneService.OnInit called.');
    } else {
      console.error('ThreeComponent ngAfterViewInit: Screen element not found.');
    }
  }

  @HostListener("window:keydown", ["$event"])
  public onKeyDown(event: KeyboardEvent): void {
    let newMode: TransformMode = null;
    let modeDisplay = 'Camera';

    switch (event.key.toLowerCase()) {
      case 't':
        newMode = 'translate';
        modeDisplay = 'Translate';
        break;
      case 'r':
        newMode = 'rotate';
        modeDisplay = 'Rotate';
        break;
      case 's':
        newMode = 'scale';
        modeDisplay = 'Scale';
        break;
      case 'escape':
        newMode = null; // Or 'camera' or similar to explicitly denote camera mode
        modeDisplay = 'Camera';
        break;
      default:
        return; // Not a relevant key
    }

    // Toggle mode off if the same key is pressed again
    if (this.scene.currentTransformMode === newMode && newMode !== null) {
        this.scene.setTransformMode(null);
        this.currentModeDisplay = 'Camera';
    } else {
        this.scene.setTransformMode(newMode);
        this.currentModeDisplay = modeDisplay;
    }
    event.preventDefault(); // Prevent browser default actions for these keys
  }

  // ウインドウがリサイズした時のイベント処理
  @HostListener("window:resize", ["$event"])
  public onResize(event: Event) {
    this.scene.onWindowResize();
  }
}
