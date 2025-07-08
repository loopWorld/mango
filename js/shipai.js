// 文件选择自动化
async function autoSelectFile() {
    try {
        // 1. 获取文件输入元素
        const input = document.querySelectorAll("input[type=file]")[1];
        if (!input) {
            throw new Error('未找到文件输入元素');
        }

        // 2. 获取插件内图片资源
        const imagePath = chrome.runtime.getURL('img/shipai.jpeg');
        console.log('加载插件资源:', imagePath);

        // 3. 获取图片数据
        const response = await fetch(imagePath);
        if (!response.ok) {
            throw new Error(`图片加载失败: ${response.status}`);
        }

        const blob = await response.blob();
        console.log('图片信息:', {
            type: blob.type,
            size: blob.size
        });

        // 4. 验证图片格式
        if (!blob.type.match(/^image\/(jpeg|png)$/)) {
            throw new Error(`不支持的图片格式: ${blob.type}`);
        }

        // 5. 创建File对象
        const file = new File([blob], 'shipai.jpeg', {
            type: 'image/jpeg',
            lastModified: Date.now()
        });

        // 6. 模拟文件选择
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;

        // 7. 触发change事件
        const event = new Event('change', {
            bubbles: true,
            cancelable: true
        });
        input.dispatchEvent(event);

        console.log('文件已自动选择:', file.name);
        return true;
    } catch (error) {
        console.error('自动选择文件失败:', error);
        return false;
    }
}

// 上传状态检测
function checkUploadStatus() {
    return new Promise((resolve, reject) => {
        const statusElement = '.rocket-upload-picture-card-wrapper';
        const submitButton = '.rocket-drawer-footer button:first-child';
        
        let retryCount = 0;
        const maxRetry = 20;
        const interval = 500;
        
        const checkInterval = setInterval(() => {
            try {
                const elements = document.querySelectorAll(statusElement)[1].querySelector('.rocket-upload-list > div') || null;
                console.log('上传状态检测中...', {elements: elements});
                if (elements) {
                    clearInterval(checkInterval);
                    console.log('上传成功，准备点击提交按钮');
                    
                    // 确保按钮可见并可点击
                    const submitBtn = document.querySelector(submitButton);
                    if (submitBtn && submitBtn.offsetParent !== null) {
                        console.log('找到提交按钮，准备点击');
                        submitBtn.click();
                        resolve(true);
                    } else {
                        clearInterval(checkInterval);
                        reject(new Error('提交按钮不可用'));
                    }
                } else if (!elements) {
                    retryCount++;
                    console.log(`上传检测中... 重试次数: ${retryCount}/${maxRetry}`);
                    if (retryCount >= maxRetry) {
                        clearInterval(checkInterval);
                        reject(new Error('上传超时'));
                    }
                }
            } catch (error) {
                clearInterval(checkInterval);
                console.error('上传状态检测出错:', error);
                reject(new Error('上传状态检测出错: ' + error.message));
            }
        }, interval);
    });
}

// 提交后状态检测
function postSubmitCheck(initialText) {
    return new Promise((resolve, reject) => {
        const drawerElement = '.rocket-drawer-content > div';
        const searchButton = '#agentseller-layout-content > div > div > div > form > div:nth-child(3) > div.rocket-space.rocket-space-horizontal.rocket-space-align-start > div:nth-child(1) > button';
        const textElement = "#agentseller-layout-content > div > div > div > div:nth-child(3) > div.rocket-spin-nested-loading > div > div.rocket-table-wrapper > div > div > div > div > div.rocket-table-body > table > tbody > tr:nth-child(2) > td:nth-child(1) > div > div:nth-child(2) > div:nth-child(2)";
        
        let retryCount = 0;
        const maxRetry = 20;
        const interval = 500;
        
        // 检测drawer是否关闭
        const checkInterval = setInterval(() => {
            try {
                const drawer = document.querySelector(drawerElement);
                console.log('检测drawer状态:', drawer ? '存在' : '已关闭');
                
                if (!drawer) {
                    clearInterval(checkInterval);
                    console.log('drawer已关闭，准备点击搜索按钮');
                    
                    // 确保点击生效
                    setTimeout(() => {
                        const searchBtn = document.querySelector(searchButton);
                        if (searchBtn && searchBtn.offsetParent !== null) {
                            console.log('找到搜索按钮，准备点击');
                            searchBtn.click();
                            
                            // 检查文本是否变化，最多重试20次
                            let textRetryCount = 0;
                            const maxTextRetry = 20;
                            const textCheckInterval = setInterval(() => {
                                const currentText = document.querySelector(textElement).innerText;
                                console.log('文本对比:', {initial: initialText, current: currentText});
                                
                                if (currentText !== initialText) {
                                    clearInterval(textCheckInterval);
                                    console.log('文本已变化，查询完成');
                                    setTimeout(() => {
                                        resolve(true);
                                    }, 2000);
                                } else if (textRetryCount >= maxTextRetry) {
                                    clearInterval(textCheckInterval);
                                    console.log('文本未变化，达到最大重试次数');
                                    reject(new Error('文本未变化，可能仍在加载'));
                                } else {
                                    textRetryCount++;
                                    console.log(`文本未变化，继续检测 (${textRetryCount}/${maxTextRetry})`);
                                }
                            }, 500);
                        } else {
                            clearInterval(checkInterval);
                            reject(new Error('搜索按钮不可用'));
                        }
                    }, 1000);
                } else {
                    retryCount++;
                    console.log(`等待drawer关闭... 重试次数: ${retryCount}/${maxRetry}`);
                    if (retryCount >= maxRetry) {
                        clearInterval(checkInterval);
                        reject(new Error('drawer关闭超时'));
                    }
                }
            } catch (error) {
                clearInterval(checkInterval);
                console.error('状态检测出错:', error);
                reject(new Error('状态检测出错: ' + error.message));
            }
        }, interval);
    });
}

