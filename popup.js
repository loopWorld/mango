document.getElementById('tiaojia').addEventListener('click', async () => {
    try {
        // 1. 从chrome.storage获取认证信息
        const { SUB_PASS_ID } = await chrome.storage.local.get('SUB_PASS_ID');
        if (!SUB_PASS_ID) {
            console.error('未找到SUB_PASS_ID，请先登录');
            alert('请先登录获取认证信息');
            return;
        }
        console.log(SUB_PASS_ID)
        const response = await axios.post('http://192.168.2.29:5173/tiaojia', {
            SUB_PASS_ID: SUB_PASS_ID
        })
        console.log(response.data);
        showSuccess('开始拒绝调价!');
        
    } catch (error) {
        console.error('请求失败:', error);
        showError(error.message);
    }
});

// 辅助函数：显示错误
function showError(message) {
    const errorElement = document.getElementById('error-message') || createErrorElement();
    errorElement.textContent = `错误: ${message}`;
    errorElement.style.display = 'block';
}

// 显示成功信息
function showSuccess(message) {
    const successElement = document.getElementById('success-message') || createSuccessElement();
    successElement.textContent = `成功: ${message}`;
    successElement.style.display = 'block';
}

// 创建成功元素
function createSuccessElement() {
    const element = document.createElement('div');
    element.id = 'success-message';
    element.style.color = 'green';
    document.body.appendChild(element);
    return element;
}

// 创建错误元素
function createErrorElement() {
    const element = document.createElement('div');
    element.id = 'error-message';
    element.style.color = 'red';
    document.body.appendChild(element);
    return element;
}