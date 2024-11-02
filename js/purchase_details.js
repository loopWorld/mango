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
    let arr = [], index = 0;
    document.addEventListener('keyup', e => {
        let { key } = e
        if (key == 'Delete') {
            getData()
        }
    })
    async function fn(data) {
        document.getElementById("keywords").value = data[index];
        document.querySelector("#mod-frm-search > div > div > div.form-group.submit-container > button").click();
        await sleep(3000)
        let imgName = generateRandomInteger(10);
        fetch('http://127.0.0.1:5001/api/printScreen?imgName=' + imgName)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // 假设服务器返回JSON格式的数据
            })
            .then(data => {
                console.log('请求成功:', data);
            })
            .catch(error => {
                console.error('请求出错:', error);
            });
    }

    async function getData() {
        fetch('http://127.0.0.1:5001/api/get_excel_data')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // 假设返回的是JSON数据
            })
            .then(result => {
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