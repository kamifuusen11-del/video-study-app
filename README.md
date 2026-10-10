# 動画編集・AI学習管理 PWA

## 無料公開
1. GitHubで新しい公開リポジトリを作る。
2. このZIPを展開し、`video-study-pwa` フォルダ**内のファイル**をリポジトリ直下にアップロード。
3. GitHub > Settings > Pages > Deploy from a branch > main / root > Save。
4. 数分後に表示される `https://<ユーザー名>.github.io/<リポジトリ名>/` をSafariで開く。
5. iPhoneのSafari共有メニュー > ホーム画面に追加。Macでも同じURLを開く。

## 無料同期（任意）
1. Firebase Consoleでプロジェクトを作る（Spark無料プランを選択）。
2. Authentication > Sign-in method > メール/パスワード を有効にする。
3. Firestore Databaseを作成。Rulesに同梱の `firestore.rules` を貼り付けて公開する。
4. プロジェクト設定からWebアプリを登録し、表示された `firebaseConfig` を `firebase-config.js` の `null` と置き換える。
5. GitHubに変更を反映。アプリの「予定・通知」画面から同じメールアドレスでログイン。
6. 以前の端末の進捗がある場合、先にJSONバックアップを取る。新規のクラウドアカウントでは最初にログインした端末の記録がアップロードされる。

※ FirebaseのWeb設定値は公開して使う前提ですが、Firestoreのセキュリティルールが必須です。パスワードをファイルに書かないでください。

## 無料リマインダー
アプリの「予定・通知」からICSファイルを生成し、Googleカレンダー等にインポートして通知を設定してください。カレンダーの取り込みは別途必要です。PWA単体でのバックグラウンド通知は実装していません。

## 注意
- GitHub Pagesの公開・Firebase設定はユーザーのアカウント操作が必要です。
- オフラインキャッシュは一度オンラインで開いた後に利用できます。
- 学習記録はブラウザに保存し、Firebase設定・ログイン後はクラウドと同期します。
- 教材リンクの個別検証は全科目で完了していません。
