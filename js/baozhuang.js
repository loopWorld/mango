(() => {
    document.addEventListener('keyup', e => {
        let { key } = e
        if (key == 'Delete') {
            main()
        }
    
    })
    async function main() {
        let a = document.querySelectorAll("table > tbody > tr > td.TB_td_5-117-0.TB_cellTextAlignLeft_5-117-0.TB_cellVerticalAlignMiddle_5-117-0.TB_rightmostTd_5-117-0 > div > div > div:nth-child(1) > a");
        for(let i = 0; i < a.length; i++) {
            let item = a[i];
            item.click()
        }
        let b = document.querySelectorAll('.package-info-select_radioBlock__4y7j9 > div:nth-child(3)');
        for(let i = 0; i < b.length; i++) {
            let item = b[i];
            item.click()
        }
        let c = document.querySelectorAll('.MDL_footer_5-117-0 button:first-child');
        for(let i = 0; i < c.length; i++) {
            let item = c[i];
            item.click()
        }
    }
})()