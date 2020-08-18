<template>
  <q-page>
    <div class="container q-pa-md">
      <div class="row">
        <div class="q-pr-md col-4">
          <q-select
            outlined
            v-model="departmentSelect"
            :options="departmentoptions"
            dense
            style="width:300px"
            @input="filterEmployeeData(),search=''"
          ></q-select>
        </div>
        <!-- ค้นหา -->
        <div class="col" align="right">
          <q-input
            label="ค้นหา"
            dense
            v-model="search"
            type="search"
            style="width:300px"
            @keyup="filterData()"
            filled
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <div class="col-1" align="right">
          <q-btn @click="goToPrint()" round color="cyan-8" icon="fas fa-print" />
        </div>
      </div>
      <!-- ตาราง -->
      <div
        class="row q-mt-lg bg-blue-10 text-white text-subtitle1 q-px-md q-py-sm"
        style="border-radius: 10px 10px 0px 0px"
      >
        <div class="col q-pl-md">รหัสผู้ใช้งาน</div>
        <div class="col q-pl-md">
          ชื่อ-นามสกุล
          <q-icon @click="sortName()" class="cursor-pointer" name="fas fa-sort"></q-icon>
        </div>
<<<<<<< HEAD
        <div class="col-5" align="center">รหัสผ่าน</div>
=======
        <div class="col-5" align="center">
          อีเมล
          <q-icon @click="sortEmail()" class="cursor-pointer" name="fas fa-sort"></q-icon>
        </div>
>>>>>>> master
        <div class="col-2" align="right">ตั้งค่ารหัสผ่านใหม่</div>
      </div>
      <!-- เนื้อหา -->
      <q-card class="bg-white text-black text-subtitle1 q-py-sm">
        <div
          class="row q-pa-sm"
          v-for="(item,index) in employeeListShow"
          :key="index"
          :class="index % 2 == 0 ? 'bg-white' : 'bg-grey-3'"
        >
          <div class="col q-pl-md">{{ item.id }}</div>
          <div class="col q-pl-md">{{ item.name }}</div>
          <div class="col-5" align="center">{{ item.password }}</div>
          <div class="col-2" align="center">
            <q-btn
              @click="resetPassword(item)"
              round
              color="cyan-8"
              icon="fas fa-edit"
              size="10px"
            />
          </div>
        </div>
      </q-card>
      <!-- dialog reset password-->
      <div>
        <!-- <q-dialog persistent v-model="isResetPasswordDialog">
          <div class="bg-white row q-pa-lg" align="center" style="width:400px ">
            <div class="col-12 q-pt-md">
              <q-btn outline round color="blue-10" icon="fas fa-trash-alt" size="12px" />
              <span class="text-h6 q-pl-md">ยืนยันการตั้งค่ารหัสผ่านใหม่</span>
            </div>
            <div
              class="col-12 text-subtitle1 q-pt-md"
            >คุณต้องการตั้งค่ารหัสผ่านใหม่ "{{this.nameEmployee}}"</div>

            <div class="col-6 q-pr-sm q-pt-lg" align="right">
              <q-btn
                @click="cancelResetPassword()"
                outline
                color="secondary"
                label="ยกเลิก"
                style="width:120px"
              />
            </div>
            <div class="col-6 q-pl-sm q-pt-lg" align="left">
              <q-btn
                @click="confirmResetPassword()"
                color="secondary"
                label="ยืนยัน"
                style="width:120px"
              />
            </div>
          </div>
        </q-dialog>-->
      </div>
      <!-- dialog reset password II -->
      <div>
        <q-dialog persistent v-model="isResetPasswordDialog">
          <q-card style="max-width:400px;width:100%">
            <q-card-section align="center" class="bg-blue-10 text-white">
              <div class="text-h6">ตั้งค่ารหัสผ่านใหม่</div>
            </q-card-section>

            <div class="q-pa-md text-subtitle1">
              {{nameEmployee}} : {{departmentSelect.label}}
              <q-separator class="q-my-sm" />
              <div>
                <div>
                  รหัสผ่านปัจจุบัน
                  <q-input
                    ref="pwd"
                    dense
                    v-model="password"
                    outlined
                    :type="isPwd ? 'password' : ''"
                    :rules="[ val => !!val || '']"
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>

                  <div v-show="isEroorPassword">
                    <q-icon
                      size="22px"
                      name="fas fa-exclamation-circle"
                      dense
                      color="negative"
                      flat
                    ></q-icon>
                    <span class="text-body2 text-negative q-pl-sm">กรุณาใส่รหัสผ่านให้ถูกต้อง</span>
                  </div>
                </div>
                <div>
                  รหัสผ่านใหม่
                  <span>ตัวเลข 4 หลัก</span>
                  <q-input
                    ref="newPwd"
                    dense
                    mask="####"
                    v-model="newPassword"
                    outlined
                    :type="isPwd ? 'password' : ''"
                    :rules="[ val => !!val || '']"
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                </div>พิมพ์รหัสผ่านใหม่อีกครั้ง
                <q-input
                  ref="newPwdAgain"
                  dense
                  v-model="newPasswordAgain"
                  outlined
                  mask="####"
                  :type="isPwd ? 'password' : ''"
                  :rules="[ val => !!val || '']"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
                <div v-show="isEroorNewPassword">
                  <q-icon size="22px" name="fas fa-exclamation-circle" dense color="negative" flat></q-icon>
                  <span
                    class="text-body2 text-negative q-pl-sm"
                  >กรุณาใส่รหัสผ่านใหม่ให้ตรงกัน ทั้ง 2 ช่อง</span>
                </div>
              </div>
            </div>

            <q-card-section class="q-gutter-md q-mb-md" align="center">
              <q-btn style="width:120px" outline v-close-popup color="cyan-8" label="ยกเลิก" />
              <q-btn
                style="width:120px"
                color="cyan-8"
                label="ยืนยัน"
                @click="confirmResetPassword()"
              />
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>

      <dialog-center
        :type="2"
        :name="'เราทำการส่งอีเมลสำหรับการตั้งค่ารหัสผ่านใหม่ไปยังอีเมลของพนักงานแล้ว'"
        v-if="isDialogSucess"
        @autoClose="dialogSucess"
      />
    </div>
  </q-page>
