<template>
  <div class="wrapper">
    <h1>비밀번호 찾기</h1>
    <div class="guide large">
      기존에 가입한 이메일 주소를 입력해주세요.<br />
      해당 이메일 주소로 비밀번호 변경 메일을 보내드립니다.
    </div>
    <form>
      <input
        type="text"
        id="email"
        name="email"
        @input="typing"
        v-bind:value="emailString"
        placeholder="이메일"
      />
      <div class="error" v-if="isEmailError">{{ emailErrorMsg }}</div>
      <button :class="{ disable: isButtonDisable }" @click.prevent="submit">
        이메일 전송
      </button>
    </form>
    <hr />
    <div class="guide">
      <router-link to="/login"><b>로그인</b> 하러가기</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Password",
  data() {
    return {
      isButtonDisable: true,
      emailString: "",
      emailErrorMsg: "",
      isEmailError: false
    };
  },
  methods: {
    typing: function(e) {
      if (e.target.name === "email") {
        this.emailString = e.target.value;
      }
      this.isButtonDisable = this.emailString === "";
    },
    isEmailValid: function(s) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
    },
    submit: function() {
      // 버튼이 비활성화되어 있으면(입력 폼이 다 채워지지 않았으면) 종료
      if (this.isButtonDisable) return;

      // 이메일 주소의 형식이 올바른지 검증 (~@~.~ 형식)
      if (!this.isEmailValid(this.emailString)) {
        this.emailErrorMsg = "올바른 형식의 이메일 주소를 입력해주세요.";
        this.isEmailError = true;
        return;
      } else {
        this.isEmailError = false;
      }

      //서버 api 참조
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 30%;
  margin: 0 auto;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
}
h1 {
  text-align: center;
  margin: 0 0 42px 0;
  font-size: 32px;
}
input {
  @include input-text;
  font-size: 15px;
  padding-left: 16px;
  margin: 32px 0 4px 0;
  box-sizing: border-box;
}
button {
  @include input-button;
  margin: 20px 0 12px 0;
  font-size: 17px;
  &.disable {
    @include input-button(true);
  }
}
hr {
  @include divider;
  margin: 99.5px 0 20px 0;
}
.error {
  padding-left: 4px;
}
</style>
