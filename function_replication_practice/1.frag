#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct) {
	return smoothstep(pct-0.02, pct, st.y) -
		   smoothstep(pct, pct+0.02, st.y);
}

void main() {
	vec2 st = gl_FragCoord.xy / u_resolution;

	// float y = smoothstep(0.0, 0.4, st.x) -
	// 		  smoothstep(0.4, 0.8, st.x);

	float y = 1. - pow(abs(st.x), .7) + .5;
	float y2 = log(pow(st.x, .7) + .5);

	vec3 color = vec3(y);

	float pct = plot(st, y);
	float pct2 = plot(st, y2);
	color = (1.-pct)*color+pct*vec3(0., 1., 0.);
	color += (1.-pct2)*color+pct2*vec3(0., 1., 0.);

	gl_FragColor = vec4(color, 1.0);
}
