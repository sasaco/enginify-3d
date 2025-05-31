import { Injectable } from '@angular/core';
import OpenCascade from 'opencascade.js';

@Injectable({
  providedIn: 'root'
})
export class OpencascadeService {
  private openCascade?: OpenCascade;
  private initPromise?: Promise<void>;

  constructor() { }

  public initialize(): Promise<void> {
    if (!this.initPromise) {
      this.initPromise = new Promise<void>((resolve, reject) => {
        (self as any).CascadeStatic('./assets/opencascade/opencascade.wasm').then((openCascade: OpenCascade) => {
          this.openCascade = openCascade;
          resolve();
        }).catch((error: any) => {
          console.error('Failed to initialize OpenCascade:', error);
          reject(error);
        });
      });
    }
    return this.initPromise;
  }

  public getOpenCascade(): OpenCascade | undefined {
    return this.openCascade;
  }
}
