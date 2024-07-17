from rake_nltk import Rake
import nltk

# 下载nltk的停用词列表
nltk.download('stopwords')
nltk.download('punkt')

def extract_keywords_textrank(sentence):
    # 初始化RAKE对象
    rake = Rake()
    
    # 提取关键词
    rake.extract_keywords_from_text(sentence)
    
    # 获取关键词及其对应的分数
    keywords_with_scores = rake.get_ranked_phrases_with_scores()
    
    # 提取关键词
    keywords = [keyword for score, keyword in keywords_with_scores]
    
    return keywords

# 示例句子
sentence = "我不喜欢音乐，也不想弹钢琴。"

# 提取关键词
keywords = extract_keywords_textrank(sentence)

# 打印关键词
print("Keywords:", keywords)
