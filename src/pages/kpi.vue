<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row justify-between">
        <div v class="row">
          <!-- MONTH -->
          <div>
            <q-select
              @input="loadKpiLogData()"
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
          <div class="q-pl-md col-4">แผนก</div>
          <div class="col-2" align="center">บทเรียนเริ่มต้น</div>
          <div class="col-2" align="center">จำนวนแบบฝึกหัด</div>
          <div class="col-2" align="center">จำนวนดาว</div>
          <div class="col-2" align="center">ตั้งค่า</div>
        </div>
        <div
          v-for="(item , index) in departmentNameList "
          :key="index"
          class="row items-center q-py-md text-subtitle1"
          :class="index % 2 != 0? 'bg-grey-3':'bg-white'"
        >
          <div class="q-pl-md col-4">{{item.name}}</div>
          <div v-for="(item2 , index2) in kpiLogList" :key="index2" class="row col">
            <div class="col" align="center">{{practiceStarter}}</div>
            <div class="col" align="center">{{item2.numOfPractice}}</div>
            <div class="col" align="center">{{item2.numOfStar}}</div>
            <div class="col" align="center">
              <q-btn
                @click="openDialogKpiSetting(index)"
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
    </div>

    <!-- -------------------------------dialog---------------------------------------- -->
    <!-- KPI-SETTING -->
    <q-dialog v-model="dialogKpi" persistent>
      <q-card style="width: 400px">
        <q-card-section class="bg-blue-10 no-padding">
          <div class="text-h6 text-white q-pa-sm" align="center">ตั้งค่า KPI</div>
        </q-card-section>

        <q-card-section>
          <div align="center" class="text-h6">"{{getDepartmentName}}"</div>
          <div class="q-mt-md text-subtitle1">
            <div>จำนวนแบบฝึกหัด</div>
            <div>
              <q-input v-model="numOfPractice" outlined dense />
            </div>
          </div>
          <div class="q-mt-md text-subtitle1">
            <div>จำนวนแบบดาว</div>
            <div>
              <q-input v-model="numOfStar" outlined dense />
            </div>
          </div>
          <div class="q-mt-md text-subtitle1">
            <div>บทเรียนเริ่มต้น</div>
            <div>
              <q-select v-model="practiceStarter" :options="practiceStartOption" outlined dense />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="center" class="q-mb-sm">
          <q-btn dense style="width:120px" outline color="cyan-8" label="ยกเลิก" v-close-popup />
          <q-btn
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
            <div>จำนวนแบบฝึกหัด</div>
            <div>
              <q-input v-model="numOfPractice" outlined dense />
            </div>
          </div>
          <div class="q-mt-md text-subtitle1">
            <div>จำนวนแบบดาว</div>
            <div>
              <q-input v-model="numOfStar" outlined dense />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="center" class="q-mb-sm">
          <q-btn dense style="width:120px" outline color="cyan-8" label="ยกเลิก" v-close-popup />
          <q-btn
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
      departmentNameList: "",
      getDepartmentName: "",
      kpiLogList: "",
      dialogKpi: false,
      dialogAllKpi: false,
      month: "มกราคม",
      year: "2563",
      numOfPractice: "",
      numOfStar: "",
      practiceStarter: "ข้าวมันไก่",
      practiceStartOption: [
        "ข้าวมันไก่",
        "ข้าวขาหมู",
        "เตี๋ยวไก่มะระ",
        "ข้าวต้มปลา",
        "ส้มตำปูปลาร้า",
        "สเต็กหมูพริกไทยดำ"
      ],

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
        2574
      ]
    };
  },
  methods: {
    openDialogKpiSetting(index) {
      this.dialogKpi = true;
      this.getDepartmentName = this.departmentNameList[index].name;
    },
    openDialogALLKpiSetting() {
      this.dialogAllKpi = true;
    },
    loadDepartmentData() {
      let temp = [];
      let kpiLogTemp = [];
      db.collection("kpiLog")
        .where("month", "==", this.month)
        .where("year", "==", this.year)
        .get()
        .then(data => {
          data.forEach(element => {
            kpiLogTemp.push({ ...element.data(), id: element.id });
          });
          this.kpiLogList = kpiLogTemp;
          // console.log(this.kpiLogList);
        });

      db.collection("department")
        .where("hotelId", "==", "a") //+++++++
        .get()
        .then(data => {
          data.forEach(element => {
            // console.log(element.data().name);
            temp.push({ ...element.data(), id: element.id });
          });
          this.departmentNameList = temp;
          console.log(this.departmentNameList[0].name);
        });
    }
  },
  mounted() {
    this.loadDepartmentData();
  }
};
</script>

<style >
</style>