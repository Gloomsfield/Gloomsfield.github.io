class Rocket extends Phaser.GameObjects.Sprite {
	constructor(scene, r, theta) {
		super(scene, r * Math.cos(theta), r * Math.sin(theta), 'rocket', 0);

		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.sfx_launch = scene.sound.add('sfx_rocket');

		this.viewport_center_offset = {
			x: scene.cameras.main.width / 2,
			y: scene.cameras.main.height / 2
		};
		
		this.r = r;
		this.theta = { target: theta, current: theta };

		this.is_firing = false;

		this.move_speed = 200;

		let scene_keyboard = scene.input.keyboard;
		this.move_left_input = scene_keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT, false, true);
		this.move_right_input = scene_keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT, false, true);
		this.fire_input = scene_keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
		this.reframe_input = scene_keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

		this.fire_input.on('down', this.fire, this);
		this.reframe_input.on('down', this.reframe, this);
	}

	update(_, delta) {
		let move_direction = 0;

		move_direction += Number(this.move_right_input.isDown && !this.is_firing);
		move_direction -= Number(this.move_left_input.isDown && !this.is_firing);

		this.iterate_theta(delta, move_direction);
		
		this.r += Number(this.is_firing) * this.move_speed * delta / 1000;

		this.x = this.get_cartesian().x;
		this.y = this.get_cartesian().y;

		this.rotation = this.theta.current + Math.PI / 2.0;
	}

	fire() {
		if(this.is_firing) { return; }

		this.is_firing = true;
	}

	reframe() {
		this.emit('reframe', 1.5 * Math.PI - this.theta.current);
	}

	get_cartesian() {
		return {
			x: this.r * Math.cos(this.theta.current) + this.viewport_center_offset.x,
			y: this.r * Math.sin(this.theta.current) + this.viewport_center_offset.y,
		};
	}

	iterate_theta(delta, direction) {
		let angular_delta = this.move_speed * delta / 1000 / this.r;

		this.theta.target += direction * angular_delta;
		this.theta.current = interpolate_angle(this.theta.target, this.theta.current, angular_delta);
	}

	reset() {
		this.is_firing = false;
	}
}
