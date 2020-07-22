<template>
  <q-page>
    <div class="row">
      <div style="width:360px " class="shadow-1">
        <div class="bg-blue-10 text-white text-h6 row items-center shadow-5" style="height:56px">
          <span class="q-ml-lg">ตั้งค่า</span>
        </div>
        <div class="row" style="height:calc(100vh - 56px)">
          <div class="col-12">
            <div
              class="col-12 row items-center q-pa-md cursor-pointer relative-position"
              @click="nameSetting()"
              v-ripple
            >
              <div class="text-subtitle1 col-10">ชื่อ - นามสกุล</div>
              <div class="col" align="right">
                <q-icon name="fas fa-chevron-right"></q-icon>
              </div>
            </div>
            <q-separator />

            <div
              class="col-12 row items-center q-pa-md cursor-pointer relative-position"
              v-ripple
              @click="passwordSetting()"
            >
              <div class="text-subtitle1 col-10">รหัสผ่าน</div>
              <div class="col" align="right">
                <q-icon name="fas fa-chevron-right"></q-icon>
              </div>
            </div>
            <q-separator />
          </div>
          <div class="col-12 self-end">
            <q-separator />
            <div
              class="col-12 row items-center q-pa-md cursor-pointer relative-position"
              v-ripple
              @click="logoutSetting()"
            >
              <q-icon size="md" name="fas fa-sign-out-alt"></q-icon>
              <span class="text-subtitle1 q-pl-sm">ออกจากระบบ</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col relative-position">
        <!-- mainSetting -->
        <div v-if="mainSetting == true ">
          <div class="row absolute-center">
            <div class="col">
              <q-icon size="md" name="fas fa-arrow-left"></q-icon>
              <span class="text-subtitle1 q-pl-md">กรุณาเลือกเมนุการตั้งค่า</span>
            </div>
          </div>
        </div>
        <!-- nameSetting -->
        <div align="center" v-if="isNameSetting == true">
          <div style="width:328px ">
            <div class="text-h6 q-py-lg" align="center">แก้ไข ชื่อ นามสกุล</div>
            <div class="text-subtitle1" align="left">ชื่อ นามสกุล</div>
            <div>
              <q-input outlined dense v-model="name" style="width:328px"></q-input>
            </div>
            <div class="row q-pt-lg">
              <div class="col-6 q-pr-sm" align="right">
                <q-btn outline color="secondary" label="ยกเลิก" style="width:120px" />
              </div>
              <div class="col-6 q-pl-sm">
                <q-btn color="secondary" label="ตกลง" style="width:120px" />
              </div>
            </div>
          </div>
        </div>
        <!-- password -->
        <div v-if="isPasswordSetting==true" class="row absolute-center">
          <div class="col-12 text-subtitle1" align="center">คุณต้องการตั้งค่ารหัสผ่านใหม่</div>
          <div class="col-12 text-subtitle1 q-pb-lg" align="center">xxxxxxxxxxx</div>

          <div class="col-6 q-pr-sm" align="right">
            <q-btn outline color="secondary" label="ยกเลิก" style="width:120px" />
          </div>
          <div class="col-6 q-pl-sm" align="left">
            <q-btn color="secondary" label="ตกลง" style="width:120px" />
          </div>
        </div>
        <!-- log out -->
        <div class="row absolute-center" v-if="isLogoutSetting == true">
          <div class="text-h6 col-12" align="center">ออกจากระบบ</div>
          <div class="q-pt-md col-12" align="center">
            <q-btn
              @click="logoutOnly()"
              dense
              class="text-subtitle1"
              style="width:190px"
              label="เฉพาะอุปกรณ์ปัจจุบัน"
              color="secondary"
            ></q-btn>
          </div>
          <div class="q-pt-lg col-12" align="center">
            <q-btn
              dense
              outline
              class="text-subtitle1"
              style="width:190px"
              label="อุปกรณ์ทั้งหมด"
              color="secondary"
            ></q-btn>
          </div>
          <div class="q-pt-lg col-12" align="center">
            <q-btn
              @click="cencelLogout()"
              dense
              outline
              class="text-subtitle1"
              style="width:190px"
              label="ยกเลิก"
              color="secondary"
            ></q-btn>
          </div>
        </div>
      </div>
      <!-- dialog เปลี่ยนชื่อสำเร็จ-->
      <div>
        <q-dialog v-model="isResetNameDialog">
          <div class="bg-white row q-pa-lg" align="center" style="width:400px ">
            <div class="col-12">
              <q-icon color="primary" size="md" name="far fa-check-circle"></q-icon>
              <span class="text-h6 q-pl-sm">สำเร็จ</span>
            </div>
            <div class="col-12 text-subtitle1 q-pt-sm">บันทึกข้อมูลเรียบร้อย</div>

            <div class="col-12 q-pl-sm q-pt-lg" align="center">
              <q-btn @click="ConfirmName()" color="secondary" label="ตกลง" style="width:120px" />
            </div>
          </div>
        </q-dialog>
      </div>
      <div>
        <q-dialog v-model="isResetPasswordDialog">
          <div class="bg-white row q-pa-lg" align="center" style="width:400px ">
            <div class="col-12">
              <q-icon color="primary" size="md" name="far fa-check-circle"></q-icon>
              <span class="text-h6 q-pl-sm">สำเร็จ</span>
            </div>
            <div class="col-12 text-subtitle1 q-pt-md">
              เราทำการส่งอีเมลสำหรับการตั้งค่ารหัสผ่านใหม่ไปยัง
              <br />"xxxxxxxxxxxxxxxxxx "
            </div>

            <div class="col-12 q-pl-sm q-pt-lg" align="center">
              <q-btn @click="ConfirmPassword()" color="secondary" label="ตกลง" style="width:120px" />
            </div>
          </div>
        </q-dialog>
      </div>
      <!-- <div class="absolute-center cursor-pointer">
      <q-btn @click="$router.push('/')" label=" TEST LOGOUT" color="red" size="50px" />
      </div>-->
    </div>
  </q-page>
</template>

<script>
import { auth } from "../router";
export default {
  data() {
    return {
      name: "",
      isNameSetting: false,
      isPasswordSetting: false,
      isLogoutSetting: false,
      mainSetting: true,
      isResetNameDialog: false,
      isResetPasswordDialog: false,
    };
  },
  methods: {
    nameSetting() {
      console.log("name");
      this.isNameSetting = true;
      this.isPasswordSetting = false;
      this.isLogoutSetting = false;
      this.mainSetting = false;
    },
    passwordSetting() {
      console.log("password");
      this.isNameSetting = false;
      this.isPasswordSetting = true;
      this.isLogoutSetting = false;
      this.mainSetting = false;
    },
    logoutSetting() {
      console.log("logout");
      this.logOut();
      // this.isNameSetting = false;
      // this.isPasswordSetting = false;
      // this.isLogoutSetting = true;
      // this.mainSetting = false;
    },
    cencelLogout() {
      this.isNameSetting = false;
      this.isPasswordSetting = false;
      this.isLogoutSetting = false;
      this.mainSetting = true;
    },
    logoutOnly() {
      this.logOut();
    },
    ConfirmName() {
      this.isResetNameDialog = false;
    },
    ConfirmPassword() {
      this.isResetPasswordDialog = false;
    },
  },
};
</script>

<style></style>
