import svgs from './svg';

type SvgObj<T> = {
	[k in keyof typeof svgs]: T
};

export default SvgObj;