<template>
    <div class="cool-image-bd"
        :style="`width:` + saveProp.width + `px;height:` + saveProp.height + `px;background-color: ` + saveProp.bgColor">
        <div class="cool-operate">
            <div class="flex-center-zy">
                <div class="tips-height ft-b">操作区</div>
                <div class="cool-tips tips-height" style="padding-top: 2px;box-sizing: border-box;" :tips-text=tipsText>
                    <svg t="1700209013659" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4949" width="20" height="20">
                        <path d="M599.04 640m-281.6 0a281.6 281.6 0 1 0 563.2 0 281.6 281.6 0 1 0-563.2 0Z" fill="#FED847"
                            p-id="4950"></path>
                        <path
                            d="M373.25824 572.416a82.432 82.432 0 0 1-82.71872-81.99168h41.35936a41.3696 41.3696 0 0 0 82.7392 0h41.35936a82.45248 82.45248 0 0 1-82.7392 81.99168z m124.08832 0a82.432 82.432 0 0 1-82.71872-81.99168h41.35936a41.3696 41.3696 0 0 0 82.71872 0h41.37984a82.45248 82.45248 0 0 1-82.7392 81.99168z m124.09856 0a82.45248 82.45248 0 0 1-82.7392-81.99168h41.37984a41.3696 41.3696 0 0 0 82.71872 0h41.35936a82.46272 82.46272 0 0 1-82.71872 81.99168z m-100.68992 276.62336L355.328 562.1248l35.91168-20.33664 165.44768 286.95552-35.93216 20.29568z m-46.81728 0l-35.90144-20.33664 165.44768-286.94528 35.90144 20.3264-165.44768 286.95552z m168.17152 133.30432H352.58368V879.89248h41.35936v61.4912h206.848v-61.4912h41.35936v102.49216l-0.04096-0.04096z m0-102.48192H352.58368V763.55584a101.7856 101.7856 0 0 0-48.128-84.45952 345.63072 345.63072 0 0 1-158.52544-300.7488c7.04512-194.06848 170.09664-345.68192 364.16512-338.6368 187.89376 6.83008 337.17248 160.24576 338.8416 348.2624a346.37824 346.37824 0 0 1-161.42336 292.864 99.4304 99.4304 0 0 0-45.39392 84.59264v114.46272l-0.01024-0.03072z m-248.1664-40.96h206.848v-73.44128a140.20608 140.20608 0 0 1 64.3584-119.06048 305.664 305.664 0 0 0 142.44864-258.42688c-1.7408-171.34592-142.05952-308.8384-313.40544-307.10784-165.59104 1.6896-300.68736 133.10976-306.90304 298.5984a305.03936 305.03936 0 0 0 139.90912 265.37984 142.57152 142.57152 0 0 1 66.78528 118.72256v75.33568h-0.04096zM518.03136 551.936H476.672V408.4736h41.35936V551.936zM290.53952 387.97312h-41.35936c-0.1536-127.98976 98.05824-234.61888 225.62816-244.96128l3.71712 40.83712c-106.30144 8.62208-188.12928 97.47456-187.98592 204.12416z"
                            fill="" p-id="4951"></path>
                    </svg>
                </div>
            </div>
            <!-- 操作 -->
            <div class="cool-go-operate">
                <template v-if="isShow2D">
                    <ul class="cool-ul">
                        <li>鼠标左键按住滑动3D浏览图片 😎</li>
                        <li>鼠标滚轮放大|缩小图片 🙈</li>
                        <li>滚轮右键按住可拖动图片 🤲</li>
                    </ul>
                </template>
                <template v-else>
                    <el-button class="cool-btn" type="primary" @click="upImgSize('add')" round>
                        放大图形
                    </el-button>
                    <el-button class="cool-btn" type="primary" @click="upImgSize('sub')" round>
                        缩小图形
                    </el-button>
                    <el-button class="cool-btn" type="primary" @click="upImgPosition()" round>
                        图至中心
                    </el-button>
                    <el-button class="cool-btn" type="primary" @click="reductionImg()" round>
                        还原图形
                    </el-button>
                </template>
            </div>
            <!-- 2_3维切换-->
            <div class="flex-center-zy">
                <span class="ft-b cz-font" :class="!isShow2D ? 'is-avtive' : ''">2D</span>
                <el-switch v-if="canShowThree" v-model="isShow2D" active-color="#13ce66"
                    inactive-color="#409eff"></el-switch>
                <el-switch v-else active-color="#13ce66" inactive-color="#409eff" disabled></el-switch>
                <span class="ft-b cz-font" :class="isShow2D ? 'is-avtive' : ''">3D</span>
            </div>
        </div>
        <!-- 模式展示 -->
        <div class="cool-show-body">
            <div class="cool-show-two" id="cool-show-two" v-show="!isShow2D">
                <span v-if="notImgtips" class="cool-noImg-text"
                    :style="`line-height:` + saveProp.height + `px`">图片加载失败</span>
            </div>
            <div id="cool-show-three" v-show="isShow2D">
                <span v-if="lodingThree" class="cool-noImg-text"
                    :style="`line-height:` + saveProp.height + `px`">模型加载中...</span>
            </div>

        </div>

    </div>
