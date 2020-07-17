<template>
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
        <div class="q-pr-md col-2">
          <q-select
            outlined
            v-model="monthSelect"
            :options="monthOptions"
            dense
            style="width:150px"
          ></q-select>
        </div>
        <div class="col-2">
          <q-select
            outlined
            v-model="monthSelect"
            :options="monthOptions"
            dense
            style="width:100px"
          ></q-select>
        </div>
        <div class="col" align="right">
          <q-btn class="q-mx-md" round color="secondary" icon="fas fa-file-download" />

          <q-btn round color="secondary" icon="fas fa-print" />
        </div>
      </div>
      <!-- ตาราง -->

      <div class="q-pt-lg">
        <q-table :data="dataReport" :columns="columnsReport" row-key="name" hide-bottom></q-table>
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
      monthOptions: [],
      dataReport: [
        {
          name: "Parichat Klayklow",
          progress: "50%",
          star: "70%"
        }
      ],
      columnsReport: [
        {
          name: "name",
          align: "letf",
          label: "ชื่อ - นามสกุล",
          sortable: "true",
          field: "name"
        },
        {
          name: "progress",
          align: "center",
          label: "ความก้าวหน้า",
          sortable: "true",
          field: "progress"
        },
        {
          name: "star",
          align: "center",
          label: "ดาว",
          sortable: "true",
          field: "star"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>