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
        <div class="row bg-white text-black text-subtitle1 q-px-md q-py-sm">
          <div class="col-6 text-overline" align="left">Parichat lalati</div>
          <div class="col-6 text-overline" align="left">parichat@gmail.com</div>
        </div>
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
