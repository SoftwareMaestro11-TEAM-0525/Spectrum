<template>
  <div class="wrapper">
    <div class="header">
      <img src="src/assets/logo.png" alt="Spectrum logo" />
      <h1>Spectrum</h1>
    </div>
    <form>
      <input type="text" name="email">
      <input type="text" name="password">
      <button></button>
    </form>
    <div>
      <a>비밀번호를 잊으셨나요?</a>
    </div>
    <hr>
    <a>아직 계정이 없으신가요? <b>가입하기</b></a>
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
}
.input {
  @include input-text;
}
</style>
