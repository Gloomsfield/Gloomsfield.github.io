class UFO extends Phaser.GameObjects.Sprite {
	constructor(scene, position, point_value) {
		super(scene, position.x, position.y, 'ufo', 0);

		scene.add.existing(this);

		this.points = point_value;

		this.sfx_explosion = scene.sound.add('sfx_explosion');
	}

	update(time, delta) {
		let coefficient = (game.settings.ufo_speed_max - game.settings.ufo_speed_min) / 2.0;

		this.x -= coefficient * (Math.sin(time / 500) + 1) + game.settings.ufo_speed_min;

		if(this.x <= -this.width) {
			this.reset();
		}
	}

	explode() {
		console.log("wah");

		this.emit('explode');

		this.sfx_explosion.play();

		this.setTexture('ufo_explosion');
		this.play('ufo_explode');

		this.on('animationcomplete', () => {
			this.reset();
		})
	}

	reset() {
		this.setTexture('ufo');
		this.x = game.config.width;
	}
}
