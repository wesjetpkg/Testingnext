import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/utils/src/tracing.ts";
import { SpanStatusCode, trace } from '@opentelemetry/api';
export const tracer = trace.getTracer('contentlayer');
export const traceAsync = (spanName, fn) => {
    return tracer.startActiveSpan(spanName, (span) => {
        return fn()
            .catch((e) => {
            span.setStatus({ code: SpanStatusCode.ERROR, message: e.toString() });
            throw e;
        })
            .finally(() => span.end());
    });
};
export const traceAsyncFn = (spanName, argsMapper = []) => (fn) => {
    return (...args) => {
        return tracer.startActiveSpan(spanName, (span) => {
            addArgsToSpan(span, argsMapper, args);
            return fn(...args)
                .catch((e) => {
                span.setStatus({ code: SpanStatusCode.ERROR, message: e.toString() });
                throw e;
            })
                .finally(() => {
                span.end();
            });
        });
    };
};
export const traceFn = (spanName, argsMapper = []) => (fn) => {
    return (...args) => {
        return tracer.startActiveSpan(spanName, (span) => {
            addArgsToSpan(span, argsMapper, args);
            try {
                return fn(...args);
            }
            catch (e) {
                span.setStatus({ code: SpanStatusCode.ERROR, message: e.toString() });
                throw e;
            }
            finally {
                span.end();
            }
        });
    };
};
export const makeSpanTuple = (spanName) => {
    let span = undefined;
    const start = () => {
        const span_ = tracer.startSpan(spanName);
        span = span_;
    };
    const end = () => span?.end();
    return { start, end };
};
const addArgsToSpan = (span, argsMapper, args) => {
    const args_ = Array.isArray(argsMapper)
        ? Object.fromEntries(argsMapper.map((key) => [key, args[0][key]]))
        : argsMapper(...args);
    try {
        if (Array.isArray(args_)) {
            for (const [key, arg] of args_.entries()) {
                span.setAttribute(`args.${key}`, JSON.stringify(arg, null, 2));
            }
        }
        else {
            span.setAttribute(`args`, JSON.stringify(args_, null, 2));
        }
    }
    catch (_) { }
};
//# sourceMappingURL=tracing.js.map