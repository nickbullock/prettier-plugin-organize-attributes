export declare const DEFAULT_GROUP = "$DEFAULT";
export declare type GroupQuery = string | RegExp;
export declare type GroupKey<TPresets extends Presets> = keyof TPresets | string | typeof DEFAULT_GROUP;
export declare type Presets = Record<string, GroupQuery | GroupQuery[]>;
export declare type OrganizedGroup<TValue> = {
    values: TValue[];
    query: GroupQuery;
};
export declare type OrganizedResult<TValue> = {
    groups: OrganizedGroup<TValue>[];
    flat: TValue[];
};
export interface BaseOrganizeOptions<TPresets extends Presets> {
    presets?: TPresets;
    groups: GroupKey<TPresets>[];
    sort?: OrganizeOptionsSort;
    ignoreCase?: boolean;
}
export declare type OrganizeOptionsSort = "ASC" | "DESC" | boolean;
export interface MapOrganizeOptions<TPresets extends Presets, TValue> extends BaseOrganizeOptions<TPresets> {
    map: (value: TValue) => string;
}
export declare type OrganizeOptions<TPresets extends Presets, TValue> = BaseOrganizeOptions<TPresets> | MapOrganizeOptions<TPresets, TValue>;
export declare function miniorganize<TPresets extends Presets>(values: string[], options: BaseOrganizeOptions<TPresets>): OrganizedResult<string>;
export declare function miniorganize<TPresets extends Presets, TValue>(values: TValue[], options: MapOrganizeOptions<TPresets, TValue>): OrganizedResult<TValue>;
