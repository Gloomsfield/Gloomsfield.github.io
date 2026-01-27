class Rocket extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'rocket', 0);

		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.sfx_launch = scene.sound.add('sfx_rocket');
		
		this.is_firing = false;

		this.move_speed = 500;
		this.max_speed = 200;
		this.drag = 0.975;

		let scene_keyboard = scene.input.keyboard;
		this.move_left_input = scene_keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT, false, true);
		this.move_right_input = scene_keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT, false, true);
		this.move_up_input = scene_keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP, false, true);
		this.move_down_input = scene_keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN, false, true);
		this.fire_input = scene_keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		this.fire_input.on('down', this.fire, this);
	}

	update(_, delta) {
		this.body.velocity.setLength(clamp(this.body.velocity.length() * this.drag, 0, this.max_speed));

		let move_direction = new Phaser.Math.Vector2(0, 0);

		move_direction.x += Number(this.move_right_input.isDown && !this.is_firing);
		move_direction.x -= Number(this.move_left_input.isDown && !this.is_firing);

		move_direction.y += Number(this.move_up_input.isDown && !this.is_firing);
		move_direction.y -= Number(this.move_down_input.isDown && !this.is_firing);

		move_direction.normalize();

		this.body.velocity.x += move_direction.x * this.move_speed * delta / 1000;
		this.body.velocity.y -= move_direction.y * this.move_speed * delta / 1000;

		this.body.velocity.setLength(clamp(this.body.velocity.length(), 0, this.max_speed));
	}

	fire() {
		if(this.is_firing) { return; }

		this.is_firing = true;
	}

	despawn() {
		this.destroy();
	}
}
