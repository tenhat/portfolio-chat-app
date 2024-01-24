# ベースイメージとしてPythonの公式イメージを使用
FROM python:3.8

# 作業ディレクトリを設定
WORKDIR /app

# 現在のディレクトリの内容をコンテナの作業ディレクトリにコピー
COPY . /app

# pipenvをインストールし、Pipfileに基づいて依存関係をインストール
RUN pip install pipenv && pipenv install --deploy --ignore-pipfile

# アプリケーションがリッスンするポートを指定
EXPOSE 5000

# 環境変数を設定
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# コンテナが起動するときにFlaskアプリケーションを実行
CMD ["pipenv", "run", "flask", "run"]
