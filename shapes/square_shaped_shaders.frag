#ifdef ES_GL
precision mediump;
#endif

uniform vec2 u_resolution;
uniform float u_mouse;
uniform float u_time;

void main() {
	vec2 st = gl_FragCoord.xy / u_resolution.xy;
	vec2 c = st;
	c = c - .5;
	c = c * 2.;
	vec2 r =abs(c.xy);
	float s = max(r.x,r.y);
	vec4 f = vec4(vec3(smoothstep(.3,.4,s)* smoothstep(.6,.5,s)),1.);

	gl_FragColor = f;
}
