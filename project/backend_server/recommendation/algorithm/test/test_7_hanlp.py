import hanlp

def extract_keywords_hanlp(text, topK=5):
    # 使用HanLP进行关键词提取
    keywords = hanlp.extract_keywords(text, topK=topK)
    return keywords

# 示例文本
text = "机器学习是一个非常有趣的领域，它涉及训练算法以从数据中学习模式并做出预测。"

# 提取关键词
keywords = extract_keywords_hanlp(text)

# 打印关键词
print("Keywords:", keywords)
