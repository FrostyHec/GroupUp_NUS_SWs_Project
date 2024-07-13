上下文：
aws eks --region us-east-1 update-kubeconfig --name GroupUpCluster

kubectl apply -f deployment_server.yaml


3. Run dockerfile in server
```
# 建镜像
docker build -t frosky/server:latest .

# 登录到Docker Hub
docker login

# 推送镜像到Docker Hub
docker push frosky/server:latest

```

2. apply it to k8s

kubectl apply -f deployment_server.yaml

# 构建新的Docker镜像
重新apply
kubectl apply -f deployment_server.yaml
