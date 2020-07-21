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
      <!-- <div class="absolute-center cursor-pointer">
      <q-btn @click="$router.push('/')" label=" TEST LOGOUT" color="red" size="50px" />
      </div>-->
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      isNameSetting: false,
      isPasswordSetting: false,
      isLogoutSetting: false,
      mainSetting: true
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
      this.isNameSetting = false;
      this.isPasswordSetting = false;
      this.isLogoutSetting = true;
      this.mainSetting = false;
    },
    cencelLogout() {
      this.isNameSetting = false;
      this.isPasswordSetting = false;
      this.isLogoutSetting = false;
      this.mainSetting = true;
    }
  }
};
</script>

<style></style>
