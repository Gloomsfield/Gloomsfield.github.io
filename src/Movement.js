class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene');
    }

	init() {
		this.PLAYER_SPEED = 350;
	}

    preload() {
		this.load.spritesheet(
			'character',
			'./assets/spritesheets/Character_002.png',
			{ frameWidth: 48, },
		);
    }

    create() {
		this.anims.create({
			key: 'idle-down',
			framerate: 0,
			repeat: -1,
			frames: this.anims.generateFrameNumbers(
				'character', {
					start: 1,
					end: 1,
				},
			),
		});

		this.anims.create({
			key: 'walk-down',
			framerate: 5,
			repeat: -1,
			frames: this.anims.generateFrameNumbers(
				'character', {
					start: 0,
					end: 2,
				},
			),
		});

		this.cameras.main.setBackgroundColor(0xDDDDDD);

		this.player = this.physics.add.sprite(width / 2, height / 2, 'character', 1).setScale(2);

		this.player.body.setCollideWorldBounds(true);
		this.player.body.setSize(32, 32).setOffset(8, 16);

		cursors = this.input.keyboard.createCursorKeys();
    }

    update(time, delta) {
		let player_vector = new Phaser.Math.Vector2(0, 0);

		let player_direction = 'down';

		if(cursors.left.isDown) {
			player_vector.x -= 1;

			player_direction = 'left';
		}

		if(cursors.right.isDown) {
			player_vector.x += 1;

			player_direction = 'right';
		}
		
		if(cursors.up.isDown) {
			player_vector.y -= 1;

			player_direction = 'up';
		}

		if(cursors.down.isDown) {
			player_vector.y += 1;

			player_direction = 'down';
		}

		player_vector.normalize();

		this.player.setVelocity(this.PLAYER_SPEED * player_vector.x, this.PLAYER_SPEED * player_vector.y);

		let player_movement = player_vector.length() ? 'walk' : 'idle'; 

		this.player.play(player_movement + '-' + player_direction, true);
    }
}
