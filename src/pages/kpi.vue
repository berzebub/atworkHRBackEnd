<template>
  <q-page>
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
          <!-- GEN -->
          <div class="q-ml-md">
            <q-btn @click="genData()" color="negative">ฝาก GEN</q-btn>
          </div>
          <!-- OUT -->
          <div class="q-ml-md">
            <q-btn @click="logOut()" color="orange">OUT</q-btn>
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
          <div class="col" align="center">{{item.numOfPractice}}</div>
          <div class="col" align="center">{{item.numOfStar}}</div>
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
              <q-input v-model="numOfPractice" outlined dense />
            </div>
          </div>
          <div class="q-mt-md text-subtitle1">
            <div>จำนวนดาว</div>
            <div>
              <q-input v-model="numOfStar" outlined dense />
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
            v-close-popup
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
              <q-input v-model="numOfPracticeAll" outlined dense />
            </div>
          </div>
          <div class="q-mt-md text-subtitle1">
            <div>จำนวนแบบดาว</div>
            <div>
              <q-input v-model="numOfStarAll" outlined dense />
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
            v-close-popup
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
        "ธันวาคม"
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
        "2574"
      ]
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
        .then(data => {
          data.forEach(element => {
            employeeTemp.push({
              ...element.data(),
              employeeId: element.id
            });
          });

          db.collection("kpiLog")
            .where("departmentId", "==", this.departmentSelect)
            .where("hotelId", "==", this.hotelId)
            .where("month", "==", this.month)
            .where("year", "==", this.year)
            .get()
            .then(data => {
              data.forEach(element => {
                kpiTemp.push({ ...element.data(), kpiId: element.id });
              });

              employeeTemp.forEach(element => {
                let filterData = kpiTemp.filter(
                  x =>
                    x.employeeId == element.employeeId &&
                    x.year == this.year &&
                    x.month == this.month
                );

                if (filterData.length > 0) {
                  element.numOfPractice = filterData[0].numOfPractice;
                  element.numOfStar = filterData[0].numOfStar;
                  element.startLevelId = this.levelList.filter(
                    x => x.value == filterData[0].levelId
                  )[0];
                  element.kpiId = filterData[0].kpiId;
                } else {
                  element.numOfPractice = "ยังไม่ตั้งค่า";
                  element.numOfStar = "ยังไม่ตั้งค่า";
                  element.startLevelId = this.levelList.filter(
                    x => x.value == element.startLevelId
                  )[0];
                }
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
          .then(data => {
            data.forEach(element => {
              let newData = {
                label: element.data().name,
                value: element.id
              };
              levelTemp.push(newData);
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
        .where("hotelId", "==", this.hotelId)
        .get()
        .then(data => {
          data.forEach(element => {
            let newData = {
              label: element.data().name,
              value: element.id
            };
            departmentTemp.push(newData);
          });
          this.departmentNameList = departmentTemp;
          this.departmentSelect = departmentTemp[0].value;
          this.loadEmployeeData();
        });
    },
    openDialogKpiSetting(index, item) {
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
      this.levelStartAll = this.levelList[0].value;
    },
    saveAllKpi() {
      this.loadingShow();
      let counter = 0;
      this.employeeList.forEach(element => {
        console.log(element);
        db.collection("employee")
          .doc(element.employeeId)
          .update({
            startLevelId: this.levelStartAll
          })
          .then(() => {
            if (element.kpiId) {
              db.collection("kpiLog")
                .doc(element.kpiId)
                .update({
                  levelId: this.levelStartAll,
                  numOfPractice: this.numOfPracticeAll,
                  numOfStar: this.numOfStarAll
                })
                .then(() => {
                  counter++;
                  if (counter == this.employeeList.length) {
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
                  filter: ""
                })
                .then(() => {
                  counter++;
                  if (counter == this.employeeList.length) {
                    this.loadingHide();
                    this.loadEmployeeData();
                  }
                });
            }
          });
      });
      return;

      this.loadingShow();
      let empUpdateTemp = {};
      db.collection("employee")
        .get()
        .then(data => {
          data.forEach(element => {
            empUpdateTemp = element.id;
            db.collection("employee")
              .doc(empUpdateTemp)
              .update({
                startLevelId: this.levelStartAll
              });
          });
        });
      let kpiUpdateTemp = {};
      db.collection("kpiLog")
        .get()
        .then(data => {
          if (data.size) {
            data.forEach(element => {
              kpiUpdateTemp = element.id;
              db.collection("kpi")
                .doc(kpiUpdateTemp)
                .update({
                  levelId: this.levelStartAll,
                  numOfPractice: this.numOfPracticeAll,
                  numOfStar: this.numOfStarAll
                });
            });
          } else {
            db.collection("kpi").add({
              departmentId: this.departmentSelect,
              employeeId: kpiUpdateTemp,
              hotelId: this.hotelId,
              levelId: this.levelStartAll,
              numOfPractice: this.numOfPracticeAll,
              numOfStar: this.numOfStarAll,
              month: this.month,
              year: this.year,
              filter: ""
            });
          }
          this.loadEmployeeData();
        });
    },
    savePersonalKpi() {
      this.loadingShow();
      db.collection("employee")
        .doc(this.getEmployeeId)
        .update({ startLevelId: this.levelStart })
        .then(() => {
          db.collection("kpiLog")
            .where("employeeId", "==", this.getEmployeeId)
            .where("month", "==", this.month)
            .where("year", "==", this.year)
            .get()
            .then(data => {
              if (data.size) {
                db.collection("kpiLog")
                  .doc(this.getKpiId)
                  .update({
                    levelId: this.levelStart,
                    numOfPractice: this.numOfPractice,
                    numOfStar: this.numOfStar
                  })
                  .then(() => {
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
                  filter: ""
                };
                db.collection("kpiLog")
                  .add(addDataTemp)
                  .then(() => {
                    this.loadEmployeeData();
                  });
              }
            });
        });
    },

    genData() {
      this.$router.push("/genEmulators");
    }
  },
  mounted() {
    this.loadDepartmentData();
  }
};
</script>

<style >
</style>