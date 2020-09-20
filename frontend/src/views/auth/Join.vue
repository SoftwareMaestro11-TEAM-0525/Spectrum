<template>
  <div class="wrapper">
    <h1>회원가입</h1>
    <form>
      <label for="email">이메일</label>
      <input
        type="text"
        id="email"
        name="email"
        @input="typing"
        v-bind:value="emailString"
      />
      <div class="error" v-if="isEmailError">{{ emailErrorMsg }}</div>
      <label for="name">이름</label>
      <input
        type="text"
        id="name"
        name="name"
        @input="typing"
        v-bind:value="nameString"
      />
      <label for="password">비밀번호</label>
      <input
        type="password"
        id="password"
        name="password"
        @input="typing"
        v-bind:value="passwordString"
      />
      <div class="error" v-if="isPwdError">
        비밀번호는 8자리 이상 입력해주세요.
      </div>
      <button :class="{ disable: isButtonDisable }" @click.prevent="submit">
        가입하기
      </button>
    </form>
    <div class="guide small">
      등록하는 순간 Spectrum의 <a>서비스 이용 약관과 개인정보 보호 정책</a>에
      동의하게 됩니다.
    </div>
    <hr />
    <div class="guide">
      <router-link to="/login"
        >이미 계정이 있으신가요? <b>로그인</b></router-link
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Join",
  data() {
    return {
      isButtonDisable: true,
      isEmailError: false,
      isPwdError: false,
      emailString: "",
      nameString: "",
      passwordString: "",
      emailErrorMsg: ""
    };
  },
  methods: {
    typing: function(e) {
      const targetName = e.target.name;
      const targetValue = e.target.value;

      if (targetName === "email") {
        this.emailString = targetValue;
      } else if (targetName === "name") {
        this.nameString = targetValue;
      } else if (targetName === "password") {
        this.passwordString = targetValue;
      }
      this.isButtonDisable =
        this.emailString === "" ||
        this.passwordString === "" ||
        this.nameString === "";
    },
    isEmailValid: function(s) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
    },
    isPwdValid: function(s) {
      return /^[\S]{8,}$/.test(s);
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

      // 비밀번호가 8자리 이상인지 검증
      if (!this.isPwdValid(this.passwordString)) {
        this.isPwdError = true;
        return;
      } else {
        this.isPwdError = false;
      }

      //서버에 이메일, 비밀번호, 이름 전송
      const baseURI = "http://localhost:3000/api/user";

      let data = {
        user_id: this.emailString,
        user_email: this.emailString,
        user_pw: this.passwordString,
        user_name: this.user_name,
      };

      axios({
        method: "post",
        url: baseURI,
        data: data
      })
        .then(res => {
          console.log(res);
          alert("회원가입이 완료되었습니다!");
          this.$router.push("Login");
        })
        .catch(err => {
          if (err.response.status === 400) {
            this.emailErrorMsg = "이미 가입된 이메일 주소입니다.";
            this.isEmailError = true;
          } else {
            alert("알 수 없는 에러가 발생했습니다. 관리자에게 문의해주세요!");
            console.log(err.response.data);
            console.log(err.response.headers);
            console.log(err.response.status);
          }
        });
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
  margin-bottom: 24px;
  box-sizing: border-box;
}
button {
  @include input-button;
  margin: 8px 0 16px 0;
  font-size: 17px;
}
hr {
  @include divider;
  margin: 79.5px 0 20px 0;
}
button.disable {
  @include input-button(true);
}
.error {
  margin: -20px 0 20px 0;
  padding-left: 4px;
}
</style>
