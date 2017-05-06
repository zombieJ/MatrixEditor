import { remote } from 'electron';

const { getCurrentWindow, Menu } = remote;

export const showMenu = (option) => {
	const list = Array.isArray(option) ? option : Object.keys(option).map(key => ({
		label: key,
		click: option[key],
	}));
	const menu = Menu.buildFromTemplate(list);
	menu.popup(getCurrentWindow());
};

export default {};