</template>
  
<script lang="ts" setup>
import { defineProps, onMounted, reactive, ref, watchEffect } from 'vue';
import renderingCanvas from './threeCanvas'
import { ElButton, ElSwitch } from 'element-plus'
import 'element-plus/dist/index.css'

const prop = defineProps({
    width: {
        type: Number,
        default: 600
    },
    height: {
        type: Number,
        default: 350
    },
    bgColor: {
        type: String,
        default: '#e9e9e9'
    },
    coolUrl: {
        type: String,
        default: ''
    }
})

let saveProp = reactive({
    width: 600,
    height: 350,
    bgColor: 'bisque',
    coolUrl: ""
})

interface imgInfoIter {
    width: string,
    height: string,
    imgHeight: number,
    imgWidth: number,
    liveDom: any,
    addNum: number,
    upImgSizeMax: boolean,
    realAngleX: number,
    realAngleY: number
}

let tipsText = ref("图形出现大小默认是原图片大小,超出或小于限制将变为限制大小\nTips🎉：图片可为透明png\n\n2D: \n单击图形开始移动 🚀\n" +
    "双击图形结束移动 😪\n放大和缩小都有限制 🤪\n\n 3D:\n鼠标左键按住滑动3D浏览图片 😎\n鼠标滚轮放大/缩小图片 🙈\n滚轮右键按住可拖动图片 🤲")

//所需数据
let notImgtips = ref(false)
let isShow2D = ref(false)
let imgInfo: imgInfoIter = reactive({
    width: "",
    height: "",
    liveDom: "",
    realAngleX: 0,
    realAngleY: 0,
    addNum: 1.1,
    imgWidth: 0,
    imgHeight: 0,
    upImgSizeMax: true
})

//获取图片数据
const getImageSize = (url: string) => {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = () => {
            resolve({
                width: image.width,
                height: image.height
            });
        };
        image.onerror = () => {
            canShowThree.value = false
            resolve("no_img");
            reject(new Error('error'));
        };
        image.src = url;
    });
}

//初始化图形
const initImg = (url: string) => {
    getImageSize(url).then((result: any) => {
        notImgtips.value = result === "no_img" ? true : false;
        imgInfo.imgHeight = result.height;
        imgInfo.imgWidth = result.width;
        if (imgInfo.imgHeight != null) drawCanvas(url)
    });
}

//创建图形
const drawCanvas = (url: string) => {
    if (imgInfo?.liveDom != "") document.getElementsByClassName('show_img')[0]?.remove();
    let widthPro = 500 / imgInfo.imgWidth;
    let heightPro = 400 / imgInfo.imgHeight;
    let width = imgInfo.imgWidth, height = imgInfo.imgHeight;
    if (width > 500) {
        width = 500;
        height *= widthPro;
    } else if (height > 400) {
        height = 400;
        width *= heightPro;
    }
    let newImg = document.createElement('img');
    newImg.setAttribute("class", "show_img");
    newImg.setAttribute("onerror", "style='display:none'");
    newImg.src = url;
    newImg.style.position = "absolute";
    newImg.style.width = width + "px";
    newImg.style.height = height + "px";
    imgInfo.width = width + "px";
    imgInfo.height = height + "px";
    newImg.addEventListener("click", startDrag);
    newImg.addEventListener("mousemove", drag);
    newImg.addEventListener("dblclick", stopDrag);
    imgInfo.liveDom = newImg;
    if (canvasBg.value === null) return;
    canvasBg.value.appendChild(newImg);
    canShowThree.value = true;
    firstCreImg(newImg);
}
//点击开始移动
let move = ref(false)
const startDrag = () => {
    move.value = true;
};

