TITLE The Concise Python Tutorial, Lesson 2: Flow control
NAV The Concise Python Tutorial, Lesson 2: Flow control
TEMPLATE DEFAULT
DESC Intro to Python flow control - branching and looping: the keywords if, else, elif, and while.

[Previous lesson: From zero to calculator](pythontut1)

This time you're learning about flow control. The most basic flow control construct is `if` (don't mind the double-equals sign thing, I'll explain that soon):

```python
if input("You'll never guess my super secret password! Just try:") == 'password':
	print("you guessed my password... :(")
```

Note that the line under the `if` condition has to be **indented** (prefixed with space); that's the only way Python knows what exactly the `if` condition applies to. Here's a more complete example:

```python
print("hello")
if input("You'll never guess my super secret password! Just try:") == 'password':
	print("you guessed my password... :(")
print("goodbye")
```

If the last line were indented too, it would only be printed if the password was guessed correctly. It doesn't matter how much indentation you use; a single space or an entire tab are both acceptable, as long as it's the same amount as the other things that are supposed to be on that level. (You also can't *mix* tabs and spaces, because tabs can have different width in different environments, so it could be ambiguous.)

<span class="highlight">`==` is used for checking whether things are equal because `=` is used for assigning things to variables.</span> `!=` is "not equal", and `>`, `<`, `>=` and `<=` all work as expected.

With this, you now have enough tools to implement a four-operation calculator (one that can do addition, subtraction, multiplication and division, and ask the user which one instead of just doing all four).

<details><summary>Solution</summary>

```python
operation = input("What operation?")
num1 = float(input("first number:"))
num2 = float(input("first number:"))
if operation == '+':
	print(num1 + num2)
if operation == '-':
	print(num1 - num2)
if operation == '*':
	print(num1 * num2)
if operation == '/':
	print(num1 / num2)
```

</details>

### Indentation in the prompt

The way the Python prompt handles indented blocks can be confusing. After a line that starts a block, like `if operation == '+':`, the prompt will change from `>>>` to `...` while you enter the indented block. It'll stop you if you make a syntax error (code Python can't understand), but it doesn't actually execute your statements until you finish entering the block (so a non-syntax error, like a TypeError, you won't hear about until then). To terminate the block, it requires a blank, unindented line; I'm not exactly sure why.

### Other numeric operators

* `**` is mathematical exponentation, so `x ** 2` means `x` squared, etc.

* `//` is *integer* division, which means it rounds the result down to the nearest integer.

* `%` is the "modulus" operator, which gives the remainder of integer division:

		>>> print(11 % 2)
		1

	This operator is read 'mod'.

You can add these to the calculator if you want, but I think you get it.

## `and`, `or`, and `not`

Demonstrating these basic keywords:
```python
num = int(input('enter your favorite number: '))
color = input('enter your favorite color: ')

if num % 2 == 0 and num < 0:
	print("Your favorite number is even and negative")

if not (color == 'red' or color == 'green' or color == 'blue'):
	print("Your favorite color is not one of the three your screen consists of")

if color == 'yellow' and num != 6 or num == 6 and color != 'yellow':
	print("You share one of my favorites, but not the other")
```

Note the way `and` and `or` are combined up there. In general (this is true of most programming languages), `or` is less "tight" than `and`, meaning `A and B or C` means `(A and B) or C`, not `A and (B or C)`. `not` is tighter than either of them. Of course, you can use parentheses to override the default precedence.

Also note that each condition has to stand on its own; I couldn't write `if color == 'red' or 'green'`. Python would see this as, "do the following if either of these conditions are met: `color == 'red'` is true, *or* `'green'` is true". Well, actually, I *could* write that, because of Boolean coercion which we'll get to in a minute, but it wouldn't do what you expect.

## Booleans

