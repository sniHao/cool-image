<template>
    <!-- body -->
    <div class="cool-img-bd" :style="`width:` + prop.width + `px;height:` + prop.height + `px`">

    </div>
</template>
  
<script lang="ts" setup>
import { defineProps } from 'vue';
//参数接收
const prop = defineProps({
    width: Number,
    height: Number,
    bgColor: String
})


</script>
  
<style lang="scss" scoped>
.cool-img-bd {
    width: 800px;
    height: 600px;
    min-width: 550px;
    min-height: 300px;
    background-color: bisque;
}
</style>
  