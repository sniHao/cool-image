import * as THREE from "./three-modu.js";
import { OrbitControls } from "./three-orbit.js";

let temp = `
<div class="cool-image-bd"
        :class="fullScreenInfo.isFull ? 'full' : ''"
        :style="'width:' + saveProp.width + ';height:' + saveProp.height + ';background-color: ' + saveProp.bgColor">
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
            <!-- 全屏预览-->
            <div style="margin-bottom: 15px" v-if="!isShow2D">
              <el-button
                v-if="!fullScreenInfo.isFull"
                class="cool-btn"
                type="primary"
                @click="fullScreen(true)"
                round
              >
                全屏预览
              </el-button>
              <el-button
                v-else
                class="cool-btn"
                type="danger"
                @click="fullScreen(false)"
                round
              >
                退出全屏预览
              </el-button>
            </div>
            <!-- 2_3维切换-->
            <div class="flex-center-zy" style="margin-top: 20px;">
                <span class="ft-b cz-font" :class="!isShow2D ? 'is-avtive' : ''">2D</span>
                <el-switch v-if="imgInfo.canShowThree" v-model="isShow2D" active-color="#13ce66" :disabled="fullScreenInfo.isFull"
                    inactive-color="#409eff"></el-switch>
                <el-switch v-else active-color="#13ce66" inactive-color="#409eff" disabled></el-switch>
                <span class="ft-b cz-font" :class="isShow2D ? 'is-avtive' : ''">3D</span>
            </div>
        </div>
        <!-- 模式展示 -->
        <div class="cool-show-body">
            <div class="cool-show-two" id="cool-show-two" v-show="!isShow2D">
                <span v-if="notImgtips" class="cool-noImg-text"
                    :style="'line-height:' + saveProp.height + ';'">图片加载失败</span>
            </div>
            <div id="cool-show-three" v-show="isShow2D">
                <span v-if="imgInfo.lodingThree" class="cool-noImg-text"
                    :style="'line-height:' + saveProp.height + ';'">模型加载中...</span>
            </div>
        </div>
    </div>
`;
let myComponent = Vue.extend({
  template: temp,
  props: {
    width: {
      type: Number | String,
      default: 600,
    },
    height: {
      type: Number | String,
      default: 350,
    },
    bgColor: {
      type: String,
      default: "#e9e9e9",
    },
    coolUrl: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      saveProp: {
        width: "600px",
        height: "350px",
        bgColor: "bisque",
        coolUrl: "",
      },
      tipsText:
        "图形出现大小默认是原图片大小,超出或小于限制将变为限制大小\nTips🎉：图片可为透明png\n\n2D: \n单击图形开始移动 🚀\n" +
        "双击图形结束移动 😪\n放大和缩小都有限制 🤪\n\n 3D:\n鼠标左键按住滑动3D浏览图片 😎\n鼠标滚轮放大/缩小图片 🙈\n滚轮右键按住可拖动图片 🤲",
      notImgtips: false,
      isShow2D: false,
      imgInfo: {
        width: "",
        height: "",
        liveDom: "",
        realAngleX: 0,
        realAngleY: 0,
        addNum: 1.1,
        imgWidth: 0,
        imgHeight: 0,
        canShowThree: true,
        hasThree: false,
        lodingThree: true,
        canvasBg: "",
      },
      move: false,
      moveX: 0,
      moveY: 0,
      domX: 0,
      domY: 0,
      fullScreenInfo: {
        isFull: false,
        temHeight: "",
        temWidth: "",
      },
    };
  },
  mounted() {
    if (this.diffIndex()) return;
    this.initImg(this.saveProp.coolUrl);
    this.canvasBg = document.getElementById("cool-show-two");
  },
  watch: {
    isShow2D: function () {
      let imgDom = document.getElementsByClassName("show_img")[0];
      if (this.isShow2D) {
        if (imgDom === undefined) return (this.imgInfo.canShowThree = false);
        imgDom.removeEventListener("click", this.startDrag);
        imgDom.removeEventListener("mousemove", this.drag);
        imgDom.removeEventListener("dblclick", this.stopDrag);
        if (!this.imgInfo.hasThree) {
          this.renderingCanvas(
            document.getElementById("cool-show-three"),
            this.saveProp.coolUrl,
            this.saveProp.bgColor
          ).then((res) => {
            if (res) this.imgInfo.hasThree = true;
            this.imgInfo.lodingThree = false;
          });
        }
        return;
      }
      this.canShowThree = true;
      if (imgDom === undefined) return;
      imgDom.addEventListener("click", this.startDrag);
      imgDom.addEventListener("mousemove", this.drag);
      imgDom.addEventListener("dblclick", this.stopDrag);
    },
  },
  methods: {
    fullScreen(zt) {
      this.fullScreenInfo.isFull = zt;
      zt ? this.goFull() : this.outFull();
    },
    goFull() {
      this.fullScreenInfo.temHeight = this.saveProp.height;
      this.fullScreenInfo.temWidth = this.saveProp.width;
      this.saveProp.height = window.innerHeight + "px";
      this.saveProp.width = window.innerWidth + "px";
      setTimeout(() => {
        this.upImgSize("add");
      }, 50);
      this.$message.success("已进入全屏预览模式");
    },
    outFull() {
      this.saveProp.height = this.fullScreenInfo.temHeight;
      this.saveProp.width = this.fullScreenInfo.temWidth;
      setTimeout(() => {
        this.upImgSize("sub");
      }, 50);
      this.$message.success("已退出全屏预览模式");
    },
    getImageSize(url) {
      return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = () => {
          resolve({
            width: image.width,
            height: image.height,
          });
        };
        image.onerror = () => {
          this.canShowThree = false;
          resolve("no_img");
          reject(new Error("error"));
        };
        image.src = url;
      });
    },
    initImg(url) {
      this.getImageSize(url).then((result) => {
        this.notImgtips = result === "no_img" ? true : false;
        this.imgInfo.imgHeight = result.height;
        this.imgInfo.imgWidth = result.width;
        if (this.imgInfo.imgHeight != null) this.drawCanvas(url);
      });
    },
    drawCanvas(url) {
      if (this.imgInfo?.liveDom != "")
        document.getElementsByClassName("show_img")[0]?.remove();
      const maxWidth = this.canvasBg.offsetWidth - 20;
      const maxHeight = this.canvasBg.offsetHeight - 10;
      let widthPro = maxWidth / this.imgInfo.imgWidth;
      let heightPro = maxHeight / this.imgInfo.imgHeight;
      let width = this.imgInfo.imgWidth,
        height = this.imgInfo.imgHeight;
      if (width > maxWidth) {
        width = maxWidth;
        height *= widthPro;
      }
      if (height > maxHeight) {
        height = maxHeight;
        width *= heightPro;
      }
      let newImg = document.createElement("img");
      newImg.setAttribute("class", "show_img");
      newImg.setAttribute("onerror", "style='display:none'");
      newImg.src = url;
      newImg.style.position = "absolute";
      newImg.style.width = width + "px";
      newImg.style.height = height + "px";
      this.imgInfo.width = width + "px";
      this.imgInfo.height = height + "px";
      newImg.addEventListener("click", this.startDrag);
      newImg.addEventListener("mousemove", this.drag);
      newImg.addEventListener("dblclick", this.stopDrag);
      this.imgInfo.liveDom = newImg;
      if (this.canvasBg === null) return;
      this.canvasBg.appendChild(newImg);
      this.canShowThree = true;
      this.firstCreImg(newImg);
    },
    startDrag(e) {
      this.moveX = e.clientX;
      this.moveY = e.clientY;
      this.domX = e.target.style.left.replace("px", "");
      this.domY = e.target.style.top.replace("px", "");
      this.move = true;
    },
    drag(event) {
      if (this.move) {
        let dom = event.target;
        if (this.canvasBg === null) return;
        dom.style.left = this.domX - (this.moveX - event.clientX) + "px";
        dom.style.top = this.domY - (this.moveY - event.clientY) + "px";
      }
    },
    stopDrag(event) {
      this.ovPosition(event);
      this.imgInfo.liveDom = event.target;
      this.move = false;
    },
    firstCreImg(dom) {
      this.upImgPositionCom(dom.offsetWidth, dom.offsetHeight);
    },
    ovPosition(event) {
      let evTarget = event.target;
      let imgWidth = evTarget.offsetWidth;
      let imgHeight = evTarget.offsetHeight;
      let canvasInfo = this.getCanvasInfo();
      let imgLeft = parseInt(evTarget.style.left.replace("px", ""));
      let imgTop = parseInt(evTarget.style.top.replace("px", ""));
      if (
        imgLeft - canvasInfo.canvasLeft < 1 ||
        imgWidth + imgLeft - canvasInfo.canvasLeft - canvasInfo.canvasWidth >
          -3 ||
        imgTop - canvasInfo.canvasTop < 1 ||
        imgHeight + imgTop - canvasInfo.canvasTop - canvasInfo.canvasHeight > -3
      ) {
        evTarget.style.left =
          canvasInfo.canvasLeft +
          canvasInfo.canvasWidth / 2 -
          imgWidth / 2 +
          "px";
        evTarget.style.top =
          canvasInfo.canvasTop +
          canvasInfo.canvasHeight / 2 -
          imgHeight / 2 +
          "px";
      }
    },
    getCanvasInfo() {
      let canvasInfo = {
        canvasTop: this.canvasBg.offsetTop,
        canvasLeft: this.canvasBg.offsetLeft,
        canvasWidth: this.canvasBg.offsetWidth,
        canvasHeight: this.canvasBg.offsetHeight,
      };
      return canvasInfo;
    },
    upImgPositionCom(imgWidth, imgHeight) {
      let canvasInfo = this.getCanvasInfo();
      this.imgInfo.liveDom.style.left =
        canvasInfo.canvasLeft +
        canvasInfo.canvasWidth / 2 -
        imgWidth / 2 +
        "px";
      this.imgInfo.liveDom.style.top =
        canvasInfo.canvasTop +
        canvasInfo.canvasHeight / 2 -
        imgHeight / 2 +
        "px";
    },
    upImgSize(cz) {
      let oldWidth = this.imgInfo.liveDom.offsetWidth;
      let oldHeight = this.imgInfo.liveDom.offsetHeight;
      let addWidth = oldWidth * this.imgInfo.addNum;
      let addHeight = oldHeight * this.imgInfo.addNum;
      if (this.canvasBg == null) return;
      let maxWidth = this.canvasBg.offsetWidth - 20;
      let maxHeight = this.canvasBg.offsetHeight - 10;
      if (cz == "add") {
        if (addWidth > maxWidth) {
          this.imgInfo.liveDom.style.width = maxWidth + "px";
        } else if (addHeight > maxHeight) {
          this.imgInfo.liveDom.style.height = maxHeight + "px";
        } else {
          this.imgInfo.liveDom.style.width = addWidth + "px";
          this.imgInfo.liveDom.style.height = addHeight + "px";
        }
        this.upImgPosition();
        return;
      }
      this.imgInfo.liveDom.style.width =
        oldWidth / this.imgInfo.addNum < 80
          ? 80
          : oldWidth / this.imgInfo.addNum + "px";
      this.imgInfo.liveDom.style.height =
        oldHeight / this.imgInfo.addNum < 80
          ? 80
          : oldHeight / this.imgInfo.addNum + "px";
      this.upImgPosition();
    },
    upImgPosition() {
      let imgWidth = this.imgInfo.liveDom.offsetWidth;
      let imgHeight = this.imgInfo.liveDom.offsetHeight;
      this.upImgPositionCom(imgWidth, imgHeight);
    },
    reductionImg() {
      this.imgInfo.liveDom.style.width = this.imgInfo.width;
      this.imgInfo.liveDom.style.height = this.imgInfo.height;
      this.imgInfo.liveDom.style.transform = "unset";
      this.imgInfo.realAngleX = 0;
      this.imgInfo.realAngleY = 0;
      this.upImgPosition();
    },
    diffIndex() {
      if (this.height == "auto") this.saveProp.height = "100%";
      else if (this.height > 350) this.saveProp.height = this.height + "px";
      if (this.width == "auto") this.saveProp.width = "100%";
      else if (this.width > 450) this.saveProp.width = this.width + 150 + "px";
      this.saveProp.bgColor = this.bgColor;
      this.saveProp.coolUrl = this.coolUrl;
      if (this.coolUrl === "") {
        this.notImgtips = true;
        return true;
      }
    },
    convertImageToBase64(imageUrl) {
      return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const image = new Image();
        image.crossOrigin = "Anonymous";
        image.onload = function () {
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0);
          resolve([canvas.toDataURL(), image.width, image.height]);
        };
        image.src = imageUrl;
      });
    },
    renderingCanvas(canvasDom, url, bgColor) {
      return new Promise((resolve) => {
        this.convertImageToBase64(url).then((res) => {
          const result = countSize(res[1], res[2], true);
          drawImg(res[0], result[0], result[1]);
        });
        //重置渲染图片大小
        const countSize = (imgWidth, imgHeight, loop) => {
          const res = [imgWidth, imgHeight];
          if (loop) {
            switch (true) {
              case imgWidth + imgHeight > 200: {
                res[0] = imgWidth / 10;
                res[1] = imgHeight / 10;
                loop = true;
                break;
              }
              case imgWidth + imgHeight > 160: {
                res[0] = imgWidth / 3;
                res[1] = imgHeight / 3;
                loop = true;
                break;
              }
              case imgWidth + imgHeight > 120: {
                res[0] = imgWidth / 2;
                res[1] = imgHeight / 2;
                loop = true;
                break;
              }
              case imgWidth + imgHeight > 65: {
                res[0] = imgWidth / 1.5;
                res[1] = imgHeight / 1.5;
                loop = true;
                break;
              }
              default: {
                loop = false;
                break;
              }
            }
            return countSize(res[0], res[1], loop);
          } else {
            return res;
          }
        };
        //绘制图形
        const drawImg = (baseUrl, imgWidth, imgHeight) => {
          imgWidth = imgWidth === undefined ? 15 : imgWidth;
          imgHeight = imgHeight === undefined ? 12 : imgHeight;
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(
            60,
            canvasDom.offsetWidth / canvasDom.offsetHeight,
            1,
            1000
          );
          camera.position.z = 10;
          const renderer = new THREE.WebGLRenderer({ antialias: true });
          renderer.setSize(canvasDom.offsetWidth, canvasDom.offsetHeight);
          canvasDom.appendChild(renderer.domElement);
          const geometry = new THREE.PlaneGeometry(imgWidth, imgHeight);
          const loader = new THREE.TextureLoader();
          const material = new THREE.MeshBasicMaterial({
            map: loader.load(baseUrl, render),
            side: THREE.DoubleSide,
            transparent: true,
          });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(0, 0, 0);
          mesh.scale.set(0.3, 0.3, 0.3);
          scene.add(mesh);
          const ambient = new THREE.AmbientLight(0xffffff);
          scene.add(ambient);
          const controls = new OrbitControls(camera, renderer.domElement);
          controls.addEventListener("change", render);
          controls.minZoom = 0.5;
          controls.maxZoom = 2;
          controls.minPolarAngle = 0.2;
          controls.maxPolarAngle = Math.PI / 1.2;
          controls.screenSpacePanning = true;
          controls.zoomSpeed = 1.0;
          scene.background = new THREE.Color(bgColor);
          function render() {
            renderer.render(scene, camera);
          }
          resolve(true);
        };
      });
    },
  },
});

Vue.component("nh-image", myComponent);
