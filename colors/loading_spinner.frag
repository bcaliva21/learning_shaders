#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

float circle( vec2 p, float r) {
    return length(p) - r;
}

float sdCircle( vec2 p, float r )
{
    return length(p) - r;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);
    vec2 p = (2.0*gl_FragCoord.xy-u_resolution.xy)/u_resolution.y;
    
    float y = abs(circle(p, .5));
	float thickness = 0.01;
	float mask = smoothstep(thickness, .01, y*.1);
    
    // Use polar coordinates instead of cartesian
    vec2 toCenter = vec2(.5)-st;
    float angle = atan(toCenter.y,toCenter.x);
    float radius = (length(toCenter)*2.);

    // Map the angle (-PI to PI) to the Hue (from 0 to 1)
    // and the Saturation to the radius
    color = mix(color, hsb2rgb(vec3((angle/TWO_PI)+(u_time/2.),radius/1.3,1.)), .85);
    color += mask;

    gl_FragColor = vec4(color,1.0);
}
