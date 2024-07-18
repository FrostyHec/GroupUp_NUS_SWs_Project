FROM ubuntu:latest

WORKDIR /

RUN apt-get update && apt-get install -y git && apt-get install -y curl

RUN git clone https://github.com/FrostyHec/GroupUp_NUS_SWs_Project.git

WORKDIR /GroupUp_NUS_SWs_Project/project/frontend_server/

RUN git checkout frontend-demo

ENV NODE_VERSION=20.15.1

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

ENV NVM_DIR=/root/.nvm

RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}

RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}

RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}

ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

RUN npm install

RUN npm run build

CMD ["npm", "run", "start"]