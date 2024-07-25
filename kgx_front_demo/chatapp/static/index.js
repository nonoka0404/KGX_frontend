let chatHistories = {
  1: [],
  2: [],
};
let currentChat = 1;
let chatCounter = 2;

function sendMessage() {
  const input = document.getElementById("chat-input");
  const message = input.value.trim();
  if (message) {
    // ユーザーのメッセージを先に追加
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
        // ボットのレスポンスを追加
        addMessage("bot", data.response);
      });
    input.value = "";
  }
}

function addMessage(type, text) {
  const chatBox = document.getElementById("chat-box");
  const messageElement = document.createElement("div");
  messageElement.className = `message ${type}`;
  messageElement.textContent = text;
  chatBox.appendChild(messageElement); // メッセージをチャットボックスの最後に追加
  chatHistories[currentChat].push({ type: type, text: text });
  chatBox.scrollTop = chatBox.scrollHeight;
}

document
  .getElementById("chat-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });

// function switchChat(chatId) {
//   currentChat = chatId;
//   const chatBox = document.getElementById("chat-box");
//   chatBox.innerHTML = "";
//   chatHistories[chatId].forEach((msg) => {
//     addMessage(msg.type, msg.text);
//   });
// }

function editHistoryTitle(element) {
  const newTitle = prompt(
    "新しいタイトルを入力してください:",
    element.textContent
  );
  if (newTitle) {
    element.textContent = newTitle;
  }
}

function clearSearchInput() {
  document.getElementById("search-input").value = "";
}

function clearChatInput() {
  document.getElementById("chat-input").value = "";
}

document.getElementById("search-input").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const items = document.querySelectorAll("#history-list li");
  items.forEach((item) => {
    if (item.textContent.toLowerCase().includes(query)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
});

function addNewChat() {
  chatCounter++;
  const newChatId = chatCounter;
  chatHistories[newChatId] = [];
  const historyList = document.getElementById("history-list");
  const newHistoryItem = document.createElement("li");
  newHistoryItem.textContent = `履歴項目 ${newChatId}`;
  newHistoryItem.ondblclick = function () {
    editHistoryTitle(newHistoryItem);
  };
  newHistoryItem.onclick = function () {
    switchChat(newChatId);
  };
  newHistoryItem.style.borderRadius = "10px";
  historyList.appendChild(newHistoryItem);
}

// DjangoのCSRFトークンを取得
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = getCookie("csrftoken");

document
  .getElementById("chat-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    sendMessage();
  });
