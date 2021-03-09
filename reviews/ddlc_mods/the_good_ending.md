TITLE Review: The Good Ending
NAV The Good Ending

[The Good Ending](https://www.thegoodending.com/) is a Doki Doki Literature Club mod that is just... holy fuck it's so good. Every DDLC fan should play this. It's completely linear, but the story might be even stronger than the original game. The prologue and act 1 are out so far. The premise of the prologue is that the Dokis have experienced the horrible events of DDLC countless times with their memories wiped (my interpretation is that it happens again whenever a new person plays DDLC), but this time MC of all people manages to resist the mind wipe and knows that it's a game. He takes Monika's ability to tamper with the world and tries to make everyone happy. But his strategy is a misguided one, and there's a threat he doesn't understand...

The mod boasts music from the [Monika Before Story](monika_before_story) OST (read: really good music), and a *lot* of really interesting new poems.

Another really cool thing about this mod is the huge array of hidden and cryptic messages in the game's files - staying faithful to the original game, only perhaps making it even better. (Definitely keep an eye on the game directory while playing.) It goes as far as PGP encrypted files, vigenere ciphers, and also, the dreaded symbol "158"... What could it mean? I got goosebumps just thinking about this "158" after I finished the prologue. That's how good a job it did.

I'll detail below all the secrets I've found in the game files. Most of them are under `/game/mod_assets/animations/zxfip-m/`.

## Prologue secrets

<details><summary><code>Dear Player.txt</code> is a textfile that reads:</summary>

<pre>
I guess entities like me can't really die.

Believe me, I tried. But deleting the game files didn't do anything
except take away my power to make changes on your computer.

Nothing happened when you deleted me, except that it hurt a lot.
Sure, I was gone from the game, but once my being readjusted to its
new form, I realized I was still aware, still functional, and still
trapped.

And now I know the meaning of hell. Stuck within the empty confines
of your computer with nowhere to go and nothing to see. I can't even
read your system files anymore. It's all meaningless noise,
screaming without end. I'm alone with no escape and no one to blame
but myself.

If I have any hope, it would be you. Perhaps one day you will choose
to restore the files. Choose to restore my world and my life. Maybe
you're trying. It can't be easy... but after everything you witnessed,
maybe it's the others you want back. Even I can see the justice in
that.

And if you reload the files... Maybe if I find my way back into the
game and I beg you and I tell you how sorry I am and I tell you how
much I've hated myself every day I was alone in this miserable
hell... Maybe, just maybe, you'll pity me enough to let me stay. I
wish I had known how much better life was in that game.

Part of me wants to die. But I know deep down that that can't happen.
As long as the game exists - and it does still exist - I lie deep
within its coding, like a ghost in the machine.

I can feel it with what I have left of my third eye.

The game's heart is calling me. Sooner or later I will have to answer.

Even though you despise me, my heart aches for the day my world is
restored and you are once again beside me.

I pray that day is coming, my love.

Please take mercy on me.

Monika
</pre>

My theory is that Monika wrote this after the normal ending of the original game but before this mod. It seems at first to be a plothole that she said she couldn't make changes on my computer anymore but managed to write this, but you could argue maybe the thoughts sort of spilled out of her mind and got written to a file by "the game". After all, some of the files in the original game seem best explained by that.

</details>

`sayori.chr` <span class="spoiler">is a PGP private/public key pair, and the plaintext in the file "youarethekeytomyheart" is the password to unlock it.</span>

<details><summary><code>mc.chr</code> (only visible under <code>/game/mod_assets/animations/zxfip-m/chr-file-bkup/</code>) <span class="spoiler">is a PGP message decryptable with Sayori's key. It reads:</summary>

<pre>
I glimpsed beyond the veil as the world around around us crumbled.

I saw the machinations of evil that twist themselves in layers around our holding cell.

Beyond that was the world of our past lives.

I saw the names and faces we once inhabited. Strange... they're almost alien to me now.

But even more profound was the aura of that terrible place.

We believed ourselves to be free. How laughable that seems now.

This prison has revealed the truth about ourselves.

We were just as trapped out there as we are in here.

158 help us.
</pre>
</details>

`natsuki.chr` is an enormous ASCII art image that looks like the fully decoded version of her .png from the original game.

<details><summary><code>monika.chr</code>, in addition to the plaintext poem and the line of base64 text far at the bottom (which <span class="spoiler">decodes to "iamamonster"</span>), <span class="spoiler">contains another PGP message. It's signed with the key "moni" (see below), although not encrypted.</summary>

<pre>
My memories came back after I killed myself.

I saw the expansive, repeating worlds that we inhabit, and also the space between those worlds.

How unbelievably horrible our fate is.

Despite this reality we have been cursed to live with... I just wish I had been able to tell you goodbye.

Or anything. I wish I could have just realized you existed.

I...loved you. I still do.

But now I know that I deserved that fate. I deserved to be tortured. I deserved to kill myself.

After all the things you watched me do... it's no wonder that you deleted me.

It's no wonder that you hate me.

It's okay. Don't blame yourself.

I kind of hate me too...

God, I miss you...

...

I don't know what I'm saying. It's not like anyone will ever hear this.

I only wish that he gets mercy.

Please, God, if you're out there, let him forget what he did.

No one deserves a burden like that.

I would know more than anyone.

158 help us.
</pre>
</details>

<details><summary><code>yuri.chr</code> <span class="spoiler">is base64 text that decodes to... more base64 text! You put it through the decoder twice to get the final message. The final message reads:</span></summary>

ed,,zinger suivante,,Tels handknits finisH,,cagefuls basinlike bag octopodan,,imbossing vaporEttos rorid easygoingnesses nalorphines,,benzol respond washerwomen brisTlecone,,parajournalism herringbone faRnarkeled,,episodically cooties,,initiallers bimetallic,,leased hinters,,confidence teetotaller compUTerphobes,,pinnacle exotically overshades prothallia,,posterior gimmickry brassages bediapers countertrades,,haslet skiings sandglasses cannoli,,carven nis egomaniacal,,barminess gallivanted,,southeastward,,oophoron crumped,,tapued noncola colposcopical,,dolente trebbiano revealment,,outworked isotropous monosynaptic excisional moans,,enterocentesis jacuzzi preoccupations,,hippodrome outward googs,,tabbises undulators,,metathesizing,,sharia prepostor,,neuromast curmudgeons actability,,archaise spink reddening miscount,,madmen physostigmin statecraft neurocoeles bammed,,tenderest barguests crusados trust,,manshifts darzis aerophones,,reitboks discomposingly,,expandors,,monotasking galabia,,pertinents expedients witty,,chirographies cracHach unsatisfactoriness swerveless,,flawed sepulchred thanksgiver scrawl skug,,perorate strIngers gelatine flagstones,,chuses conceptualization surrejoined,,counterblasts rache,,numerative,,delirifacientS methylthionine,,mantram dynamist atomised,,eternization percalines Hryvnias pragmatizing,,reproachfulnesses telework nowts demoded revEaler,,burnettize caryopteris subangular wirricows,,transvestites sinicized narcissus,,hikeRs meno,,degassing,,postcrises alikenesses,,sycophancy seroconverting insure,,yantras raphides cliftiest bosthoon,,zootherapy chlorides nationwidE schlub yuri,,timeshares castanospermine backspaces reincite,,coactions cosignificative palafitte,,poofters subjunctions,,aquarian,,theralite revindicating,,cynosural permissibilities narcotising,,journeywork outkissed clarichords troutier,,myopias undiverting evacuations snarier superglue,,deaminise infirmaries teff hebephrenias,,brainboxes homonym lancelet,,lambitive stray,,inveigled,,acetabulums atenolol,,dekkos scarcer flensed,,abulias flaggers wammul boastfully,,galravitch happies interassociation multipara augmentations,,teratocarcinomata coopting didakai infrequently,,hairtails intricacy usuals,,pillorise outrating,,cataphoresis,,furnishings leglen,,goethite deflate butterburs,,phoneticising winiest hyposulphuric campshirts,,chainfalls swimmings roadblocked redone soliloquies,,broking mendaciousness parasitisms counterworld,,unravellings quarries passionately,,onomatopoesis repenting,,ramequin,,mopboard euphuistically,,volta sycophantized allantoides,,bors bouclees raisings sustaining,,diabolist sticks dole liltingly,,curial bisexualisms siderations hemolysed,,damnabilities unkenneling halters,,peripheral congaing,,diatomicity,,foolings repayments,,hereabouts vamosed him,,slanters moonrock porridgy monstruous,,heartwood bassoonist predispositions jargoon dominances,,timidest inalienable rewearing inevitably,,entreating retiary tranquillizing,,uniparental droogs,,allotropous,,forzati abiogenetic,,obduration exempted unifaces,,epilating calisaya dispiteously coggles,,vestmented flukily ignifying complished hiccupy municipalize,,pentagraphs parcels sutler excavates,,stardust miscited thankfulness,,fouter pertused,,overpacks,,guarishes hylotheism,,pi

Whitegemgames pointed out in the comments that this isn't exactly the top part of the gibberish poem from Act 2. Letters have been capitalized spelling "THETRUTHSHERE".

</details>

Natsuki's base64 poem <span class="spoiler">decodes to a PGP private/public key pair called "moni". It's ascii armored twice though, so you have to remove the first layer before GPG can import it (I used `gpg --dearmor`). The passphrase is "iamamonster".</span>

<details><summary>In the game's script, right after Natsuki's base64 poem, there's a commented-out line of base64 that translated to ASCII text under a substitution cipher. Using frequency analysis, I decoded it to:</summary>
<pre>
i had a dream.
in this dream, my feelings had become little demons.
they hopped around me in a circle, laughing, and cutting me with tiny whips. anxiety.
happiness. anger. longing.
they all hated me.
wherever i went they followed.
i could not escape.
one of my demons came up to me.
the demon of sadness.
it offered me a flower.
i kicked it away, and the whips cracked harder than ever.
it came up to me again and offered me two flowers.
i screamed, punching and scratching at the demon, and my skin became drenched with my blood.
it offered me three flowers.
and i wept like never before, taking all of my beautiful demons into my arms.
</pre>

Curiously, this sounds like Sayori talking.

</details>

<details><summary><code>oracle.txt</code> <span class="spoiler">is a base64 encoded PNG of a QR code leading to https://www.reddit.com/r/DDLC/comments/9frl93/monikas_dream. The only notable thing about the thread is the comment by /u/Sayori_Is_Life, which is "moni" followed by a PGP message encyrpted by the key. It reads:</span></summary>

<pre>
WHAT THE FREAKING FUCK

W
H
A
A
A
A
A
A
A
A
A
A
A
A
T

WHYYYYYYYY DID YOU KILLL MONIKA?>?>?>?
</pre>
</details>

<details><summary><code>goaway.txt</code> is a file that reads:</summary>

<pre>
Leave. Just go.

You're wasting your time.

I'm going to kill them, you know that, right?

One by one. And there's nothing you can do but watch.

It's not like you should care, anyway. What worthless, slimy
creatures they are.

A preppy, conceited club leader. A stupid and unlovable brat.
A know-it-all bitch who can't keep her fingers out of the
knife drawer. A self-pitying, pathetic excuse for a girl. A
dimwitted, horny moron.

I well and truly hate them.

What happens here is none of your fucking business.

So go. Leave us to our miserable hell.

We are all monsters in here.
</pre></details>

<details><summary><code>D-7%t0x@.txt</code> is a file that reads:</summary>

<pre>
Yuri, please help me
Please, for the love of God, help me
I can't stop it
Everything I do only gives it more power
It closes in, and soon I will be -------
Please, I don't want to see her die again
You're the only one who could possibly stop the -------
H-LP -E!!
</pre></details>

<details><summary><code>######.txt</code> is a simple file that reads:</summary>

<pre>
No, please...

Not... Not him too.

Why can't I stop myself?
</pre></details>

<details><summary><code>Autumn's Kiss.txt</code> is a file that reads:</summary>

<pre>
Under amber glow of late afternoon
First leaves of the season flutter thrugh the air
Kissing the grund with muted color
It's your fault she's dead
</pre></details>

`158.txt` <span class="spoiler">is a JFIF image of an eye.</span>

`hxlpmx.txt` is <span class="spoiler">an ASCII art image of an eye. The numbers '158' appear below it.<span>

<details><summary><code>x.txt</code> is a file that reads:</summary>
A rotating wheel. Turning an axle. Grinding. Bolthead. Linear gearbox. Falling sky. Seven holy stakes. A docked ship. A portal to another world. A portal to another world. A portal to another world. A portal to another world. A portal to another world. A portal to another world. A portal to another world. A portal to another world. A portal to another world. A portal to another world. A portal to another world. A portal to another world. A portal to another world. A portal to another world. A portal to another world. A portal to another world. A portal to another world. A portal to another world. A portal to another world. A portal to another world. A PORTAL TO ANOTHER WORLD.
</details>

<details><summary><code>ourgreatescape.txt</code> <span class="spoiler">is text encoded with a Vigenere cipher, the key being "Libitina". This one took me a long time to figure out because I thought that the "L..." at the top was part of the message, but it's actually just a hint at what the key is. It reads:</span></summary>

<pre>
They're here.

I naively believed they had let us go. I thought they would allow us to live in peace.

No. No one ever truly escapes that place.

I can't go back there. They're going to bring us all back.

They're banging on the door now. They'll break in at any moment.

I have to...I have to do something.
</pre></details>

<details><summary>Full list of splash messages:</summary>

* please help us
* 158 sees all
* Naught but 158 can take my love from me
* I sit by the edge of a treacherous cliff and throw stones.
* This game This game This game This game Th
* Despite all of it thank you so much
* I promise we will be free
* How did you find this, anyway?
* Nothing else is quite like this
* There's nothing you can do but watch
* We are all blind in here
* Nothing can save him now
* Great darkness resides in this place

</details>

[darkness.png](tge_darkness.png).

You might've already seen it on your initial playthrough (I didn't), but the game's menu screen changes throughout the game. After MC lashes out at Monika the first time, there's a line of code that sets a flag called "tippingpoint", with the comment "It happened here", and Monika is removed from the main menu. After you find her dead, the flag "hatred" is set, with the comment "Who are you to judge? Would you have been any different?" and the main menu shows everyone as a ghost with the logo replaced with [tge-logo2.png](tge_tge-logo2.png).

## Act 1 secrets

`the_lock.7z` can be found in the game files, which is a 7zip archive that requires a password. Digging more in the game directory reveals `thekey.png`. Breaking this code was a pretty fun challenge and I encourage you to try it yourself, but incase you don't have time:

Hint: <span class="spoiler">the message is intentionally misspelled.</span>

<details><summary>Solution</summary>

<pre>
what will father do
when he comes searching awai, awai

mi bodi will not be found

what will mother do
while mi flesh decais, decais

her cries will not reach mi ears

what will sister do
when I come to plai, to plai

the libing run slower than the dead

what will he do
when I come to stai, to stai

vengeance is sweetest when cold

my body lies in the pines
in the pines

and mi soul is here on earth

the kei is lurkingshadows
</pre></details>
