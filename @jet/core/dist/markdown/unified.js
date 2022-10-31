import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/core/src/markdown/unified.ts";
/**
 * Unified plugin that adds the raw document data to the vfile under `vfile.data.rawDocumentData`
 *
 * Contentlayer uses this plugin by default.
 */
export const addRawDocumentToVFile = (rawDocumentData) => () => (_, vfile) => {
    Object.assign(vfile.data, { rawDocumentData });
};
//# sourceMappingURL=unified.js.map