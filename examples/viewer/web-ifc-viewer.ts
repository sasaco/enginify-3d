import { IFCAPPLICATION } from './../../src/ts/ifc-schema';
import { IfcAPI, LogLevel,ms, Schemas, IFCUNITASSIGNMENT, IFCAXIS2PLACEMENT3D,IFCLENGTHMEASURE,IFCCARTESIANPOINT,IFCAXIS2PLACEMENT2D,IFCCIRCLEPROFILEDEF,IFCDIRECTION,IFCREAL,IFCPOSITIVELENGTHMEASURE,IFCCOLUMN,IFCEXTRUDEDAREASOLID,IFCGLOBALLYUNIQUEID,IFCLABEL,IFCIDENTIFIER } from '../../src/ts/web-ifc-api';
// Import Three.js components
declare const THREE: any;
declare const OrbitControls: any;
import { Init3DView, InitBasicScene, ClearScene, scene } from './web-ifc-scene';
import { IfcThree } from './web-ifc-three';
// Monaco and TypeScript imports
declare const monaco: any;
declare const require: any;
const ts_decl = require("./ts_src");
import * as ts from "typescript";

// Declare global window interface extensions
declare global {
    interface Window {
        ifcAPI: IfcAPI;
        IFC4: {
            IfcProfileTypeEnum: {
                AREA: number;
            };
        };
        exampleCode: string;
    }
}

// Initialize default example code
const defaultExampleCode = `
interface pt {
    x: number, y: number, z: number;
}

const gridSize = 6;

let dir: pt =  { x: 0, y: 0, z: 1 };
let rad: number = 0.25;
let len: number = 2;
let direction = ifcAPI.CreateIfcEntity(model,IFCDIRECTION, [ifcAPI.CreateIfcType(model,IFCREAL,dir.x), ifcAPI.CreateIfcType(model,IFCREAL,dir.y), ifcAPI.CreateIfcType(model,IFCREAL,dir.z)]);
let profileLocation = ifcAPI.CreateIfcEntity(model,IFCCARTESIANPOINT, [ifcAPI.CreateIfcType(model,IFCLENGTHMEASURE,0), ifcAPI.CreateIfcType(model,IFCLENGTHMEASURE,0)]);
let profileAxis = ifcAPI.CreateIfcEntity(model,IFCAXIS2PLACEMENT2D, profileLocation, null);
let profile =  ifcAPI.CreateIfcEntity(model, IFCCIRCLEPROFILEDEF, 1, ifcAPI.CreateIfcType(model,IFCLABEL,'column-prefab'), profileAxis, ifcAPI.CreateIfcType(model,IFCPOSITIVELENGTHMEASURE,rad));   

for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
    
        let pos:pt = {x: i, y: j, z: 0};
   
        let location = ifcAPI.CreateIfcEntity(model,IFCCARTESIANPOINT, [ifcAPI.CreateIfcType(model,IFCLENGTHMEASURE,pos.x), ifcAPI.CreateIfcType(model,IFCLENGTHMEASURE,pos.y),ifcAPI.CreateIfcType(model,IFCLENGTHMEASURE,pos.z)]);
        let placement= ifcAPI.CreateIfcEntity(model, IFCAXIS2PLACEMENT3D, location, null, null);
        
        let solid = ifcAPI.CreateIfcEntity(model, IFCEXTRUDEDAREASOLID, profile, placement, direction, ifcAPI.CreateIfcType(model,IFCPOSITIVELENGTHMEASURE,len));

        let column = ifcAPI.CreateIfcEntity(model,IFCCOLUMN, ifcAPI.CreateIfcType(model, IFCGLOBALLYUNIQUEID,"GUID"), null,ifcAPI.CreateIfcType(model,IFCLABEL,"name"),null, ifcAPI.CreateIfcType(model,IFCLABEL,"label"),  placement, solid,ifcAPI.CreateIfcType(model,IFCIDENTIFIER,"sadf"), null);

        ifcAPI.WriteLine(model, column);
    }
}`;

// Set window.exampleCode to default
window.exampleCode = defaultExampleCode;

let ifcAPI = new IfcAPI();

