<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row justify-between">
        <div v class="row">
          <!-- MONTH -->
          <div>
            <q-select
              class="text-subtitle1"
              style="width:150px"
              dense
              outlined
              v-model="month"
              :options="monthOption"
              label="มกราคม"
            />
          </div>
          <!-- YEAR -->
          <div class="q-ml-md">
            <q-select
              class="text-subtitle1"
              style="width:100px"
              dense
              outlined
              v-model="years"
              :options="yearsOption"
              label="2563"
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
          v-for="(items , index) in departmentName "
          :key="items"
          class="row items-center q-py-md text-subtitle1"
          :class="index % 2 != 0? 'bg-grey-3':'bg-white'"
        >
          <div class="q-pl-md col-4">{{items.name}}</div>
          <div class="col-2" align="center">{{}}</div>
          <div class="col-2" align="center">{{}}</div>
          <div class="col-2" align="center">{{}}</div>
          <div class="col-2" align="center">
            <q-btn
              @click="openDialogKpiSetting()"
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
          <div align="center" class="text-h6">"แผนกทำความสะอาด"</div>
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
      departmentName: [],
      dialogKpi: false,
      dialogAllKpi: false,
      month: "",
      years: "",
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
      departmentList: [
        {
          hotelId: "123",
          departmentId: "999",
          numOfPractice: 254,
          numOfStar: 254,
          departMonth: "มกราคม",
          departYear: "2536"
        },
        {
          hotelId: "963",
          departmentId: "888",
          numOfPractice: 6262,
          numOfStar: 555,
          departMonth: "มกราคม",
          departYear: "2571"
        },
        {
          hotelId: "852",
          departmentId: "777",
          numOfPractice: 6262,
          numOfStar: 555,
          departMonth: "มกราคม",
          departYear: "2555"
        },
        {
          hotelId: "741",
          departmentId: "444",
          numOfPractice: 7856,
          numOfStar: 144,
          departMonth: "มกราคม",
          departYear: "2539"
        },
        {
          hotelId: "655",
          departmentId: "124",
          numOfPractice: 3326,
          numOfStar: 128,
          departMonth: "มกราคม",
          departYear: "2539"
        }
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
    openDialogKpiSetting() {
      this.dialogKpi = true;
    },
    openDialogALLKpiSetting() {
      this.dialogAllKpi = true;
    },
    loadDepartmentData() {
      db.collection("department")
        .get()
        .then(data => {
          data.forEach(element => {
            this.departmentName = element.data();
            console.log(this.departmentName);
          });
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