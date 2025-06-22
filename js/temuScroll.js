// window.onload = () => getMateData()
(() => {
    window.onload = () => {
        getMateData()
    }

    window.addEventListener('message', (event) => {
        if (event.origin !== 'https://www.temu.com ') return;
        console.log('----->',event.origin, event.data,event);
    }, false);
    function getMateData() {
        let a = document.querySelector('.B_OB3uj0');
        let b = document.querySelector('._151rnt-L');
        window.scrollTo(0, b.offsetTop - 100)
        if (a.children.length > 1) a.children[1].click()
        let obj = {data:[]}
        Array.from(document.querySelectorAll('._1YBVObhm')).forEach(item => {
            a = item.innerText.split(":")[0]
            b = item.innerText.split(":")[1]
            obj.data.push([a,b])
        })
        return obj
    }
})()