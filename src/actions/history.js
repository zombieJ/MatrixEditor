export const HISTORY_UNDO = 'HISTORY_UNDO';
export const HISTORY_REDO = 'HISTORY_REDO';
export const HISTORY_CLEAN = 'HISTORY_CLEAN';

export const undo = () => ({
	type: HISTORY_UNDO,
});

export const redo = () => ({
	type: HISTORY_REDO,
});

export const cleanHistory = () => ({
	type: HISTORY_CLEAN,
});
