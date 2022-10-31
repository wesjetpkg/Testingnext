import * as T from '@effect-ts/core/Effect';
import * as S from '@effect-ts/core/Effect/Experimental/Stream';
import * as E from '@effect-ts/core/Either';
export * from '@effect-ts/core/Effect/Experimental/Stream';
export declare const streamTapSkipFirst: <R1, E1, O, X>(f: (o: O) => T.Effect<R1, E1, X>) => <R, E>(stream: S.Stream<R, E, O>) => S.Stream<R & R1, E1 | E, O>;
/** Note this function doesn't currently work if the first value is a `E.left` value */
export declare const tapSkipFirstRight: <R1, R2, E1, EE1, E2, A1>(f: (o: A1) => T.Effect<R2, E2, any>) => (stream: S.Stream<R1, E1, E.Either<EE1, A1>>) => S.Stream<R1 & R2, E1 | E2, E.Either<EE1, A1>>;
export declare const tapRight: <R1, R2, E1, EE1, A1>(f: (o: A1) => T.Effect<R2, never, unknown>) => (stream: S.Stream<R1, E1, E.Either<EE1, A1>>) => S.Stream<R1 & R2, E1, E.Either<EE1, A1>>;
export declare const tapLeft: <R1, R2, E1, EE1, A1>(f: (e: EE1) => T.Effect<R2, never, unknown>) => (stream: S.Stream<R1, E1, E.Either<EE1, A1>>) => S.Stream<R1 & R2, E1, E.Either<EE1, A1>>;
export declare const tapRightEither: <R1, R2, E1, EE1, EE2, A1>(f: (o: A1) => T.Effect<R2, never, E.Either<EE2, unknown>>) => (stream: S.Stream<R1, E1, E.Either<EE1, A1>>) => S.Stream<R1 & R2, E1, E.Either<EE1 | EE2, A1>>;
export declare const startWith: <A2>(...values: A2[]) => <R1, E1, A1>(stream: S.Stream<R1, E1, A1>) => S.Stream<R1, E1, A2 | A1>;
export declare const startWithRight: <A2>(value: A2) => <R1, E1, A1>(stream: S.Stream<R1, never, E.Either<E1, A1>>) => S.Stream<R1, never, E.Either<E1, A2 | A1>>;
export declare const chainMapEitherRight: <R2, E2, EE2, A2, A1>(mapRight: (a1: A1) => S.Stream<R2, E2, E.Either<EE2, A2>>) => <R1, E1, EE1>(stream: S.Stream<R1, E1, E.Either<EE1, A1>>) => S.Stream<R1 & R2, E2 | E1, E.Either<EE2 | EE1, A2>>;
export declare const chainSwitchMapEitherRight: <R2, E2, EE2, A2, A1>(mapRight: (a1: A1) => S.Stream<R2, E2, E.Either<EE2, A2>>) => <R1, E1, EE1>(stream: S.Stream<R1, E1, E.Either<EE1, A1>>) => S.Stream<R1 & R2, E2 | E1, E.Either<EE2 | EE1, A2>>;
export declare const mapEffectEitherRight: <R2, E2, A2, A1>(mapRight: (a1: A1) => T.Effect<R2, never, E.Either<E2, A2>>) => <R1, E1>(stream: S.Stream<R1, never, E.Either<E1, A1>>) => S.Stream<R1 & R2, never, E.Either<E2 | E1, A2>>;
export declare const mapEitherLeft: <EE2, EE1>(mapLeft: (e1: EE1) => EE2) => <R1, E1, A1>(stream: S.Stream<R1, E1, E.Either<EE1, A1>>) => S.Stream<R1, E1, E.Either<EE2, A1>>;
export declare const mapEitherRight: <A2, A1>(mapRight: (a1: A1) => A2) => <R1, E1, EE1>(stream: S.Stream<R1, E1, E.Either<EE1, A1>>) => S.Stream<R1, E1, E.Either<EE1, A2>>;
//# sourceMappingURL=Stream.d.ts.map