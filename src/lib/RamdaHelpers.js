import * as R from 'ramda';

/**
 * @param { any } incomingValue
 * @returns { boolean } result
 * @description If incomingValue is equal {} | [] | '' | null | undefined return true
 */
export const isBlank = R.either(R.isNil, R.isEmpty);

/**
 * @param { any } incomingValue
 * @returns { boolean } result
 * @description If incomingValue is equal {} | [] | '' | null | undefined return false
 */
export const present = R.complement(isBlank);
