import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputSourceComponent } from './components/input-source/input-source.component';


const routes: Routes = [
  { path: 'input-source', component: InputSourceComponent },
];

@NgModule({
  //@ts-ignore
  imports: [RouterModule.forRoot(routes, {})],
  // imports: [RouterModule.forRoot(routes, { })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
