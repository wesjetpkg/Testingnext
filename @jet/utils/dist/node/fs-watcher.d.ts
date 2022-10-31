/// <reference types="node" />
import type fs from 'node:fs';
import * as T from '@effect-ts/core/Effect';
import * as S from '@effect-ts/core/Effect/Experimental/Stream';
import * as M from '@effect-ts/core/Effect/Managed';
import * as E from '@effect-ts/core/Either';
import * as O from '@effect-ts/core/Option';
import * as Chokidar from 'chokidar';
import type { UnknownFilePath } from '../file-paths.js';
export declare class FileAdded {
    path: UnknownFilePath;
    stats: O.Option<fs.Stats>;
    readonly _tag = "FileAdded";
    constructor(path: UnknownFilePath, stats: O.Option<fs.Stats>);
}
export declare class FileRemoved {
    path: UnknownFilePath;
    stats: O.Option<fs.Stats>;
    readonly _tag = "FileRemoved";
    constructor(path: UnknownFilePath, stats: O.Option<fs.Stats>);
}
export declare class FileChanged {
    path: UnknownFilePath;
    stats: O.Option<fs.Stats>;
    readonly _tag = "FileChanged";
    constructor(path: UnknownFilePath, stats: O.Option<fs.Stats>);
}
export declare class DirectoryAdded {
    path: UnknownFilePath;
    stats: O.Option<fs.Stats>;
    readonly _tag = "DirectoryAdded";
    constructor(path: UnknownFilePath, stats: O.Option<fs.Stats>);
}
export declare class DirectoryRemoved {
    path: UnknownFilePath;
    stats: O.Option<fs.Stats>;
    readonly _tag = "DirectoryRemoved";
    constructor(path: UnknownFilePath, stats: O.Option<fs.Stats>);
}
export declare type FileSystemEvent = FileAdded | FileRemoved | FileChanged | DirectoryAdded | DirectoryRemoved;
export declare const FileWatcherTypeId: unique symbol;
export declare type FileWatcherTypeId = typeof FileWatcherTypeId;
export declare abstract class FileWatcher {
    readonly [FileWatcherTypeId]: FileWatcherTypeId;
}
export declare const WatchErrorTypeId: unique symbol;
export declare type WatchErrorTypeId = typeof WatchErrorTypeId;
declare const FileWatcherError_base: import("@effect-ts/system/Case/index.js").CaseConstructorTagged<"FileWatcherError", "_tag">;
export declare class FileWatcherError extends FileWatcherError_base<{
    readonly origin: O.Option<unknown>;
}> {
    readonly [WatchErrorTypeId]: WatchErrorTypeId;
}
export declare function makeUnsafe(paths: readonly string[] | string, options?: Chokidar.WatchOptions): FileWatcher;
export declare function make(paths: readonly string[] | string, options?: Chokidar.WatchOptions): T.Effect<unknown, never, FileWatcher>;
export declare const makeAndSubscribe: (paths: readonly string[] | string, options?: Chokidar.WatchOptions) => S.Stream<unknown, never, E.Either<FileWatcherError, FileSystemEvent>>;
export declare function subscribe(self: FileWatcher): M.Managed<unknown, never, S.Stream<unknown, never, E.Either<FileWatcherError, FileSystemEvent>>>;
export declare function add_(self: FileWatcher, paths: readonly string[]): T.UIO<void>;
export declare function add(paths: readonly string[]): (self: FileWatcher) => T.UIO<void>;
export declare function remove_(self: FileWatcher, paths: readonly string[]): T.UIO<void>;
export declare function remove(paths: readonly string[]): (self: FileWatcher) => T.UIO<void>;
export declare function shutdown(self: FileWatcher): T.UIO<void>;
export {};
//# sourceMappingURL=fs-watcher.d.ts.map