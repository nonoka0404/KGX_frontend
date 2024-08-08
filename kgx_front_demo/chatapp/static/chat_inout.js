
//ユーザーまたはボットからのメッセージをチャットに追加する
function addMessage(type, text) {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.className = `message ${type}`;
    messageElement.innerHTML = text.replace(/\\n/g, "<br>");
    chatBox.appendChild(messageElement);
    chatHistories[currentChat].push({ type: type, text: text });
    chatBox.scrollTop = chatBox.scrollHeight;
  }



//ユーザーがテキストフィールドに入力したメッセージを取得する
//そのメッセージをサーバーにPOSTリクエストとして送信し、サーバーからのレスポンスを受け取る
//受け取ったらレスポンスをチャットに追加する
function sendMessage() {
    const input = document.getElementById("chat-input");
    //HTMLのchat_input要素の値をinputに保存
    const message = input.value.trim();
    //ユーザーが入力したテキストフィールドの値を取得、前後の空白を削除しmessageに保存
  
    if (message) {//messageの値が空白でない場合
      addMessage("user", message);
      //fetch関数を用いてサーバ側にPOSTリクエストを送信する
      //送信したデータは/chat/エンドポイントに送られる
      fetch("/chat/", {　
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        //ユーザーのメッセージと現在のチャットIDを含むJavaScriptオブジェクトをJSON形式の文字列に変換したものをボディにする
        body: JSON.stringify({
          message: message,
          chat_id: currentChat,
        }),
      })
        .then((response) => response.json())
        //サーバーからのレスポンスを受け取ったら、そのレスポンスをJSON形式のデータに変換
        .then((data) => {
          addMessage("bot", data.response);
        });
        //レスポンスデータを受け取ったら、そのデータからボットのレスポンスを取得し、それをチャットに追加する
      input.value = "";
      //テキスト入力フィールドをクリアにする
    }
  }

//Enterキーが押されたときにsendMessage関数を呼び出す
//ShiftキーとEnterキーが同時に押された場合は改行を挿入しsendMessage関数を呼び出さない
document
  .getElementById("chat-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      if (event.shiftKey) {
        this.value += "\\n";
      } else {
        event.preventDefault();
        sendMessage();
      }
    }
  });

//チャットフォームが送信されたときにデフォルトの送信動作を防ぎ、sendMessage関数を呼び出す
document
.getElementById("chat-form")
.addEventListener("submit", function (event) {
event.preventDefault();
sendMessage();
});
