# KGX_frontend
本ブランチの目的は、jancoアプリのデモを作成し、その評価を仰ぐことにあります。

-------------------------------------------------------------------------------------------------------------------------
0712現在での達成事項：
以下のアプリケーションは入力を受けてその入力とその結果を表示する機能を持っています。
ただしサーバ側の処理との結合がまだなのでサーバから受け取った結果resultを正常終了の文言を返す機能に一時的に置き換えています。

ファイル構成は以下の通りです

│  db.sqlite3　//現段階では使用されていないが今後必要になるデータベースファイル
│  manage.py
│
├─chatapp　　　//実際のチャットを実現するアプリケーションディレクトリ
│  │  admin.py　
│  │  apps.py　
│  │  models.py
│  │  tests.py
│  │  urls.py
│  │  views.py　//描画処理を行うファイル
│  │  __init__.py
│  │
│  ├─migrations
│  │  │  __init__.py
│  │  │
│  │  └─__pycache__
│  │          __init__.cpython-311.pyc
│  │
│  ├─static
│  │      index.css　//実際に描画されるCSSファイル
│  │      index.js   //入力フォームの入力に対する変形とイベントに対する実行を行うJSファイル
│  │
│  ├─templates
│  │  └─chatapp
│  │          index.html　//実際に描画されるHTMLファイル
│  │
│  └─__pycache__
│          admin.cpython-311.pyc
│          apps.cpython-311.pyc
│          models.cpython-311.pyc
│          urls.cpython-311.pyc
│          views.cpython-311.pyc
│          __init__.cpython-311.pyc
│
└─kgx_front_demo
    │  asgi.py
    │  settings.py
    │  urls.py
    │  wsgi.py
    │  __init__.py
    │
    └─__pycache__
            settings.cpython-311.pyc
            urls.cpython-311.pyc
            wsgi.cpython-311.pyc
            __init__.cpython-311.pyc

---------------------------------------------------------------------------------------------------------------------------

0715現在での達成事項：


---------------------------------------------------------------------------------------------------------------------------

0723現在での達成事項：


---------------------------------------------------------------------------------------------------------------------------

0725現在での達成事項：


---------------------------------------------------------------------------------------------------------------------------
