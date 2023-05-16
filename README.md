### 環境構築手順

1. このリポジトリをクローンする

```bash
$ git clone git@github.com:mzw86020424/next-rakuten-app.git
```


2. docker イメージをビルドする

```bash
$ docker-compose build
```

3. コンテナを起動する

```bash
$ docker-compose up -d
```

3. ブラウザでアクセスする

```bash
http://localhost:8000
```

### コンテナに入るコマンド

```bash
# フロント
$ docker exec -ti { container ID } sh
# api
$ docker exec -ti { container ID } bash

# それぞれのディレクトリに移動後実行すること
```

### eslintの実行コマンド（フロント）

```bash
$ npm run lint
```
#### 参考
https://maku.blog/p/dexgg8o/


### jestの実行コマンド（フロント）
```bash
$ yarn test:ci
```
#### 参考
https://zenn.dev/shootacean/articles/how-to-set-up-jest-in-a-nextjs-project
