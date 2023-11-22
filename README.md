# cool-image

#### 介绍🤔
仅仅只需一张图片，可实现图片2D、3D操作的预览🤪

#### 效果预览👨‍🚀
2D:
![输入图片说明](public/gitImgtwo.png)
3D:
![输入图片说明](public/gitImageThree.png.png)

#### 安装教程🚀
`npm i nh-cool-img`

#### 使用说明🍋

> 在Vue中全局引入，即可在其他组件中直接使用

- main.ts中

```
import CoolImage from 'cool-image'
import 'cool-image/cool-image.css'

app.use(CoolImage)
```
- 组件中

```
<CoolImage :width="1300" :height="690" :coolUrl="xxx" :bgColor="xxx"></CoolImage>
```
> 属性说明：
- width:画布的宽【不包含左部分操作区(150px)】  |  类型:number  |  默认：450px    
- height:画布的高【不包含左部分操作区(150px)】  |  类型:number  |  默认：350px  
- coolUrl:图片链接路径  |  类型:string|  默认：—  
- bgColor:画布背景色  |  类型:string|  默认："#E9E9E9"  

#### 参与贡献🤖

很多

