class Spaceship extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame, point_value) {
		super(scene, x, y, texture, frame);

		scene.add.existing(this);

		this.points = point_value;
		this.move_speed = game.settings.ship_speed;
	}

	update() {
		this.x -= this.move_speed;

		if(this.x <= -this.width) {
			this.reset();
		}
	}

	explode() {
		this.emit('alter-timer', 300 * this.points);
		this.emit('increase-score', this.points);

		this.setTexture('ship_explosion');
		this.play('ship_explode');

		this.on('animationcomplete', () => {
			this.reset();
			this.setTexture('spaceship');
		})
		
		this.emit('play-sound', 'sfx-explosion');
	}

	reset() {
		this.x = game.config.width;
	}
}
