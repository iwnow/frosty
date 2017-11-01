import { HeroSide, NextStateHandler } from './game-state';
import States from './states';
import { textures } from '../textures';
import { keyArrowLeft, keyArrowRight } from '../keyboard';
import * as Random from '../random';

const setupHandler: NextStateHandler = (state, app) => {
	app.stage.removeChildren();

	state.bottomY = app.renderer.height - state.levelH;

	const { trackSprite, heroState, healthSprite } = state;

	trackSprite.anchor.x = .5;
	trackSprite.x = app.renderer.width / 2;
	trackSprite.height = app.renderer.height;
	trackSprite.width = 97;
	trackSprite['tileScale'].set(.7, .7);

	app.stage.addChild(trackSprite);

	const heroSpriteLeft = heroState.spriteLeft,
		heroSpriteRight = heroState.spriteRight;

	state.stepH = heroSpriteLeft.height / 2;
	heroSpriteLeft.anchor.set(.5, 1);

	state.leftCenterX = trackSprite.x - (trackSprite.width / 2) - heroSpriteLeft.width / 2 - 10;
	state.rightCenterX = trackSprite.x + (trackSprite.width / 2) + heroSpriteLeft.width / 2 + 10;

	heroSpriteLeft.position.set(
		state.leftCenterX,
		state.bottomY
	);

	app.stage.addChild(heroSpriteLeft);

	heroSpriteRight.anchor.set(.5, 1);
	heroSpriteRight.position.set(
		state.rightCenterX,
		state.bottomY
	);
	heroSpriteRight.scale.x = -1;
	heroSpriteRight.visible = false;

	app.stage.addChild(heroSpriteRight);

	healthSprite.anchor.set(.5, 0);
	healthSprite.position.set(app.renderer.width / 2, -10);
	healthSprite.width = 360;
	(<any>healthSprite).zIndex = 100;
	state.topY = healthSprite.height;

	app.stage.addChild(healthSprite);

	state.viewTrackLevels.max = Math.ceil(state.bottomY / state.stepH) + 1;
	state.viewTrackLevels.min = -1 * (Math.ceil((app.renderer.height - state.bottomY) / state.stepH) + 1);

	const { obj01, obj02, obj03, obj04, obj05, obj06, obj07, obj08
		, altobj01, altobj02, altobj03, altobj04, altobj05, altobj06, altobj07, altobj08 } = textures;
	state.texturesObstacles.normal = [obj01, obj02, obj03, obj04, obj05, obj06, obj07, obj08];
	state.texturesObstacles.alternative = [altobj01, altobj02, altobj03, altobj04, altobj05, altobj06, altobj07, altobj08];
	//create obstacles with level >= 3
	state.obstacles = [];
	for (let l = 3; l <= state.viewTrackLevels.max; l++) {
		// const needObst = Random.getRandomBool();
		// if (!needObst)
		// 	continue;

		const obstacleTexture = state.texturesObstacles.normal[
			Random.getRandomInt(0, state.texturesObstacles.normal.length - 1)
		];
		state.obstacles.push({
			level: l,
			sprite: new PIXI.Sprite(obstacleTexture),
			side: Random.getRandomBool() ? HeroSide.leftSide : HeroSide.rightSide
		});
		l += 2; //между препятствиями обязательно 1 пустой уровень + 2 уровня занимает препятствие
	}

	state.obstacles.forEach(o => {
		const { level, side, sprite } = o;
		sprite.anchor.set(.5, 1);
		sprite.x = side === HeroSide.leftSide
			? state.leftCenterX
			: state.rightCenterX;
		sprite.y = state.bottomY - level * state.stepH;
		app.stage.addChild(sprite);
	});

	state.prevState = state.state;
	state.state = States.start
}

export default setupHandler;