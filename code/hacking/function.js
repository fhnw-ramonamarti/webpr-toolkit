/**
 * @module function offers simple functions of no use
 */

/**
 * Function without a return
 */
export function hasNoReturn(s) {
    s
}

/**
 * Function with a return of the parameter
 */
export function hasReturn(s) {
    return s;
}

/**
 * Function with a return of a function
 */
export function any(x) {
    return function (y) {
        return x + y;
    }
}

// Function versions
export const lambdaFun1 = s => s;
export const lambdaFun2 = (x, y) => x + y;
export const lambdaFun3 = x => y => x + y;
export const lambdaFun4 = x => y => {
    return x + y;
};