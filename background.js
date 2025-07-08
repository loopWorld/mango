// 清理系统文件函数
function cleanSystemFiles() {
  if (chrome.runtime.getPlatformInfo) {
    chrome.runtime.getPlatformInfo((info) => {
      if (info.os === 'win') {
        console.log('Windows系统检测到，建议禁用缩略图缓存');
      }
    });
  }
}

// 初始化时调用清理函数
cleanSystemFiles();

// 定义declarativeNetRequest规则
const rules = [
  {
    id: 1,
    priority: 1,
    action: {
      type: 'modifyHeaders',
      requestHeaders: [
        { header: 'Content-Type', operation: 'set', value: 'application/json' }
      ]
    },
    condition: {
      urlFilter: 'https://seller.kuajingmaihuo.com/bg/quiet/api/mms/login',
      resourceTypes: ['xmlhttprequest']
    }
  }
];

// 注册规则
chrome.declarativeNetRequest.updateDynamicRules({
  addRules: rules,
  removeRuleIds: rules.map(rule => rule.id)
});

// 监听登录请求获取loginName
chrome.webRequest.onBeforeRequest.addListener(
  async (details) => {
    if (details.url.includes('https://seller.kuajingmaihuo.com/bg/quiet/api/mms/login') &&
      details.method === 'POST') {
      try {
        // 解析请求体
        console.log('原始请求体数据:', details.requestBody);
        if (details.requestBody?.raw?.[0]?.bytes instanceof ArrayBuffer) {
          try {
            const buffer = details.requestBody.raw[0].bytes;
            const uint8Array = new Uint8Array(buffer);
            const textBody = new TextDecoder('utf-8').decode(uint8Array);
            console.log('解码后的请求体:', textBody);

            // 调试输出ArrayBuffer内容
            console.log('ArrayBuffer十六进制:',
              Array.from(uint8Array).map(b => b.toString(16).padStart(2, '0')).join(' '));

            let loginName;
            // 尝试解析为JSON
            try {
              const jsonData = JSON.parse(textBody);
              loginName = jsonData.loginName;
            } catch (jsonError) {
              // 如果不是JSON，尝试作为URL编码表单数据
              console.log('请求体不是JSON格式，尝试作为表单数据解析');
              const params = new URLSearchParams(textBody);
              loginName = params.get('loginName');
            }
            console.log('解析出的loginName:', loginName);

            if (loginName) {
              await chrome.storage.local.set({ 'loginName': loginName });
              console.log('loginName已存储:', loginName);

              // 验证存储结果
              const stored = await chrome.storage.local.get('loginName');
              console.log('验证存储的loginName:', stored.loginName);
            } else {
              console.warn('未从请求体中获取到loginName');
            }
          } catch (error) {
            console.error('解析请求体失败:', error);
          }
        }
      } catch (error) {
        console.error('解析loginName失败:', error);
      }
    }
  },
  { urls: ["https://seller.kuajingmaihuo.com/*"] },
  ["requestBody"]
);

// 保留原有的cookie监听
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

          // 获取loginName并发送到本地API
          console.log('准备发送到本地API，检查数据...');
          try {
            const { loginName } = await chrome.storage.local.get('loginName');
            console.log('获取到的loginName:', loginName);
            console.log('当前的subPassId:', subPassId);

            if (loginName && subPassId) {
              console.log('数据完整，准备发送请求...');

              // 将数据存储到页面localStorage
              try {
                const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
                if (tabs[0]?.id) {
                  await chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: (loginInfo) => {
                      // 读取现有数据
                      let storedData = [];
                      try {
                        const stored = localStorage.getItem('temulogininfo');
                        if (stored) {
                          storedData = JSON.parse(stored);
                          if (!Array.isArray(storedData)) {
                            storedData = []; // 如果不是数组则重置
                          }
                        }
                      } catch (e) {
                        console.warn('解析现有登录数据失败，将创建新数据');
                        storedData = [];
                      }

                      // 查找是否已存在相同loginName
                      const existingIndex = storedData.findIndex(
                        item => item.loginName === loginInfo.loginName
                      );

                      if (existingIndex >= 0) {
                        // 更新现有记录
                        storedData[existingIndex].SUB_PASS_ID = loginInfo.SUB_PASS_ID;
                      } else {
                        // 添加新记录
                        storedData.push({
                          loginName: loginInfo.loginName,
                          SUB_PASS_ID: loginInfo.SUB_PASS_ID
                        });
                      }

                      // 存储更新后的数据
                      localStorage.setItem('temulogininfo', JSON.stringify(storedData));
                      console.log('登录信息已更新到页面localStorage');
                    },
                    args: [{
                      loginName: loginName,
                      SUB_PASS_ID: subPassId
                    }]
                  });
                }
              } catch (storageError) {
                console.error('存储到localStorage失败:', storageError);
              }

              const response = await fetch('http://192.168.2.38:5000/api/insert_SUB_PASS_ID', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  loginName,
                  SUB_PASS_ID: subPassId
                })
              });

              if (response.ok) {
                console.log('SUB_PASS_ID成功发送到本地API');
              } else {
                console.error('本地API请求失败:', response.status);
              }
            }
          } catch (error) {
            console.error('发送SUB_PASS_ID到本地API出错:', error);
          }
        }
      }
    }
    return { responseHeaders: details.responseHeaders };
  },
  { urls: ["https://seller.kuajingmaihuo.com/*"] },
  ["responseHeaders", "extraHeaders"]
);

