import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/utils/src/effect/Chunk.ts";
import { Chunk } from '@effect-ts/core';
import { E, O, These, Tp } from './index.js';
export * from '@effect-ts/core/Collections/Immutable/Chunk';
/**
 * Separates a Chunk of These into success values on one side and error/warning values on the other side
 * Values are preserved in case of a warning.
 */
export const partitionThese = (chunk) => {
    let errors = Chunk.empty();
    let values = Chunk.empty();
    Chunk.forEach_(chunk, (a) => {
        const res = These.result(a);
        if (E.isLeft(res)) {
            errors = Chunk.append_(errors, res.left);
        }
        else {
            values = Chunk.append_(values, res.right.tuple[0]);
            const warning = res.right.tuple[1];
            if (O.isSome(warning)) {
                errors = Chunk.append_(errors, warning.value);
            }
        }
    });
    return Tp.tuple(errors, values);
};
//# sourceMappingURL=Chunk.js.map