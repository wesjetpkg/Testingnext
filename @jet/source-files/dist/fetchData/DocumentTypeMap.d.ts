import type { RelativePosixFilePath } from '@contentlayer/utils';
import type { Has } from '@contentlayer/utils/effect';
import { HashMap, O, State, T } from '@contentlayer/utils/effect';
declare type DocumentTypeName = string;
declare const DocumentTypeMap_base: import("@effect-ts/system/Case").CaseConstructorTagged<"@local/DocumentTypeMap", "_tag">;
export declare class DocumentTypeMap extends DocumentTypeMap_base<{
    readonly map: HashMap.HashMap<DocumentTypeName, RelativePosixFilePath[]>;
}> {
    static init: () => DocumentTypeMap;
    add: (documentTypeName: DocumentTypeName, filePath: RelativePosixFilePath) => DocumentTypeMap;
    getFilePaths: (documentTypeName: DocumentTypeName) => O.Option<RelativePosixFilePath[]>;
}
/**
 * This state is needed for certain kinds of error handling (e.g. to check if singleton documents have been provided)
 */
export declare const DocumentTypeMapState: State.StateExternal<DocumentTypeMap>;
export declare const provideDocumentTypeMapState: <R1, E1, A1>(self: T.Effect<R1 & Has<State.State<DocumentTypeMap>>, E1, A1>) => T.Effect<R1, E1, A1>;
export declare type HasDocumentTypeMapState = Has<State.State<DocumentTypeMap>>;
export {};
//# sourceMappingURL=DocumentTypeMap.d.ts.map