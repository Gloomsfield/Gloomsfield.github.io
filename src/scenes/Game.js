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
			this.viewport_rect.height,
		).zoom = 0.5;
		
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

		this.rocket.proximity_list = [];

		this.spawn_ship(200, 300);

		this.physics.add.overlap(this.rocket, this.ships, this.handle_hit_ship.bind(this));
	}

	update(time, delta) {
		this.rocket.update(time, delta);


	}

	spawn_ship(x, y) {
		let new_ship = new Spaceship(this, x, y).setOrigin(0.5, 0.5);
		this.ships.add(new_ship);
		this.rocket.proximity_list.push(new_ship);

		new_ship.on('animationcomplete', () => {
			this.ships.remove(new_ship, true, true);
			this.rocket.proximity_list.splice(this.rocket.proximity_list.indexOf(new_ship), 1);
		});
	}

	handle_hit_ship(rocket, ship) {
		// ship.explode();

		// rocket.explode();
	}
}