//移动中
const drag: any = (event: MouseEvent) => {
    if (move.value) {
        let dom = event.target as HTMLElement;
        if (canvasBg.value === null) return;
        dom.style.left =
          event.pageX - +dom.style.width.replace("px", "") / 2 + "px";
        dom.style.top =
          event.pageY - +dom.style.height.replace("px", "") / 2 + "px";
    }
};

//停止移动
const stopDrag: any = (event: MouseEvent) => {
    ovPosition(event);
    imgInfo.liveDom = event.target;
    move.value = false;
};

//首次创建图形
const firstCreImg = (dom: HTMLElement) => {
    upImgPositionCom(dom.offsetWidth, dom.offsetHeight);
};

//是否超出画布
const ovPosition = (event: MouseEvent) => {
    let evTarget = event.target as HTMLElement;
    let imgWidth = evTarget.offsetWidth;
    let imgHeight = evTarget.offsetHeight;
    let canvasInfo = getCanvasInfo();
    let imgLeft = parseInt(evTarget.style.left.replace("px", ""));
    let imgTop = parseInt(evTarget.style.top.replace("px", ""));
    if (imgLeft - canvasInfo.canvasLeft < 1 || imgWidth + imgLeft - canvasInfo.canvasLeft - canvasInfo.canvasWidth > -3 ||
        imgTop - canvasInfo.canvasTop < 1 || imgHeight + imgTop - canvasInfo.canvasTop - canvasInfo.canvasHeight > -3) {
        evTarget.style.left = canvasInfo.canvasLeft + canvasInfo.canvasWidth / 2 - imgWidth / 2 + 'px';
        evTarget.style.top = canvasInfo.canvasTop + canvasInfo.canvasHeight / 2 - imgHeight / 2 + 'px';
    }
};

//获取画布数据
const getCanvasInfo = () => {
    let canvasInfo = {
        canvasTop: canvasBg.value.offsetTop,
        canvasLeft: canvasBg.value.offsetLeft,
        canvasWidth: canvasBg.value.offsetWidth,
        canvasHeight: canvasBg.value.offsetHeight
    };
    return canvasInfo;
}

//图形居中公共方法
const upImgPositionCom = (imgWidth: number, imgHeight: number) => {
    let canvasInfo = getCanvasInfo();
    imgInfo.liveDom.style.left = canvasInfo.canvasLeft + canvasInfo.canvasWidth / 2 - imgWidth / 2 + 'px';
    imgInfo.liveDom.style.top = canvasInfo.canvasTop + canvasInfo.canvasHeight / 2 - imgHeight / 2 + 'px';
}

//修改图形大小
const upImgSize = (cz: string) => {
    let oldWidth = imgInfo.liveDom.offsetWidth;
    let oldHeight = imgInfo.liveDom.offsetHeight;
    let addWidth = oldWidth * imgInfo.addNum;
    let addHeight = oldHeight * imgInfo.addNum;
    if (canvasBg.value == null) return;
    let maxWidth = canvasBg.value.offsetWidth - 50;
    let maxHeight = canvasBg.value.offsetHeight - 30;
    if (addWidth > maxWidth && cz == "add") {
        if (imgInfo.upImgSizeMax) {
            imgInfo.liveDom.style.width = maxWidth + "px";
            imgInfo.liveDom.style.height = addHeight + "px";
            imgInfo.upImgSizeMax = false;
        }
    } else if (addHeight > maxHeight && cz == "add") {
        if (imgInfo.upImgSizeMax) {
            imgInfo.liveDom.style.width = addWidth + "px";
            imgInfo.liveDom.style.height = maxHeight + "px";
            imgInfo.upImgSizeMax = false;
        }
    } else if (!imgInfo.upImgSizeMax && cz != "add" || cz != "add") {
        imgInfo.liveDom.style.width = oldWidth / imgInfo.addNum < 80 ? 80 : oldWidth / imgInfo.addNum + "px";
        imgInfo.liveDom.style.height = oldHeight / imgInfo.addNum < 80 ? 80 : oldHeight / imgInfo.addNum + "px";
        imgInfo.upImgSizeMax = true;
    } else {
        imgInfo.liveDom.style.width = addWidth + "px";
        imgInfo.liveDom.style.height = addHeight + "px";
        imgInfo.upImgSizeMax = true;
    }
    upImgPosition();
}

