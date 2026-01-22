class Planet extends Phaser.GameObjects.Shader {
	constructor(scene, starting_radius) {
		super(
			scene,
			'planet_frag-shader',
			0,
			0,
			128,
			128
		);

		this.uniforms.radius = { type: '1f', value: starting_radius };

		this.initUniforms();

		scene.add.existing(this);
	}

	alterRadius(delta) {
		this.radius += delta;

		this.setUniform('radius', this.radius);
	}

	setRadius(new_radius) {
		this.radius = new_radius;

		this.setUniform('radius', this.radius);
	}
}
