let chatHistories = {};
let chatCounter = 0;
let currentChat = 1;

// Add history items to the list
document.addEventListener("DOMContentLoaded", function () {
  fetch("/chat/history/")
    .then((response) => response.json())
    .then((data) => {
      chatHistories = {};
      data.chats.forEach(chat => {
        chatHistories[chat.chat_id] = { id: chat.chat_id, messages: chat.messages };
      });
      chatCounter = Math.max(...Object.keys(chatHistories).map(Number));
      if (chatCounter === 0) {
        chatCounter = 1;
        chatHistories[1] = { id: 1, messages: [{ type: 'system', text: 'Welcome to the chat!' }] };
      }
      populateHistoryList();
      switchChat(1); // デフォルトで最初のチャットを表示
    });
});

function populateHistoryList() {
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = ""; // 既存のリストをクリア
  for (let i = 1; i <= chatCounter; i++) {
    const historyItem = document.createElement("li");
    historyItem.textContent = `履歴項目 ${i}`;
    historyItem.ondblclick = function () {
      editHistoryTitle(historyItem);
    };
    historyItem.onclick = function () {
      switchChat(i);
    };
    historyList.appendChild(historyItem);
    if (i === 1) { // デフォルトで履歴項目1を赤色にする
      historyItem.classList.add("selected");
    }
  }
}

function switchChat(chatId) {
  saveCurrentChatHistory(); // 現在のチャット履歴を保存

  // すべての履歴項目から 'selected' クラスを削除
  const historyItems = document.querySelectorAll("#history-list li");
  historyItems.forEach((item) => {
    item.classList.remove("selected");
  });

  // 選択された履歴項目に 'selected' クラスを追加
  const selectedHistoryItem = historyItems[chatId - 1]; // li要素は0から始まるため、chatIdから1を引く
  if (selectedHistoryItem) {
    selectedHistoryItem.classList.add("selected");
  }

  // chatHistoriesにエントリが存在しない場合は初期化
  if (!chatHistories[chatId]) {
    chatHistories[chatId] = { id: chatId, messages: [] };
  }

  currentChat = chatId;
  displayChatHistory(chatId);
}

function saveCurrentChatHistory() {
  const chatBox = document.getElementById("chat-box");
  const messages = chatBox.querySelectorAll(".message");
  if (chatHistories[currentChat]) {
    chatHistories[currentChat].messages = Array.from(messages).map((message) => {
      return {
        type: message.className.replace("message ", ""),
        text: message.innerHTML.replace(/<br>/g, "\\n"),
      };
    });
  } else {
    console.error(`Chat history for chat ${currentChat} is undefined`); // デバッグ用エラーログ
  }
}

function displayChatHistory(chatId) {
  console.log(`Displaying chat history for chat ${chatId}`); // デバッグ用ログ
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML = "";
  if (chatHistories[chatId]) {
    chatHistories[chatId].messages.forEach((message) => {
      const messageElement = document.createElement("div");
      messageElement.className = `message ${message.type}`;
      messageElement.innerHTML = message.text.replace(/\\n/g, "<br>");
      chatBox.appendChild(messageElement);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  } else {
    console.error(`No chat history found for chat ${chatId}`); // デバッグ用エラーログ
  }
}

function addNewChat() {
  chatCounter++;
  const newChatId = chatCounter;
  chatHistories[newChatId] = { id: newChatId, messages: [] }; // これが新しいチャットの履歴を保存するための新しいエントリを作成します。
  populateHistoryList(); // 履歴リストを更新
  switchChat(newChatId); // 新しいチャットに切り替え
  console.log(`New chat added with ID ${newChatId}`); // デバッグ用ログ
}


// function switchChat(chatId) {
//   saveCurrentChatHistory(); // 追加: 現在のチャット履歴を保存

//   // すべての履歴項目から 'selected' クラスを削除
//   const historyItems = document.querySelectorAll("#history-list li");
//   historyItems.forEach((item) => {
//     item.classList.remove("selected");
//   });

//   // 選択された履歴項目に 'selected' クラスを追加
//   const selectedHistoryItem = historyItems[chatId - 1]; // li要素は0から始まるため、chatIdから1を引く
//   if (selectedHistoryItem) {
//     selectedHistoryItem.classList.add("selected");
//   }

//   currentChat = chatId;
//   displayChatHistory(chatId);
// }


// // Save the current chat history
// function saveCurrentChatHistory() {
//   const chatBox = document.getElementById("chat-box");
//   const messages = chatBox.querySelectorAll(".message");
//   chatHistories[currentChat].messages = Array.from(messages).map((message) => {
//     return {
//       type: message.className.replace("message ", ""),
//       text: message.innerHTML.replace(/<br>/g, "\\n"),
//     };
//   });
// }

// function addNewChat() {
//   chatCounter++;
//   const newChatId = chatCounter;
//   chatHistories[newChatId] = { id: newChatId, messages: [] }; // これが新しいチャットの履歴を保存するための新しいエントリを作成します。
//   populateHistoryList(); // 履歴リストを更新
//   switchChat(newChatId); // 新しいチャットに切り替え
// }

