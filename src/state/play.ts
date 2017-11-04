import { NextStateHandler, HeroSide } from './game-state';
import { keyArrowLeft, keyArrowRight } from '../keyboard';
import * as Random from '../random';

const playHandler: NextStateHandler = (state, app) => {
	const { trackSprite, heroState } = state,
		showDiggingTimeMs = 80,
		delayDigging = 20;

	const isDigDelayed = () => performance.now() - heroState.endDigTime > delayDigging,
		isDigtTimeFinish = () => performance.now() - heroState.startDigTime > showDiggingTimeMs,
		makeStep = () => {
			state.obstacles.forEach(o => {
				o.level -= 1;
				o.sprite.y = state.bottomY - o.level * state.stepH;
				if (o.level < state.viewTrackLevels.min) {
					o.sprite.parent.removeChild(o.sprite);
					o.removed = true;
				}
			});
			state.trackSprite.tilePosition.y += state.stepH;
			state.obstacles = state.obstacles.filter(o => !o.removed);
		},
		addNextObstacle = () => {
			if (!Random.getRandomBool()) return;

			const delta = 4,
				currentMaxLevel = Math.max(state.viewTrackLevels.min, ...state.obstacles.map(o => o.level));

			if ((state.viewTrackLevels.max - currentMaxLevel) < delta)
				return;

			const obstacleTexture = state.texturesObstacles.normal[
				Random.getRandomInt(0, state.texturesObstacles.normal.length - 1)
			],
				newObstacle = {
					level: state.viewTrackLevels.max,
					sprite: new PIXI.Sprite(obstacleTexture),
					side: Random.getRandomBool() ? HeroSide.leftSide : HeroSide.rightSide,
					removed: false
				};

			state.obstacles.push(newObstacle);
			newObstacle.sprite.anchor.set(.5, 1);
			newObstacle.sprite.x = Random.getRandomBool()
				? state.leftCenterX
				: state.rightCenterX;
			newObstacle.sprite.y = state.bottomY - newObstacle.level * state.stepH;
			app.stage.addChild(newObstacle.sprite);
		}

	const hideHero = () => {
		heroState.spriteRight.visible = false;
		heroState.spriteRightDig.visible = false;
		heroState.spriteRightFail.visible = false;
		heroState.spriteLeft.visible = false;
		heroState.spriteLeftDig.visible = false;
		heroState.spriteLeftFail.visible = false;
	}

	if (keyArrowLeft.key.isDown)
		heroState.onSide = HeroSide.leftSide;
	if (keyArrowRight.key.isDown)
		heroState.onSide = HeroSide.rightSide;

	if (keyArrowLeft.key.isDown
		&& heroState.onSide === HeroSide.leftSide
		&& !heroState.isDigging
		&& isDigDelayed()) {
		heroState.isDigging = true;
		hideHero();
		heroState.spriteLeftDig.visible = true;
		heroState.startDigTime = performance.now();
		heroState.onSide = HeroSide.leftSide;
	}

	if (keyArrowRight.key.isDown
		&& heroState.onSide === HeroSide.rightSide
		&& !heroState.isDigging
		&& isDigDelayed()) {
		heroState.isDigging = true;
		hideHero();
		heroState.spriteRightDig.visible = true;
		heroState.startDigTime = performance.now();
		heroState.onSide = HeroSide.rightSide;
	}

	if (heroState.isDigging
		&& isDigtTimeFinish()) {

		heroState.isDigging = false;
		heroState.endDigTime = performance.now();
		hideHero();
		if (heroState.onSide === HeroSide.leftSide) {
			heroState.spriteLeft.visible = true;
		} else {
			heroState.spriteRight.visible = true;
		}
		makeStep();
		addNextObstacle();
	}
}

export default playHandler;