//图形居中
const upImgPosition = () => {
    let imgWidth = imgInfo.liveDom.offsetWidth;
    let imgHeight = imgInfo.liveDom.offsetHeight;
    upImgPositionCom(imgWidth, imgHeight);
}

//还原图形
const reductionImg = () => {
    imgInfo.liveDom.style.width = imgInfo.width;
    imgInfo.liveDom.style.height = imgInfo.height;
    imgInfo.liveDom.style.transform = "unset";
    imgInfo.realAngleX = 0;
    imgInfo.realAngleY = 0;
    upImgPosition();
}

//修正数据
const diffIndex = () => {
    if (prop.height > 350) saveProp.height = prop.height
    if (prop.width > 450) saveProp.width = prop.width + 150
    saveProp.bgColor = prop.bgColor
    saveProp.coolUrl = prop.coolUrl
    if (prop.coolUrl === "") {
        notImgtips.value = true
        return true;
    }
}

let canShowThree = ref(true)
let hasThree = ref(false)
let lodingThree = ref(true)
//监听2、3D切换 移除2D操作监听
watchEffect(() => {
    let imgDom = document.getElementsByClassName("show_img")[0]
    if (isShow2D.value) {
        if (imgDom === undefined) return canShowThree.value = false;
        imgDom.removeEventListener("click", startDrag);
        imgDom.removeEventListener("mousemove", drag);
        imgDom.removeEventListener("dblclick", stopDrag);
        //创建3D
        if (!hasThree.value) {
            renderingCanvas(document.getElementById("cool-show-three") as HTMLElement, saveProp.coolUrl, saveProp.bgColor).then(res => {
                if (res) hasThree.value = true
                lodingThree.value = false
            })
        }
        return;
    }
    canShowThree.value = true
    if (imgDom === undefined) return;
    imgDom.addEventListener("click", startDrag);
    imgDom.addEventListener("mousemove", drag);
    imgDom.addEventListener("dblclick", stopDrag);
})

let canvasBg = ref()
onMounted(() => {
    if (diffIndex()) return;
    initImg(saveProp.coolUrl as string)
    canvasBg.value = document.getElementById("cool-show-two")
})
</script>
  
<style lang="scss" scoped>
.ft-b {
    font-family: 'fangsong';
    font-weight: 600;
}

.flex-center-zy {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.cool-image-bd {
    min-width: 600px;
    min-height: 350px;
    display: flex;
}

.cool-operate {
    width: 150px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: aliceblue;
    padding: 14px 8px;
    box-sizing: border-box;
}

.cool-show-body {
    width: calc(100% - 150px);
    height: 100%;
}

.cool-show-two {
    width: 100%;
    height: 100%;
}

#cool-show-three {
    width: 100%;
    height: 100%;
}

.cool-tips {
    position: relative;
    cursor: pointer;
}

.tips-height {
    height: 24px;
    line-height: 24px;
}

.cool-tips:after {
    content: attr(tips-text);
    border-radius: 4px;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 999;
    border: 1px solid #9E9D24;
    background: #F0F4C3;
    color: #9E9D24;
    position: absolute;
    min-width: 80px;
    width: 240px;
    min-height: 10px;
    white-space: pre-line;
    word-break: normal;
    word-wrap: break-word;
    display: inline-block;
    left: -2%;
    top: 35px;
    padding: 4px 10px;
    line-height: 1.6;
    font-size: 14px;
    opacity: 0;
    pointer-events: none;
    transition: .382s ease;
    transform: translateY(-50%);
}

.cool-tips:hover:after {
    opacity: 1;
    transform: translateY(0%);
}

.cool-go-operate {
    height: 178px;
    margin: 16px 0;
}

.cool-btn {
    width: 100%;
    margin-top: 12px;
    margin-left: unset !important;
}

.cool-ul {
    padding-left: 15px;
}

.cool-ul li::marker {
    font-size: 10px;
    content: "💖";
}

.cool-ul>li {
    font-size: 13px;
    margin-top: 14px;
    color: #7060ca;
    padding-left: 6px;
}

.cool-noImg-text {
    display: block;
    text-align: center;
    font-size: 34px;
    color: #c27a03;
}

.cz-font {
    color: #545454;
}

.is-avtive {
    color: rgb(41, 20, 20);
    font-size: 20px;
}
</style>
  