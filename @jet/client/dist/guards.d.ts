import type { Document, GetDocumentTypeMapGen, GetDocumentTypeNamesGen } from '@contentlayer/core';
declare type TypeNameOneOrMany = GetDocumentTypeNamesGen | GetDocumentTypeNamesGen[];
declare type TypeForTypeNameOneOrMany<N extends TypeNameOneOrMany> = N extends GetDocumentTypeNamesGen ? GetDocumentTypeMapGen<Document>[N] : N extends GetDocumentTypeNamesGen[] ? GetDocumentTypeMapGen<Document>[N[number]] : never;
declare function is<N extends TypeNameOneOrMany>(typeName: N, _: any): _ is TypeForTypeNameOneOrMany<N>;
declare function is<N extends TypeNameOneOrMany>(typeName: N): (_: any) => _ is TypeForTypeNameOneOrMany<N>;
export declare const isType: typeof is;
export declare const guards: {
    is: typeof is;
    hasField: typeof hasField;
};
declare type AllPropertyNames<X> = keyof UnionToIntersection<X>;
declare function hasField<T extends {}, P extends AllPropertyNames<T>>(_: T, property: P): _ is T & Record<P, any>;
declare type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;
export {};
//# sourceMappingURL=guards.d.ts.map