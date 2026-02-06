class Spaceship extends Phaser.GameObjects.Sprite {
	constructor(scene, position, point_value) {
		super(scene, position.x, position.y, 'spaceship', 0);

		scene.add.existing(this);

		this.points = point_value;
		this.move_speed = game.settings.ship_speed;

		this.direction = Math.floor(Math.random() * 2.0) * 2.0 - 1.0;
		this.setFlipX(this.direction < 0);

		this.sfx_explosion = scene.sound.add('sfx_explosion');
	}

	update() {
		this.x -= this.move_speed * this.direction;

		if(this.x <= -this.width - config.width / 4.0) {
			this.reset();
		}

		if(this.x >= config.width + this.width + config.width / 4.0) {
			this.reset();
		}
	}

	explode() {
		this.emit('explode');

		this.sfx_explosion.play();

		this.setTexture('ship_explosion');
		this.play('ship_explode');

		this.on('animationcomplete', () => {
			this.reset();
		})
	}

	reset() {
		this.setTexture('spaceship');
		this.x = config.width / 2.0 * (1 + this.direction) + this.direction * config.width / 5.0;
	}
}
