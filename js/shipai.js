(async function () {
    document.addEventListener('keyup', e => {
        let { key } = e, arr;
        if (key == 'Delete') {
            fn()
        }
        async function fn() {
            const imagePath = chrome.runtime.getURL('img/shipai.jpg'); // 插件资源路径
            console.log(imagePath)
            const response = await fetch(imagePath);
            const blob = await response.blob();
            const file = new File([blob], 'upload.jpg', { type: blob.type });

            const input = document.querySelector("body > div:nth-child(7) > div > div.rocket-drawer-content-wrapper > div > div > div.rocket-drawer-body > div > div > form > div:nth-child(7) > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > div.rocket-col.rocket-col-18.rocket-form-field-item-control > div.rocket-form-field-item-control-input > div > div > span > div.rocket-upload.rocket-upload-select.rocket-upload-select-picture-card > span > input[type=file]");
            if (!input) {
                console.error('找不到 input 元素');
                return;
            }

            // 模拟选择文件
            const dt = new DataTransfer();
            dt.items.add(file);
            input.files = dt.files;
            input.dispatchEvent(new Event('change', { bubbles: true }));

            // 提交按钮点击（适当延迟）
            // setTimeout(() => {
            //   const submitBtn = document.getElementById(submitBtnId);
            //   if (submitBtn) {
            //     submitBtn.click();
            //   } else {
            //     console.error('找不到提交按钮');
            //   }
            // }, 1000);
        }
    })
})();
