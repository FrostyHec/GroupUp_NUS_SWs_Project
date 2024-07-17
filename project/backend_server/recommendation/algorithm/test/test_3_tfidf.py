from sklearn.feature_extraction.text import TfidfVectorizer
import nltk
from nltk.corpus import stopwords

# 下载nltk的停用词列表
nltk.download('stopwords')

def extract_keywords_tfidf(sentence, num_keywords=5):
    # 初始化TF-IDF向量器
    vectorizer = TfidfVectorizer(stop_words=stopwords.words('english'))

    # 转换句子
    tfidf_matrix = vectorizer.fit_transform([sentence])
    
    # 获取词汇表
    feature_names = vectorizer.get_feature_names_out()
    
    # 获取TF-IDF值
    tfidf_scores = tfidf_matrix.toarray().flatten()
    
    # 获取关键词及其对应的TF-IDF值
    tfidf_scores_dict = dict(zip(feature_names, tfidf_scores))
    
    # 按TF-IDF值降序排序
    sorted_keywords = sorted(tfidf_scores_dict.items(), key=lambda item: item[1], reverse=True)
    
    # 提取前num_keywords个关键词
    keywords = [word for word, score in sorted_keywords[:num_keywords]]
    
    return keywords

# 示例句子
sentence = "I do not love music and I do not want to play the piano."

# 提取关键词
keywords = extract_keywords_tfidf(sentence)

# 打印关键词
print("Keywords:", keywords)
