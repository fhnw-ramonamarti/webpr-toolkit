# WEBPR Toolkit

## Week 1 - Lesson

### General

Important: JS has no compiler!

### Functions

**Function**: Function is only a reference not an actual function and does not know the amount of wanted parameters\
\
**Parameter**: Variables in the definition of a function

```javascript
function foo(parameter1, parameter2) {
  /* code */
}
```

**Argument**: Variables inserted in a function when using it

```javascript
foo(argument1, argument2);
```

\
**Function calls**: Functions can be called with every amount of parameters. If there are too many arguments passed the first few are use if necessary. If there are less arguments passed the last few parameters with no value are undefined.

```javascript
function foo(param) {
  /* code */
}
foo(); // param is undefined
foo(arg); // param is arg
foo(arg1, arg2); // param is arg1 and arg2 is ignored
```

**Function return**: Functions need a return statement otherwise the return value is undefined

```javascript
function foo() {
  /* code without return value */
}
let var1 = foo(); // var1 is undefined

function foo() {
  /* code */
  return value;
}
let var2 = foo(); // var2 has a value
```

\
**Function as constant**: Function can be saved in variables as a definition or used function

```javascript
// definition new function
let func = function (param1, param2) {
  /* code */
};

// definition used function
let func2 = foo(arg1, arg2);

// usage of new function
func(arg1, arg2);

// usage of used function
func2;
```

**Override**: Same named functions/variables override each other even if the parameters are different. Naming can only reference one thing.

```javascript
// here is no foo defined
function foo() {
  /* code */
}
foo(); // here foo no parameter is called

function foo(param) {
  /* code */
}
foo(); // here foo one parameter is called

let foo = value;
foo(); // here foo as a constant is called with error is not a function
```

\
**Fat arrow style**: Alternative notation of a function, like java lambdas

```javascript
// definition
let foo = (param1, param2) => expression;
let foo2 = (param) => {
  /* code block */
};
```

**Curried style**: functions pass variables to other functions and one function can only have one parameter/ argument

```javascript
// definition
const foo = (parameter1) => (parameter2) => expression;

// usage
foo(argument1)(argument2);
```

### Divers

**Canvas**:

```html
<canvas id="canvas"></canvas>
```

```javascript
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.fillStyle = colorString;
context.fillRect(posX, posY, width, height);
```

\
**KeyEvents**:

```javascript
const spaceBar = 32;
const leftArrow = 37;
const upArrow = 38;
const rightArrow = 39;
const downArrow = 40;
window.onkeydown = (evt) => {
  /* code with keys */
};
```

\
**GameLoop**:

```javascript
setInterval(() => {
  /* repeated code */
}, 1000 / 5);
```

## Week 2 - Video

### Lambda Calculus

**Lambda syntax**:

```javascript
// definition
expression ::= variable     // identifier
  | expression expression   // application
  | λ variable . expression // abstraction
  | (expression)            // grouping

// abstraction
λ parameters . expression // lambda notation
parameters => expression // js notation
```

**Variables**: all immutable\
**Functions**: all unary => curry functions

```javascript
ƒab = f(a)(b)
(ƒa)b = (f(a))(b)
ƒ(ab) = f(a(b))
```

**Lambda rule**: tries to bind as much as possible to the right side

```javascript
λa.bx = a => b(x)
(λa.b)x = (a => b)(x)
λa.λb.x = λab.x = a => b => x
```

**β-reduction**: replace variables on the left side with expression form the right side. Start from the inside and go out

```javascript
((λa.a)λb.λc.b)(x)λe.ƒ
(λb.λc.b)(x)λe.ƒ
(λc.x)λe.ƒ
x // beta normal form
```

**Combinator**: lambda functions

- Idiot/ Identity: `I = x => x` with lambda `λa.a` for id
- Mockingbird: `M = f => f(f)` with lambda `λƒ.ƒƒ`
- Kestrel: `K = a => b => a` with lambda `λab.a` for `const`
- Kite: `KI = CK = a => b => b` with lambda `λab.b` for const id
- Cardinal: `C = f => a => b => f(b)(a)` with lambda `λƒab.ƒba` for flip

**Boolean operations**: lambda has no normal boolean

