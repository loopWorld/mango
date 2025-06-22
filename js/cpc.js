(async () => {
    document.addEventListener('keyup', e => {
        let { key } = e;
        if (key == 'Delete') {
            fn()
        }
    })

    async function fn() {
        // 点击搜索按钮
        let searchBTN = await awaitDom('.rocket-space-item .rocket-btn.rocket-btn-primary')
        searchBTN.click()

        await sleep(3000)

        let trList = await awaitDoms("#agentseller-layout-content > div > div > div > div.rocket-table-wrapper > div > div > div > div > div > table > tbody > tr")
        if (trList.length < 2) {
            alert('结束了...')
        }
        trList[1].querySelectorAll('button')[1]?.click()


        // 上传按钮
        await sleep(5000)
        // let aaa = await awaitDoms('.clearfix button')
        // aaa[0].dispatchEvent(clickEvent);
        // aaa[1].dispatchEvent(clickEvent);
        fetch('http://localhost:8080/movise3?x=888&y=656').then(d => d.json()).then(r => {
            fetch('http://localhost:8080/movise1?x=228&y=195&x1=446&y1=195&x2=784&y2=549').then(data => data.json()).then(async res => {
                document.querySelector('.rocket-drawer-body').scrollTo(0, 800)
                fetch('http://localhost:8080/movise3?x=895&y=515').then(d1 => d1.json()).then(d1 => {
                    fetch('http://localhost:8080/movise2?x=566&y=195&x1=784&y1=549').then(data1 => data1.json()).then(async res1 => {
                        await sleep(3000)
                        let queren = await awaitDom('.rocket-drawer-footer button:first-child')
                        queren.click()
                        await sleep(2000)
                        fn()
                    })
                })
            })
        })
    }

    function sleep(num) {
        return new Promise(r => {
            let a = setTimeout(() => {
                r()
                clearTimeout(a)
            }, num)
        })
    }
    async function awaitDom(_class) {// 查询元素，未查询到继续查询
        let dom = document.querySelector(_class)
        let index = 0;
        while (!dom) {
            if (index > 40) break
            index++
            await sleep(200)
            dom = document.querySelector(_class)
        }
        return new Promise(r => r(dom))
    }
    async function awaitDoms(_class) {// 查询元素，未查询到继续查询
        let doms = document.querySelectorAll(_class)
        let index = 0;
        while (doms.length == 0) {
            if (index > 40) break
            index++
            await sleep(400)
            doms = document.querySelectorAll(_class)
        }
        return new Promise(r => r(doms))
    }
    const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true
    });
})()