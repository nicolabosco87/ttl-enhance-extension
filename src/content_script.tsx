

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.color) {
    console.log("Receive color = " + msg.color);
    document.body.style.backgroundColor = msg.color;
    sendResponse("Change color to " + msg.color);
  } else {
    sendResponse("Color message is none.");
  }
});

const interval = setInterval(() => {
  let chatArea = document.getElementById("chat-scroll-area");
  let input = document.getElementById("chat-input") as HTMLInputElement;
  let send = document.querySelector("button[data-testid=send-message-button]") as HTMLButtonElement;
  const lastChild = chatArea ? chatArea.lastChild as HTMLDivElement : undefined;

  const lastMessageWrapper = document.querySelector("#chat-scroll-area > div:last-of-type") as HTMLDivElement;

  const lastMessageUserInfos = document.querySelector("#chat-scroll-area > div:last-of-type > div > div:last-of-type > div > div");
  const lastMessage = document.querySelector("#chat-scroll-area > div:last-of-type > div > div:last-of-type > div > div");


  if (chatArea && input && send && lastMessageUserInfos && lastMessage && lastMessageWrapper) {

    const lastMessageUserInfosText = getElementTextNode(lastMessageUserInfos);
    const lastMessageText = getElementTextNode(lastMessage);

      if (lastMessageText && !lastMessageWrapper.dataset["handled"]) {
        if (lastMessageText.indexOf("/bob") === 0) {
          console.log("Init /bob");
          (lastChild as HTMLDivElement).dataset["handled"] = "1";
          typeAndSend("https://media1.giphy.com/media/N8wR1WZobKXaE/giphy.gif?cid=ecf05e47ldrm00v2gg1rqpkug8o5yigiu5xft7ox18bzj431&rid=giphy.gif");
        }
      }
  }

}, 500);

const getElementTextNode = (el: Element) => {
  for (var i = 0; i < el.childNodes.length; ++i)
    if (el.childNodes[i].nodeType === Node.TEXT_NODE) return el.childNodes[i].textContent;

  return "";
} 


const typeAndSend = (text: string) => {
  let input = document.getElementById("chat-input") as HTMLInputElement;
  let send = document.querySelector("button[data-testid=send-message-button]") as HTMLButtonElement;

  input.focus();
  document.execCommand('insertText', false, text);
  send.click();
}