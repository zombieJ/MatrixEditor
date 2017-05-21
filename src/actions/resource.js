import PATH from 'path';
import FS from 'fs';
import VPK from 'valve-vpk';

export const RES_LAUNCHER_LOADED = 'RES_LAUNCHER_LOADED';
export const RES_DOTA_EXIST = 'RES_DOTA_EXIST';
export const RES_DOTA_NOT_EXIST = 'RES_DOTA_NOT_EXIST';

export const loadDotaResource = () => (
	(dispatch, getState) => {
		const {
			config: { dotaPath },
			resource: { abilityImages, itemImages },
		} = getState();

		const path = PATH.resolve(dotaPath, 'game/dota');

		// Check dota exist
		if (!FS.existsSync(path)) {
			dispatch({ type: RES_DOTA_NOT_EXIST });
			return;
		}

		// Load resource
		dispatch({ type: RES_DOTA_EXIST });

		if (abilityImages === undefined) {
			console.log('do load ability icons');
			const vpk = new VPK(PATH.resolve(path, 'pak01_dir.vpk'));
			vpk.load().then(() => {

			}).catch((err) => {
				console.error(err);
			});
			// console.log('>>>', vpk.isValid());
			// console.time('vpk');
			// vpk.load();
			// console.timeEnd('vpk');
			// console.log('len:', vpk.files.length);
			// console.log('>>>', vpk.files.filter(filePath => filePath.indexOf('resource/flash3/images/spellicons') !== -1));
		}
	}
);
