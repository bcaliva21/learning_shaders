#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
	return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(dist,dist)*4.0);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 color = vec3(0.);

	vec2 pos = vec2(.5)-st;

	float r = length(pos)*2.;
	float a = atan(pos.y, pos.x);

	float f;
	// f = cos(a*3.);
    f = abs(cos(a*3.));
    // f = abs(cos(a*2.5))*.5+.3;
    // f = abs(cos(a*12.)*sin(a*3.))*.8+.1;
    // f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;

	color = vec3(circle(st,0.002125)*vec3(0.,0.,1.));
	vec3 colorTwo = vec3(1. - smoothstep(f, f + .1, r))*vec3(.85,.75,0.);
	color = max(color, colorTwo);
	vec3 hazyColor = vec3(1. - smoothstep(f, f + .5, r))*vec3(.2,.0,.2);
	color = max(color, hazyColor);
	vec3 miniColor = vec3(1. - smoothstep(f, f + .5, r*1.3))*vec3(1.,.2,.8);
	color = max(color, miniColor);
	vec3 evenMinierColor = vec3(1. - smoothstep(f, f + .5, r*1.6))*vec3(1.,1.,.8);
	color = max(color, evenMinierColor);
	vec3 color2 = vec3(1. - smoothstep(f, f + .5, r*1.9))*vec3(.1,1.,1.);
	color = max(color, color2);

	gl_FragColor = vec4(color, 1.0);
}

