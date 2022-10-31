import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/source-files/src/errors/aggregate.ts";
import * as core from '@contentlayer/core';
import { AsciiTree } from '@contentlayer/utils';
import { T } from '@contentlayer/utils/effect';
export const handleFetchDataErrors = ({ errors, documentCount, options, flags, schemaDef, contentDirPath, verbose, }) => T.gen(function* ($) {
    const filteredErrors = filterIgnoredErrorsByFlags({ errors, flags });
    if (filteredErrors.length === 0)
        return;
    const shouldFail = failOrSkip({ errors: filteredErrors, flags }) === 'fail';
    const errorMessage = aggregateFetchDataErrors({
        documentCount,
        errors: filteredErrors,
        options,
        flags,
        shouldFail,
        schemaDef,
        contentDirPath,
        verbose,
    });
    yield* $(T.log(errorMessage), fileName_1 + ":45:13");
    if (shouldFail) {
        yield* $(T.fail(new core.HandledFetchDataError(), fileName_1 + ":48:22"), fileName_1 + ":48:15");
    }
}, fileName_1 + ":27:8");
export const testOnly_aggregateFetchDataErrors = ({ errors, documentCount, options, flags, schemaDef, contentDirPath, verbose, }) => {
    const filteredErrors = filterIgnoredErrorsByFlags({ errors, flags });
    if (filteredErrors.length === 0)
        return null;
    const shouldFail = failOrSkip({ errors: filteredErrors, flags }) === 'fail';
    return aggregateFetchDataErrors({
        documentCount,
        errors: filteredErrors,
        options,
        flags,
        shouldFail,
        schemaDef,
        contentDirPath,
        verbose,
    });
};
const aggregateFetchDataErrors = ({ errors, documentCount, options, flags, shouldFail, schemaDef, contentDirPath, verbose, }) => {
    const keyMessage = `Found ${errors.length} problems in ${documentCount} documents.`;
    const topMessage = shouldFail ? `Error: ${keyMessage}` : `Warning: ${keyMessage}`;
    const asciiTree = new AsciiTree(topMessage + '\n');
    const uniqueErrorTags = Array.from(new Set(errors.map((e) => e._tag)));
    for (const tag of uniqueErrorTags) {
        const taggedErrors = errors.filter((e) => e._tag === tag);
        let str = '';
        const errorPrintLimit = verbose ? taggedErrors.length : 20;
        const remainingErrorCount = Math.max(taggedErrors.length - errorPrintLimit, 0);
        const skippingMessage = shouldPrintSkipMessage({ flags, error: taggedErrors[0] }) ? ' (Skipping documents)' : '';
        str += taggedErrors[0].renderHeadline({
            errorCount: taggedErrors.length,
            skippingMessage,
            options,
            schemaDef,
            contentDirPath,
        });
        str += '\n\n';
        str += taggedErrors
            .splice(0, errorPrintLimit)
            .map((_) => `• ${_.renderLine()}`)
            .join('\n');
        if (remainingErrorCount > 0) {
            str += '\n';
            str += `• ... ${remainingErrorCount} more documents (Use the --verbose CLI option to show all documents)`;
        }
        str += '\n';
        asciiTree.add(new AsciiTree(str));
    }
    return asciiTree.toString();
};
const shouldPrintSkipMessage = ({ error, flags }) => {
    if (error.category === 'MissingOrIncompatibleData' &&
        flags.onMissingOrIncompatibleData === 'skip-warn' &&
        error.documentTypeDef?.isSingleton !== true) {
        return true;
    }
    if (error.category === 'UnknownDocument' && flags.onUnknownDocuments === 'skip-warn') {
        return true;
    }
    return false;
};
const failOrSkip = ({ errors, flags, }) => {
    if (errors.some((_) => _.category === 'ExtraFieldData') && flags.onExtraFieldData === 'fail') {
        return 'fail';
    }
    if (errors.some((_) => _.category === 'UnknownDocument') && flags.onUnknownDocuments === 'fail') {
        return 'fail';
    }
    if (errors.some((_) => _.category === 'MissingOrIncompatibleData') && flags.onMissingOrIncompatibleData === 'fail') {
        return 'fail';
    }
    if (errors.some((_) => _.category === 'SingletonDocumentNotFound')) {
        return 'fail';
    }
    if (errors.some((_) => _.category === 'Unexpected')) {
        return 'fail';
    }
    if (errors.some((_) => _.documentTypeDef?.isSingleton)) {
        return 'fail';
    }
    return 'skip';
};
const filterIgnoredErrorsByFlags = ({ errors, flags, }) => errors.filter((e) => {
    if (e.category === 'ExtraFieldData' && flags.onExtraFieldData === 'ignore')
        return false;
    if (e.category === 'UnknownDocument' && flags.onUnknownDocuments === 'skip-ignore')
        return false;
    if (e.category === 'MissingOrIncompatibleData' && flags.onMissingOrIncompatibleData === 'skip-ignore')
        return false;
    return true;
});
//# sourceMappingURL=aggregate.js.map