# Node.js公式のイメージをベースにする
FROM node:16.11.1-alpine

# 作業ディレクトリを指定する
WORKDIR /app

# ローカルのファイルをコンテナにコピーする
COPY . .

# アプリケーションの依存パッケージをインストールする
RUN npm ci

# アプリケーションをビルドする
RUN npm run build

# ポート番号を指定する
EXPOSE 3000

# コンテナが起動した時に実行されるコマンドを指定する
CMD ["npm", "run", "dev"]
