<template>
  <div class="wrapper">
    <div class="header">
      <img src="@/assets/headerLogo.png" alt="Logo image" />
    </div>
    <form>
      <input
        type="text"
        name="email"
        placeholder="이메일"
        @input="typing"
        v-bind:value="emailString"
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        @input="typing"
        v-bind:value="passwordString"
      />
      <button
        :class="{ disable: isButtonDisable }"
        @click.prevent="handleLogin"
      >
        로그인
      </button>
    </form>
    <div class="error" v-if="isError">
      아이디 또는 비밀번호를 다시 입력해주세요.
    </div>
    <div class="guide">
      <router-link to="/password">비밀번호를 잊으셨나요?</router-link>
    </div>
    <hr />
    <div class="guide">
      <router-link to="/join"
        >아직 계정이 없으신가요? <b>가입하기</b></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      isError: false,
      emailString: "",
      passwordString: "",
      isButtonDisable: true
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("Main");
    }
    console.log(process.env);
  },
  methods: {
    handleLogin: function() {
      if (this.isButtonDisable) return;

      this.$store
        .dispatch("auth/login", {
          username: this.emailString,
          password: this.passwordString
        })
        .then(
          () => {
            this.$router.push("Main");
          },
          err => {
            if (err.response.status === 400) {
              this.isError = true;
            } else {
              alert("알 수 없는 에러가 발생했습니다. 관리자에게 문의해주세요!");
              console.log(err.response.data);
              console.log(err.response.headers);
              console.log(err.response.status);
            }
          }
        );
    },
    typing: function(e) {
      if (e.target.name === "email") {
        this.emailString = e.target.value;
      } else if (e.target.name === "password") {
        this.passwordString = e.target.value;
      }
      this.isButtonDisable =
        this.emailString === "" || this.passwordString === "";
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
input {
  @include input-text;
  margin-bottom: 12px;
  box-sizing: border-box;
}
button {
  @include input-button;
  margin: 16px 0;
  font-size: 17px;
}
button.disable {
  @include input-button(true);
}
.header {
  text-align: center;
  margin-bottom: 42px;
  img {
    height: 50px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 12px;
  }
  h1 {
    display: inline-block;
    margin: 0;
    vertical-align: middle;
    font-size: 48px;
  }
}
hr {
  @include divider;
  margin: 71.5px 0 20px 0;
}
.error {
  text-align: center;
  margin: -4px 0 16px 0;
}
</style>
