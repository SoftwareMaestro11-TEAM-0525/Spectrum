<template>
  <div class="wrapper">
    <div class="header">
      <img src="@/assets/logo.png" alt="Spectrum logo" />
      <h1>Spectrum</h1>
    </div>
    <form>
      <input type="text" name="email" placeholder="이메일">
      <input type="text" name="password" placeholder="비밀번호">
      <button>로그인</button>
    </form>
    <div class="guide">
      <a>비밀번호를 잊으셨나요?</a>
    </div>
    <hr>
    <div class="guide">
      <a>아직 계정이 없으신가요? <b>가입하기</b></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login"
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 30%;
  margin: 0 auto;
  padding-top: 280px;
}
input {
  @include input-text;
  font-size: 15px;
  padding-left: 16px;
  margin-bottom: 12px;
  box-sizing: border-box;
}
button {
  @include input-button;
  margin: 16px 0;
  font-size: 17px;
}
.header {
  text-align: center;
  margin-bottom: 42px;
  img {
    width: 48px;
    height: 48px;
    display: inline-block;
    vertical-align: middle ;
    margin-right: 12px;
  }
  h1 {
    display: inline-block;
    margin: 0;
    vertical-align: middle;
    font-size: 48px;
  }
}
.guide {
  text-align: center;
  font-size: 15px;
  color: #363636;
}
hr {
  margin: 71.5px 0 20px 0;
}
</style>
