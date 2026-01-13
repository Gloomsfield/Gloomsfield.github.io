class Menu extends Phaser.Scene {
	constructor() {
		super('menu_scene');
	}

	preload() {
		this.load.image('rocket', './assets/rocket.png');
		this.load.image('spaceship', './assets/ship.png');
		this.load.image('starfield', './assets/background.png');

		this.load.spritesheet('ship_explosion', './assets/ship_explosion.png', {
			frameWidth: 64,
			frameHeight: 32,
			startFrame: 0,
			endFrame: 10,
		});

		this.load.audio('sfx-select', './assets/select.wav');
		this.load.audio('sfx-explosion', './assets/explosion.wav');
		this.load.audio('sfx-rocket', './assets/rocket.wav');
	}

	create() {
		this.anims.create({
			key: 'ship_explode',
			frames: this.anims.generateFrameNumbers('ship_explosion', {
				start: 0,
				end: 10,
				first: 0,
			}),
			frameRate: 30,
		});

		let menu_config = {
			fontFamily: 'Courier',
			fontSize: '28px',
			backgroundColor: '#f3b141',
			color: '#843605',
			align: 'right',
			padding: {
				top: 5,
				bottom: 5
			},
			fixedWidth: 0,
		};

		let menu_accent_config = menu_config;
		menu_accent_config.backgroundColor = '#00ff00';
		menu_accent_config.color = '#000000';

		this.add.text(
			game.config.width / 2,
			game.config.height / 2 - ui_border_size - ui_border_padding,
			'ROCKET PATROL',
			menu_config
		).setOrigin(0.5, 0);

		this.add.text(
			game.config.width / 2,
			game.config.height / 2,
			'Use <- -> arrows to move and (F) to fire.',
			menu_config
		).setOrigin(0.5, 0);

		this.add.text(
			game.config.width / 2,
			game.config.height / 2,
			'Press <- for Novice or -> for Expert.',
			menu_accent_config
		).setOrigin(0.5, 0);

		key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
	}

	update() {
		if(Phaser.Input.Keyboard.JustDown(key_left)) {
			game.settings = {
				ship_speed: 3,
				game_time: 60000,
			};

			this.sound.play('sfx-select');
			this.scene.start('play_scene');
		}

		if(Phaser.Input.Keyboard.JustDown(key_right)) {
			game.settings = {
				ship_speed: 4,
				game_time: 45000,
			};

			this.sound.play('sfx-select');
			this.scene.start('play_scene');
		}
	}
}

