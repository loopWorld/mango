// 关闭弹窗脚本
if (typeof document !== 'undefined') {
    console.log('Browser environment detected, press NumPad 1 to close popups');
    const selectors = [
        '.MDL_iconWrapper_5-118-0',
        '.modal-content_closeIcon__2C8Fb',
    ];

    // 键盘事件监听
    document.addEventListener('keydown', (e) => {
        // 检查数字键盘1 (code "Numpad1")
        if (e.code === "Delete") {
            console.log('Delete pressed, searching for popups...');
            
            // 5秒超时搜索
            const timeout = 5000;
            const startTime = Date.now();
            
            function searchAndClose() {
                // 检查每个选择器
                selectors.forEach(selector => {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(element => {
                        console.log(`Found element with selector ${selector}, clicking...`);
                        element.click();
                    });
                });

                // 继续搜索直到超时
                if (Date.now() - startTime < timeout) {
                    setTimeout(searchAndClose, 100);
                } else {
                    console.log('5 second timeout reached, stopping search');
                }
            }
            
            searchAndClose();
        }
    });
} else {
    console.warn('This script requires a browser environment');
}
const selectors = [
    '.MDL_iconWrapper_5-118-0',
    '.modal-content_closeIcon__2C8Fb',
];

// 检查所有选择器是否都不存在
function checkElementsAbsent() {
    return selectors.every(selector => !document.querySelector(selector));
}

// 带超时的元素查找
function waitForAnyElement(selectors, timeout) {
    return new Promise((resolve, reject) => {
        const endTime = Date.now() + timeout;

        function check() {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                return;
            }

            if (Date.now() > endTime) {
                reject(new Error(`Element not found within ${timeout}ms`));
                return;
            }

            setTimeout(check, 100);
        }

        check();
    });
}

// 持续监控并关闭弹窗
function monitorAndClose(startTime = Date.now()) {
    // 首先检查是否所有元素都已消失
    if (checkElementsAbsent()) {
        console.log('All monitored elements are gone, exiting');
        return;
    }

    // 检查每个选择器对应的元素
    selectors.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            console.log(`Found element with selector ${selector}, clicking...`);
            element.click();
        }
    });

    // 继续监控，除非已超过5秒
    if (Date.now() - startTime < 10000) {
        setTimeout(() => monitorAndClose(startTime), 100);
    } else {
        console.log('Monitoring timeout reached, exiting');
    }
}

// 开始监控
// monitorAndClose();