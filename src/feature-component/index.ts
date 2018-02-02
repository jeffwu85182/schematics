/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// import { normalize } from '@angular-devkit/core';
import * as ts from 'typescript';
import { buildRelativePath } from '../utility/find-module';
import { InsertChange } from '../utility/change';
import { addDeclarationToModule, addExportToModule } from '../utility/ast-utils';
import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
  apply,
  branchAndMerge,
  chain,
  filter,
  mergeWith,
  move,
  noop,
  template,
  url
} from '@angular-devkit/schematics';
import * as stringUtils from '../strings';
import { findModuleFromOptions } from '../utility/find-module';
import { Schema as ComponentOptions } from './schema';

function addDeclarationToNgModule(options: ComponentOptions): Rule {
  return (host: Tree) => {
    if (options.skipImport || !options.module) {
      return host;
    }

    const modulePath = options.module;
    const text = host.read(modulePath);
    if (text === null) {
      throw new SchematicsException(`File ${modulePath} does not exist.`);
    }
    const sourceText = text.toString('utf-8');
    const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);

    const componentPath = `/${options.sourceDir}/${options.path}/`
                          + ''
                          + stringUtils.dasherize(options.name);
    const relativePath = buildRelativePath(modulePath, componentPath);
    const classifiedName = stringUtils.classify(`${options.name}`);
    const declarationChanges = addDeclarationToModule(source,
                                                      modulePath,
                                                      classifiedName,
                                                      relativePath);

    const declarationRecorder = host.beginUpdate(modulePath);
    for (const change of declarationChanges) {
      if (change instanceof InsertChange) {
        declarationRecorder.insertLeft(change.pos, change.toAdd);
      }
    }
    host.commitUpdate(declarationRecorder);

    if (options.export) {
      // Need to refresh the AST because we overwrote the file in the host.
      const text = host.read(modulePath);
      if (text === null) {
        throw new SchematicsException(`File ${modulePath} does not exist.`);
      }
      const sourceText = text.toString('utf-8');
      const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);

      const exportRecorder = host.beginUpdate(modulePath);
      const exportChanges = addExportToModule(source, modulePath,
                                              stringUtils.classify(`${options.name}`),
                                              relativePath);

      for (const change of exportChanges) {
        if (change instanceof InsertChange) {
          exportRecorder.insertLeft(change.pos, change.toAdd);
        }
      }
      host.commitUpdate(exportRecorder);
    }


    return host;
  };
}

function buildSelector(options: ComponentOptions) {
  let selector = stringUtils.dasherize(options.name);
  if (options.prefix) {
    selector = `${options.prefix}-${selector}`;
  }

  return selector;
}

export default function(options: ComponentOptions): Rule {
  const sourceDir = options.sourceDir;
  if (!sourceDir) {
    throw new SchematicsException(`sourceDir option is required.`);
  }

  return (host: Tree, context: SchematicContext) => {
    options.selector = options.selector || buildSelector(options);
    let componentName = '';
    let componentFullName = options.name.split('-');
    componentFullName.pop();
    componentFullName.forEach(v => {
      if (!componentName) {
          componentName = v;
      } else {
      componentName = componentName + '-' + v;
      }
  });
    console.log(`componentName is ${componentName}`);
    options.path = `app/features/${componentName}/`;
    options.module = findModuleFromOptions(host, options);

    const templateSource = apply(url('./files'), [
      options.spec ? noop() : filter(path => !path.endsWith('.spec.ts')),
      options.inlineStyle
        ? filter(path => !path.endsWith('.__styleext__'))
        : noop(),
      options.inlineTemplate ? filter(path => !path.endsWith('.html')) : noop(),
      template({
        ...stringUtils,
        'if-flat': () => '',
        ...options
      }),
      move(sourceDir)
    ]);

    return chain([
      branchAndMerge(
        chain([
          addDeclarationToNgModule(options),
          mergeWith(templateSource)
        ])
      )
    ])(host, context);
  };
}
