var canvas2, stage2, exportRoot2, anim_container2, dom_overlay_container2, fnStartAnimation2;
function init2() {
    canvas2 = document.getElementById("canvas_star");
    anim_container2 = document.getElementById("animation_container_star");
    dom_overlay_container2 = document.getElementById("dom_overlay_container_star");
    images = images || {};
    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("fileload", handleFileLoad2);
    loader.addEventListener("complete", handleComplete2);
    loader.loadManifest(lib.properties.manifest);
}
function handleFileLoad2(evt) {
    if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
}
function handleComplete2(evt) {
    //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
    var queue = evt.target;
    var ssMetadata = lib.ssMetadata;
    for (i = 0; i < ssMetadata.length; i++) {
        ss[ssMetadata[i].name] = new createjs.SpriteSheet({ "images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames })
    }
    exportRoot2 = new lib.RNB_StarAnim();
    stage2 = new createjs.Stage(canvas2);
    stage2.addChild(exportRoot2);
    //Registers the "tick" event listener.
    fnStartAnimation2 = function () {
        createjs.Ticker.setFPS(lib.properties.fps);
        createjs.Ticker.addEventListener("tick", stage2);
    }
    //Code to support hidpi screens and responsive scaling.
    function makeResponsive2(isResp, respDim, isScale, scaleType) {
        var lastW, lastH, lastS = 1;
        window.addEventListener('resize', resizeCanvas2);
        resizeCanvas2();
        function resizeCanvas2() {
            var w = lib.properties.width, h = lib.properties.height;
            var iw = window.innerWidth, ih = window.innerHeight;
            var pRatio = window.devicePixelRatio || 1, xRatio = iw / w, yRatio = ih / h, sRatio = 1;
            if (isResp) {
                if ((respDim == 'width' && lastW == iw) || (respDim == 'height' && lastH == ih)) {
                    sRatio = lastS;
                }
                else if (!isScale) {
                    if (iw < w || ih < h)
                        sRatio = Math.min(xRatio, yRatio);
                }
                else if (scaleType == 1) {
                    sRatio = Math.min(xRatio, yRatio);
                }
                else if (scaleType == 2) {
                    sRatio = Math.max(xRatio, yRatio);
                }
            }
            canvas2.width = w * pRatio * sRatio;
            canvas2.height = h * pRatio * sRatio;
            canvas2.style.width = dom_overlay_container2.style.width = anim_container2.style.width = w * sRatio + 'px';
            canvas2.style.height = anim_container2.style.height = dom_overlay_container2.style.height = h * sRatio + 'px';
            stage2.scaleX = pRatio * sRatio;
            stage2.scaleY = pRatio * sRatio;
            lastW = iw; lastH = ih; lastS = sRatio;
        }
    }
    makeResponsive2(false, 'both', false, 1);
    fnStartAnimation2();
}




