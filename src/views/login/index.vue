<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// 移动端图片切换
let backgroundImageInterval = null;
let currentImageIndex = ref(0);
let currentImageUrl = ref(`http://img.haihaina.cn/image/video_000/video_0.jpg`);
let nextImageUrl = ref(`http://img.haihaina.cn/image/video_000/video_1.jpg`);
const preloadNextImage = async () => {
  const image = new Image();
  await new Promise((resolve) => {
    image.onload = resolve;
    image.src = nextImageUrl.value;
  });
};

const startBackgroundAnimation = async () => {
  while (true) {
    await preloadNextImage();
    currentImageUrl.value = nextImageUrl.value;
    currentImageIndex.value++;
    if (currentImageIndex.value > 103) {
      currentImageIndex.value = 0;
    }
    nextImageUrl.value = `http://img.haihaina.cn/image/video_000/video_${currentImageIndex.value}.jpg`;

    await new Promise((resolve) => setTimeout(resolve, 35)); // 调整每一帧的时间间隔
  }
};

const stopBackgroundAnimation = () => {
  clearInterval(backgroundImageInterval);
};
onMounted(() => {
  startBackgroundAnimation();
});

onUnmounted(() => {
  stopBackgroundAnimation();
});
let ruleForm = reactive({
  username: '',
  password: ''
})
const btnClassHeight = ref('60vh');
const btnClassTop = ref('40vh'); // 默认情况下，盒子的高度为 60vh，top 为 40vh - 60vh = -20vh
let startY = 0;
let currentY = 0;
let isDragging = false;
let direction = ""; // 用于记录移动方向
const onTouchStart = (event) => {
  console.log('onTouchStart')
  startY = event.touches[0].clientY;
  currentY = startY;
  isDragging = true;
};

const onTouchMove = (event) => {
  // let current = event.touches[0].clientY;
  // let delta = current - startY;
  // if (delta < 0) {
  //   console.log(delta,'向上滑动',)
  // }
  console.log('onTouchMove', event)
  console.log('event.touches[0].clientY', event.touches[0].clientY)
  console.log('startY', startY)
  // 如果btnClassHeight为60vh，说明按钮容器是关闭的，不能向上滑动，可以正常向下滑动
  if (btnClassHeight.value === '60vh' && event.touches[0].clientY < startY && !isDragging) return;

  event.preventDefault();

  const touch = event.touches[0];
  const deltaY = touch.clientY - currentY;
  currentY = touch.clientY;

  // 更新按钮容器的高度和位置
  btnClassHeight.value = `calc(${btnClassHeight.value} + ${deltaY}px)`;
  btnClassTop.value = `calc(${btnClassTop.value} + ${deltaY}px)`;
};
const onTouchEnd = (event) => {
  console.log('onTouchEnd')
  isDragging = false;

  // 根据下拉距离判断是否打开按钮容器
  const distance = currentY - startY;
  console.log(distance, 'distance')
  if (distance > 50) {
    // 打开按钮容器
    btnClassHeight.value = '60vh'; // 设置为打开时的高度
    btnClassTop.value = '40vh'; // 设置为打开时的top值
  } else {
    // 关闭按钮容器
    btnClassHeight.value = '60vh'; // 设置为关闭时的高度
    btnClassTop.value = '40vh'; // 设置为关闭时的top值
  }
};

// 登录
const onSubmit = (values) => {
  console.log(ruleForm, 'submit', values);
};
</script>
<template>
  <div class="login">
    <div class="video-container">
      <video id="video" autoplay muted loop :poster="currentImageUrl">
        <source src="../../assets/images/login_bg.mp4" type="video/mp4">
        <source src="../../assets/images/login_bg.mp4" type="video/webm">
      </video>
    </div>
    <div class="btn-class" :style="{ top: btnClassTop, height: btnClassHeight }" @touchstart="onTouchStart"
      @touchmove="onTouchMove" @touchend="onTouchEnd">
      <!-- 登录这里一个账号一个密码一个 -->
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="ruleForm.username" name="username" label="用户名" placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]" />
          <van-field v-model="ruleForm.password" type="password" name="password" label="密码" placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button color="#8f64e2" round block native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  // background-color:  #f6f6f6;
}

.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

video {
  width: 100%;
  height: auto;
  min-width: 100%;
  min-height: 100%;
}

.btn-class {
  position: absolute;
  top: 60vh;
  left: 0;
  width: 375px;
  height: 40vh;
  padding: 20px 0;
  text-align: center;
  background: #fff;
  border-radius: 5px;
  color: aqua;
  cursor: pointer;
  z-index: 999;
  // border-radius-: 15px;
  // 上面两个为圆
  border-radius: 25px 25px 0 0;
}

.fallback {
  // background: url('http://img.haihaina.cn/image/video_000/video_000.jpg') no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: background-image 0.5s ease;
}
</style>