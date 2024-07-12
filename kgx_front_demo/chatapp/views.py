from django.shortcuts import render
from django.http import HttpResponse

# 過去の入力と結果を保存するためのグローバルリストを作成します。
history = []

def index(request):
    if request.method == 'POST':
        text = request.POST.get('text', '')
        # ここでサーバ側の処理を行います。
        result = do_something(text)
        # 入力と結果を履歴に保存します。
        history.append((text, result))
        # 結果と履歴をテンプレートに渡します。
        return render(request, 'chatapp/index.html', {'text': text, 'result': result, 'history': history})
    else:
        return render(request, 'chatapp/index.html', {'history': history})

def do_something(text):
    # ここで何らかの処理を行い、結果を返します。
    result = "問題なく処理されました。"
    return result
