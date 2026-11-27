# ひと月さいふ（Supabase版）

今月の出費をカレンダーで記録し、先月の出費から限度額を決め、先月と今月をグラフ（折れ線・棒）で比べる学生向けの家計アプリです。
記録は Supabase に保存され、ログインした本人だけが読み書きできます。

## ファイル

| ファイル | 役割 |
|---|---|
| `public/hitotsuki-saifu/index.html` | アプリ本体 |
| `public/hitotsuki-saifu/config.js` | Supabase の URL と anon key |
| `supabase/schema.sql` | テーブルとアクセス制限（RLS） |

## セットアップ

1. https://supabase.com でプロジェクトを作る。
2. ダッシュボードの **SQL Editor** に `supabase/schema.sql` を貼り付けて **Run**。
3. **Project Settings → API** の `Project URL` と `anon public` key を `public/hitotsuki-saifu/config.js` に貼る。
4. **Authentication → URL Configuration** の Site URL を、アプリを開くURL（例: `http://localhost:3000`）にする。
   登録時の確認メールのリンク先になります。すぐ試したいときは **Authentication → Providers → Email** の
   「Confirm email」をオフにすると、確認メールなしでログインできます。
5. リポジトリのルートで起動する:
   ```
   npm install
   npm run dev
   ```
   `http://localhost:3000/hitotsuki-saifu/index.html` を開き、「はじめて使う（登録）」から始めます。

`config.js` が未設定のままだと、Supabase を使わずにブラウザの中だけに保存して動きます。

## 公開するとき

Next.js の `public/` に置いた静的ページなので、このリポジトリを Vercel などにデプロイすると `/hitotsuki-saifu/index.html` で開けます。
公開URLを手順4の Site URL（と Redirect URLs）にも追加してください。
