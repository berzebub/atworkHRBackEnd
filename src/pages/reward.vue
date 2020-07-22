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
            @click="addRewardBtn()"
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
        <div class="col self-center" align="center">{{item.star}}</div>
        <div style="width:120px" class="col-2 self-center" align="center">
          <q-btn
            @click="historyBtn(item.name,item.key)"
            icon="fas fa-file-alt"
            round
            color="cyan-8"
          />
        </div>
        <div style="width:120px" class="col-2 self-center relative-position" align="center">
          <q-btn
            @click="rewardBtn(item.name,item.star,item.key)"
            icon="fas fa-gift"
            round
            color="cyan-8"
          />
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
        <div style="width:120px" class="col-2 brx self-center" align="center">{{item.star}}</div>
        <div style="width:120px" class="col-2 self-center" align="center">
          <q-btn @click="deleteBtn(item.key)" icon="fas fa-trash-alt" round color="cyan-8" />
        </div>
        <div style="width:120px" class="col-2 self-center" align="center">
          <q-btn @click="editBtn(item.key)" icon="fas fas fa-edit" round color="cyan-8" />
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
              v-model="statusReward"
              @change="updateStatusReward(item.key)"
            />
          </span>
        </div>
      </div>
    </div>
    <!-- ประวัติการแลก  -->
    <q-dialog v-model="isShowHistory">
      <q-card style="max-width:400px;width:100%">
        <q-card-section align="center" class="bg-blue-10 text-white">
          <div class="text-h6">ประวัติการแลก</div>
        </q-card-section>
        <div class="q-pa-md">
          <span>{{rewardUser.name}}</span>
          <span class="q-px-sm">:</span>
          <span>{{}}</span>
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
        <div class="q-pa-md">
          <span>{{rewardUser.name}}</span>
          <span class="q-px-sm">:</span>
          <span>{{}}</span>
          <q-separator class="q-my-sm" />
          <span>
            <div>รางวัลที่แลก</div>
            <div>
              <q-select
                outlined
                dense
                v-model="reward "
                @input="changeStar"
                :options="rewardOptions"
              />
            </div>
          </span>
          <span>
            <div class="q-py-sm row justify-between">
              <span>ดาวปัจจุบันที่มี</span>
              <span>{{rewardUser.star}}</span>
            </div>
            <div class="q-py-sm row justify-between">
              <span>ดาวที่ต้องใช้แลก</span>
              <span>{{rewardUser.starAll}}</span>
            </div>
            <div class="q-py-sm row justify-between">
              <span>ดาวที่จะเหลือ</span>
              <span>{{rewardUser.starBalance}}</span>
            </div>
          </span>
        </div>

        <div align="center" class="q-pa-md">
          <q-btn
            dense
            class="q-mx-sm"
            outline
            style="width:120px"
            v-close-popup
            color="cyan-8"
            label="ยกเลิก"
          />
          <q-btn
            dense
            class="q-mx-sm"
            style="width:120px"
            @click="rewardRedemption()"
            color="cyan-8"
            label="แลกของรางวัล"
          />
        </div>
      </q-card>
    </q-dialog>
    <!-- เพิ่มของรางวัล  -->
    <q-dialog v-model="isAddReward">
      <q-card class="text-subtitle2" style="max-width:400px;width:100%">
        <q-card-section align="center" class="bg-blue-10 text-white">
          <div v-if="!modeAdd" class="text-h6">เพิ่มของรางวัล</div>
          <div v-if="modeAdd" class="text-h6">แก้ไขของรางวัล</div>
        </q-card-section>
        <div class="q-pa-md">
          <div class="q-py-sm">
            <span>ชื่อของรางวัล</span>
            <q-input outlined v-model="addReward.reward" dense />
          </div>
          <div class="q-py-sm">
            <span>จำนวนดาวที่ใช้แลก</span>
            <q-input outlined v-model="addReward.star" dense />
          </div>
          <div class="q-py-sm">
            <span>ไฟล์รูปภาพ</span>
            <span class="text-body2 q-px-md">ไฟล์ jpg ขนาด 300x300 px เท่านั้น</span>
            <q-input outlined dense />
          </div>
          <div align="center" class="q-pt-sm">
            <q-btn
              dense
              class="q-mx-sm"
              outline
              style="width:120px"
              v-close-popup
              color="cyan-8"
              label="ยกเลิก"
            />
            <q-btn
              dense
              class="q-mx-sm"
              style="width:120px"
              @click="saveReward()"
              color="cyan-8"
              label="บันทึก"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { db } from "../router";
