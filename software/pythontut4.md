TITLE The Concise Python Tutorial, part 4: Mutable types
NAV The Concise Python Tutorial, part 4: Mutable types
TEMPLATE DEFAULT
DESC Lists, mutability and shared reference, methods, and dictionaries.

[Previous lesson: Sequences](pythontut3)

Last time things were starting to get interesting. This time we're going to introduce a few more data types, some of which are *mutable*, which starts to introduce the concept of object identity or reference.

# Lists

The first data type is lists, which are mostly the same as tuples but way more useful in practice. The syntax for list literals uses brackets instead of parentheses:
```
>>> nums = [1, 7, 4]
>>> nums[2]
4
>>> nums + [3, 13]
[1, 7, 4, 3, 13]
```
Indexing, slicing, and the rest of the bag work exactly the same as they do on tuples, and you can have lists of lists, or lists of tuples, or tuples of lists.

So what's the big difference?

# Mutability

If you played with tuples and strings, you might've noticed that you can't assign to individual items in them:
```
>>> nums = (1, 2, 4)
>>> nums[1] = 3
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'tuple' object does not support item assignment
>>> word = 'hello'
>>> word[2] = 'x'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'str' object does not support item assignment
```
(If this were possible, I would've given you an exercise involving it for part 3.)

And that's what's so important about lists: they're mutable.
```
>>> nums = [1, 2, 4]
>>> nums[0] = 1.5
[1.5, 2, 4]
```
So you might be wondering why you would ever use tuples. Well, there are at least two reasons you might want your data structures to be immutable. One is if the data is supposed to be a constant, and any modification of it would certainly be a mistake. You might want to just make the list immutable to make sure you don't accidentally modify it. <span class="note">Some languages offer a general way of making it impossible to change a variable, but Python does not.</span> (Immutable data types also have better performance if you aren't going to modify them.) The other big reason is to avoid shared reference.

# Shared reference

Get ready for something really hard. Remember when I told you that `x += y` is just shorthand for `x = x + y`? That was kind of an oversimplification. It's true *for immutable data types*, but for mutable things like lists, there's a difference.

Mutable data types exhibit **shared reference**. With immutable types, if you assign one variable to another, and then change one, the other stays:
```
>>> x = 5
>>> y = x
>>> x += 1
>>> y
5
>>> words = ('hi', 'hello')
>>> words2 = words
>>> words += ('hey',)
>>> words2
('hi', 'hello')
>>> words
('hi', 'hello', 'hey')
```
They don't stay linked. Lists, however:
```
>>> words = ['hi', 'hello']
>>> words2 = words
>>> words += ['hey']
>>> words2
['hi', 'hello', 'hey']
>>> words
['hi', 'hello', 'hey']
```
It changed both! That's because there was actually only ever one list. `words` was set to refer to a list, then `words2` was set to the value of `words`, so when you change one, both names see it as changed. Whereas with tuples or strings or ints, since they're immutable, when you do `words2 += ('hey',)`, what's really happening is that it expands to `words2 = words2 + ('hey',)`, so a second tuple is being created that consists of `words2 + ('hey',)`. When `words2` is a list, on the other hand, `words2 += ['hey']` concatenates `['hey']` to the *existing* list stored in `words2`. We call it adding 'in-place' or *mutating* the existing list, as opposed to making a new one and assigining the new one to the same variable.

But then there's this finding:
```
>>> words = ['hi', 'hello']
>>> words2 = words
>>> words2 = words2 + ['hey']
>>> words
['hi', 'hello']
>>> words2
['hi', 'hello', 'hey']
```
If you use `=` (not `+=`), `words2` is reassigned and stops referring to the same list as `words`. I told you the simplified story earlier because for immutable data types, it doesn't matter.

To understand how this works, you need to understand the difference between a variable and its value. Variables in Python are nothing more than names. If you do `nums = [1, 2, 3]` and then later `nums = [4, 5, 6]`, you don't change the list, you change `nums`. This distinction is important. The list itself is a block of data stored in memory somewhere. The new list is stored in a different memory location. But when you do `nums2 = nums`, it makes `nums2` refer to the same underlying data as `nums`, as opposed to making an identical copy.

