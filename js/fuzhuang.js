(() => {
    // 键盘按键映射配置
    const keyActions = {
        '+': async () => {
            // "+" 复制为新产品
            let fz = document.querySelector("body > div:nth-child(7) > div > div > ul > li:nth-child(1)")
            if (fz) {
                return fz.click()
            }
            await simulateHoverAndClick("#DGrid7 > div.pddkj-product-list > div > div > div > div.vxe-table--render-wrapper > div.vxe-table--main-wrapper > div.vxe-table--body-wrapper.body--wrapper > table > tbody > tr > td.vxe-body--column.col_29.col--last > div > div > div:nth-child(2) > div > button",false)
            await new Promise(resolve => setTimeout(resolve, 200));
            document.querySelectorAll(".ant-dropdown-menu-light li")[0].click()
        },
        'num': async num => {
            console.log(document.querySelectorAll('.modal-body div label'))
            document.querySelectorAll('.modal-body div label')[num].click()
        },
        'Enter': async () => {
            document.querySelector('.ant-modal-footer button').click()
        },
        '.': async () => {
            document.querySelector('button.m-left10').click()
            await new Promise(resolve => setTimeout(resolve, 500));
            document.querySelector("#DGrid7 > div.pddkj-product-list > div > div > div > div.vxe-table--render-wrapper > div.vxe-table--main-wrapper > div.vxe-table--body-wrapper.body--wrapper > table > tbody > tr:nth-child(1) > td.vxe-body--column.col_19.col--last > div > div > div.text-left > div:nth-child(1) > button").click()
        },
        'ArrowLeft': async () => {
            // 使用安全的导航方式
            const a = document.createElement('a');
            a.href = "https://www.dianxiaomi.com/web/temu/choiceTemuList/offline";
            a.target = '_self';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
        'ArrowRight': async () => {
            // 使用安全的导航方式
            const a = document.createElement('a');
            a.href = "https://www.dianxiaomi.com/web/temu/choiceTemuList/online";
            a.target = '_self';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
        '`': async () => {
            let huohao = localStorage.getItem('huohao') || null;
            if (huohao === null) {
                huohao = prompt('请输入货号：');
                localStorage.setItem('huohao', huohao);
            }
            huohao = incrementLongestNumber(huohao);
            let int1 = document.querySelector("#skuAttrsInfo > div.form-card-content > div > form > div.ant-form-item.css-l74pc.skuAttrItem_1001 > div > div.ant-col.ant-form-item-control.css-l74pc > div > div > div:nth-child(5) > div > table > tbody > tr > td:nth-child(2) > div > div > input")
            int1.value = huohao;
            int1.dispatchEvent(new Event('input'));
            int1.dispatchEvent(new Event('blur'));
            document.querySelector("#skuAttrsInfo > div.form-card-content > div > form > div:nth-child(2) > div > div.ant-col.ant-form-item-control.css-l74pc > div > div > div > div > label:nth-child(3) > span.ant-radio > input").click()
            document.querySelector("#skuDataInfo > div.form-card-content > div > div.skuDataTable > div.sku-data-table > table > thead > tr > th:nth-child(3) > div > span:nth-child(3)").click()
            await new Promise(resolve => setTimeout(resolve, 150));
            let int = document.querySelector('.text-align-center');
            int.value = huohao;
            int.dispatchEvent(new Event('input'));
            int.dispatchEvent(new Event('blur'));
            document.querySelector("#rc-tabs-0-panel-create > div:nth-child(2) > div > div:nth-child(1) > span").click()
            await new Promise(resolve => setTimeout(resolve, 150));
            document.querySelector(".ant-modal-footer .ant-btn-primary").click()
            localStorage.setItem('huohao', huohao);
        },
        'F8': async () => {
            await simulateHoverAndClick("#productProductInfo > div.form-card-content > div > form > div:nth-child(9) > div > div.ant-col.ant-form-item-control.css-l74pc > div > div > div > div.material-img-module > div > div > div.img-out.img-box.\\!size-120")
            const menuItem = document.querySelectorAll('.ant-dropdown-placement-rightTop li')[0];
            if (menuItem) {
                const event = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                menuItem.dispatchEvent(event);
            }
        },
        'F9': async () => {
            let ti = setInterval(() => {
                document.querySelector('.image-box .icon_delete') && document.querySelector('.image-box .icon_delete').click()
                !document.querySelector('.image-box .icon_delete') && clearInterval(ti)
            },10)
            await simulateHoverAndClick('.skuAttrImg_21263 button')
            const menuItem = document.querySelectorAll('.ant-dropdown-placement-bottomLeft li')[0];
            if (menuItem) {
                const event = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                menuItem.dispatchEvent(event);
            }
        }
    };


    // 添加键盘事件监听
    document.addEventListener('keydown', (event) => {
        let key = event.key;
        // 处理小键盘数字键
        if (event.code.startsWith('Numpad') && event.code.length === 7) {
            keyActions['num'](key * 1 - 1);
        }

        if (keyActions[key]) {
            keyActions[key](); // 执行对应功能
        }
    });

    console.log('键盘监听已启用');


    async function simulateHoverAndClick(selector, shouldLeave = true) {
        const element = document.querySelector(selector);
        if (!element) return;

        // 触发 mouseover/mouseenter
        ['mouseover', 'mouseenter'].forEach(eventType => {
            element.dispatchEvent(new MouseEvent(eventType, { bubbles: true }));
        });

        // 添加 hover 类
        element.classList.add('hover');
        await new Promise(resolve => setTimeout(resolve, 100)); // 等待 hover 效果

        if (shouldLeave) {
            // 触发 mouseout/mouseleave
            ['mouseout', 'mouseleave'].forEach(eventType => {
                element.dispatchEvent(new MouseEvent(eventType, { bubbles: true }));
            });

            // 移除 hover 类
            element.classList.remove('hover');
        }
        return new Promise(r => r())
    }

    function incrementLongestNumber(text) {
        // 匹配所有连续数字（包括前导零），同时捕获前后内容
        const numberRegex = /([^\d]*)(0*)(\d+)([^\d]*)/g;
        let matches = [];
        let match;

        // 收集所有匹配的数字及其上下文
        while ((match = numberRegex.exec(text)) !== null) {
            matches.push({
                fullMatch: match[0],
                prefix: match[1],
                leadingZeros: match[2],
                number: match[3],
                suffix: match[4],
                startIndex: match.index,
                endIndex: match.index + match[0].length
            });
        }

        if (matches.length === 0) return text;

        // 找出最长的数字部分（按数字长度，不是总长度）
        const longestMatch = matches.reduce((longest, current) =>
            current.number.length > longest.number.length ? current : longest
        );

        // 数字部分+1（保留前导零）
        const originalNumber = longestMatch.number;
        const incremented = String(Number(originalNumber) + 1);
        const paddedNumber = incremented.padStart(originalNumber.length, '0');

        // 重新组合（确保保留所有部分）
        const result =
            longestMatch.prefix +
            longestMatch.leadingZeros +
            paddedNumber +
            longestMatch.suffix;

        // 替换原文本中的匹配部分
        return (
            text.slice(0, longestMatch.startIndex) +
            result +
            text.slice(longestMatch.endIndex)
        );
    }
})();