// 等待元素出现
function waitForElement(selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const checkInterval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(checkInterval);
                resolve(element);
            } else if (Date.now() - startTime > timeout) {
                clearInterval(checkInterval);
                reject(new Error(`等待元素超时: ${selector}`));
            }
        }, 200);
    });
}

// 执行完整任务流程
async function executeTask(attempt = 1, maxAttempts = 1000) {
    try {
        console.log(`开始执行任务，第${attempt}次尝试`);
        
        // 0. 保存初始文本
        const initialText = document.querySelector("#agentseller-layout-content > div > div > div > div:nth-child(3) > div.rocket-spin-nested-loading > div > div.rocket-table-wrapper > div > div > div > div > div.rocket-table-body > table > tbody > tr:nth-child(2) > td:nth-child(1) > div > div:nth-child(2) > div:nth-child(2)").innerText;
        console.log('保存初始文本:', initialText);
        
        // 1. 点击触发按钮
        const triggerBtn = await waitForElement(
            '#agentseller-layout-content > div > div > div > div:nth-child(3) > div.rocket-spin-nested-loading > div > div.rocket-table-wrapper > div > div > div > div > div.rocket-table-body > table > tbody > tr:nth-child(2) > td:nth-child(5) > button',
            15000
        );
        triggerBtn.click();
        
        // 2. 等待drawer加载并滚动到底部
        const drawerBody = await waitForElement('.rocket-drawer-body', 10000);
        if (drawerBody) {
            console.log('找到drawer body，准备滚动到底部');
            
            await new Promise((resolve) => {
                const initialScroll = drawerBody.scrollTop;
                const targetScroll = drawerBody.scrollHeight;
                const scrollDuration = 800;
                const startTime = Date.now();
                let animationFrameId;
                
                const scrollStep = () => {
                    const currentTime = Date.now();
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / scrollDuration, 1);
                    
                    drawerBody.scrollTop = initialScroll + (targetScroll - initialScroll) * progress;
                    
                    if (progress < 1) {
                        animationFrameId = requestAnimationFrame(scrollStep);
                    } else {
                        // 最终位置验证
                        if (Math.abs(drawerBody.scrollTop + drawerBody.clientHeight - drawerBody.scrollHeight) > 10) {
                            drawerBody.scrollTop = drawerBody.scrollHeight;
                        }
                        console.log('滚动完成验证:', {
                            scrollTop: drawerBody.scrollTop,
                            clientHeight: drawerBody.clientHeight,
                            scrollHeight: drawerBody.scrollHeight
                        });
                        cancelAnimationFrame(animationFrameId);
                        resolve();
                    }
                };
                
                scrollStep();
                
                // 安全超时处理
                setTimeout(() => {
                    cancelAnimationFrame(animationFrameId);
                    if (Math.abs(drawerBody.scrollTop + drawerBody.clientHeight - drawerBody.scrollHeight) > 10) {
                        drawerBody.scrollTop = drawerBody.scrollHeight;
                    }
                    console.warn('滚动完成(超时)', drawerBody.scrollTop);
                    resolve();
                }, scrollDuration + 1000);
            });
            
            console.log('滚动操作已完成');
        } else {
            console.warn('未找到drawer body元素');
        }
        
        // 3. 等待input元素加载完成
        await waitForElement('input[type="file"]', 10000);
        
        // 3. 执行文件选择和上传
        const fileSelected = await autoSelectFile();
        if (!fileSelected) {
            throw new Error('文件选择失败');
        }
        
        // 4. 监控上传状态
        await checkUploadStatus();
        
        // 5. 监控提交后状态
        await postSubmitCheck(initialText);
        
        console.log('任务执行成功');
        
        // // 6. 等待页面刷新
        // await new Promise(resolve => setTimeout(resolve, 3000));
        
        // 7. 检查是否达到最大尝试次数
        if (attempt >= maxAttempts) {
            console.log(`已达到最大尝试次数${maxAttempts}次，停止执行`);
            return;
        }
        
        // 8. 重新查找触发按钮并执行
        try {
            const newTriggerBtn = await waitForElement(
                '#agentseller-layout-content > div > div > div > div:nth-child(3) > div.rocket-spin-nested-loading > div > div.rocket-table-wrapper > div > div > div > div > div.rocket-table-body > table > tbody > tr:nth-child(14) > td:nth-child(5) > button',
                10000
            );
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            executeTask(attempt + 1, maxAttempts);
        } catch (error) {
            console.error('重新查找触发按钮失败:', error);
        }
        
    } catch (error) {
        console.error('任务执行失败:', error);
        
        // 失败后重试
        if (attempt < maxAttempts) {
            console.log(`准备重试，当前尝试次数: ${attempt}`);
            await new Promise(resolve => setTimeout(resolve, 3000));
            executeTask(attempt + 1, maxAttempts);
        }
    }
}

// 键盘事件监听
document.addEventListener('keydown', (event) => {
    if (event.key === 'Delete') {
        executeTask();
    }
});