#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 circle(vec2 st, float radius) {
	return vec3(distance(st, vec2(radius)));
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec3 color = vec3(0.);
	
	// "beating heart"
	// vec3 color = circle(st, .5)/(clamp(abs(sin(u_time)), 0.2, 0.4));

	// multiple circles in a billboard
	// vec3 circleOne = step(.1, circle(vec2(st.x-.1, st.y+.1), .5));
	// vec3 circleTwo = step(.1, circle(vec2(st.x+.3, st.y-.3), .5));
	// color += min(circleOne, circleTwo);

	// combining distance fields with different operations
	// pct = distance(st,vec2(0.4)) + distance(st,vec2(0.6));
	// pct = distance(st,vec2(0.4)) * distance(st,vec2(0.6));
	// pct = min(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
	// pct = max(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
	float bot = clamp(abs(sin(u_time*1.5)), 0.1, 0.49);
	float top = clamp(abs(sin(u_time*1.5)), 0.51, 0.9);
	vec3 pct = pow(circle(st, bot), circle(st, top));
	color = vec3(pct);

	gl_FragColor = vec4(color, 1.);
}

