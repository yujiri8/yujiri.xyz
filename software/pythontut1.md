TITLE The Concise Python Tutorial, Lesson 1: From zero to calculator
NAV The Concise Python Tutorial, Lesson 1: From zero to calculator
TEMPLATE DEFAULT
DESC Starting from zero programming ability, learn to make a simple calculator.

I know, I know, there are an infinite number of Python tutorials on the internet (and on everything else for that matter), but I haven't found a single one I think is really good, so I'm making this one. My goal is to make a tutorial as **digestible**, **concise**, and **accurate** as I can. (Most of the other ones I've seen I dislike because they drone on about complex stuff in the early chapters and teach things in a nonsensical order.) The project we're aiming for in this first entry will be a text-based, single-operation calculator.

Prerequisite for this series: preferably [a basic understanding of how programming works](programming), but no actual ability.

# Installing the Python interpreter

Let me take a quick opportunity to hound you about this first: learning to program is *much* easier if you're on a Unix-like operating system than on Windows. I've written about [what Unix is and why you should use it](why_unix), and the reasons are even stronger for those learning to program, but of course nothing stops you from doing it on Windows or Mac or anything else.

**If you're on any Unix-like system:** you just need the interpreter installed, and you can run a file by passing the filename as an argument, or open the prompt by running it without a filename (ctrl-D to exit). The command might not just be called `python` though; it might be called `python3`, `python3.8`, or whatever version. <span class="highlight">(On many Unix systems, the command `python` is Python 2. You need Python 3 for this tutorial, since Python 2 is long outdated.)</span>

**If you're on Windows:** the Python interpreter is probably preinstalled, but if not you can [get it from python.org](https://www.python.org/downloads/) (on a modern machine, you probably want the Windows x86-64 executable installer). The installer should include something called IDLE ("integrated development and learning environment"), which is a convenient (compared to Windows file explorer) way of opening the Python prompt and executing files. You can run IDLE from the Windows menu.

## What's with this "prompt"?

When you open IDLE, you'll probably see a window that shows a message about the Python version and stuff and then a line starting with `>>>`. In most languages, to write a program, you have to save the source code to a file and then execute the file. But Python also features an interactive mode, where you can type instructions one by one and see them executed as you enter them. The `>>>` is the "prompt", which just means it's waiting for you to enter code. The result of each command you type is displayed on the next line without the `>>>`. You might also hear this called the Python "shell" or REPL (read-evaluate-print loop).

To write a saved program in IDLE, you can go to File -> New File in the top menu, and then when you run it with Run -> Run Module, the output will show up in the prompt window. But I highly recommend sticking with the interactive prompt at first. It's awesome.

Most of my excerpts here are interactive sessions, and so lines that start with `>>>` are lines of code (but the `>>>` is not part of them), lines without it are output. Unless I put a block with no `>>>` lines - then it's a saved program instead of an interactive session.

# Math

First, let me demonstrate the calculator use:

```
>>> 5 + 2
7
>>> 7 / 5
1.4
>>> 11 * (3 - 1)
22
```

The interactive prompt interprets math expressions just like math.

# Variables

A variable is like a name you can set to mean whatever you want. `number = 5` assigns the value `5` to the name `number`. Hereafter, we could include `number` in our calculations and it would have this value:

```
>>> number = 5
>>> number + 2
7
>>> number
5
```

Note that Python's prompt doesn't print the result when you just assign to a variable. You can see the value of a variable by entering it on a line by itself, since Python reads it the same as if you just entered its value. Also note that `number + 2` didn't change the value of `number`; it just printed the value plus 2. `number = number + 2` would've changed the value of `number`.

<p class="highlight">A valid variable name can only use letters, numbers, and the underscore, and can't start with a number.</p>

This lets us do slightly more interesting stuff:

```
>>> x = 12
>>> y = 2
>>> z = x + y
>>> z / y
7.0
```

Now let's take a break from the math. There are just a couple other prerequisites to our objective of making a calculator.

# Print

First of all, if you save the above lines of code (minus the `>>>` prompt, obviously) to a file and run it, you'll notice the result is never displayed, even though it works in the prompt. In the shell, Python automatically displays the result of an expression, but not when it's in a saved program. To make a program output text you need the `print` function:

```
x = 12
y = 2
z = x + y
print(z / y)
```

<div class="highlight">

The parentheses after `print` are important - they tell Python what the `print` applies to, and it won't work without them.

</div>

<div class="highlight">

You might've assumed this, but programming is **case-sensitive**: that function is called `print`, not `Print` or `PRINT`, and it matters. All functions and variable names are in lowercase by convention.

</div>

# Strings

`print` can print anything, not just numbers, so now we're going to talk about **strings**, another very important data type. A "string" meaning a string of text. String *literals* (as opposed to a variable that holds a string) always have to be enclosed in quotes, so that Python knows to interpret them as literal text instead of the name of a variable or something. The quotes are not themselves part of the string, though:
```
>>> print("hello")
hello
```
You can use either single or double quotes, as long as you use the same kind on both sides.

Strings are going to be essential to building our calculator, but before we get on with them, now's a good time to talk a little about error messages, since you're very likely to run into some in the next section.

## Reading error messages

Unless you're a way more accurate typist than me, there's a good chance you've already seen an error message, and it looked like a mess. If you haven't, try entering a line like `blah` and you should see something like this:
```
>>> blah
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'blah' is not defined
```
For now, don't worry about the line `Traceback (most recent call last):` - we won't get into what that means until much later in this series. The second line shows you the name of the file your program was saved to, or `<stdin>` if you were just in the prompt (It stands for 'standard input', and I [explain the concept](unix_streams) in my Unix tutorial track, but that's not important here); the line number that caused the error (or 1 if you're in the prompt); and the `in <module>` part is another thing you don't need to worry about until much later when we start working with modules.

The most important line is the last one, which shows what the actual problem is. There are a lot of different kinds of errors, but here are some of the most common ones:

* `SyntaxError` means your code was malformed and Python didn't know to parse it. You'll get this if you forget the closing quote on a string, try to use a function without parentheses or write a nonsenical line like `a =`. Syntax errors are the only kind that will be caught as soon as you try to run the program - with other kinds of errors, Python won't know there's a problem until it gets to the line that has it, so you'll see the program execute up to that point and then crash. (As a result, syntax errors don't show the "`Traceback (most recent call last):`" line.)

