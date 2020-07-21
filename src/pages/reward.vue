<template>
  <q-page class="container text-subtitle1">
    <div class="q-pa-md">
      <div class="text-right">
        <div>
          <span class="q-px-lg">การใช้งานระบบรางวัล</span>
          <toggle-button
            :labels="{ checked: 'เปิดใช้งาน', unchecked: 'ปิดใช้งาน' }"
            :height="40"
            :width="140"
            :color="{
          checked: ['#0097A7'  ],
          unchecked: ['#909090']
        }"
            :font-size="16"
            v-model="mode"
            @change="loadRewardList()"
          />
        </div>
      </div>
    </div>
    <div class="q-mx-md row justify-between">
      <div class="row modeBox brx q-mb-md">
        <div class="q-px-md col self-center">
          <q-radio
            color="cyan-8"
            @input="changeMode"
            v-model="showMode"
            val="person"
            label="ชื่อพนักงาน"
          />
        </div>
        <div class="q-px-md col self-center">
          <q-radio
            color="cyan-8"
            @input="changeMode"
            v-model="showMode"
            val="reward"
            label="ของรางวัล"
          />
        </div>
      </div>
      <div>
        <div v-if="showMode == 'person'" class="q-mb-md">
          <q-select
            style="width:330px"
            outlined
            dense
            v-model="department"
            :options="departmentOptions"
          />
        </div>
        <div>
          <q-btn
            @click="addReward()"
            style="width:158px;height:40px"
            color="cyan-8"
            v-if="showMode == 'reward'"
            icon
          >
            <q-icon size="21px" name="fas fa-plus">
              <span class="text-subtitle1 q-px-md">เพิ่มของรางวัล</span>
            </q-icon>
          </q-btn>
        </div>
      </div>
    </div>
    <!-- ตาราง  person-->
    <div v-if="showMode == 'person'" class="q-px-md">
      <div
        class="row bg-blue-10 text-white text-subtitle1 q-px-md q-py-sm"
        style="border-radius: 10px 10px 0px 0px"
      >
        <div class="col">
          ชื่อ-นามสกุล
          <i class="fas fa-sort"></i>
        </div>
        <div class="col" align="center">
          จำนวนดาว
          <i class="fas fa-sort"></i>
        </div>
        <div style="width:120px" class="col-2" align="center">
          ประวัติการแลก
          <i class="fas fa-sort"></i>
        </div>
        <div style="width:120px" class="col-2" align="center">
          แลกรางวัล
          <i class="fas fa-sort"></i>
        </div>
      </div>
      <!-- เนื้อหา -->
      <div
        v-for="item in userList"
        :key="item.id"
        class="row bg-white text-black text-subtitle1 q-px-md q-py-sm brx"
      >
        <div class="col self-center">{{item.name}}</div>
        <div class="col self-center" align="center">{{item.number}}</div>
        <div style="width:120px" class="col-2 self-center" align="center">
          <q-btn @click="isShowHistory = true" icon="fas fa-file-alt" round color="cyan-8" />
        </div>
        <div style="width:120px" class="col-2 self-center relative-position" align="center">
          <q-btn @click="isReward = true" icon="fas fa-gift" round color="cyan-8" />
          <q-btn v-if="!mode" class="absolute-center backDrop"></q-btn>
        </div>
      </div>
    </div>
    <!-- ตาราง  reward-->
    <div v-if="showMode == 'reward'" class="q-px-md">
      <div
        class="row bg-blue-10 text-white text-subtitle1 q-px-md q-py-sm"
        style="border-radius: 10px 10px 0px 0px"
      >
        <div class="col-2">
          ของรางวัล
          <i class="fas fa-sort"></i>
        </div>
        <div class="col" align="center">
          รูป
          <i class="fas fa-sort"></i>
        </div>
        <div style="width:120px" class="col-2" align="center">
          จำนวนดาว
          <i class="fas fa-sort"></i>
        </div>
        <div style="width:120px" class="col-2" align="center">
          ลบ
          <i class="fas fa-sort"></i>
        </div>
        <div style="width:120px" class="col-2" align="center">
          แก้ไข
          <i class="fas fa-sort"></i>
        </div>
        <div style="width:120px" class="col-2" align="center">
          เปิด/ปิด
          <i class="fas fa-sort"></i>
        </div>
      </div>
      <!-- เนื้อหา -->
      <div
        v-for="item in rewardList"
        :key="item.id"
        class="row bg-white text-black text-subtitle1 q-px-md q-py-sm brx"
      >
        <div class="col-2 brx self-center">{{item.reward}}</div>
        <div class="col" align="center">
          <div class="row justify-center">
            <div class="brx" style="width:180px;height:180px"></div>
          </div>
        </div>
        <div style="width:120px" class="col-2 brx self-center" align="center">{{item.number}}</div>
        <div style="width:120px" class="col-2 self-center" align="center">
          <q-btn icon="fas fa-trash-alt" round color="cyan-8" />
        </div>
        <div style="width:120px" class="col-2 self-center" align="center">
          <q-btn icon="fas fas fa-edit" round color="cyan-8" />
        </div>
        <div style="width:120px" class="col-2 self-center" align="center">
          <span>
            <toggle-button
              :labels="{ checked: 'เปิด', unchecked: 'ปิด' }"
              :height="30"
              :width="67"
              :color="{
          checked: ['#0097A7'  ],
          unchecked: ['#909090']
        }"
              :font-size="16"
              v-model="statusUser"
            />
          </span>
        </div>
      </div>
    </div>
    <!-- <div class="q-px-md relative-position">
      <q-table :data="rewardList" :columns="columnsAll" row-key="name" binary-state-sort>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">{{ props.row.name }}</q-td>
            <q-td key="photo" :props="props">
              <div class="row justify-center">
                <div class="brx" style="width:180px;height:180px"></div>
              </div>
            </q-td>
            <q-td key="number" :props="props">{{ props.row.number }}</q-td>
            <q-td key="history" :props="props">
              <q-btn @click="isShowHistory = true" icon="fas fa-file-alt" round color="cyan-8" />
            </q-td>
            <q-td key="reward" :props="props">
              <q-btn icon="fas fa-gift" round color="cyan-8" />
              <q-btn v-if="!status" class="absolute-center backDrop"></q-btn>
            </q-td>
            <q-td key="edit" :props="props">
              <q-btn icon="fas fa-trash-alt" round color="cyan-8" />
            </q-td>
            <q-td key="delete" :props="props">
              <q-btn icon="fas fas fa-edit" round color="cyan-8" />
            </q-td>
            <q-td key="status" :props="props">
              <toggle-button
                :labels="{ checked: 'เปิด', unchecked: 'ปิด' }"
                :height="30"
                :width="67"
                :color="{
          checked: ['#0097A7'  ],
          unchecked: ['#909090']
        }"
                :font-size="16"
                v-model="status"
                @change="loadRewardList()"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>-->
    <!-- ประวัติการแลก  -->
    <q-dialog v-model="isShowHistory">
      <q-card style="max-width:400px;width:100%">
        <q-card-section align="center" class="bg-blue-10 text-white">
          <div class="text-h6">ประวัติการแลก</div>
        </q-card-section>
        <q-scroll-area style="width:100%;height:400px" class="bg-white text-subtitle1 q-px-md">
          <div class="q-pt-md">
            <span>นันทนา เศรษฐี :</span>
            <span>แผนกความสะอาด</span>
            <q-separator class="q-my-sm" />
            <span>
              <div>วันที่ 22 มิ.ย. 2563</div>
              <div class="row justify-between">
                <span>คูปอง 100 บาท</span>
                <span>150 ดาว</span>
              </div>
            </span>
            <q-separator class="q-my-sm" />
            <span>
              <div>วันที่ 22 มิ.ย. 2563</div>
              <div class="row justify-between">
                <span>คูปอง 100 บาท</span>
                <span>150 ดาว</span>
              </div>
            </span>
          </div>
        </q-scroll-area>

        <q-card-section align="center">
          <q-btn style="width:120px" v-close-popup color="cyan-8" label="ปิด" />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- แลกรางวัล  -->
    <q-dialog v-model="isReward">
      <q-card style="max-width:400px;width:100%">
        <q-card-section align="center" class="bg-blue-10 text-white">
          <div class="text-h6">แลกรางวัล</div>
        </q-card-section>
        <q-scroll-area style="width:100%;height:350px" class="bg-white text-subtitle1 q-px-md">
          <div class="q-pt-md">
            <span>นันทนา เศรษฐี :</span>
            <span>แผนกความสะอาด</span>
            <q-separator class="q-my-sm" />
            <span>
              <div>รางวัลที่แลก</div>
              <div>
                <q-select
                  outlined
                  dense
                  v-model="reward = rewardOptions[0]"
                  :options="rewardOptions"
                />
              </div>
            </span>
            <span>
              <div class="q-py-sm row justify-between">
                <span>ดาวปัจจุบันที่มี</span>
                <span>200</span>
              </div>
              <div class="q-py-sm row justify-between">
                <span>ดาวที่ต้องใช้แลก</span>
                <span>150</span>
              </div>
              <div class="q-py-sm row justify-between">
                <span>ดาวที่จะเหลือ</span>
                <span>50</span>
              </div>
            </span>
          </div>
        </q-scroll-area>

        <q-card-section align="center">
          <q-btn style="width:120px" v-close-popup color="cyan-8" label="ปิด" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      statusUser: true,
      mode: true,
      showMode: "person",
      department: "ชื่อพนักงาน",
      departmentOptions: [
        {
          label: "ชื่อพนักงาน",
          value: "person"
        },
        {
          label: "ของรางวัล",
          value: "reward"
        }
      ],
      reward: "",
      rewardOptions: [
        {
          label: "คูปอง 100",
          value: "person"
        },
        {
          label: "คูปอง 200",
          value: "reward"
        }
      ],
      columnsAll: [],

      rewardList: [],
      userList: [],
      // columnsPerson: [
      //   { name: "name", label: "ชื่อ-สกุล", align: "left" },
      //   { name: "number", label: "จำนวนดาว", align: "center" },
      //   {
      //     style: "width: 120px",
      //     name: "history",
      //     label: "ประวัติการแลก",
      //     align: "center"
      //   },
      //   {
      //     style: "width: 120px",
      //     name: "reward",
      //     label: "แลกรางวัล",
      //     align: "center"
      //   }
      // ],
      // columnsReward: [
      //   { name: "name", label: "ของรางวัล", align: "left" },
      //   { name: "photo", label: "รูป", align: "center" },
      //   { name: "number", label: "จำนวนดาว", align: "center" },
      //   {
      //     style: "width: 120px",
      //     name: "delete",
      //     label: "ลบ",
      //     align: "center"
      //   },
      //   {
      //     style: "width: 120px",
      //     name: "edit",
      //     label: "แก้ไข",
      //     align: "center"
      //   },
      //   {
      //     style: "width: 120px",
      //     name: "status",
      //     label: "เปิด/ปิด",
      //     align: "center"
      //   }
      // ],
      isShowHistory: false,
      isReward: false
    };
  },
  methods: {
    loadRewardList() {
      console.log("www");
    },
    changeMode() {
      if (this.showMode == "person") {
        this.userList = [
          {
            name: "นันทนา เศรษฐี",
            number: 337,
            history: "6%",
            reward: "7%"
          },
          {
            name: "นันทนา เศรษฐี",
            number: 337,
            history: "6%",
            reward: "7%"
          }
        ];
        // this.columnsAll = this.columnsPerson;
      } else {
        this.rewardList = [
          {
            status: false,
            number: 337,
            reward: "คูปอง 100 บาท"
          },
          {
            status: true,
            number: 337,
            reward: "คูปอง 200 บาท"
          }
        ];
        // this.columnsAll = this.columnsReward;
      }
    },
    addReward() {
      console.log("5555");
    }
  },

  mounted() {
    this.changeMode();
  }
};
</script>

<style  scoped>
.modeBox {
  width: 330px;
  height: 40px;
  border: 1px solid #9e9e9e;
}
.backDrop {
  width: 40px;
  height: 40px;
  background-color: black;
  opacity: 0.3;
  z-index: 10;
  border-radius: 100%;
}
</style>