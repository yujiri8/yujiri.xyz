TITLE Javascript Review
NAV Review: Javascript
DESC Javascript is mostly a mess. It's full of traps and never just throws a big loud error when it should.

I know Javascript is a language a lot of people already agree is terrible, but now that I've got a substantial amount of experience with it myself, I think it'll be fun to write a language opinion article where I get to be more ranty. How Javascript And I Met isn't particularly interesting (I just chose to learn it because of its unique ability to run in a browser and because it was a bad thing not to have on my resume as a programmer), so I'll skip that.

Also, I'll stick to talking about Javascript itself, not the DOM APIs. I'll probably write separately about those someday.

---

## Modes of use

Like most interpreted languages, Javascript has a REPL (including for the server-side implementation in [Node](https://nodejs.org)), but it goes beyond that: due to the nature of browser devtools, it's an out-of-the-box feature to be able to use Javascript interactively while the page is running. Even [Python](https://yujiri.xyz/software/python)'s interactive mode doesn't do *that*. The Node REPL, for its part, features use of colors in some output, which is nice.

(Browser REPLs do too, but browser REPLs are *garbage* in other ways. Autoclosing braces trips me more often than it helps and the type correction features they foist on me are disgusting: when I'm typing a name it always opens a suggestion box that covers the rest of the command history if there's any name defined that starts with what I have, and it fucking rebinds the enter key to "accept suggestion" (not tab for some god-forsaken reason), so I get hoodwinked by that on a regular basis. Worst of all, typing out the full name of a suggestion doesn't make the box go away, so I have to press enter twice if I'm ending a statement with a defined name.)

## Type system

I've written at length about why [dynamic typing is a sin](https://yujiri.xyz/software/typing), and workarounds like [TypeScript](https://www.typescriptlang.org) can at best mitigate the destruction.

And Javascript's lack of type checking is actually way worse than even other dynamic languages. At least in others (Python etc), most things that should be compile-time errors are still run-time errors. But in Javascript they're often silent failures. For example, accessing a nonexistent slot of an array or object gives you `undefined`. Good luck debugging that.

But you can define one of the values to be `undefined` and it's now in there!
```javascript
arr = [undefined];
arr[0]; // undefined
arr[1]; // undefined
arr.length; // 1
```
Even a function parameter just gets `undefined` if it's not passed. All arguments are optional; you *can't* define a function that requires you to pass it a parameter. Let that sink in for a minute.

You also don't get an error when passing too many arguments to a function.
```javascript
function f(param) { console.log(param) };
f(1, 2, 3); // Just prints 1
```
And I found out the hard way that in browsers, `setTimeout` silently does nothing if you pass its arguments in the wrong order. That was how I lost most of a day of work.

### Arrays are objects?

Javascript arrays aren't really arrays, but objects. I don't just say this because `typeof [] === 'object'`, there are a lot of destructive ways in which the language doesn't seem to think of them as an actual sequence type. One is that you can assign past the end of an array and you just get "empty items" inbetween:
```javascript
arr = [];
arr[5] = 'x';
arr; // [<5 empty items>, 'x' ]
arr.length; // 6
delete(arr[5]);
arr; // [ <6 empty items> ]
arr.length; // 6
```
See what I mean? It's like you're just assigning keys in an object, and array indices don't have any special meaning (though they do print sensibly).

And those empty items *aren't the same as undefined* (if they were, that would imply a deeper difference between arrays and objects than Javascript seems to want to admit). Or they are, but they're not. Check this out:
```javascript
emptyArr = [];
arrEmpty = [,,,];
arrUndefined = [undefined, undefined, undefined];
console.log(emptyArr[0], arrEmpty[0], arrUndefined[0]); // undefined undefined undefined
console.log(emptyArr.length, arrEmpty.length, arrUndefined.length); // 0 3 3
emptyArr.map(i => console.log('found item:', i)); /// prints nothing
arrEmpty.map(i => console.log('found item:', i)); /// prints nothing
arrUndefined.map(i => console.log('found item:', i)); /* prints:
found item: undefined
found item: undefined
found item: undefined
*/
```
It's like the holy trinity of `undefined`!

This is because arrays have a `length` attribute that stores the number of elements they supposedly have. So when you assign to an index, it changes the length, and then when you look at the array all the slots inbetween that don't exist as keys in the array are presented as these "empty items". `delete` is meant for removing a key from an object, so when used on an array, it only deletes the key and doesn't collapse the others or modify the `length` attribute, so it just leaves an empty slot behind. What a terrible newb trap.

You also can't add arrays with `+`; the `.push` method is how you're supposed to add elements to the end, and `.concat` is for adding arrays. The main way to delete from an array is `.splice`, but there are a lot of others depending on the specifics. [This article](https://love2dev.com/blog/javascript-remove-from-array/) goes through a bunch of them.

For some reason, [.splice is also how you insert elements](https://stackoverflow.com/questions/586182/how-to-insert-an-item-into-an-array-at-a-specific-index-javascript). [The one method is basically a swiss army knife](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) instead of using different functions to accomplish different tasks.

### This type coercion is outrageous

A lot of people who rant about Javascript mention this. Let me just jump into the examples:
```javascript
// Strings and numbers
'q' - 'q'; // NaN
5 + '5'; // '55'
'5' * '2'; // 10
'5' - '2'; // 3
// Arrays
1 + [1]; // '11'
1 + [1, 2]; // '11,2'
1 - [1]; // 0
1 - [1, 2]; // NaN
[] + []; // ''
[] - []; // 0
[1, 2] - [3, 4]; // NaN
// Objects
{} + 0; // 0
{} + ''; // 0
{} - 0; // -0. No, I am not kidding. -0 can be assigned to a variable and it stays that way. On the bright side, it seems to be exactly the same as 0 for every purpose I can find.
{} + []; // 0
[] + {}; // '[object Object]'
{} - []; // -0
[] - {}; // NaN
{} + {}; // NaN
{} - {}; // NaN
{} / []; // SyntaxError: Invalid regular expression: missing /. ?!?!?!
```
I don't oppose all type coercion. For example, I support coercing between different numeric types. But this? Not only it is through the roof, it's wildly inconsistent, unintuitable, and most of the ones involving arrays and objects are completely indefensible nonsense. An operation that doesn't involve numbers should never come out as `NaN`; that's not what `NaN` means.

In general, things that are almost certainly mistakes should raise exceptions, not silently return a nonsensical value.

### `null` vs `undefined`

There are *two* primitive values that represent the lack of a value, and they're different:

1. For function parameters, passing `undefined` causes the parameter to get its default value. Passing `null` causes it to get `null`.

2. `undefined` doesn't come out in JSON; `null` comes out as `null`.

To be fair, there is some kind of logic here in retrospect: `undefined` is something unset; `null` more represents an intentionally lack of a value. But the distinction is still unnecessary and confusing.

And any Javascript extraordinaire is probably familiar with the baffling fact that `typeof null === 'object'`. This is, in fact, [a historical bug that became standardized to avoid breaking code that depended on the bug](https://2ality.com/2013/10/typeof-null.html).

### Objects can't compare for equality

`==` on objects (including arrays) compares for identity, not equality. If you want to test whether two objects are equal, you have to iterate over their keys.

In a language that has `==` and `===`, you would think `==` would compare by value for objects, and `===` would compare identity. But no, in the one case where the distinction would be actually helpful instead of a nefarious newb trap, they do the same thing.

### Object constructors for primitive types

```javascript
x = 5;
y = new Number(5);
x == y; // true
x === y; // false
typeof x; 'number'
typeof y; 'object'
```
As far as I know, there's literally no point to the existence of these; maybe it's just a consequence of how constructors work in Javascript.

Also, this isn't a likely thing to trip over, but it's just infuriating:
```javascript
val = new Boolean(false);
!!val; // true
```
Because objects are always true.

## Error handling

Javascipt uses exceptions like other dynamic languages, but it's lacking over Python and Ruby in that it doesn't support catching only specific types of exceptions. `catch` always catches everything and you have to manually check and reraise if you only wanted to catch some kinds. And like the others, [it catches name errors](https://yujiri.xyz/software/catch_name_errors). Ugh.

It does give good stack traces, and has the finally statement.

## Syntax

Javascript has the C syntax as far as semicolons, braces, and parentheses around conditions. I talked about this a lot in my review of Python, but Javascript does worse than just having this boilerplate: [semicolons will usually be automatically inserted by the interpreter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Automatic_semicolon_insertion), so *often* you don't need them, but if you lean on that fact, sometimes semicolons will be inserted incorrectly and break your code in bizarre ways. And you can't even say "Just don't lean on the feature", because the nature of the feature precludes that. Everyone forgets semicolons sometimes in semicolon languages.

### Lack of syntactic support for arrays

Perhaps because of the way Javascript treats arrays as objects, it supports neither negative indices nor slicing. Just compare the readability difference:
```javascript
arr[-5];
arr[arr.length - 5]; // And imagine if arr was longer

arr[1:3];
arr.slice(1, 3);
```

### Variable declarations are a mess

Assigning to an undefined variable in Javascript by default creates a *global* variable, if you don't use `'use strict';` at the top of the file. Besides this unfortunate fact, there are *three* different keywords for declaring variables that all have subtle differences:

* `var` - creates a function-local variable. That's all it does.

* `let` - two differences from `var`. It's *block-scoped* instead of function-scoped, and it doesn't allow redeclaring the variable with `let` later.

* `const` - like `let`, but makes the variable immutable.

What an elegant and straightforward system!

### Iteration

Javascript has three different for loop constructs: the C-style `for (let i = 0; i < items.length; i++) {`, `for (let i in items) {`, and `for (let i of items) {`. What are the differences? Can we maybe use these two latter constructions to elide the antiquated C bullshit?

Well, no. `for`..`in` is for iterating on the keys of an object... but objects in Javascript have string keys. And do you know what that means happens when you try to use this on an Array?
```javascript
nums = [5, 16, -3];
for (let i in nums) {
    console.log(i + 1);
}
/* Prints
01
11
21
*/
```
Because arrays are technically objects and so their keys as given by `for`..`in` are of course the *string* indices. This works for some use cases, but if you try to add to the index counter, it'll break your code in bizarre ways.

`for`..`of`, on the other hand, *only* gives you the values. Not the keys. And of course there's no easy way to get the key from the value; there's nothing equivalent to Python's `enumerate`, as far as I know. There's also no `range`. So, we still sometimes need antiquated C bullshit to iterate in Javascript.

While I'm on the topic of iteration, I find it interesting that in ES6 Javascript picked up [an iterator/generator interface](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators) like Python's. No generator expressions or comprehensions, though.

### Object syntax

Javascript's syntax for objects is much nicer than other languages. Literals don't usually need quotes around keys (`{id: 5, name: 'Bob'}`), and they support bracket syntax to evaluate an expression as a key (`property = 'name'; obj[property]` is like `obj.name`). And then there there are super convenient things like [object spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).

### Template strings

I'll be honest, I was pretty skeptical of [template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) when I first found out. I thought it was adding new syntax to the language [for no good reason](https://yujiri.xyz/software/features). But after working with web components via Lit-Element I've learned to appreciate it; it's really great when so much logic is embedded in the component's render template. Javascript's template strings are more powerful than Python's f-strings because they can embed loops.

### Arrow functions

Most dynamic languages have `map`, `filter`, `reduce`, and lambdas, but I think Javascript leads the others (or at least Python) in the functional programming department with [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions). I use them every day; I can't describe how much nicer they are than using the `function` keyword. And the syntax is intuitive, too; it *looks* like you're taking the parameter list and doing something with it. Python has lambdas and in-function `def`, but lambdas are limited to just a `return` statement and `def` doesn't handle scoping the same way arrow functions do ([this article on Pylint](https://pythonspeed.com/articles/pylint/) shows an example of the difference where you would want the arrow function behavior).

## Concurrency

As Javascript was born in the single-threaded, event-driven environment of the browser, its concurrency features revolve around IO rather than parallel processing. Node, however, does support using [OS threads](https://blog.logrocket.com/a-complete-guide-to-threads-in-node-js-4fa3898fe74f/) to do actual parallelism, so that's cool, even if it can't be done nearly as cleanly as async/await. I haven't really used the threading so I can't comment much more on it.

## Stdlib and ecosystem

The JS stdlib is missing a lot of standard fare. No titlecase. No randint. No strftime and strptime. No regex escape! The community [made a package on NPM for it](https://www.npmjs.com/package/escape-string-regexp) even though it's only a few lines, because people kept [hand-rolling it and getting it wrong](https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript).

Oh, wait, there are [at least](https://www.npmjs.com/package/regex-escape) [three](https://www.npmjs.com/package/escape-regex-string) [others](https://www.npmjs.com/package/escape-regex). I guess the community didn't actually succeed in standardizing. This is why I say language designers underrate putting things in the stdlib.

A problem that seems to plague the NPM ecosystem is overdependency. Everything has a huge amount of dependencies. You can barely install anything without populating your `node_modules` with at least a hundred directories.

A lot of the dependencies are nonsense packages, which provide a single function of often just *one* line (and not even ones that are tricky like the regex escape). [This article](https://medium.com/commitlog/the-internet-is-at-the-mercy-of-a-handful-of-people-73fac4bc5068) is a good read on the situation.

Ecosystems of other languages don't have this problem. Even [Django](https://yujiri.xyz/software/django), the giant all-the-features Python web framework, has only *3* dependencies, including indirect.

### Filesystem imports

Javascript is one of few languages that allows arbitrary filesystem path imports. In Node for example I can do `util = require('../util.js')`. This is nice. Imports are usually much less flexible than that in other languages.

---

<br>

I guess I should write some kind of conclusion. The conclusion is that Javascript is bad and you should feel bad. I think it's a tragedy that server-side Javascript ever became a thing and it should become not a thing, because the place where you have no choice but to use Javascript is the only place where it makes sense to Javascript. Other dynamic languages, like Python, Ruby, and Julia, are hands-down superior to Javascript if you can choose either.

Javascript has gotten quite a lot better in recent years with the addition of async/await, modules, and great features like arrow functions. I feel terrible for people who had to use it on the server before all that. But even *with* those things, it seems to be asymptotically catching up at best; the few things Javascript does *better* than other dynamic languages are small deals while the downsides are huge; and many are systemic problems that can't be fixed because of compatibility requirements.

I want to say that I don't think Javascript's flaws are primarily blameable on the designers being dumb. It's a harder job than making most languages, since they have much less ability to fix things - the fundamental problem is that the people writing the code don't control what interpreter and version is used to run it. But whatever the causes, the flaws are there, and we should avoid using Javascript where better alternatives are readily available.
