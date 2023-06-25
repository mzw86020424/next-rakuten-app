## 環境構築手順
---
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
<br>

## 使用するコマンド
---
### コンテナに入る

```bash
# フロント
$ docker exec -ti { container ID } sh
# api
$ docker exec -ti { container ID } bash
# railsコンテナから以下コマンドでDBに接続できる
$ rails dbconsole
```

### eslintの実行

```bash
# フロントのコンテナに入ってから
$ npm run lint
# https://maku.blog/p/dexgg8o/
```
### jestの実行
```bash
# フロントのコンテナに入ってから
$ yarn test:ci
# https://zenn.dev/shootacean/articles/how-to-set-up-jest-in-a-nextjs-project
```
### rubocopの実行（自動整形含む）
```bash
# apiコンテナに入ってから
$ rubocop -A
```
### rspecの実行
```bash
# apiコンテナに入ってから
$ rspec
```

<br>

## commitのルール
---
### コミットメッセージのフォーマット（[参考](https://zenn.dev/mi0256/articles/1332e1d041cab4)）
```
:Emoji: Title / Reason / Specification / Issue
```
- Emoji（コミットの種類） <- ひと目でどんなコミットなのか判断するため
- Title（コミットの概要） <- 簡潔にコミット内容を説明するため
- Reason（コミットの理由） <- なぜこのコミットが必要なのか説明するため
- Specification（コミットの意図・仕様） <- なぜこのようなコミット内容になったのか説明するため
- Issue（コミットに対応したIssue） <- Issueベースで開発を進めるため


### Emoji

#### :seedling: Initial
#### :fire: Update features
#### :sparkles: New features
#### :recycle: Refactoring
#### :bug: Bug
#### :art: Design
#### :books: Document
#### :wrench: Configuration
#### :zap: Improve
#### :rocket: Deploy
#### :dna: Merge
#### :test_tube: Test