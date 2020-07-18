<template>
  <div align="center">
    <div class="paper-a4  q-pa-lg  shadow-1">
      <div align="center" class="text-subtitle1">
        รายงานผลการเรียน Winner @Hotel
      </div>
      <div align="center" class="text-subtitle1">
        โรงแรมเกียรติรัชชา แผนกทำความสะอาด
      </div>
      <div align="center" class="text-subtitle1">
        ประจำเดือนมกราคม พ.ศ. 2563
      </div>
      <!-- ตาราง -->
      <div
        class="row q-mt-md bg-blue-10 text-white text-subtitle1 q-px-md q-py-sm"
      >
        <div class="col-5" align="left">
          ชื่อ-นามสกุล
          <i class="fas fa-sort"></i>
        </div>
        <div class="col-5" align="center">
          ความก้าวหน้า
          <i class="fas fa-sort"></i>
        </div>
        <div class="col-2" align="center">
          ดาว
          <i class="fas fa-sort"></i>
        </div>
      </div>
      <!-- เนื้อหา -->
      <div class="row bg-white text-black text-subtitle1 q-px-md q-py-sm">
        <div class="col-5" align="left">Parichat lalati</div>
        <div class="col-5" align="center">10%</div>
        <div class="col-2" align="center">20%</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
</style>
