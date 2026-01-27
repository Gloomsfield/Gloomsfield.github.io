class Rocket extends Phaser.GameObjects.Sprite {
	constructor(scene, r, theta) {
		super(scene, r * Math.cos(theta), r * Math.sin(theta), 'rocket', 0);

		this.r = r;
		this.theta = theta;
		this.goal_theta = theta;

		this.offset = {
			x: scene.cameras.main.width / 2,
			y: scene.cameras.main.height / 2
		};

		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.is_firing = false;
		this.move_speed = 200;

		this.move_direction = 0;

		this.sfx_launch = scene.sound.add('sfx_rocket');

		this.move_left_input = scene.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.LEFT,
			false,
			true
		);

		this.move_right_input = scene.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.RIGHT,
			false,
			true
		);

		this.fire_input = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

		this.fire_input.on('down', () => {
			if(this.is_firing) {
				return;
			}
			
			this.is_firing = true;

			this.sfx_launch.play();
		});

		this.reframe_input = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

		this.reframe_input.on('down', () => {
			this.emit('reframe', 2.0 * Math.PI - this.theta);
		});
	}

	get_cartesian() {
		return {
			x: this.r * Math.cos(this.theta) + this.offset.x,
			y: this.r * Math.sin(this.theta) + this.offset.y,
		};
	}

	update(_, delta) {
		if(!this.is_firing) {
			this.move_direction = 0;

			if(this.move_right_input.isDown) {
				this.move_direction += 1;
			}

			if(this.move_left_input.isDown) {
				this.move_direction -= 1;
			}

			this.goal_theta += this.move_direction * this.move_speed * delta / 1000 / this.r;

			this.theta = interpolate_angle(this.goal_theta, this.theta, this.move_speed * delta / 1000 / this.r);
		} else {
			this.r += this.move_speed * delta / 1000;
		}

		this.x = this.get_cartesian().x;
		this.y = this.get_cartesian().y;

		this.rotation = this.theta + Math.PI / 2.0;
	}

	reset() {
		this.is_firing = false;
	}
}
