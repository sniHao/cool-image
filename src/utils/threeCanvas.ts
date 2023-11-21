import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function renderingCanvas(canvasDom: HTMLElement, url: string, bgColor: string) {
    return new Promise(resolve => {
        url = url + "?" + Date.parse(new Date().toString())
        const img = new Image();
        img.src = url
        img.onload = (e) => {
            const res = countSize(img.width, img.height, true)
            drawImg(res[0], res[1])
        }

        //重置渲染图片大小
        const countSize = (imgWidth: number, imgHeight: number, loop: boolean): Array<number> => {
            const res = [imgWidth, imgHeight]
            if (loop) {
                switch (true) {
                    case imgWidth + imgHeight > 200: {
                        res[0] = imgWidth / 10;
                        res[1] = imgHeight / 10;
                        loop = true
                        break;
                    }
                    case imgWidth + imgHeight > 160: {
                        res[0] = imgWidth / 3;
                        res[1] = imgHeight / 3;
                        loop = true
                        break;
                    }
                    case imgWidth + imgHeight > 120: {
                        res[0] = imgWidth / 2;
                        res[1] = imgHeight / 2;
                        loop = true
                        break;
                    }
                    case imgWidth + imgHeight > 65: {
                        res[0] = imgWidth / 1.5;
                        res[1] = imgHeight / 1.5;
                        loop = true
                        break;
                    }
                    default: {
                        loop = false
                        break;
                    }
                }
                return countSize(res[0], res[1], loop)
            } else {
                return res
            }
        }

        //绘制图形
        const drawImg = (imgWidth: number, imgHeight: number) => {
            imgWidth = imgWidth === undefined ? 15 : imgWidth
            imgHeight = imgHeight === undefined ? 12 : imgHeight
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(60, canvasDom.offsetWidth / canvasDom.offsetHeight, 1, 1000);
            camera.position.z = 10;
            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(canvasDom.offsetWidth, canvasDom.offsetHeight);
            canvasDom.appendChild(renderer.domElement);
            const geometry = new THREE.PlaneGeometry(imgWidth, imgHeight);
            const loader = new THREE.TextureLoader();
            const material = new THREE.MeshLambertMaterial({
                map: loader.load(url, render),
                side: THREE.DoubleSide,
                transparent: true,
                color: 0xffffff
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(0, 0, 0);
            mesh.scale.set(0.3, 0.3, 0.3)
            scene.add(mesh);
            const light = new THREE.DirectionalLight(0xffffff);
            light.position.set(0, 0, 1);
            scene.add(light);
            const controls = new OrbitControls(camera, renderer.domElement) as any;
            controls.addEventListener('change', render);
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
            resolve(true)
        }
    })

}