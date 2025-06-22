// (() => {
//     $('.productAddBtn')[0].click()
//     trs = $('.product-attr-module tbody tr')
//     trs.each((i,item) => {
//         shuxing = item.querySelector('.dataName') ? item.querySelector('.dataName').innerText : ''
//         for(let j = 0; j < PACKAGE['女装连衣裙'].length;j++) {
//             let val = PACKAGE['女装连衣裙'][j]
//         }
//     });









//     PACKAGE = {
//         "女装连衣裙": [
//             {
//                 "data": "无里料/无内衬",
//                 "type": "select",
//                 "shuxing": "里料纹理"
//             },{
//                 "面料纹理1": "无里料/光面",
//                 "type": "select",
//                 "shuxing": "里料纹理"
//             },{
//                 "面料克重1（g/m²)": "180",
//                 "type": "text"
//             },{
//                 "织造方式": "针织(含钩织、毛织面料)",
//                 "type": "select"
//             },{
//                 "款式来源": "打版款",
//                 "type": "select"
//             },{
//                 "印花类型": "定位印花",
//                 "type": "select"
//             },{
//                 "成分": ["聚酯纤维(涤纶)Polyester",'氨纶Spandex'],
//                 "type": "select & text",
//                 "data": ["95","5"]
//             },{
//                 "面料弹性": "微弹",
//                 "type": "select"
//             },{
//                 "材质": "聚酯纤维(涤纶）",
//                 "type": "select"
//             },{
//                 "风格": "优雅",
//                 "type": "select"
//             },{
//                 "护理说明": "可机洗且不可干洗",
//                 "type": "select"
//             },{
//                 "季节": "ALL/全球/所有",
//                 "type": "select"
//             },{
//                 "是否透明": "否",
//                 "type": "select"
//             },{
//                 "适用人群": "成人",
//                 "type": "select"
//             },{
//                 "图案": "全身印花",
//                 "type": "select"
//             },{
//                 "细节": "无",
//                 "type": "select"
//             },{
//                 "系列线": "中东专项",
//                 "type": "select"
//             }
//         ]
//     }
// })()


(() => {
    $(function() {
        $("#colorsImg13 > table > tbody > tr:nth-child(2) > td.border-left0.w100.v-top").innerHTML += '<div class="dropdown btn-dropdown"><button class="btn button btn-gray" type="button" data-toggle="dropdown" aria-expanded="true">复制图片</button></div>'
    });
})()