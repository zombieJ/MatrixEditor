/**
 * Created by jiljiang on 2016/10/26.
 */

export const KV_LOADED = 'KV_LOADED';

export const loadKVList = (name, list) => ({
	type: KV_LOADED,
	name,
	list,
});
