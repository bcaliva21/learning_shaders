#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 circle(vec2 st, float radius) {
	return vec3(1. - distance(st, vec2(radius)));
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	
	vec3 color = step(.9, circle(st, .5));
	gl_FragColor = vec4(color, 1.);
}

