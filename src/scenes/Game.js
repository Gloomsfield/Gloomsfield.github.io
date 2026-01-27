class Game extends Phaser.Scene {
	constructor() {
		super('game_scene');
	}

	create(viewport_rect) {
		this.viewport_rect = viewport_rect;
		this.cameras.main.setViewport(
			this.viewport_rect.x,
			this.viewport_rect.y,
			this.viewport_rect.width,
			this.viewport_rect.height
		);
		
		this.rocket = new Rocket(
			this,
			this.viewport_rect.width / 2,
			this.viewport_rect.height / 2
		).setOrigin(0.5, 0.5);

		this.ships = new Phaser.GameObjects.Group(
			this,
			[ ],
			{ runChildUpdate: true, }
		);

		this.spawn_ship(0, 100);

		this.physics.add.overlap(this.rocket, this.ships, this.handle_hit_ship.bind(this));
	}

	update(time, delta) {
		this.rocket.update(time, delta);
	}

	spawn_ship(x, y) {
		let new_ship = new Spaceship(this, x, y).setOrigin(0.5, 0.5);
		this.ships.add(new_ship);

		new_ship.on('animationcomplete', () => { this.ships.remove(new_ship, true, true); });
	}

	handle_hit_ship(rocket, ship) {
		ship.explode();

		rocket.despawn();
	}
}

