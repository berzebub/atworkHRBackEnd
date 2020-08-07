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
              checked: ['#0097A7'],
              unchecked: ['#909090']
            }"
            :font-size="16"
            v-model="mode"
            :sync="true"
            @input="updateStatusRewardHotel(hotelId)"
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
            @click="
              addRewardBtn();
              addReward.isImage = false;
              addReward.reward = '';
              addReward.star = '';
            "
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
          <q-icon @click="sortName('employee')" name="fas fa-sort cursor-pointer"></q-icon>
        </div>
        <div class="col" align="center">
          จำนวนดาว
          <q-icon @click="sortStar('starEmployee')" name="fas fa-sort cursor-pointer"></q-icon>
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
          <div class="col self-center q-px-md">{{ item.name }}</div>
          <div class="col self-center" align="center">{{ item.star }}</div>
          <div style="width:120px" class="col-2 self-center" align="center">
            <q-btn
              @click="historyBtn(item.name, item.key)"
              icon="fas fa-file-alt"
              round
              color="cyan-8"
            />
          </div>
          <div style="width:120px" class="col-2 self-center relative-position" align="center">
            <q-btn
              @click="rewardBtn(item.name, item.star, item.key)"
              icon="fas fa-gift"
              round
              color="cyan-8"
            />
            <div v-if="!mode" class="absolute-center backDrop"></div>
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
          <q-icon @click="sortName('reward')" name="fas fa-sort cursor-pointer"></q-icon>
        </div>
        <div class="col" align="center">รูป</div>
        <div style="width:100px" class="col-2" align="center">
          จำนวนดาว
          <q-icon @click="sortStar('starReward')" name="fas fa-sort cursor-pointer"></q-icon>
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
          <div style="width:100px" class="col-2 self-center" align="center">{{ item.star }}</div>
          <div style="width:100px" class="col-2 self-center" align="center">
            <q-btn
              @click="deleteBtn(item.key,item.reward)"
              icon="fas fa-trash-alt"
              round
              color="cyan-8"
            />
          </div>
          <div style="width:100px" class="col-2 self-center" align="center">
            <q-btn
              @click="editBtn(item.key, item.getURL)"
              icon="fas fas fa-edit"
              round
              color="cyan-8"
            />
          </div>
          <div style="width:100px" class="col-2 self-center" align="center">
            <span>
              <toggle-button
                :labels="{ checked: 'เปิด', unchecked: 'ปิด' }"
                :height="30"
                :width="67"
                :color="{
                  checked: ['#0097A7'],
                  unchecked: ['#909090']
                }"
                :font-size="16"
                v-model="item.status"
                @input="updateStatusReward(item.key,item.status)"
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
        <q-scroll-area class="text-subtitle1" style="height: 300px;">
          <div class="q-pa-md">
            <span>{{ user.name }}</span>
            <span class="q-px-sm">:</span>
            <span>{{ department.label }}</span>
            <span>
              <div v-if="isHistoryList">
                <q-separator class="q-my-sm" />
                <div class="text-center row" style="height: 200px;">
                  <span class="col self-center">ยังไม่มีประวัติการทำรายการ</span>
                </div>
              </div>
              <div v-show="!isHistoryList" v-for="item in showHistoryList" :key="item.id">
                <q-separator class="q-my-sm" />
                <div>{{ item.date }}</div>

                <div class="row justify-between">
                  <div>{{ item.name }}</div>
                  <div>{{ item.star + " " +"ดาว" }}</div>
                </div>
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
    <q-dialog v-model="isReward" persistent>
      <q-card style="max-width:400px;width:100%">
        <q-card-section align="center" class="bg-blue-10 text-white">
          <div class="text-h6">แลกรางวัล</div>
        </q-card-section>
        <div class="q-pa-md text-subtitle1">
          <span>{{ user.name }}</span>
          <span class="q-px-sm">:</span>
          <span>{{ department.label }}</span>
          <q-separator class="q-my-sm" />
          <span>
            <div>รางวัลที่แลก</div>
            <div align="right">
              <q-select
                :color="isRewardBtn ? 'red' : ''"
                outlined
                dense
                v-model="reward"
                @input="changeStar"
                :options="rewardOptions"
              />
              <span v-if="isRewardBtn" class="text-red">ดาวปัจจุบันไม่พอ</span>
            </div>
          </span>
          <span>
            <div class="q-py-sm row justify-between">
              <span>ดาวปัจจุบันที่มี</span>
              <span>{{ user.star }}</span>
            </div>
            <div class="q-py-sm row justify-between">
              <span>ดาวที่ต้องใช้แลก</span>
              <span>{{ user.starAll }}</span>
            </div>
            <div class="q-py-sm row justify-between">
              <span>ดาวที่จะเหลือ</span>
              <span :class="isRewardBtn ? 'text-red' : ''">
                {{
                user.starBalance
                }}
              </span>
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
            <div v-if="isRewardBtn" class="absolute-center backDropReward"></div>
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
        <q-card-section>
          <div class="text-subtitle1">
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
              <div style="overflow: hidden">
                <q-file
                  v-if="!addReward.isImage"
                  accept=".jpg"
                  input-style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
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
                      v-if="uploadImg"
                      @click="uploadImg = null"
                    >
                      <span class="far fa-trash-alt q-px-xs"></span>
                    </div>
                  </template>
                  <div
                    style="width:100%"
                    class="text-subtitle1 row absolute-center text-grey-7"
                    v-if="!uploadImg"
                  >
                    <span class="col text-center">ลากแล้ววาง หรือ</span>
                  </div>
                </q-file>
              </div>
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
        </q-card-section>
      </q-card>
    </q-dialog>
    <dialog-setting
      :type="1"
      :name="dataName"
      v-if="isShowDeleteDialog"
      @emitCancelDelete="isShowDeleteDialog = false"
      @emitConfirmDelete="confirmDelete"
    ></dialog-setting>
    <dialog-setting
      :type="2"
      :name="dataName"
      v-if="dialogSuccess"
      @autoClose="dialogSuccess = false"
    ></dialog-setting>
  </q-page>
