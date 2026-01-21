class Planet extends Phaser.GameObjects.Sprite {
	constructor(scene) {
		super(
			scene,
			scene.cameras.main.width / 2,
			scene.cameras.main.height / 2,
			'planet',
			0
		);

		scene.add.existing(this);
	}
}
