import images from './images';
import SvgObj from './svg-obj';

export default () => {
	const imgs = images(),
		textures = {};
	Object.keys(imgs).forEach(key => {
		textures[key] = new PIXI.Texture(new PIXI.BaseTexture(imgs[key]));
	})
	return <SvgObj<PIXI.Texture>>textures;
}