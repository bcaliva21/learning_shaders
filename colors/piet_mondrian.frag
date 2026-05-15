#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 rectangle(vec2 st, float sideLengthOne, float sideLengthTwo) {
	vec2 left = 1. + floor(st - vec2(sideLengthOne));
	vec2 right = 1. - floor(st + vec2(sideLengthOne));
	vec2 top = 1. - floor(st + vec2(sideLengthTwo));
	vec2 bottom = 1. + floor(st - vec2(sideLengthTwo));

	return vec3(left.x * right.x * bottom.y * top.y);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 color = vec3(0.5, 0.5, 0.5);

	vec2 rectOne = st;
	rectOne.x += .2;
	vec2 rectTwo = st;
	rectTwo.x -= .3;
	vec2 lineOne = st;
	lineOne.y -= .31;
	vec2 lineTwo = st;
	lineTwo.y += .31;
	lineTwo.x -= .25;
	vec2 lineThree = st;
	lineThree.x += .05;
	vec2 lineFour = st;
	lineFour.x += .3;

	color += rectangle(rectOne, 0.4, 0.3)*vec3(0.,0.,1.);
	color += rectangle(rectTwo, 0.3, 0.2)*vec3(0.,1.,0.);
	color += -rectangle(lineOne, 0., 0.49);
	color += -rectangle(lineTwo, 0.2, 0.49);
	color += -rectangle(lineThree, 0.49, 0.);
	color += -rectangle(lineFour, 0.49, 0.);
	gl_FragColor = vec4(color, 1.);
}

