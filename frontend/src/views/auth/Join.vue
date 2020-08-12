<template>
  <div class="wrapper">
    <h1>회원가입</h1>
    <form>
      <label for="email">이메일</label>
      <input type="text" id="email" name="email" @input="typing" v-bind:value="emailString">
      <label for="name">이름</label>
      <input type="text" id="name" name="name" @input="typing" v-bind:value="nameString">
      <label for="password">비밀번호</label>
      <input type="password" id="password" name="password" @input="typing" v-bind:value="passwordString">
      <button :class="{ disable: isButtonDisable }" @click.prevent="submit">로그인</button>
    </form>
    <div class="guide small">
      등록하는 순간 Spectrum의 <a>서비스 이용 약관과 개인정보 보호 정책</a>에 동의하게 됩니다.
    </div>
    <hr>
    <div class="guide">
      <router-link to="/login">이미 계정이 있으신가요? <b>로그인</b></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Join",
  data() {
    return {
      isButtonDisable: true,
      emailString: "",
      nameString: "",
      passwordString: ""
    }
  },
  methods: {
    typing: function(e) {
      const targetName = e.target.name;
      const targetValue = e.target.value;

      if (targetName === "email") {
        this.emailString = targetValue;
      } else if (targetName === "name"){
        this.nameString = targetValue;
      } else if (targetName === "password"){
        this.passwordString = targetValue;
      }
      this.isButtonDisable =
          this.emailString === "" || this.passwordString === "" || this.nameString === "";
    },
    submit: function() {
      //submit event
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
  transform: translate(-50%, -50%);
}
h1 {
  text-align: center;
  margin-bottom: 42px;
  font-size: 32px;
}
label {
  font-size: 15px;
  color: black;
  margin: 0 0 4px 4px;
  display: block;
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
  margin: 16px 0 12px 0;
  font-size: 17px;
}
hr {
  @include divider;
  margin: 71.5px 0 20px 0;
}
button.disable {
  @include input-button(true);
}
</style>