* `NameError` of course is what you get when you use a variable you didn't define. The most common cause of this is typo (again, unless you're a way more accurate typist than me).

* `TypeError` is what you get for doing something like `5 + 'a'`.

## Escaping

The next logical question about strings should be (if you already started thinking this then you get a cookie): if enclosure in quotes is how we tell Python where the string starts and ends, how do we put literal quotes in a string? `print("it's")` works because the apostrophe is a single quote and that string is enclosed by double quotes, but if you need to print a string that has both types of quotes in them, it's not so simple. `print("I said, "it's okay."")` would look to Python like the string you want to print is `"I said, "` and for some reason you put `it's okay.""` after it. You would get a syntax error.

If you want to put literal quotation marks inside of a string that are the same kind as the ones enclosing the string, you need to "escape" them by putting a backslash before each one: `print('I said, "it\'s okay."')` or `print("I said, \"it's okay.\"")` will print `I said, "it's okay."`. A backlash inside of a string is [a special signal to treat the next character literally, or vice versa if it's a character that's normally literal](escape_sequences). To include a literal backlash, you can write `\\` - the first one tells Python to treat the second one literally.

## `+` and `*` on strings

The `+` and `*` operators also work on strings. Check this out:

```
>>> 'hello' + 'friend'
'hellofriend'
>>> 'hello' * 3
'hellohellohello'
```

(Note that they weren't separated by spaces. You might've already noticed, but <span class="highlight">the spaces I've been typing around everything are unnecessary; spaces inside code are generally ignored. They're just there to make it easier to read.</span> If you want to space-separate the output, put a space inside one of the string literals, like `'hello ' + 'friend'`.)

You probably also noticed that this time the results of the operation were still printed with quotes around them. Entering a string by itself just shows it in the form you'd have to type it in to get that value. `print` prints them without the quotes:
```
>>> 'hello'
'hello'
>>> print('hello')
hello
```

<div class="highlight">

Jargon: **concatenate**: to add sequences together. Using `+` on strings is "concatenating" the stings. Using `+` on numbers is *not* concatenation, because it gives you the total of the numbers, not the numbers stuck together. (This distinction will start to make more sense when we get into sequences in part 3.)

</div>

As an aside, you can now figure out how to make backslash-escaping completely unnecessary. Try to find another way to print a line of text that has both single and double quotes.

<expand-note closedtext="Show solution" opentext="Hide solution">

