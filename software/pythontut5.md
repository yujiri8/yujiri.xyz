TITLE The Concise Python Tutorial, part 5: Functions
NAV The Concise Python Tutorial, part 5: Functions
DESC We're finally getting to functions! Functions are a central concept to everything in programming.

[Previous lesson: Mutable types](pythontut4)

This time we're getting *real*, and I mean *real* real. You're going to learn how to *make your own functions*. It was fun to see how far we could get without this, but it's an utterly essential aspect of programming. In fact, the projects for chapters 3 and 4 could probably have been improved a lot by using functions.

# Function jargon

First all, I've been saying the word already but to lay it out explicitly, a *function* is a part of a program that can be used ("called", or "invoked") from other parts of the program, as many times as you want. You can think of it as a mini-program. Built-in functions we've already worked with include `print`, `input`, `int`, `str`, `float`, `len`, and a bunch more.

Any time you call a function, you put parentheses after it. The parentheses mean that you want the function to be called and replaced with its return value. The values put inside the parentheses are the **arguments** or **parameters** that you want the function to operate with.

That concept - a function taking an argument - is part of what makes them so powerful. They allow you to write code that can be reused,without copy-pasting it, on a new piece of data. Concrete examples will make this a lot clearer later on.

So here's a simple example.
```python
def grandiose_print(thing):
	print("\n" + '#' * 40 + "\n")
	print(thing)
	print("\n" + '#' * 40 + "\n")
	
```
After executing this code, I can do:
```python
>>> grandiose_print('hello')

########################################

hello

########################################

>>> grandiose_print('goodbye')

########################################

goodbye

########################################

```
Not a very useful function, I'll admit, but it demonstrates the concept.

To make a function return something, use the `return` statement:
```python
def average(nums):
	return sum(nums) / len(nums)
```
Now, we can do:
```python
>>> result = average([3, 5, 8])
>>> result
5.333333333333333
```

If a function doesn't have a `return` statement, it just returns `None`. (It also returns `None` if you just write `return` without saying what to return. There is a use for this, which you'll soon figure out if you haven't already.)

# Why use functions?

Functions provide two main benefits. The most obvious one is avoiding repetition. If you have a program that does the same thing in a lot of places, you can put the duplicated lines in a function, and just call the function every time instead of repeating its source code.

But there's another tremendous benefit to using them, which is of [readability](readability). Even if a function is only used once, it can still be better than not making it a function, because it can make the logic of the program easier to follow. If you have 100 lines of code in a row that perform a task that can be divided into three phases, try making each phase a function. Then the main part can just look like:
```python
phase1()
phase2()
phase3()
```
Which makes it easier to see what it's doing at a glance (that is, if your functions have more descriptive names than that). In a program of any significant size, being able to "zoom out" and see the logic from a higher-level perspective is essential to keeping track of it.

# Multiple arguments and return values

A function can take multiple arguments (`list.insert` is one you've seen that does) and return multiple values:
```python
def remainder_div(dividend, divisor):
	return dividend // divisor, dividend % divisor
```
And this is where we need to talk about unpacking tuples.
```python
>>> a, b = (3, 6)
>>> a
3
>>> b
6
```
Well did you know you could do that? It's very useful with functions that return multiple values, since, the multiple values are actually returned as a tuple. Going back to `remainder_div`:
```python
>>> remainder_div(5, 2) # This gives us a tuple
(2, 1)
>>> quotient, remainder = remainder_div(5, 2) # This way, we get each value as a separate variable with only one line.
>>> quotient
2
>>> remainder
1
```
I don't think I've shown you any builtin functions up to this point that return multiple values, but it's a good tool to have.

# Default arguments

Check this out:
```python
def greet(name = 'mate'):
	print("Hello,", name + '.')
```
Now you can use this to greet people and it'll just address them as "mate" if you don't specify their name.
```python
>>> greet("Bob")
Hello, Bob.
>>> greet()
Hello, mate.
```
To give one example of a builtin function that has a default parameter: `int`. The first parameter is the thing to convert to an integer, but there's a second parameter that specifies the numeric *base* to interpret the number in, and defaults to 10. You can use this to convert numbers written in binary (base 2) to the familiar base 10:
```python
>>> int('1101', 2)
13
```

## Variadic arguments

Okay, these two features aren't useful that often, but I might as well teach them while I'll talking about functions. After all, you've already seen a function that uses both, and I don't want to keep you from unlocking its full power any longer :D
```python
def new_average(*nums):
	return sum(nums) / len(nums)
```
What's this? It's the same as the `average` function we wrote earlier, but it uses that weird `*` in front of the parameter name. That makes the parameter *variadic*, which means the caller can pass a varying number of arguments to `nums` and `nums` will be a tuple that contains all of them.

But this means we don't have to wrap our numbers in a list or tuple to call it (In fact, we can't because then the function would get a tuple with our list of numbers as its first element):
```python
>>> new_average(1, 5, 6)
4.0
>>> average([1, 5, 6]) # the old average function from earlier
4.0
```
Which looks nicer to call?

