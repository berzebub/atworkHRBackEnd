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
              map-options
              emit-value
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
        <!-- KPI ALL HOTELL  -->
        <div class="row">
          <div class="q-pr-md">
            <q-btn
              @click="openDialogAllHotelSetting()"
              dense
              class="text-subtitle1"
              style="width:155px"
              color="cyan-8"
              label="KPI ทั้งโรงแรม"
            />
          </div>
          <!-- KPI ALL DEPARTMENT -->
          <div>
            <q-btn
              @click="openDialogALLKpiSetting()"
              dense
              class="text-subtitle1"
              style="width:155px"
              color="cyan-8"
              label="ตั้งค่า KPI ทั้งแผนก"
            />
          </div>
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
          v-for="(item, index) in employeeList"
          :key="index"
          class="row items-center q-py-md text-subtitle1 border"
          :class="index % 2 != 0 ? 'bg-grey-3' : 'bg-white'"
        >
          <div class="q-pl-md col-4">{{ item.name }}</div>

          <div class="col" align="center">
            <span v-if="isLoadEmployee == true">
              {{
              item.startLevelId.label
              }}
            </span>
          </div>
          <div
            class="col"
            align="center"
          >{{ item.numOfPractice == 0 ? "ไม่ตั้งค่า" : item.numOfPractice }}</div>
          <div class="col" align="center">{{ item.numOfStar == 0 ? "ไม่ตั้งค่า" : item.numOfStar }}</div>
          <div class="col" align="center">
            <q-btn
              @click="openDialogKpiSetting(index, item)"
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
          <div align="center" class="text-h6">"{{ getEmployeeName }}"</div>
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
            <div class="row items-center">
              <div>จำนวนแบบฝึกหัด</div>
              <div class="q-px-sm text-grey-5 text-body2">กรุณาใส่ตัวเลขที่มีค่ามากกว่า 0</div>
            </div>
            <div>
              <q-input
                :rules="[val => !!val]"
                ref="numOfPractice"
                v-model.number="numOfPractice"
                :error="
                  isCheckZero == true &&
                    (numOfPractice == 0 || numOfPractice == '')
                "
                hide-bottom-space
                lazy-rules
                outlined
                dense
                mask="####"
              />
            </div>
          </div>
          <div class="q-mt-md text-subtitle1">
            <div class="row items-center">
              <div>จำนวนดาว</div>
              <div class="q-px-sm text-grey-5 text-body2">กรุณาใส่ตัวเลขที่มีค่ามากกว่า 0</div>
            </div>
            <div>
              <q-input
                :rules="[val => !!val]"
                lazy-rules
                ref="numOfStar"
                v-model.number="numOfStar"
                :error="
                  isCheckZero == true && (numOfStar == 0 || numOfStar == '')
                "
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
    <!-- KPI-SETTING-DEPARTMENT -->
    <q-dialog v-model="dialogAllDepartment" persistent>
      <q-card style="width: 400px">
        <q-card-section class="bg-blue-10 no-padding">
          <div class="text-h6 text-white q-pa-sm" align="center">ตั้งค่า KPI</div>
        </q-card-section>

        <q-card-section>
          <div align="center" class="text-h6">"{{ typeKpiName }}"</div>
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
            <div class="row items-center">
              <div>จำนวนแบบฝึกหัด</div>
              <div class="q-px-sm text-grey-5 text-body2">กรุณาใส่ตัวเลขที่มีค่ามากกว่า 0</div>
            </div>

            <div>
              <q-input
                :rules="[val => !!val]"
                lazy-rules
                ref="numOfPracticeAll"
                v-model="numOfPracticeAll"
                :error="
                  isCheckZero == true &&
                    (numOfPracticeAll == 0 || numOfPracticeAll == '')
                "
                hide-bottom-space
                outlined
                dense
                mask="####"
              />
            </div>
          </div>
          <div class="q-mt-md text-subtitle1">
            <div class="row items-center">
              <div>จำนวนดาว</div>
              <div class="q-px-sm text-grey-5 text-body2">กรุณาใส่ตัวเลขที่มีค่ามากกว่า 0</div>
            </div>
            <div>
              <q-input
                :rules="[val => !!val]"
                lazy-rules
                ref="numOfStarAll"
                v-model="numOfStarAll"
                :error="
                  isCheckZero == true &&
                    (numOfStarAll == 0 || numOfStarAll == '')
                "
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
            @click="saveAllKpiDepartment()"
            dense
            class="bg-cyan-8 text-white"
            style="width:120px"
            label="บันทึก"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- KPI-SETTING-HOTEL -->
    <q-dialog v-model="dialogAllHotel" persistent>
      <q-card style="width: 400px">
        <q-card-section class="bg-blue-10 no-padding">
          <div class="text-h6 text-white q-pa-sm" align="center">ตั้งค่า KPI</div>
        </q-card-section>

        <q-card-section>
          <div align="center" class="text-h6">"ทั้งโรงแรม"</div>
          <div class="q-mt-md text-subtitle1">
            <div class="row items-center">
              <div>จำนวนแบบฝึกหัด</div>
              <div class="q-px-sm text-grey-5 text-body2">กรุณาใส่ตัวเลขที่มีค่ามากกว่า 0</div>
            </div>

            <div>
              <q-input
                :rules="[val => !!val]"
                lazy-rules
                ref="numOfPracticeAllHotel"
                v-model="numOfPracticeAllHotel"
                :error="
                  isCheckZero == true &&
                    (numOfPracticeAllHotel == 0 || numOfPracticeAllHotel == '')
                "
                hide-bottom-space
                outlined
                dense
                mask="####"
              />
            </div>
          </div>
          <div class="q-mt-md text-subtitle1">
            <div class="row items-center">
              <div>จำนวนดาว</div>
              <div class="q-px-sm text-grey-5 text-body2">กรุณาใส่ตัวเลขที่มีค่ามากกว่า 0</div>
            </div>
            <div>
              <q-input
                :rules="[val => !!val]"
                lazy-rules
                ref="numOfStarAllHotel"
                v-model="numOfStarAllHotel"
                :error="
                  isCheckZero == true &&
                    (numOfStarAllHotel == 0 || numOfStarAllHotel == '')
                "
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
            @click="saveAllKpiHotel()"
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
import { db, axios } from "../router";
export default {
  data() {
    return {
      departmentNameList: [],
      typeKpiName: "",
      departmentSelect: "",
      getEmployeeName: "",
      getEmployeeId: "",
      getKpiId: "",
      employeeList: "",
      kpiLogList: "",
      levelList: "",
      dialogKpi: false,
      dialogAllDepartment: false,
      dialogAllHotel: false,
      month: 1,
      year: 2563,
      numOfPractice: "",
      numOfPracticeAll: "",
      numOfPracticeAllHotel: "",
      numOfStarAll: "",
      numOfStarAllHotel: "",
      numOfStar: "",
      levelStart: "",
      levelStartAll: "",
      isLoadLevel: true,
      isLoadEmployee: false,
      isCheckZero: false,
      hotelId: this.$q.localStorage.getItem("hotelId"),
      allEmployee: "",
      monthOption: [
        {
          label: "มกราคม",
          value: 1,
        },
        {
          label: "กุมภาพันธ์",
          value: 2,
        },
        {
          label: "มีนาคม",
          value: 3,
        },
        {
          label: "เมษายน",
          value: 4,
        },
        {
          label: "พฤษภาคม",
          value: 5,
        },
        {
          label: "มิถุนายน",
          value: 6,
        },

        {
          label: "กรกฎาคม",
          value: 7,
        },
        {
          label: "สิงหาคม",
          value: 8,
        },
        {
          label: "กันยายน",
          value: 9,
        },
        {
          label: "ตุลาคม",
          value: 10,
        },
        {
          label: "พฤศจิกายน",
          value: 11,
        },
        {
          label: "ธันวาคม",
          value: 12,
        },
      ],
      yearsOption: [
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
    };
  },
  methods: {
    async loadEmployeeData() {
      this.loadingShow();
      let employeeTemp = [];
      let kpiTemp = [];

      await this.loadLevelData();

      db.collection("employee")
        .where("hotelId", "==", this.hotelId)
        .get()
        .then((data) => {
          data.forEach((element) => {
            employeeTemp.push({
              ...element.data(),
              employeeId: element.id,
            });
          });
          this.allEmployee = employeeTemp;
          employeeTemp = employeeTemp.filter(
            (x) => x.departmentId == this.departmentSelect
          );

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
    async loadDepartmentData() {
      let path =
        "https://us-central1-atwork-dee11.cloudfunctions.net/atworkFunctions/getTime";

      let getDate = await axios(path);

      getDate = getDate.data.date.split("-");

      this.month = Number(getDate[1]);
      this.year = Number(getDate[2]) + Number(543);

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
            return a.label > b.label ? 1 : -1;
          });
          this.departmentNameList = departmentTemp;
          this.departmentSelect = departmentTemp[0].value;
          this.loadEmployeeData();
        });
    },
    // เปิด Dialog KPi รายบุคคล
    openDialogKpiSetting(index, item) {
      this.isCheckZero = false;
      this.dialogKpi = true;
      this.getEmployeeName = this.employeeList[index].name;
      this.levelStart = item.startLevelId.value;
      this.getEmployeeId = this.employeeList[index].employeeId;
      this.getKpiId = this.employeeList[index].kpiId;
      this.numOfPractice = this.employeeList[index].numOfPractice;
      this.numOfStar = this.employeeList[index].numOfStar;
    },
    // เปิด Dialog KPI ทั้งโรงแรม
    openDialogAllHotelSetting() {
      this.dialogAllHotel = true;
      this.numOfPracticeAllHotel = "";
      this.numOfStarAllHotel = "";
      this.isCheckZero = false;
    },
    //เปิด Dialog KPI ทั้งแผนก
    openDialogALLKpiSetting() {
      this.isAllSettingHotel = true;
      // หาชื่อของแผนก
      let departName = this.departmentNameList.filter(
        (x) => x.value == this.departmentSelect
      );
      this.typeKpiName = "ทั้งแผนก" + departName[0].label;

      this.numOfPracticeAll = "";
      this.numOfStarAll = "";
      this.dialogAllDepartment = true;
      this.isCheckZero = false;
      this.levelStartAll = this.levelList[0].value;
    },
    // ----------------------------------------------------------------------------

    //บันทึกการตั้งค่า KPI ทั้งโรงแรม
    saveAllKpiHotel() {
      this.loadingShow();
      this.$refs.numOfPracticeAllHotel.validate();
      this.$refs.numOfStarAllHotel.validate();
      if (
        ((this.$refs.numOfPracticeAllHotel.hasError ||
          this.numOfPracticeAllHotel == 0) &&
          (this.$refs.numOfStarAllHotel.hasError ||
            this.numOfStarAllHotel == 0)) ||
        this.numOfPracticeAllHotel == 0 ||
        this.numOfStarAllHotel == 0 ||
        this.$refs.numOfPracticeAllHotel.hasError ||
        this.$refs.numOfStarAllHotel.hasError
      ) {
        this.isCheckZero = true;
        this.loadingHide();
        return;
      }
      this.allEmployee.forEach((element) => {
        db.collection("kpiLog")
          .where("month", "==", this.month)
          .where("year", "==", this.year)
          .where("employeeId", "==", element.employeeId)
          .get()
          .then((data) => {
            if (data.size) {
              db.collection("kpiLog")
                .doc(data.docs[0].id)
                .update({
                  numOfPractice: this.numOfPracticeAllHotel,
                  numOfStar: this.numOfStarAllHotel,
                })
                .then(() => {
                  this.loadEmployeeData();
                  this.dialogAllHotel = false;
                  this.loadingHide();
                });
            } else {
              db.collection("kpiLog")
                .add({
                  numOfPractice: this.numOfPracticeAllHotel,
                  numOfStar: this.numOfStarAllHotel,
                  departmentId: element.departmentId,
                  employeeId: element.employeeId,
                  hotelId: this.hotelId,
                  levelId: element.startLevelId,
                  month: this.month,
                  year: this.year,
                })
                .then(() => {
                  this.loadEmployeeData();
                  this.dialogAllHotel = false;
                  this.loadingHide();
                });
            }
          });
      });
    },
    //บันทึกการตั้งค่า KPI ทั้งแผนก
    saveAllKpiDepartment() {
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
        this.isCheckZero = true;
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
                    this.dialogAllDepartment = false;
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
                    this.dialogAllDepartment = false;
                    this.loadingHide();
                    this.loadEmployeeData();
                  }
                });
            }
          });
      });
    },
    // บันทึกการตั้งค่า KPI รายบุคคล
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
        this.isCheckZero = true;
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

<style>
.border {
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  border-left: 1px solid rgba(0, 0, 0, 0.5);
  border-right: 1px solid rgba(0, 0, 0, 0.5);
}
</style>
