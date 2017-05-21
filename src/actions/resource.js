import PATH from 'path';
import FS from 'fs';
import VPK from 'valve-vpk';

// export const RES_LAUNCHER_LOADED = 'RES_LAUNCHER_LOADED';
export const RES_DOTA_EXIST = 'RES_DOTA_EXIST';
export const RES_DOTA_NOT_EXIST = 'RES_DOTA_NOT_EXIST';
export const RES_SPELL_IMAGE_LOADED = 'RES_SPELL_IMAGE_LOADED';

export const RES_SPELL_IMAGE_PATH = 'resource/flash3/images/spellicons/';

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
			const vpk = new VPK(PATH.resolve(path, 'pak01_dir.vpk'));
			vpk.load().then(() => {
				// Filter icon list
				const spellImageList = vpk.fileList.filter(
					vpkPath => vpkPath.startsWith(RES_SPELL_IMAGE_PATH)
				);
					// .slice(0, 1);

				// Load icon list
				const imgPromiseList = spellImageList.map(
					vpkPath => vpk.readFile(vpkPath).then(buffer => buffer.toString('base64'))
				);
				Promise.all(imgPromiseList).then((bufferList) => {
					const images = {};
					const sliceLen = RES_SPELL_IMAGE_PATH.length;

					spellImageList.forEach((vpkPath, index) => {
						const abbr = vpkPath
							.slice(sliceLen) // Remove path
							.slice(0, -4); // Remove extension
						images[abbr] = `data:image/png;base64,${bufferList[index]}`;
					});

					dispatch({
						type: RES_SPELL_IMAGE_LOADED,
						images,
					});
				}).catch((err) => {
					console.error('Load spell image error:', err);
				});
			}).catch((err) => {
				console.error(err);
			});
		}
	}
);
