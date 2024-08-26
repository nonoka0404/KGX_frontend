from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'), 
    #root index function in views.py. 

    path('chat/', views.chat, name='chat'), 
    #root chtapp function in views.py 

    path('chat/history/', views.chat_history, name='chat_history'),
]
