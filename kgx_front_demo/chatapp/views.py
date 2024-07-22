from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Message
import json

def index(request):
    chats = {}
    for message in Message.objects.all():
        if message.chat_id not in chats:
            chats[message.chat_id] = {'title': f'Chat {message.chat_id}', 'messages': []}
        chats[message.chat_id]['messages'].append({'type': message.type, 'text': message.text})
    return render(request, 'chatapp/index.html', {'chats': chats})

@csrf_exempt
def chat(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        message = data.get('message')
        chat_id = data.get('chat_id')
        # メッセージをデータベースに保存します。
        Message.objects.create(chat_id=chat_id, type='user', text=message)
        # ここでサーバ側の処理を行います。
        response = do_something(message)
        # レスポンスもデータベースに保存します。
        Message.objects.create(chat_id=chat_id, type='bot', text=response)
        # 結果をJSONとして返します。
        return JsonResponse({'response': response})

def do_something(text):
    # ここで何らかの処理を行い、結果を返します。
    result = "The process was completed without any issues."
    return result
