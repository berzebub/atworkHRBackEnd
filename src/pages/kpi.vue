<template>
  <q-page class="container">
    <div class="q-pa-md">
      <div class="row justify-between">
        <div v class="row">
          <!-- DEPARTMENT -->
          <div>
            <q-select
              @input="loadEmployeeData()"
              class="text-subtitle1"
              style="width:250px"
              dense
              outlined
              emit-value
              map-options
              v-model="departmentSelect"
              :options="departmentNameList"
            />
          </div>
          <!-- MONTH -->
          <div class="q-ml-md">
            <q-select
              @input="loadEmployeeData()"
              class="text-subtitle1"
              style="width:150px"
              dense
              outlined
              v-model="month"
              :options="monthOption"
            />
          </div>
          <!-- YEAR -->
          <div class="q-ml-md">
            <q-select
              @input="loadEmployeeData()"
              class="text-subtitle1"
              style="width:100px"
              dense
              outlined
              v-model="year"
              :options="yearsOption"
            />
          </div>
        </div>
        <!-- KPI ALL  -->
        <div>
          <q-btn
            @click="openDialogALLKpiSetting()"
            dense
            class="text-subtitle1"
            style="width:155px"
            color="cyan-8"
            label="ตั้งค่า KPI ทั้งหมด"
          />
        </div>
      </div>
      <!-- dataTable -->
      <div class="q-mt-lg" style="width:100%">
        <div
          class="row items-center q-py-md bg-blue-10 text-white text-subtitle1"
          style="border-radius:10px 10px 0px 0px"
        >
          <div class="q-pl-md col-4">ชื่อ สกุล</div>
          <div class="col-2" align="center">บทเรียนเริ่มต้น</div>
          <div class="col-2" align="center">จำนวนแบบฝึกหัด</div>
          <div class="col-2" align="center">จำนวนดาว</div>
          <div class="col-2" align="center">ตั้งค่า</div>
        </div>
        <div
          v-for="(item , index) in employeeList "
          :key="index"
          class="row items-center q-py-md text-subtitle1"
          :class="index % 2 != 0? 'bg-grey-3':'bg-white'"
        >
          <div class="q-pl-md col-4">{{item.name}}</div>

          <div class="col" align="center">
            <span v-if="isLoadEmployee == true">{{item.startLevelId.label}}</span>
          </div>
          <div
            class="col"
            align="center"
          >{{item.numOfPractice == 0 ? "ไม่ตั้งค่า" :item.numOfPractice }}</div>
          <div class="col" align="center">{{item.numOfStar == 0 ? "ไม่ตั้งค่า" :item.numOfStar}}</div>
          <div class="col" align="center">
            <q-btn
              @click="openDialogKpiSetting(index , item)"
              color="cyan-8"
              text-color="white"
              round
              size="sm"
              icon="fas fa-edit"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- -------------------------------dialog---------------------------------------- -->
    <!-- KPI-SETTING -->
    <q-dialog v-model="dialogKpi" persistent>
      <q-card style="width: 400px">
        <q-card-section class="bg-blue-10 no-padding">
          <div class="text-h6 text-white q-pa-sm" align="center">ตั้งค่า KPI</div>
        </q-card-section>

        <q-card-section>
          <div align="center" class="text-h6">"{{getEmployeeName}}"</div>
          <div class="q-mt-md text-subtitle1">
            <div>บทเรียนเริ่มต้น</div>
            <div>
              <q-select
                map-options
                emit-value
                v-model="levelStart"
                :options="levelList"
                outlined
                dense
              />
            </div>
          </div>
          <div class="q-mt-md text-subtitle1">
            <div>จำนวนแบบฝึกหัด</div>
            <div>
              <q-input
                :rules="[val => !!val]"
                ref="numOfPractice"
                v-model.number="numOfPractice"
                :error="isCheckZeor == true && (numOfPractice == 0 || numOfPractice == '')"
                hide-bottom-space
                lazy-rules
                outlined
                dense
                mask="####"
              />
            </div>
          </div>
          <div class="q-mt-md text-subtitle1">
            <div>จำนวนดาว</div>
            <div>
              <q-input
                :rules="[val => !!val]"
                lazy-rules
                ref="numOfStar"
                v-model.number="numOfStar"
                :error="isCheckZeor == true && (numOfStar == 0 || numOfStar == '')"
                hide-bottom-space
                outlined
                dense
                mask="####"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="center" class="q-mb-sm">
          <q-btn dense style="width:120px" outline color="cyan-8" label="ยกเลิก" v-close-popup />
          <q-btn
            @click="savePersonalKpi()"
            dense
            class="bg-cyan-8 text-white"
            style="width:120px"
            label="บันทึก"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- KPI-SETTING-ALL -->
    <q-dialog v-model="dialogAllKpi" persistent>
      <q-card style="width: 400px">
        <q-card-section class="bg-blue-10 no-padding">
          <div class="text-h6 text-white q-pa-sm" align="center">ตั้งค่า KPI</div>
        </q-card-section>

        <q-card-section>
          <div align="center" class="text-h6">"ทุกแผนก"</div>
          <div class="q-mt-md text-subtitle1">
            <div>บทเรียนเริ่มต้น</div>
            <div>
              <q-select
                emit-value
                map-options
                v-model="levelStartAll"
                :options="levelList"
                outlined
                dense
              />
            </div>
          </div>
          <div class="q-mt-md text-subtitle1">
            <div>จำนวนแบบฝึกหัด</div>
            <div>
              <q-input
                :rules="[val => !!val]"
                lazy-rules
                ref="numOfPracticeAll"
                v-model="numOfPracticeAll"
                :error="isCheckZeor == true && (numOfPracticeAll == 0 || numOfPracticeAll == '')"
                hide-bottom-space
                outlined
                dense
                mask="####"
              />
            </div>
          </div>
          <div class="q-mt-md text-subtitle1">
            <div>จำนวนดาว</div>
            <div>
              <q-input
                :rules="[val => !!val]"
                lazy-rules
                ref="numOfStarAll"
                v-model="numOfStarAll"
                :error="isCheckZeor == true && (numOfStarAll == 0 || numOfStarAll == '')"
                hide-bottom-space
                outlined
                dense
                mask="####"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="center" class="q-mb-sm">
          <q-btn dense style="width:120px" outline color="cyan-8" label="ยกเลิก" v-close-popup />
          <q-btn
            @click="saveAllKpi()"
            dense
            class="bg-cyan-8 text-white"
            style="width:120px"
            label="บันทึก"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { db } from "../router";
