(async () => {
    'use strict'
    if (!localStorage.getItem('status')) localStorage.setItem('status', 0)
    // status 0 未搜索 1 搜索了
    const status = localStorage.getItem('status')
    let number;
    if (!localStorage.getItem('index')) {
        localStorage.setItem('index', 2)
        number = 2
    }
    number = localStorage.getItem('index')
    if (status == '1') {
        const __path = 'http://localhost:3000/api/write_excel'
        const data = getParams(number)
        console.log(JSON.stringify(data))
        fetch(__path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('index', number * 1 + 1)
                search()
            })
    }

    document.addEventListener('keyup', async e => {
        let { key } = e
        if (key == 'Delete') {
            search()
        }
    })
    // 搜索
    function search() {
        const __path = 'http://127.0.0.1:3000/api/read_excel'
        number = localStorage.getItem('index')
        let col = number, row = 'B';
        fetch(__path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cell: row + col,
                workName: 'demo'
            })
        })
            .then(response => response.json())
            .then(async data => {
                if (data.message == '') return localStorage.setItem('status', 0)
                const dingdanhao = data.message;
                searchOrder(dingdanhao);
            })
    }

    function searchOrder(orderNumber) {
        localStorage.setItem('status', 1)
        document.querySelector("#keywords").value = orderNumber;
        document.querySelector("#mod-frm-search > div > div > div.form-group.submit-container > button").click();
    }
    function getParams(index) {
        let yunfei, zongjia;
        // 单价
        const unitPrice = document.querySelector("#listBox > ul > li > div.order-detail > div:nth-child(2) > table > tbody > tr > td.detail > table > tbody > tr > td.s3 > div > span").innerText * 1;
        // 数量
        const count = document.querySelector("#listBox > ul > li > div.order-detail > div:nth-child(2) > table > tbody > tr > td.detail > table > tbody > tr > td.s4 > div").innerText * 1;
        // 是否退货
        const istuihuo = document?.querySelector("#listBox > ul > li > div.order-detail > div:nth-child(2) > table > tbody > tr > td.s7 > div:nth-child(3) > a") ? true : false;
        // 运费
        let _yunfei = document.querySelector("span.fare")
        yunfei = _returnNumbers(_yunfei ? _yunfei : '0')
        // 总价
        try {
            zongjia = document.querySelector("#listBox > ul > li.item-active.order-item.fd-clr.first > div.order-detail > div:nth-child(2) > table > tbody > tr > td.s6 > div.repayment-wrapper > span.repayment");
            zongjia = _returnNumbers(zongjia)
        } catch {
            zongjia = document.querySelector("#listBox > ul > li:nth-child(2) > div.order-detail > div:nth-child(2) > table > tbody > tr > td.s6 > div.total")
            zongjia = _returnNumbers(zongjia)
        }
        return {
            data: [
                {// 单价
                    cell: 'D' + index,
                    data: unitPrice
                }, {// 数量
                    cell: 'C' + index,
                    data: count
                }, {// 是否退货
                    cell: 'J' + index,
                    data: istuihuo ? '否' : '是'
                }, {// 运费
                    cell: 'E' + index,
                    data: yunfei
                }, {// 总价
                    cell: 'F' + index,
                    data: zongjia
                }, {// 返单
                    cell: 'G' + index,
                    data: '返单'
                }
            ]
        }
    }
    // 筛选数字
    function numbers(str) {
        console.log('str',str)
        return (str.match(/[\d.]+/g) || []).map(Number)[0]
    }
    // 返回数字
    function _returnNumbers(doc) {
        console.log('doc',doc)
        return !doc ? '0' : numbers(doc != 0 ? doc.innerText : '0')
    }
})()
