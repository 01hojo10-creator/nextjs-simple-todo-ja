# 作業ルール

## 目的

Next.jsの基本学習用に、タスクの追加・完了チェック・削除だけができるシンプルなToDoアプリを保守する。

## 変更してよい範囲

- `app/page.tsx`
- `app/globals.css`
- `app/layout.tsx`
- 設定ファイル
- README

## 変更してはいけない範囲

このプロジェクトには、DB、Local Storage、認証、外部API、保存データは導入しない。
追加する場合は事前承認を取る。

## 検証

変更後は以下を確認する。

```bash
npm run lint
npm run build
```

同じ失敗の再試行は最大3回まで。同じ失敗が続く場合は、原因カテゴリを変えて切り分ける。
