class Play extends Phaser.Scene {
	constructor() {
		super('play_scene');
	}

	create() {
		this.add.text(20, 20, 'ROCKET PATROL PLAY');
	}
}

