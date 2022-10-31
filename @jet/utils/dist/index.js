import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/utils/src/index.ts";
import { toTemporalInstant } from '@js-temporal/polyfill';
export * from './string.js';
export * from './guards.js';
export * from './object/index.js';
export * from './tracing.js';
export * from './promise.js';
export * from './hash.js';
export * from './single-item.js';
export * from './file-paths.js';
export * as base64 from './base64.js';
export * from './tracing-effect/index.js';
export { Temporal } from '@js-temporal/polyfill';
export { AsciiTree } from 'oo-ascii-tree';
export * as pattern from 'ts-pattern';
import { Tagged } from '@effect-ts/core/Case';
// inflection is a CJS module, so we need to import it as default export
import inflection from 'inflection';
export { inflection };
Date.prototype.toTemporalInstant = toTemporalInstant;
export const recRemoveUndefinedValues = (val) => {
    if (Array.isArray(val)) {
        val.forEach(recRemoveUndefinedValues);
    }
    else if (typeof val === 'object') {
        Object.keys(val).forEach((key) => {
            if (val[key] === undefined) {
                delete val[key];
            }
            else {
                recRemoveUndefinedValues(val[key]);
            }
        });
    }
};
export const partition = (arr, isLeft) => {
    return arr.reduce((acc, el) => {
        if (isLeft(el)) {
            acc[0].push(el);
        }
        else {
            acc[1].push(el);
        }
        return acc;
    }, [[], []]);
};
export const not = (guard) => (el) => !guard(el);
export const errorToString = (error) => {
    const stack = process.env.CL_DEBUG ? error.stack : undefined;
    const str = error.toString();
    const stackStr = stack ? `\n${stack}` : '';
    if (str !== '[object Object]')
        return str + stackStr;
    return JSON.stringify({ ...error, stack }, null, 2);
};
export const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
/**
 * Use this to make assertion at end of if-else chain that all members of a
 * union have been accounted for.
 */
export function casesHandled(x) {
    throw new Error(`A case was not handled for value: ${JSON.stringify(x)}`);
}
export function notImplemented(msg) {
    throw new Error(`Not yet implemented ${msg}`);
}
export const unwrapThunk = (_) => {
    if (typeof _ === 'function') {
        return _();
    }
    else {
        return _;
    }
};
export class RawError extends Tagged('RawError') {
}
export const isReadonlyArray = (_) => Array.isArray(_);
export function assertNever(_) {
    throw new Error(`assertNever: This should never happen ${JSON.stringify(_)}`);
}
export const asMutableArray = (arr) => arr.slice();
//# sourceMappingURL=index.js.map