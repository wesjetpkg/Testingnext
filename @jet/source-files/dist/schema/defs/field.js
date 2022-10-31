import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/source-files/src/schema/defs/field.ts";
export const isListFieldDef = (_) => _.type === 'list' && !Array.isArray(_.of);
export const isListPolymorphicFieldDef = (_) => _.type === 'list' && Array.isArray(_.of);
export var ListFieldDefItem;
(function (ListFieldDefItem) {
    ListFieldDefItem.isDefItemNested = (_) => _.type === 'nested';
})(ListFieldDefItem || (ListFieldDefItem = {}));
export const isNestedFieldDef = (_) => _.type === 'nested' && !Array.isArray(_.of);
export const isNestedPolymorphicFieldDef = (_) => _.type === 'nested' && Array.isArray(_.of);
export const isReferencePolymorphicFieldDef = (_) => _.type === 'reference' && Array.isArray(_.of);
//# sourceMappingURL=field.js.map