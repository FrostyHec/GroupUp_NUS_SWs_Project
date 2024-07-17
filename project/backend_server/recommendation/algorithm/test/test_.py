import numpy as np
from sklearn.cluster import KMeans

# 示例相似度矩阵（n * n）
similarity_matrix = np.array([
    [1, 0.8, 0.6],
    [0.8, 1, 0.5],
    [0.6, 0.5, 1]
])

# 设置聚类数量
k = 2

# 运行 KMeans
kmeans = KMeans(n_clusters=k, random_state=0)
labels = kmeans.fit_predict(similarity_matrix)

# 获取聚类中心和总距离
centers = kmeans.cluster_centers_
inertia = kmeans.inertia_

# 输出结果
print("Labels:", labels)
print("Cluster Centers:", centers)
print("Inertia:", inertia)
