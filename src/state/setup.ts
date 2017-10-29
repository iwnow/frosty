import { NextStateHandler } from './game-state';
import States from './states';


const setupHandler: NextStateHandler = (state, stage) => {



	state.prevState = state.state;
	state.state = States.start
}

export default setupHandler;