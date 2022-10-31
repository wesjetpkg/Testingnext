import { Branded } from './effect/index.js';
export declare type AbsolutePosixFilePath = Branded.Branded<string, 'AbsolutePosixFilePath'>;
export declare const absolutePosixFilePath: (path_: string) => AbsolutePosixFilePath;
export declare type RelativePosixFilePath = Branded.Branded<string, 'RelativePosixFilePath'>;
export declare const relativePosixFilePath: (path_: string) => RelativePosixFilePath;
export declare const isPosixFilePathString: (path_: string) => boolean;
export declare const assertPosixFilePathString: (path_: string) => asserts path_ is AbsolutePosixFilePath | RelativePosixFilePath;
export declare const unknownToRelativePosixFilePath: (path_: string, cwd?: AbsolutePosixFilePath) => RelativePosixFilePath;
export declare const unknownToAbsolutePosixFilePath: (path_: string, cwd?: AbsolutePosixFilePath) => AbsolutePosixFilePath;
export declare type UnknownFilePath = Branded.Branded<string, 'UnknownFilePath'>;
export declare const unknownFilePath: (path_: string) => UnknownFilePath;
export declare function filePathJoin(...paths: RelativePosixFilePath[]): RelativePosixFilePath;
export declare function filePathJoin(...paths: [AbsolutePosixFilePath, ...string[]]): AbsolutePosixFilePath;
export declare function dirname(path_: RelativePosixFilePath): RelativePosixFilePath;
export declare function dirname(path_: AbsolutePosixFilePath): AbsolutePosixFilePath;
export declare function relative(from: AbsolutePosixFilePath, to: AbsolutePosixFilePath): RelativePosixFilePath;
export declare function relative(from: AbsolutePosixFilePath, to: string): RelativePosixFilePath;
//# sourceMappingURL=file-paths.d.ts.map