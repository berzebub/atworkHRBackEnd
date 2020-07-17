<template>
  <div>
    <div align="center" class="absolute-center" style="width:300px">
      <div class="q-mb-md text-h6">ลืมรหัสผ่าน</div>
      <div
        class="q-mb-md text-subtitle1"
        style="width:255px"
      >กรุณากรอกอีเมลในช่องข้างล่างเพื่อเริ่มการตั้งค่ารหัสผ่านใหม่</div>
      <div>
        <div class="q-mb-md">
          <div align="left" class="text-subtitle1">อีเมล</div>
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
        <div @click="toLoginPage()" class="text-indigo-12 text-subtitle1 cursor-pointer">
          <u>ย้อนกลับ</u>
        </div>
      </div>
    </div>
    <!-- -------------------------------------------dialog------------------------------------------ -->
    <!-- correct Email -->
    <q-dialog v-model="openCorrectDialogEmail">
      <q-card style="width:330px; height:160px">
        <div align="left" class="q-pa-md">
          <div class="row items-center">
            <div>
              <q-icon color="secondary" size="sm" name="far fa-check-circle" />
            </div>
            <div class="q-ml-sm text-subtitle1">
              <b>สำเร็จ</b>
            </div>
          </div>
          <div
            class="q-mt-sm text-subtitle1"
          >เราทำการส่งอีเมลสำหรับการตั้งค่ารหัสผ่านใหม่ไปยังอีเมลของคุณแล้ว</div>
          <div align="right">
            <div
              @click="confirmEmail()"
              class="text-subtitle1 text-indigo-12 cursor-pointer"
              label="ตกลง"
            >ตกลง</div>
          </div>
        </div>
      </q-card>
    </q-dialog>
    <!-- wrong Email -->
    <q-dialog v-model="openWrongDialogEmail">
      <q-card style="width:330px; height:160px">
        <div align="left" class="q-pa-md">
          <div class="row items-center">
            <div>
              <q-icon color="negative" size="sm" name="far fa-times-circle" />
            </div>
            <div class="q-ml-sm text-subtitle1">
              <b>ไม่พบอีเมลผู้ใช้ในระบบ</b>
            </div>
          </div>
          <div class="q-mt-md text-body2">อีเมลที่คุณใส่ไม่พบในระบบกรุณาลองอีกครั้ง</div>
          <div align="right">
            <div
              style="width: fit-content"
              class="q-mt-lg text-subtitle1 text-indigo-12 cursor-pointer"
              @click="openWrongDialogEmail = false"
            >ตกลง</div>
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