// Initialize API and expose to window
async function initializeAPI() {
    try {
        console.log("Starting IFC API initialization...");
        
        // Set WASM path before any other operations
        console.log("Setting WASM path...");
        // Set path to './web-ifc/' to match our directory structure
        ifcAPI.SetWasmPath('./web-ifc/');
        console.log("WASM path set to './web-ifc/'");
        
        // List expected WASM files for verification
        const wasmFiles = [
            'web-ifc.wasm',
            'web-ifc-mt.worker.js',
            'web-ifc-mt.wasm'
        ];
        console.log("Expected WASM files:", wasmFiles);
        
        console.log("Checking WASM file URLs:", wasmFiles);
        
        // Initialize API with proper WASM loading
        try {
            console.log("Attempting to initialize WASM module...");
            await ifcAPI.Init();
            console.log("WASM module initialization completed");
        } catch (error) {
            console.error("WASM initialization error:", error);
            throw error;
        }
        
        // Verify WASM module initialization
        if (!ifcAPI.wasmModule) {
            console.error("WASM module verification failed");
            throw new Error("WASM module not initialized properly");
        }
        
        console.log("IFC API initialization successful");
        
        // Expose initialized API and IFC4 to window
        window.ifcAPI = ifcAPI;
        window.IFC4 = { IfcProfileTypeEnum: { AREA: 1 } };
        return true;
    } catch (error) {
        console.error("Failed to initialize IFC API:", error);
        return false;
    }
}

// Initialize Three.js scene
Init3DView();

let ifcThree = new IfcThree(ifcAPI);

let timeout: ReturnType<typeof setTimeout> | undefined = undefined;

function Edited(monacoEditor: any) {
    let code = monacoEditor.getValue();
    window.localStorage.setItem('code', code);
    console.log("Saved code...");
}

// InitMonaco is defined below

function initMonacoEditor(monacoEditor: any) {
    let item = window.localStorage.getItem("code");
    if (item) {
        monacoEditor.setValue(item);
    } else {
        monacoEditor.setValue(window.exampleCode);
    }

    monacoEditor.onDidChangeModelContent((e: any) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => Edited(monacoEditor), 1000);
    });

    setTimeout(() => {
        Edited(monacoEditor);
    }, 1000);
}

// Initialize viewer function
async function initWebIfcViewer(monacoEditor: any) {
  try {
    // Initialize Three.js scene first
    Init3DView();
    
    // Ensure proper IFC API initialization
    console.log("Initializing IFC API...");
    const success = await initializeAPI();
    if (!success) {
      throw new Error('Failed to initialize IFC API');
    }
    console.log("IFC API initialized successfully");
    
    initMonacoEditor(monacoEditor);
    const fileInput = document.getElementById('finput');
    const codereset = document.getElementById('rcode');
    const coderun = document.getElementById('runcode');
    const clearmem = document.getElementById('cmem');
    const changeLogLevelSelect = document.getElementById('logLevel');
    
    if (!fileInput || !codereset || !coderun || !clearmem || !changeLogLevelSelect) {
      throw new Error('Required DOM elements not found');
    }

    fileInput.addEventListener('change', async (e) => await fileInputChanged());
    codereset.addEventListener('click', async (e) => await resetCode());
    coderun.addEventListener('click', async (e) => await runCode());
    clearmem.addEventListener('click', async (e) => await clearMem());
    changeLogLevelSelect.addEventListener('change', async (e) => await changeLogLevel());
  } catch (error) {
    console.error('Failed to initialize viewer:', error);
    throw error;
  }
  const fileInput = document.getElementById('finput');
  const codereset = document.getElementById('rcode');
  const coderun = document.getElementById('runcode');
  const clearmem = document.getElementById('cmem');
  const changeLogLevelSelect = document.getElementById('logLevel');
  
  if (!fileInput || !codereset || !coderun || !clearmem || !changeLogLevelSelect) {
    console.error('Required DOM elements not found');
    return;
  }

  fileInput.addEventListener('change', async (e) => await fileInputChanged());
  codereset.addEventListener('click', async (e) => await resetCode());
  coderun.addEventListener('click', async (e) => await runCode());
  clearmem.addEventListener('click', async (e) => await clearMem());
  changeLogLevelSelect.addEventListener('change', async (e) => await changeLogLevel());
  Init3DView();
}

// Initialize Monaco function
function InitMonaco(monaco: any) {
  // validation settings
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true
  });
  
  // compiler options
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES6,
    allowNonTsExtensions: true
  });
  
  console.log(monaco.languages.typescript.typescriptDefaults.addExtraLib(ts_decl.ifc_schema));
  console.log(monaco.languages.typescript.typescriptDefaults.addExtraLib(ts_decl.wifcapi));
}

// Expose functions to window
if (typeof window !== 'undefined') {
  (window as any).InitWebIfcViewer = initWebIfcViewer;
  (window as any).InitMonaco = InitMonaco;
}

async function changeLogLevel() 
{
    let fileInput = <HTMLInputElement>document.getElementById('logLevel');
    ifcAPI.SetLogLevel(parseInt(fileInput.value) as LogLevel);
    console.log("Log Level Set to:"+fileInput.value);
}

