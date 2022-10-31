export * from './pick.js';
export * from './omit.js';
declare type ValueOfRecord<R extends Record<any, any>> = R extends Record<any, infer V> ? V : never;
export declare const mapObjectValues: <O_In extends Record<any, any>, V_Out>(obj: O_In, mapValue: (key: keyof O_In, val: ValueOfRecord<O_In>) => V_Out) => { [K in keyof O_In]: V_Out; };
export declare const mergeDeep: <T extends Record<any, any>>(...objs: T[]) => T;
export declare type PartialDeep<T> = {
    [P in keyof T]?: T[P] extends Record<any, any> ? PartialDeep<T[P]> : T[P];
};
//# sourceMappingURL=index.d.ts.map