TITLE The Concise Python Tutorial, Lesson 3: Sequences
NAV The Concise Python Tutorial, Lesson 3: Sequences
DESC Python sequence data types and operations: indexing, slicing, iterating and tuples

[Previous lesson: Flow control](pythontut2)

This time we're going through **sequence** data types, and all the kickass things you can do with them. Actually, you've kind of already seen a sequence type: strings. Strings are a sequence of characters. Technically, in Python, strings are a special case and different from other sequence data types, but you can still do a lot of sequencey things to them. Once you've seen a few, I'll introduce the `tuple` data type.

# Indexing

The most basic feature of sequences is the ability to access a specific item inside them. This is done like this:

```python
>>> "Hello"[3]
'l'
```

<div class="highlight">

A critical property of indexes is that **they start at 0**. `"Hello"[0]` is `'H'`. `"Hello"[1]` is `'e'`. This is actually pretty common in computing.

</div>

You can also, of course, index with a variable.
```python
>>> i = 1
>>> "Hello"[i]
'e'
```

**Exercise:** make a program that asks the user for a string, and then a number, and prints out the character at that position in the string. (For extra fun, do it in one line.)

<details><summary>Solution</summary>

```python
print(input("enter a string:")[int(input("enter a number:"))])
```
This might look hard to parse - indeed, it's bad enough that a serious programmer might do it on multiple lines [just for readability's sake](readability) - so I'll dissect it for ya. Assuming I enter `blah` and `3`, the code can be parsed like this:

1. `input("enter a string:")` is replaced with the string entered, leaving: `print('blah'[int(input("enter a number:"))])`

2. `input("enter a number:")` is replaced with the next string entered, leaving: `print('blah'[int('3')])`

3. `int('3')` is replaced with `3`, leaving: `print('blah'[3])`

</details>

## Negative index

You might've already thought to try this and figured out how it works, but what happens if you run `"Hello"[-1]`?

<div class="highlight">

Negative indices start from the end. Note that this means *they are not subject to zero-indexing*, since -0 is the same as 0. 0 is the first element, 1 is the second element, -1 is the last element, -2 is the second-last. If you find this confusing, you're not alone :)

</div>

## `len`


If you try to access an element that doesn't exist, such as `'blah'[10]`, you'll get an error. This is a good time to introduce the handy `len` function that can help you avoid this:
```python
>>> len("hi")
2
```
**Exercise:** modify the string indexing program so that it won't crash if the user asks for an invalid index, but print a message instead.

# Slicing

Another super cool feature of sequences is *slicing*: the ability to index a range of elements at a time.
```python
>>> 'pizza'[1:3]
'iz'
```
It gives us a string that starts at position 1 and ends at position 3, giving us characters #1 and #2. (You can think of this like a slice is always *from and including* the start position and *up to but not including* the end position.)

If you omit one or both numbers of the slice, it goes to the beginning or end:
```python
>>> 'pizza'[2:]
'zza'
>>> 'pizza'[:2]
'pi'
```
Note that `'pizza'[:-1]` is `'pizz'` while `'pizza'[:]` is `'pizza'`. An omitted start position is the same as `0`, but an omitted end position is *not* the same as `-1`. `-1` is the last item, so slicing up to `-1` cuts it out.

An invalid slice range, where the start position is greater than the end position (like `[5:1]`), will just quietly return an empty string.

**Exercise**: Try making a program that accepts a string and then prints it back limited to a specified max length. If the string has to be cut off, it should end with `...` to indicate there's more - but the total printed length should be exactly the maximum, including the ellipsis. For example, if you choose 10 as the max length and I enter `Hi my friend`, it should print `Hi my f...`.

<details><summary>Solution</summary>

```python
limit = 10
msg = input("Type a string to truncate to " + str(limit) + " characters: ")

if len(msg) > limit:
    msg = msg[:limit-3] + "..."

print(msg)
```

</details>

## Slice step

Okay, this is a rather obscure feature, but I might as well demonstrate it while I'm talking about this. You can have a third number inside the slice brackets, which specifies the "step" size:
```python
>>> 'abcabcabcabcabc'[::3]
'aaaaa'
```
This slices from the beginning (because start position is omitted) to the end (because end position is omitted), selecting only every third character. You can think of the step size as defaulting to 1.

# Iteration

<div class="highlight">

