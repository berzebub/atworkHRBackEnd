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
        <div @click="forgetPassword()" class="q-pt-md cursor-pointer" align="right">
          <u>ลืมรหัสผ่าน?</u>
        </div>
        <!-- LOGIN BTN SECTION -->
        <div class="q-pt-md" align="center">
          <q-btn
            @click="login()"
            class="bg-indigo-12 text-white"
            style="width:190px"
            label="เข้าสู่ระบบ"
          ></q-btn>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPwd: true,
      email: "",
      password: ""
    };
  },
  methods: {
    forgetPassword() {
      this.$router.push("/forgetPassword");
    },
    login() {}
  }
};
</script>

<style lang="scss" scoped>
</style>