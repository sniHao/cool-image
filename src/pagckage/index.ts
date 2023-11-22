import CoolImage from "./CoolImage.vue"

import {App} from "vue";
const comps = [CoolImage]
const install = (Vue:App) =>{
    comps.map((component:any)=>{
        Vue.component(component.__name as string, component);
    })
}
const windowObj = window as any
/* 支持使用标签的方式引入 */
if (typeof windowObj !== 'undefined' && windowObj.Vue) {
    install(windowObj.Vue);
}

export default install