async function runCode() {
  try {
    // Ensure API is properly initialized with WASM module
    if (!window.ifcAPI || !window.ifcAPI.wasmModule) {
      console.log("IFC API not initialized or WASM module missing, attempting reinitialization...");
      await clearMem(); // Clear any existing state
      const success = await initializeAPI();
      if (!success) {
        throw new Error("Failed to initialize IFC API");
      }
    }
    
    console.log("Creating IFC model...");
    const model = window.ifcAPI.CreateModel({schema: Schemas.IFC4});
    
    scene.clear();
    InitBasicScene();

    const code = window.localStorage.getItem('code') || '';
    const compiled = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS }});

    // Execute the compiled code
    console.log(` --- Starting Code Execution!`);
    eval(`(function (model, ifcAPI) {
      const IFCAXIS2PLACEMENT3D = ${IFCAXIS2PLACEMENT3D};
      const IFCLENGTHMEASURE = ${IFCLENGTHMEASURE};
      const IFCCARTESIANPOINT = ${IFCCARTESIANPOINT};
      const IFCAXIS2PLACEMENT2D = ${IFCAXIS2PLACEMENT2D};
      const IFCCIRCLEPROFILEDEF = ${IFCCIRCLEPROFILEDEF};
      const IFCDIRECTION = ${IFCDIRECTION};
      const IFCREAL = ${IFCREAL};
      const IFCPOSITIVELENGTHMEASURE = ${IFCPOSITIVELENGTHMEASURE};
      const IFCCOLUMN = ${IFCCOLUMN};
      const IFCEXTRUDEDAREASOLID = ${IFCEXTRUDEDAREASOLID};
      const IFCGLOBALLYUNIQUEID = ${IFCGLOBALLYUNIQUEID};
      const IFCLABEL = ${IFCLABEL};
      const IFCIDENTIFIER = ${IFCIDENTIFIER};
      ${compiled.outputText}
    })`)(model, window.ifcAPI);
    console.log(` --- Ending Code Execution!`);

    const ifcData = window.ifcAPI.SaveModel(model);
    const ifcDataString = new TextDecoder('ascii').decode(ifcData);

    window.ifcAPI.CloseModel(model);

    const m2 = window.ifcAPI.OpenModel(ifcData);
    ifcThree.LoadAllGeometry(scene, m2);
  } catch (error) {
    console.error("Error running code:", error);
  }
}

async function resetCode() {
    window.localStorage.setItem('code', window.exampleCode);
    location.reload();
}

async function clearMem() {
    ClearScene();
    ifcAPI.Dispose();
    await ifcAPI.Init();
}

async function fileInputChanged() {
  const fileInput = <HTMLInputElement>document.getElementById('finput');
  if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
    console.log('No files selected!');
    return;
  }
  const file = fileInput.files[0];
  const reader = getFileReader(fileInput);
  reader.readAsArrayBuffer(file);
}

function getFileReader(fileInput: HTMLInputElement){
  var reader = new FileReader();
  reader.onload = () => {
    const data = getData(reader);
    LoadModel(data);
    fileInput.value = '';
  };
  return reader;
}

function getData(reader : FileReader){
  const startRead = ms();
  //@ts-ignore
  const data = new Uint8Array(reader.result);
  const readTime = ms() - startRead;
  console.log(`Reading took ${readTime} ms`);
  return data;
}

async function LoadModel(data: Uint8Array) {
    const start = ms();
    //TODO: This needs to be fixed in the future to rely on elalish/manifold
    const modelID = ifcAPI.OpenModel(data, { COORDINATE_TO_ORIGIN: true }); 
    const time = ms() - start;
    console.log(`Opening model took ${time} ms`);
    ifcThree.LoadAllGeometry(scene, modelID);


    if(ifcAPI.GetModelSchema(modelID) == 'IFC2X3' || 
    ifcAPI.GetModelSchema(modelID) == 'IFC4' ||
    ifcAPI.GetModelSchema(modelID) == 'IFC4X3_RC4')
    {   
        //Example to get all types used in the model
        let types = await ifcAPI.GetAllTypesOfModel(modelID);
        if(types)
        {
            for (let i = 0; i < types.length; i++) {
                let type = types[i];
                //console.log(type);
                //console.log(type.typeID);
                //console.log(type.typeName);
            }
        }
    }

    try
    {
        // This function should activate only if we are in IFC4X3
        let alignments = await ifcAPI.GetAllAlignments(modelID);
        console.log("Alignments: ", alignments);
    } catch (error) {
        // Code to handle the error
        console.error("An error occurred:", error);
    }

    let lines = ifcAPI.GetLineIDsWithType(modelID,  IFCUNITASSIGNMENT);
    //console.log(lines.size());
    for(let l = 0; l < lines.size(); l++)
    {
        //console.log(lines.get(l));
        let unitList = ifcAPI.GetLine(modelID, lines.get(l));
        //console.log(unitList);
        //console.log(unitList.Units);
        //console.log(unitList.Units.length);
        for(let u = 0; u < unitList.Units.length; u++) {
            //console.log(ifcAPI.GetLine(modelID, unitList.Units[u].value));
        }
    }
    ifcAPI.CloseModel(modelID);
}
