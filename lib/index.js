"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.parsers = void 0;
const parser_html_1 = require("prettier/parser-html");
const organize_1 = require("./organize");
const presets_1 = require("./presets");
exports.parsers = {
    html: wrapParser(parser_html_1.parsers.html),
    vue: wrapParser(parser_html_1.parsers.vue),
    angular: wrapParser(parser_html_1.parsers.angular),
};
exports.options = {
    attributeGroups: {
        type: "string",
        category: "Global",
        array: true,
        description: "Provide an order to organize HTML attributes into groups.",
        default: [{ value: [] }],
    },
    attributeSort: {
        type: "string",
        category: "Global",
        description: "attributeSort HTML attribute grousp internally. ASC, DESC or NONE.",
    },
};
function wrapParser(parser) {
    return Object.assign(Object.assign({}, parser), { parse: transformPostParse(parser.parse) });
}
function transformPostParse(parse) {
    return (text, parsers, options) => transformRootNode(parse(text, parsers, options), options);
}
function transformRootNode(node, options) {
    const sort = options.attributeSort === "NONE" ? false : options.attributeSort;
    const groups = [...options.attributeGroups];
    if (groups.length === 0) {
        switch (options.parser.toString().toLowerCase()) {
            case "angular":
                groups.push(presets_1.PRESET_KEYS.$ANGULAR);
                break;
            case "vue":
                groups.push(presets_1.PRESET_KEYS.$VUE);
                break;
            case "html":
            default:
                groups.push(presets_1.PRESET_KEYS.$HTML);
        }
    }
    transformNode(node, groups, sort);
    return node;
}
function transformNode(node, groups, sort) {
    var _a;
    if (node.attrs) {
        node.attrs = organize_1.miniorganize(node.attrs, {
            ignoreCase: true,
            presets: presets_1.PRESETS,
            groups,
            sort,
            map: ({ name }) => name,
        }).flat;
    }
    (_a = node.children) === null || _a === void 0 ? void 0 : _a.forEach((child) => transformNode(child, groups, sort));
}
//# sourceMappingURL=index.js.map