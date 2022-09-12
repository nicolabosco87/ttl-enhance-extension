
let autoDopeInterval: NodeJS.Timer;

const handleAutoDope = (autoDope: boolean) => {
  if (autoDope) {
    autoDopeInterval = setInterval(() => { 
      const likeButton = document.querySelectorAll("[data-for='vote-button']")[1] as HTMLButtonElement; 
      if (likeButton) {
        likeButton.click();
      };
    }, 1000)
    console.log("AutoDope enabled");
  } else {
    if (autoDopeInterval) {
      clearInterval(autoDopeInterval)
    }
    console.log("AutoDope disabled");
  }
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (changes["autoDope"]) {
    handleAutoDope(changes["autoDope"].newValue ?? false);
  }
});
 
console.log("Init TTL-ENHANCE");
chrome.storage.sync.get({autoDope: false}, (values) => {
  handleAutoDope(values.autoDope);
})