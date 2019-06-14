console.log('hello')
const loadModel = async () => {
    const net = await posenet.load();
    return net;
}

async function runOnClick(canvas) {
    var images = [];
    window._images = images;
    const fn = () => {
        _net.estimatePoses(_images[0], {flipHorizontal: false, decodingMethod: 'single-person'}).then((r) => console.log(r));
    }
    await loadModel().then((net) => {
        console.log("Loaded posenet model");
        window._net = net;
        console.log("Available globally at _net");
        setTimeout(fn, 5000);
    });
    setInterval(async () => {
        // console.log('recording...');
        // console.log(canvas);
        await canvas.toBlob((blob) => {
            var newImg = document.createElement('img');
            var url = URL.createObjectURL(blob);
            newImg.src = url;

            // console.log(blob);
            if (images.length < 2) {
                images.push(newImg);
            }
        });
    }, 1000);
}