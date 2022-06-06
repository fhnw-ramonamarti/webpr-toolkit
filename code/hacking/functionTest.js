/**
 * @module functionTest offers tests for the function module
 */
// requires ./function.js

// imports
import { lambdaFun1, lambdaFun2, lambdaFun3, lambdaFun4, any, hasNoReturn, hasReturn } from "./function.js";

// IIFE notation
(function () {
    let x = true;
    document.writeln(x);
})();

// test x is not in scope
try {
    x;
    document.writeln(false)
} catch (e) {
    document.writeln(true)
}

// tests funcs
document.writeln(hasNoReturn(1) === undefined);
document.writeln(hasReturn(1) === 1);

// tests lambdas
document.writeln(lambdaFun1(1) === 1);
document.writeln(lambdaFun2(1, 1) === 2);
document.writeln(lambdaFun3(1)(1) === 2);
document.writeln(lambdaFun4(1)(1) === 2);
document.writeln(any(1)(1) === 2);