from flask import Flask, request
import krwordrank
import json
import sys
sys.path.append('../')
from krwordrank.word import KRWordRank
from krwordrank.hangle import normalize
import krwordrank
import pandas as pd # 데이터프레임 사용을 위해
from math import log # IDF 계산을 위해
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
        # print(docs)
        return docs
# with open('words.json') as json_file:
#     json_data = json.load(json_file)
# print(json_data)

# @app.route('/')
# def hello_world():
#     return 'hello world!'
@app.route('/ml/sentence', methods=['POST'])
def sentence_extract():
    data = request.get_json()
    print(data)
    texts= get_texts_scores(fname)
    texts = data
    # texts=json_data

    # print(texts)

    from krwordrank.word import KRWordRank

    wordrank_extractor = KRWordRank(
        min_count = 2, # 단어의 최소 출현 빈도수 (그래프 생성 시)
        max_length = 30, # 단어의 최대 길이
        verbose = True
        )

    beta = 0.85    # PageRank의 decaying factor beta
    max_iter = 10

    keywords, rank, graph = wordrank_extractor.extract(texts, beta, max_iter, num_keywords=100)

    from krwordrank.sentence import make_vocab_score
    from krwordrank.sentence import MaxScoreTokenizer


    stopwords = {}
    vocab_score = make_vocab_score(keywords, stopwords, scaling=lambda x:1)
    tokenizer = MaxScoreTokenizer(vocab_score)

    from krwordrank.sentence import keysentence

    penalty = lambda x: 0 if 25 <= len(x) <= 80 else 1

    sents = keysentence(
        vocab_score, texts, tokenizer.tokenize,
        penalty=penalty,
        diversity=0.3,
        topk=10
    )

    # for sent in sents:
    #     print(sent)

    from krwordrank.sentence import summarize_with_sentences

    penalty = lambda x:0 if (10 <= len(x) <= 50) else 1
    stopwords = {'잘 부탁드립니다', '부탁드립니다', '잘', '정말', '진짜'}

    keywords, sents = summarize_with_sentences(
        texts,
        penalty = penalty,
        stopwords = stopwords,
        diversity = 0.7,
        num_keywords = 50,
        num_keysents = 10,
        scaling = lambda x:1,
        verbose = False,
    )
    for sent in sents:
        print(sent)
        
    # json으로 변경
    # decode 코드가 주피터에서 안먹긴 하는데, 아마 decode 하면 될거라고 생각
    # print(json.dumps(sents))

    # print('')
    # print(json.dumps(sents, indent=4))
    # print(type(json.dumps(sents)))
    # with open('words.json','w',encoding="utf-8") as make_file:
    #     json.dump(sents,make_file, ensure_ascii=False, indent="\t")
    
    if request.method == 'POST':
        print(json.loads(json.dumps(sents)))
        return json.dumps(sents, ensure_ascii = False)

    
    return 'hello world'
@app.route('/ml/keyword', methods=['POST'])
def keyword_extract():
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
            print('%8s:\t%.4f' % (word, r))
            test[word]=r 
        print(test)
        return json.dumps(test, ensure_ascii = False)
    return 'hello worlsdsd'

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
            # print(line)
            temp = temp + line +' '
    # print('*'*50)
    return temp
