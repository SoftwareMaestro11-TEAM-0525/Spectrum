from flask import Flask, request
import krwordrank
import json
import sys
sys.path.append('../')
from krwordrank.word import KRWordRank
from krwordrank.hangle import normalize
import krwordrank
from sklearn.feature_extraction.text import TfidfVectorizer
from numpy import dot
from numpy.linalg import norm
import numpy as np
from konlpy.tag import Okt
from itertools import combinations


app = Flask(__name__)
if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)
# if __name__ == "__main__":
#     app.run()

fname = 'swmaestro.txt'
def get_texts_scores(fname):
    with open(fname, encoding='utf-8') as f:
        docs = [doc.lower().replace('\n','') for doc in f]
        if not docs:
            return []
        
        texts = zip(*docs)
        return docs


@app.route('/ml/hello', methods=['POST'])
def hello():
    if request.method == 'POST':
        return 'hollo world!'
    return 'hello world!'


# @app.route('/ml/sentence', methods=['POST'])
# def sentence_extract():
#     data = request.get_json()
#     print(data)
#     texts= get_texts_scores(fname)
#     texts = data
#     from krwordrank.word import KRWordRank

#     wordrank_extractor = KRWordRank(
#         min_count = 2, # 단어의 최소 출현 빈도수 (그래프 생성 시)
#         max_length = 30, # 단어의 최대 길이
#         verbose = True
#         )

#     beta = 0.85    # PageRank의 decaying factor beta
#     max_iter = 10

#     keywords, rank, graph = wordrank_extractor.extract(texts, beta, max_iter, num_keywords=100)

#     from krwordrank.sentence import make_vocab_score
#     from krwordrank.sentence import MaxScoreTokenizer


#     stopwords = {}
#     vocab_score = make_vocab_score(keywords, stopwords, scaling=lambda x:1)
#     tokenizer = MaxScoreTokenizer(vocab_score)

#     from krwordrank.sentence import keysentence

#     penalty = lambda x: 0 if 25 <= len(x) <= 80 else 1

#     sents = keysentence(
#         vocab_score, texts, tokenizer.tokenize,
#         penalty=penalty,
#         diversity=0.3,
#         topk=10
#     )

#     from krwordrank.sentence import summarize_with_sentences

#     penalty = lambda x:0 if (10 <= len(x) <= 50) else 1
#     stopwords = {'잘 부탁드립니다', '부탁드립니다', '잘', '정말', '진짜'}

#     keywords, sents = summarize_with_sentences(
#         texts,
#         penalty = penalty,
#         stopwords = stopwords,
#         diversity = 0.7,
#         num_keywords = 50,
#         num_keysents = 10,
#         scaling = lambda x:1,
#         verbose = False,
#     )
#     for sent in sents:
#         print(sent)
    
#     if request.method == 'POST':
#         print(json.loads(json.dumps(sents)))
#         return json.dumps(sents, ensure_ascii = False)

    
#     return 'hello world'
@app.route('/ml/keyword', methods=['POST'])
def keyword_extract():
    okt = Okt()
    data = request.get_json()
    texts = data
    wordrank_extractor = KRWordRank(
    min_count = 4, # 단어의 최소 출현 빈도수 (그래프 생성 시)
    max_length = 12, # 단어의 최대 길이
    verbose = True
    )
    
    beta = 0.5   # PageRank의 decaying factor beta
    max_iter = 10
    keywords, rank, graph = wordrank_extractor.extract(texts, beta, max_iter)
    if request.method == 'POST':
        word_list = list()
        test = {}
        r_list = list()
        for word, r in sorted(keywords.items(), key=lambda x:x[1], reverse=True)[:30]:
            # print('%8s:\t%.4f' % (word, r))  
            word_list.append(word)
            r_list.append(r)
            test[word]=r 
        new_word_list = [' '.join(okt.nouns(word)) for word in test]
        while '' in new_word_list:    
	        new_word_list.remove('')
        print(new_word_list)
        print(test.keys())
        # print(test)
        # print(word_list)
        return json.dumps(test, ensure_ascii = False)
    return 'wordExtract'

def cos_sim(A, B):
    return dot(A, B)/(norm(A)*norm(B))
def new_fileReader(fname):
    f = open(fname)
    temp = ''
    lines = f.readlines()
    for line in lines:
        line = line.strip()
        if line=='' or line=="/n":
            pass
        else:
            temp = temp + line +' '
    return temp
from typing import List
from konlpy.tag import Okt
from typing import List
from textrankr import TextRank
class MyTokenizer:
    okt: Okt = Okt()

    def __call__(self, text: str) -> List[str]:
        tokens: List[str] = self.okt.phrases(text)
        return tokens

def text_parse_sen(lines):
    temp = ''
    for line in lines:
        if line==' ':
            temp = temp + ' '
        elif line=='\n':
            temp = temp + '.'
        else:
            temp = temp + line + '.'
    return temp
def text_parse(lines):
    temp = ''
    for line in lines:
        if line==' ':
            temp = temp + ' '
        elif line=='\n':
            temp = temp + '.'
        else:
            temp = temp + line
    return temp
@app.route('/ml/sentence',methods=['POST'])
def textfile_similarity():
    data = request.get_json()
    data = text_parse_sen(data)
    mytokenizer: MyTokenizer = MyTokenizer()
    textrank: TextRank = TextRank(mytokenizer)

    k: int = 3  # num sentences in the resulting summary

    summarized: str = textrank.summarize(data, k)
    # print(summarized)  # gives you some text

    # if verbose=False, it returns a list
    summaries: List[str] = textrank.summarize(data, k, verbose=False)
    # for summary in summaries:
    #     print(summary)
    if request.method == 'POST':
        return json.dumps(summaries,ensure_ascii = False)
    return '3sentence'


@app.route('/ml/recommend/position', methods=['POST'])
def test():
    okt = Okt()
    data = request.get_json()
    origin = data["res"]
    origin_node_id = origin["node_id"]
    origin_data = origin["content"]
    test_data = data["newContent"]
    use_data = []
    for i in range(len(origin_data)):
        temp = text_parse(origin_data[i])
        use_data.append(temp+'\n')
    test_id = len(use_data)
    use_data.append(text_parse(test_data))
    origin_node_id.append(0)
    texts_noun = [' '.join(okt.nouns(text)) for text in use_data]
    tfidfv = TfidfVectorizer().fit(texts_noun)
    result=[]
    for i in tfidfv.transform(texts_noun).toarray():
        result.append(cos_sim(tfidfv.transform(texts_noun).toarray()[test_id],i))
    if request.method == 'POST':
        return json.dumps(sorted(zip(result,origin_node_id), reverse=True)[:4],ensure_ascii = False)
    return 'recommend/position'