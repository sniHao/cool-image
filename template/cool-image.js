import * as THREE from "./three-modu.js";
import { OrbitControls } from "./three-orbit.js";

let temp = `
<div class="cool-image-bd"
        :class="fullScreenInfo.isFull ? 'full' : ''"
        :style="'width:' + saveProp.width + ';height:' + saveProp.height + ';background-color: ' + saveProp.bgColor">
        <div class="cool-operate">
            <div class="flex-center-zy">
                <div class="tips-height ft-b">操作区</div>
            </div>
            <!-- 操作 -->
            <div class="cool-go-operate">
                <template v-if="isShow2D">
                    <ul class="cool-ul">
                        <li>鼠标左键按住滑动3D浏览图形 😎</li>
                        <li>鼠标滚轮放大|缩小图形 🙈</li>
                        <li>滚轮右键按住可拖动图形 🤲</li>
                    </ul>
                </template>
                <template v-else>
                    <el-button class="cool-btn" type="primary" @click="upImgSize('add')" round>
                        放大图形
                    </el-button>
                    <el-button class="cool-btn" type="primary" @click="upImgSize('sub')" round>
                        缩小图形
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
                    :style="'line-height:' + saveProp.height + ';width:100%'">图形加载失败</span>
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
      notImgtips: false,
      isShow2D: false,
      imgInfo: {
        width: "",
        height: "",
        liveDom: "",
        addNum: 0.05,
        imgWidth: 0,
        imgHeight: 0,
        canShowThree: true,
        hasThree: false,
        lodingThree: true,
        canvasBg: "",
      },
      fullScreenInfo: {
        isFull: false,
        temHeight: "",
        temWidth: "",
      },
      multiple: 1,
      mulitpleBox: 1,
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
        this.upImgPosition();
      }, 50);
      this.$message.success("已进入全屏预览模式");
    },
    outFull() {
      this.saveProp.height = this.fullScreenInfo.temHeight;
      this.saveProp.width = this.fullScreenInfo.temWidth;
      setTimeout(() => {
        this.reductionImg();
      }, 50);
      this.$message.success("已退出全屏预览模式");
    },
    getSvg(url) {
      return new Promise((resolve) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4)
            xhr.status === 200 ? resolve(xhr) : resolve("no_svg");
        };
        xhr.send();
      });
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
      if (url.substring(url.lastIndexOf(".") + 1) === "svg") {
        this.getSvg(url).then((res) => {
          this.notImgtips = res === "no_svg" ? true : false;
          if (this.notImgtips) return;
          let svg = res.responseXML.all[0];
          this.imgInfo.imgHeight = svg.height.animVal.valueAsString;
          this.imgInfo.imgWidth = svg.width.animVal.valueAsString;
          this.drawCanvas(res.responseText);
        });
        return;
      }
      this.getImageSize(url).then((res) => {
        this.notImgtips = res === "no_img" ? true : false;
        this.imgInfo.imgHeight = res.height;
        this.imgInfo.imgWidth = res.width;
        let strDom =
          '<img class="show_img" onerror="style=\'display:none\'" src="' +
          url +
          '">';
        if (this.imgInfo.imgHeight != null) this.drawCanvas(strDom);
      });
    },
    drawCanvas(domString) {
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
      if (this.canvasBg === null) return;
      this.canvasBg.innerHTML = domString;
      this.canShowThree = true;
      let drawing = document.querySelector(".cool-show-two")?.firstChild;
      this.imgInfo.liveDom = drawing;
      this.multiple = width / this.imgInfo.imgWidth;
      drawing?.setAttribute("class", "show_img");
      drawing?.setAttribute(
        "style",
        "transform-origin: 0 0;transform: scale(" +
          this.multiple +
          ");position:absolute;"
      );
      drawing?.setAttribute("draggable", "false");
      this.upImgPositionCom(
        this.imgInfo.imgWidth * this.multiple,
        this.imgInfo.imgHeight * this.multiple
      );
    },
    getCanvasInfo() {
      let canvasInfo = {
        canvasWidth: this.canvasBg.offsetWidth * this.mulitpleBox,
        canvasHeight: this.canvasBg.offsetHeight * this.mulitpleBox,
      };
      return canvasInfo;
    },
    upImgPositionCom(imgWidth, imgHeight) {
      let canvasInfo = this.getCanvasInfo();
      this.imgInfo.liveDom.style.left =
        (canvasInfo.canvasWidth - imgWidth) / 2 + "px";
      this.imgInfo.liveDom.style.top =
        (canvasInfo.canvasHeight - imgHeight) / 2 + "px";
    },
    upImgSize(cz) {
      if (this.mulitpleBox <= 1 && cz == "sub") {
        this.canvasBg.style.marginLeft = "0";
        this.canvasBg.style.marginTop = "0";
        return;
      }
      if (cz == "add") {
        this.mulitpleBox += this.imgInfo.addNum;
        this.canvasBg.style.transform = "scale(" + this.mulitpleBox + ")";
      } else {
        this.mulitpleBox -= this.imgInfo.addNum;
        this.canvasBg.style.transform = "scale(" + this.mulitpleBox + ")";
      }
      let fatherDom = document.querySelector(".cool-show-body");
      let left =
        this.imgInfo.liveDom.clientWidth * this.mulitpleBox * this.multiple -
        fatherDom.offsetWidth;
      let top =
        this.imgInfo.liveDom.clientHeight * this.mulitpleBox * this.multiple -
        fatherDom.offsetHeight;
      this.imgInfo.liveDom.style.marginLeft = left > 0 ? left + "px" : "unset";
      this.imgInfo.liveDom.style.marginTop = top > 0 ? top + "px" : "unset";
      console.log(left);
      fatherDom.scrollLeft = left;
      fatherDom.scrollTop = top;
    },
    upImgPosition() {
      this.upImgPositionCom(
        this.imgInfo.liveDom.clientWidth * this.multiple * this.mulitpleBox,
        this.imgInfo.liveDom.clientHeight * this.multiple * this.mulitpleBox
      );
      this.imgInfo.liveDom.style.marginLeft = "0";
      this.imgInfo.liveDom.style.marginTop = "0";
    },
    reductionImg() {
      this.mulitpleBox = 1;
      this.canvasBg.style.transform = "unset";
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
        //重置渲染图形大小
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
