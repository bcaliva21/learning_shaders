#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 blue = vec3(.1,.2,.9);
vec3 orange = vec3(1.,.5,0.);
vec3 red = vec3(1.,.3,.1);
vec3 black = vec3(0.,0.,0.);

float plot (vec2 st, float pct){
  return  smoothstep( pct-.01, pct, st.y) -
          smoothstep( pct, pct+.01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.01,0.,0.09);

    vec3 pct = vec3(st.y + .5);

    // pct.r = smoothstep(0.0,1.0, st.x);
    // pct.g = sin(st.x*PI);
    // pct.b = pow(st.x,0.5);

    color = mix(color, red, pct);
    // color = mix(color, orange, pctO);
    // color = mix(color, orange, log(pct));
    // color = mix(color, black, pct2);
	color = sin(color - u_time);

    // Plot transition lines for each channel
    // color = mix(color,vec3(1.,0.,0.),plot(st,pct.r));
    // color = mix(color,vec3(0.,1.,0.),plot(st,pct.g));
    // color = mix(color,vec3(0.,0.,1.),plot(st,pct.b));

    gl_FragColor = vec4(color,1.0);
}
