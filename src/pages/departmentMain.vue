<template>
  <q-page class="container">
    <div align="center">
      <q-btn
        @click="addBtn()"
        class="text-subtitle1 q-mt-lg"
        style="width:160px"
        color="cyan-8"
        label="เพิ่มพนักงาน"
      />
    </div>
    <div class="row justify-center" v-for="item in nameArr" :key="item.id">
      <q-card class="my-card q-ma-md">
        <div class="q-px-md q-pt-sm">
          <div class="avatar row">
            <div class="col self-center text-center text-subtitle1">{{item}}</div>
          </div>
        </div>
        <div
          v-for="item2 in userList.filter(
              x => x.displayName[0] == item
            )"
          :key="item2.id"
        >
          <div class="q-pb-md q-px-md">
            <div class="q-pt-sm text-subtitle1">{{item2.displayName}}</div>
            <div class="row">
              <div class="col text-body2">
                {{item2.email}}
                <div class="q-mt-xs q-gutter-sm">
                  <span v-for="i in item2.customClaims.dataEntryPermissions" :key="i">
                    <span class="statusUser q-px-xs">
                      <span v-if="i =='kpi'">KPI</span>
                      <span v-if="i =='report'">รายงาน</span>
                      <span v-if="i =='personel'">พนักงาน</span>
                      <span v-if="i =='reward'">รางวัล</span>
                    </span>
                  </span>
                </div>
              </div>
              <div>
                <q-btn
                  color="cyan-8"
                  @click="promptDeleteUser(item2)"
                  icon="fas fa-trash-alt"
                  class="q-mx-md"
                  round
                />
              </div>
              <div>
                <q-btn @click="editBtn(item2)" color="cyan-8" icon="fas fa-edit" round />
              </div>
            </div>
          </div>

          <q-separator />
        </div>
      </q-card>
    </div>

    <q-dialog v-model="isShowDeleteUserDialog">
      <div class="bg-white row q-pa-lg" align="center" style="width:400px ">
        <div class="col-12 q-pt-md">
          <q-btn outline round color="secondary" icon="fas fa-trash-alt" size="12px" />
          <span class="text-h6 q-pl-md">ยืนยันการลบรายชื่อ</span>
        </div>
        <div class="col-12 text-subtitle1 q-pt-md">คุณต้องการลบ "{{ tempData.displayName }}"</div>

        <div class="col-6 q-pr-sm q-pt-lg" align="right">
          <q-btn
            @click="isShowDeleteUserDialog = false,tempData = ''"
            outline
            color="secondary"
            label="ยกเลิก"
            style="width:120px"
          />
        </div>
        <div class="col-6 q-pl-sm q-pt-lg" align="left">
          <q-btn @click="confirmDeleteData()" color="secondary" label="ยืนยัน" style="width:120px" />
        </div>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import { db, auth, axios } from "../router";
import IndexVue from "./Index.vue";
export default {
  data() {
    return {
      nameArr: [],
      userList: [],
      isShowDeleteUserDialog: false,
      tempData: "",
    };
  },
  methods: {
    async confirmDeleteData() {
      this.loadingShow();
      const apiURL =
        "https://us-central1-atwork-dee11.cloudfunctions.net/atworkFunctions/user/delete?uid=" +
        this.tempData.uid;
      let userData = await axios.get(apiURL);
      this.loadingHide();
      this.isShowDeleteUserDialog = false;
      this.loaduserList();
    },
    promptDeleteUser(data) {
      this.tempData = data;
      this.isShowDeleteUserDialog = true;
    },
    async loaduserList() {
      this.loadingShow();
      const apiURL =
        "https://us-central1-atwork-dee11.cloudfunctions.net/atworkFunctions/user/getAllUser";
      let userData = await axios.get(apiURL);

      let getHRUserData = userData.data.filter((x) =>
        x.customClaims.accessProgram.includes("HR")
      );

      this.userList = getHRUserData;
      this.isLoadUser = true;
      let nameArr = getHRUserData.map((x) => x.displayName[0]);
      nameArr.sort((a, b) => (a > b ? 1 : -1));
      nameArr = [...new Set(nameArr)];
      this.nameArr = nameArr;
      this.loadingHide();
    },

    addBtn() {
      this.$router.push("/departmentAdd");
    },
    editBtn(val) {
      console.log(val);
      this.$router.push({
        name: "departmentEdit",
        params: val,
      });
      // this.$router.push("/departmentEdit/" + val);
    },
  },

  mounted() {
    this.loaduserList();
  },
};
</script>

<style scoped>
.avatar {
  width: 29px;
  height: 29px;
  color: white;
  background: #0d47a1;
  border-radius: 100%;
}
.statusUser {
  font-size: 11px;
  border: 1px solid black;
  border-radius: 3px;
}
.my-card {
  width: 100%;
  border-radius: 10px;
  max-width: 700px;
}
</style>