TITLE Spem conlang ASCII transliteration scheme
NAV ASCII transliteration scheme
TEMPLATE DEFAULT

Spem transliteration mostly revolves around the overloading of 'h' and ' as an
[escape character](/computing/escape_sequences). Letters are transformed as follows:

* ɪ -> ih
* ɵ -> oh
* ʌ -> uh
* ɑ -> ah
* ʃ -> sh
* θ -> th
* ŋ -> ng

Whenever one of the sequences on the right appears literally in Spem text, a ' is inserted in the middle.

For fun and on the very small chance that it's useful, here's Python code to transliterate:

```
def utf8_to_ascii(spem):
	return spem \
		.replace('ih', "i'h") \
		.replace('oh', "o'h") \
		.replace('uh', "u'h") \
		.replace('ah', "a'h") \
		.replace('sh', "s'h") \
		.replace('th', "t'h") \
		.replace('ng', "n'g") \
		.replace('ɪ', 'ih') \
		.replace('ɵ', 'oh') \
		.replace('ʌ', 'uh') \
		.replace('ɑ', 'ah') \
		.replace('ʃ', 'sh') \
		.replace('θ', 'th') \
		.replace('ŋ', 'ng')
```

And to reverse it:

```
def ascii_to_utf8(spem):
	return spem \
		.replace('ng', 'ŋ') \
		.replace('th', 'θ') \
		.replace('sh', 'ʃ') \
		.replace('ah', 'ɑ') \
		.replace('uh', 'ʌ') \
		.replace('oh', 'ɵ') \
		.replace('ih', 'ɪ') \
		.replace("n'g", 'ng') \
		.replace("t'h", 'th') \
		.replace("s'h", 'sh') \
		.replace("a'h", 'ah') \
		.replace("u'h", 'uh') \
		.replace("o'h", 'oh') \
		.replace("i'h", 'ih')
```