export default {
  data() {
    return {
      uploadImg: "",
      addReward: {
        reward: "",
        star: ""
      },
      statusReward: false,
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
      rewardOptions: [],
      columnsAll: [],
      userId: "",
      rewardList: [],
      userList: [],
      modeAdd: false,
      isShowHistory: false,
      isReward: false,
      isAddReward: false,
      rewardUser: {
        name: "",
        star: "",
        starAll: 0,
        starBalance: 0
      }
    };
  },
  methods: {
    // แลกของรางวัล
    rewardRedemption() {
      // let history = {
      //   id: this.userId,
      //   name: this.rewardUser.name,
      //   rewardId: [this.reward.value]
      // };
      // db.collection("reward_history")
      //   .get()
      //   .then(doc => {
      //     doc.forEach(element => {
      //       if (this.userId == element.data().id) {
      //         db.collection("reward_history")
      //           .doc(element.id)
      //           .delete();
      //       } else {
      //         db.collection("reward_history").add(history);
      //       }
      //     });
      //   });
    },
    //  โหลดพนักงาน
    loadUser() {
      this.userList = [];
      db.collection("user_hr")
        .get()
        .then(doc => {
          doc.forEach(element => {
            let dataKey = {
              key: element.id
            };
            let final = {
              ...dataKey,
              ...element.data()
            };
            this.userList.push(final);
          });
        });
    },
    // โหลดรางวัล
    loadReward() {
      this.rewardList = [];
      this.rewardOptions = [];
      db.collection("reward")
        .get()
        .then(doc => {
          doc.forEach(element => {
            let dataKey = {
              key: element.id
            };

            let final = {
              ...dataKey,
              ...element.data()
            };
            this.rewardOptions.push({
              label:
                "." +
                " " +
                element.data().reward +
                " - " +
                element.data().star +
                " " +
                "ดาว",
              value: element.id
            });
            this.reward = this.rewardOptions[0];
            this.statusReward = element.data().status;
            this.rewardList.push(final);
          });
        });
    },
    // เปลี่ยน mode พนักงาน กับ รางวัล
    changeMode() {
      if (this.showMode == "person") {
        this.modeAdd = false;
        this.loadReward();
        this.userList;
      } else {
        this.rewardList;
      }
    },
    // ประวัติรางวัล
    historyBtn(name, val) {
      this.rewardUser.name = name;
      this.isShowHistory = true;
    },
    // แลกรางวัล
    rewardBtn(name, star, val) {
      this.userId = val;
      this.rewardUser.name = name;
      this.rewardUser.star = star;
      this.isReward = true;
    },
    //  เลือกรางวัล
    changeStar(val) {
      db.collection("reward")
        .get()
        .then(doc => {
          doc.forEach(element => {
            if (val.value == element.id) {
              this.rewardUser.starAll = element.data().star;
            }
          });
          this.rewardUser.starBalance =
            Number(this.rewardUser.star) - Number(this.rewardUser.starAll);
        });
    },
    chengOptions(val) {},
    // แก้ไขรางวัล
    editBtn(val) {
      this.addReward = {};
      this.userId = val;
      this.modeAdd = true;
      this.isAddReward = true;
      db.collection("reward")
        .get()
        .then(doc => {
          doc.forEach(element => {
            if (element.id == val) {
              this.addReward = element.data();
            }
          });
        });
    },
    // ลบรางวัล
    deleteBtn(val) {
      this.rewardList = [];
      db.collection("reward")
        .doc(val)
        .delete();
      this.loadReward();
    },
    addRewardBtn() {
      this.addReward = {};
      this.modeAdd = false;
      this.isAddReward = true;
    },
    saveReward() {
      this.rewardList = [];
      if (!this.modeAdd) {
        this.addReward.status = true;
        db.collection("reward").add(this.addReward);
      } else {
        db.collection("reward")
          .doc(this.userId)
          .set(this.addReward);
      }
      this.isAddReward = false;
      this.modeAdd = false;
      this.loadReward();
    },
    // อัพเดท การปิดเปิด
    updateStatusReward(val) {
      db.collection("reward")
        .doc(val)
        .update({ status: this.statusReward });
    }
  },

  mounted() {
    this.loadUser();
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