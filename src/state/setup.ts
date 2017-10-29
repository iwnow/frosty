import { NextStateHandler } from './game-state';
import States from './states';
import { textures } from '../textures';
import { keyArrowLeft, keyArrowRight } from '../keyboard';

const setupHandler: NextStateHandler = (state, app) => {
	const { trackSprite, heroState, healthSprite } = state;

	trackSprite.anchor.x = .5;
	trackSprite.x = app.renderer.width / 2;
	trackSprite.height = app.renderer.height;
	trackSprite.width = 97;
	trackSprite['tileScale'].set(.7, .7);

	app.stage.addChild(trackSprite);

	const heroSpriteLeft = heroState.spriteLeft,
		heroSpriteRight = heroState.spriteRight;

	state.levelH = heroSpriteLeft.height / 2;
	heroSpriteLeft.anchor.set(.5, 1);
	heroSpriteLeft.position.set(
		trackSprite.x - (trackSprite.width / 2) - heroSpriteLeft.width / 2 - 10,
		app.renderer.height - state.levelH
	);

	app.stage.addChild(heroSpriteLeft);

	heroSpriteRight.anchor.set(.5, 1);
	heroSpriteRight.position.set(
		trackSprite.x + (trackSprite.width / 2) + heroSpriteRight.width / 2 + 10,
		app.renderer.height - state.levelH
	);
	heroSpriteRight.scale.x = -1;

	app.stage.addChild(heroSpriteRight);

	healthSprite.anchor.set(.5, 0);
	healthSprite.position.set(app.renderer.width / 2, -10);

	app.stage.addChild(healthSprite);



	state.prevState = state.state;
	state.state = States.start
}

export default setupHandler;