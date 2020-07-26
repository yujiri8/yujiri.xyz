TITLE The GOLD Spec
NAV The GOLD Spec
TEMPLATE DEFAULT

I've been enamored with the fantasy of making a programming language for a while. Not that I think I ever will, but I like to think about how it would work. I think I've learned a lot from studying very different languages and that I know how to combine the best ideas from all of them. I also think some of my ideas are genuinely original (as far as I've seen) and pretty good. And there's some chance someone who *is* in a position to design or influence a language will read this and get my good ideas. So here's the working spec for what I'd consider an ideal language. It's working name is Gold and stands for "Go Over Limits, Doofus".

# Basic usage

* Must compile to native code, but should also be usable interactively. Haskell proves it's possible.

* Static typing with type inference, generics, sum types, and a C-like concepts of structs.

* I'm still unopiniated about lazy evaluation, referential transparency, and the Haskell-like syntax that they invite. I'll be writing most of the examples as if they use traditional syntax and the language is not generally lazy or referentially transparent.

# The error handling strategy

* Default behavior on error is to throw upward.

* The name of an error type on an indented line below a statement will be followed by code to be executed in the case of that error before throwing. `err` catches all errors.

* A string expression as the last statement of an `err` block will be context to wrap the error with.

* The `ignore` statement in an `err` block means don't throw the error but continue.

* An `err` statement after a block indented under `try` applies to the whole block (the `err` statement should not be indented).

Ignore an error:
```
dangerous()
	err ignore
```
Throw with context:
```
dangerous()
	err "dangerous failed"
```
Get the error reference:
```
dangerous()
	err(e) "dangerous failed because:" + e
```
Different behavior for different error types:
```
dangerous()
	err_index ignore
	err_os close(file)
```
An index error will be ignored, an OS error will close `file` and then throw, and any other type of error will just throw.

Multi-statement `err` blocks:
```
dangerous()
	err(e)
		close(file)
		print("An error occurred: " + e)
		ignore
```
`try` block:
```
try
	dangerous_1()
	dangerous_2()
	dangerous_3()
err ignore
```
The error will be caught and ignored if it happens anywhere in the `try` block.

# Syntax

* [No variable declarations](declarations). `x = 5`. If you need to specify a type, `x = Int 5`.

* `#` for comments, because it's only 1 char.

* `#{`..`#}` for a comment block to easify commenting out many lines at once.

* Int literals: besides just using the decimal number, you can use `0x` prefix for hex and `0b` for binary.

* Byte escapes: `\x00`, `\d000`, and `\b00000000` for byte codes. `\n` for newline, `\t` for tab, `\r` for carriage return.

* `''` is for declaring a Byte using the literal character in the source. `u''` makes a Char (and equivalent notation exists for other quoted literals).

* `""` is syntactic sugar for List Byte.

* `"""`...`"""` are multiline strings.

* <code>&#96;&#96;</code> are template strings like in Javascript.

* `list[i]` is index syntax; works on both Lists and tuples.

* `dict[key]` is lookup syntax for a Dict.

* `.` is access syntax for Struct fields. It's also method syntax: there's no difference in definition between a function and a method; any function can be called with the `.` syntax as if it were a method of its first argument.

* `[a, b, c, d]` is List syntax.

* `[a; b; c; d]` is Array syntax.

* `{a, b, c, d}` is Set syntax.

* `{a: b, c: d}` is Dict syntax.

* `_` is a null variable name; it doesn't store the result. Mostly used for unpacking tuples.

* Line continuations are done like:
	```
	start_of_long_line \
	\ end_of_line_line
	```
	This way neither line can look complete, and there's no indentation confusion.

## Stylistic stuff

* When inside parens or a similar character and breaking across lines, you don't need commas:

	```
	items = [
		item1
		item2
		item3
	]
	```

* lower_snake_case for variable and function names, SCREAMING_SNAKE_CASE for constants, UpperCamelCase for type and maybe module names.

* Tabs for indentation. Set your editor to display them as 4 spaces so you don't have to pull your hair out.

# Misc

* `import module [as name]` tells the language about another file that needs to be loaded. The module name can be the name of a package to find in a library directory, or a filesystem path. Its contents will be namespaced.

	Importing a file never runs code - all execution is traceable to `main`.

* `exit Int` - exit the process with the given status.

* There are no variadic functions, just take lists as arguments.

* You can have multiple functions with the same name if they have different type signatures. As long as the calls aren't ambiguous.

* Binary operators can be given behavior on custom types because they're aliases for functions. For example, `+` is `_add`.

* `STDIN`, `STDOUT`, `STDERR`, `ARGS`, and `ENV` are available as global names without imports.

# Infix operators

* `or`, `and`, `not` - in ascending order of how closely they bind

* `==`, `!=`, `<`, `>`, `<=`, `>=` - comparisons that return Bool

* `<>` - comparison that returns Tri

* `in` - takes the form `elem in container` and returns the Bool. Works for anything that implements Source.

* `allin` - takes two Sources and tests if every element of the first is in the second

* `within` - like `allin`, but requires them to be found in sequence

# Flow control

## Non-looping

```
branch if cond1
	do_1()
if cond2
	do_2()
else
	do_default()
```
Single statement clauses can be written on the same line with a colon:
```
branch if cond1: do_1()
if cond2: do_2()
else: do_default()
```
This is also an expression:
```
var = branch
	if cond1: val1
	if cond2: val2
	else: val3
```
Clauses can be put onto one line:
```
function(branch if cond1: val1; if cond2: val2; else: val3)
```
`branch` is always necessary so that there's never any ambiguity about whether a lone `if` or `if-else` is part of the preceding `branch` or not. For example:
```
branch if cond1: do_1()
if cond2: do_2()
if unrelated_cond: do_thing_that_should_happen_regardless_of_cond1_and_cond2()
```
I don't want to need to indent branches under `branch`, or have an `endbranch` keyword or something. So that last part should just be written as:
```
branch if cond1: do_1()
if cond2: do_2()
branch if unrelated_cond: do_thing_that_should_happen_regardless_of_cond1_and_cond2()
```
A `branch` ends at the first statement on its level that doesn't start with `if` or `else`.

## Looping

```
while condition
	statement()
```

`for counter, item from items where criterion` - iterates on elements of `items` where `criterion` is `true`, binding the element and the iteration counter to `item` and `counter`. *Counter is not incremented when an item is skipped due to failing the criterion. If you want it to still increment, filter using a `continue` statement instead of the `where` clause in the loop header.*

`break` and `continue` can take an arg that says how many levels of loop out to go.

# Generators

Generator expression:
```
results = function(v) for v from inputs where condition(v)
```
The results are not evaluated immediately, but they can be iterated on.

Comprehension:
```
results = List (function(v) for v from inputs where condition(v))
```
Converts the results to a List (not lazy), so they're all evaluated.

# Function declarations

Functions are values, so there isn't a keyword to declare them; you just use the `=>` to define a function literal and name it.
```
double_num = num =>
	num * 2

# Default value
greet = (name = "Anon") =>
	print "Hi, " + name + "!"
```

# Types

* `Bool` - `true` or `false`

* `Tri` - `top`, `bottom`, or `middle`. This is used in some situations like the `<>` comparison operator.

* `Byte`

* `Char` - UTF8

* `Int` - infinite size

	Maybe so that size limits can be guaranteed for performance benefits if desired, we should have `Int32`, `Int64` and `Bigint` or similar and `Int` is their interface?

* `Float`

* `List a` - linked list

* `Array a` - (contiguous storage) worth having in addition to List? Bytestrings of course would like to be implemented as `Array Byte`, but I'm not sure if this is useful for much else.

* `Set a`

* `Dict a b`

* Tuples probably in the Haskell sense: a way of treating multiple values as one, but they have a separate type parameter for each slot.

# Interfaces

* Source - anything you can get values out of. Iteration works on Sources. Lists, Sets, Dicts, Files, and other stuff are Sources.

* Dest - anything you can put values into. Lists, Sets, Dicts, Files, and other stuff are Dests.

* Seq - a Source that has a defined ordering of elements.

# Structs

```
struct Person
	# The colon specifies the type of the field.
	name : String
	age : Int
	# The = specifies a default value, inferring the type.
	admin = false

alice = Person(name = "Alice", age = 22)
```
Inheritance:
```
struct Programmer
	include Person
	lang : String

bob = Programmer(name = "Bob", age = 46, lang = "Gold")
```
Any function that wants a Person will accept a Programmer.

# Enums

```
enum Color
	"blue"
	"red"
	"green"
	"yellow"
```
Color is inferred to be an enum of String, so it can be casted to string without a converter function.

The enum values can also be given names:
```
enum Color
	"blue" blue
	"red" red
	"green" green
	"yellow" yellow
```

---

# Other thoughts

* Should things pass by reference or value by default?

* Maybe there should be a way of specifying the initial capacity of a reallocating structure, like Go. Probably a `cap` keyword on any assignment.
