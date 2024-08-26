from django.db import models

class Message(models.Model):
    chat_id = models.IntegerField()
    type = models.CharField(max_length=10)
    text = models.TextField()

'''
CharField (文字列が入る)
TextField(文章が入る)
ImageField(写真ファイルが入る)
FileField(不特定のファイルが入る)
IntegerField(数値が入る)
BooleanField(True/False)が入る *いわゆるフラッグ
DateField(日付が入る)
DateTimeField(日時が入る)
ForeignKey(外部キー) *一対多のリレーションになる。（言葉だけでも覚えておきましょう！）
ManyToManyField(複数の外部キーが入る) *多対多のリレーションになる
OneToOneField(外部キー) *一対一のリレーションになる
'''