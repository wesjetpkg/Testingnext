import * as core from '@contentlayer/core';
import * as utils from '@contentlayer/utils';
import { OT, T } from '@contentlayer/utils/effect';
import { FetchDataError } from '../../errors/index.js';
import type { HasDocumentContext } from '../DocumentContext.js';
import type { ParsedFieldData } from './parseFieldData.js';
export declare const makeImageField: ({ imageData, documentFilePath, contentDirPath, fieldDef, }: {
    imageData: ParsedFieldData<'image'>;
    documentFilePath: utils.RelativePosixFilePath;
    contentDirPath: utils.AbsolutePosixFilePath;
    fieldDef: core.FieldDef;
}) => T.Effect<OT.HasTracer & core.HasCwd & HasDocumentContext, FetchDataError.ImageError, core.ImageFieldData>;
//# sourceMappingURL=field-image.d.ts.map