<template>
  <div class="login">
    <div class="video-container">
      <video autoplay muted loop>
        <source src="../../assets/images/login_bg.mp4" type="video/mp4">
      </video>
    </div>
    <div class="fallback"></div>
    <div class="btnClass">
      登录
    </div>
  </div>
</template>

<style lang="less" scoped>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
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
.btnClass{
  position: absolute;
  top: 30vh;
  left: 0;
  width: 100vw;
  height: 80vh;
  text-align: center;
  background: #fff;
  border-radius: 5px;
  color: aqua;
  cursor: pointer;
  z-index: 999;
  border-radius: 15px;
}
.fallback {
  background: url('http://img.haihaina.cn/image/video_000/video_000.jpg') no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>