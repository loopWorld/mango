// 当天数据
// document.querySelector("body > div:nth-child(19) > div span:nth-child(2)").innerText

function moveMouseTo(x,y) {
    const event = new MouseEvent("mousemove", {
        clientX: x,
        clientY: y
    })
    document.dispatchEvent(event)
}
