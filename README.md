# 目次

# サービス概要
各都道府県における、1980-2045年の5年毎の人口構成データを可視化します。
なお1980~2020年は実績値ですが、2025年〜は推計値（[国立社会保障・人口問題研究所](https://www.ipss.go.jp/syoushika/tohkei/Mainmenu.html)）です。

# サービスの公開URL
以下は使用例です。
![image](https://github.com/guabanapple/yumemi-coding-test/assets/34186454/09fb6ed4-5a4b-47eb-84ce-b64492c85645)
https://guabanapple.github.io/yumemi-coding-test/

# 使用技術
| 種別 | 技術スタック |
| ---- | ---- |
| フロントエンド | TypeScript@4.9.5, React@18.2.0 |
| スタイル | Styled-Components@6.1.8 |
| テスト | Jest@27.5.2, Testing-Library |
| グラフ | recharts@2.12.0 |

# 今後の展望
・テストの完成：非同期処理やステート管理、カバレッジにおいて完成度を高める。
・モバイルUIの改善：モバイル端末上で都道府県一覧をコンパクトに表示する。
・デザインの改善

# 工夫した点
・リクエストの効率化：RESASのレスポンスデータをステートで保存し、再リクエスト時に未取得の都道府県のみリクエストを行うことで、再レンダリングに要する時間を短縮した。
・UIとロジックの分離：ロジック処理をカスタムフックに分離した。
