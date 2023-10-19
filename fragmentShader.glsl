// Fragment shader
varying vec2 vUv;
uniform float time;

void main() {
    vec3 color = vec3(0.5 + 0.5 * sin(time), 0.5 + 0.5 * cos(time), 0.5 + 0.5 * sin(time + 2.0));
    gl_FragColor = vec4(color, 1.0);
}