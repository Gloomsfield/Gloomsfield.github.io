class Spaceship extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame, point_value) {
		super(scene, x, y, texture, frame);

		scene.add.existing(this);

		this.points = point_value;
		this.move_speed = 3;
	}

	update() {
		this.x -= this.move_speed;

		if(this.x <= -this.width) {
			this.reset();
		}
	}

	reset() {
		this.x = game.config.width;
	}
}
