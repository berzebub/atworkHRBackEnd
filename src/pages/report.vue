<template>
  <q-page>
    <div class="container q-pa-md">
      <div class="row">
        <div class="q-pr-md" style="width:300px">
          <q-select
            outlined
            v-model="departmentSelect"
            @input="filterDataList"
            :options="departmentoptions"
            dense
          ></q-select>
        </div>
        <div class="q-pr-md" style="width:150px">
          <q-select
            outlined
            v-model="monthSelect"
            @input="filterDataList"
            :options="monthOptions"
            emit-value
            map-options
            dense
          ></q-select>
        </div>
        <div class style="width:100px">
          <q-select
            outlined
            v-model="yearSelect"
            @input="filterDataList"
            :options="yaerOptions"
            dense
          ></q-select>
        </div>
        <div class="col" align="right">
          <q-btn class="q-mx-md" round color="cyan-8" icon="fas fa-file-download" />

          <q-btn round color="cyan-8" icon="fas fa-print" @click="reportPrint()" />
        </div>
      </div>

      <!-- ตาราง -->
      <div
        class="row q-mt-md bg-blue-10 text-white text-subtitle1 q-px-md q-py-sm"
        style="border-radius: 10px 10px 0px 0px"
      >
        <div class="col-5">
          ชื่อ-นามสกุล
          <i class="fas fa-sort cursor-pointer" @click="sortData('name')"></i>
        </div>
        <div class="col-5" align="center">
          ความก้าวหน้า
          <i class="fas fa-sort cursor-pointer" @click="sortData('progress')"></i>
        </div>
        <div class="col-2" align="center">
          ดาว
          <i class="fas fa-sort cursor-pointer" @click="sortData('star')"></i>
        </div>
      </div>

      <!-- เนื้อหา -->
      <div
        class="row bg-white text-black text-subtitle1 q-px-md q-py-sm border"
        v-for="(item,index) in showEmployeeList"
        :key="index"
      >
        <div class="col-5">{{item.name}}</div>
        <div class="col-5" align="center">{{item.progressValue > 100 ? '100' : item.progressValue}}%</div>
        <div class="col-2" align="center">{{item.totalStar > 100 ? '100' : item.totalStar}}%</div>
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
      monthSelect: 1,
      monthOptions: [
        { label: "มกราคม", value: 1 },
        { label: "กุมภาพันธ์", value: 2 },
        { label: "มีนาคม", value: 3 },
        { label: "เมษายน", value: 4 },
        { label: "พฤษภาคม", value: 5 },
        { label: "มิถุนายน", value: 6 },
        { label: "กรกฎาคม", value: 7 },
        { label: "สิงหาคม", value: 8 },
        { label: "กันยายน", value: 9 },
        { label: "ตุลาคม", value: 10 },
        { label: "พฤศจิกายน", value: 11 },
        { label: "ธันวาคม", value: 12 },
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
      employeeList: [],
      showEmployeeList: [],

      kpiList: [],
      whereKpiList: [],
      practiceLogList: [],
      wherePracticeLogList: [],

      isSort: false,
    };
  },
  methods: {
    sortData(type) {
      this.isSort = !this.isSort;

      this.showEmployeeList.sort((a, b) => {
        let mathData = "";

        if (type == "name") {
          return this.isSort
            ? a.name > b.name
              ? 1
              : -1
            : a.name < b.name
            ? 1
            : -1;
        } else if (type == "progress") {
          return this.isSort
            ? a.progressValue - b.progressValue
            : b.progressValue - a.progressValue;
        } else if (type == "star") {
          return this.isSort
            ? a.totalStar - b.totalStar
            : b.totalStar - a.totalStar;
        }
      });
    },
    filterDataList() {
      this.showEmployeeList = this.employeeList.filter(
        (x) => x.departmentId == this.departmentSelect.value
      );

      this.whereKpiList = this.kpiList.filter((x) => {
        return x.month == this.monthSelect && x.year == this.yearSelect;
      });

      this.wherePracticeLogList = this.practiceLogList.filter((x) => {
        return x.month == this.monthSelect && x.year == this.yearSelect;
      });

      this.progressValue();
    },

    progressValue() {
      if (this.kpiList.length) {
        this.showEmployeeList.map((x) => {
          let sumScore = 0;
          let numOfPractice = 0;
          let numOfStar = 0;
          let totalPractice = 0;
          let totalStar = 0;

          let getKpi = this.whereKpiList.filter((xx) => xx.employeeId == x.id);
          let kpiLevelId = getKpi[0].levelId;

          if (getKpi.length) {
            numOfPractice = Number(getKpi[0].numOfPractice);
            numOfStar = Number(getKpi[0].numOfStar);
          }

          let getPracticeLog = this.wherePracticeLogList.filter(
            (xxx) => xxx.employeeId == x.id && xxx.levelid == kpiLevelId
          );

          if (getPracticeLog.length) {
            totalPractice = Number(getPracticeLog.length);

            let sumStar = 0;

            getPracticeLog.map((x) => {
              let sumval = Math.round((x.correct / x.totalQuestion) * 100);

              if (sumval == 100) {
                sumStar += 3;
              } else if (sumval >= 75) {
                sumStar += 2;
              } else if (sumval >= 50) {
                sumStar += 1;
              }
            });

            totalStar = Math.round((sumStar / numOfStar) * 100);
          }

          if (totalPractice && numOfPractice) {
            sumScore = Math.round((totalPractice / numOfPractice) * 100);
          }

          x.progressValue = sumScore;
          x.totalStar = totalStar;
        });
      }
    },

    loadDepartment() {
      this.loadingShow();

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
            return a.label > b.label ? 1 : -1;
          });

          this.departmentoptions = temp;
          this.departmentSelect = this.departmentoptions[0];

          this.loadKpiLog();
        });
    },
    loadKpiLog() {
      db.collection("kpiLog")
        .where("hotelId", "==", this.hotelId)
        .get()
        .then((doc) => {
          let temp = [];

          doc.forEach((result) => {
            let dataFinal = {
              id: result.id,
              ...result.data(),
            };

            temp.push(dataFinal);
          });

          this.kpiList = temp;

          this.whereKpiList = temp.filter((x) => {
            return x.month == this.monthSelect && x.year == this.yearSelect;
          });

          this.loadPracticeLog();
        });
    },
    loadPracticeLog() {
      db.collection("practice_log")
        .where("hotelId", "==", this.hotelId)
        .get()
        .then((doc) => {
          let temp = [];

          doc.forEach((result) => {
            let dataFinal = {
              id: result.id,
              ...result.data(),
            };

            temp.push(dataFinal);
          });

          this.practiceLogList = temp;

          this.wherePracticeLogList = temp.filter((x) => {
            return x.month == this.monthSelect && x.year == this.yearSelect;
          });

          this.loadEmployeeData();
        });
    },
    loadEmployeeData() {
      db.collection("employee")
        .where("hotelId", "==", this.hotelId)
        .get()
        .then((doc) => {
          let temp = [];
          let tempPractice = [];

          doc.forEach((result) => {
            let dataFinal = {
              id: result.id,
              progressValue: 0,
              totalStar: 0,
              ...result.data(),
            };

            temp.push(dataFinal);
          });

          temp.sort((a, b) => {
            return a.name > b.name ? 1 : -1;
          });

          this.employeeList = temp;

          this.showEmployeeList = temp.filter(
            (x) => x.departmentId == this.departmentSelect.value
          );

          this.progressValue();

          this.loadingHide();
        });
    },
    reportPrint() {
      this.$router.push({
        name: "reportPrint",
        params: {
          data: this.showEmployeeList,
        },
      });
    },
  },
  mounted() {
    this.loadDepartment();
  },
};
</script>

<style lang="scss" scoped>
.border {
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  border-left: 1px solid rgba(0, 0, 0, 0.5);
  border-right: 1px solid rgba(0, 0, 0, 0.5);
}
</style>
