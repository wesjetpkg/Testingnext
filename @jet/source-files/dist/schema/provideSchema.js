import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/source-files/src/schema/provideSchema.ts";
import * as core from '@contentlayer/core';
import * as utils from '@contentlayer/utils';
import { identity, T } from '@contentlayer/utils/effect';
import { DuplicateBodyFieldError } from '../errors/index.js';
import * as LocalSchema from './defs/index.js';
export const makeCoreSchema = ({ documentTypeDefs, options, esbuildHash, }) => T.gen(function* ($) {
    const coreDocumentTypeDefMap = {};
    const coreNestedTypeDefMap = {};
    for (const documentDef of documentTypeDefs) {
        validateDefName({ defName: documentDef.name });
        const fieldDefs = getFieldDefEntries(documentDef.fields ?? []).map((_) => fieldDefEntryToCoreFieldDef(_, options.fieldOptions));
        if (fieldDefs.some((_) => _.name === options.fieldOptions.bodyFieldName)) {
            yield* $(T.fail(new DuplicateBodyFieldError({ bodyFieldName: options.fieldOptions.bodyFieldName }), fileName_1 + ":30:24"), fileName_1 + ":30:17");
        }
        // add default body markdown field if not explicitly provided
        if (documentDef.contentType === undefined || documentDef.contentType === 'markdown') {
            fieldDefs.push({
                type: 'markdown',
                name: options.fieldOptions.bodyFieldName,
                description: 'Markdown file body',
                default: undefined,
                isRequired: true,
                isSystemField: true,
            });
        }
        // add default body MDX field if not explicitly provided
        if (documentDef.contentType === 'mdx') {
            fieldDefs.push({
                type: 'mdx',
                name: options.fieldOptions.bodyFieldName,
                description: 'MDX file body',
                default: undefined,
                isRequired: true,
                isSystemField: true,
            });
        }
        const computedFields = Object.entries(documentDef.computedFields ?? {}).map(([name, computedField]) => ({
            ...utils.pick(computedField, ['description', 'type']),
            name,
            // NOTE we need to flip the variance here (casting a core.Document to a LocalDocument)
            resolve: computedField.resolve,
        }));
        const coreDocumentDef = {
            _tag: 'DocumentTypeDef',
            ...utils.pick(documentDef, ['name', 'description']),
            isSingleton: documentDef.isSingleton ?? false,
            fieldDefs,
            computedFields,
            extensions: documentDef.extensions ?? {},
        };
        coreDocumentTypeDefMap[documentDef.name] = coreDocumentDef;
    }
    const nestedDefs = collectNestedDefs(documentTypeDefs);
    for (const nestedDef of nestedDefs) {
        validateDefName({ defName: nestedDef.name });
        const coreNestedTypeDef = {
            _tag: 'NestedTypeDef',
            ...utils.pick(nestedDef, ['description']),
            name: nestedDef.name,
            fieldDefs: getFieldDefEntries(nestedDef.fields ?? []).map((_) => fieldDefEntryToCoreFieldDef(_, options.fieldOptions)),
            extensions: nestedDef.extensions ?? {},
        };
        coreNestedTypeDefMap[coreNestedTypeDef.name] = coreNestedTypeDef;
    }
    const coreSchemaDef = {
        documentTypeDefMap: coreDocumentTypeDefMap,
        nestedTypeDefMap: coreNestedTypeDefMap,
        hash: esbuildHash,
    };
    core.validateSchema(coreSchemaDef);
    return coreSchemaDef;
}, fileName_1 + ":18:8");
const validateDefName = ({ defName }) => {
    const firstChar = defName.charAt(0);
    if (firstChar.toLowerCase() === firstChar) {
        const improvedDefName = utils.uppercaseFirstChar(defName);
        console.warn(`\
Warning: A document or nested definition name should start with a uppercase letter.
You've provided the name "${defName}" - please consider using "${improvedDefName}" instead.
`);
    }
};
const getFieldDefEntries = (fieldDefs) => {
    if (Array.isArray(fieldDefs)) {
        return fieldDefs.map((fieldDef) => [fieldDef.name, fieldDef]);
    }
    else {
        return Object.entries(fieldDefs);
    }
};
const getFieldDefValues = (fieldDefs) => {
    if (Array.isArray(fieldDefs)) {
        return fieldDefs;
    }
    else {
        return Object.values(fieldDefs);
    }
};
const fieldDefEntryToCoreFieldDef = ([name, fieldDef], fieldOptions) => {
    const baseFields = {
        ...utils.pick(fieldDef, ['type', 'default', 'description']),
        name,
        isRequired: fieldDef.required ?? false,
        isSystemField: false,
    };
    switch (fieldDef.type) {
        case 'list':
            if (LocalSchema.isListPolymorphicFieldDef(fieldDef)) {
                return {
                    ...baseFields,
                    type: 'list_polymorphic',
                    default: fieldDef.default,
                    typeField: fieldDef.typeField ?? fieldOptions.typeFieldName,
                    of: fieldDef.of.map((_) => fieldListItemsToCoreFieldListDefItems(_, fieldOptions)),
                };
            }
            return {
                ...baseFields,
                type: 'list',
                default: fieldDef.default,
                of: fieldListItemsToCoreFieldListDefItems(fieldDef.of, fieldOptions),
            };
        case 'nested':
            if (LocalSchema.isNestedPolymorphicFieldDef(fieldDef)) {
                const nestedTypeDefs = fieldDef.of.map((_) => _.def());
                const containsUnnamedTypeDef = nestedTypeDefs.some(LocalSchema.isNestedUnnamedTypeDef);
                if (containsUnnamedTypeDef) {
                    throw new Error(`Nested unnamed polymorphic type definitions are not yet supported.`);
                }
                const nestedTypeNames = nestedTypeDefs.map((_) => _.name);
                return {
                    ...baseFields,
                    type: 'nested_polymorphic',
                    default: fieldDef.default,
                    nestedTypeNames,
                    typeField: fieldDef.typeField ?? fieldOptions.typeFieldName,
                };
            }
            const nestedTypeDef = fieldDef.of.def();
            if (LocalSchema.isNestedTypeDef(nestedTypeDef)) {
                return {
                    ...baseFields,
                    type: 'nested',
                    default: fieldDef.default,
                    nestedTypeName: nestedTypeDef.name,
                };
            }
            const fieldDefs = getFieldDefEntries(nestedTypeDef.fields ?? []).map((_) => fieldDefEntryToCoreFieldDef(_, fieldOptions));
            const extensions = nestedTypeDef.extensions ?? {};
            const typeDef = { _tag: 'NestedUnnamedTypeDef', fieldDefs, extensions };
            return {
                ...baseFields,
                type: 'nested_unnamed',
                default: fieldDef.default,
                typeDef,
            };
        case 'reference':
            if (LocalSchema.isReferencePolymorphicFieldDef(fieldDef)) {
                const documentTypeNames = fieldDef.of.map((_) => _.def().name);
                return {
                    ...baseFields,
                    type: 'reference_polymorphic',
                    default: fieldDef.default,
                    documentTypeNames,
                    typeField: fieldDef.typeField ?? fieldOptions.typeFieldName,
                };
            }
            return {
                ...baseFields,
                type: 'reference',
                default: fieldDef.default,
                documentTypeName: fieldDef.of.def().name,
                embedDocument: fieldDef.embedDocument ?? false,
            };
        case 'enum':
            return {
                ...baseFields,
                type: 'enum',
                default: fieldDef.default,
                options: fieldDef.options,
            };
        case 'boolean':
        case 'date':
        case 'image':
        case 'json':
        case 'markdown':
        case 'mdx':
        case 'number':
        case 'string':
            return {
                // needs to pick again since fieldDef.type has been
                ...utils.pick(fieldDef, ['type', 'default', 'description']),
                isRequired: fieldDef.required ?? false,
                name,
                isSystemField: false,
            };
        default:
            utils.casesHandled(fieldDef);
    }
};
const fieldListItemsToCoreFieldListDefItems = (listFieldDefItem, fieldOptions) => {
    switch (listFieldDefItem.type) {
        case 'boolean':
        case 'string':
        case 'number':
        case 'date':
        case 'json':
        case 'markdown':
        case 'mdx':
        case 'image':
            return utils.pick(listFieldDefItem, ['type']);
        case 'enum':
            return {
                type: 'enum',
                options: listFieldDefItem.options,
            };
        case 'nested':
            const nestedTypeDef = listFieldDefItem.def();
            if (LocalSchema.isNestedTypeDef(nestedTypeDef)) {
                return { type: 'nested', nestedTypeName: nestedTypeDef.name };
            }
            const fieldDefs = getFieldDefEntries(nestedTypeDef.fields ?? []).map((_) => fieldDefEntryToCoreFieldDef(_, fieldOptions));
            const extensions = nestedTypeDef.extensions ?? {};
            const typeDef = { _tag: 'NestedUnnamedTypeDef', fieldDefs, extensions };
            return { type: 'nested_unnamed', typeDef };
        case 'document':
            return {
                type: 'reference',
                documentTypeName: listFieldDefItem.def().name,
                embedDocument: listFieldDefItem.embedDocument ?? false,
            };
        default:
            utils.casesHandled(listFieldDefItem);
    }
};
const collectNestedDefs = (documentDefs) => {
    const objectDefMap = {};
    const traverseNestedDef = (objectDef) => {
        if (objectDef.name in objectDefMap) {
            return;
        }
        objectDefMap[objectDef.name] = objectDef;
        getFieldDefValues(objectDef.fields ?? []).forEach(traverseField);
    };
    const traverseField = (fieldDef) => {
        switch (fieldDef.type) {
            case 'nested':
                if (utils.isReadonlyArray(fieldDef.of)) {
                    const nestedTypeDefs = fieldDef.of.map((_) => _.def());
                    return nestedTypeDefs.forEach((nestedTypeDef) => {
                        if (LocalSchema.isNestedTypeDef(nestedTypeDef)) {
                            return traverseNestedDef(nestedTypeDef);
                        }
                        return getFieldDefValues(nestedTypeDef.fields ?? []).forEach(traverseField);
                    });
                }
                const nestedTypeDef = fieldDef.of.def();
                if (LocalSchema.isNestedTypeDef(nestedTypeDef)) {
                    return traverseNestedDef(nestedTypeDef);
                }
                return getFieldDefValues(nestedTypeDef.fields ?? []).forEach(traverseField);
            case 'list':
                if (LocalSchema.isListPolymorphicFieldDef(fieldDef)) {
                    return fieldDef.of.forEach(traverseListFieldItem);
                }
                return traverseListFieldItem(fieldDef.of);
            case 'image':
            case 'boolean':
            case 'date':
            case 'enum':
            case 'json':
            case 'markdown':
            case 'mdx':
            case 'number':
            // case 'slug':
            case 'string':
            // case 'text':
            // case 'url':
            case 'reference':
                return;
            default:
                utils.casesHandled(fieldDef);
        }
    };
    const traverseListFieldItem = (listFieldDefItem) => {
        switch (listFieldDefItem.type) {
            case 'nested':
                const nestedTypeDef = listFieldDefItem.def();
                if (LocalSchema.isNestedUnnamedTypeDef(nestedTypeDef)) {
                    return getFieldDefValues(nestedTypeDef.fields ?? []).forEach(traverseField);
                }
                return traverseNestedDef(nestedTypeDef);
        }
    };
    documentDefs.flatMap((_) => getFieldDefValues(_.fields ?? [])).forEach(traverseField);
    return Object.values(objectDefMap);
};
//# sourceMappingURL=provideSchema.js.map