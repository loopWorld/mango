// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-10-31
// @description  try to take over the world!
// @author       You
// @match        https://github.com/loopWorld/mango
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==
(function () {
    'use strict';
    document.addEventListener('keyup', e => {
        let { key } = e
        if (key == 'Delete') {
            if (!localStorage.getItem('Identification_code')) {
                let code = prompt('请输入识别码')
                localStorage.setItem('Identification_code', code)
            }
            let arr = [
                {
                    title: '警示类型',
                    type: 'search',
                    select: 1,
                    doc: document.getElementById("4_1000000001") || null
                },
                {
                    title: '欧盟负责人',
                    type: 'search',
                    select: 1,
                    doc: document.getElementById("25_repIdList") || null
                },
                {
                    title: '是否含电池',
                    type: 'radio',
                    select: 1,
                    doc: document.querySelectorAll("input.rocket-radio-input")
                },
                {
                    title: '制造商信息',
                    type: 'search',
                    select: 1,
                    doc: document.getElementById("60_repIdList") || null
                },
                {
                    title: '制造商',
                    type: 'search',
                    select: 3,
                    doc: document.getElementById("33_1000100091") || null
                },
                {
                    title: '制造日期/保质期',
                    type: 'search',
                    select: 3,
                    doc: document.getElementById("34_1000100092") || null
                },
                {
                    title: '品质保证标准',
                    type: 'search',
                    select: 4,
                    doc: document.getElementById("35_1000100087") || null
                },
                {
                    title: '使用方法和操作注意事项',
                    type: 'search',
                    select: 3,
                    doc: document.getElementById("41_1000100109") || null
                },
                {
                    title: '型号',
                    type: 'search',
                    select: 3,
                    doc: document.getElementById("49_1000100120") || null
                },
                {
                    title: '补充认证信息',
                    type: 'search',
                    select: 3,
                    doc: document.getElementById("50_1000100090") || null
                },
                {
                    title: '警告或安全信息（补充）',
                    type: 'search',
                    select: 3,
                    doc: document.getElementById("42_1000100110") || null
                },
                {
                    title: '商品识别码',
                    type: 'text',
                    select: localStorage.getItem('Identification_code'),
                    doc: document.getElementById("611100100115List_0_name") || null
                }
            ];
            for (let item of arr) fn(item)
        }
        /**
         * 模拟按键事件
         * @param {Document} doc - 文档对象
         * @param {number} keyCode - 要模拟的按键的键码
         * @returns {void} - 无返回值
         */
        function simulateKeyPress(doc, keyCode) {
            const event = new KeyboardEvent('keydown', {
                keyCode: keyCode,
                code: keyCode,
                key: keyCode,
                which: keyCode,
                bubbles: true,
                cancelable: true,
            });
            doc.dispatchEvent(event);
        }

        /**
         * 延迟指定的毫秒数
         * @param {number} ms - 要延迟的毫秒数
         * @returns {Promise} - 一个 Promise，它会在指定的毫秒数后 resolve
         */
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        function fn(item) {
            let { title, type, select, doc } = item;
            if (!doc || doc.length == 0) return;
            if (type === 'search') {
                doc.focus();
                // 键盘循环模拟按下向下键                           
                for (let i = 0; i < select; i++)simulateKeyPress(doc, 40);
                // 键盘模拟按下回车键
                simulateKeyPress(doc, 13);
                return
            }
            if (type === 'radio') {
                doc[select].click();
                return
            }
            if (type == 'text') {
                doc.focus();
                document.execCommand('insertText', false, select);
                return
            }
        }
    })
})();