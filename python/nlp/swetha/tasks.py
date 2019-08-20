"""
https://app.pluralsight.com/library/courses/python-natural-language-processing/table-of-contents
"""

# tokenizing text
import nltk
from string import punctuation
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.collocations import *
from nltk.stem.lancaster import LancasterStemmer
from nltk.corpus import wordnet as wn
from nltk.wsd import lesk

text = "Mary had a little lamb. Her fleece was white as snow"

sents = sent_tokenize(text)
print(sents)
words = [word_tokenize(sent) for sent in sents]
print(words)

# removing stopwords
customStopWords = set(stopwords.words('english')+list(punctuation))

wordsWOStopwords = [word for word in word_tokenize(text)
                    if word not in customStopWords]
print(wordsWOStopwords)

# identifying bigrams
bigram_measure = nltk.collocations.BigramAssocMeasures()
finder = BigramCollocationFinder.from_words(wordsWOStopwords)
print(sorted(finder.ngram_fd.items()))

# stemming and POS tagging
text2 = 'Mary closed on closing night when she was in the mood to close.'

st = LancasterStemmer()
stemmedWords = [st.stem(word) for word in word_tokenize(text2)]
print(stemmedWords)
print(nltk.pos_tag(word_tokenize(text2)))

# disambiguing word meaning
for ss in wn.synsets('bass'):
    print(ss, ss.definition())
sense1 = lesk(word_tokenize(
    "Sing in a lower tone, along with the bass"), 'bass')
print(sense1, sense1.definition())

sense2 = lesk(word_tokenize("This sea bass was really hard to catch"), 'bass')
print(sense2, sense2.definition())
