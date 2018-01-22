"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// import { normalize } from '@angular-devkit/core';
const schematics_1 = require("@angular-devkit/schematics");
// import * as ts from 'typescript';
const stringUtils = require("../strings");
// import { addDeclarationToModule, addExportToModule } from '../utility/ast-utils';
// import { InsertChange } from '../utility/change';
// import { buildRelativePath, findModuleFromOptions } from '../utility/find-module';
const find_module_1 = require("../utility/find-module");
// function addDeclarationToNgModule(options: ComponentOptions): Rule {
//   return (host: Tree) => {
//     if (options.skipImport || !options.module) {
//       return host;
//     }
//     const modulePath = options.module;
//     const text = host.read(modulePath);
//     if (text === null) {
//       throw new SchematicsException(`File ${modulePath} does not exist.`);
//     }
//     const sourceText = text.toString('utf-8');
//     const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
//     const componentPath = `/${options.sourceDir}/${options.path}/`
//                           + (options.flat ? '' : stringUtils.dasherize(options.name) + '/')
//                           + stringUtils.dasherize(options.name);
//     const relativePath = buildRelativePath(modulePath, componentPath);
//     const classifiedName = stringUtils.classify(`${options.name}`);
//     const declarationChanges = addDeclarationToModule(source,
//                                                       modulePath,
//                                                       classifiedName,
//                                                       relativePath);
//     const declarationRecorder = host.beginUpdate(modulePath);
//     for (const change of declarationChanges) {
//       if (change instanceof InsertChange) {
//         declarationRecorder.insertLeft(change.pos, change.toAdd);
//       }
//     }
//     host.commitUpdate(declarationRecorder);
//     if (options.export) {
//       // Need to refresh the AST because we overwrote the file in the host.
//       const text = host.read(modulePath);
//       if (text === null) {
//         throw new SchematicsException(`File ${modulePath} does not exist.`);
//       }
//       const sourceText = text.toString('utf-8');
//       const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
//       const exportRecorder = host.beginUpdate(modulePath);
//       const exportChanges = addExportToModule(source, modulePath,
//                                               stringUtils.classify(`${options.name}`),
//                                               relativePath);
//       for (const change of exportChanges) {
//         if (change instanceof InsertChange) {
//           exportRecorder.insertLeft(change.pos, change.toAdd);
//         }
//       }
//       host.commitUpdate(exportRecorder);
//     }
//     return host;
//   };
// }
function buildSelector(options) {
    let selector = stringUtils.dasherize(options.name);
    if (options.prefix) {
        selector = `${options.prefix}-${selector}`;
    }
    return selector;
}
function default_1(options) {
    const sourceDir = options.sourceDir;
    if (!sourceDir) {
        throw new schematics_1.SchematicsException(`sourceDir option is required.`);
    }
    return (host, context) => {
        options.selector = options.selector || buildSelector(options);
        options.path = `app/features/${options.path ? options.path.split('/')[1] : ''}/`;
        options.module = find_module_1.findModuleFromOptions(host, options);
        const templateSource = schematics_1.apply(schematics_1.url('./files'), [
            options.spec ? schematics_1.noop() : schematics_1.filter(path => !path.endsWith('.spec.ts')),
            options.inlineStyle ? schematics_1.filter(path => !path.endsWith('.__styleext__')) : schematics_1.noop(),
            options.inlineTemplate ? schematics_1.filter(path => !path.endsWith('.html')) : schematics_1.noop(),
            schematics_1.template(Object.assign({}, stringUtils, { 'if-flat': (s) => options.flat ? '' : s }, options)),
            schematics_1.move(sourceDir),
        ]);
        return schematics_1.chain([
            schematics_1.branchAndMerge(schematics_1.chain([
                // addDeclarationToNgModule(options),
                schematics_1.mergeWith(templateSource),
            ])),
        ])(host, context);
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map