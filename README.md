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

**Lambda**: tries to bind as much as possible to the right side

```javascript
λ parameters . expression // lambda notation
parameters => expression // js notation
```

**Default functions**:

- Idiot/ Identity: `I = x => x` with lambda `λa.a` for id
- Mockingbird: `M = f => f(f)` with lambda `λƒ.ƒƒ`
- Kestrel: `K = a => b => a` with lambda `λab.a` for `const`
- Kite: `KI = CK = a => b => b` with lambda `λab.b` for const id
- Cardinal: `C = f => a => b => f(b)(a)` with lambda `λƒab.ƒba` for flip
- Bluebird: `B = f => g => f(g(a)` with lambda `λƒga.ƒ(ga)`
- Thrush: `Th = CI = a => f => f(a)` with lambda `λaƒ.ƒa`
- Vireo: `V = BCT = a => b => f => f(a)(b)` with lambda `λabƒ.ƒab`
- Blackbird: `Bl = BBB = f => g => a => b => f(g(a)(b))` with lambda `λƒgab.ƒ(gab)`


## Week 2 - Lesson

---
---

### notes

inspect ausgabe für consol log aufruf
console.
-log
-error
-info
-warn
-dir für direcotry ausführlicher
-table als tabelle
-debug

array unshift
iife imidetly invoced fucntion expressein
(func def) = func expr
