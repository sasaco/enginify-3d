import { Routes } from '@angular/router';
import { MonacoComponent } from './components/monaco/monaco.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CanvasComponent } from './components/canvas/canvas.component';

export const routes: Routes = [
    { path: '', redirectTo: '/canvas', pathMatch: 'full' },
    { path: 'canvas', component: CanvasComponent },
    { path: 'design', component: LayoutComponent },
    { path: 'code', component: MonacoComponent }
];