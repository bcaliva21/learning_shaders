#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
	float pct = 0.;

	// a . Distance from the pixel to the center
	pct = distance(st, vec2(.5));

	// b. Length of the vector
	//    from the pixel to the center
	// vec2 toCenter = vec2(.5) - st;
	// pct = length(toCenter);

	// c. Square root of the vector
	//    from the pixel to the center
	// vec2 toCenter = vec2(.5) - st;
	// pct = sqrt(toCenter.x*toCenter.x+toCenter.y*toCenter.y);

	vec3 color = smoothstep(0.0, 1. ,vec3(pct));

	gl_FragColor = vec4(color, 1.);
}
