"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* @license
* Copyright Google Inc. All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const ts = require("typescript");
const stringUtils = require("../strings");
const ast_utils_1 = require("../utility/ast-utils");
const change_1 = require("../utility/change");
const find_module_1 = require("../utility/find-module");
function addDeclarationToNgModule(options) {
    return (host) => {
        if (!options.module) {
            return host;
        }
        const modulePath = core_1.normalize('/' + options.module);
        const text = host.read(modulePath);
        if (text === null) {
            throw new schematics_1.SchematicsException(`File ${modulePath} does not exist.`);
        }
        const sourceText = text.toString('utf-8');
        const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
        const importModulePath = core_1.normalize(`/${options.sourceDir}/${options.path}/`
            + (options.flat ? '' : stringUtils.dasherize(options.name) + '/')
            + stringUtils.dasherize(options.name)
            + '.module');
        const relativeDir = core_1.relative(core_1.dirname(modulePath), core_1.dirname(importModulePath));
        const relativePath = (relativeDir.startsWith('.') ? relativeDir : './' + relativeDir)
            + '/' + core_1.basename(importModulePath);
        const changes = ast_utils_1.addImportToModule(source, modulePath, stringUtils.classify(`${options.name}Module`), relativePath);
        const recorder = host.beginUpdate(modulePath);
        for (const change of changes) {
            if (change instanceof change_1.InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(recorder);
        return host;
    };
}
function default_1(options) {
    // options.path = `src/app/features${options.path ? normalize(options.path) : options.path}`;
    options.path = `app/features/`;
    const sourceDir = options.sourceDir;
    if (!sourceDir) {
        throw new schematics_1.SchematicsException(`sourceDir option is required.`);
    }
    return (host, context) => {
        if (options.module) {
            options.module = find_module_1.findModuleFromOptions(host, options);
        }
        const templateSource = schematics_1.apply(schematics_1.url('./files'), [
            options.spec ? schematics_1.noop() : schematics_1.filter(path => !path.endsWith('.spec.ts')),
            schematics_1.template(Object.assign({}, stringUtils, { 'if-flat': (s) => options.flat ? '' : s }, options)),
            schematics_1.move(sourceDir),
        ]);
        return schematics_1.chain([
            schematics_1.branchAndMerge(schematics_1.chain([
                addDeclarationToNgModule(options),
                schematics_1.mergeWith(templateSource),
            ])),
        ])(host, context);
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map