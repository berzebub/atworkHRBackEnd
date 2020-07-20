<template>
  <div style="width:100%;height:100vh" class="backgroundImg">
    <q-card class="absolute-center bg-white q-py-lg" style="max-width:450px;width:100%;margin:auto">
      <p align="center" class="text-h3">Winner @Hotel</p>
      <p align="center">HR Section</p>

      <div class style="max-width:300px;margin:auto;width:100%">
        <!-- EMAIL SECTION -->
        <span>อีเมล</span>
        <q-input v-model="email" outlined dense></q-input>
        <!-- PASSWORD SECTION -->
        <div class="q-pt-md">
          <span>รหัสผ่าน</span>
          <q-input
            @keyup.enter="login()"
            v-model="password"
            :type="isPwd ? 'password' : 'text'"
            outlined
            dense
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>
        <!-- FORGET PASSWORD TEXT SECTION -->
        <div
          @click="forgetPassword()"
          class="q-pt-md cursor-pointer"
          style="width: fit-content;margin-left:225px"
        >
          <u>ลืมรหัสผ่าน?</u>
        </div>
        <!-- LOGIN BTN SECTION -->
        <div class="q-pt-md" align="center">
          <q-btn
            @click="login()"
            class="bg-cyan-8 text-white"
            style="width:190px"
            label="เข้าสู่ระบบ"
          ></q-btn>
        </div>
      </div>
    </q-card>
    <!-- --------------------------------------------dialog------------------------------------------ -->
    <!-- wrong Email -->
    <q-dialog v-model="openWrongDialogEmail">
      <q-card align="center" style="width:400px; height:200px">
        <div class="q-pa-md">
          <div class="row items-center q-mt-md" style="width:fit-content">
            <div>
              <q-icon color="negative" size="md" name="far fa-times-circle" />
            </div>
            <div class="q-ml-sm text-h6">
              <b>อีเมลหรือรหัสผ่านไม่ถูกต้อง</b>
            </div>
          </div>
          <div style="width:280px" class="q-mt-sm text-subtitle1">กรุณาลองอีกครั้ง</div>
          <div align="center" class="q-mt-md">
            <q-btn
              @click="confirmEmail()"
              class="q-mt-md text-subtitle1 text-white cursor-pointer"
              label="ตกลง"
              color="cyan-8"
              style="width:120px"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { auth, db } from "../router";
export default {
  data() {
    return {
      isPwd: true,
      email: "",
      password: "",
      openWrongDialogEmail: false,
      isKey: false,
      loginKey: "",
      authLogin: ""
    };
  },
  methods: {
    // ตกลง
    confirmEmail() {
      this.openWrongDialogEmail = false;
    },
    // ลืมรหัสผ่าน
    forgetPassword() {
      this.$router.push("/forgetPassword");
    },
    // กด LOGIN
    login() {
      this.loadingShow();
      auth
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          return auth
            .signInWithEmailAndPassword(this.email, this.password)
            .then(async result => {
              this.$q.localStorage.set("uid", result.user.uid);
              await this.getLoginKey(result.user.uid);
              this.loadingHide();
              this.$router.push("/kpi");
            })
            .catch(error => {
              this.wrongPasswordDialog();
              this.loadingHide();
            });
        })
        .catch(error => {});
    },
    // เปิด dialog password ผิด
    wrongPasswordDialog() {
      this.openWrongDialogEmail = true;
    },
    async getLoginKey(uid) {
      return new Promise((a, b) => {
        db.collection("user_hr")
          .where("uid", "==", uid)
          .get()
          .then(getUserId => {
            this.$q.localStorage.set(
              "loginKey",
              getUserId.docs[0].data().loginKey
            );
            a("finish");
          });
      });
    },
    async checkUserLogin() {
      this.loadingShow();
      this.authLogin = await auth.onAuthStateChanged(async user => {
        if (user) {
          this.$q.localStorage.set("uid", user.uid);
          await this.getLoginKey(user.uid);
          this.$router.push("/welcomeBack");
          this.loadingHide();
        } else {
          this.$q.localStorage.clear();
          this.loadingHide();
        }
      });
    }
  },
  async mounted() {
    if (this.$q.localStorage.has("uid")) {
      this.checkUserLogin();
    }
  },
  beforeDestroy() {
    if (typeof this.authLogin == "function") {
      this.authLogin();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>