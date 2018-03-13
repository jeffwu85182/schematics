import * as strUtility from './strings'
export function clsNameWithTrimLast(name: string): string {
    let newName = '';
    let fullNameArr = name.split('-');
    fullNameArr.pop();
    fullNameArr.forEach(v => {
        if (!newName) {
            newName = v;
        } else {
            newName = newName + "-" + v;
        }
    });
    return strUtility.classify(newName);
}
export function dshNameWithTrimLast(name: string): string {
    let newName = '';
    let fullNameArr = name.split('-');
    fullNameArr.pop();
    fullNameArr.forEach(v => {
        if (!newName) {
            newName = v;
        } else {
            newName = newName + '-' + v;
        }
    });
    return strUtility.dasherize(newName);
}
