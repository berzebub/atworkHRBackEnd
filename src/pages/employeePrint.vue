<template>
  <div align="center">
    <div class="paper-a4 q-pa-lg">
      <div align="center" class="text-subtitle1 q-mt-md">รายชื่อพนักงานในระบบ Winner @Hotel</div>
      <div align="center " class="text-body2 q-py-md">โรงแรมเกียรติรัชชา แผนกทำความสะอาด</div>
      <!-- ตาราง -->
      <div class="row q-mt-md bg-blue-10 text-white text-subtitle1 q-px-md q-py-sm">
        <div class="col-6" align="left">ชื่อ-นามสกุล</div>

        <div class="col-6" align="left">อีเมล</div>
      </div>
      <!-- เนื้อหา -->
      <div
        v-for="(item,index)  in data"
        :key="index"
        :class="index % 2 == 0 ? 'bg-white' : 'bg-grey-3'"
        class="row bg-white text-black text-subtitle1 q-px-md q-py-sm box-main"
      >
        <div class="col-6" align="left">{{ item.name }}</div>
        <div class="col-6" align="left">{{ item.email }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from "../router";

export default {
  data() {
    return {
      data: this.$route.params.data,
    };
  },

  mounted() {
    if (this.$route.params.data == undefined) {
      this.$router.go(-1);
    }
  },
};
</script>

<style>
.paper-a4 {
  background: #ffffff;
  width: 210mm;
  min-height: 297mm;
  max-height: fit-content;
  box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.3);
}

@media print {
  .paper-a4 {
    background: #ffffff;
    width: 210mm;
    height: 297mm;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  }
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
