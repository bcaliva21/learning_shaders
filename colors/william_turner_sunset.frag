#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(.9,.1,.1);
vec3 colorB = vec3(1.,.8,.2);
vec3 colorC = vec3(.3,.3,.9);

float plot (vec2 st, float pct){
  return  smoothstep( pct-.01, pct, st.y) -
          smoothstep( pct, pct+.01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.);

	// add moves gradient left 
	// sub moves gradient right

    vec3 pct = vec3(st.y - .1); 
	vec3 bluePct = vec3(st.y - .1)-(vec3(st.x - .7));
	vec3 middleBlue = vec3(st.x - .8)/vec3(st.y - .4);
    // pct.r = smoothstep(0.0,1.0, st.x);
    // pct.g = sin(st.x*PI);
    // pct.b = pow(st.x,0.5);

    color = mix(colorA, colorB, pct);
	color = mix(color, colorC, bluePct);
	color = mix(color, colorC, middleBlue);

    // Plot transition line for each channel
    color = mix(color,vec3(1.,0.,0.),plot(st,pct.r));
    color = mix(color,vec3(0.,1.,0.),plot(st,pct.g));
    color = mix(color,vec3(0.,0.,1.),plot(st,pct.b));

    gl_FragColor = vec4(color,1.0);
}
