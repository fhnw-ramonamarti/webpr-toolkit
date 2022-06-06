/**
 * @module functionTest offers tests for the function module
 */
// requires ./function.js

// imports
import {lambdaFun1, lambdaFun2, lambdaFun3, lambdaFun4, any, hasNoReturn, hasReturn} from "./function.js";

// IIFE notation
(function () {
    let x = true;
    writeln(x);
})();

// test x is not in scope
try {
    x;
    writeln(false)
} catch (e) {
    writeln(true)
}

// tests funcs
writeln(hasNoReturn(1) === undefined);
writeln(hasReturn(1) === 1);

// tests lambdas
writeln(lambdaFun1(1) === 1);
writeln(lambdaFun2(1, 1) === 2);
writeln(lambdaFun3(1)(1) === 2);
writeln(lambdaFun4(1)(1) === 2);
writeln(any(1)(1) === 2);

// write to document
function writeln(text) {
    const context = document.getElementById('display');
    context.innerHTML += text + '<br>';
}