Jargon: **iterate**: to loop with a sequence and do something with each element inside it. It can be used with either "on" or "over" as a preposition.

</div>

**Exercise**: use your knowledge of loops and indexing to write a program that gets a string from the user and then prints out each character inside it on its own line. (I'm about to introduce an easier way of doing this, but I want you to see how it can be done without it.)

<details><summary>Solution</summary>

```python
string = input("give me a string:")
index = 0
while index < len(string):
    print(string[index])
    index += 1
```
Note that I couldn't put the `input("give me a string:")` that defines the variable `string` inside the condition like `while index < len(input("give me a string:")):`. If you tried to solve this yourself before looking at the solution (which you should have), you probably ran into this, but the reason that doesn't work is that a `while` loop's condition is **evaluated** every time it's checked, since it has to know when to stop. So every time it loops, it would ask, is `index < len(input("give me a string:"))`?. And every time it asks that, it would execute `input("give me string:")` to find out what its value was, which means the user would be asked to enter a new string after every iteration of the loop. The solution was to execute `input("give me a string:")` once at the beginning, and store the value, so that when the `while` loop evaluates its condition every time, it's only asking whether `index` is less than the length of `string`, where `string` is the *result* of `input("give me a string:")`. This way, it doesn't ask the user for a new string every time.

</details>

## `for`

One of the most important keyword related to sequences: `for` is an alternate loop construction that makes iterating on a sequence much easier:
```python
for letter in input("enter a word:"):
    print(letter)
```
Note that with `for`, the expression that tells it the sequence to be iterated (in this case, the result of `input("enter a word:")`) is only evaluated once, and then it just internally runs the loop with `letter` set to each character in that string. So with `for` it's safe to put the `input` in the `for` line.

In general, in Python you should never have to iterate in the fashion I had you come with before I told you about this, but many other languages require it (C, Javascript in some situations), so it's a very good problem to have solved.

**Another problem you can solve now**: make a program that gets a string from the user, and then a letter, and determines whether the letter is in the string.

<details><summary>Solution</summary>

```python
string = input("give me a string:")
char_to_find = input("give me a single character:")
found = False
for char in string:
    if char == char_to_find:
        found = True
if found:
    print(char, 'is in', string)
else:
    print(char, 'is not in', string)
```

</details>

## `in`

Yes, the problem I just made you solve was another unnecessary one :P You can use `in` outside of the context of `for` to test whether something is inside a sequence:
```python
>>> 'e' in 'Hello'
True
>>> 'x' in 'Hello'
False
```
Well isn't that neat! I just wanted you to solve this problem the hard way as an intellectual exercise, and because many other langugaes don't have this keyword or anything equivalent to it. (C doesn't; Go only has it for strings, but not for other sequence types.)

Additionally, on strings, `in` works with multi-character substrings. Check this out:
```python
>>> 'He' in 'Hello'
True
>>> 'eH' in 'Hello'
False
```
Testing whether a multi-character string is inside of another string manually is a nightmare compared to this. (If you want, take a stab at it.)

`not in` works the way you expect, even though, technically, you should expect it to be `not (x in y)` (which does also work). After all, `x not > y` is a syntax error. Basically, it's like `not in` is an operator in its own right.

## `break` and `continue`

Now that we're iterating on stuff, it's a very good time to introduce two handy keywords used in loops: the `break` statement, which exits the loop immediately even if its condition is still true, and `continue`, which skips the rest of the current iteration, and continues from the top of the loop. Here's a demo of both:
```python
number = 0
while number < 10:
    number += 1
    if number == 5: # skip 5 for no reason
        continue
    print("the next number is", number)
    if input("want to see another? (y/n)") == 'n':
        break
```

# Tuples

Tuples are a more general sequence data type. They store an arbitrary list of arbitrary values. The syntax for tuple literals is to enclose them in brackets and separate elements by commas:
```python
>>> nums = (6, 1, 4)
>>> nums
(6, 1, 4)
>>> nums[0]
6
>>> for num in nums:
...  print(num)
6
1
4
>>> greetings = ("Hi", "Hello", "Good day", "Salutations")
>>> greetings[2]
"Good day"
>>> for greeting in greetings:
...  print(greeting)
Hi
Hello
Good Day
Saluations
>>> print(greetings[:2])
('Hi', 'Hello')
```
As you can see, tuples are subject to indexing, slicing, and the rest of the bag the same way strings are, but they aren't limited to holding strings; they can hold ints, floats, strings, Booleans, or any other type of value.

<div class="highlight">

**Warning!** Declaring a tuple with only a single element isn't done the way you might expect! `nums = (5)` does not make a tuple; since parentheses are also used as mathematical or logical operators, that statement would just set `nums` to `5`. Python only interprets parentheses as enclosing a tuple if there's at least one comma inside (or if there's nothing inside). To set `nums` to a one-element tuple, you could do `nums = (5,)` - unnecessary trailing commas are permitted. Actually, you can even just write `nums = 5,`.

</div>

You can also add tuples together:
```python
>>> nums = (1, 2, 3)
>>> more_nums = (4, 5, 6)
>>> nums + more_nums
(1, 2, 3, 4, 5, 6)
```
<div class="highlight">

Something I struggled with when learning Python was trying to add a single element to a tuple like: `nums += 5`. This would raise a `TypeError`, saying `can only concatenate tuple (not "int") to tuple`. Remember, since `var1 += var2` is shorthand for `var1 = var1 + var2`, `nums += 5` is saying `nums = nums + 5`. To add something to a tuple, the new addend has to itself be made into a tuple, like: `nums += (5,)`.

</div>

In fact, you can also multiply tuples:
```python
>>> nums = (1, 2, 3)
>>> nums * 3
(1, 2, 3, 1, 2, 3, 1, 2, 3)
```
But this is very rarely useful.

There is one difference in the way the `in` operator works: with "real" sequences, like tuples, `in` only tests if one of the members of the sequence after `in` is equal to the element before `in`. With strings, `in` does "in a row" checking rather than "is a member" checking, so `"he" in 'hello'` evaluates to `True`, but with tuples, `('h', 'e') in ('h', 'e', 'l', 'l', 'o')` or `(5, 3)` in `(5, 3, 6)` evaluates to `False`, because none of the members of the tuple on the right is the tuple on the left. The reason for this behavior is that, as you may have guessed, you can have a tuple of tuples:

## Nested tuples
```python
>>> high_scores = (("Alice", 1260), ("Bob", 1135), ("Carl", 1390))
>>> for score in high_scores:
...   print(score[0], 'scored', score[1])
...
Alice scored 1260
Bob scored 1135
Carl scored 1390
>>> high_scores[1][0] # demonstrating double-indexing: high_scores[1] is ('Bob', 1135)
'Bob'
```
Isn't that cool! Each element in `high_scores` is a tuple that holds a name in position 0 and a score in position 1. `('Alice', 1260) in high_scores` would evaluate to `True`. (Strings don't have the concept of nested sequences in the way tuples do, so strings are the only sequence type that have the "in a row" behavior for `in` instead of "is a member".)

This is also a good time to introduce a couple of minor features about line breaks.

### Line continuation

When you need to break a statement across multiple lines, you're allowed to do so if it's enclosed in parentheses or brackets:
```python
names = (
    'Alice',
    'Bob',
    'Carl',
    'Dana',
    'Elijah',
    'Fiona',
)
```
(The comma after the last element is optional, but I always add it when I'm doing multiline things like this. I find it looks nicer and makes it easier to change the order of the elements.)

But if it's not with parentheses or brackets, you need to use a backslash at the end of the line:
```python
# This will raise a syntax error:
#sentence = "The " + "quick " + "brown " + "fox " +
#    "jumps"

# This works:
sentence = "The " + "quick " + "brown " + \
    "fox " + "jumps " + "over " + \
    "the " + "lazy" + "dog"
```

You can also put two string literals together *without* the `+`, and it will be assumed:
```python
>>> print("hello" "friend")
hellofriend
```
I don't recommend using this though. I find it less clear than using `+` and it's at most 2 characters shorter, and most other languages don't have it, so it's not a good habit to build. (It also only works on string literals, not string variables.) I honestly wish it wasn't in the language. [It made me have to include this section to explain it](features), which costs both my time and yours.

### Inline blocks

So far, we've always put the block of an `if`, `while`, or similar keyword indented under the condition, but if it's only one line, you can actually do this:
```python
>>> if True: print("logic has not been broken")
logic has not been broken
```
You can't nest them, though, even if they could theoretically all be on one line:
```python
>>> for letter in "hi": if letter != 'h': print(letter)
  File "<stdin>", line 1
    for letter in "hi": if letter != 'h': print(letter)
                         ^
SyntaxError: invalid syntax
```

The most common time I use inline blocks is with `break` and `continue`.

### Semicolons

You should also be aware of semicolons. You can put multiple unrelated statements on one line by using a semicolon:
```python
>>> a = 5; print(a)
5
```
You generally shouldn't, though, because it's [less readable](https://yujiri.xyz/software/readability) to have multiple, semantically distinct instructions on one line. <!--(In fact, some Python linters consider this always wrong and will print a warning if they ever see you doing it.)-->

### Triple-quioted strings

Another thing I'll talk about while we're on the topic of line continuations: Triple-quoted strings, enclosed on both sides with `"""` or `'''`, are allowed to span multiple lines without a backslash.
```python
message = """Incoming transmission:

Hi, I hacked Yujiri's website and replaced his original example string with this!

Plz don't point this out to him. I'm wondering how long it'll be before he notices.
Also, I don't want him to plug his security hole :P"""
```
These are often used when you need to store a big message in a string, like help text for a command-line tool.

### Multiple assignment

Quick trick: it's possible to assign two variables to the same value in one line without a semicolon:
```python
>>> a = b = 5
>>> print('a is', a, 'and b is also', b)
a is 5 and b is also 5
```
This feature isn't useful very often, but I should mention it.

### Convention: capitalizing variable names

By convention, variable names in Python are all-lowercase, but there's an exception. *Constants* (variables that are meant to never change) are often written in all caps. I'm saying this because I'm going to use it in the following project, and don't want it to look weird.

# Censorship simulator!

With that, you're ready to write a much more fun program than you did in the last chapter.

The government hires you to write a program to automatically censor messages that contain politically unacceptable speech. There's a predefined set of words you're searching for (for the exercise, you can pick what they are). Your program must accept multi-line input (a blank line signals the end of the message) and then output: the message with all lines containing dirty words removed; and some metadata for the overseer of the censorship department, including an account of which unacceptable words were found in the message (all listed on one line, without the parentheses you get when you print a tuple, but with commas placed appropriately), and the number of lines removed.

For example, if the words to be censored are "oppress", "free", and "rebel", and the message is:
```
I wanted to do X today, but it was illegal.
This is terrible. We shouldn't be prevented from doing X.
We need to do something about our oppression. What if we rebelled?
I don't know, maybe I'm just getting crazy ideas.
It wouldn't work anyway, right?
Oh well, I guess there's nothing we can do about it.
I'll have to go do Y instead. I didn't want to do Y, though.
I just wish we had more freedom.
```
The program should output:
```
I wanted to do X today, but it was illegal.
This is terrible. We shouldn't be prevented from doing X.
I don't know, maybe I'm just getting crazy ideas.
It wouldn't work anyway, right?
Oh well, I guess there's nothing we can do about it.
I'll have to go do Y instead. I didn't want to do Y, though.

words found: oppress, rebel, free
lines removed: 2
```

This is supposed to be a fairly difficult project for someone with no programming experience outside of these three lessons. Give it some time. When I learned Python from the book that taught me, some of the end-of-chapter projects took me a few hours, but if you can solve a problem of this caliber on your own, then you're really catching on.

<details><summary>Solution</summary>

```python
WORDS = ('free', 'liberty', 'tyrant', 'tyranny', 'oppress', 'rebel', 'revolt', 'revolution')
caught = ()
removed = 0
message = ''

while True:
    line = input()
    # empty line signals end of input
    if not line: break
    # since this is after we break out if the line was empty,
    # everything after this in the loop is dealing with a non-empty line.
    # next step: search for dirty words.
    censor = False
    for word in WORDS:
        if word in line:
            # if we find a dirty word, mark the line to be
            # censored, but don't break since we want to see
            # if there are any other dirty words in it.
            censor = True
            # add it to the list of words we've
            # found if it isn't already in there.
            if word not in caught: caught += (word,)
    if censor:
        removed += 1
    if not censor:
        # re-add the newline, since input strips it
        message += line + '\n'

print(message)

# statistics
words_caught_str = ''
for word in caught:
    words_caught_str += word
    if caught[-1] != word: # avoid putting a comma after the last word.
        words_caught_str += ', '
print("words found:", words_caught_str)
print("lines removed:", removed)
```

</details>

[Next lesson: Mutable types](pythontut4)
