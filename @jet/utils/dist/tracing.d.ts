export declare const tracer: import("@opentelemetry/api").Tracer;
export declare const traceAsync: <Res>(spanName: string, fn: () => Promise<Res>) => Promise<Res>;
/**
 * For convenience (instead of providing a mapping function)
 * an array of object keys for the first argument can be provided
 */
declare type ArgKeysOrArgsMapper<T extends any[]> = (keyof T[0])[] | ((...args: T) => any);
export declare const traceAsyncFn: <T extends any[]>(spanName: string, argsMapper?: ArgKeysOrArgsMapper<T>) => <U>(fn: (...args: T) => Promise<U>) => (...args: T) => Promise<U>;
export declare const traceFn: <T extends any[]>(spanName: string, argsMapper?: ArgKeysOrArgsMapper<T>) => <U>(fn: (...args: T) => U) => (...args: T) => U;
/**
 * Creates a tuple of a `start` and `end` function for a span.
 * e.g. helpful when used together with RxJS taps
 */
declare type SpanTuple = {
    start: () => void;
    end: () => void;
};
export declare const makeSpanTuple: (spanName: string) => SpanTuple;
export {};
//# sourceMappingURL=tracing.d.ts.map