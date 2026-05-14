#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 red = vec3(1.,0.,0.);
vec3 orange = vec3(1.,.5,0.);
vec3 yellow = vec3(1.,1.,0.);
vec3 green = vec3(0.,1.,0.);
vec3 blue = vec3(0.,0.,1.);
vec3 indigo = vec3(0.3,0.,.5);
vec3 violet = vec3(0.6,0.,.8);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.17, pct, st.y) -
          smoothstep( pct, pct+0.17, st.y);
}

float parabola( float x, float k ){
    return pow( 4.0*x*(.9-x), k );
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.x);
	float y = parabola(st.x, .5);

    // pct.r = smoothstep(0.0,1.0, st.x);
    // pct.g = sin(st.x*PI);
    // pct.b = pow(st.x,0.5);

    // color = mix(colorA, colorB, pct);

    // Plot transition lines for each channel

    color = mix(color,red,plot(st,y));
    color = mix(color,orange,plot(st,y-.1));
    color = mix(color,yellow,plot(st,y-.2));
    color = mix(color,green,plot(st,y-.3));
    color = mix(color,blue,plot(st,y-.4));
    color = mix(color,indigo,plot(st,y-.5));
    color = mix(color,violet,plot(st,y-.6));

    gl_FragColor = vec4(color,1.0);
}
