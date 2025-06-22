document.addEventListener('keyup', e => {
    let { key } = e
    if (key == 'Delete') {
        
    }
})
function main() {
    let _iframe = document.querySelector('.iframe-item').contentDocument
    let _par = _iframe.querySelector('.plTableBox .el-table__body-wrapper .el-table__body')
    let _par_height = _par.offsetHeight
    _par.style = 'position: relative;'
    let _trs = document.querySelectorAll('.plTableBox .el-table__body-wrapper .el-table__body tr')
    list = {
        'S': 0,
        "M": 20,
        "L": 40,
        "XL": 60,
        "XXL": 80
    }
    for(let i = 0; i < _trs.length; i++) {
        let item = _trs[i]
        let size = item.querySelector('td.el-table_1_column_3.is-left > div > div > div:nth-child(2)').innerText.split('-')[1]
        console.log(list[size] * (_par_height/5))
        // item.style = `position: absolute;top:(${list[size] * (_par_height/5)}px)`
    }
}