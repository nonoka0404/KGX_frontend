from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Message
import json
from .stub import do_something #バック側の処理に相当するstub.pyの内容からそのmainとなる処理do_Somethingをインポートする


#この関数の目的は画面上にチャットメッセージを表示することである
def index(request):
    #チャット内部にchat_idがなければ新しくchatsに追加する
    chats = {}
    for message in Message.objects.all():
        if message.chat_id not in chats:
            chats[message.chat_id] = {'title': f'Chat {message.chat_id}', 'messages': []}
        chats[message.chat_id]['messages'].append({'type': message.type, 'text': message.text})
    return render(request, 'chatapp/index.html', {'chats': chats})
#おそらく[caht_id, type , text ]という配列を一行としてデータベースに保管している

#この関数の目的はチャットデータを追加することである
@csrf_exempt
def chat(request):
    #POSTがリクエストされた場合Messageに新しいチャットのデータを追加する
    if request.method == 'POST':
        data = json.loads(request.body)
        message = data.get('message')
        chat_id = data.get('chat_id')
        Message.objects.create(chat_id=chat_id, type='user', text=message)
        response = do_something(message)
        Message.objects.create(chat_id=chat_id, type='bot', text=response)
        return JsonResponse({'response': response})




