precision highp float;

uniform float radius;

uniform vec2 resolution;

void main() {
	float x = gl_FragCoord.x - (resolution.x / 2.0);
	float y = gl_FragCoord.y - (resolution.y / 2.0);

	float color = float(pow(x, 2.0) + pow(y, 2.0) < (radius * radius));

	gl_FragColor = vec4(color, color, color, color);
}
