// ==UserScript==
// @name         New Userscript
// @namespace    https://work.1688.com/home/buyer.htm/*
// @version      2024-10-31
// @description  try to take over the world!
// @author       You
// @match        https://github.com/loopWorld/mango
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==
(function () {
    'use strict';
    // document.body.innerHTML += `
    // <div class="my_div" style="position: fixed;top: 200px;right: 50px;">
    //     <button class="my_btn" style="border: none;width: 50px;height: 50px;border-radius: 50%;background: pink;">开始</button>
    // </div>
    // `
    let a = localStorage.getItem('my_a'), index = localStorage.getItem('my_index');
    if (a == 1) fn1();
    document.addEventListener('keyup', e => {
        let { key } = e;
        if (key == 'Delete') if (a == 0) getData(index)
    })
    async function fn(data) {
        document.getElementById("keywords").value = data;
        localStorage.setItem('my_a', 1);
        document.querySelector("#mod-frm-search > div > div > div.form-group.submit-container > button").click();
    }

    async function fn1() {
        let imgName = generateRandomInteger(10);
        fetch('http://127.0.0.1:5001/api/printScreen?imgName=' + imgName)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // 假设服务器返回JSON格式的数据
            })
            .then(data => {
                // 单价
                let price = document.querySelector("#listBox > ul > li > div.order-detail > div:nth-child(2) > table > tbody > tr > td.detail > table > tbody > tr:nth-child(1) > td.s3 > div > span").innerText * 1
                let count_list = document.querySelectorAll("#listBox > ul > li > div.order-detail > div:nth-child(2) > table > tbody > tr > td.detail > table > tbody > tr > td.s4 > div")
                // 总数
                let count = 0;
                for (let i = 0; i < count_list.length; i++)count += count_list[i].innerText * 1
                // 总价
                let price1 = document.querySelector("#listBox > ul > li > div.order-detail > div:nth-child(2) > table > tbody > tr > td.s6 > div.repayment-wrapper > span.repayment") ? parseFloat(document.querySelector("#listBox > ul > li > div.order-detail > div:nth-child(2) > table > tbody > tr > td.s6 > div.repayment-wrapper > span.repayment").innerText.replace(/[^\d.]/g, '')) : document.querySelector("#listBox > ul > li > div.order-detail > div:nth-child(2) > table > tbody > tr > td.s6 > div.total").innerText
                // 运费
                let freight = document.querySelector("#listBox > ul > li.item-active.order-item.fd-clr.first > div.order-detail > div:nth-child(2) > table > tbody > tr > td.s6 > div.repayment-wrapper > span.fare") ? parseFloat(document.querySelector("#listBox > ul > li.item-active.order-item.fd-clr.first > div.order-detail > div:nth-child(2) > table > tbody > tr > td.s6 > div.repayment-wrapper > span.fare").innerText.replace(/[^\d.]/g, '')) : 0;
                // 是否退款
                let istuihuo = document.querySelector("#listBox > ul > li:nth-child(3) > div.order-detail > div:nth-child(2) > table > tbody > tr > td.detail > table > tbody > tr:nth-child(1) > td.s9 > div:nth-child(1) > a") ? 1 : 0;
                let data1 = {
                    "price": price,
                    "count": count,
                    "price1": price1,
                    "freight": freight,
                    "istuihuo": istuihuo,
                    "imgName": imgName,
                    "new_row": index * 1 + 2
                }
                let params = new URLSearchParams(data1).toString();
                fetch(`http://127.0.0.1:5001/api/fill_excel?${params}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json(); // 假设返回的是JSON数据
                    })
                    .then(result => {
                        localStorage.setItem('my_index', index * 1 + 1);
                        getData(index * 1 + 1)
                    })
                    .catch(error => {
                        localStorage.setItem('my_a', 0);
                        console.error('结束了');
                    });
            })
            .catch(error => {
                console.error('请求出错:', error);
            });
    }

    async function getData(index) {
        fetch('http://127.0.0.1:5001/api/get_excel_data?index=' + index)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // 假设返回的是JSON数据
            })
            .then(result => {
                if(result.data == '')return alert("结束了");
                fn(result.data); // 将 data 属性传入函数 fn
            })
            .catch(error => {
                console.error('请求出错:', error);
            });
    }

    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function generateRandomInteger(length) {
        const min = Math.pow(10, length - 1); // 最小值，比如10000
        const max = Math.pow(10, length) - 1; // 最大值，比如99999
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

})();