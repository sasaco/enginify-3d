import { Component, OnInit } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { Title } from '@angular/platform-browser';
import packageJson from '../../package.json';
import { RouterModule, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';

import { MenuComponent } from './components/menu/menu.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CanvasComponent } from './components/canvas/canvas.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [RouterOutlet, MenuComponent, ToolbarComponent, LayoutComponent, CanvasComponent]
})
export class AppComponent implements OnInit  {
  public version: string;

  constructor(
    public electronService: ElectronService,
    private titleService: Title) {
    
    this.version = packageJson.version;

    if (electronService.isElectron) {
      console.log('Hi this is Mode electron!');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Hi this is Mode web!');
    }
  }

  ngOnInit(): void {
    this.titleService.setTitle(packageJson.description);
    initFlowbite();
  }

}