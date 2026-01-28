class Rocket extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'rocket', 0);

		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.sfx_launch = scene.sound.add('sfx_rocket');

		this.move_speed = 500;
		this.max_speed = 200;
		this.drag = 0.985;

		this.min_radius = 100;
		this.max_radius = 40;
		this.acceleration_base = 20;
		this.acceleration_close = 50;

		this.acceleration_coefficient = (this.acceleration_close - this.acceleration_base) / Math.pow(this.max_radius - this.min_radius, 2);

		this.last_angle = Math.PI / 2;

		let scene_keyboard = scene.input.keyboard;
		this.move_left_input = scene_keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT, false, true);
		this.move_right_input = scene_keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT, false, true);
		this.move_up_input = scene_keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP, false, true);
		this.move_down_input = scene_keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN, false, true);
		this.beam_input = scene_keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, false, true);

		this.proximity_list = [ ];
	}

	update(_, delta) {
		this.body.velocity.setLength(this.body.velocity.length() * this.drag);

		let move_direction = new Phaser.Math.Vector2(0, 0);

		move_direction.x += Number(this.move_right_input.isDown);
		move_direction.x -= Number(this.move_left_input.isDown);

		move_direction.y += Number(this.move_up_input.isDown);
		move_direction.y -= Number(this.move_down_input.isDown);

		move_direction.normalize();

		this.body.velocity.x += (move_direction.x * this.move_speed * delta / 1000);
		this.body.velocity.y -= (move_direction.y * this.move_speed * delta / 1000);

		if(this.beam_input.isDown) {
			let that = this.proximity_list[0];

			let this_centerpos = new Phaser.Math.Vector2(
				this.body.position.x + this.width / 2,
				this.body.position.y + this.height / 2
			);

			let that_centerpos = new Phaser.Math.Vector2(
				that.body.position.x + that.width / 2,
				that.body.position.y + that.height / 2
			);

			let diff = new Phaser.Math.Vector2(this_centerpos).subtract(that_centerpos);

			let r = diff.length();
			let dir = new Phaser.Math.Vector2(diff).normalize();

			let a = r < this.min_radius ? this.acceleration_coefficient * Math.pow(r - this.min_radius, 2) + this.acceleration_base : this.acceleration_base;
			console.log(a);

			this.body.velocity.x -= dir.x * a;
			this.body.velocity.y -= dir.y * a;

			this.proximity_list[0].body.velocity.x += dir.x * a / 10.0;
			this.proximity_list[0].body.velocity.y += dir.y * a / 10.0;
		}

		if(this.body.velocity.length() > 0.01) {
			this.last_angle = this.body.velocity.angle() + Math.PI / 2;
		}

		this.rotation = this.last_angle;
	}

	despawn() {
		this.destroy();
	}
}
