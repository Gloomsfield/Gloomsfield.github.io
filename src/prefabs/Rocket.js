class Rocket extends Phaser.GameObjects.Sprite {
	constructor(scene, position) {
		super(scene, position.x, position.y, 'rocket', 0);

		scene.add.existing(this);

		this.is_firing = false;
		this.move_speed = 2;

		this.base_y = position.y;

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

		this.move_left_input.on('down', () => {
			if(!this.is_firing) {
				this.emit("move-left");
			}
		});

		this.move_right_input.on('down', () => {
			if(!this.is_firing) {
				this.emit("move-right");
			}
		});

		this.fire_input.on('down', () => {
			if(this.is_firing) {
				return;
			}
			
			this.is_firing = true;

			this.sfx_launch.play();
		});
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

	reset() {
		this.is_firing = false;
		this.y = this.base_y;
	}
}
