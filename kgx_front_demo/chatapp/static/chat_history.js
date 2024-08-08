

// 新規チャットを追加する
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
  historyList.appendChild(newHistoryItem);
}

//空のチャット履歴を作成する
let chatHistories = {
  1: [],
  2: [],
};
let currentChat = 1;
let chatCounter = 3;

//ユーザーに新しいタイトルを入力させ、そのタイトルを元の要素のテキスト内容に置き換る
function editHistoryTitle(element) {
  const newTitle = prompt(
    "新しいタイトルを入力してください:",
    element.textContent
  );
  if (newTitle) {
    element.textContent = newTitle;
  }
}


//チャット入力フィールドの値をクリアにする
function clearChatInput() {
  document.getElementById("chat-input").value = "";
}

//検索入力フィールドの値が変更されたときにその値を小文字に変換し履歴リストの最初の項目をフィルタリングする
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


//指定された名前のCookieを取得する
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

//検索入力フィールドの値をクリアに知り歴リストの最初の項目を削除する
function clearSearchInput() {
  var historyList = document.getElementById('history-list');
  if (historyList.childNodes.length > 0) {
    historyList.removeChild(historyList.childNodes[0]);
  }
}
  

document.querySelectorAll(".history ul li").forEach((item) => {
  item.addEventListener("click", function () {
    // Remove 'clicked' class from all items
    document.querySelectorAll(".history ul li").forEach((i) => {
      i.classList.remove("clicked");
    });
    // Add 'clicked' class to the clicked item
    this.classList.add("clicked");
    // Display the content of the clicked item
    displayChatHistory(this.textContent);
  });
});



