import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoxVisibilityService {
  public visible = false;
  public positionX?: number;
  public positionY?: number;

  public setVisibility(visible: boolean, x?: number, y?: number): void {
    this.visible = visible;
    this.positionX = x;
    this.positionY = y;
  }
}
