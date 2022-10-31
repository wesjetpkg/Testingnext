import type * as core from '@contentlayer/core';
import type { AbsolutePosixFilePath, RelativePosixFilePath } from '@contentlayer/utils';
import type { HasConsole } from '@contentlayer/utils/effect';
import { OT, T } from '@contentlayer/utils/effect';
import { fs } from '@contentlayer/utils/node';
import type { Flags } from '../index.js';
import type { ContentTypeMap, FilePathPatternMap } from '../types.js';
export declare const fetchAllDocuments: ({ coreSchemaDef, filePathPatternMap, contentDirPath, contentDirInclude, contentDirExclude, contentTypeMap, flags, options, previousCache, verbose, }: {
    coreSchemaDef: core.SchemaDef;
    filePathPatternMap: FilePathPatternMap;
    contentDirPath: AbsolutePosixFilePath;
    contentDirInclude: readonly RelativePosixFilePath[];
    contentDirExclude: readonly RelativePosixFilePath[];
    contentTypeMap: ContentTypeMap;
    flags: Flags;
    options: core.PluginOptions;
    previousCache: core.DataCache.Cache | undefined;
    verbose: boolean;
}) => T.Effect<OT.HasTracer & HasConsole & core.HasCwd, fs.UnknownFSError | core.HandledFetchDataError, core.DataCache.Cache>;
//# sourceMappingURL=fetchAllDocuments.d.ts.map