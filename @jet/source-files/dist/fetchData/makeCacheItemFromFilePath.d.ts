import type * as core from '@contentlayer/core';
import type { AbsolutePosixFilePath, RelativePosixFilePath } from '@contentlayer/utils';
import type { HasConsole } from '@contentlayer/utils/effect';
import { OT, T, These } from '@contentlayer/utils/effect';
import { FetchDataError } from '../errors/index.js';
import type { ContentTypeMap, FilePathPatternMap } from '../types.js';
import type { HasDocumentTypeMapState } from './DocumentTypeMap.js';
export declare const makeCacheItemFromFilePath: ({ relativeFilePath, filePathPatternMap, coreSchemaDef, contentDirPath, options, previousCache, contentTypeMap, }: {
    relativeFilePath: RelativePosixFilePath;
    filePathPatternMap: FilePathPatternMap;
    coreSchemaDef: core.SchemaDef;
    contentDirPath: AbsolutePosixFilePath;
    options: core.PluginOptions;
    previousCache: core.DataCache.Cache | undefined;
    contentTypeMap: ContentTypeMap;
}) => T.Effect<OT.HasTracer & HasConsole & HasDocumentTypeMapState & core.HasCwd, never, These.These<FetchDataError.FetchDataError, core.DataCache.CacheItem>>;
//# sourceMappingURL=makeCacheItemFromFilePath.d.ts.map