- TRUE: `T = K = λab.a` with javascript `a => b => a`
- FALSE: `F = KI = λab.b` with javascript `a => b => b`
- Negation: `NOT = C = λp.pFT` with javascript `!p = p => p(F)(T)`
- Conjunction: `AND = λpq.pqF` / `λpq.pqp` with javascript `p && q = p => q => p(q)(F)` / `p => q => p(q)(p)`
- Disjunction: `OR = λpq.pTq` / `λpq.ppq` with javascript `p || q = p => q => p(T)(q)` / `p => q => p(p)(q)`
- Exclusive or: `XOR = M = λpq.p(qTF)(qFT)` with javascript `p XOR q = p => q => p(qTF)(qFT)`
- Boolean equality: `BEQ = λpq.pq(NOT q)` with javascript `p == q = p => q => p(q)(!q)`

**Divers**: extension means input = output

---

## Week 2 - Lesson

### Tips and Tricks browser consol

**Locs in consol**: call method `inspect()` on a object
**Console outputs**: `console.__(message)`

- log: normal output
  - string concat with +: all one string output
  - parameter passing: split by '–' in output
- error ❗: Red error message, has filter
- warn ⚠: Yellow warning message, has filter
- info ℹ: (Blue) information, has filter
- debug: Find debugging outputs has filter
- dir: Directory output with more detail output
- table: Objects/ arrays shown in a table

\
**Array**: `array.__(value)`

- unshift: Add element on start of array (index 0)
- shift: Remove element on start of array (index 0)
- push: Add element on end of array (biggest index)
- pop: Remove element on end of array (biggest index)

### Variable and functions

**Scope**: Visibility area of initialized variables

- global: window or Browser (everywhere) from initialization on
- hoisted: Initialized at beginning of {...} even if variable called before
- locale: in {...} from the point the variable is initialized (function wide)

```javascript
x = 5; // global, mutable => not recommended
var x = 5; // hoisted, mutable => not recommended
let x = 5; // locale, mutable
const x = 5; // locale, immutable
```

**IIFE**: Immediately invoked function expression. Functions in definition direct called

```javascript
// split function definition and call
function foo() {...};
foo();

// named function definition with direct call
(function foo() {...})();

// unnamed function definition with direct call
(function() {...})();

// lambda definition with direct call
( () => {...})();
```

### Lambda calculus

**α (alpha)**: Rename parameter => translation

```javascript
const x => x;
// or
const y => y;
```

**β (beta)**: Apply argument => reduction, from left to right

```javascript
(
  (f) => (x) =>
    f(x)
)(id)(1)(
  // replace f on the left with id from first argument
  (x) => id(x)
)(1)(
  // replace x on the left with 1 from first (next) argument
  id(1)
)(
  // replace id with its definition
  (x) => x
)(1);
// replace x on the left with 1 from first argument
1;
```

**η (eta)**: Cancel parameter => reduction, from right to left

```javascript
(x) => (y) => plus(x)(y);
// remove y as most right parameter
(x) => plus(x);
// remove x as next right parameter
plus;
```

## Week 2 - Video

### Lambda Calculus II

**Combinator**: lambda functions

- Bluebird: `B = f => g => f(g(a)` with lambda `λƒga.ƒ(ga)` for composition
- Thrush: `Th = CI = a => f => f(a)` with lambda `λaƒ.ƒa`
- Vireo: `V = BCT = a => b => f => f(a)(b)` with lambda `λabƒ.ƒab`
- Blackbird: `Bl = BBB = f => g => a => b => f(g(a)(b))` with lambda `λƒgab.ƒ(gab)`

**Numbers**: defined als folds

- 0 / ZERO: `N0 = F = λƒa.a` with javascript `f => a => a`
- 1 / ONCE: `N1 = I = λƒa.ƒa` with javascript `f => a => f(a)`
- 2 / TWICE: `N2 = λƒa.ƒ(ƒa)` with javascript `f => a => f(f(a))`
- 3 / THRICE: `N3 = λƒa.ƒ(ƒ(ƒa))` with javascript `f => a => f(f(f(a)))`
- 4 / FOURFOLD: `N4 = λƒa.ƒ(ƒ(ƒ(ƒa)))` with javascript `f => a => f(f(f(f(a))))`
- 5 / FIVEFOLD: `N5 = λƒa.ƒ(ƒ(ƒ(ƒ(ƒa))))` with javascript `f => a => f(f(f(f(f(a)))))`
- 6 / SIXFOLD: `N6 = λƒa.ƒ(ƒ(ƒ(ƒ(ƒ(ƒa)))))` with javascript `f => a => f(f(f(f(f(f(a))))))`
- 7 / SEVENFOLD: `N7 = λƒa.ƒ(ƒ(ƒ(ƒ(ƒ(ƒ(ƒa))))))` with javascript `f => a => f(f(f(f(f(f(f(a)))))))`
- 8 / EIGHTFOLD: `N8 = λƒa.ƒ(ƒ(ƒ(ƒ(ƒ(ƒ(ƒ(ƒa)))))))` with javascript `f => a => f(f(f(f(f(f(f(f(a))))))))`
- 9 / NINEFOLD: `N9 = λƒa.ƒ(ƒ(ƒ(ƒ(ƒ(ƒ(ƒ(ƒ(ƒa))))))))` with javascript `f => a => f(f(f(f(f(f(f(f(f(a)))))))))`

