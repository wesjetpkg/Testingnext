import type { HasCwd } from '@contentlayer/core';
import * as core from '@contentlayer/core';
import type { HasClock, HasConsole, OT } from '@contentlayer/utils/effect';
import { T } from '@contentlayer/utils/effect';
import { fs } from '@contentlayer/utils/node';
import { Command } from 'clipanion';
export declare abstract class BaseCommand extends Command {
    configPath: string | undefined;
    clearCache: boolean;
    verbose: boolean;
    abstract executeSafe: () => T.Effect<OT.HasTracer & HasClock & HasCwd & HasConsole, unknown, void>;
    execute: () => Promise<void>;
    clearCacheIfNeeded: () => T.Effect<import("@effect-ts/system/Has").Has<core.Cwd> & OT.HasTracer & import("@effect-ts/system/Has").Has<import("@contentlayer/utils/effect/ConsoleService").ConsoleService>, fs.RmError, void>;
}
//# sourceMappingURL=_BaseCommand.d.ts.map