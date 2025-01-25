import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as monaco from 'monaco-editor';

import { InputDataService } from 'src/app/providers/input-data.service';

@Component({
  selector: 'app-input-source',
  templateUrl: './input-source.component.html'
})
export class InputSourceComponent implements AfterViewInit, OnDestroy  {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;
  private editor!: monaco.editor.IStandaloneCodeEditor;
  
  constructor(
    private data: InputDataService,
  ) {
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