The `is` operator is really useful for understanding this:
```
>>> list1 = [1, 2, 3]
>>> list2 = [1, 2, 3]
>>> list1 == list2
True
>>> list1 is list2
False
```
`==` checks whether two values are *equal*. `is` checks whether they're *the same*. If you do this with tuples you'll find that `tuple1 is tuple2` would be True. That's because, since tuples are immutable, when you assign the same tuple literal to two variables, Python doesn't make a second copy in memory; it just sets both variables to point to the same object. But when you do it with lists, Python has to assume you want them to be able to change independently, so it has to make a second copy.

It's important to understand that *shared reference is good sometimes and bad other times*. Sometimes you want to change a list in one part of a program and want other places that deal with the same list to see the change. Other times you want them to stay separate even if their values happen to start out equal. When you set one variable to another one that refers to a mutable object, it shares the reference by default, but there are ways to make a distinct copy if you don't want that (without retyping the literal value). For example, `list2 = list1[:]` would make `list2` a separate but identical list. Changes to one after that would not affect the other.

If shared reference is still confusing to you, you're not alone. I was still tripping over this after a couple years of knowing Python (I think I'm over it now). But it'll come with practice. For now, let's go on.

### Converting between lists and tuples

By the way, you can use the `list` or `tuple` functions to convert between lists and tuples, or to convert strings to either (but using `str` on a list or tuple doesn't do what you might expect - it gives you the representation you get when you print them).

## Comparing other types

<!--I bet these should've been introed gradually.-->

While we're at it, it's about time I mention that all of the comparison operators work on things besides numbers. On strings, the greater-than and less-than operators treat strings as if characters with higher values are 'greater' - in other words, they alphabetize them. Actually, that's an oversimplification.

You might have already heard of [ASCII](https://en.wikipedia.org/wiki/ASCII). Internally, a string is a sequence of bytes, each one representing a character. For example, the byte `1100001` (97 in decimal) is `a`. (`A` is `1000001` - 65.) The full ASCII table is [available here](http://www.asciitable.com), or on countless other websites. <span class="note">Technically, Python strings use UTF-8, not ASCII. But that's a discussion for another time, and UTF-8 is fully backward-compatible.</span>

For Booleans, `True` is considered greater than `False`. In fact, if you play around besides the code I'm showing you, you might've already noticed that `True` and `False` can be used as `1` and `0`. If you didn't, try `print(True + True + False + True)`.

For a list or tuple, comparison is done by comparing each element in sequence, and the first time it finds a pair that isn't equal, the list with the greater element is considered greater. This behavior can be thought of as a generalization of how string comparison works, although a string is not the same as a list or tuple of characters. <span class="note">In many other languages, there's a separate `char` data type, and a string is a list of `char`s. But in Python, strings are their own data type.</span>

## `None`

There's a special value called `None` that's very similar to `False`, but useful to have as an alternative. The difference in functionality is that `None` can't act like 0 or be compared with other numbers (that raises a `TypeError`). `None` does evaluate to `False` when used as a condition. But using `None` instead of `False` can make your code clearer, because setting a variable to `False` implies that it's only ever supposed to have a boolean value. Using `None` communicates that the variable is meant to hold another type of value at some point or in some situation, but doesn't right now. I'll show you an example later where using `None` is better than using `False`, even though either would work.

# Methods

I didn't really want to talk about methods until we got to objects or at least to functions, but oh well, I can't avoid this any longer. For now, let's just say that methods are basically functions attached to a specific data type and with a special `.` syntax. Here's an example:
```
>>> nums = [5, 4]
>>> nums.remove(5)
>>> nums
[4]
```
So lists have this `remove` method that takes a value and deletes the first element in the list that is that value. (It does only get the first one; if `nums` were `[5, 4, 5]`, it would've been `[4, 5]` after the operation.)

<div class="highlight" markdown="1">

**Important jargon**: the value a function **returns** is the value it's replaced with when you execute it. For example, `input` *returns* the text entered.

</div>

The `remove` method of lists doesn't return anything, or to be more accurate, it returns `None`.

Strings have a few cool methods I didn't mention before (no need to memorize all these):
```
>>> word = 'hello'
>>> word.index('e')
1
>>> word.count('l')
2
>>> word.startswith('h')
True
>>> word.endswith('o')
True
>>> word.replace('l', 'x') # note that this doesn't modify the word, as I'll show on the next line
'hexxo'
>>> word # original word is unchanged. Since strings are immutable, all their methods return a new string.
'hello'
>>> sentence = "Hello, my friend."
>>> sentence.split(' ')
['Hello,', 'my', 'friend.']
>>> sentence.upper()
'HELLO, MY FRIEND.'
>>> sentence.lower()
'hello, my friend.'
>>> sentence.title()
'Hello, My Friend.'
>>> '...'.join(["hello", "my", "friend"]) # See how this works?
'hello...my...friend'
```
And many others. Lists and tuples also have `count` and `index`.

# Other useful list methods

* `list.append(value)` - adds the value to the list in-place. Note that this way, you don't have to put brackets around it. (It's also slightly faster than using `+=`.)

* `list.pop(i)` - removes the element at position `i` (default `-1`), and return it.

* `list.insert(index, value)` - inserts the given `value` at the given `index`.

* `list.reverse()` - reverses it in-place.

* `list.clear()` - removes all elements. The difference between this and setting the variable to `[]` is that reassigning breaks shared references; `list.clear()` changes the list in-place.

Even ints and floats have some methods, but they're all pretty obscure.

# Sentence manipulator

To use your newfound knowledge of mutable lists, methods, and shared reference, try writing a program that gets a sentence from the user, and then lets them do the following things to it until they're done:

* Insert a word
* Remove all occurences of a word
* Remove the word at a specified position
* Save the sentence incase they do something accidentally, and revert the sentence to its saved state

And whatever other operations you want to implement.

When they're done manipulating their sentence, print it out with the first word capitalized like a proper sentence. Then print the number of times each letter occurs in the sentence.

<expand-note opentext="Hide solution" closedtext="Show solution">

```
menu = """
    insert - specify a word to insert and the position to put it at
    remove - specify a word to be removed
    pop - specify a position to remove the word at that position
    save - save the sentence's current state
    load - restore the saved sentence
    done - print out the final sentence
"""

sentence = input("enter a sentence: ")
wordlist = sentence.split(' ')
save = None
while True:
    print("The following operations are available:\n" + menu)
    operation = input("What do you wanna do? ")
    if operation == 'insert':
        word = input('What word should we insert? ')
        position = int(input('And what position should we put it at? '))
        if position >= len(wordlist):
            print("Unfortunately, there aren't that many words, so that's an invalid position.")
            continue
        wordlist.insert(position, word)
    elif operation == 'remove':
        word = input("What word should we remove? ")
        # Remove all of them, not just the first one.
        while word in wordlist:
            wordlist.remove(word)
    elif operation == 'pop':
        position = int(input('Which number word should we remove? '))
        if position >= len(wordlist):
            print("Unfortunately, there aren't that many words, so that's an invalid position.")
            continue
        wordlist.pop(position)
    elif operation == 'save':
        save = wordlist[:]
        print('The sentence "' + sentence + '" has been saved.')
    elif operation == 'load':
        if save is None:
            print("Sorry, but it looks like you forgot to save the sentence.")
        else:
            wordlist = save[:]
    elif operation == 'done':
        break
    else:
        print("That's not a valid choice. Try again.")
    print("The sentence is currently:", ' '.join(wordlist))

# Capitalize the first word.
wordlist[0] = wordlist[0].title()

new_sentence = ' '.join(wordlist)
print("Your final sentence is:\n" + new_sentence)

print("\nLetter frequency:")
for letter in "abcdefghijklmnopqrstuvwxyz":
    frequency = new_sentence.lower().count(letter)
    # Don't print the number of times if it's 0.
    if frequency:
        print(letter, "appears", frequency, "times")
```

</expand-note>

# Dictionaries

Another crucial data type is the dictionary (usually just called a dict). A real dictionary has a definition for each word. A Python dict has a 'value' for each 'key', and you can lookup a key to get its value:
```
>>> spanish = {'casa': 'house', 'hola': 'hello', 'si': 'yes'}
>>> print(spanish['casa'])
'house'
```
How neat is that!

Dicts don't respect order, by the way, so `{'a': 'z', 'b': 'y'}` and `{'b': 'y', 'a': 'z'}` are identical dicts.

Dicts don't store duplicates, so when you assign to a key, it gets that value regardless of what it had or whether it existed before:
```
>>> spanish['hablar'] = 'talk'
{'casa': 'house', 'hola': 'hello', 'si': 'yes'}
>>> spanish
{'casa': 'house', 'hola': 'hello', 'si': 'yes', 'hablar': 'talk'}
>>> spanish['hablar'] = 'speak' # the verb more or less covers both English words
>>> spanish
{'casa': 'house', 'hola': 'hello', 'si': 'yes', 'hablar': 'speak'}
```
To remove a key from a dictionary, you can use `del`:
```
>>> del spanish['hola']
>>> spanish
{'casa': 'house', 'si': 'yes', 'hablar': 'speak'}
```
When you try to access a dictionary key that doesn't exist, you get an error:
```
>>> spanish['entender'] # it means 'understand', by the way, but I haven't put it in the dictionary
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'entender'
```

Useful dict methods:

* `dict.get(key)` - like accessing the key, but if the key doesn't exist, you'll get `None`.

I guess now that you know dicts, there's one more case where you would use tuples instead of lists: dictionary keys can't be lists, other dicts, or other built-in mutable types. This is probably a consequence of how the dictionary is stored in memory (and I couldn't explain to you exactly why), but it is, so you can use tuples if you want a sequence of values to be a dict key.

### Iterating on dicts

`for` and `in` both treat dicts as sequences of keys, so:
```
>>> 'casa' in spanish
True
>>> 'house' in spanish
False
>>> for word in spanish:
...   print(word, 'means', spanish[word])
casa means house
hola means hello
si means yes
hablar means speak
```

# Score reporter!

Here's a (hopefully) fun project. Write a program that lets a group of people each enter their names and a list of scores they got. Then, when the user(s) confirm they're done, print the highest score and the name of the person who got it, and the average score of each person.

Some functions that will help you here are the builtin `max` and `sum`, which take a sequence of any type and give you the max or total value, if applicable. (If you use them on a sequence of values that can't be compared, like `max([4, 'a'])`, you'll get an error.) You can do it without these, by implementing their logic yourself, but using the builtin ones will save you some effort.

<expand-note opentext="Hide solution" closedtext="Show solution">

```
# The value of each key will be a nested dict of all
# the player's data: 'scores', 'max', and 'average'
data = {}

while True:
    name = input("Enter your name (blank to finish):")
    if not name: break
    # Initialize a blank list of scores for them.
    data[name] = {'scores': []}
    while True:
        score = input("Enter a score (blank to finish):")
        if not score: break
        data[name]['scores'].append(int(score))
    # Now that we have all their scores, compute stats for them.
    data[name]['average'] = sum(data[name]['scores']) / len(data[name]['scores'])
    data[name]['max'] = max(data[name]['scores'])

grand_max = {'name': '', 'score': 0}
for player in data:
    # If this player has a higher score than the highest we've found yet,
    # make them the new highest.
    if data[player]['max'] > grand_max['score']:
        grand_max = {'name': player, 'score': data[player]['max']}

print("The highest score ever was", grand_max['score'], "by", grand_max['name'])

print("Everyone's average score:")
for player in data:
    print('\t' + player + ":", data[player]['average'])
```

</expand-note>

[Next lesson: Functions](pythontut5)