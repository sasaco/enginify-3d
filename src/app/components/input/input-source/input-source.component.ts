import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as monaco from 'monaco-editor';

import { DataHelperModule } from '../../../providers/data-helper.module';
import { DocLayoutService } from 'src/app/components/doc-layout/doc-layout.service';
import { InputSourceService } from '../../three/geometry/three-source.service';
import { InputDataService } from 'src/app/providers/input-data.service';

@Component({
  selector: 'app-input-source',
  templateUrl: './input-source.component.html',
  styleUrls: ['./input-source.component.scss', '../../../app.component.scss'],
})
export class InputSourceComponent implements OnInit, AfterViewInit, OnDestroy  {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;
  private editor!: monaco.editor.IStandaloneCodeEditor;
  
  constructor(
    private data: InputDataService,
    public helper: DataHelperModule,
    public docLayout: DocLayoutService,
  ) {
  }

  ngOnInit() {
  }
  
  ngAfterViewInit() {
    // Monaco Editor のロード
    (window as any).require.config({ paths: { 'vs': 'assets/monaco-editor/min/vs' } }); // 重要：パスの設定
    (window as any).require(['vs/editor/editor.main'], () => {
      this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
        value: this.data.code,
        language: 'typescript',
        theme: 'vs-dark',
        automaticLayout: true,
      });
      this.editor.onDidChangeModelContent(() => {
        this.onEditorChange();
      });
    });
  }

  
  private onEditorChange() {
    if (this.editor) {
      this.data.code = this.editor.getValue(); // 編集内容を取得
    }
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.data.code = this.editor.getValue(); // 編集内容を取得
      this.editor.dispose(); // メモリリークを防ぐために dispose() を呼ぶ
    }
  }
}
