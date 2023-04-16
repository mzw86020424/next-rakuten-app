### 環境構築手順

1. このリポジトリをクローンする

```bash
$ git clone git@github.com:mzw86020424/next-rakuten-app.git
```

2. ディレクトリに移動する

```bash
$ cd next-rakuten-app/app
```

3. docker イメージをビルドする

```bash
$ docker-compose build
```

4. コンテナを起動する

```bash
$ docker-compose up -d
```

5. ブラウザでアクセスする

```bash
http://localhost:3000
```

### コンテナに入るコマンド

```bash
$ docker exec -ti { container ID } sh
```

### eslintの実行コマンド

```bash
$ npm run lint
```
#### 参考
https://maku.blog/p/dexgg8o/


### jestの実行コマンド
```bash
$ yarn test:ci
```
#### 参考
https://zenn.dev/shootacean/articles/how-to-set-up-jest-in-a-nextjs-project
