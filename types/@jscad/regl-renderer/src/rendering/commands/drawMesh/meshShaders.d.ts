declare const meshVert: "\nprecision mediump float;\n\nuniform float camNear, camFar;\nuniform mat4 model, view, projection;\n\nattribute vec3 position, normal;\n\nvarying vec3 surfaceNormal, surfacePosition;\nvarying vec4 _worldSpacePosition;\n\nvoid main() {\n  surfacePosition = position;\n  surfaceNormal = normal;\n  vec4 worldSpacePosition = model * vec4(position, 1);\n  _worldSpacePosition = worldSpacePosition;\n\n  vec4 glPosition = projection * view * model * vec4(position, 1);\n  gl_Position = glPosition;\n}\n";
declare const meshFrag: "\nprecision mediump float;\nvarying vec3 surfaceNormal;\nuniform float ambientLightAmount;\nuniform float diffuseLightAmount;\nuniform vec4 ucolor;\nuniform vec3 lightDirection;\nuniform vec3 opacity;\n\nvarying vec4 _worldSpacePosition;\n\nuniform vec2 printableArea;\n\nvec4 errorColor = vec4(0.15, 0.15, 0.15, 0.3);\n\nvoid main () {\n  vec4 depth = gl_FragCoord;\n\n  float v = 0.8; // shadow value\n  vec4 endColor = ucolor;\n\n  vec3 ambient = ambientLightAmount * endColor.rgb;\n  float cosTheta = dot(surfaceNormal, lightDirection);\n  vec3 diffuse = diffuseLightAmount * endColor.rgb * clamp(cosTheta , 0.0, 1.0 );\n\n  float cosTheta2 = dot(surfaceNormal, vec3(-lightDirection.x, -lightDirection.y, lightDirection.z));\n  vec3 diffuse2 = diffuseLightAmount * endColor.rgb * clamp(cosTheta2 , 0.0, 1.0 );\n\n  gl_FragColor = vec4((ambient + diffuse + diffuse2 * v), endColor.a);\n}";
export { meshVert as vert, meshFrag as frag };
