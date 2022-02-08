import { Parser } from "prettier";
export declare const parsers: {
    html: Parser<any>;
    vue: Parser<any>;
    angular: Parser<any>;
};
export declare const options: {
    [K in keyof PrettierPluginOrganizeAttributesParserOptions]: any;
};
export declare type PrettierPluginOrganizeAttributesParserOptions = {
    attributeGroups: string[];
    attributeSort: "ASC" | "DESC" | "NONE";
};
