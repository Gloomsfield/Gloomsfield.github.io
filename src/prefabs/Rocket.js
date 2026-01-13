class Rocket extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture, frame);

		scene.add.existing(this);

		this.is_firing = false;
		this.move_speed = 2;

		this.sfx_shot = scene.sound.add('sfx-rocket');
	}

	update() {
		if(!this.is_firing) {
			// handle left/right movement
			if(key_left.isDown && this.x >= ui_border_size + this.width) {
				this.x -= this.move_speed;
			} else if(key_right.isDown && this.x <= game.config.width - ui_border_size - this.width) {
				this.x += this.move_speed;
			}
		}

		// handle firing
		if(Phaser.Input.Keyboard.JustDown(key_fire) && !this.is_firing) {
			this.is_firing = true;

			this.sfx_shot.play();
		}

		if(this.is_firing && this.y >= ui_border_size * 3 + ui_border_padding) {
			this.y -= this.move_speed;
		}

		if(this.y <= ui_border_size * 3 + ui_border_padding) {
			this.reset();
		}
	}

	reset() {
		this.is_firing = false;
		this.y = game.config.height - ui_border_size - ui_border_padding;
	}
}
