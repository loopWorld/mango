// 在 content.js 中直接使用
document.addEventListener('keyup', async (e) => {
    if (e.key === 'Delete') {
        await convertCanvasToPDF();
    }
});

async function convertCanvasToPDF() {
    
}