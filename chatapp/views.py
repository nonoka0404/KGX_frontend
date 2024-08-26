from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Message  # 新しいモデルをインポート
import json
from .stub import do_something

def index(request):
    chats = {}
    messages = Message.objects.all()
    if not messages:
        # 初期チャットを生成
        Message.objects.create(chat_id=1, type='system', text='Welcome to the chat!')
        messages = Message.objects.all()
    for message in messages:
        if message.chat_id not in chats:
            chats[message.chat_id] = {'title': f'Chat {message.chat_id}', 'messages': []}
        chats[message.chat_id]['messages'].append({'type': message.type, 'text': message.text})
    return render(request, 'chatapp/index.html', {'chats': chats})

@csrf_exempt
def chat(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        message = data.get('message')
        chat_id = data.get('chat_id', 1)  # デフォルトのチャットIDを設定
        Message.objects.create(chat_id=chat_id, type='user', text=message)
        response = do_something(message)
        Message.objects.create(chat_id=chat_id, type='bot', text=response)
        return JsonResponse({'response': response})

def chat_history(request):
    chats = {}
    messages = Message.objects.all()
    if not messages:
        # 初期チャットを生成
        Message.objects.create(chat_id=1, type='system', text='Welcome to the chat!')
        messages = Message.objects.all()
    for message in messages:
        if message.chat_id not in chats:
            chats[message.chat_id] = {'chat_id': message.chat_id, 'messages': []}
        chats[message.chat_id]['messages'].append({'type': message.type, 'text': message.text})
    return JsonResponse({'chats': list(chats.values())})
