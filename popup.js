// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     let _CHROME = document.querySelector('.CHROME')
//     _CHROME.querySelector('.getData').onclick = function (e) {
//         let a = document.querySelector('#CHROME_salse').value * 1
//         let b = document.querySelector('#CHROME_fraction').value * 1
//         let c = document.querySelector('#CHROME_price').value * 1
//         let data = { receive: 'content', message: 'getData', tabsId: tabs[0].id,data: { a,b,c } }
//         chrome.tabs.sendMessage(tabs[0].id, data, res => {
//             document.querySelector('#showData').value = res.data.join('\n')
//             let inp = document.querySelector('#showData');
//             inp.value = res.data.join('\n');
//             inp.select();
//             document.execCommand('copy');
//             alert('采集成功，获取数据：' + res.data.length + '条')
//         })
//     }
//     _CHROME.querySelector('.clearStorage').onclick = async e => {
//         let data = { receive: 'content', message: 'clearStorage', tabsId: tabs[0].id }
//         chrome.tabs.sendMessage(tabs[0].id, data, res => {
//             alert(res.data)
//         })
//     }
// })
