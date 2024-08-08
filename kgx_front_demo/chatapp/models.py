from django.db import models

class Message(models.Model):
    chat_id = models.IntegerField()
    type = models.CharField(max_length=10)
    text = models.TextField()

#models.pyに書き込まれた内容がデータベースの一列分に相当し、データはdb.sqlite3に保存されている
#現在は(2024/08/05) [chat_id ,user or bot ,message(input or output)] というは形になっている