TITLE The Concise Python Tutorial, part 4: Mutable types
NAV The Concise Python Tutorial, part 4: Mutable types
DESC Lists, mutability and shared reference, methods, and dictionaries.

[Previous lesson: Sequences](pythontut3)

Last time things were starting to get interesting. This time we're going to introduce a few more data types, some of which are *mutable*, which starts to introduce the concept of object identity or reference.

# Lists

The first data type is lists, which are mostly the same as tuples but way more useful in practice. The syntax for list literals uses brackets instead of parentheses:
```python
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
```python
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
```python
>>> nums = [1, 2, 4]
>>> nums[0] = 1.5
>>> nums
[1.5, 2, 4]
```
So you might be wondering why you would ever use tuples. Well, there are at least two reasons you might want your data structures to be immutable. One is if the data is supposed to be a constant, and any modification of it would certainly be a mistake. You might want to just make the list immutable to make sure you don't accidentally modify it. <span class="note">Some languages offer a general way of making it impossible to change a variable, but Python does not.</span> Another reason is that immutable data types have better performance if you don't need them to be mutable; when you make a tuple, you're essentially promising Python that you'll never modify it, which means Python can store it in memory in a more efficient way (adding to a tuple with `+=` does *not* count as modifying the tuple, and I'll explain why in the next section). The other big reason is to avoid shared reference.

# Shared reference

Get ready for something really hard. Remember when I told you that `x += y` is just shorthand for `x = x + y`? That was kind of an oversimplification. It's true *for immutable data types*, but for mutable things like lists, there's a difference.

Mutable data types exhibit **shared reference**. With immutable types, if you assign one variable to another, and then change one, the other stays:
```python
>>> x = 5
>>> y = x
>>> x += 1
>>> x
6
>>> y
5
>>> words = ('hi', 'hello')
>>> words2 = words
>>> words2 += ('hey',)
>>> words2
('hi', 'hello', 'hey')
>>> words
('hi', 'hello')
```
They don't stay linked. Lists, however:
```python
>>> words = ['hi', 'hello']
>>> words2 = words
>>> words2 += ['hey']
>>> words2
['hi', 'hello', 'hey']
>>> words
['hi', 'hello', 'hey']
```
It changed both! That's because there was actually only ever one list. To explain this, let's go on a little detour into how variables work.

There's a crucial difference between a variable and its value. Variables in Python are nothing more than names; all they do is point to some location in your computer's memory that stores an actual value. If you do `nums = [1, 2, 3]`, Python creates a list in memory that contains `[1, 2, 3]`, and defines the name `nums` to point to that location. So if you later do `nums = [4, 5, 6]`, you don't change the list, you change `nums`. This distinction is important. You're creating a new list somewhere else in memory that stores `[4, 5, 6]` and redefining `nums` to point there instead of to the one that contains `[1, 2, 3]`. (If nothing else points to the old list, Python will forget about it.) But when you do `nums2 = nums`, it makes `nums2` refer to the same underlying data as `nums`, as opposed to making an identical copy. You're making a second name that points to the same location in memory.

The `is` operator is really useful for understanding this:
```python
>>> nums = [1, 2, 3]
>>> nums2 = [1, 2, 3]
>>> nums == nums2
True
>>> nums is nums2
False
```
`==` checks whether two values are *equal*. `is` checks whether they're *the same*. Whenever you write a list literal like `[1, 2, 3]`, Python creates a list object in memory that holds those values. That's a separate object, stored in a separate memory location, each time you do that. That's why `nums is nums2` is false - it's like you have two identical red balls, but they're still separate balls, even if they're identical in every way. The `==` operator, on the other hand, checks whether values are equal rather than whether they're the same object, so two distinct-but-identical lists compare as equal with `==`, but not with `is`.

If you set `nums2` directly to `nums` though, instead of to an identical value, `nums2` actually points to the same place in memory as `numss`, which means changing one will change the other.
```python
>>> nums = [1, 2, 3]
>>> nums2 = nums
>>> nums is nums2
True
```

So that's what happened in the words example. When I did `words2 = words`, I was making `words2` point to *the same list*, the same location in memory. So when I changed it, both names saw it as changed. So why didn't this happen with tuples, strings, ints, floats, and bools?

All of those types are **immutable**, meaning Python isn't allowed to actually change them. When you do `words2 += ('hey',)`, what's really happening is that it expands to `words2 = words2 + ('hey',)`, so a second tuple is being created that consists of `words2 + ('hey',)`. The original tuple of `('hi', 'hello')` is not being modified.

When `words2` is a list, on the other hand, `words2 += ['hey']` concatenates `['hey']` to the *existing* list stored in `words2`. We call it adding 'in-place' or *mutating* the existing list, as opposed to making a new one and assigining the new one to the same variable.

But then there's this finding:
```python
>>> words = ['hi', 'hello']
>>> words2 = words + ['hey']
>>> words2
['hi', 'hello', 'hey']
>>> words
['hi', 'hello']
```
If you use `=` (not `+=`), `words2` is reassigned and stops referring to the same list as `words`. I told you the simplified story earlier because for immutable data types, it doesn't matter.

So that's how shared reference works. Sometimes you want this effect, and sometimes you don't. Sometimes you want to change a list in one part of a program and want other places that deal with the same list to see the change. Other times you want them to stay separate even if their values happen to start out equal. When you set one variable to another variable, it shares the reference by default, but there are ways to make a distinct copy if you don't want that (without retyping the literal value). For example, `list2 = list1[:]` would make `list2` a separate but identical list, because **slicing always makes a distinct copy even if you're just slicing the entire thing from start to end**. Changes to one after that would not affect the other.

If shared reference is still confusing to you, you're not alone. I was still tripping over this after a couple years of knowing Python. But it'll come with practice. For now, let's go on.

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
```python
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
```python
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

<details><summary>Solution</summary>

```python
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
        print('The sentence "' + ''.join(wordlist) + '" has been saved.')
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

</details>

# Dictionaries

Another crucial data type is the dictionary (usually just called a dict). A real dictionary has a definition for each word. A Python dict has a 'value' for each 'key', and you can lookup a key to get its value:
```python
>>> spanish = {'casa': 'house', 'hola': 'hello', 'si': 'yes'}
>>> print(spanish['casa'])
'house'
```
How neat is that!

Dicts don't respect order, by the way, so `{'a': 'z', 'b': 'y'}` and `{'b': 'y', 'a': 'z'}` are identical dicts.

Dicts don't store duplicates, so when you assign to a key, it gets that value regardless of what it had or whether it existed before:
```python
>>> spanish['hablar'] = 'talk'
{'casa': 'house', 'hola': 'hello', 'si': 'yes'}
>>> spanish
{'casa': 'house', 'hola': 'hello', 'si': 'yes', 'hablar': 'talk'}
>>> spanish['hablar'] = 'speak' # the verb more or less covers both English words
>>> spanish
{'casa': 'house', 'hola': 'hello', 'si': 'yes', 'hablar': 'speak'}
```
To remove a key from a dictionary, you can use `del`:
```python
>>> del spanish['hola']
>>> spanish
{'casa': 'house', 'si': 'yes', 'hablar': 'speak'}
```
When you try to access a dictionary key that doesn't exist, you get an error:
```python
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
```python
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

<details><summary>Solution</summary>

```python
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

</details>

[Next lesson: Functions](pythontut5)