// 消息监听器
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  // 处理添加店铺请求
  if (request.type === 'addShop') {
    console.log('收到添加店铺请求');
    
    try {
      // 获取当前活动标签页
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab?.id) {
        // 重定向到登录页面
        await chrome.tabs.update(tab.id, { url: 'https://seller.kuajingmaihuo.com/login' });
        console.log('已重定向到登录页面');
      } else {
        console.error('未找到活动标签页');
      }
    } catch (error) {
      console.error('重定向页面失败:', error);
    }
    
    return false; // 不需要保持消息通道开放
  }
  
  // 处理切换店铺请求
  if (request.type === 'switchShop') {
    console.log('收到切换店铺请求:', request.shop);
    
    // 检查shop对象是否存在
    if (!request.shop) {
      console.error('切换店铺失败: shop对象不存在');
      return false;
    }
    
    // 获取SUB_PASS_ID
    const subPassId = request.shop.SUB_PASS_ID;
    
    if (subPassId) {
      // 设置Cookie
      chrome.cookies.set({
        url: "https://seller.kuajingmaihuo.com",
        name: "SUB_PASS_ID",
        value: String(subPassId),
        path: "/",
        secure: true,
        sameSite: "lax"
      }, async (cookie) => {
        if (chrome.runtime.lastError) {
          console.error('设置Cookie失败:', chrome.runtime.lastError);
        } else {
          console.log('成功设置Cookie:', cookie);
          
          try {
            // 获取当前活动标签页
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab?.id) {
              // 检查URL是否包含login
              if (tab.url.includes('login')) {
                // 如果包含login，则重定向到首页
                await chrome.tabs.update(tab.id, { url: 'https://seller.kuajingmaihuo.com/' });
                console.log('检测到login页面，已重定向到首页');
              } else {
                // 否则正常刷新页面
                await chrome.tabs.reload(tab.id);
                console.log('页面已刷新');
              }
            } else {
              console.error('未找到活动标签页');
            }
          } catch (error) {
            console.error('刷新/重定向页面失败:', error);
          }
        }
      });
    } else {
      console.error('店铺数据中没有SUB_PASS_ID');
    }
    
    return false; // 不需要保持消息通道开放
  }
  
  if (request.action === 'setCookie') {
    // 设置Cookie
    chrome.cookies.set({
      url: "https://seller.kuajingmaihuo.com",
      name: "SUB_PASS_ID",
      value: String(request.SUB_PASS_ID),
      path: "/",
      httpOnly: true,
      secure: true,
      expirationDate: Math.floor(Date.now() / 1000) + 3600
    }, (cookie) => {
      if (chrome.runtime.lastError) {
        sendResponse({success: false, error: chrome.runtime.lastError});
      } else {
        sendResponse({success: true, cookie: cookie});
      }
    });
    return true; // 保持消息通道开放
  }

  if (request.action === 'getLoginInfo') {
    // 从页面localStorage获取登录信息
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]?.id) {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          func: () => {
            const data = localStorage.getItem('temulogininfo');
            return data ? JSON.parse(data) : null;
          }
        }, (results) => {
          if (chrome.runtime.lastError) {
            sendResponse({error: chrome.runtime.lastError.message});
            return;
          }
          sendResponse({data: results[0]?.result});
        });
      } else {
        sendResponse({error: 'No active tab found'});
      }
    });
    return true; // 保持消息通道开放
  }
});