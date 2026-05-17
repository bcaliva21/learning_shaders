#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec2 pos = vec2(0.5)-st;

    float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x);

    // float f = cos(a*3.);
    // float f = abs(cos(a*4.));
    // float f = abs(cos(a*2.5))*.5+.3;
    float f = abs(cos(a*24.)*sin(a*3.))*.8+.1;
    // float f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5

	// color = vec3( 1. - (smoothstep(f,f+0.02,r) / smoothstep(f,f+0.02,r*2.9)));

	f = (1. - tan(.99*sin(abs(cos(f*2.1)))))*2.;
	color = 1. - vec3(smoothstep(f,f+0.3,r*3.9));

    gl_FragColor = vec4(color, 1.0);
}

