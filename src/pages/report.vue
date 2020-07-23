<template>
  <q-page>
    <div class="container q-pa-md">
      <div class="row q-pt-lg">
        <div class="q-pr-md" style="width:300px">
          <q-select outlined v-model="departmentSelect" :options="departmentoptions" dense></q-select>
        </div>
        <div class="q-pr-md" style="width:150px">
          <q-select outlined v-model="monthSelect" :options="monthOptions" dense></q-select>
        </div>
        <div class style="width:100px">
          <q-select outlined v-model="yearSelect" :options="yaerOptions" dense></q-select>
        </div>
        <div class="col" align="right">
          <q-btn class="q-mx-md" round color="secondary" icon="fas fa-file-download" />

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
import { db } from "../router";
export default {
  data() {
    return {
      departmentSelect: "",
      departmentoptions: [],
      monthSelect: "มกราคม",
      monthOptions: [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ],
      yearSelect: "2563",
      yaerOptions: [
        2563,
        2564,
        2565,
        2566,
        2567,
        2568,
        2569,
        2570,
        2571,
        2572,
        2573,
        2574,
      ],
      employeeData: "",
    };
  },
  methods: {
    loadDepartment() {
      db.collection("department")
        .where("hotelId", "==", this.hotelId)
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
            return a.name > b.name ? 1 : -1;
          });
          this.departmentoptions = temp;
          this.departmentSelect = this.departmentoptions[0];
          this.loadEmployeeData();
        });
    },
    loadEmployeeData() {
      db.collection("employee")
        .where("hotelId", "==", this.hotelId)
        .get()
        .then((doc) => {
          let temp = [];
          doc.forEach((element) => {
            temp.push({
              employeeId: element.id,
              ...element.data(),
            });
          });
          this.employeeData = temp;
        });
    },
  },
  mounted() {
    this.loadDepartment();
  },
};
</script>

<style lang="scss" scoped></style>
