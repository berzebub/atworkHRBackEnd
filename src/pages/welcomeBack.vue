<template>
  <div class="bg-login">
    <div class="absolute-center text-subtitle1" align="center">
      <div
        :class="$q.platform.is.desktop?'text-h3':'text-h4'"
        v-if="isLoadUserInfo"
      >{{userInfo.name}}</div>
      <!-- <div class="q-mt-md">"ชีวิตต้องสู้ เพราะกู้มาเยอะ"</div> -->

      <!-- login button -->
      <div class="q-mt-lg">
        <q-btn
          @click="welcomeBack()"
          label="เข้าสู่ระบบ"
          class="q-ma-md bg-cyan-8 text-white"
          style="width:190px"
        />
        <div @click="logOut()" class="cursor-pointer">
          <u>เข้าสู่ระบบด้วยบัญชีอื่น</u>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "../router";
export default {
  data() {
    return {
      dialogEmail: false,
      dialogWrongEmail: false,
      userInfo: {},
      authLogin: "",
      isLoadUserInfo: false,
    };
  },
  methods: {
    // ส่งข้อมูล
    welcomeBack() {
      this.$router.push("/kpi");
    },
    checkUserLogin() {
      this.loadingShow();
      this.authLogin = auth.onAuthStateChanged(async (user) => {
        this.userInfo.name = user.displayName;
        this.isLoadUserInfo = true;
        this.loadingHide();
      });
    },
  },
  mounted() {
    this.checkUserLogin();
  },
  beforeDestroy() {
    this.authLogin = "";
  },
};
</script>

<style>
.bg-login {
  background-image: url("../../public/statics/bg.png");
  min-height: 100vh;
  /* background-repeat: no-repeat;
  width: 100%;
  background-position: center;
  background-attachment: fixed;
  background-size: cover; */
}
</style>
