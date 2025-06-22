(() => {
    "use strict"
    let _URL = document.querySelector('#sourceUrl0').value;
    // 新窗口的特征，例如宽度、高度等
    var features = 'width=600,height=1000';

    // 打开位于屏幕右侧的新窗口
    var leftPos = screen.width - 600; // 假设窗口宽度为600像素
    features += ',left=' + leftPos;

    // 打开窗口
    var newWindow = window.open(_URL + (_URL.indexOf('?') != -1 ? '&' : '?') + 'abcdefg=dianxiaomi', 'newWindow', features);
    newWindow.postMessage('Hello from the parent window!',_URL + (_URL.indexOf('?') != -1 ? '&' : '?') + 'abcdefg=dianxiaomi')

    document.querySelector('#msgBtnDelete').onclick = () => newWindow.close();
})()