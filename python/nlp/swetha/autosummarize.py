import urllib
from heapq import nlargest
from string import punctuation
from collections import defaultdict

from bs4 import BeautifulSoup
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from nltk.probability import FreqDist


articleURL = "https://www.washingtonpost.com/news/the-switch/wp/2016/10/18/the-pentagons-massive-new-telescope-is-designed-to-track-space-junk-and-watch-out-for-killer-asteroids/"


def getTextWaPo(url):
    page = urllib.request.urlopen(articleURL).read().decode('utf8', 'ignore')
    soup = BeautifulSoup(page, 'lxml')
    text = ' '.join(map(lambda p: p.text, soup.find_all('article')))
    # return text.encode('ascii', errors='replace'    ).replace("?", " ")
    return text


def summarize(text, n=3):
    sents = sent_tokenize(text)

    assert n <= len(sents)
    word_sent = word_tokenize(text.lower())
    _stopwords = set(stopwords.words('english') + list(punctuation))

    word_sent = [word for word in word_sent if word not in _stopwords]
    freq = FreqDist(word_sent)

    ranking = defaultdict(int)

    for i, sent in enumerate(sents):
        for w in word_tokenize(sent.lower()):
            if w in freq:
                ranking[i] += freq[w]

    sents_idx = nlargest(n, ranking, key=ranking.get)
    return [sents[j] for j in sorted(sents_idx)]


text = getTextWaPo(articleURL)
print(text)

summary = summarize(text)
print(summary)
