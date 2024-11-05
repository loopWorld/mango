(() => {
    "use strict"
    setInterval(() => {
        if (document.querySelector("#root > div > div > div.index-module__flex-0-0___I-d-v > div.index-module__divider-wrapper___YbEak > div.TAB_outerWrapper_5-111-0 > div.TAB_topWrapper_5-111-0.TAB_lineWrapper_5-111-0.TAB_topLineBelow_5-111-0.TAB_top_5-111-0 > div.TAB_tabTopOuter_5-111-0 > div")) {
            document.querySelector("#root > div > div > div.index-module__flex-0-0___I-d-v > div.index-module__divider-wrapper___YbEak > div.TAB_outerWrapper_5-111-0 > div.TAB_topWrapper_5-111-0.TAB_lineWrapper_5-111-0.TAB_topLineBelow_5-111-0.TAB_top_5-111-0 > div.TAB_tabTopOuter_5-111-0 > div").onclick = () => setTimeout(() => fn(), 2000)
            fn()
        }
    }, 1000)

    function fn() {
        let arr = document.querySelectorAll("#root > div > div > div.index-module__flex-1-1___1sS5J.index-module__column-space-between___TZS4c > div.index-module__flex-1-1___1sS5J > div.TB_outerWrapper_5-111-0.TB_bordered_5-111-0.TB_notTreeStriped_5-111-0 > div > div > div.TB_body_5-111-0 > div > div.TB_hiddenScrollBar_5-111-0 > div > table > tbody > tr > td.TB_td_5-111-0.TB_cellTextAlignLeft_5-111-0.TB_cellVerticalAlignMiddle_5-111-0.TB_rightmostTd_5-111-0.TB_rightSticky_5-111-0")
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            let nbtn = item.previousElementSibling.querySelectorAll('a')[1];
            if (item.querySelector('.mango_autoPrint_btn')) return
            item.innerHTML += `<div class="mango_autoPrint_btn"><a src="script:;" style="color: #0071f3;cursor: pointer;">打印标签</a></div>`
            item.querySelector('.mango_autoPrint_btn a').onclick = () => {
                nbtn.click()
                setTimeout(() => {
                    let abcabc = document.querySelectorAll("body > div.Drawer_outerWrapper_5-111-0.Drawer_right_5-111-0.Drawer_visible_5-111-0 > div.Drawer_content_5-111-0.Drawer_right_5-111-0.Drawer_visible_5-111-0 > div > div.index-module__content___7Av7B > div.TB_outerWrapper_5-111-0.TB_bordered_5-111-0.TB_notTreeStriped_5-111-0 > div > div > table > tbody > tr")
                    let URLLIS = []
                    for (let j = 0; j < abcabc.length; j++) {
                        let item = abcabc[j];
                        let skc = item.querySelector('.outerWrapper-2-3-1').innerText
                        let sku = item.querySelector('td:nth-child(2)').innerText
                        let count = item.querySelector('td:nth-child(6)').innerText
                        URLLIS.push(`http://127.0.0.1:5001/api/printTM?skc=${skc}&sku=${sku}&count=${count}`)
                    }
                    // document.querySelectorAll('.index-module__footer___DgAm5 button')[1].click()
                    fetchData(URLLIS)
                }, 1000)
            }
        }
    }
    async function fetchData(urls) {
        for (const url of urls) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json(); // 假设返回 JSON 数据
                console.log(data); // 处理数据，比如打印到控制台
            } catch (error) {
                console.error(`请求失败: ${error}`);
            }
        }
    }
})()


