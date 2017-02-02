export const ROUTER_TO = 'ROUTER_TO';
export const ROUTER_REDIRECT = 'ROUTER_REDIRECT';

export const toRouter = path => ({
	type: ROUTER_TO,
	path,
});

export const redirectRouter = path => ({
	type: ROUTER_REDIRECT,
	path,
});
