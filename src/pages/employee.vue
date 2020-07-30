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
        <div class="col-5">
          ชื่อ-นามสกุล
          <q-icon @click="sortName()" name="fas fa-sort"></q-icon>
        </div>
        <div class="col-5" align="center">
          อีเมล
          <q-icon name="fas fa-sort"></q-icon>
        </div>
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
          <div class="col-5">{{ item.name }}</div>
          <div class="col-5" align="center">{{ item.email }}</div>
          <div class="col-2" align="center">
            <q-btn
              @click="resetPassword(item)"
              round
              color="cyan-8"
              icon="fas fa-redo"
              size="10px"
            />
          </div>
        </div>
      </q-card>
      <!-- dialog reset password-->
      <div>
        <q-dialog persistent v-model="isResetPasswordDialog">
          <div class="bg-white row q-pa-lg" align="center" style="width:400px ">
            <div class="col-12 q-pt-md">
              <q-btn outline round color="blue-10" icon="fas fa-trash-alt" size="12px" />
              <span class="text-h6 q-pl-md">ยืนยันการตั้งค่ารหัสผ่านใหม่</span>
            </div>
            <div class="col-12 text-subtitle1 q-pt-md">คุณต้องการตั้งค่ารหัสผ่านใหม่ "xxxxxxxxxxxxx"</div>

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
        </q-dialog>
      </div>
      <!-- dialog saved-->
      <div>
        <q-dialog v-model="isSavedDialog">
          <div class="bg-white row q-pa-lg q-py-xl" align="center" style="width:400px ">
            <div class="col-12">
              <q-icon color="blue-10" size="md" name="far fa-check-circle"></q-icon>
              <span class="text-h6 q-pl-sm">สำเร็จ</span>
            </div>
            <div class="col-12 text-subtitle1 q-pt-md">
              เราทำการส่งอีเมลสำหรับการตั้งค่ารหัสผ่าน
              <br />ใหม่ไปยังอีเมลของพนักงานแล้ว
            </div>
          </div>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script>
import { db, auth } from "../router";

export default {
  data() {
    return {
      departmentSelect: "",
      departmentoptions: [],
      search: "",
      isResetPasswordDialog: false,
      isSavedDialog: false,
      employeeData: "",
      employeeListShow: "",
      currentEmployeeActive: ""
    };
  },
  methods: {
    filterData() {
      if (this.search == "") {
        this.filterEmployeeData();
      } else {
        this.employeeListShow = this.employeeData.filter(
          x =>
            (x.name.startsWith(this.search) ||
              x.email.startsWith(this.search)) &&
            x.departmentId == this.departmentSelect.value
        );
      }
    },
    goToPrint() {
      this.$router.push("/employeePrint");
    },
    loadDepartment() {
      let hotelId = this.$q.localStorage.getItem("hotelId");
      db.collection("department")
        .where("hotelId", "==", hotelId)
        .get()
        .then(doc => {
          let temp = [];
          doc.forEach(element => {
            temp.push({
              value: element.id,
              label: element.data().name
            });
          });
          temp.sort((a, b) => {
            return a.name > b.name ? 1 : -1;
          });
          this.departmentoptions = temp;
          this.departmentSelect = this.departmentoptions[0];
          this.loadEmployeeData();
        });
    },
    resetPassword(item) {
      this.isResetPasswordDialog = true;
      this.currentEmployeeActive = item;
    },
    cancelResetPassword() {
      this.isResetPasswordDialog = false;
    },

    confirmResetPassword() {
      this.isResetPasswordDialog = false;
      auth
        .sendPasswordResetEmail(this.currentEmployeeActive.email)
        .then(function() {
          this.isSavedDialog = true;
        })
        .catch(function(error) {
          console.log(error);
        });

      this.isSavedDialog = true;
    },
    loadEmployeeData() {
      let hotelId = this.$q.localStorage.getItem("hotelId");
      db.collection("employee")
        .where("hotelId", "==", hotelId)
        .get()
        .then(doc => {
          let temp = [];
          doc.forEach(element => {
            temp.push({ ...element.data(), employeeId: element.id });
          });
          this.employeeData = temp;
          this.filterEmployeeData();
        });
    },
    filterEmployeeData() {
      this.employeeListShow = this.employeeData.filter(
        x => x.departmentId == this.departmentSelect.value
      );
    },
    sortName() {
      this.employeeListShow.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      });
    }
  },
  mounted() {
    this.loadDepartment();
  }
};
</script>

<style lang="scss" scoped></style>
