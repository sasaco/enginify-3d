import { Injectable } from '@angular/core';
import { OpencascadeService } from '../opencascade/opencascade.service';
import type OpenCascadeInstance from 'opencascade.js';

// --- Matrix Math Utilities ---
function createProjectionMatrix(fov: number, aspect: number, near: number, far: number): number[] {
  const f = 1.0 / Math.tan(fov / 2);
  return [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) / (near - far), -1, 0, 0, (2 * far * near) / (near - far), 0];
}

function createIdentityMatrix(): number[] {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}

function multiplyMatrices(a: number[], b: number[]): number[] {
  const out: number[] = []; // Initialize with a fixed size or ensure it's correctly populated.
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let sum = 0;
      for (let k = 0; k < 4; k++) {
        sum += a[i * 4 + k] * b[k * 4 + j];
      }
      out[i * 4 + j] = sum;
    }
  }
  return out;
}


function createTranslationMatrix(x: number, y: number, z: number): number[] {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];
}

function createXRotationMatrix(angle: number): number[] {
  const c = Math.cos(angle); const s = Math.sin(angle);
  return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1];
}

function createYRotationMatrix(angle: number): number[] {
  const c = Math.cos(angle); const s = Math.sin(angle);
  return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1];
}
function createZRotationMatrix(angle: number): number[] {
  const c = Math.cos(angle); const s = Math.sin(angle);
  return [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}
function createScaleMatrix(x: number, y: number, z: number): number[] {
  return [x,0,0,0, 0,y,0,0, 0,0,z,0, 0,0,0,1];
}

// --- Vec3 Math ---
function subtractVectors(a: [number,number,number], b: [number,number,number]): [number,number,number] { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
function normalizeVector(v: [number,number,number]): [number,number,number] {
    const l = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
    return l > 0.00001 ? [v[0]/l, v[1]/l, v[2]/l] : [0,0,0];
}
function crossVectors(a: [number,number,number], b: [number,number,number]): [number,number,number] {
    return [a[1]*b[2] - a[2]*b[1], a[2]*b[0] - a[0]*b[2], a[0]*b[1] - a[1]*b[0]];
}
function createLookAtMatrix(cameraPosition: [number,number,number], target: [number,number,number], up: [number,number,number]): number[] {
    const zAxis = normalizeVector(subtractVectors(cameraPosition, target));
    const xAxis = normalizeVector(crossVectors(up, zAxis));
    const yAxis = normalizeVector(crossVectors(zAxis, xAxis));
    return [
        xAxis[0], yAxis[0], zAxis[0], 0, xAxis[1], yAxis[1], zAxis[1], 0, xAxis[2], yAxis[2], zAxis[2], 0,
        -(xAxis[0]*cameraPosition[0] + xAxis[1]*cameraPosition[1] + xAxis[2]*cameraPosition[2]),
        -(yAxis[0]*cameraPosition[0] + yAxis[1]*cameraPosition[1] + yAxis[2]*cameraPosition[2]),
        -(zAxis[0]*cameraPosition[0] + zAxis[1]*cameraPosition[1] + zAxis[2]*cameraPosition[2]), 1,
    ];
}

export type TransformMode = 'translate' | 'rotate' | 'scale' | null;

@Injectable({ providedIn: 'root' })
export class SceneService {
  private oc?: OpenCascadeInstance;
  private canvas?: HTMLCanvasElement;
  private gl?: WebGLRenderingContext;
  private shaderProgram?: WebGLProgram;
  private vertexPositionAttribute?: number;
  private projectionMatrixUniform?: WebGLUniformLocation;
  private modelViewMatrixUniform?: WebGLUniformLocation;
  private objectColorUniform?: WebGLUniformLocation;


  private meshBuffer?: { vertexBuffer: WebGLBuffer | null; vertexCount: number; };
  private projectionMatrix: number[] = createIdentityMatrix();
  
  // Camera properties
  private cameraViewMatrix: number[] = createIdentityMatrix(); // Separate from object's model matrix
  private cameraTarget: [number, number, number] = [0, 0, 0];
  private cameraAzimuth: number = Math.PI / 4;
  private cameraElevation: number = Math.PI / 4;
  private cameraDistance: number = 150;
  private readonly upVector: [number, number, number] = [0, 1, 0];

  // Object transform properties (for the single box)
  private objectPosition: [number, number, number] = [0, 0, 0];
  private objectRotation: [number, number, number] = [0, 0, 0]; // Euler angles: X, Y, Z
  private objectScale: [number, number, number] = [1, 1, 1];
  private objectModelMatrix: number[] = createIdentityMatrix();

  // Interaction state
  private isDragging: boolean = false;
  private lastMouseX: number = -1;
  private lastMouseY: number = -1;
  private- mouseButton: number = -1;
  public currentTransformMode: TransformMode = null;


  constructor(private opencascadeService: OpencascadeService) {}

  public async OnInit(canvasElement: HTMLCanvasElement): Promise<boolean> {
    this.canvas = canvasElement;
    try {
      await this.opencascadeService.initialize();
      this.oc = this.opencascadeService.getOpenCascade();
      if (!this.oc) { console.error('OpenCascade failed to initialize.'); return false; }

      this.gl = this.canvas.getContext('webgl');
      if (!this.gl) {
        console.error('WebGL not supported');
        const ctx = this.canvas.getContext('2d');
        if (ctx) { ctx.fillStyle = 'red'; ctx.font = '16px Arial'; ctx.fillText('WebGL Init Failed!', 10, 50); }
        return false;
      }

      this.initShaders();
      this.initWebGLState();
      this.initCamera();
      this.updateObjectModelMatrix(); // Init object matrix
      this.initEventListeners();

      console.log('SceneService initialized.');
      this.onWindowResize();
      this.loadAndShowBox();
      return true;
    } catch (error) {
      console.error('Error initializing SceneService:', error);
      return false;
    }
  }

  private initCamera(): void {
    this.cameraTarget = [0,0,0]; // Target origin where box is
    this.updateCameraViewMatrix();
  }

  private updateCameraViewMatrix(): void {
    const eyeX = this.cameraTarget[0] + this.cameraDistance * Math.sin(this.cameraElevation) * Math.cos(this.cameraAzimuth);
    const eyeY = this.cameraTarget[1] + this.cameraDistance * Math.cos(this.cameraElevation);
    const eyeZ = this.cameraTarget[2] + this.cameraDistance * Math.sin(this.cameraElevation) * Math.sin(this.cameraAzimuth);
    this.cameraViewMatrix = createLookAtMatrix([eyeX, eyeY, eyeZ], this.cameraTarget, this.upVector);
  }

  private updateObjectModelMatrix(): void {
    let modelMatrix = createIdentityMatrix();
    const transMatrix = createTranslationMatrix(this.objectPosition[0], this.objectPosition[1], this.objectPosition[2]);
    const rotXMatrix = createXRotationMatrix(this.objectRotation[0]);
    const rotYMatrix = createYRotationMatrix(this.objectRotation[1]);
    const rotZMatrix = createZRotationMatrix(this.objectRotation[2]);
    const scaleMatrix = createScaleMatrix(this.objectScale[0], this.objectScale[1], this.objectScale[2]);

    // TRS order: Scale, Rotate, Translate
    modelMatrix = multiplyMatrices(rotXMatrix, scaleMatrix);
    modelMatrix = multiplyMatrices(rotYMatrix, modelMatrix);
    modelMatrix = multiplyMatrices(rotZMatrix, modelMatrix);
    modelMatrix = multiplyMatrices(transMatrix, modelMatrix);
    this.objectModelMatrix = modelMatrix;
  }


  private initEventListeners(): void {
    if (!this.canvas) return;
    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.canvas.addEventListener('wheel', this.onMouseWheel.bind(this));
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  public setTransformMode(mode: TransformMode): void {
    this.currentTransformMode = mode;
    console.log("Transform mode set to: " + mode);
    // Add visual feedback for selected object or mode if desired
    this.render(); // Re-render to show selection feedback potentially
  }

  private onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
    this.mouseButton = event.button;
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;

    const deltaX = event.clientX - this.lastMouseX;
    const deltaY = event.clientY - this.lastMouseY;
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;

    if (this.currentTransformMode) { // Object transformation
        const transformSpeed = 0.5; // Adjust as needed
        switch(this.currentTransformMode) {
            case 'translate':
                // Simplistic screen-space translation, better to use camera vectors
                this.objectPosition[0] += deltaX * transformSpeed;
                this.objectPosition[1] -= deltaY * transformSpeed; // Y is inverted
                break;
            case 'rotate':
                this.objectRotation[1] += deltaX * 0.01; // Yaw
                this.objectRotation[0] += deltaY * 0.01; // Pitch
                break;
            case 'scale':
                // Uniform scale for simplicity based on vertical mouse movement
                const scaleFactor = 1 + deltaY * 0.01;
                this.objectScale[0] *= scaleFactor;
                this.objectScale[1] *= scaleFactor;
                this.objectScale[2] *= scaleFactor;
                // Prevent zero or negative scale
                this.objectScale[0] = Math.max(0.01, this.objectScale[0]);
                this.objectScale[1] = Math.max(0.01, this.objectScale[1]);
                this.objectScale[2] = Math.max(0.01, this.objectScale[2]);
                break;
        }
        this.updateObjectModelMatrix();
    } else { // Camera manipulation
        if (this.mouseButton === 0) { // Left button for camera rotation
          this.cameraAzimuth += deltaX * 0.01;
          this.cameraElevation += deltaY * 0.01;
          this.cameraElevation = Math.max(0.01, Math.min(Math.PI - 0.01, this.cameraElevation));
        } else if (this.mouseButton === 2) { // Right button for camera panning
          const panSpeed = 0.2;
          // This panning needs to be relative to camera's current view for intuitiveness
          // Using cameraViewMatrix's basis vectors (first 3 columns for X,Y,Z axes)
          const rightVec = [this.cameraViewMatrix[0], this.cameraViewMatrix[4], this.cameraViewMatrix[8]];
          const upVec    = [this.cameraViewMatrix[1], this.cameraViewMatrix[5], this.cameraViewMatrix[9]]; // OpenGL up is Y

          this.cameraTarget[0] -= (rightVec[0] * deltaX * panSpeed + upVec[0] * -deltaY * panSpeed);
          this.cameraTarget[1] -= (rightVec[1] * deltaX * panSpeed + upVec[1] * -deltaY * panSpeed);
          this.cameraTarget[2] -= (rightVec[2] * deltaX * panSpeed + upVec[2] * -deltaY * panSpeed);
        }
        this.updateCameraViewMatrix();
    }
    this.render();
  }

  private onMouseUp(event: MouseEvent): void {
    this.isDragging = false;
  }

  private onMouseWheel(event: WheelEvent): void {
    event.preventDefault();
    if (this.currentTransformMode === 'scale') {
        const scaleFactor = 1 - event.deltaY * 0.001;
        this.objectScale[0] *= scaleFactor;
        this.objectScale[1] *= scaleFactor;
        this.objectScale[2] *= scaleFactor;
        this.objectScale[0] = Math.max(0.01, this.objectScale[0]);
        this.objectScale[1] = Math.max(0.01, this.objectScale[1]);
        this.objectScale[2] = Math.max(0.01, this.objectScale[2]);
        this.updateObjectModelMatrix();
    } else {
        const zoomSpeed = 1.0;
        this.cameraDistance += event.deltaY * zoomSpeed;
        this.cameraDistance = Math.max(10, this.cameraDistance);
        this.updateCameraViewMatrix();
    }
    this.render();
  }

  private initShaders(): void {
    if (!this.gl) return;
    const vsSource = `
      attribute vec3 aVertexPosition;
      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;
      void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
      }
    `;
    const fsSource = `
      precision mediump float;
      uniform vec3 uObjectColor;
      void main(void) {
        gl_FragColor = vec4(uObjectColor, 1.0);
      }
    `;
    const vertexShader = this.compileShader(vsSource, this.gl.VERTEX_SHADER);
    const fragmentShader = this.compileShader(fsSource, this.gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) throw new Error("Shader compilation failed");

    this.shaderProgram = this.gl.createProgram()!;
    this.gl.attachShader(this.shaderProgram, vertexShader);
    this.gl.attachShader(this.shaderProgram, fragmentShader);
    this.gl.linkProgram(this.shaderProgram);
    if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
      throw new Error('Shader link failed: ' + this.gl.getProgramInfoLog(this.shaderProgram));
    }
    this.gl.useProgram(this.shaderProgram);
    this.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, 'aVertexPosition');
    this.projectionMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, 'uProjectionMatrix')!;
    this.modelViewMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, 'uModelViewMatrix')!;
    this.objectColorUniform = this.gl.getUniformLocation(this.shaderProgram, 'uObjectColor')!;
  }

  private compileShader(source: string, type: number): WebGLShader | null {
    if (!this.gl) return null;
    const shader = this.gl.createShader(type)!;
    this.gl.shaderSource(shader, source); this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error('Shader compile error: ' + this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader); return null;
    }
    return shader;
  }

  private initWebGLState(): void {
    if (!this.gl) return;
    this.gl.clearColor(0.1, 0.1, 0.2, 1.0);
    this.gl.enable(this.gl.DEPTH_TEST); this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  public loadAndShowBox(): void {
    if (!this.oc || !this.gl) { console.error('OC or GL not init.'); return; }
    console.log('Creating box shape...');
    const boxShape = new this.oc.BRepPrimAPI_MakeBox(30, 40, 50).Shape();
    this.objectPosition = [0,0,0]; this.objectRotation = [0,0,0]; this.objectScale = [1,1,1];
    this.updateObjectModelMatrix();
    this.cameraTarget = [0,0,0]; this.updateCameraViewMatrix();
    
    console.log('Triangulating shape...');
    new this.oc.BRepMesh_IncrementalMesh(boxShape, 0.1, false, 0.5, true);
    let triangles: number[] = [];
    const expl = new this.oc.TopExp_Explorer_2();
    expl.Init(boxShape, this.oc.TopAbs_FACE, this.oc.TopAbs_SHAPE);
    while (expl.More()) {
        const face = this.oc.TopoDS.Face_1(expl.Current());
        const location = new this.oc.TopLoc_Location_1();
        const triangulation = this.oc.BRep_Tool.Triangulation(face, location, 0);
        if (triangulation.IsNull()) { expl.Next(); continue; }
        const nodes = triangulation.Nodes(); const tris = triangulation.Triangles();
        for (let i = 1; i <= tris.Length(); i++) {
            const tri = tris.Value(i);
            const V1 = nodes.Value(tri.Value(1)); const V2 = nodes.Value(tri.Value(2)); const V3 = nodes.Value(tri.Value(3));
            triangles.push(V1.X(),V1.Y(),V1.Z(), V2.X(),V2.Y(),V2.Z(), V3.X(),V3.Y(),V3.Z());
        }
        expl.Next();
    }
    if (triangles.length === 0) { console.error("No triangles generated."); return; }
    console.log(`Generated ${triangles.length / 3} vertices.`);
    const vbo = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(triangles), this.gl.STATIC_DRAW);
    this.meshBuffer = { vertexBuffer: vbo, vertexCount: triangles.length / 3 };
    this.render();
  }

  public render(): void {
    if (!this.gl || !this.shaderProgram || !this.meshBuffer?.vertexBuffer) return;
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.useProgram(this.shaderProgram);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.meshBuffer.vertexBuffer);
    this.gl.vertexAttribPointer(this.vertexPositionAttribute!, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.vertexPositionAttribute!);
    
    // Combine camera view matrix with object's own model matrix
    const finalModelViewMatrix = multiplyMatrices(this.cameraViewMatrix, this.objectModelMatrix);
    this.gl.uniformMatrix4fv(this.projectionMatrixUniform!, false, new Float32Array(this.projectionMatrix));
    this.gl.uniformMatrix4fv(this.modelViewMatrixUniform!, false, new Float32Array(finalModelViewMatrix));

    // Visual feedback for selection (e.g. transform mode active)
    let color = [0.8, 0.8, 0.8]; // Default color
    if (this.currentTransformMode === 'translate') color = [0.6, 1.0, 0.6]; // Greenish
    else if (this.currentTransformMode === 'rotate') color = [0.6, 0.6, 1.0]; // Bluish
    else if (this.currentTransformMode === 'scale') color = [1.0, 0.6, 0.6]; // Reddish
    this.gl.uniform3fv(this.objectColorUniform!, new Float32Array(color));

    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.meshBuffer.vertexCount);
  }

  public onWindowResize(): void {
    if (!this.canvas || !this.gl) return;
    const dpr = window.devicePixelRatio || 1;
    const displayWidth  = Math.floor(this.canvas.clientWidth * dpr);
    const displayHeight = Math.floor(this.canvas.clientHeight * dpr);
    if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {
      this.canvas.width = displayWidth; this.canvas.height = displayHeight;
    }
    this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
    const fieldOfView = 45 * Math.PI/180;
    const aspect = this.gl.drawingBufferWidth / this.gl.drawingBufferHeight;
    this.projectionMatrix = createProjectionMatrix(fieldOfView, aspect, 0.1, 500.0);
    this.render();
  }
}
