/**
 * @module lambda offers the main lambda expressions.
 */

// atoms
export const id = x => x;
export const constF = x => y => x;

// booleans
export const F = constF(id);
export const T = constF;

// elements
export const pair = x => y => f => f(x)(y);
export const fst = p => p(T);
export const snd = p => p(F);

// one of some elements
export const Left = x => f => g => f(x);
export const Right = x => f => g => g(x);
export const either = e => f => g => e(f)(g);