This is how `print` works, of course. You don't need to wrap your arguments in a list to pass multiple things to `print`.

The same syntax can be used to pass multiple arguments out of a sequence:
```python
>>> nums = (1, 5, 6)
>>> new_average(3, *nums) # the same as passing 3, 1, 5, 6
3.75
```

## Keyword arguments

You don't actually have to pass arguments in order, generally. There's another way to make sure you're passing the right ones.
```python
>>> def print_two(a, b):
...   print("a is", a, "and b is", b)
...
>>> print_two(b = 'for banana', a = 'for apple')
a is for apple and b is for banana
```
In fact, `print` has not one but *two* parameters with default values that you can only pass this way because the main parameter (the stuff to print) is variadic. You know how it always prints a newline after your string? (Keep in mind that a newline is not a blank line. A blank line is two newlines in a row.) You can stop this by setting the `end` parameter to an empty string:
```python
print("message 1", end='')
print("message 2", end='')
print("message 3", end='')
```
This will print:
```python
message 1message 2message 3
```
It also has the `sep` parameter, which controls what gets printed between each argument. As you've seen, `sep` defaults to `' '`.

## Arbitrary keyword arguments

Okay, one last trick about arguments. There's a rarely useful thing you can do that's like a fusion of keyword and variadic args:
```python
>>> def test(**args):
...   for key in args:
...     print('the argument', key, 'was passed', args[key])
...
>>> test(a = 'apple', b = 'banana')
the argument a was passed apple
the argument b was passed banana
```
Get it? The double-asterisk makes it a dictionary! You can pass any arguments you want to the function, and it's just like passing a dictionary but the syntax can be nicer sometimes.

# Scoping issues

Okay, now we're going to deal with a conceptual hurdle that accompanies functions. Scoping isn't as difficult to get the hang of as shared reference if you ask me, but it's still a stumbling block for many people (sure was for me).

You might've noticed that variables assigned inside of a function don't stay set outside of it:
```python
>>> def f():
...   test = 5
...   print(test)
...
>>> f()
5
>>> # 5 was printed, so the assignment obviously worked. Let's see if we can access it now.
>>> test
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'test' is not defined
```
Well isn't that strange!

By default, variables inside functions are *local*; they only exist inside the function. This helps prevent mistakes. If you want a function to assign to variables outside of it, use the `global` keyword:
```python
>>> def f():
...   global test
...   test = 6
>>> f()
>>> test # this time, it affected the name outside of the function, because we made it a global name.
6
```

<div class="highlight">

Note that you *can access* global variables from inside a function, you just can't *assign* them.

</div>

# The stack

It's time for some more theory. So when you call a function, Python stops executing where it was at and goes to execute the function, and finishes the function before returning to the place it was called from. And as I've already shown, functions can call each other. Each time Python sees a new function call, it pauses the one it's currently executing to go execute the new one. It's useful to think of a "stack" of currently running functions:

The bottom of the stack is the 'global scope', which isn't in any functions. When you call a function, it gets pushed onto this stack, and so it has to be finished and removed ('popped') before we can resume executing the one below it (the one that called it). This stack of execution is "first in, last out" (FILO).