</template>

<script>
import { db, st, axios } from "../router";
import dialogSetting from "../components/dialogSetting";
export default {
  components: {
    dialogSetting,
  },
  data() {
    return {
      uploadImg: null,
      pathFile:
        "https://storage.googleapis.com/atwork-dee11.appspot.com/image_reward/",
      addReward: {
        reward: "",
        star: "",
        hotelId: "",
        // departmentId: "",
        isImage: false,
        status: true,
      },
      statusReward: false,
      showMode: "person",
      department: "",
      departmentOptions: [],
      reward: "",
      rewardOptions: [],
      columnsAll: [],
      mode: false,
      statusHotel: [],
      userId: "",
      rewardList: [],
      employeeList: [],
      rewardHistory: [],
      userList: [],
      modeAdd: false,
      isShowHistory: false,
      isReward: false,
      isAddReward: false,
      isRewardBtn: false,
      dialogSuccess: false,
      isShowDeleteDialog: false,
      showHistoryList: [],
      user: {
        name: "",
        star: "",
        starAll: 0,
        starBalance: 0,
      },
      isSort: true,
      isHistoryList: false,
      rewardData: "",
      snapReward: "",
    };
  },
  methods: {
    updateStatusRewardHotel(val) {
      db.collection("hotel").doc(val).update({ isReward: this.mode });
    },
    // โหลด โรงแรม
    loadHotel() {
      this.loadingShow();

      db.collection("hotel")
        .doc(this.hotelId)
        .get()
        .then((doc) => {
          this.mode = doc.data().isReward;
          this.loadDepartment();
        });
    },
    // โหลดแผนก และข้อมูลทั้งหมด
    loadDepartment() {
      db.collection("department")
        .where("hotelId", "==", this.hotelId)
        .get()
        .then(async (doc) => {
          if (doc.size) {
            let key = [];
            doc.forEach((element) => {
              key.push(element.id);
              this.departmentOptions.push({
                label: element.data().name,
                value: element.id,
              });
            });
            this.department = this.departmentOptions[0];

            // this.loadUser(key[0]);
            await this.loadReward();
            this.loadRewardHistory();
          } else {
            this.department = "ไม่มีแผนก";
            this.loadingHide();
          }
        });
    },
    // โหลดรางวัล
    async loadReward() {
      // this.loadingShow();
      this.snapReward = await db
        .collection("reward")
        .where("hotelId", "==", this.$q.localStorage.getItem("hotelId"))
        .onSnapshot((doc) => {
          this.rewardList = [];
          this.rewardOptions = [];
          doc.forEach((element) => {
            let getImage = "";
            if (element.data().isImage) {
              getImage = this.pathFile + element.id + ".jpg";
            }
            let dataKey = {
              key: element.id,
              getURL: getImage,
              ...element.data(),
            };

            this.rewardList.push(dataKey);
          });
          this.rewardList.sort((a, b) => {
            return a.star - b.star;
          });
          // this.loadingHide();
        });
    },
    // โหลด ประวัติรางวัล
    loadRewardHistory() {
      this.rewardHistory = [];
      db.collection("reward_history")
        .where("hotelId", "==", this.$q.localStorage.getItem("hotelId"))
        .get()
        .then((doc) => {
          doc.forEach((element) => {
            let dataKey = {
              key: element.id,
            };
            let final = {
              ...dataKey,
              ...element.data(),
            };
            this.rewardHistory.push(final);
          });
          this.loadEmployee();
        });
    },
    // โหลด ลูกจ้าง
    loadEmployee() {
      this.employeeList = [];
      db.collection("employee")
        .where("hotelId", "==", this.$q.localStorage.getItem("hotelId"))
        .get()
        .then((doc) => {
          let temp = [];
          doc.forEach((element) => {
            let dataKey = {
              key: element.id,
            };
            let final = {
              ...dataKey,
              ...element.data(),
            };

            temp.push(final);
          });
          temp.sort((a, b) => {
            return a.name < b.name ? -1 : 1;
          });
          this.employeeList = temp;
          this.userList = temp.filter((x) => {
            return x.departmentId == this.department.value;
          });
          this.loadingHide();
        });
    },
    ///************************************************ */
    // แลกของรางวัล
    async rewardRedemption() {
      let star = this.user.star - this.user.starAll;
      db.collection("employee").doc(this.userId).update({ star: star });
      db.collection("reward_history")
        .where("employeeId", "==", this.userId)
        .get()
        .then(async (doc) => {
          let owen = this.employeeList.filter((x) => {
            return x.key == this.userId;
          })[0];
          let apiURL =
            "https://us-central1-atwork-dee11.cloudfunctions.net/atworkFunctions/getTime";
          let getData = await axios.get(apiURL);
          let regex = /-/gi;
          let date = getData.data.date.replace(regex, "/");
          let history = {
            hotelId: owen.hotelId,
            departmentId: owen.departmentId,
            employeeId: this.userId,
            name: this.user.name,
          };
          if (doc.size) {
            let test = this.rewardHistory.filter((x) => {
              return x.employeeId == this.userId;
            })[0];
            let rewardList = test.rewardList;
            let item = {
              date: date,
              rewardList: this.reward.value,
            };
            rewardList.push(item);

            await db
              .collection("reward_history")
              .doc(doc.docs[0].id)
              .update({ rewardList: rewardList });
          } else {
            history.rewardList = [
              { date: date, rewardList: this.reward.value },
            ];
            db.collection("reward_history").add(history);
          }
          this.dialogSuccess = true;
          this.dataName = "เราทำการแลกของรางวัลเสร็จสิ้นแล้ว";
        });
      this.isReward = false;
    },
    //  โหลดพนักงาน
    loadUser() {
      this.userList = this.employeeList.filter((x) => {
        return x.departmentId == this.department.value;
      });
    },
    sortName(val) {
      if (val == "employee") {
        this.isSort = !this.isSort;
        this.userList.sort((a, b) => {
          if (this.isSort == true) {
            return b.name > a.name ? 1 : -1;
          } else {
            return a.name > b.name ? 1 : -1;
          }
        });
      } else {
        this.isSort = !this.isSort;
        this.rewardList.sort((a, b) => {
          if (this.isSort == true) {
            return b.name > a.name ? 1 : -1;
          } else {
            return a.name > b.name ? 1 : -1;
          }
        });
      }
    },
    sortStar(val) {
      if (val == "starEmployee") {
        this.isSort = !this.isSort;
        this.userList.sort((a, b) => {
          if (this.isSort == true) {
            return b.star - a.star;
          } else {
            return a.star - b.star;
          }
        });
      } else {
        this.isSort = !this.isSort;
        this.rewardList.sort((a, b) => {
          if (this.isSort == true) {
            return b.star - a.star;
          } else {
            return a.star - b.star;
          }
        });
      }
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
      this.userId = val;
      this.loadItem();
      this.user.name = name;
      this.isShowHistory = true;
      this.isHistoryList = false;
    },
    loadItem() {
      let temp = [];
      db.collection("reward_history")
        .where("employeeId", "==", this.userId)
        .onSnapshot((doc) => {
          if (doc.size) {
            let data = doc.docs[0].data().rewardList;
            data.map((x1) => {
              this.rewardList.filter((x2, index) => {
                if (x1.rewardList == x2.key) {
                  let dataKey = {
                    date: x1.date,
                    name: x2.reward,
                    star: x2.star,
                  };
                  temp.push(dataKey);
                }
              });
            });
            this.showHistoryList = temp;
          } else {
            this.isHistoryList = true;
          }
        });
    },
    // แลกรางวัล
    loadItemReward() {
      this.rewardOptions = [];
      this.rewardList.filter((x) => {
        if (x.status) {
          this.rewardOptions.push({
            label: x.reward + " - " + x.star + " " + "ดาว",
            value: x.key,
          });
        }
      });
      this.reward = this.rewardOptions[0];
      this.rewardOptions.filter((x, index) => {
        return (x.label = index + 1 + "." + " " + x.label);
      });

      this.changeStar(this.reward);
    },
    rewardBtn(name, star, val) {
      this.dialogSuccess = false;
      this.loadItemReward();
      this.userId = val;
      this.user.name = name;
      this.user.star = star;
      this.isReward = true;
    },
    //  เลือกรางวัล
    changeStar(val) {
      db.collection("reward")
        .get()
        .then((doc) => {
          doc.forEach((element) => {
            if (val.value == element.id) {
              this.user.starAll = element.data().star;
            }
          });
          this.user.starBalance = this.user.star - this.user.starAll;
          if (this.user.star < this.user.starAll) {
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
    deleteBtn(val, reward) {
      this.dataName = reward;
      this.userId = val;
      this.isShowDeleteDialog = true;
    },
    confirmDelete() {
      this.isShowDeleteDialog = false;
      db.collection("reward")
        .doc(this.userId)
        .delete()
        .then(() => {
          this.dialogSuccess = true;
          this.dataName = "ลบข้อมูลเรียบร้อย";
        });
    },
    addRewardBtn() {
      this.uploadImg = null;
      this.modeAdd = false;
      this.isAddReward = true;
    },
    // บันทึกของรางวัล
    async saveReward() {
      delete this.user.rewardList;
      delete this.addReward.getURL;
      this.$refs.reward.validate();
      this.$refs.star.validate();

      if (this.$refs.reward.hasErrors || this.$refs.star.hasError) {
      }
      if (this.addReward.reward == "" || this.addReward.star == "") {
        return;
      } else {
        this.addReward.hotelId = this.hotelId;
        if (this.uploadImg) {
          this.addReward.isImage = true;
          // if (this.uploadImg.size >= 100000) {
          //   return;
          // }
        }
        this.loadingShow();

        if (!this.modeAdd) {
          //เพิ่มรางวัลใหม่
          if (!this.uploadImg) {
            this.addReward.isImage = false;
          }

          let getDb = await db.collection("reward").add(this.addReward);
          if (this.uploadImg) {
            await st
              .child("/image_reward/" + getDb.id + ".jpg")
              .put(this.uploadImg);
            this.rewardList = [];
            this.loadReward();
          }
          this.dataName = "บันทึกข้อมูลเรียบร้อย";
          this.dialogSuccess = true;
        } else {
          //แก้ไขรางวัล
          db.collection("reward").doc(this.userId).update(this.addReward);
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
        this.loadingHide();
      }
    },
    // อัพเดท การปิดเปิด
    updateStatusReward(val, status) {
      db.collection("reward").doc(val).update({ status: status });
    },
    deleteImg() {
      this.addReward.isImage = false;
      db.collection("reward").doc(this.userId).update({ isImage: false });
      st.child("/image_reward/" + this.userId + ".jpg").delete();
    },
  },

  mounted() {
    this.loadHotel();
  },
  beforeDestroy() {
    if (typeof this.snapReward == "function") {
      this.snapReward();
    }
  },
};
</script>

<style scoped>
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
  height: 33px;
  margin-top: 1px;
  background-color: black;
  opacity: 0.3;
  z-index: 10;
  border-radius: 5%;
}
.noPhoto {
  border: 1px solid #9e9e9e;
}
</style>