export default {
  data() {
    return {
      departmentNameList: [],
      departmentSelect: "",
      getEmployeeName: "",
      getEmployeeId: "",
      getKpiId: "",
      employeeList: "",
      kpiLogList: "",
      levelList: "",
      dialogKpi: false,
      dialogAllKpi: false,
      month: "มกราคม",
      year: "2563",
      numOfPractice: "",
      numOfPracticeAll: "",
      numOfStarAll: "",
      numOfStar: "",
      levelStart: "",
      levelStartAll: "",
      isLoadLevel: true,
      isLoadEmployee: false,
      isCheckZeor: false,
      hotelId: this.$q.localStorage.getItem("hotelId"),
      monthOption: [
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
      yearsOption: [
        "2563",
        "2564",
        "2565",
        "2566",
        "2567",
        "2568",
        "2569",
        "2570",
        "2571",
        "2572",
        "2573",
        "2574",
      ],
    };
  },
  methods: {
    async loadEmployeeData() {
      this.loadingShow();
      let employeeTemp = [];
      let kpiTemp = [];

      await this.loadLevelData();

      db.collection("employee")
        .where("departmentId", "==", this.departmentSelect)
        .get()
        .then((data) => {
          data.forEach((element) => {
            employeeTemp.push({
              ...element.data(),
              employeeId: element.id,
            });
          });

          db.collection("kpiLog")
            .where("departmentId", "==", this.departmentSelect)
            .where("hotelId", "==", this.hotelId)
            .where("month", "==", this.month)
            .where("year", "==", this.year)
            .get()
            .then((data) => {
              data.forEach((element) => {
                kpiTemp.push({ ...element.data(), kpiId: element.id });
              });

              employeeTemp.forEach((element) => {
                let filterData = kpiTemp.filter(
                  (x) =>
                    x.employeeId == element.employeeId &&
                    x.year == this.year &&
                    x.month == this.month
                );

                if (filterData.length > 0) {
                  element.numOfPractice = filterData[0].numOfPractice;
                  element.numOfStar = filterData[0].numOfStar;
                  element.startLevelId = this.levelList.filter(
                    (x) => x.value == filterData[0].levelId
                  )[0];
                  element.kpiId = filterData[0].kpiId;
                } else {
                  element.numOfPractice = "";
                  element.numOfStar = "";
                  element.startLevelId = this.levelList.filter(
                    (x) => x.value == element.startLevelId
                  )[0];
                }
              });
              employeeTemp.sort((a, b) => {
                return a.name > b.name ? 1 : -1;
              });
              this.employeeList = employeeTemp;
              this.isLoadEmployee = true;
              this.loadingHide();
            });
        });
    },
    loadLevelData() {
      return new Promise((a, b) => {
        let levelTemp = [];
        db.collection("level")
          .get()
          .then((data) => {
            data.forEach((element) => {
              let newData = {
                label: element.data().name,
                status: element.data().status,
                value: element.id,
              };
              if (newData.status == true) {
                levelTemp.push(newData);
              }
              levelTemp.sort((a, b) => {
                return a.label > b.label ? 1 : -1;
              });
            });
            this.levelList = levelTemp;
            this.isLoadLevel = true;
            a();
          });
      });
    },
    loadDepartmentData() {
      let departmentTemp = [];
      db.collection("department")
        .where("hotelId", "==", this.hotelId) //+++++++
        .get()
        .then((data) => {
          data.forEach((element) => {
            let newData = {
              label: element.data().name,
              value: element.id,
            };

            departmentTemp.push(newData);
          });
          departmentTemp.sort((a, b) => {
            return a.name > b.name ? 1 : -1;
          });
          this.departmentNameList = departmentTemp;
          this.departmentSelect = departmentTemp[0].value;
          this.loadEmployeeData();
        });
    },
    openDialogKpiSetting(index, item) {
      this.isCheckZeor = false;
      this.dialogKpi = true;
      this.getEmployeeName = this.employeeList[index].name;
      this.levelStart = item.startLevelId.value;
      this.getEmployeeId = this.employeeList[index].employeeId;
      this.getKpiId = this.employeeList[index].kpiId;
      this.numOfPractice = this.employeeList[index].numOfPractice;
      this.numOfStar = this.employeeList[index].numOfStar;
    },
    openDialogALLKpiSetting() {
      (this.numOfPracticeAll = ""), (this.numOfStarAll = "");
      this.dialogAllKpi = true;
      this.isCheckZeor = false;
      this.levelStartAll = this.levelList[0].value;
    },
    saveAllKpi() {
      this.loadingShow();
      this.$refs.numOfPracticeAll.validate();
      this.$refs.numOfStarAll.validate();
      if (
        ((this.$refs.numOfPracticeAll.hasError || this.numOfPracticeAll == 0) &&
          (this.$refs.numOfStarAll.hasError || this.numOfStarAll == 0)) ||
        this.numOfPracticeAll == 0 ||
        this.numOfStarAll == 0 ||
        this.$refs.numOfPracticeAll.hasError ||
        this.$refs.numOfStarAll.hasError
      ) {
        this.isCheckZeor = true;
        this.loadingHide();
        return;
      }
      let counter = 0;
      this.employeeList.forEach((element) => {
        db.collection("employee")
          .doc(element.employeeId)
          .update({
            startLevelId: this.levelStartAll,
          })
          .then(() => {
            if (element.kpiId) {
              db.collection("kpiLog")
                .doc(element.kpiId)
                .update({
                  levelId: this.levelStartAll,
                  numOfPractice: this.numOfPracticeAll,
                  numOfStar: this.numOfStarAll,
                })
                .then(() => {
                  counter++;
                  if (counter == this.employeeList.length) {
                    this.dialogAllKpi = false;
                    this.loadingHide();
                    this.loadEmployeeData();
                  }
                });
            } else {
              db.collection("kpiLog")
                .add({
                  departmentId: this.departmentSelect,
                  employeeId: element.employeeId,
                  hotelId: this.hotelId,
                  levelId: this.levelStartAll,
                  numOfPractice: this.numOfPracticeAll,
                  numOfStar: this.numOfStarAll,
                  month: this.month,
                  year: this.year,
                  filter: "",
                })
                .then(() => {
                  counter++;
                  if (counter == this.employeeList.length) {
                    this.dialogAllKpi = false;
                    this.loadingHide();
                    this.loadEmployeeData();
                  }
                });
            }
          });
      });
    },
    savePersonalKpi() {
      this.loadingShow();
      this.$refs.numOfPractice.validate();
      this.$refs.numOfStar.validate();
      if (
        ((this.$refs.numOfPractice.hasError || this.numOfPractice == 0) &&
          (this.$refs.numOfStar.hasError || this.numOfStar == 0)) ||
        this.numOfPractice == 0 ||
        this.numOfStar == 0 ||
        this.$refs.numOfPractice.hasError ||
        this.$refs.numOfStar.hasError
      ) {
        this.isCheckZeor = true;
        this.loadingHide();
        return;
      }
      db.collection("employee")
        .doc(this.getEmployeeId)
        .update({ startLevelId: this.levelStart })
        .then(() => {
          db.collection("kpiLog")
            .where("employeeId", "==", this.getEmployeeId)
            .where("month", "==", this.month)
            .where("year", "==", this.year)
            .get()
            .then((data) => {
              if (data.size) {
                db.collection("kpiLog")
                  .doc(this.getKpiId)
                  .update({
                    levelId: this.levelStart,
                    numOfPractice: this.numOfPractice,
                    numOfStar: this.numOfStar,
                  })
                  .then(() => {
                    this.dialogKpi = false;
                    this.loadEmployeeData();
                  });
              } else {
                let addDataTemp = {
                  departmentId: this.departmentSelect,
                  employeeId: this.getEmployeeId,
                  hotelId: this.hotelId,
                  levelId: this.levelStart,
                  numOfPractice: this.numOfPractice,
                  numOfStar: this.numOfStar,
                  month: this.month,
                  year: this.year,
                  filter: "",
                };
                db.collection("kpiLog")
                  .add(addDataTemp)
                  .then(() => {
                    this.dialogKpi = false;
                    this.loadEmployeeData();
                  });
              }
            });
        });
    },
  },
  mounted() {
    this.loadDepartmentData();
  },
};
</script>

<style >
</style>