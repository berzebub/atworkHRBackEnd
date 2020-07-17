<template>
<<<<<<< Updated upstream
  <div>employee</div>
=======
  <q-page>
    <div class="container">
      <div class="row">
        <div class="q-pr-md col-4">
          <q-select
            outlined
            v-model="departmentSelect"
            :options="departmentoptions"
            dense
            style="width:300px"
          ></q-select>
        </div>
        <!-- ค้นหา -->
        <q-input
          label="ค้นหา"
          dense
          v-model="search"
          filled
          outlined
          type="search"
          style="width:300px"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <div class="col" align="right">
          <q-btn round color="secondary" icon="fas fa-print" />
        </div>
      </div>
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
          อีเมล
          <i class="fas fa-sort"></i>
        </div>
        <div class="col-2" align="right">
          ตั้งค่ารหัสผ่านใหม่
          <i class="fas fa-sort"></i>
        </div>
      </div>
      <!-- เนื้อหา -->
      <div class="row bg-white text-black text-subtitle1 q-px-md q-py-sm">
        <div class="col-5">Parichat lalati</div>
        <div class="col-5" align="center">parichat@gmail.com</div>
        <div class="col-2" align="center">
          <q-btn round color="secondary" icon="fas fa-redo" size="10px" />
        </div>
      </div>
    </div>
  </q-page>
>>>>>>> Stashed changes
</template>

<script>
export default {
  data() {
    return {
      departmentSelect: "",
      departmentoptions: [],
      search: ""
    };
  }
};
</script>

<style lang="scss" scoped>
</style>