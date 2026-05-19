#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Reference to
// http://thndl.com/square-shaped-shaders.html

mat2 rotate2d(float angle) {
	return mat2(cos(angle), -sin(angle),
			    sin(angle),  cos(angle));
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0);
  float d = 0.0;
  float e = 0.0;
  float f = 0.0;

  // Remap the space to -1. to 1.
  st = st * 2. - 1.;

  // Number of sides of your shape
  int N = 3;
  int M = 2;

  // Angle and radius from the current pixel
  // float a = atan(st.x,st.y)+PI;
  float a = atan(st.x, st.y) + PI*(u_time/5.);
  float r = TWO_PI/float(N);
  float s = TWO_PI/float(M);
  float t = TWO_PI/float(M)+1.57*(u_time*.1);

  // Shaping function that modulate the distance
  d = cos(floor(.5+a/r)*r-a)*length(st);
  e = cos(floor(.5+a/s)*s-a)*length(st)*6.;
  f = cos(floor(.5+a/t)*t-a)*length(st)*6.;

  color = abs(vec3(vec3(.05,0.,.25)-smoothstep(.35,.41,(d/.1)*(abs(sin(u_time/2.))))));
  color -= fract(vec3(vec3(1.,.6,0.)-smoothstep(.35,.41,-f)));
  color -= fract(vec3(vec3(0.,.95,1.)-smoothstep(.3,.41,cos(f+u_time))));
  color -= vec3(1.-smoothstep(.3,.41,e));
  color -= vec3(1.-smoothstep(.3,.41, cos(e-u_time)));
  color -= vec3(1.-smoothstep(.3,.41,cos(-e+u_time)));
  color = fract(color*(abs(sin(u_time))));

  // angles we create with N
  // color = vec3(d);

  gl_FragColor = vec4(color,1.0);
}
