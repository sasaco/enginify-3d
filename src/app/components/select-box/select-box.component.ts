import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-select-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-box.component.html'
})
export class SelectBoxComponent {

  public table_item: { id: number; name: string; }[];

  constructor() { 
    this.table_item = [
      { id: 1, name: 'ビューポート' },
      { id: 2, name: '柱' },
      { id: 3, name: '鉄筋' },
    ];
  }
}