**Operations**:

- Successor: `SUCC = λnƒa.ƒ(nƒa)` with javascript `n => f => a f(n(f)(a))` for '$number+1$' (`number++`)
- Addition: `ADD = λnk.n SUCC k` with javascript `n => k => n(SUCC(k))` for $n + k$
- Multiplication: `MULT = B = λnkƒ.n(kƒ)` with javascript `n => k => n(k(f))` for $n * k$
- Power: `POW = λnk.kn` with javascript `n => k => k(n)` for $n^k$
- Predecessor: `PRED = λn.FST(nΦ(PAIR N0 N0))` with javascript `n => FST(n(PHI)(PAIR(N0)(N0)))` for $number-1$ (`number--`)
- Subtraction: `SUB = λnk.k PRED n` with javascript `n => k => k(PRED)(n)` for $n - k$

**Equality functions**:

- Is 0: `IS0 = λn.n(KF)T` with javascript `n => n(K(F))(T)` for $n == 0$
- Less equal: `LEQ = λnk.IS0(SUB n k)` with javascript `n => k => IS0(SUB(n)(k))` for $n ≤ k$
- Equal: `EQ = λnk.AND((LEQ n k)(LEQ k n))` with javascript `n => k => IS0(SUB(n)(k))` for $n == k$
- Greater than: `GT = Bl NOT LEQ = λnk.NOT(LEQ n k)` with javascript `n => k => NOT(LEQ(n)(k))` for $n > k$

**Divers**:

- Pair: `PAIR = V = λabƒ.ƒab` with javascript `a => b => f => f(a)(b)`
- First: `FST = λp.pK` with javascript `p => p(K)`
- Second: `SND = λp.pKI` with javascript `n => p(KI)`
- Phi / Φ: `Φ = λp.V(SND p)(SUCC (SND p))` with javascript `p => PAIR(SND(p)(SUCC(SND(p))))`

---

## Week 3 - Lesson

### Tips and Tricks log level

**Log level**: Use to filter the logged outputs. Show all levels $≥ logLevel$

```javascript
// states of logging
const LEVEL_NONE = -1;
const LEVEL_ERROR = 0;
const LEVEL_WARN = 1;
const LEVEL_INFO = 2;
const LEVEL_LOG = 3;
const LEVEL_DEBUG = 4;

// current level
let logLevel = LEVEL_LOG;
```

long running ausgeführt vor filterung von log level
strict evaluation
verzögerung durch funktionsübergabe statt wert übergabe
auftuf in funktiontion selbst nach if prüfung log level

### Lambda

**Boolean**: expressed with functions and values

```javascript
// background
const id = (x) => x;
const konst = (x) => (y) => x;
const snd = (x) => (y) => y;

// basic booleans
const T = konst;
const F = snd;

// boolean shortcuts
const and = (p) => (q) => p(q)(p);
const or = (p) => (q) => p(p)(q);
const not = (p) => p(F)(T);
```

**Replication**: reduced expression results in original expression at the beginning
```javascript
// background 
const M = ƒ => ƒ(ƒ);
const Y = M(M);

// reduction of Y
Y = M(M)
// replace M
(ƒ => ƒ(ƒ)(ƒ => f(ƒ)))
// α transition - second () ƒ to g
(ƒ => ƒ(ƒ)(g => g(g)))
// β reduction - g(g) for all ƒ in first ()
(g => g(g)(g => g(g)))
// α transition - all g to ƒ
(ƒ => ƒ(ƒ)(ƒ => f(ƒ)))
```
**Datatype pair**: two-couple of values
```javascript
const pair = a => b => ƒ = f(a)(b);
const firstname = konst;
const lastname = snd;

const person = pair("John")("Smith");
name = pair(firstname) + " " + pair(lastname);
```




---

### quiz
