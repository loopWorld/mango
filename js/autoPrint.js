(() => {
    "use strict"
    document.body.addEventListener('click', async e => {
        const { target } = e
        const _text = target.innerText;
        if (_text != '打印商品条码' && _text != '打条码') return
        if (_text == '打印商品条码') return await printBarcode()
        if (_text == '打条码') return await printTM()
    })
    async function printBarcode() {
        await new Promise(resolve => setTimeout(resolve, 800))
        document.querySelector("div.index-module__footer___DgAm5").innerHTML += `
            <button style="margin-left: 13px;" class="BTN_outerWrapper_5-111-0 BTN_primary_5-111-0 BTN_medium_5-111-0 BTN_outerWrapperBtn_5-111-0 my_printer_btn">
                打条码
            </button>
        `
    }
    async function printTM() {
        let trs = document.querySelector(".index-module__content___7Av7B").querySelectorAll('tbody > tr')
        for (let i = 0; i < trs.length; i++) {
            let item = trs[i];
            let SKC = item.querySelector('.goods-info_content__3R1WK > div:nth-child(2)').innerText
            let SKU = item.querySelector('td:nth-child(2)').innerText
            let count = item.querySelector('td:nth-child(6)').innerText
            fetch('http://127.0.0.1:3189/printTM', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ SKC, SKU, count })
            }).then(res => res.json()).then(res => {
                console.log(res)
            })
        }
        
    }
})()


