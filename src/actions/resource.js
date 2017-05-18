import PATH from 'path';
import FS from 'fs';

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
			console.log('!!!');
		}
	}
);
