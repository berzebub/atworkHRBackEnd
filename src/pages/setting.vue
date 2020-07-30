<template>
  <q-page>
    <div class="row">
      <div style="width:360px " class="shadow-1">
        <div class="q-py-sm bg-blue-10 text-white text-h6 row items-center shadow-5">
          <span class="q-ml-md">ตั้งค่า</span>
        </div>
        <div class="row" style="height:calc(100vh - 56px)">
          <div class="col-12">
            <div
              class="col-12 row items-center q-pa-md cursor-pointer relative-position"
              :class="isNameSetting == true ? 'bg-teal-1': null"
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
              :class="isPasswordSetting == true ? 'bg-teal-1': null"
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
              <q-input outlined dense v-model="userInfo.displayName" style="width:328px"></q-input>
            </div>
            <div class="row q-pt-lg">
              <div class="col-6 q-pr-sm" align="right">
                <q-btn
                  @click="cancelPassword()"
                  outline
                  color="cyan-8"
                  label="ยกเลิก"
                  style="width:120px"
                />
              </div>
              <div class="col-6 q-pl-sm">
                <q-btn
                  color="cyan-8"
                  label="ตกลง"
                  @click="confirmEditDisplayName()"
                  style="width:120px"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- password -->
        <div v-if="isPasswordSetting==true" class="row absolute-center">
          <div class="col-12 text-subtitle1" align="center">คุณต้องการตั้งค่ารหัสผ่านใหม่</div>
          <div class="col-12 text-subtitle1 q-pb-lg" align="center">{{ this.userInfo.email }}</div>

          <div class="col-6 q-pr-sm" align="right">
            <q-btn
              @click="cancelPassword()"
              outline
              color="cyan-8"
              label="ยกเลิก"
              style="width:120px"
            />
          </div>
          <div class="col-6 q-pl-sm" align="left">
            <q-btn color="cyan-8" label="ตกลง" @click="confirmResetPassword()" style="width:120px" />
          </div>
        </div>
      </div>

      <dialog-center
        :type="2"
        :name="'บันทึกข้อมูลเรียบร้อย'"
        v-if="isDialogSucess"
        @autoClose="dialogSucess"
      />
      <div>
        <q-dialog v-model="isResetPasswordDialog">
          <div class="bg-white row q-pa-lg" align="center" style="width:400px ">
            <div class="col-12">
              <q-icon color="primary" size="md" name="far fa-check-circle"></q-icon>
              <span class="text-h6 q-pl-sm">สำเร็จ</span>
            </div>
            <div class="col-12 text-subtitle1 q-pt-md">
              เราทำการส่งอีเมลสำหรับการตั้งค่ารหัสผ่านใหม่ไปยัง
              <br />
              "{{ this.userInfo.email }} "
            </div>
          </div>
        </q-dialog>
        <!-- dialog logout -->
        <q-dialog v-model="isDialogLogout" persistent>
          <div class="bg-white row q-pa-lg" align="center" style="width:400px ">
            <div class="col-12 q-pt-md">
              <q-icon color="cyan-8" name="fas fa-sign-out-alt" size="25px" />
              <span class="text-h6 q-pl-md">ออกจากระบบ</span>
            </div>
            <div class="col-12 text-subtitle1 q-pt-md">คุณต้องการออกจากระบบ</div>

            <div class="col-6 q-pr-sm q-pt-lg" align="right">
              <q-btn
                @click="logoutCancel()"
                v-close-popup
                outline
                color="cyan-8"
                label="ยกเลิก"
                style="width:120px"
              />
            </div>
            <div class="col-6 q-pl-sm q-pt-lg" align="left">
              <q-btn @click="logout()" color="cyan-8" label="ตกลง" style="width:120px" />
            </div>
          </div>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script>
import { auth, axios } from "../router";
import dialogCenter from "../components/dialogSetting";
export default {
  components: {
    dialogCenter
  },
  data() {
    return {
      name: "",
      isNameSetting: false,
      isPasswordSetting: false,
      isLogoutSetting: false,
      mainSetting: true,

      isResetPasswordDialog: false,
      authLogin: "",
      userInfo: "",
      isDialogSucess: false,
      isDialogLogout: false
    };
  },
  methods: {
    confirmResetPassword() {
      this.loadingShow();
      auth
        .sendPasswordResetEmail(this.userInfo.email)
        .then(() => {
          this.loadingHide();
          this.isResetPasswordDialog = true;
          setTimeout(() => {
            this.isResetPasswordDialog = false;
          }, 1300);
          console.log("FINISH");
        })
        .catch(error => {
          this.loadingHide();
          console.log(error);
        });
    },
    async confirmEditDisplayName() {
      this.loadingShow();
      let apiURL =
        "https://us-central1-atwork-dee11.cloudfunctions.net/atworkFunctions/user/updateDisplayName";
      let updateData = {
        uid: this.userInfo.uid,
        displayName: this.userInfo.displayName
      };
      let updateUserData = await axios.post(apiURL, updateData);
      if (updateUserData.data.code) {
        // ERROR UPDATE
        console.log(updateUserData);
        this.loadingHide();
        return;
      }
      this.loadingHide();
      this.isDialogSucess = true;
    },
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
    logout() {
      console.log("logout");
      this.logOut();
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

    getUser() {
      this.loadingShow();
      this.authLogin = auth.onAuthStateChanged(async user => {
        if (user) {
          this.userInfo = user;
          this.loadingHide();
        }
      });
    },
    cancelPassword() {
      this.isNameSetting = false;
      this.isPasswordSetting = false;
      this.isLogoutSetting = false;
      this.mainSetting = true;
    },
    dialogSucess() {
      this.isDialogSucess = false;
    },
    logoutCancel() {
      this.isDialogLogout = false;
    },
    logoutSetting() {
      this.isDialogLogout = true;
    }
  },

  mounted() {
    this.getUser();
  }
};
</script>

<style></style>
