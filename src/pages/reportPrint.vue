<template>
  <div align="center">
    <div class="paper-a4 q-pa-lg">
      <div align="center" class="text-subtitle1">รายงานผลการเรียน Winner @Hotel</div>
      <div align="center" class="text-subtitle1">โรงแรมเกียรติรัชชา แผนกทำความสะอาด</div>
      <div align="center" class="text-subtitle1">ประจำเดือนมกราคม พ.ศ. 2563</div>
      <!-- ตาราง -->
      <div class="row q-mt-md bg-blue-10 text-white text-subtitle1 q-px-md q-py-sm">
        <div class="col-5" align="left">ชื่อ-นามสกุล</div>
        <div class="col-5" align="center">ความก้าวหน้า</div>
        <div class="col-2" align="center">ดาว</div>
      </div>
      <!-- เนื้อหา -->
      <div
        class="row bg-white text-black text-subtitle1 q-px-md q-py-sm border"
        v-for="(item,index) in data"
        :key="index"
      >
        <div class="col-5" align="left">{{item.name}}</div>
        <div class="col-5" align="center">{{item.progressValue}}%</div>
        <div class="col-2" align="center">{{item.totalStar}}%</div>
      </div>
    </div>
  </div>
</template>

<script>
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
.border {
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  border-left: 1px solid rgba(0, 0, 0, 0.5);
  border-right: 1px solid rgba(0, 0, 0, 0.5);
}
.paper-a4 {
  background: #ffffff;
  width: 210mm;
  min-height: 297mm;
  max-height: fit-content;
  box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.3);
}

@media print {
  .paper-a4 {
    background: transparent;
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
</style>
