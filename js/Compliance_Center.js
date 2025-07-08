// ==UserScript==
// @name         Compliance Center Automation
// @namespace    https://agentseller.temu.com/govern/information-supplementation
// @version      2024-10-31
// @description  Automates form filling and interactions on the compliance center.
// @author       YeHao
// @match        https://github.com/loopWorld/mango
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 监听键盘按键事件
    document.addEventListener('keyup', (event) => {
        const { key } = event;

        if (key === 'Delete') {
            handleDeleteKey();
        } else if (key === 'Enter') {
            handleEnterKey();
        }
    });

    /**
     * 处理 "Delete" 键按下事件
     */
    function handleDeleteKey() {
        ensureIdentificationCode();
        const tasks = getTasks();
        executeTasks(tasks);
    }

    /**
     * 处理 "Enter" 键按下事件
     */
    function handleEnterKey() {
        ensureIdentificationCode();
        executeMainProcess();
    }

    /**
     * 确保识别码已存储在 localStorage 中
     */
    function ensureIdentificationCode() {
        if (!localStorage.getItem('Identification_code')) {
            const code = prompt('请输入识别码');
            if (code) {
                localStorage.setItem('Identification_code', code);
            } else {
                console.error('识别码未输入，操作中止。');
            }
        }
    }

    /**
     * 模拟按键事件
     * @param {HTMLElement} element - 目标元素
     * @param {number} keyCode - 要模拟的按键代码
     */
    function simulateKeyPress(element, keyCode) {
        const event = new KeyboardEvent('keydown', {
            keyCode,
            code: keyCode,
            key: keyCode,
            which: keyCode,
            bubbles: true,
            cancelable: true,
        });
        element.dispatchEvent(event);
    }

    /**
     * 根据任务类型执行单个任务
     * @param {Object} task - 任务对象
     */
    async function executeTask(task) {
        const { title, type, select, element } = task;

        if (!element) {
            console.log(`任务 "${title}" 的目标元素未找到，跳过此任务。`);
            return;
        }

        try {
            switch (type) {
                case 'search':
                    await handleSearchTask(element, select, title);
                    break;
                case 'radio':
                    element[select]?.click();
                    break;
                case 'text':
                    element.focus();
                    document.execCommand('insertText', false, select);
                    break;
                case 'span':
                    element.click();
                    break;
                default:
                    console.warn(`未知的任务类型 "${type}"，跳过此任务。`);
            }
        } catch (error) {
            console.error(`执行任务 "${title}" 时出错:`, error);
        }
    }

    /**
     * 处理 "search" 类型的任务
     * @param {HTMLElement} element - 目标元素
     * @param {number} select - 按下方向键的次数
     * @param {string} title - 任务标题
     */
    async function handleSearchTask(element, select, title) {
        if (title === '警示类型' || title === '欧盟负责人' || title === '制造商信息' || title === '土耳其负责人') {
            const overflowItems = element.parentNode.parentNode.parentNode.querySelectorAll('.rocket-select-selection-overflow-item');
            if (overflowItems.length > 1) return;
        }

        const selectedItems = element.parentNode.parentNode.querySelectorAll('.rocket-select-selection-item');
        if (selectedItems.length !== 0) return;

        element.focus();
        for (let i = 0; i < select; i++) {
            simulateKeyPress(element, 40); // 下方向键
        }
        simulateKeyPress(element, 13); // 回车键
    }

    /**
     * 执行任务列表中的所有任务
     * @param {Array} tasks - 任务列表
     */
    async function executeTasks(tasks) {
        for (const task of tasks) {
            await executeTask(task);
        }
    }

    /**
     * 执行由 "Enter" 键触发的主流程
     */
    function executeMainProcess() {
        const firstButton = document.querySelector('.rocket-btn.rocket-btn-link.rocket-btn-sm');
        if (!firstButton) {
            console.error('未找到主按钮，操作中止。');
            return;
        }

        firstButton.click();
        setTimeout(async () => {
            const tasks = getTasks();
            await executeTasks(tasks);

            const confirmButton = document.querySelectorAll('.rocket-btn-primary')[1];
            if (confirmButton) {
                confirmButton.click();
                setTimeout(() => {
                    const nextButton = document.querySelector("#agentseller-layout-content > div > div > div > form > div > div.rocket-space.rocket-space-horizontal.rocket-space-align-start > div:nth-child(1) > button");
                    if (nextButton) {
                        nextButton.click();
                        setTimeout(executeMainProcess, 3500);
                    }
                }, 800);
            }
        }, 4000);
    }

    /**
     * 返回要执行的任务列表
     * @returns {Array} 任务列表
     */
    function getTasks() {
        return [
            { title: '警示类型', type: 'search', select: 9, element: document.getElementById("4_1000000001") },
            { title: '欧盟负责人', type: 'search', select: 1, element: document.getElementById("25_repIdList") },
            { title: '是否含电池', type: 'radio', select: 1, element: document.querySelectorAll("input.rocket-radio-input") },
            { title: '制造商信息', type: 'search', select: 3, element: document.getElementById("60_repIdList") },
            { title: '土耳其负责人', type: 'search', select: 1, element: document.getElementById("84_repIdList") },
            { title: '材质分类', type: 'search', select: 1, element: document.getElementById("166List_0_list_0_1100100460") },
            { title: '材质名称', type: 'search', select: 1, element: document.getElementById("166List_0_list_0_1100100461") },
            { title: '是否含一次性塑料', type: 'search', select: 2, element: document.getElementById("166List_0_list_0_1100100475") },
            { title: '包装类型', type: 'search', select: 3, element: document.getElementById("166List_0_list_0_1100100463") },
            { title: '包装材质重量', type: 'text', select: 11, element: document.getElementById("166List_0_list_0_1100100464") },
            { title: '一键填充其他规格', type: 'span', select: 1, element: document.querySelector(".rocket-table-tbody .rocket-table-row td:nth-child(3) button") },
            { title: '维护检测结果记录的个人联系方式-姓名', type: 'text', select: 'Pputianshichengxiangqurelangzhiyichang', element: document.getElementById("122_1100100277") },
            { title: '制造商', type: 'search', select: 2, element: document.getElementById("33_1000100091") },
            { title: '制造日期/保质期', type: 'search', select: 2, element: document.getElementById("34_1000100092") },
            { title: '品质保证标准', type: 'search', select: 2, element: document.getElementById("35_1000100087") },
            { title: '产品构成/组件', type: 'search', select: 2, element: document.getElementById("37_1000100105") },
            { title: '根据进口食品安全管理特别法进行的进口申报', type: 'search', select: 1, element: document.getElementById("48_1000100119") },
            { title: '使用方法和操作注意事项', type: 'search', select: 2, element: document.getElementById("41_1000100109") },
            { title: '型号', type: 'search', select: 2, element: document.getElementById("49_1000100120") },
            { title: '补充认证信息', type: 'search', select: 3, element: document.getElementById("50_1000100090") },
            { title: '警告或安全信息（补充）', type: 'search', select: 2, element: document.getElementById("42_1000100110") },
            { title: '认证信息', type: 'search', select: 0, element: document.getElementById("50_1000100123") },
            { title: '删除识别码', type: 'span', select: 0, element: document.querySelector(".rocket-input-suffix > i") },
            { title: '商品识别码', type: 'text', select: localStorage.getItem('Identification_code'), element: document.getElementById("611100100115List_0_name") },
        ];
    }
})();