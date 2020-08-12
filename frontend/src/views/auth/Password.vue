<template>
  <div class="wrapper">
    <h1>비밀번호 찾기</h1>
    <div class="guide">
      기존에 가입한 이메일 주소를 입력해주세요.<br>
      해당 이메일 주소로 비밀번호 변경 메일을 보내드립니다.
    </div>
    <form>
      <input type="text" id="email" name="email" @input="typing" v-bind:value="emailString" placeholder="이메일">
      <button :class="{ disable: isButtonDisable }" @click.prevent="submit">이메일 전송</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Password",
  data() {
    return {
      emailString: ""
    }
  },
  methods: {
    submit: function(e) {
      if (e.target.name === "email") {
        this.emailString = e.target.value;
      }
      this.isButtonDisable = this.emailString === "";
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  width: 30%;
  margin: 0 auto;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-45%, -50%);
}
h1 {
  text-align: center;
  margin-bottom: 42px;
  font-size: 32px;
}
input {
  @include input-text;
  font-size: 15px;
  padding-left: 16px;
  margin-top: 28px;
  margin-bottom: 12px;
  box-sizing: border-box;
}
button {
  @include input-button;
  margin: 12px 0 12px 0;
  font-size: 17px;
}
</style>
