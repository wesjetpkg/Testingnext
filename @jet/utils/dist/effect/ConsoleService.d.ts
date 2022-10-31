import * as T from '@effect-ts/core/Effect';
import * as L from '@effect-ts/core/Effect/Layer';
import type { Has } from '@effect-ts/core/Has';
import type { _A } from '@effect-ts/core/Utils';
export declare const makeLiveConsole: T.UIO<{
    log: (...msg: any[]) => T.UIO<void>;
}>;
export interface ConsoleService extends _A<typeof makeLiveConsole> {
}
export declare const ConsoleService: import("@effect-ts/system/Has").Tag<ConsoleService>;
export declare const LiveConsole: L.Layer<unknown, never, Has<ConsoleService>>;
export declare const provideConsole: <R1, E1, A1>(self: T.Effect<R1 & Has<ConsoleService>, E1, A1>) => T.Effect<R1, E1, A1>;
export declare const log: (...args: any[]) => T.Effect<Has<ConsoleService>, never, void>;
export declare const provideTestConsole: (messages: any[]) => <R1, E1, A1>(ma: T.Effect<R1 & Has<ConsoleService>, E1, A1>) => T.Effect<R1, E1, A1>;
export declare type HasConsole = Has<ConsoleService>;
//# sourceMappingURL=ConsoleService.d.ts.map