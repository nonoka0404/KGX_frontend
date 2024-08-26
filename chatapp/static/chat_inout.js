// ユーザーまたはボットからのメッセージをチャットに追加する
function addMessage(type, text) {
  const chatBox = document.getElementById("chat-box");
  const messageElement = document.createElement("div");
  messageElement.className = `message ${type}`;
  messageElement.innerHTML = text.replace(/\\n/g, "<br>");
  chatBox.appendChild(messageElement);

  // chatHistories[currentChat]が存在するか確認し、存在しない場合は初期化
  if (!chatHistories[currentChat]) {
    chatHistories[currentChat] = { id: currentChat, messages: [] };
  }

  chatHistories[currentChat].messages.push({ type: type, text: text });
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ユーザーがテキストフィールドに入力したメッセージを取得し、そのメッセージをサーバーにPOSTリクエストとして送信し、サーバーからのレスポンスを受け取る
// 受け取ったらレスポンスをチャットに追加する
function sendMessage() {
  const input = document.getElementById("chat-input");
  const message = input.value.trim();

  if (message) {
    addMessage("user", message);
    fetch("/chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        message: message,
        chat_id: currentChat,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        addMessage("bot", data.response);
        chatHistories[currentChat].messages.push({ type: 'bot', text: data.response });
        input.value = "";  // メッセージ送信後に入力欄をクリア
        input.style.height = "";  // テキストエリアの高さをリセット
      })
      .catch((error) => {
        console.error('Error:', error); // デバッグ用エラーログ
      });
  }
}

function handleKeyDown(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    // Enterキーが押されたときにフォームの送信をトリガーする
    event.preventDefault();
    document.getElementById("chat-form").dispatchEvent(new Event('submit'));
  }
}

// チャットフォームが送信されたときにデフォルトの送信動作を防ぎ、sendMessage関数を呼び出す
document
.getElementById("chat-form")
.addEventListener("submit", function (event) {
  event.preventDefault();
  sendMessage();
}, false);  // イベントリスナーを一度だけ追加

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = getCookie('csrftoken');

document.addEventListener("DOMContentLoaded", function() {
  fetch("/chat/history/")
    .then((response) => response.json())
    .then((data) => {
      data.chats.forEach(chat => {
        chat.messages.forEach(message => {
          addMessage(message.type, message.text);
        });
      });
    });
});


// function sendMessage() {
//   const input = document.getElementById("chat-input");
//   const message = input.value.trim();

//   if (message) {
//     addMessage("user", message);
//     fetch("/chat/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-CSRFToken": csrftoken,
//       },
//       body: JSON.stringify({
//         message: message,
//         chat_id: currentChat,
//       }),
//     })
//     .then((response) => response.json())
//     .then((data) => {
//       addMessage("bot", data.response);
//       chatHistories[currentChat].messages.push({ type: 'bot', text: data.response });
//       input.value = "";  // メッセージ送信後に入力欄をクリア
//       input.style.height = "";  // テキストエリアの高さをリセット
//     });
//   }
// }