All this talk of conditions introduces a new data type: something that is either true or false. The word for this is [**Boolean**](https://en.wikipedia.org/wiki/Boolean_data_type). Every condition evaluates to a Boolean value.

You can also use conditions as values:
```python
>>> print(5 > 3)
True
```
And store them in variables:
```python
primary_color = color == 'red' or color == 'green' or color == 'blue'
grey_color = color == 'white' or color == 'grey' or color == 'black'
print(primary_color or grey_color)
```
This will print `True` if your color is one of the six.

Boolean variables are also very useful for remembering past stuff:

```python
matched_greeting = input("Hello") == 'Hello'

input("(Long conversation...)")

if matched_greeting:
	print('By the way, thanks for matching my greeting exactly. I hate when I say "hello" and people respond with "hi".')
```

Do note that the literal values for Booleans are spelled `True` and `False`, not `true` and `false`.

## Boolean coercion

A value of any type can be used in place of a Boolean. Let me just jump into examples:
```python
if 0:
	print("0 is True")
if 1:
	print("1 is True")
if 5:
	print("5 is True")
if -1:
	print("-1 is True")
if '':
	print("'' is True")
if 'a':
	print("'a' is True")
if ' ':
	print("' ' is True")
```
As you can see from running this, 0 and the empty string are False, while any other number or string, including a negative number or a string of all spaces, is True. In general, automatic conversion from one data type to another is called **coercion**. Values that coerce to False when used as a Boolean are called "falsy" values; everything else is "truthy".

So what would actually happen if I used `color == 'red' or 'green'` as a condition? `'green'` would always be True, and so that block would get executed regardless of what `color` was.

There's also the `bool` function to explicitly turn something into a Boolean. `x = bool(4)` will set `x` to `True`. (Explicit type conversion, by the way, is often called **casting**.)

## `else` and `elif`

`else` can be used after an `if` clause to automatically mean "do this only if we didn't just do the previous thing":

```python
if input() == 'hi':
	print("You said hi")
else:
	print("You didn't say hi")
```

There's also `elif` as a shortcut for else-if. If you have a block like this:

```python
entry = input()
if entry == 'hi':
	print("You said hi")
else:
	if entry == 'bye':
		print("You said bye")
	else:
		print("You said something else")
```
you can rewrite it to:

```python
entry = input()
if entry == 'hi':
	print("you said hi")
elif entry == 'bye':
	print("you said bye")
else:
	print("you said something else")
```
The two are exactly the same.

<div class="highlight" markdown="1">

New jargon: **nesting**: putting an intended block inside of another one. In the example without `elif`, the stuff under `else` was nested; it only even gets considered if the `else` clause is getting executed.

</div>

You can have any number of `elif` clause. Each one will only be executed if none of the previous ones were.

# Looping

Looping is where things get a heck of a lot more interesting. `while` is the keyword used to keep executing a block of code while the condition stays true:
```python
while input("guess the password:") != "secret123":
	print("you have to guess the password to get out")
```

<div class="highlight" markdown="1">

New jargon: a special value that's used to exit a loop like this is often called a **sentry value**.

</div>

### The infinite loop

At some point learning about loops, you're bound to make a certain kind of mistake that can result in a rather bizarre bug. Consider this code:
```python
print("I'm going to count backwards from 10 to 0, by 3s.")
num = 10
while num != 0:
	print(num)
	num -= 3
```
Go ahead and run this to see what I mean. Obviously, my condition should've been `num > 0` because `num != 0` is `True` if `num` is negative. The reasoning I'm including this is so that when you inevitably encounter this at some point, you'll know what kind of thing must be causing it - a loop condition didn't evaluate to `False` when you thought it would. Also, very helpful tidbit: pressing `Ctrl-C` will generally stop a running program, which you can use to escape an infinite loop. (Technically, it raises a `KeyboardInterrupt` error.)

I just have to show you a few more tricks before we can get to a fun exercise.

## Augmented assignment

Augmented assignment operators are a nice convenience. Mathematical operators can be put before the `=` as a shorthand; for example, `number += 5` is the same as `number = number + 5`.

## Printing multiple things

You can actually pass any number of values to `print`, and by default it'll separate them with spaces:
```python
>>> print("Hello", 5, "aliens")
Hello 5 aliens
```
(The spaces get inserted regardless of whether you put spaces after the commas. The commas are just separating values, and the spaces after them are only there for readability.)

The most useful thing here is the automatic string conversion - it lets you type `"Hello", 5, "aliens"` instead of `"Hello " + str(5) + " aliens"`.

Note that `input` doesn't support this; if you try to pass multiple comma-separated values as its parameter, you'll get an error.

## Comments

Finally, it's about time we talk about **comments**. Lines that start with `#`, or anything after a `#` in a line, are comments, and do nothing. Python ignores them.
```python
>>> # Hi, this would be invalid syntax outside of a comment
>>> # x = 5 (just to show that code after a comment does nothing)
>>> x # x is not defined because the above assignment was in a comment, and thus was not executed
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'x' is not defined
```
This might seem like a silly feature (it did to me when I was ten), but comments are extremely useful to explain to people reading the source code what your code is doing and why, or even as reminders for your own future self. Sure, not necessary for little programs like this, but for complicated projects with hundreds or thousands of lines of code, comments are essential.

Also note that hash signs *inside a string* get neutralized without needing to be backslashed:
```python
>>> a='#'
>>> print(a)
#
```
It's a very common practice to use comments to temporarily disable a block of code. Since comments don't do anything, you can disable a line of code by putting a `#` at the beginning of the line. This is called "commenting out" the code and is often done in debugging.

# String builder time!

Okay, now we're gonna do something fun.
```python
string = ''
newest_entry = ''
while newest_entry != 'exit':
	string += newest_entry
	newest_entry = input("The string so far is: " + string + "\nType more stuff to add to the string, or 'exit' to exit:")
	if newest_entry == string:
		print("You entered exactly what the string currently was. It will now be that string repeated twice.")
print("Your final string was:", string)
```
Note that I placed the line `string += newest_entry` so that it would not execute *inbetween* getting the next entry and checking whether the user wanted to exit. Otherwise, the 'exit' would always be appended to the string when you exited.

Once you understand how that's working, **Exercise:** make it so the user can enter 'clear' to clear the string, and 'copy' to be prompted to enter a number, and then copy the string that many times. The program should also print a unique message if the user enters nothing.

<details><summary>Solution</summary>

```python
string = ''
newest_entry = ''
while newest_entry != 'exit':
	newest_entry = input("The string so far is: " + string + "\nType more stuff to add to the string, 'exit' to exit, 'clear' to clear the string, or 'copy' to copy it:")
	if newest_entry == 'copy':
		string *= int(input("How many times? "))
	elif newest_entry == 'clear':
		string = ''
	elif newest_entry == '':
		print("Nothing changes if you enter nothing... are you just wasting time?")
	elif newest_entry != 'exit':
		if newest_entry == string:
			print("You entered exactly what the string currently was. If you wanted to double it, you could've used the 'copy' command.")
		string += newest_entry
print("Your final string was:", string)
```

This one was a bit tricky. Previously, I had put the adding before the getting input so that `'exit'` wouldn't be added when the user exited. But now we have a special behavior when the user enters an empty string, so I moved the getting input to the beginning of the loop, and added a condition to prevent it from adding the entry to the string if it was `'exit'`. There are other possible solutions to this problem.

**Thinking exercise:** how do you clear the string without using the `clear` command?

</details>

[Next lesson: Sequences](pythontut3)
