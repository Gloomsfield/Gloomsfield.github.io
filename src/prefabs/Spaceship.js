class Spaceship extends Phaser.GameObjects.Sprite {
	constructor(scene, position, point_value) {
		super(scene, position.x, position.y, 'spaceship', 0);

		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.points = point_value;
		this.move_speed = game.settings.ship_speed;

		this.sfx_explosion = scene.sound.add('sfx_explosion');
	}

	update() {
		this.rotation = Math.atan2(-this.body.velocity.y, -this.body.velocity.x);
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
		this.x = game.config.width;
	}
}
