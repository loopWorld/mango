// 从localStorage获取数据
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.main');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.textContent = '加载中...';
    container.appendChild(loadingDiv);

    // 创建切换按钮容器
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'toggle-container';
    
    // 创建两个切换按钮
    const apiToggleBtn = document.createElement('button');
    apiToggleBtn.className = 'toggle-btn';
    apiToggleBtn.textContent = '所有店铺';
    apiToggleBtn.dataset.source = 'api';
    
    const localStorageToggleBtn = document.createElement('button');
    localStorageToggleBtn.className = 'toggle-btn active';
    localStorageToggleBtn.textContent = '本地店铺';
    localStorageToggleBtn.dataset.source = 'localStorage';
    
    toggleContainer.appendChild(localStorageToggleBtn);
    toggleContainer.appendChild(apiToggleBtn);
    container.appendChild(toggleContainer);
    
    // 创建店铺列表容器
    const shopListDiv = document.createElement('div');
    shopListDiv.className = 'shop-list';
    container.appendChild(shopListDiv);
    
    // 创建添加店铺按钮
    const addShopBtn = document.createElement('button');
    addShopBtn.className = 'add-shop-btn';
    addShopBtn.textContent = '添加店铺';
    addShopBtn.style.marginTop = '15px';
    addShopBtn.style.backgroundColor = '#4CAF50';
    addShopBtn.style.color = 'white';
    container.appendChild(addShopBtn);

    // 加载店铺数据
    loadShopData()
        .then(data => {
            container.removeChild(loadingDiv);
            renderShopList(data);
        })
        .catch(error => {
            console.error('加载店铺数据失败:', error);
            loadingDiv.className = 'error';
            loadingDiv.textContent = '加载失败，请重试';
        });

    // 店铺按钮点击处理
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('shop-btn')) {
            const shopData = JSON.parse(e.target.dataset.shopData);
            chrome.runtime.sendMessage({ type: 'switchShop', shop: shopData });
            window.close();
        } else if (e.target.classList.contains('add-shop-btn')) {
            // 添加店铺按钮点击处理
            chrome.runtime.sendMessage({ type: 'addShop' });
            window.close();
        }
    });

    // 密码验证相关变量
    const correctPassword = "mongo"; // 设置正确的密码
    const passwordModal = document.getElementById('passwordModal');
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');
    const submitPasswordBtn = document.getElementById('submitPasswordBtn');
    const cancelPasswordBtn = document.getElementById('cancelPasswordBtn');
    const closeBtn = document.querySelector('.close-btn');
    
    // 显示密码验证对话框
    function showPasswordModal() {
        passwordModal.classList.remove('hidden');
        passwordInput.value = ''; // 清空密码输入框
        passwordError.classList.add('hidden'); // 隐藏错误信息
        passwordInput.focus(); // 聚焦到密码输入框
    }
    
    // 隐藏密码验证对话框
    function hidePasswordModal() {
        passwordModal.classList.add('hidden');
    }
    
    // 验证密码
    function verifyPassword() {
        const inputPassword = passwordInput.value.trim();
        
        if (inputPassword === correctPassword) {
            hidePasswordModal();
            
            // 更新按钮样式
            document.querySelectorAll('.toggle-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector('.toggle-btn[data-source="api"]').classList.add('active');
            
            // 显示API数据，隐藏localStorage数据
            const apiItems = document.querySelectorAll('.shop-item[data-source="api"]');
            const localStorageItems = document.querySelectorAll('.shop-item[data-source="localStorage"]');
            
            apiItems.forEach(item => item.classList.remove('hidden'));
            localStorageItems.forEach(item => item.classList.add('hidden'));
        } else {
            // 显示错误信息
            passwordError.classList.remove('hidden');
            passwordInput.focus();
            
            // 保持在本地店铺视图
            document.querySelectorAll('.toggle-btn').forEach(btn => {
                if (btn.dataset.source === 'localStorage') {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
    }
    
    // 密码输入框回车键处理
    passwordInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            verifyPassword();
        }
    });
    
    // 确认按钮点击处理
    submitPasswordBtn.addEventListener('click', verifyPassword);
    
    // 取消按钮点击处理
    cancelPasswordBtn.addEventListener('click', () => {
        hidePasswordModal();
        
        // 保持在本地店铺视图，确保本地按钮处于激活状态
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            if (btn.dataset.source === 'localStorage') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    });
    
    // 关闭按钮点击处理
    closeBtn.addEventListener('click', () => {
        hidePasswordModal();
        
        // 保持在本地店铺视图
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            if (btn.dataset.source === 'localStorage') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    });
    
    // 切换按钮点击处理
    toggleContainer.addEventListener('click', (e) => {
        // 确保点击的是按钮或其子元素
        const toggleBtn = e.target.closest('.toggle-btn');
        if (toggleBtn) {
            const source = toggleBtn.dataset.source;
            
            if (source === 'api') {
                // 点击"所有店铺"按钮时，显示密码验证对话框
                showPasswordModal();
            } else {
                // 点击"本地店铺"按钮时，直接切换
                // 更新按钮样式
                document.querySelectorAll('.toggle-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                toggleBtn.classList.add('active');
                
                // 显示localStorage数据，隐藏API数据
                const apiItems = document.querySelectorAll('.shop-item[data-source="api"]');
                const localStorageItems = document.querySelectorAll('.shop-item[data-source="localStorage"]');
                
                apiItems.forEach(item => item.classList.add('hidden'));
                localStorageItems.forEach(item => item.classList.remove('hidden'));
            }
        }
    });
});

// 加载店铺数据
async function loadShopData() {
    try {
        const [apiData, localStorageData] = await Promise.all([
            fetchShopDataFromAPI(),
            fetchShopDataFromLocalStorage()
        ]);

        // 合并数据，API数据在前
        return [...apiData, ...localStorageData];
    } catch (error) {
        console.error('数据加载部分失败:', error);
        // 即使API失败也返回localStorage数据
        const localStorageData = await fetchShopDataFromLocalStorage();
        return [...localStorageData];
    }
}

// 从API获取数据（带错误处理）
async function fetchShopDataFromAPI() {
    try {
        const response = await fetch('http://192.168.2.38:5000/api/getShops');
        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status}`);
        }
        const data = (await response.json()).data;
        
        // 检查并确保每个店铺数据都有SUB_PASS_ID字段
        return data.map(shop => {
            if (!shop.SUB_PASS_ID && shop.SUB_PASS_ID !== '') {
                console.warn('API返回的店铺数据缺少SUB_PASS_ID:', shop);
            }
            return { ...shop, source: 'api' };
        });
    } catch (error) {
        console.error('API数据加载失败:', error);
        return []; // 返回空数组而不是抛出错误
    }
}

// 从localStorage获取数据
async function fetchShopDataFromLocalStorage() {
    try {
        // 获取当前活动标签页
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!tab?.id) {
            console.error('No active tab found');
            return [];
        }

        // 执行脚本获取localStorage数据
        const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                try {
                    const rawData = localStorage.getItem('temulogininfo');
                    if (!rawData) return [];

                    // 解析并验证数据格式
                    const parsedData = JSON.parse(rawData);
                    if (!Array.isArray(parsedData)) {
                        console.warn('Invalid data format in localStorage, expected array');
                        return [];
                    }

                    return parsedData;
                } catch (error) {
                    console.error('Error reading localStorage:', error);
                    return [];
                }
            }
        });

        // 处理返回结果并添加source字段
        const shopData = (results[0]?.result || []).map(shop => {
            // 检查并确保每个店铺数据都有SUB_PASS_ID字段
            if (!shop.SUB_PASS_ID && shop.SUB_PASS_ID !== '') {
                console.warn('localStorage中的店铺数据缺少SUB_PASS_ID:', shop);
            }
            return {
                ...shop,
                source: 'localStorage'
            };
        });

        console.log('Fetched shop data from localStorage:', shopData);
        return shopData;
    } catch (error) {
        console.error('Error fetching shop data:', error);
        return [];
    }
}

// 渲染店铺列表
function renderShopList(data) {
    console.log('渲染店铺数据:', data);
    const shopListDiv = document.querySelector('.shop-list');
    
    // 清空店铺列表
    shopListDiv.innerHTML = '';
    
    if (!data || data.length === 0) {
        const noDataDiv = document.createElement('div');
        noDataDiv.className = 'error';
        noDataDiv.textContent = '没有找到店铺数据';
        shopListDiv.appendChild(noDataDiv);
        return;
    }

    // 创建店铺按钮
    data.forEach(shop => {
        // 确保shop对象包含SUB_PASS_ID
        if (!shop.SUB_PASS_ID && shop.SUB_PASS_ID !== '') {
            console.warn('渲染店铺按钮时缺少SUB_PASS_ID:', shop);
        }
        
        const shopItem = document.createElement('div');
        shopItem.className = 'shop-item';
        shopItem.dataset.source = shop.source || 'localStorage';
        
        const btn = document.createElement('button');
        btn.className = 'shop-btn';
        btn.textContent = shop.source === 'api' ? shop.mallName : shop.loginName;
        
        // 将完整的店铺数据存储在按钮的data属性中
        btn.dataset.shopData = JSON.stringify(shop);
        btn.dataset.source = shop.source || 'localStorage'; // 确保按钮也有data-source属性
        
        // API数据默认隐藏
        if (shop.source === 'api') {
            shopItem.classList.add('hidden');
        }
        
        shopItem.appendChild(btn);
        shopListDiv.appendChild(shopItem);
    });
}

// 辅助函数：创建带图标的按钮元素
function createButton(text, iconClass = null) {
    const btn = document.createElement('button');
    
    if (iconClass) {
        const icon = document.createElement('span');
        icon.className = `icon ${iconClass}`;
        btn.appendChild(icon);
    }
    
    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    btn.appendChild(textSpan);
    
    return btn;
}