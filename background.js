chrome.runtime.onInstalled.addListener(() => {
  // 插件安装时的初始化操作
  console.log('插件已安装')
});

chrome.runtime.onStartup.addListener(() => {
  // 浏览器启动时的初始化操作
  console.log('浏览器已启动')
});

// // 发送消息到内容脚本或其他部分
// chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//   const tabId = tabs[0].id;
//   chrome.tabs.sendMessage(tabId, { message: 'Hello from background.js' });
// });

// // 接收来自内容脚本或其他部分的消息
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === 'getData') {
//     const data = { key: 'value' }; // 示例数据
//     sendResponse(data); 
//   }
// });

// END: gl4e5c3xef45

