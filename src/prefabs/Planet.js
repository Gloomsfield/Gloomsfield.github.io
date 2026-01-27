class Planet extends Phaser.GameObjects.Shader {
	constructor(scene, radius) {
		super(scene, 'planet_frag-shader', 0, 0, 128, 128);

		scene.add.existing(this);

		this.radius = { target: radius, current: radius };
		this.radius_resize_speed = 10.0;

		this.uniforms.radius = { type: '1f', value: radius };
		this.initUniforms();
	}

	update(_, delta) {
		iterate_radius(delta, this.radius_resize_speed);
	}

	iterate_radius(delta, speed) {
		let direction = sign(this.radius.target - this.radius.current);
		let radius_delta = direction * speed * delta / 1000;

		this.radius.current += radius_delta;

		this.setUniform('radius', this.radius.current);
	}

	change_radius(delta) {
		this.radius.target += delta;
	}
}
