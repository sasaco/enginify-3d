#!/usr/bin/env node
const ts = require('typescript');
const fs = require('fs');
const path = require('path');

/**
 * 指定したディレクトリ以下の全ての .js ファイルを再帰的に取得する関数
 * @param {string} dir - 検索するディレクトリ
 * @returns {string[]} - 見つかった .js ファイルのパス一覧
 */
function getJsFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.resolve(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getJsFiles(filePath));
    } else if (filePath.endsWith('.js')) {
      results.push(filePath);
    }
  });
  return results;
}

// コマンドライン引数で入力ディレクトリを指定できる（指定がなければデフォルトは ./node_modules）
const inputDir = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : path.resolve(__dirname, 'node_modules');

// 入力ディレクトリ内の .js ファイルを全て取得
const jsFiles = getJsFiles(inputDir);

if (jsFiles.length === 0) {
  console.log('対象となる .js ファイルが見つかりませんでした。');
  process.exit(0);
}

// TypeScript コンパイラのオプション設定
const compilerOptions = {
  allowJs: true,         // JavaScript ファイルもコンパイル対象にする
  checkJs: true,         // JavaScript ファイルの型チェックを有効化（JSDoc の注釈等を活用）
  declaration: true,     // 宣言ファイル（.d.ts）の生成を有効化
  emitDeclarationOnly: true, // コンパイル結果として .d.ts のみを出力
  outDir: path.resolve(__dirname, path.basename(inputDir)), // 出力先ディレクトリ（存在しない場合は自動生成される）
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
};

// プログラム（コンパイル対象）を作成
const program = ts.createProgram(jsFiles, compilerOptions);

// コンパイル（emit）を実行
const emitResult = program.emit();

// コンパイル中に発生したエラーや警告を取得
const diagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

// エラー情報の表示
diagnostics.forEach(diagnostic => {
  if (diagnostic.file) {
    const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
    console.error(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
  } else {
    console.error(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
  }
});

// エラーがあればプロセスを終了
if (diagnostics.length > 0) {
  console.error("型チェックに失敗しました。");
  process.exit(1);
} else {
  console.log("Declaration ファイルの生成が完了しました。");
}
