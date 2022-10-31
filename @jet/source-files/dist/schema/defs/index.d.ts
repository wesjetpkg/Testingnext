import type * as core from '@contentlayer/core';
import type { Thunk } from '@contentlayer/utils';
import type { ComputedField } from './computed-field.js';
import type { FieldDef, FieldDefWithName } from './field.js';
export * from './field.js';
export declare type SchemaDef = {
    documentTypeDefs: DocumentTypeDef[];
};
export declare type DocumentContentType = 'markdown' | 'mdx' | 'data';
export declare type TypeExtensions<DefName extends string = string> = {
    stackbit?: core.StackbitExtension.TypeExtension<DefName>;
};
export declare type FieldDefs = Record<string, FieldDef> | FieldDefWithName[];
export declare type DocumentTypeDef<DefName extends string = string> = {
    name: DefName;
    description?: string;
    /**
     * The field definitions can either be provided as an object with the field names as keys or
     * as an array of all field definitions including the name as an extra field. (The array definition
     * can be used if you want more control over the order of the fields.)
     *
     * @default []
     */
    fields?: FieldDefs;
    computedFields?: ComputedFields<DefName>;
    /** Path is relative to the `contentDirPath` config */
    filePathPattern?: string;
    /**
     * Default is `markdown`
     *
     * Choose `data` e.g. for a `.json` or `.yaml` file
     */
    contentType?: DocumentContentType;
    isSingleton?: boolean;
    extensions?: TypeExtensions<DefName>;
};
export declare type ComputedFields<DefName extends string = string> = Record<string, ComputedField<DefName>>;
export declare type NestedTypeDef<DefName extends string = string> = {
    name: DefName;
    description?: string;
    /** @default [] */
    fields?: FieldDefs;
    extensions?: TypeExtensions<DefName>;
};
export declare const isNestedTypeDef: (_: NestedTypeDef | NestedUnnamedTypeDef) => _ is NestedTypeDef<string>;
export declare type NestedUnnamedTypeDef = {
    /** @default [] */
    fields?: FieldDefs;
    extensions?: TypeExtensions;
};
export declare const isNestedUnnamedTypeDef: (_: NestedTypeDef | NestedUnnamedTypeDef) => _ is NestedUnnamedTypeDef;
export declare type NestedType<DefName extends string = string> = {
    type: 'nested';
    def: Thunk<NestedTypeDef<DefName> | NestedUnnamedTypeDef>;
};
export declare type DocumentType<DefName extends string = string> = {
    type: 'document';
    def: Thunk<DocumentTypeDef<DefName>>;
};
export declare type DocumentTypes = DocumentType<any>[] | Record<string, DocumentType<any>>;
export declare const defineNestedType: <DefName extends string>(def: Thunk<NestedUnnamedTypeDef | NestedTypeDef<DefName>>) => NestedType;
export declare const defineDocumentType: <DefName extends string>(def: Thunk<DocumentTypeDef<DefName>>) => DocumentType;
//# sourceMappingURL=index.d.ts.map