```
print('I said, "' + "it's okay." + '"')
```
See how this works? I made it three separate strings: the first one is enclosed by single quotes, so the double quote inside it is literal; the second one is enclosed by double quotes, so the single-quote inside it is literal, and the last one just needs to contain the remaining double quote, so I put it in single quotes.

</expand-note>

This isn't to say you shouldn't use backslash-escaping (of course it's better than that mess), I just wanted to point out that they're never strictly necessary.

## Escape sequences

Okay, this one isn't essential to our immediate mission, but while we're talking about backlash escapes I better mention what they can do besides escape quotes. This won't take long, I promise.

There are several normal letters that, if escaped inside of a string, take on a special meaning instead of the other way around like quotes do. The most common example is `n`. `\n` inside of a string stands for 'newline':
```
>>> print('line 1\nline 2')
line 1
line 2
```
`print` is also necessary to interpret the escape sequences. If you just type `'line 1\nline 2'`, the string will, again, be shown back the way you would have to type it to get that value.

Another common escape sequence is `\t` for tab:
```
>>> print('one word\tanother')
one word	another
```

[Here's a list of string escape sequences](https://python-reference.readthedocs.io/en/latest/docs/str/escapes.html), but you don't need to memorize them or anything.

# Input

`input` is the basic function for getting text input from the user. Just doing `input()` by itself will wait for the user to type something thing in (stopping when they press enter). After that, you can think of the `input()` as if it gets *replaced* by what the user typed in, so you can use it like a literal value:
```
print(input())
```
That one-line program will wait for the user to type something in, and then repeat it back to them. If the user types "hello", it's like that line becomes `print('hello')`. You could also store the input in a variable like `a = input()`, then do something else, and parrot it back with `print(a)` later.

You can also give `input` a string value to use as a prompt:
```
text = input("give me some text: ")
print("here's the text you gave me: " + text)
```
(Note that `input` doesn't output a newline after its prompt, which `print` does. If you did `print("give me some text:")` and then `input()`, the user would be typing on the line below "give me some text".)

So with that done, can we use `input` to get numbers for our interactive calculator?
```
>>> num = input("give me a number: ")
give me a number: 5
>>> num
'5'
>>> num * 2
'55'
```
Hm... there's one problem with using `input` to make a calculator: it gives us a string, so when I tried to multiply it, it thought I was trying to multiply *the text* '5'.

`5` and `'5'` are *very* different - one's a number and the other's a string. It's kinda like [the difference between a number and a numeral](https://www.mathsisfun.com/numbers/numbers-numerals-digits.html). This is where the `int` function comes in: it converts a string to an int (integer).
```
>>> num = int('5')
>>> num
5
>>> num * 2
10
```

(The `str` function also exists to turn a number into a string. You don't need it for `print`, though, because `print` already prints a string representation of its parameter.)

# Calculator time!

Now you've got all the knowledge you need to make a program that asks for two numbers and then prints their sum (or whichever operation you like - you can't ask the user which one they want, because that would require the `if` statement, which we'll get to in the next lesson). Combine what you've learned and you can do it in as little as three lines.

<expand-note closedtext="Show solution" opentext="Hide solution">

```
num1 = int(input('give me a number:'))
num2 = int(input('give me another number:'))
print(num1 + num2)
```

</expand-note>

**Other exercise:** make it print the sum, difference, product, and quotient of the two numbers in sequence, as a substitute for asking the user which one they want.

**More interesting exercise:** How do you do the single-operation calculator in one line and without using any variables?

<expand-note closedtext="Show solution" opentext="Hide solution">

```
print(int(input('give me a number:')) + int(input('give me another number:')))
```

</expand-note>

There's just one appendix worth tacking on to this first chapter:

## Floats

You might've noticed that the calculator program doesn't accept decimal inputs, only integers. That's because we used the `int` function - `int` converts a string to an integer, and if it can't, it raises an error. (Interestingly, `int` *can* convert a decimal input: `int(3.5)` gives `3`, but it can't convert the string `'3.5'` to an integer.) A "[floating-point number](https://floating-point-gui.de/formats/fp/)" or "float" is the programmer term for a decimal number, and the function to convert to them is `float`. Go ahead and try modifying the calculator program to accept float input.

(If you play with floats, you might also run into a strange inaccuracy like `0.1 + 0.2` adding up to `0.30000000000000004`. This isn't Python's fault; it's due to an inherent consequence of the way your hardware stores decimal values in memory. There's a good explanation [here](https://floating-point-gui.de/basic/), but it's not important unless you're curious.)

[Next lesson: Flow control](pythontut2)
