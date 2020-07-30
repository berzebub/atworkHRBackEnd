<template>
  <div align="center">
    <div class="paper-a4 shadow-1">
      <div class="q-pa-md">
        <div align="center" class="text-subtitle1 q-mt-md">รายชื่อพนักงานในระบบ Winner @Hotel</div>
        <div align="center " class="text-body2 q-py-md">โรงแรมเกียรติรัชชา แผนกทำความสะอาด</div>
        <!-- ตาราง -->
        <div class="row q-mt-md bg-blue-10 text-white text-subtitle1 q-px-md q-py-sm" style>
          <div class="col-6 text-body2" align="left">ชื่อ-นามสกุล</div>

          <div class="col-6 text-body2" align="left">อีเมล</div>
        </div>
        <!-- เนื้อหา -->
        <div
          v-for="(item,index)  in employeeListShow"
          :key="index"
          :class="index % 2 == 0 ? 'bg-white' : 'bg-grey-3'"
          class="row bg-white text-black text-subtitle1 q-px-md q-py-sm box-main"
        >
          <div class="col-6 text-overline" align="left">{{ item.name }}</div>
          <div class="col-6 text-overline" align="left">{{ item.email }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from "../router";

export default {
  data() {
    return {
      employeeList: "",
      employeeListShow: ""
    };
  },
  methods: {
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
          this.employeeList = temp;

          this.filterEmployeeData();
        });
    },
    filterEmployeeData() {
      this.employeeListShow = this.employeeList.filter(
        x => x.departmentId == this.$route.params.departmentId
      );
      this.employeeListShow.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      });
    }
  },
  mounted() {
    this.loadEmployeeData();
  }
};
</script>

<style>
.paper-a4 {
  background: #ffffff;
  width: 210mm;
  min-height: 297mm;
  max-height: fit-content;
}
@page {
  margin: 0mm;
  width: 210mm;
  height: 297mm;
  /* size: landscape; portrait */
}
.box-main {
  border: 1px solid #e5e5e5;
}
</style>
