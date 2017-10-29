const createKey = (keyCode) => {
	const key: {
		code: number;
		isDown: boolean;
		isUp: boolean;
		press?: () => void;
		release?: () => void;
		downHandler: (e?) => void;
		upHandler: (e?) => void;
	} = <any>{};
	key.code = keyCode;
	key.isDown = false;
	key.isUp = true;
	key.press = undefined;
	key.release = undefined;

	key.downHandler = (event) => {
		if (event.keyCode === key.code) {
			if (key.isUp && key.press)
				key.press();

			key.isDown = true;
			key.isUp = false;
		}
		event.preventDefault();
	};

	key.upHandler = (event) => {
		if (event.keyCode === key.code) {
			if (key.isDown && key.release)
				key.release();

			key.isDown = false;
			key.isUp = true;
		}
		event.preventDefault();
	};

	const keyDownHandler = (e) => key.downHandler(e),
		keyUpHandler = (e) => key.upHandler(e),
		keyDownEvent = "keydown",
		keyUpEvent = "keyup";

	window.addEventListener(keyDownEvent, keyDownHandler, false);
	window.addEventListener(keyUpEvent, keyUpHandler, false);

	return {
		key,
		dispose: () => {
			window.removeEventListener(keyDownEvent, keyDownHandler);
			window.removeEventListener(keyUpEvent, keyUpHandler);
		}
	};
}

const keyArrowLeft = createKey(37),
	keyArrowUp = createKey(38),
	keyArrowRight = createKey(39),
	keyArrowDown = createKey(40);

export {
	createKey,
	keyArrowLeft,
	keyArrowUp,
	keyArrowRight,
	keyArrowDown
}