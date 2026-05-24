#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265358979323846

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return uv.x*uv.y;
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // Divide the space in 4
    st = tile(st,4.);

    // Use a matrix to rotate the space 45 degrees
    st = rotate2D(st,PI*0.25);
	vec2 movingSt = rotate2D(st, PI*0.25*u_time);

    // Draw a square
    color = vec3(box(movingSt,vec2(.7),.01));
    color -= vec3(vec3(0.0, 0.698, 0.663)*box(movingSt-.3,vec2(0.1),0.01));
    color -= vec3(vec3(0.937, 0.259, 0.435)*box(movingSt+.3,vec2(0.1),0.01));
    color -= vec3(vec3(1.0, 0.509, 0.0)*box(vec2(movingSt.x-.3,movingSt.y+.3),vec2(0.1),0.01));
    color -= vec3(vec3(1.)*box(vec2(movingSt.x+.3,movingSt.y-.3),vec2(0.1),0.01));
	color -= vec3(circle(st+clamp(sin(u_time*.5), .01, .1), .03));
    // color = vec3(st,0.0);

    gl_FragColor = vec4(color,1.0);
}

