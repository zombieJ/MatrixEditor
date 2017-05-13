/**
 * Created by jiljiang on 2017/4/30.
 */

export const CAPITAL_REGEX = /\b(\w)|\s(\w)/g;
export const capitalize = str => (
	str.replace(CAPITAL_REGEX, m => m.toUpperCase())
);