(The information about each function stored on the stack is called a stack **frame**.)

This understanding of the stack is reinforced by error messages. Before we introduced functions, the only errors you saw showed you a line number and the name of the file. Maybe you've already seen it, but if Python has an error inside a function, it shows you *two* filenames and line numbers: first the place the function was called, then the problematic line of the function <span class="note">With the line number still relative to the file - line 10 means the 10th line of the file, not the 10th line of the function</span>, with the "`<module>`" part replaced with the function name. If the error was in a function called from a function, it shows you three stack frames.

And that's the meaning of the words "Traceback (most recent call last):"! It's showing you a trace from the bottom of the stack (the global scope) back to the line of the error, with the most recent call - the top function on the stack - last!

Syntax errors, by the way, don't do this because they don't happen while running the function - Python scans the whole file for valid syntax before it executes anything, so if you have a syntax error inside a function, you'll only see the one line number.

# Recursion

Recursion means a function calling itself. Yes, you can do that!

A good example of when you'd want to is for finding [the factorial of a number](https://en.wikipedia.org/wiki/Factorial):
```python
def factorial(n):
    if n == 1:
        return 1
    return n * factorial(n - 1)
```
Note that this function works as intended even though I don't use `else`. Since `return` exits the function, I don't need to use `else` because if `n == 1` was `True`, it would've already returned and not gotten to the next line. This pattern is pretty common. If the `if` block ends in an inevitable return, I prefer not to indent the entire rest of the function (the benefit is more obvious with longer functions).

Another example is when working with [a filesystem](filesystem_concepts), for example if you want to find the total size of a directory. That requires getting the size of each file inside, which means if the directory contains more directories, you would use a recursive function that would call itself for each subdirectory it found, and add the total for the subdirectory to the total for the top-level directory.

You'll see if you make an error inside a recursive function that each time Python recurses, it's pushing a new stack frame, so if it only errors on the fifth time you'll see five frames in the error message.

# Functions as objects

Have you ever tried typing the name of a function at the prompt without the parentheses we always put around function calls? If you haven't, try it.

Functions are really their own data type, they just can't be meaningfully displayed as a string. We'll get a lot deeper into the meaning of this in chapter 7, but for now, keep in mind that functions are values just like anything else. You can assign a function to a variable, pass a function to another and have it call the one you pass, and do other cool stuff, like closures.

# Closures

Closures are rather confusing, rarely used, and it's okay if you find them difficult to understand at this point. But you can define a function inside a function and even return it.
```python
>>> def make_greeter(prefix, suffix):
...   def greeter(name):
...     print(prefix + name + suffix)
...   return greeter
...
>>> melancholy_greet = make_greeter('hi, ', '...') # melancholy_greet becomes a reference to the function returned by make_greeter...
>>> melancholy_greet("Bob") # ...and we can call it like a normal function!
hi, Bob...
>>> upbeat_greet = make_greeter('Howdy, ', '!')
>>> upbeat_greet("Bob")
Howdy, Bob!
```
See how that's working? `make_greeter` returns a function, and we can use it to get different greeter functions by passing different arguments to `make_greeter`. I think the reason it's called a closure is because you "close" the parameters of `make_greeter` into the inner `greeter` function, essentially baking them into its code so the returned function can have those parameters without needing to be passed them on each call.

