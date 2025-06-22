chrome.webRequest.onHeadersReceived.addListener(
  async (details) => {
    if (details.url.includes('https://seller.kuajingmaihuo.com/bg/quiet/api/mms/login')) {
      const cookieHeader = details.responseHeaders.find(
        header => header.name.toLowerCase() === 'set-cookie'
      );
      
      if (cookieHeader) {
        // 提取SUB_PASS_ID
        const subPassId = cookieHeader.value.match(/SUB_PASS_ID=([^;]+)/)?.[1];
        if (subPassId) {
          await chrome.storage.local.set({ 'SUB_PASS_ID': subPassId });
          console.log('SUB_PASS_ID已存储:', subPassId);
          
          // 发送给content scripts（可选）
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.id) {
              chrome.tabs.sendMessage(tabs[0].id, { 
                type: 'COOKIE_UPDATE',
                SUB_PASS_ID: subPassId 
              });
            }
          });
        }
      }
    }
    return { responseHeaders: details.responseHeaders };
  },
  { urls: ["https://seller.kuajingmaihuo.com/*"] },
  ["responseHeaders", "extraHeaders"]
);
