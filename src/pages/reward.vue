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
            @input="changeDepartment"
            v-model="department"
            :options="departmentOptions"
          />
        </div>
        <div>
          <q-btn
            @click="addRewardBtn();addReward.isImage = false;addReward.reward = '';addReward.star = '';"
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
        <div class="col q-px-md">
          ชื่อ-นามสกุล
          <i class="fas fa-sort"></i>
        </div>
        <div class="col" align="center">
          จำนวนดาว
          <i class="fas fa-sort"></i>
        </div>
        <div style="width:120px" class="col-2" align="center">ประวัติการแลก</div>
        <div style="width:120px" class="col-2" align="center">แลกรางวัล</div>
      </div>
      <!-- เนื้อหา -->
      <div class="shadow-2 q-pb-sm q-mb-md" style="border-radius: 0px 0px 10px 10px">
        <div
          v-for="item in userList"
          :key="item.id"
          class="row bg-white text-black text-subtitle1 q-px-md q-py-sm"
        >
          <div class="col self-center q-px-md">{{item.name}}</div>
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
    </div>
    <!-- ตาราง  reward-->
    <div v-if="showMode == 'reward'" class="q-px-md">
      <div
        class="row bg-blue-10 text-white text-subtitle1 q-px-md q-py-sm"
        style="border-radius: 10px 10px 0px 0px"
      >
        <div class="col q-px-md">
          ของรางวัล
          <i class="fas fa-sort"></i>
        </div>
        <div class="col" align="center">รูป</div>
        <div style="width:100px" class="col-2" align="center">
          จำนวนดาว
          <i class="fas fa-sort"></i>
        </div>
        <div style="width:100px" class="col-2" align="center">ลบ</div>
        <div style="width:100px" class="col-2" align="center">แก้ไข</div>
        <div style="width:100px" class="col-2" align="center">เปิด/ปิด</div>
      </div>
      <!-- เนื้อหา -->
      <div class="shadow-2 q-pb-sm q-mb-md" style="border-radius: 0px 0px 10px 10px">
        <div
          v-for="item in rewardList"
          :key="item.id"
          class="row bg-white text-black text-subtitle1 q-px-md q-py-sm"
        >
          <div class="col self-center q-px-md" v-html="item.reward" />
          <div class="col" align="center">
            <div class="row justify-center">
              <div
                v-if="!item.isImage"
                class="noPhoto row relative-position"
                style="width:180px;height:180px"
              >
                <div class="absolute-center">ไม่มีรูปภาพ</div>
              </div>
              <img v-if="item.isImage" style="width:180px" :src="item.getURL" alt />
            </div>
          </div>
          <div style="width:100px" class="col-2 self-center" align="center">{{item.star}}</div>
          <div style="width:100px" class="col-2 self-center" align="center">
            <q-btn @click="deleteBtn(item.key)" icon="fas fa-trash-alt" round color="cyan-8" />
          </div>
          <div style="width:100px" class="col-2 self-center" align="center">
            <q-btn
              @click="editBtn(item.key,item.getURL)"
              icon="fas fas fa-edit"
              round
              color="cyan-8"
            />
          </div>
          <div style="width:100px" class="col-2 self-center" align="center">
            <span>
              {{item.status}}
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
    </div>
    <!-- ประวัติการแลก  -->
    <q-dialog v-model="isShowHistory" persistent>
      <q-card style="max-width:400px;width:100%">
        <q-card-section align="center" class="bg-blue-10 text-white">
          <div class="text-h6">ประวัติการแลก</div>
        </q-card-section>
        <div class="q-pa-md">
          <span>{{rewardUser.name}}</span>
          <span class="q-px-sm">:</span>
          <span>{{department.label}}</span>
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
    <q-dialog v-model="isReward" persistent>
      <q-card style="max-width:400px;width:100%">
        <q-card-section align="center" class="bg-blue-10 text-white">
          <div class="text-h6">แลกรางวัล</div>
        </q-card-section>
        <div class="q-pa-md">
          <span>{{rewardUser.name}}</span>
          <span class="q-px-sm">:</span>
          <span>{{department.label}}</span>
          <q-separator class="q-my-sm" />
          <span>
            <div>รางวัลที่แลก</div>
            <div align="right">
              <q-select
                :color="isRewardBtn ? 'red' : ''"
                outlined
                dense
                v-model="reward "
                @input="changeStar"
                :options="rewardOptions"
              />
              <span v-if="isRewardBtn " class="text-red">ดาวปัจจุบันไม่พอ</span>
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
              <span :class="isRewardBtn ? 'text-red': ''">{{rewardUser.starBalance}}</span>
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
          <span class="relative-position">
            <q-btn
              :disable="isRewardBtn"
              dense
              class="q-mx-sm"
              style="width:120px"
              @click="rewardRedemption()"
              color="cyan-8"
              label="แลกของรางวัล"
            />
            <q-btn v-if="isRewardBtn" class="absolute-center backDropReward"></q-btn>
          </span>
        </div>
      </q-card>
    </q-dialog>
    <!-- เพิ่มของรางวัล  -->
    <q-dialog v-model="isAddReward" persistent>
      <q-card class="text-subtitle2" style="max-width:400px;width:100%">
        <q-card-section align="center" class="bg-blue-10 text-white">
          <div v-if="!modeAdd" class="text-h6">เพิ่มของรางวัล</div>
          <div v-if="modeAdd" class="text-h6">แก้ไขของรางวัล</div>
        </q-card-section>
        <div class="q-pa-md">
          <div>
            <span>ชื่อของรางวัล</span>
            <q-input
              ref="reward"
              outlined
              v-model="addReward.reward"
              dense
              :rules="[val => !!val]"
            />
          </div>
          <div>
            <span>จำนวนดาวที่ใช้แลก</span>
            <q-input
              ref="star"
              type="number"
              outlined
              v-model.number="addReward.star"
              dense
              :rules="[val => !!val]"
            />
          </div>
          <div class="q-pb-sm">
            <span>ไฟล์รูปภาพ</span>
            <span
              v-if="!addReward.isImage"
              class="text-body2 text-grey-5 q-px-md"
            >ไฟล์ jpg ขนาด 300x300 px เท่านั้น</span>
            <div align="center" class="q-pa-md" v-if="addReward.isImage">
              <div>
                <q-img :src="addReward.getURL" style="width:300px;">
                  <div class="absolute-bottom text-subtitle1 text-center">
                    <u @click="deleteImg()" class="cursor-pointer">ลบรูปภาพ</u>
                  </div>
                </q-img>
              </div>
            </div>
            <q-file
              v-if="!addReward.isImage"
              accept=".jpg"
              bg-color="white"
              outlined
              v-model="uploadImg"
            >
              <template class="relative-position" v-slot:append>
                <div
                  style="width:100px"
                  class="text-subtitle1 rounded-borders text-center bg-cyan-8 text-white q-pa-xs cursor-pointer"
                  @click.stop="uploadImg = null"
                  v-if="!uploadImg"
                >เลือกไฟล์</div>

                <div
                  class="cursor-pointer rounded-borders text-white q-py-sm q-px-xs bg-cyan-8"
                  v-if="uploadImg "
                  @click="uploadImg  = null"
                >
                  <span class="far fa-trash-alt q-px-xs"></span>
                </div>
              </template>
              <div
                style="width:100%"
                class="text-subtitle1 row absolute-center text-grey-7"
                v-if="!uploadImg "
              >
                <span class="col text-center">ลากแล้ววาง หรือ</span>
              </div>
            </q-file>
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
import { db, st } from "../router";
export default {
  data() {
    return {
      uploadImg: null,
      pathFile:
        "https://storage.cloud.google.com/atwork-dee11.appspot.com/image_reward/",
      addReward: {
        reward: "",
        star: "",
        isImage: false,
      },
      statusReward: false,
      mode: true,
      showMode: "person",
      department: "",
      departmentOptions: [],
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
      isRewardBtn: false,
      rewardUser: {
        name: "",
        star: "",
        starAll: 0,
        starBalance: 0,
      },
    };
  },
  methods: {
    // แลกของรางวัล
    rewardRedemption() {
      let star = this.rewardUser.star - this.rewardUser.starAll;
      db.collection("employee")
        .doc(this.userId)
        .update({ star: star })
        .then(() => {
          let history = {
            employeeId: this.userId,
            name: this.rewardUser.name,
            rewardId: [this.reward.value],
          };
          db.collection("reward_history").add(history);
          // db.collection("reward_history")
          //   .get()
          //   .then((doc) => {
          //     doc.forEach((element) => {
          //       if (this.userId == element.data().id) {
          //         db.collection("reward_history").doc(element.id).delete();
          //       } else {

          //       }
          //     });
          //   });
        });
    },
    //  โหลดพนักงาน

    loadUser(val) {
      db.collection("employee")
        .where("departmentId", "==", val)
        .onSnapshot((doc) => {
          this.userList = [];
          doc.forEach((element) => {
            let dataKey = {
              key: element.id,
            };
            let final = {
              ...dataKey,
              ...element.data(),
            };
            this.userList.push(final);
            this.userList.sort((a, b) => {
              return a.name > b.name ? 1 : -1;
            });
          });
          this.loadingHide();
        });
    },
    // โหลดรางวัล
    loadReward() {
      this.loadingShow();
      db.collection("reward").onSnapshot(async (doc) => {
        this.rewardList = [];
        this.rewardOptions = [];
        await doc.forEach((element) => {
          let getImage = "";
          if (element.data().isImage) {
            getImage = this.pathFile + element.id + ".jpg";
          }
          let dataKey = {
            key: element.id,
            getURL: getImage,
          };
          let final = {
            ...dataKey,
            ...element.data(),
          };
          this.rewardList.push(final);
        });
        this.rewardList.filter((x, index) => {
          this.rewardOptions.push({
            label:
              index + 1 + "." + " " + x.reward + " - " + x.star + " " + "ดาว",
            value: x.key,
          });
        });
        this.reward = this.rewardOptions[0];
        this.changeStar(this.reward);
        this.loadingHide();
      });
    },
    // โหลดแผนก
    loadDepartment() {
      this.loadingShow();
      db.collection("department")
        .get()
        .then((doc) => {
          let key = [];
          doc.forEach((element) => {
            key.push(element.id);

            this.departmentOptions.push({
              label: element.data().name,
              value: element.id,
            });
          });
          this.department = this.departmentOptions[0];
          this.loadUser(key[0]);
          this.loadReward();
        });
    },
    changeDepartment(val) {
      this.loadUser(val.value);
    },
    // เปลี่ยน mode พนักงาน กับ รางวัล
    changeMode() {
      if (this.showMode == "person") {
        this.loadReward();
        this.modeAdd = false;
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
      this.loadReward();
      this.userId = val;
      this.rewardUser.name = name;
      this.rewardUser.star = star;
      this.isReward = true;
    },
    //  เลือกรางวัล
    changeStar(val) {
      db.collection("reward")
        .get()
        .then((doc) => {
          doc.forEach((element) => {
            if (val.value == element.id) {
              this.rewardUser.starAll = element.data().star;
            }
          });
          this.rewardUser.starBalance =
            this.rewardUser.star - this.rewardUser.starAll;
          if (this.rewardUser.star < this.rewardUser.starAll) {
            this.isRewardBtn = true;
          } else {
            this.isRewardBtn = false;
          }
        });
    },
    chengOptions(val) {},
    // แก้ไขรางวัล
    editBtn(val, image) {
      this.uploadImg = null;
      this.addReward = "";
      this.userId = val;
      this.modeAdd = true;
      this.isAddReward = true;
      db.collection("reward")
        .get()
        .then((doc) => {
          doc.forEach((element) => {
            if (element.id == val) {
              let dataKey = {
                getURL: image,
              };
              let filnal = {
                ...dataKey,
                ...element.data(),
              };
              this.addReward = filnal;
            }
          });
        });
    },
    // ลบรางวัล
    deleteBtn(val) {
      this.rewardList = [];
      db.collection("reward").doc(val).delete();
    },
    addRewardBtn() {
      this.uploadImg = null;
      this.modeAdd = false;
      this.isAddReward = true;
    },
    // บันทึกของรางวัล
    async saveReward() {
      delete this.addReward.getURL;
      this.$refs.reward.validate();
      this.$refs.star.validate();
      if (this.$refs.reward.hasErrors || this.$refs.star.hasError) {
      }
      if (this.addReward.reward == "" || this.addReward.star == "") {
        return;
      } else {
        if (this.uploadImg) {
          this.addReward.isImage = true;
        }
        this.loadingShow();
        if (!this.modeAdd) {
          if (!this.uploadImg) {
            this.addReward.isImage = false;
          }
          this.addReward.status = true;
          let getDb = await db.collection("reward").add(this.addReward);
          if (this.uploadImg) {
            await st
              .child("/image_reward/" + getDb.id + ".jpg")
              .put(this.uploadImg)
              .then(async () => {
                this.rewardList = [];
                await this.loadReward();
              });
          }
        } else {
          db.collection("reward").doc(this.userId).set(this.addReward);
          if (this.uploadImg) {
            await st
              .child("/image_reward/" + this.userId + ".jpg")
              .put(this.uploadImg);
            this.rewardList = [];
            this.loadReward();
          }
        }
        this.isAddReward = false;
        this.modeAdd = false;
      }
    },
    // อัพเดท การปิดเปิด
    updateStatusReward(val) {
      db.collection("reward").doc(val).update({ status: this.statusReward });
    },
    deleteImg() {
      this.addReward.isImage = false;
      db.collection("reward").doc(this.userId).update({ isImage: false });
      st.child("/image_reward/" + this.userId + ".jpg").delete();
    },
  },

  mounted() {
    this.loadDepartment();
  },
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
.backDropReward {
  width: 120px;
  height: 32px;
  background-color: black;
  opacity: 0.3;
  z-index: 10;
}
.noPhoto {
  border: 1px solid #9e9e9e;
}
</style>