<template>
  <q-page>
    <div class="container">
      <div class="row q-pt-lg">
        <div class="q-pr-md " style="width:300px">
          <q-select
            outlined
            v-model="departmentSelect"
            :options="departmentoptions"
            dense
          ></q-select>
        </div>
        <div class="q-pr-md " style="width:150px">
          <q-select
            outlined
            v-model="monthSelect"
            :options="monthOptions"
            dense
          ></q-select>
        </div>
        <div class="" style="width:100px">
          <q-select
            outlined
            v-model="monthSelect"
            :options="monthOptions"
            dense
          ></q-select>
        </div>
        <div class="col" align="right">
          <q-btn
            class="q-mx-md"
            round
            color="secondary"
            icon="fas fa-file-download"
          />

          <q-btn round color="secondary" icon="fas fa-print" />
        </div>
      </div>
      <!-- ตาราง -->
      <!-- ตาราง -->
      <div
        class="row q-mt-md bg-blue-10 text-white text-subtitle1 q-px-md q-py-sm"
        style="border-radius: 10px 10px 0px 0px"
      >
        <div class="col-5">
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
        <div class="col-5">Parichat lalati</div>
        <div class="col-5" align="center">10%</div>
        <div class="col-2" align="center">20%</div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      departmentSelect: "",
      departmentoptions: [],
      monthSelect: "",
      monthOptions: []
    };
  }
};
</script>

<style lang="scss" scoped></style>
