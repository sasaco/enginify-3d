import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputNodesComponent } from './components/input/input-nodes/input-nodes.component';
import { InputSourceComponent } from './components/input/input-source/input-source.component';

import { StartMenuComponent } from './components/start-menu/start-menu.component'
import { PresetComponent } from './components/preset/preset.component';

const routes: Routes = [
  { path: 'input-nodes', component: InputNodesComponent },
  { path: 'input-source', component: InputSourceComponent },

  { path: 'start', outlet:'startOutlet',component: StartMenuComponent },
  { path: 'preset', outlet:'presetOutlet',component: PresetComponent },

];

@NgModule({
  //@ts-ignore
  imports: [RouterModule.forRoot(routes, {})],
  // imports: [RouterModule.forRoot(routes, { })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
