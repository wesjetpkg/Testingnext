import { type Temporal } from '@js-temporal/polyfill';
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
import inflection from 'inflection';
export { inflection };
declare global {
    interface Date {
        toTemporalInstant(): Temporal.Instant;
    }
}
export declare const recRemoveUndefinedValues: (val: any) => void;
export declare const partition: <T, TLeft extends T>(arr: T[], isLeft: (_: T) => _ is TLeft) => [TLeft[], Exclude<T, TLeft>[]];
export declare const not: <T, TGuarded extends T>(guard: (_: T) => _ is TGuarded) => (el: T) => el is Exclude<T, TGuarded>;
export declare const errorToString: (error: any) => string;
export declare const capitalizeFirstLetter: (str: string) => string;
/**
 * Use this to make assertion at end of if-else chain that all members of a
 * union have been accounted for.
 */
export declare function casesHandled(x: never): never;
export declare function notImplemented(msg?: string): never;
export declare type Thunk<T> = () => T;
export declare const unwrapThunk: <T>(_: T | (() => T)) => T;
declare const RawError_base: import("@effect-ts/core/Case").CaseConstructorTagged<"RawError", "_tag">;
export declare class RawError extends RawError_base<{
    readonly error: unknown;
}> {
}
export declare const isReadonlyArray: <T>(_: any) => _ is readonly T[];
export declare function assertNever(_: any): never;
export declare const asMutableArray: <T>(arr: readonly T[]) => T[];
//# sourceMappingURL=index.d.ts.map