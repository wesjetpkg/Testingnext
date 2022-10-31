import * as core from '@contentlayer/core';
import type * as LocalSchema from './schema/defs/index.js';
import type { Flags, PluginOptions } from './types.js';
export * from './types.js';
export * from './schema/defs/index.js';
export declare type Args = {
    documentTypes: LocalSchema.DocumentTypes;
    /**
     * Path to the root directory that contains all content. Every content file path will be relative
     * to this directory. This includes:
     *  - The `filePathPattern` option in `defineDocumentType` is relative to `contentDirPath`
     *  - Each document's `_raw` fields such as `flattenedPath`, `sourceFilePath`, `sourceFileDir`
     */
    contentDirPath: string;
    /**
     * An array of paths that Contentlayer should include. They can be either files or directories.
     * The paths need to be relative to `contentDirPath` or absolute.
     * Glob/wildcard patterns (e.g. using `*`) are not supported yet.
     * An empty array means that all files in `contentDirPath` will be included.
     *
     * @default []
     *
     * @example
     * ```js
     * export default makeSource({
     *   // ...
     *   contentDirPath: '.',
     *   contentDirInclude: ['docs'],
     * })
     * ```
     */
    contentDirInclude?: string[];
    /**
     * An array of paths that Contentlayer should ignore. They can be either files or directories.
     * The paths need to be relative to `contentDirPath` or absolute.
     * Glob/wildcard patterns (e.g. using `*`) are not supported yet.
     *
     * `contentDirExclude` has a higher priority than `contentDirInclude`.
     *
     * @see {@link contentDirExcludeDefault} for default values
     *
     * @default ['node_modules', '.git', '.yarn', '.cache', '.next', '.contentlayer', 'package.json', 'tsconfig.json']
     *
     *
     * @example
     * ```js
     * export default makeSource({
     *   // ...
     *   contentDirPath: './content',
     *   contentDirExclude: ['internal-docs'],
     * })
     * ```
     */
    contentDirExclude?: string[];
    /**
     * This is an experimental feature and should be ignored for now.
     */
    extensions?: {
        stackbit?: core.StackbitExtension.Config;
    };
} & PluginOptions & Partial<Flags>;
export declare const makeSource: core.MakeSourcePlugin<Args>;
export declare const contentDirExcludeDefault: string[];
//# sourceMappingURL=index.d.ts.map