@app.route('/')
def textfile_similarity():
    okt = Okt()
    data = []
    fname='./test_docs2/textfile1.txt'
    fname1='./test_docs2/textfile2.txt'
    fname2='./test_docs2/textfile3.txt'
    fname3='./test_docs2/textfile4.txt'
    fname4='./test_docs2/textfile5.txt'
    # 텍스트 파일 읽어와서 한문장으로 이어주는 함수 만들기
    data.append(new_fileReader(fname) + '\n')
    data.append(new_fileReader(fname1) + '\n')
    data.append(new_fileReader(fname2) + '\n')
    data.append(new_fileReader(fname3) + '\n')
    data.append(new_fileReader(fname4))
    # 위에 내용 for 문으로 만들어주기
    # for i in temp.len; :
        
    print(data)
    print(type(data))
    list_data = str.split('\n')
    print(type(list_data))
    #기존 함수 사용해서 읽어 오는 방식
    
    texts= get_texts_scores('./test_docs/test1.txt')
    print(type(texts))
    print(texts)
    print('*'*100)
    texts = data
    # texts+= get_texts_scores(fname1)
    # texts+= get_texts_scores(fname2)
    # texts+= get_texts_scores(fname3)
    # texts+= get_texts_scores(fname4)
    texts_noun = [' '.join(okt.nouns(text)) for text in texts]
    print(texts_noun)
    print('-'*50)
    tfidfv = TfidfVectorizer().fit(texts)
    print(tfidfv.transform(texts).toarray())
    print('-'*50)

    # print(tfidfv.vocabulary_)
    # print(tfidfv.transform(texts).toarray()[0])
    # print(cos_sim(tfidfv.transform(texts).toarray()[0],tfidfv.transform(texts).toarray()[1]))
    # print(cos_sim(tfidfv.transform(texts).toarray()[1],tfidfv.transform(texts).toarray()[2]))
    # print(cos_sim(tfidfv.transform(texts).toarray()[2],tfidfv.transform(texts).toarray()[0]))
    # print(cos_sim(tfidfv.transform(texts).toarray()[3],tfidfv.transform(texts).toarray()[1]))
    # print(cos_sim(tfidfv.transform(texts).toarray()[4],tfidfv.transform(texts).toarray()[2]))
    # print(cos_sim(tfidfv.transform(texts).toarray()[3],tfidfv.transform(texts).toarray()[4]))
    print('-'*50)
    tfidfv = TfidfVectorizer().fit(texts_noun)
    # print(tfidfv.transform(texts_noun).toarray())
    print('-'*50)
    # print(tfidfv.vocabulary_)
    # print(tfidfv.transform(texts_noun).toarray()[0])
    # print(cos_sim(tfidfv.transform(texts_noun).toarray()[0],tfidfv.transform(texts_noun).toarray()[0]))
    # print(cos_sim(tfidfv.transform(texts_noun).toarray()[1],tfidfv.transform(texts_noun).toarray()[2]))
    # print(cos_sim(tfidfv.transform(texts_noun).toarray()[2],tfidfv.transform(texts_noun).toarray()[0]))
    # print(cos_sim(tfidfv.transform(texts_noun).toarray()[3],tfidfv.transform(texts_noun).toarray()[1]))
    # print(cos_sim(tfidfv.transform(texts_noun).toarray()[4],tfidfv.transform(texts_noun).toarray()[2]))
    # print(cos_sim(tfidfv.transform(texts_noun).toarray()[3],tfidfv.transform(texts_noun).toarray()[4]))
    list_num = []
    for i in tfidfv.transform(texts_noun).toarray():
        print(cos_sim(tfidfv.transform(texts_noun).toarray()[0],i))
        list_num.append(cos_sim(tfidfv.transform(texts_noun).toarray()[0],i))
    print(sorted(zip(list_num), reverse=True)[:3])
    return '문서 유사도 비교 테스트'

def text_parse(lines):
    temp = ''
    for line in lines:
        if line==' ':
            temp = temp + ' '
        elif line=="\n":
            temp = temp + '.'
        else:
            # print(line)
            temp = temp + line
    # print('*'*50)
    return temp
@app.route('/ml/recommend/position', methods=['POST'])
def test():
    okt = Okt()
    data = request.get_json()
    origin_node_id = data["node_id"]
    origin_data = data["content"]
    test_data = data["test"]
    use_data = []
    print(origin_data)
    #일단 먼저 각각의 문서 배열에 있는 애들을 한문장으로 만들어주고 만든 다음에 문서 저장하는 파일에다가 넣어주면 됨
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
        print(cos_sim(tfidfv.transform(texts_noun).toarray()[test_id],i))
        result.append(cos_sim(tfidfv.transform(texts_noun).toarray()[test_id],i))
    print(sorted(zip(result,origin_node_id), reverse=True)[:4])
    print('use_data 안의 값:')
    print(use_data)
    if request.method == 'POST':
        return json.dumps(sorted(zip(result,origin_node_id), reverse=True)[:4],ensure_ascii = False)
    return 'hello world!'