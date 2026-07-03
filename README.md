# シンプルToDoアプリ

Next.jsで作成した、日本語対応のシンプルなToDoアプリです。

## 機能

- タスクの追加
- 完了・未完了のチェック切り替え
- タスクの削除

## 非対応

学習用の最小構成にするため、以下は入れていません。

- データ保存
- ログイン
- DB
- 外部API

画面を更新するとタスクは消えます。

## 起動方法

```bash
npm install
npm run dev
```

ブラウザで以下を開きます。

```text
http://localhost:3000
```

## 検証

```bash
npm run lint
npm run build
```

## Vercelデプロイ

1. このプロジェクトをGitHubにpushする
2. VercelでNew Projectを選ぶ
3. GitHubリポジトリを選択する
4. Framework PresetがNext.jsになっていることを確認する
5. Deployを押す

特別な環境変数は不要です。
