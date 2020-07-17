<template>
  <div style="width:100%;height:100vh" class="backgroundImg">
    <q-card
      class="absolute-center bg-white q-py-lg"
      align="center"
      style="max-width:450px;width:100%;margin:auto"
    >
      <div class="q-pa-md">
        <div class="q-mb-md text-h6 text-blue-grey-10">ลืมรหัสผ่าน</div>
        <div
          class="q-mb-md text-subtitle1 text-blue-grey-10"
          style="width:308px"
        >กรุณากรอกอีเมลเพื่อเริ่มการตั้งค่ารหัสผ่านใหม่</div>
        <div>
          <div class="q-mb-md" style="width:300px">
            <div align="left" class="text-subtitle1 text-blue-grey-10">อีเมล</div>
            <!-- กล่อง input email -->
            <div>
              <q-input @keyup.enter="sendEmail()" v-model="email" outlined dense />
            </div>
          </div>
          <!-- ปุ่มส่งข้อมูล -->
          <div class="q-mb-xl">
            <q-btn
              @click="sendEmail()"
              class="text-subtitle1"
              label="ส่งข้อมูล"
              color="indigo-12"
              style="width:300px"
            />
          </div>
          <!-- ปุ่มย้อนกลับ -->
          <div @click="toLoginPage()" class="text-blue-grey-10 text-subtitle1 cursor-pointer">
            <u>ย้อนกลับ</u>
          </div>
        </div>
      </div>
    </q-card>
    <!-- -------------------------------------------dialog------------------------------------------ -->
    <!-- correct Email -->
    <q-dialog v-model="openCorrectDialogEmail">
      <q-card align="center" style="width:400px; height:200px">
        <div class="q-pa-md">
          <div class="row items-center" style="width:fit-content">
            <div>
              <q-icon color="blue-10" size="md" name="far fa-check-circle" />
            </div>
            <div class="q-ml-sm text-h6">
              <b>สำเร็จ</b>
            </div>
          </div>
          <div
            style="width:280px"
            class="q-mt-sm text-subtitle1"
          >เราทำการส่งอีเมลสำหรับการตั้งค่ารหัสผ่านใหม่ไปยังอีเมลของคุณแล้ว</div>
          <div align="center">
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
    <!-- wrong Email -->
    <q-dialog v-model="openWrongDialogEmail">
      <q-card align="center" style="width:400px; height:200px">
        <div class="q-pa-md">
          <div class="row items-center q-mt-md" style="width:fit-content">
            <div>
              <q-icon color="negative" size="md" name="far fa-times-circle" />
            </div>
            <div class="q-ml-sm text-h6">
              <b>ไม่พบอีเมลผู้ใช้งานในระบบ</b>
            </div>
          </div>
          <div
            style="width:280px"
            class="q-mt-sm text-subtitle1"
          >กรุณาลองอีกครั้งหรือติดต่อฝ่ายบุคคล</div>
          <div align="conter">
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
import { auth } from "../router";
export default {
  data() {
    return {
      email: "",
      openCorrectDialogEmail: false,
      openWrongDialogEmail: false
    };
  },
  methods: {
    // กลับหน้า Login
    toLoginPage() {
      this.$router.push("/");
    },
    // ส่งข้อมูลไปที่ Email
    sendEmail() {
      let _this = this;
      auth
        .sendPasswordResetEmail(this.email)
        .then(function() {
          _this.openCorrectDialogEmail = true;
        })
        .catch(function(error) {
          _this.openWrongDialogEmail = true;
        });
    },
    // ตกลง
    confirmEmail() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped></style>
