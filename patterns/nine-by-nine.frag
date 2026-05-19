#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circle(in vec2 st, in float r) {
	vec2 _1 = st-vec2(.5);
	return 1. - smoothstep(r - (r*.01),
			               r + (r*.01),
						  dot(_1,_1)*4.);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec3 color = vec3(0.);

	st *= 3.;
	st = fract(st);

	color = vec3(st, 0.);
	color = vec3(circle(st, 0.5));

	gl_FragColor = vec4(color, 1.);
}