There's also the `nonlocal` keyword. Somebody on Stackoverflow called Anon wrote such a perfect concise explanation of the difference between `nonlocal` and `global` that I'll [just link it](https://stackoverflow.com/a/1261961/12211329).

Here's a possible use of closures with `nonlocal`:
```python
>>> def get_counter():
...   x = 0
...   def counter():
...     nonlocal x
...     print("incrementing from", x, "to", end=' ')
...     x += 1
...     print(x)
...   return counter
...
>>> counter1 = get_counter()
>>> counter1()
incrementing from 0 to 1
>>> counter2 = get_counter()
>>> counter2()
incrementing from 0 to 1
>>> counter1()
incrementing from 1 to 2
>>> counter1()
incrementing from 2 to 3
>>> counter2()
incrementing from 1 to 2
>>> counter1()
incrementing from 3 to 4
```

# `import`

The `import` statement includes code from another file into your program. Let's say you had a function you used a lot and that you expected to use in future projects too. You write a module called something like `util` (for 'utilities' - this is a common abbreviation in programming):
```python
def ask_bool(question):
	while True:
		entry = input(question).lower().strip()
		if entry in ('y', 'n', 'yes', 'no'):
			return entry in ('y', 'yes')
		print("not a valid answer.")
```
This could be a useful function for any command-line program that might need to ask its user a Boolean question, which is probably a lot of programs. So you put this in a file named `util.py`. Then, in your main file, you could write:
```python
import util

# Some code

answer = util.ask_bool("Are you sure?")

# Some other code
```

The Python interpreter ships with a massive **standard library**, which is a collection of builtin modules you can import. Let's finally introduce the `random` module.
```python
>>> import random
>>> random.randint(1, 5) # results may vary ;)
4
>>> random.randint(1, 5)
4
>>> random.randint(1, 5)
5
>>> random.randint(1, 5)
3
>>> random.randint(10, 20)
12
```
`random` provides lots of functions related to randomness, `randint` isn't the only one. For example, `random.random` returns a random float between 0 and 1. `random.choice` is a shortcut that takes a sequence and gives you a random element from it, by generating a random int between 0 and the length of the sequence and then indexing.

We're gonna use this in our project, and it's gonna be *fun*...

# `from`, `as`, and `*` imports

One more thing I better talk about while we're on imports. Three more things, actually. The `from` syntax allows you to import only some things from a module, but without the module name as a prefix (called a namespace prefix).
```python
>>> from random import randint
>>> randint(1, 5) # this doesn't need to be prefixed with 'random.' this way
2
>>> choice(('a', 'b', 'c')) # but now we don't have access to this
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'choice' is not defined
```
If you want to import everything from a module without the namespace prefix, you can use `from module import *`. Go ahead and try it.

`as` lets you import a module with a different name:
```python
>>> import random as r
>>> r.randint(1, 5)
```
The most common time I use this is when I'm experimenting in the prompt and just want to import a module with a one-letter name so I do as little as typing as possible.

You can also import multiple modules on one line like `import random, util`.

# Tic Tac... Toe?

Want to write a Tic Tac Toe game with an AI opponent? Because you've got everything you need.

This is a much larger project than anything we've done before, which calls for some planning. Programmers often use "pseudocode" to plan out how a program's going to work before we start writing it. Here's some pseudocode:
```
Explain to the player how they'll enter their move in the text-based interface.
Ask them whether they want to go first.
While neither player has won and the board isn't full:
	Let whoever's turn it is make a move
	Switch who's turn it is
Show the final state of the board and congratulate the winner.
```
This kind of skeleton can be very useful; if you dive into writing code without an idea of how it's going to work, you'll often regret it. You'll probably want a function to check whether the game has an outcome yet, and if so who. Getting the player's move and determining the computer's move should also be in functions.

For now, feel free to just have the computer make random moves if you want. But it should make valid moves - it shouldn't try to go in an occupied spot, for example.

Also, make sure the player doesn't have to restart the program to play again! It should offer to play again after the game. I recommend putting that `ask_bool` function in a `util` module and importing it. Another place it would be good to use is for asking the player whether they want to move first.

This is gonna be tough. My solution is 92 lines of code, not counting the `ask_bool` function I import! (Though it's heavy on comments.) Remember, if you get stumped by an error, the timeless debugging technique of insering `print` statements near places you suspect might be responsible to find out if variables aren't what you thought they were. And use functions everywhere you see fit. I ended up with 6 of them, not counting `ask_bool`.

<details><summary>Solution</summary>

```python
import random, util

def print_board(board):
	i = 1 # A variable to keep track of whether we're on the last row.
	for row in board:
		print('|'.join(row))
		# Don't print the horizontal separator after the bottom.
		if i != len(board):
			print('-----')
		i += 1

def play():
	# Initialize an empty 3x3 board.
	board = [
		[' ', ' ', ' '],
		[' ', ' ', ' '],
		[' ', ' ', ' '],
	]
	if util.ask_bool("Do you want the first move? (X goes first.)"):
		player_turn = True
		player_symbol = 'X'
		ai_symbol = 'O'
	else:
		player_turn = False
		player_symbol = 'O'
		ai_symbol = 'X'
	while not get_outcome(board):
		print("\nThe board is:")
		print_board(board)
		if player_turn:
			player_move(board, player_symbol)
		else:
			ai_move(board, ai_symbol)
		# not True is False and not False is True, so this little
		# trick is a convenient way to toggle a Boolean value.
		player_turn = not player_turn
	print("\nThe final board is:")
	print_board(board)
	outcome = get_outcome(board)
	if outcome == player_symbol:
		print("Yon won!")
	elif outcome == ai_symbol:
		print("The AI won!")
	else:
		print("It's a draw!")
	# Give some space after the end of the match.
	print("\n")

def ai_move(board, symbol):
	# Pick a random spot. First, compile a list of open spaces.
	open = []
	# We need the counter variables here.
	row_num = 0
	for row in board:
		# col_num has to be reset each row.
		col_num = 0
		for space in row:
			if space == ' ':
				open.append((row_num, col_num))
			col_num += 1
		row_num += 1
	row, col = random.choice(open)
	board[row][col] = symbol

def player_move(board, symbol):
	while True:
		move = input("Enter a row and a space, side by side, like '23' if you want"
			" to go in the 3rd (right) space of the 2nd (middle) row.")
		# Although the user sees them as numbered 1-3, we need to subtract
		# one to use them as indexes, since Python is zero-indexed, meaning
		# the spaces are numbered 0-2.
		row = int(move[0]) - 1
		col = int(move[1]) - 1
		if board[row][col] == ' ':
			board[row][col] = symbol
			return
		print("That space is taken! You can't go there!")

# As far as I can think of, the easiest way to tell whether someone has won
# is to hardcode all the possible combinations of spaces that win. Each space
# is a tuple of the row and column it's at - zero-indexed, of course.
# WAYS_TO_WIN is a tuple because it should never be modified.
WAYS_TO_WIN = (
	# horizontal wins
	((0, 0), (0, 1), (0, 2)),
	((1, 0), (1, 1), (1, 2)),
	((2, 0), (2, 1), (2, 2)),
	# vertical wins
	((0, 0), (1, 0), (2, 0)),
	((0, 1), (1, 1), (2, 1)),
	((0, 2), (1, 2), (2, 2)),
	# diagonals
	((0, 0), (1, 1), (2, 2)),
	((0, 2), (1, 1), (2, 0)),
)

def get_outcome(board):
	# Check if the player's won.
	if has_victory(board, 'X'): return 'X'
	if has_victory(board, 'O'): return 'O'
	# If nobody's won, check if the board is full.
	for row in board:
		for space in row:
			if space == ' ': return
	# If there were any open spaces, we would've
	# returned False when we found them. return
	# an empty space to signify a draw.
	return ' '

def has_victory(board, symbol):
	for way in WAYS_TO_WIN:
		has_all_squares = True
		for row, col in way:
			if board[row][col] != symbol:
				has_all_squares = False
		if has_all_squares:
			return True

# The main part.
while True:
	play()
	if not util.ask_bool("Want to play again?"):
		print("Thanks for playing.")
		break
```

</details>

Once you've done that: want to try improving the AI so it can't lose? I left it out of the main project because it's not essential practice for learning functions, but it's certainly a good exercise, and not as difficult as it sounds if you plan out and pseudocode the AI's strategy before you jump into it. If you feel like it, keep the old random AI function around and name them `random_ai_move` and `smart_ai_move` or something, and let the player pick which one they want to face! (You could have a local variable `ai_move` inside `play`, and set it to `random_ai_move` or `smart_ai_move` after the player picks.)

[Next lesson: Exceptions and IO](pythontut6)
