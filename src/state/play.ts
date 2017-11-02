import { NextStateHandler, HeroSide } from './game-state';
import { keyArrowLeft, keyArrowRight } from '../keyboard';

const playHandler: NextStateHandler = (state, app) => {
	const { trackSprite, heroState } = state,
		showDiggingTimeMs = 100,
		delayDigging = 50;

	const isDigDelayed = () => performance.now() - heroState.endDigTime > delayDigging;

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

	if (heroState.isDigging) {
		if (performance.now() - heroState.startDigTime > showDiggingTimeMs) {
			heroState.isDigging = false;
			heroState.endDigTime = performance.now();
			hideHero();
			if (heroState.onSide === HeroSide.leftSide) {
				heroState.spriteLeft.visible = true;
			} else {
				heroState.spriteRight.visible = true;
			}
		}
	}
}

export default playHandler;