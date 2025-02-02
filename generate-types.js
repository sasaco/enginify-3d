const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const jscadDir = path.join(__dirname, 'node_modules', '@jscad');
const typesDir = path.join(__dirname, 'types', '@jscad');

// Ensure types directory exists
if (!fs.existsSync(typesDir)) {
  fs.mkdirSync(typesDir, { recursive: true });
}

// Read all @jscad packages
const packages = fs.readdirSync(jscadDir);

// Create web package type definitions manually since it requires special handling
const webTypesDir = path.join(typesDir, 'web');
if (!fs.existsSync(webTypesDir)) {
  fs.mkdirSync(webTypesDir, { recursive: true });
}
fs.copyFileSync(
  path.join(__dirname, 'types', '@jscad', 'web', 'index.d.ts'),
  path.join(webTypesDir, 'index.d.ts')
);

packages.forEach(pkg => {
  const pkgDir = path.join(jscadDir, pkg);
  const pkgTypesDir = path.join(typesDir, pkg);
  
  if (fs.statSync(pkgDir).isDirectory()) {
    // Create package-specific tsconfig
    const tsconfig = {
      compilerOptions: {
        target: "es2018",
        module: "commonjs",
        declaration: true,
        declarationMap: true,
        emitDeclarationOnly: true,
        allowJs: true,
        checkJs: true,
        outDir: pkgTypesDir,
        skipLibCheck: true,
        noImplicitAny: false,
        strict: false,
        esModuleInterop: true,
        resolveJsonModule: true,
        baseUrl: ".",
        paths: {
          "@jscad/*": ["node_modules/@jscad/*"]
        }
      },
      include: [
        path.join(pkgDir, "**/*.js"),
        path.join(pkgDir, "**/*.ts")
      ],
      exclude: [
        "**/*.test.js",
        "**/*.spec.js",
        "**/node_modules"
      ]
    };

    const tsconfigPath = path.join(pkgDir, 'tsconfig.json');
    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));

    try {
      // Create output directory
      if (!fs.existsSync(pkgTypesDir)) {
        fs.mkdirSync(pkgTypesDir, { recursive: true });
      }

      // Run tsc
      execSync(`npx tsc -p ${tsconfigPath}`, { stdio: 'inherit' });
    } catch (error) {
      console.error(`Error processing ${pkg}:`, error);
    }
  }
});