</template>

<script>
import { db, auth } from "../router";
import dialogCenter from "../components/dialogSetting";

export default {
  components: {
    dialogCenter,
  },
  data() {
    return {
      isPwd: true,
      isEroorPassword: false,
      isEroorNewPassword: false,
      password: "",
      newPassword: "",
      newPasswordAgain: "",
      departmentSelect: "",
      departmentoptions: [],
      search: "",
      isResetPasswordDialog: true,

      employeeData: "",
      employeeListShow: "",
      currentEmployeeActive: "",
      nameEmployee: "",
      isDialogSucess: false,
      isSort: true,
    };
  },
  methods: {
    filterData() {
      if (this.search == "") {
        this.filterEmployeeData();
      } else {
        this.employeeListShow = this.employeeData.filter(
          (x) =>
            (x.name.startsWith(this.search) ||
              x.email.startsWith(this.search)) &&
            x.departmentId == this.departmentSelect.value
        );
      }
    },
    goToPrint() {
      this.$router.push({
        name: "employeePrint",
        params: {
          data: this.employeeListShow,
        },
      });
    },
    loadDepartment() {
      let hotelId = this.$q.localStorage.getItem("hotelId");
      db.collection("department")
        .where("hotelId", "==", hotelId)
        .get()
        .then((doc) => {
          let temp = [];
          doc.forEach((element) => {
            temp.push({
              value: element.id,
              label: element.data().name,
            });
          });
          temp.sort((a, b) => {
            return a.label > b.label ? 1 : -1;
          });
          this.departmentoptions = temp;
          this.departmentSelect = this.departmentoptions[0];
          this.loadEmployeeData();
        });
    },
    resetPassword(item) {
      console.log(item);
      this.nameEmployee = item.name;
      this.isResetPasswordDialog = true;
      this.currentEmployeeActive = item;
    },
    cancelResetPassword() {
      this.isResetPasswordDialog = false;
    },

    confirmResetPassword() {
<<<<<<< HEAD
      this.$refs.pwd.validate();
      this.$refs.newPwd.validate();
      this.$refs.newPwdAgain.validate();
      if (
        this.$refs.pwd.hasError ||
        this.$refs.newPwd.hasError ||
        this.$refs.newPwdAgain.hasError
      ) {
        return;
      } else {
        console.log("5555");
        db.collection("employee")
          .where("password", "==", this.password)
          .get()
          .then((doc) => {
            if (doc.size > 0) {
              if (this.newPassword == this.newPasswordAgain) {
                db.collection("employee")
                  .doc("new-format")
                  .set(this.newPassword);
                console.log("pass");
              } else {
                this.isEroorNewPassword = true;
                console.log("รหัสผ่านใหม่ไม่ตรงกัน");
              }
            } else {
              this.isEroorPassword = true;
              console.log("nopass");
            }
          });
      }

      return;
      // this.isResetPasswordDialog = false;
      // auth
      //   .sendPasswordResetEmail(this.currentEmployeeActive.email)
      //   .then(function () {
      //     this.isDialogSucess = true;
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
      // this.isDialogSucess = true;
=======
      this.isResetPasswordDialog = false;
      auth
        .sendPasswordResetEmail(this.currentEmployeeActive.email)
        .then(function () {
          this.isDialogSucess = true;
        })
        .catch(function (error) {
          console.log(error);
        });
      this.isDialogSucess = true;
>>>>>>> master
    },
    loadEmployeeData() {
      let hotelId = this.$q.localStorage.getItem("hotelId");
      db.collection("employee")
        .where("hotelId", "==", hotelId)
        .get()
        .then((doc) => {
          let temp = [];
<<<<<<< HEAD
=======

>>>>>>> master
          doc.forEach((element) => {
            temp.push({ ...element.data(), employeeId: element.id });
          });

          temp.sort((a, b) => {
            return a.name > b.name ? 1 : -1;
          });

          this.employeeData = temp;

          this.filterEmployeeData();
        });
    },
    filterEmployeeData() {
      this.employeeListShow = this.employeeData.filter(
        (x) => x.departmentId == this.departmentSelect.value
      );
    },
    sortName() {
      this.isSort = !this.isSort;
      this.employeeListShow.sort((a, b) => {
        if (this.isSort == true) {
          return a.name > b.name ? 1 : -1;
        } else {
          return a.name < b.name ? 1 : -1;
        }
      });
    },
    // sortEmail() {
    //   this.isSort = !this.isSort;
    //   this.employeeListShow.sort((a, b) => {
    //     if (this.isSort == true) {
    //       return a.email > b.email ? 1 : -1;
    //     } else {
    //       return a.email < b.email ? 1 : -1;
    //     }
    //   });
    // },
    dialogSucess() {
      console.log("555");
      this.isDialogSucess = false;
    },
  },
  mounted() {
    this.loadDepartment();
  },
};
</script>

<style lang="scss" scoped></style>
