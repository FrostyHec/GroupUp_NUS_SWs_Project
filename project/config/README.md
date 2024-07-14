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


aws eks --region us-east-1 update-kubeconfig --name GroupUpCluster

aws configure set aws_session_token IQoJb3JpZ2luX2VjEN7//////////wEaCXVzLXdlc3QtMiJIMEYCIQCYxrYt5MDQvXNHI2iy64XqE1fxikQGws70v+UCBuK9zQIhAIUqGgRhxxJr5jt70ZOhHyApGe/07Uslz4DV2Xbl32wOKrICCKf//////////wEQAhoMNjIwOTI3MDc3MDYyIgxyGaItWgSZV/JXSBsqhgK6/E/hd2LMqsoz+tog7I3cfF5HIQbYozBIc48nekdPXx/bdgi29XuZ5SIV5qRuTd81yG8ju9GolENh5OVbIlwxkvoUinzHfu9PTz0Ff4XTsN90nN2TNZBYpK+r0pyGDKEmii6mYTZydorqQD40BArIKyaJHEuCHyrRh+CF2ii4KzjD2q7tTijVn/72bcbFfbuiPZeXvQEcmsZKVF52nu46u9SNQS9z3yknyaEzd6UDEwiim/dM+2BJ2DxQmDMRf/u9YSW+yREVnJMmB9ylrWj+VoT0tQh0MC396Z2go9rtaPQmvLLQUXfhaVLJdexvMoKHJhr9sWSdloDIeMmvhVa5BGRirkaSMISoz7QGOpwBHDDlwVzrVmIGWmsG1JhfpL13fcHbt/xWGOpJktQF2N5mv02lbHNVgg/p9VuMyVa6BPxpUt5megdkMo9eHEtqeA5IS+Y1HoDNJo0hXKTPzPGFD+2W6MX+VAgOGioD9AxoZFSffNuTsPF2fqnnAlNxQCFM+cNk3Ok7epD+woMQqdUbdu2zoJ5DA8Q0+2lqo01mP95yQcFpptUTLz11

kubectl exec -it citus-coordinator-c5bfdbb5f-l94jv -n citus -- /bin/bash

kubectl exec -it citus-coordinator-c5bfdbb5f-djjcb -n citus -- /bin/bash

mvn package -DskipTests