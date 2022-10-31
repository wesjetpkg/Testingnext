import * as tracing_1 from "@effect-ts/core/Tracing";
const fileName_1 = "packages/@contentlayer/utils/src/file-paths.ts";
import * as path from 'node:path';
import { Branded } from './effect/index.js';
export const absolutePosixFilePath = (path_) => {
    if (!isPosixFilePathString(path_)) {
        throw new Error(`Expected a Posix file path, got ${path_}`);
    }
    if (!path.isAbsolute(path_)) {
        throw new Error(`Expected an absolute path (i.e. starting with '/' or '\\'), got ${path_}`);
    }
    return path_;
};
export const relativePosixFilePath = (path_) => {
    if (!isPosixFilePathString(path_)) {
        throw new Error(`Expected a Posix file path, got ${path_}`);
    }
    if (path.isAbsolute(path_)) {
        throw new Error(`Expected a relative path (i.e. not starting with '/' or '\\'), got ${path_}`);
    }
    return path_;
};
export const isPosixFilePathString = (path_) => !path_.includes(path.win32.sep);
export const assertPosixFilePathString = (path_) => {
    if (!isPosixFilePathString(path_)) {
        throw new Error(`Expected a Posix file path, got ${path_}`);
    }
};
export const unknownToRelativePosixFilePath = (path_, cwd) => {
    if (path.isAbsolute(path_)) {
        if (cwd === undefined) {
            throw new Error(`Expected a relative path, got ${path_}`);
        }
        return relative(cwd, path_);
    }
    if (isPosixFilePathString(path_)) {
        return relativePosixFilePath(path_);
    }
    return relativePosixFilePath(path_.split(path.win32.sep).join(path.posix.sep));
};
export const unknownToAbsolutePosixFilePath = (path_, cwd) => {
    if (!path.isAbsolute(path_)) {
        if (cwd === undefined) {
            throw new Error(`Expected an absolute path (i.e. starting with '/' or '\\'), got ${path_}`);
        }
        return filePathJoin(cwd, path_);
    }
    if (isPosixFilePathString(path_)) {
        return absolutePosixFilePath(path_);
    }
    return absolutePosixFilePath(path_.split(path.win32.sep).join(path.posix.sep));
};
export const unknownFilePath = (path_) => path_;
export function filePathJoin(...paths) {
    if (paths.length > 0 && path.isAbsolute(paths[0])) {
        if (paths.slice(1).some(path.isAbsolute)) {
            throw new Error(`All path segments except the first are expected to be relative, got ${paths}`);
        }
        return unknownToAbsolutePosixFilePath(path.join(...paths));
    }
    return unknownToRelativePosixFilePath(path.join(...paths));
}
export function dirname(path_) {
    return path.dirname(path_);
}
export function relative(from, to) {
    return unknownToRelativePosixFilePath(path.relative(from, to));
}
//# sourceMappingURL=file-paths.js.map