document.addEventListener('keyup', e => {
    let { key } = e
    if (key == 'Delete') {
        main()
    }

})
async function main() {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 5000;
    const OPERATION_TIMEOUT = 10000;

    // 等待元素函数
    function waitForElement(selector, timeout = OPERATION_TIMEOUT) {
        return new Promise((resolve, reject) => {
            const endTime = Date.now() + timeout;

            function check() {
                const element = document.querySelector(selector);
                if (element) {
                    resolve(element);
                    return;
                }

                if (Date.now() > endTime) {
                    reject(new Error(`Element ${selector} not found within ${timeout}ms`));
                    return;
                }

                setTimeout(check, 100);
            }

            check();
        });
    }

    // 带重试的操作执行
    async function executeWithRetry(operation, retries = MAX_RETRIES) {
        let lastError;

        for (let i = 0; i < retries; i++) {
            try {
                return await operation();
            } catch (error) {
                lastError = error;
                console.warn(`Attempt ${i + 1} failed:`, error);
                if (i < retries - 1) {
                    await new Promise(r => setTimeout(r, RETRY_DELAY));
                }
            }
        }

        throw lastError;
    }

    // 主操作流程函数
    async function executeProcess() {
        console.log('Starting automation process...');

        try {
            // 1. 批量处理操作
            await executeWithRetry(async () => {
                const elements = await Promise.all([
                    waitForElement('thead tr .CBX_input_5-118-0'),
                    waitForElement('.index-module__divider-wrapper___3fWkR button')
                ]);
                elements[0].click();
                elements[1].click();
            });

            // 2. 处理单选框 - 优化选择器和等待逻辑
            await executeWithRetry(async () => {
                // 简化版单选框处理逻辑
                const radioButtons = document.querySelectorAll('.MDL_alert_5-118-0 td label:last-child');

                if (radioButtons.length === 0) {
                    return console.error('Debug: No radio buttons found using selector');
                    // throw new Error(`No radio buttons found in ${radioButtons.length} rows`);
                }

                console.log(`Found ${radioButtons.length} radio buttons to click`);

                // 创建计数器
                let clickCounter = 0;

                // 顺序点击单选框并计数
                for (const radio of radioButtons) {
                    try {
                        radio.click();
                        clickCounter++;
                        console.log(`Clicked radio button ${clickCounter}/${radioButtons.length}:`, radio);
                        await new Promise(r => setTimeout(r, 30)); // 确保点击完成
                    } catch (error) {
                        console.error('Error clicking radio button:', error);
                        throw error;
                    }
                }

                // 在页面顶部显示点击总数
                const counterDisplay = document.createElement('div');
                counterDisplay.style.position = 'fixed';
                counterDisplay.style.top = '10px';
                counterDisplay.style.right = '10px';
                counterDisplay.style.padding = '10px';
                counterDisplay.style.backgroundColor = '#f0f0f0';
                counterDisplay.style.border = '1px solid #ccc';
                counterDisplay.style.borderRadius = '4px';
                counterDisplay.style.zIndex = '9999';
                counterDisplay.textContent = `已成功点击 ${clickCounter} 个单选框`;
                document.body.appendChild(counterDisplay);

                // 5秒后自动移除提示并点击提交按钮
                setTimeout(async () => counterDisplay.remove(), 5000);
            }, 5);

            // 3. 处理文本输入 - 使用更可靠的方式
            await executeWithRetry(async () => {
                // 使用更通用的文本输入框选择器
                const inputList = await waitForElement('textarea, [role="textbox"]', OPERATION_TIMEOUT * 2);
                const textareas = document.querySelectorAll('tr td:last-child label:last-child textarea');

                await Promise.all([...textareas].map(async (item, index) => {
                    try {
                        // 处理React双向绑定的textarea
                        item.focus();

                        // 获取React内部的事件处理器
                        const reactPropsKey = Object.keys(item).find(key => key.startsWith('__reactProps'));
                        const reactProps = reactPropsKey ? item[reactPropsKey] : null;

                        if (reactProps && reactProps.onChange) {
                            // 模拟React的变更事件
                            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                                HTMLTextAreaElement.prototype, 'value'
                            ).set;

                            // 1. 先清空原有值
                            nativeInputValueSetter.call(item, '');
                            reactProps.onChange({ target: item, currentTarget: item });

                            // 2. 设置新值
                            await new Promise(r => setTimeout(r, 100));
                            nativeInputValueSetter.call(item, '没有利润');
                            reactProps.onChange({ target: item, currentTarget: item });

                            // 3. 触发其他必要事件
                            ['input', 'blur', 'focus'].forEach(eventType => {
                                const event = new Event(eventType, { bubbles: true });
                                item.dispatchEvent(event);
                            });
                        } else {
                            // 回退方案
                            item.value = '没有利润';
                            ['input', 'change'].forEach(eventType => {
                                item.dispatchEvent(new Event(eventType, { bubbles: true }));
                            });
                        }

                        await new Promise(r => setTimeout(r, 300)); // 等待React更新完成

                        // 验证结果
                        if (item.value !== '没有利润') {
                            throw new Error(`Textarea ${index} value not set`);
                        }

                        console.log(`Successfully pasted value into textarea ${index}`);
                    } catch (error) {
                        console.error(`Error pasting into textarea ${index}:`, error);
                        throw error;
                    }
                }));
            }, 5); // 增加重试次数

            // 4. 处理提交按钮 - 使用更可靠的方式
            await executeWithRetry(async () => {
                // 使用更通用的提交按钮选择器
                const submitButton = await waitForElement('.MDL_alert_5-118-0 button:first-child', OPERATION_TIMEOUT * 2);
                submitButton.click();
                console.log('Successfully clicked submit button');
            }, 5); // 增加重试次数

            // 5. 自动化完成
            console.log('Automation started...');
            console.log('Automation completed successfully!');
        } catch (error) {
            console.error('Automation failed:', error);

            // 检查token是否过期
            if (error.message.includes('token') || error.message.includes('Token')) {
                console.error('Token expired or invalid, please refresh the page');
                return;
            }

            // 其他错误处理逻辑
            console.error('Please check the console for details and try again');

            // 可以添加错误通知逻辑
            try {
                try {
                    const notification = await waitForElement('.notification-area', 3000);
                    notification.textContent = '自动化操作失败，请检查控制台';
                    notification.style.display = 'block';
                } catch (e) {
                    console.error('Failed to show error notification:', e);
                }
            } catch (error) {
                console.error('Error in error handling:', error);
            }
        }

        // 尝试点击下一页按钮
        try {
            const nextPageButton = await waitForElement('.PGT_next_5-118-0', OPERATION_TIMEOUT);
            nextPageButton.click();
            console.log('Clicked next page button');
            await new Promise(r => setTimeout(r, RETRY_DELAY));
            await executeProcess();
        } catch (error) {
            console.log('No more pages found or failed to click next page button:', error);
            console.log('Automation completed.');
        }
    }
    // 启动主流程
    await executeProcess();
}


