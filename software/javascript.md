TITLE Javascript Review
NAV Review: Javascript
TEMPLATE DEFAULT
DESC Javascript is mostly a mess. It's full of traps and never just throws a big loud error when it should.

I know Javascript is a language a lot of people already agree is terrible, but now that I've got a substantial amount of experience with it myself, I think it'll be fun to write a language opinion article where I get to be more ranty. Of course, in keeping with my tradition, I'll have to open with the good things first. How Javascript And I Met isn't particularly interesting (I just chose to learn it because of its unique ability to run in a browser and because it was a bad thing not to have on my resume as a programmer), so I'll skip that.

Also, I'll stick to talking about Javascript itself, not the DOM APIs. I'll probably write separately about those someday.

<h1 class="good">Interactive</h1>

Well, at least you've got the interactive use. Any browser's devtools allow running JS interactively, and the [Node.js](https://nodejs.org/en) command-line tool also has an interactive prompt. This is really nice, I'll admit.

The type correction features most browsers' devtools I've seen foist on you are disgusting. When I'm typing a name it always opens a suggestion box that covers the rest of the command history if there's any name defined that starts with what I have, and it fucking rebinds the enter key to "accept suggestion" (not tab for some god-forsaken reason), so I get hoodwinked by that on a regular basis. Worst of all, typing out the full name of a suggestion doesn't make the box go away, so I have to press enter twice if I'm ending a statement with a defined name.

But the in-browser command-line experience has some compensatory advantages. Due to the nature of browser devtools, it's an out-of-the-box feature to be able to use it interactively while the page is running. That's pretty useful.

<h1 class="good">I actually love how it handles objects.</h1>

Javascript objects are dictionaries. They're just mappings of string keys to values.

I sincerely think that if you don't have any type safety whatsoever in your language and objects are going to be totally mutable, you should not distinguish between objects and dicts, because that loses all the meaningful differences.

<h2 class="good">Good functional programming features</h2>

Most dynamic languages have `map`, `filter`, `reduce`, and lambdas, but I think Javascript one-ups Python here with [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions). I use them every day; I can't describe how much nicer I find them than using the `function` keyword. And the syntax is intuitive, too; it *looks* like you're taking the parameter list and doing something with it. Python has lambdas and in-function `def`, but lambdas are limited to just a `return` statement and `def` doesn't handle scoping the same way arrow functions do ([this article on Pylint](https://pythonspeed.com/articles/pylint/) shows an example of the difference where you would want the arrow function behavior).

There are other functional programming features in Javascript, like <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind"><code>.bind</code></a>, <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call"><code>.call</code></a>, and <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply"><code>.apply</code></a>, but those are niche compared to arrow functions.

<h3 class="good">Template strings are pretty useful</h3>

I'll be honest, I was pretty skeptical of [this feature](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) when I first found out. I thought it was adding a new syntactic construction to the language for no good reason. But after working with web components via Lit-Element I've learned to appreciate it; it really does help readability when so much logic is embedded in the component's render template.

<h1 class="bad">No type checking</h1>

A repeated point from [my Python review](python), the flipside of being interactive. This wastes enormous amounts of my time on debugging.

"Just use [TypeScript](https://www.typescriptlang.org)! Problem solved!"

No, problem not solved. Using TypeScript adds third-party dependencies, complicates my build process further, and requires a time investment to learn it. I'm not saying TypeScript isn't good or helpful (I haven't used it), but as a tool separate from the language itself, it shouldn't be used to defend the flaws of Javascript.

Also, Javascript makes things far worse than Python here...

<h1 class="bad">Silence</h1>

At least in Python, most things that should be compile-time errors are still run-time errors. But in Javascript they're often silent failures. Accessing a nonexistent slot of an array or object gives you `undefined`.

But you can define one of the values to be `undefined` and it's now in there!
```
arr = [undefined];
arr[0]; // undefined
arr[1]; // undefined
arr.length; // 1
```
Even a function parameter just gets `undefined` if it's not passed. All arguments are optional; you *can't* define a function that requires you to pass it a parameter. Let that sink in for a minute.

You also don't get an error when passing too many arguments to a function.
```
function f(param) { console.log(param) };
f(1, 2, 3); // Just prints 1
```

I found out the hard way that `setTimeout` silently does nothing if you pass its arguments in the wrong order. That was how I lost most of a day of work.

<h1 class="bad">Arrays aren't really arrays</h1>

This took me a while to understand, but arrays are really just a type of object. (No wonder you can't add arrays in the way you'd expect...) This has many bad corellaries. One is that you can assign past the end of an array and you just get "empty items" inbetween;
```
arr = [];
arr[5] = 'x';
arr; // [<5 empty items>, 'x' ]
arr.length; // 6
delete(arr[5]);
arr; // [ <6 empty items> ]
arr.length; // 6
```
And note that those empty items *aren't the same as undefined*. Or they are, but they're not. Check this out:
```
emptyArr = [];
arrEmpty = [,,,];
arrUndefined = [undefined, undefined, undefined];
console.log(emptyArr[0], arrEmpty[0], arrUndefined[0]); // undefined undefined undefined
console.log(emptyArr.length, arrEmpty.length, arrUndefined.length); // 0 3 3
emptyArr.map(i => console.log('found item:', i)); /// []
arrEmpty.map(i => console.log('found item:', i)); /// [ <3 empty items> ]
emptyArr.map(i => console.log('found item:', i)); /* prints:
found item: undefined
found item: undefined
found item: undefined
*/
```
It's like the holy trinity of `undefined`!

This is because arrays have a `length` attribute that stores the number of elements they supposedly have. So when you assign to an index, it changes the length, and then when you look at the array all the slots inbetween that don't exist as keys in the array are presented as these "empty items". `delete` is meant for removing a key from an object, so when used on an array, it only deletes the key and doesn't collapse the others or modify the `length` attribute, so it just leaves an empty slot behind.

Arrays, dicts, and objects each represent fundamentally different ideas. Using the same data structure for all of them is just wrong. It's led to the aforementioned tragedies, and also the actual ways to work with arrays are counterintuitive. The `.push` method is how you're supposed to add stuff to the end, and `.concat` is for adding arrays. The main way to delete from an array is `.splice`, but there are a lot of others depending on the specifics. [This article](https://love2dev.com/blog/javascript-remove-from-array/) goes through a bunch of them.

For some reason, [.splice is also how you insert elements](https://stackoverflow.com/questions/586182/how-to-insert-an-item-into-an-array-at-a-specific-index-javascript). [The one method is basically a swiss army knife](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) instead of using different functions to accomplish different tasks.

<h2 class="bad">This implicit type conversion is outrageous</h2>

A lot of people who rant about Javascript mention this. Let me just jump into the examples:
```
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
I don't oppose all type coercion. I hate, for example, in [Go](go) when you can't even compare `int` to `int32` without an explicit conversion. But this? Not only it is through the roof, it's wildly inconsistent and unintuitable. Most of these should raise exceptions.

<h2 class="bad">Iterating is a mess</h2>

Javascript has three different for loop constructions: the C-style `for (let i = 0; i < items.length; i++) {`; then `for (let i in items) {`, and `for (let i of items) {`. What are the differences? Can we maybe use these two latter constructions to elide the antiquated C bullshit?

Well, no. `for`..`in` is for iterating on the keys of an object... but objects in Javascript have string keys. And do you know what that means happens when you try to use this on an Array?
```
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

`for`..`of`, on the other hand, *only* gives you the values. Not the keys. And of course there's no easy way to get the key from the value; there's nothing equivalent to Python's `enumerate`, as far as I know. So, we still need to use antiquated C bullshit to iterate in Javascript.

<h2 class="bad">Variable declarations are a mess</h2>

Assigning to an undefined variable in Javascript by default creates a *global* variable, if you don't use `'use strict';` at the top of the file. Besides this unfortunate fact, there are *three* different keywords for declaring variables that all have subtle differences:

* `var` - creates a function-local variable. That's all it does.

* `let` - two differences from `var`. It's *block-scoped* instead of function-scoped, and it doesn't allow redeclaring the variable with `let` later.

* `const` - like `let`, but makes the variable immutable.

What an elegant and straightforward system!

<h2 class="bad">Barren standard library</h2>

The JS stdlib is missing a lot of standard fare. No titlecase. No randint. No strftime and strptime. No functions to parse and format query strings. Pretty important for a language that's almost exclusively used on the web. At least we have ones to [encode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) and [decode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent) URI *components*.

<h2 class="bad">Objects can't compare for equality</h2>

`==` on Objects (including Arrays) compares for identity, not equality. If you want to test whether two Objects are equal, you have to iterate over their keys.

In a language that has `==` and `===`, you would think `==` would compare by value for objects, and `===` would compare identity. But no, they do the same thing.

<h2 class="bad">Boilerplate syntax - semicolons, parentheses around conditions</h2>

I talked about this a lot in my review of Python, but Javascript does worse than just having these boilerplate syntax features. [Semicolons will usually be automatically inserted by the interpreter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Automatic_semicolon_insertion), so *often* you don't need them, but if you lean on that fact, sometimes semicolons will be inserted incorrectly and break your code in bizarre ways. And you can't even say "Just don't lean on the feature", because the nature of the feature precludes that. Everyone forgets semicolons sometimes in semicolon languages.

<h3 class="bad">Object constructors for primitive types</h3>

```
x = 5;
y = new Number(5);
x == y; // true
x === y; // false
typeof x; 'number'
typeof y; 'object'
```
What's the difference between these two things? I'm sure `Number` provides some methods or something that primitive numbers don't, but why *should* it if these two things represent the exact same idea? Why shouldn't whatever works on `Number` just work on `number`s?

<h3 class="bad">Distinction between <code>null</code> and <code>undefined</code> is confusing and unnecessary</h3>

There are *two* primitive values that represent the lack of a value. `null` and `undefined` are semantically different; for function parameters, passing `undefined` causes the parameter to get its default value. Passing `null` causes it to get `null`. Now *that's* nice and intuitive.

<h3 class="bad">Arrays don't support negative indices</h3>

Negative array indices are a super useful feature in other languages for making code more concise and more readable. Javascript, perhaps owing to the way it treats arrays as objects, doesn't support them. Just compare the readability difference:
```
arr[-5];
arr[arr.length - 5];
```

<h3 class="bad">Slicing arrays is ugly</h3>

Javascript also doesn't support the usual syntax for slicing arrays. Instead you use `.slice`:
```
arr = ['a', 'b', 'c', 'd'];
arr.slice(1, 3); // Returns ['b', 'c']
```
It's not horrible, but it's a good deal more verbose than most other languages.

<h3 class="bad">Single versus double quotes - meaningless decision</h3>

Another point from my review of Python. Having to constantly make this decision distracts me and breeds inconsistent style.

<!--https://wsvincent.com/javascript-parseint-map/-->