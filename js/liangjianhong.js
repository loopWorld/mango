
(async () => {
    "use strict"
    document.addEventListener('keyup', e => {
        return
        let { key } = e, arr;
        if (key == 'Delete') {
            fn()
        }
        if (key == 'Enter') {
            fn1()
        }
        if (key == 'End') {
            fn1()
        }
        if(key == 'home') {
            fn3()
        }
    })  
})()
// 两件套
async function fn() {
    function reactInp(doc, val) {
        Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(doc, val);
        doc.dispatchEvent(new Event('input', { bubbles: true }));
    }
    const par = document.querySelector('.show-property-edit-drawer_container__3hhJI')
    let inputs = par.querySelectorAll('input'), uls, tout;
    // 套装组成件数
    inputs[0].click()
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)

    inputs = par.querySelectorAll('input')

    // 面料纹理1
    inputs[1].click()
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)
    inputs = par.querySelectorAll('input')

    // 面料纹理1克重
    reactInp(inputs[2], 180)
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)

    // 面料纹理1 材质
    inputs[3].click()
    reactInp(inputs[3], "聚酯纤维")
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)
    // 面料纹理1 成分比例
    reactInp(inputs[4], 95)
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)

    // 添加面料
    document.querySelector("#productProperties\\[6983\\] > div > div.Grid_row_5-113-0.Grid_rowHorizontal_5-113-0.Grid_rowJustifyStart_5-113-0.Form_itemContent_5-113-0.Form_itemContentCenter_5-113-0> div > a").click()

    inputs = par.querySelectorAll('input')

    inputs[5].click()
    reactInp(inputs[5], "氨纶S")
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)

    reactInp(inputs[6], 5)
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)

    // 面料纹理2
    inputs[7].click()
    reactInp(inputs[7], "光面")
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)
    inputs = par.querySelectorAll('input')

    // 克重
    reactInp(inputs[8], 180)
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)


    inputs[9].click()
    reactInp(inputs[9], "聚酯纤维")
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => setTimeout(resolve, 300));
    reactInp(inputs[10], 95)
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)

    document.querySelector("#productProperties\\[6984\\] > div > div.Grid_row_5-113-0.Grid_rowHorizontal_5-113-0.Grid_rowJustifyStart_5-113-0.Form_itemContent_5-113-0.Form_itemContentCenter_5-113-0> div > a").click()

    inputs = par.querySelectorAll('input')

    inputs[11].click()
    reactInp(inputs[11], "氨纶S")
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)
    reactInp(inputs[12], 5)
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)

    // 无里料
    inputs[13].click()
    reactInp(inputs[13], "无")
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)

    inputs[14].click()
    reactInp(inputs[14], "无")
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)

    await new Promise(resolve => setTimeout(resolve, 1000));
    document.querySelectorAll('.index-module__drawer-body___Qj4d-')[1].querySelector('button').click()
    setTimeout(() => fn(), 11800)
}
// 三件套
async function fn1() {
    const par = document.querySelector('.show-property-edit-drawer_container__3hhJI')
    let inputs = par.querySelectorAll('input'), uls, tout;
    // 套装组成件数
    inputs[0].click()
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[1].click()
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)
    inputs = par.querySelectorAll('input')

    // 面料纹理1
    inputs[1].click()
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)
    inputs = par.querySelectorAll('input')

    // 面料纹理1克重
    reactInp(inputs[2], 180)
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)

    // 面料纹理1 材质
    inputs[3].click()
    reactInp(inputs[3], "聚酯纤维")
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)
    // 面料纹理1 成分比例
    reactInp(inputs[4], 95)
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)

    // 添加面料
    document.querySelector("#productProperties\\[6983\\] > div > div.Grid_row_5-113-0.Grid_rowHorizontal_5-113-0.Grid_rowJustifyStart_5-113-0.Form_itemContent_5-113-0.Form_itemContentCenter_5-113-0> div > a").click()

    inputs = par.querySelectorAll('input')

    inputs[5].click()
    reactInp(inputs[5], "氨纶S")
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)

    reactInp(inputs[6], 5)
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)

    // 面料纹理2
    inputs[7].click()
    reactInp(inputs[7], "光面")
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)
    inputs = par.querySelectorAll('input')

    // 克重
    reactInp(inputs[8], 180)
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)


    inputs[9].click()
    reactInp(inputs[9], "聚酯纤维")
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => setTimeout(resolve, 300));
    reactInp(inputs[10], 95)
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)

    document.querySelector("#productProperties\\[6984\\] > div > div.Grid_row_5-113-0.Grid_rowHorizontal_5-113-0.Grid_rowJustifyStart_5-113-0.Form_itemContent_5-113-0.Form_itemContentCenter_5-113-0> div > a").click()

    inputs = par.querySelectorAll('input')

    inputs[11].click()
    reactInp(inputs[11], "氨纶S")
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)
    reactInp(inputs[12], 5)
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)

    // 面料纹理3
    inputs[13].click()
    reactInp(inputs[13], "光面")
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)
    inputs = par.querySelectorAll('input')

    // 克重
    reactInp(inputs[14], 180)
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)

    inputs[15].click()
    reactInp(inputs[15], "聚酯纤维")
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => setTimeout(resolve, 300));
    reactInp(inputs[16], 95)
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)

    document.querySelector("#productProperties\\[6985\\] > div > div.Grid_row_5-113-0.Grid_rowHorizontal_5-113-0.Grid_rowJustifyStart_5-113-0.Form_itemContent_5-113-0.Form_itemContentCenter_5-113-0 > div > a").click()

    inputs = par.querySelectorAll('input')

    inputs[17].click()
    reactInp(inputs[17], "氨纶S")
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)
    reactInp(inputs[18], 5)
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)

    // 无里料

    inputs[19].click()
    reactInp(inputs[19], "无")
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)

    inputs[20].click()
    reactInp(inputs[20], "无")
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)

    inputs[21].click()
    reactInp(inputs[21], "无")
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)

    await new Promise(resolve => setTimeout(resolve, 1000));
    document.querySelectorAll('.index-module__drawer-body___Qj4d-')[1].querySelector('button').click()
    setTimeout(() => fn(), 11800)
}
async function fn2() {
    const par = document.querySelector('.show-property-edit-drawer_container__3hhJI')
    let inputs = par.querySelectorAll('input'), uls, tout;
    // 套装组成件数
    inputs[0].click()
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)
    inputs = par.querySelectorAll('input')

    // 面料纹理1克重
    reactInp(inputs[1], 180)
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)

    // 面料纹理1
    inputs[2].click()
    reactInp(inputs[2], '无')
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)
    inputs = par.querySelectorAll('input')

    await new Promise(resolve => setTimeout(resolve, 1000));
    document.querySelectorAll('.index-module__drawer-body___Qj4d-')[1].querySelector('button').click()
    setTimeout(() => fn(), 11800)
}
async function fn3() {
    const par = document.querySelector('.show-property-edit-drawer_container__3hhJI')
    let inputs = par.querySelectorAll('input'), uls, tout;
    inputs[0].click()
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)
    inputs = par.querySelectorAll('input')

    reactInp(inputs[1], 180)

    inputs[2].click()
    reactInp(inputs[2], '无')
    uls = document.querySelectorAll('.ST_dropdownPanel_5-113-0')
    uls[0].querySelectorAll('li')[0].click()
    await new Promise(resolve => tout = setTimeout(resolve, 300));
    clearTimeout(tout)

    await new Promise(resolve => setTimeout(resolve, 1000));
    document.querySelectorAll('.index-module__drawer-body___Qj4d-')[1].querySelector('button').click()
    setTimeout(() => fn(), 11800)
}
function reactInp(doc, val) {
    Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(doc, val);
    doc.dispatchEvent(new Event('input', { bubbles: true }));
}