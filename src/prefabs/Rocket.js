class Rocket extends Phaser.GameObjects.Sprite {
	constructor(scene, position) {
		super(scene, position.x, position.y, 'rocket', 0);

		scene.add.existing(this);

		this.is_firing = false;
		this.move_speed = 2;

		this.base_y = position.y;

		this.sfx_launch = scene.sound.add('sfx_rocket');

		this.move_left_input = scene.input.on(
			"pointerdown",
			() => {
				if(this.is_firing) {
					return;
				}

				this.is_firing = true;

				this.sfx_launch.play();
			}
		);
	}

	update() {
		if(this.is_firing) {
			this.y -= this.move_speed;
		}
		
		if(this.y < 0) {
			this.emit('miss');
			this.reset();
		}
	}

	set_x(new_x) {
		this.x = Math.max(0, Math.min(new_x, config.width));
	}

	reset() {
		this.is_firing = false;
		this.y = this.base_y;
	}
}
