import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface BoxState {
  visible: boolean;
  positionX?: number;
  positionY?: number;
}

@Injectable({
  providedIn: 'root'
})
export class BoxVisibilityService {
  private boxStateSubject = new BehaviorSubject<BoxState>({ visible: false });
  public boxState$: Observable<BoxState> = this.boxStateSubject.asObservable();

  public setVisibility(visible: boolean, x?: number, y?: number): void {
    this.boxStateSubject.next({
      visible,
      positionX: x,
      positionY: y
    });
  }
}
