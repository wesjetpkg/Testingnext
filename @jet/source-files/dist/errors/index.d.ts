import type * as core from '@contentlayer/core';
import type { AbsolutePosixFilePath, RelativePosixFilePath } from '@contentlayer/utils';
import type { DocumentContentType } from '../index.js';
export declare namespace FetchDataError {
    export type FetchDataError = InvalidFrontmatterError | InvalidMarkdownFileError | InvalidYamlFileError | InvalidJsonFileError | ImageError | ComputedValueError | UnsupportedFileExtension | FileExtensionMismatch | NoSuchDocumentTypeError | NoSuchNestedDocumentTypeError | CouldNotDetermineDocumentTypeError | MissingRequiredFieldsError | ExtraFieldDataError | ReferencedFileDoesNotExistError | IncompatibleFieldDataError | SingletonDocumentNotFoundError | UnexpectedError;
    interface AggregatableError {
        renderHeadline: RenderHeadline;
        renderLine: () => string;
        category: AggregatableErrorCategory;
        documentTypeDef: core.DocumentTypeDef | undefined;
    }
    export const handleErrors: ({ errors, documentCount, options, flags, schemaDef, contentDirPath, verbose, }: {
        errors: readonly FetchDataError[];
        documentCount: number;
        options: core.PluginOptions;
        flags: import("../types.js").Flags;
        schemaDef: core.SchemaDef;
        contentDirPath: AbsolutePosixFilePath;
        verbose?: boolean | undefined;
    }) => import("@effect-ts/system/Effect/effect.js").Effect<import("@contentlayer/utils/effect").HasConsole, core.HandledFetchDataError, void>;
    type RenderHeadline = (_: {
        /**
         * `errorCount` is mostly equivalent with the number of erroneous documents
         * but in some cases (e.g. `SingletonDocumentNotFoundError`) can be independent of a certain document
         */
        errorCount: number;
        options: core.PluginOptions;
        schemaDef: core.SchemaDef;
        contentDirPath: AbsolutePosixFilePath;
        skippingMessage: string;
    }) => string;
    /** This error category is used in order to let users configure the error handling (e.g. warn, ignore, fail) */
    type AggregatableErrorCategory = 'UnknownDocument' | 'ExtraFieldData' | 'MissingOrIncompatibleData' | 'Unexpected' | 'SingletonDocumentNotFound';
    const InvalidFrontmatterError_base: import("@effect-ts/system/Case/index.js").CaseConstructorTagged<"InvalidFrontmatterError", "_tag">;
    export class InvalidFrontmatterError extends InvalidFrontmatterError_base<{
        readonly error: unknown;
        readonly documentFilePath: RelativePosixFilePath;
    }> implements AggregatableError {
        category: AggregatableErrorCategory;
        documentTypeDef: undefined;
        renderHeadline: RenderHeadline;
        renderLine: () => string;
    }
    const InvalidMarkdownFileError_base: import("@effect-ts/system/Case/index.js").CaseConstructorTagged<"InvalidMarkdownFileError", "_tag">;
    export class InvalidMarkdownFileError extends InvalidMarkdownFileError_base<{
        readonly error: unknown;
        readonly documentFilePath: RelativePosixFilePath;
    }> implements AggregatableError {
        category: AggregatableErrorCategory;
        documentTypeDef: undefined;
        renderHeadline: RenderHeadline;
        renderLine: () => string;
    }
    const InvalidYamlFileError_base: import("@effect-ts/system/Case/index.js").CaseConstructorTagged<"InvalidYamlFileError", "_tag">;
    export class InvalidYamlFileError extends InvalidYamlFileError_base<{
        readonly error: unknown;
        readonly documentFilePath: RelativePosixFilePath;
    }> implements AggregatableError {
        category: AggregatableErrorCategory;
        documentTypeDef: undefined;
        renderHeadline: RenderHeadline;
        renderLine: () => string;
    }
    const InvalidJsonFileError_base: import("@effect-ts/system/Case/index.js").CaseConstructorTagged<"InvalidJsonFileError", "_tag">;
    export class InvalidJsonFileError extends InvalidJsonFileError_base<{
        readonly error: unknown;
        readonly documentFilePath: RelativePosixFilePath;
    }> implements AggregatableError {
        category: AggregatableErrorCategory;
        documentTypeDef: undefined;
        renderHeadline: RenderHeadline;
        renderLine: () => string;
    }
    const ImageError_base: import("@effect-ts/system/Case/index.js").CaseConstructorTagged<"ImageError", "_tag">;
    export class ImageError extends ImageError_base<{
        readonly error: unknown;
        readonly documentFilePath: RelativePosixFilePath;
        readonly fieldDef: core.FieldDef;
        readonly imagePath: string;
        readonly documentTypeDef: core.DocumentTypeDef;
    }> implements AggregatableError {
        category: AggregatableErrorCategory;
        renderHeadline: RenderHeadline;
        renderLine: () => string;
    }
    const ComputedValueError_base: import("@effect-ts/system/Case/index.js").CaseConstructorTagged<"ComputedValueError", "_tag">;
    export class ComputedValueError extends ComputedValueError_base<{
        readonly error: unknown;
        readonly documentFilePath: RelativePosixFilePath;
        readonly documentTypeDef: core.DocumentTypeDef;
    }> implements AggregatableError {
        category: AggregatableErrorCategory;
        renderHeadline: RenderHeadline;
        renderLine: () => string;
    }
    const UnsupportedFileExtension_base: import("@effect-ts/system/Case/index.js").CaseConstructorTagged<"UnsupportedFileExtension", "_tag">;
    export class UnsupportedFileExtension extends UnsupportedFileExtension_base<{
        readonly extension: string;
        readonly filePath: string;
    }> implements AggregatableError {
        category: AggregatableErrorCategory;
        documentTypeDef: undefined;
        renderHeadline: RenderHeadline;
        renderLine: () => string;
    }
    const FileExtensionMismatch_base: import("@effect-ts/system/Case/index.js").CaseConstructorTagged<"FileExtensionMismatch", "_tag">;
    export class FileExtensionMismatch extends FileExtensionMismatch_base<{
        readonly extension: string;
        readonly contentType: DocumentContentType;
        readonly filePath: string;
    }> implements AggregatableError {
        category: AggregatableErrorCategory;
        documentTypeDef: undefined;
        renderHeadline: RenderHeadline;
        renderLine: () => string;
    }
    const CouldNotDetermineDocumentTypeError_base: import("@effect-ts/system/Case/index.js").CaseConstructorTagged<"CouldNotDetermineDocumentTypeError", "_tag">;
    export class CouldNotDetermineDocumentTypeError extends CouldNotDetermineDocumentTypeError_base<{
        readonly documentFilePath: RelativePosixFilePath;
        readonly typeFieldName: string;
    }> implements AggregatableError {
        category: AggregatableErrorCategory;
        documentTypeDef: undefined;
        renderHeadline: RenderHeadline;
        renderLine: () => string;
    }
    const NoSuchDocumentTypeError_base: import("@effect-ts/system/Case/index.js").CaseConstructorTagged<"NoSuchDocumentTypeError", "_tag">;
    export class NoSuchDocumentTypeError extends NoSuchDocumentTypeError_base<{
        readonly documentTypeName: string;
        readonly documentFilePath: RelativePosixFilePath;
    }> implements AggregatableError {
        category: AggregatableErrorCategory;
        documentTypeDef: undefined;
        renderHeadline: RenderHeadline;
        renderLine: () => string;
    }
    const NoSuchNestedDocumentTypeError_base: import("@effect-ts/system/Case/index.js").CaseConstructorTagged<"NoSuchNestedDocumentTypeError", "_tag">;
    export class NoSuchNestedDocumentTypeError extends NoSuchNestedDocumentTypeError_base<{
        readonly nestedTypeName: string;
        readonly documentFilePath: RelativePosixFilePath;
        readonly fieldName: string;
        readonly validNestedTypeNames: readonly string[];
        readonly documentTypeDef: core.DocumentTypeDef;
    }> implements AggregatableError {
        category: AggregatableErrorCategory;
        renderHeadline: RenderHeadline;
        renderLine: () => string;
    }
    const MissingRequiredFieldsError_base: import("@effect-ts/system/Case/index.js").CaseConstructorTagged<"MissingRequiredFieldsError", "_tag">;
    export class MissingRequiredFieldsError extends MissingRequiredFieldsError_base<{
        readonly documentFilePath: RelativePosixFilePath;
        readonly fieldDefsWithMissingData: core.FieldDef[];
        readonly documentTypeDef: core.DocumentTypeDef;
    }> implements AggregatableError {
        category: AggregatableErrorCategory;
        renderHeadline: RenderHeadline;
        renderLine: () => string;
    }
    const ExtraFieldDataError_base: import("@effect-ts/system/Case/index.js").CaseConstructorTagged<"ExtraFieldDataError", "_tag">;
    export class ExtraFieldDataError extends ExtraFieldDataError_base<{
        readonly documentFilePath: RelativePosixFilePath;
        readonly extraFieldEntries: readonly (readonly [fieldKey: string, fieldValue: any])[];
        readonly documentTypeDef: core.DocumentTypeDef;
    }> implements AggregatableError {
        category: AggregatableErrorCategory;
        renderHeadline: RenderHeadline;
        renderLine: () => string;
    }
    const ReferencedFileDoesNotExistError_base: import("@effect-ts/system/Case/index.js").CaseConstructorTagged<"ReferencedFileDoesNotExistError", "_tag">;
    export class ReferencedFileDoesNotExistError extends ReferencedFileDoesNotExistError_base<{
        readonly documentFilePath: RelativePosixFilePath;
        readonly fieldName: string;
        readonly referencedFilePath: RelativePosixFilePath;
        readonly documentTypeDef: core.DocumentTypeDef;
    }> implements AggregatableError {
        category: AggregatableErrorCategory;
        renderHeadline: RenderHeadline;
        renderLine: () => string;
    }
    const IncompatibleFieldDataError_base: import("@effect-ts/system/Case/index.js").CaseConstructorTagged<"IncompatibleFieldDataError", "_tag">;
    export class IncompatibleFieldDataError extends IncompatibleFieldDataError_base<{
        readonly documentFilePath: RelativePosixFilePath;
        readonly incompatibleFieldData: readonly (readonly [fieldKey: string, fieldValue: any])[];
        readonly documentTypeDef: core.DocumentTypeDef;
    }> implements AggregatableError {
        category: AggregatableErrorCategory;
        renderHeadline: RenderHeadline;
        renderLine: () => string;
    }
    const SingletonDocumentNotFoundError_base: import("@effect-ts/system/Case/index.js").CaseConstructorTagged<"SingletonDocumentNotFoundError", "_tag">;
    export class SingletonDocumentNotFoundError extends SingletonDocumentNotFoundError_base<{
        readonly filePath: string | undefined;
        readonly documentTypeDef: core.DocumentTypeDef;
    }> implements AggregatableError {
        category: AggregatableErrorCategory;
        renderHeadline: RenderHeadline;
        renderLine: () => string;
    }
    const UnexpectedError_base: import("@effect-ts/system/Case/index.js").CaseConstructorTagged<"UnexpectedError", "_tag">;
    export class UnexpectedError extends UnexpectedError_base<{
        readonly documentFilePath: RelativePosixFilePath;
        readonly error: unknown;
    }> implements AggregatableError {
        category: AggregatableErrorCategory;
        documentTypeDef: undefined;
        renderHeadline: RenderHeadline;
        renderLine: () => string;
    }
    export {};
}
export declare type SchemaError = DuplicateBodyFieldError;
declare const DuplicateBodyFieldError_base: import("@effect-ts/system/Case/index.js").CaseConstructorTagged<"DuplicateBodyFieldError", "_tag">;
export declare class DuplicateBodyFieldError extends DuplicateBodyFieldError_base<{
    readonly bodyFieldName: string;
}> {
    toString: () => string;
}
export {};
//# sourceMappingURL=index.d.ts.map