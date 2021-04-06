<template>
    <div>
        <!-- <div class="light-black"></div> -->
        <div class="picture-bg"></div>
        <div class="picture-top">
            <i @click="back" class="iconfont icon-fanhui"></i>
            <div>
                <p>移动和缩放</p>
            </div>
            <i class="iconfont icon-043caidan" style="color: #fff;"></i>
        </div>
        <div class="picture-content">
            <img src="http://192.168.3.133:8000/images/portrait.jpg" alt="">
        </div>
        <!-- <div class="select-area">

        </div> -->
        <div class="light-black">
            <canvas id="light-black"></canvas>
        </div>
    </div>
</template>

<script>
import './css/index.css'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const router = useRouter()

        const clearArcFun = (x, y, r, cxt) => {
            let stepClear = 1
            const clearArc = (x, y, radius) => {
                let calcWidth = radius - stepClear
                let calcHeight = Math.sqrt(radius * radius - calcWidth * calcWidth)
                let posX = x - calcWidth
                let posY = y - calcHeight
                let widthX = 2 * calcWidth
                let heightY = 2 * calcHeight
                if(stepClear <= radius){  
                    cxt.clearRect(posX, posY, widthX, heightY)
                    stepClear += 1
                    clearArc(x, y, radius)
                }
            }
            clearArc(x,y,r)
        }
        
        const back = () => {
            router.back()
        }

        onMounted(() => {
            let canvas = document.getElementById("light-black");
            let context = canvas.getContext("2d");
            if (canvas.width < window.innerWidth) canvas.width = window.innerWidth
            if (canvas.height < window.innerHeight) canvas.height = window.innerHeight

            context.fillStyle = "rgba(0, 0, 0, 0.5)";//设置填充色（可以是渐变色或半透明色）
            context.fillRect(0, 0, canvas.width, canvas.height);//填充背景我色
            clearArcFun(152, 281, 121, context)
        })
        
        return {
            back
        }
    }
}
</script>
