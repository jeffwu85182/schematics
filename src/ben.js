"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strUtility = require("./strings");
function clsNameWithTrimLast(name) {
    let newName = '';
    let fullNameArr = name.split('-');
    fullNameArr.pop();
    fullNameArr.forEach(v => {
        if (!newName) {
            newName = v;
        }
        else {
            newName = newName + '.' + v;
        }
    });
    return strUtility.classify(newName);
}
exports.clsNameWithTrimLast = clsNameWithTrimLast;
function dshNameWithTrimLast(name) {
    let newName = '';
    let fullNameArr = name.split('-');
    fullNameArr.pop();
    fullNameArr.forEach(v => {
        if (!newName) {
            newName = v;
        }
        else {
            newName = newName + '.' + v;
        }
    });
    return strUtility.dasherize(newName);
}
exports.dshNameWithTrimLast = dshNameWithTrimLast;
//# sourceMappingURL=ben.js.map