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
          v-for="item in departmentList.filter(
              x => x.name[0].toUpperCase() == item
            )"
          :key="item.id"
        >
          <div class="q-pb-md q-px-md">
            <div class="q-pt-sm text-subtitle1">{{item.name}}</div>
            <div class="row">
              <div class="col text-body2">
                {{item.email}}
                <div class="q-mt-xs q-gutter-sm">
                  <span v-for="i in item.sanctionGroup" :key="i">
                    <span class="statusUser q-px-xs">
                      <span v-if="i =='kpi'">KPI</span>
                      <span v-if="i =='report'">รายงาน</span>
                      <span v-if="i =='person'">พนักงาน</span>
                      <span v-if="i =='reward'">รางวัล</span>
                    </span>
                  </span>
                </div>
              </div>
              <div>
                <q-btn color="cyan-8" icon="fas fa-trash-alt" class="q-mx-md" round />
              </div>
              <div>
                <q-btn @click="editBtn(item.id)" color="cyan-8" icon="fas fa-edit" round />
              </div>
            </div>
          </div>

          <q-separator />
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { db, auth } from "../router";
import IndexVue from "./Index.vue";
export default {
  data() {
    return {
      nameArr: [],
      departmentList: []
    };
  },
  methods: {
    loadDepartmentList() {
      db.collection("user_admin")
        .where("uid", "==", "test")
        .get()
        .then(doc => {
          doc.forEach(element => {
            let dataKey = {
              id: element.id
            };
            let final = {
              ...dataKey,
              ...element.data()
            };
            this.departmentList.push(final);
          });
          this.departmentSort();
        });
    },
    departmentSort() {
      let nameArr = [];
      let array = [];
      this.departmentList.forEach(element => {
        nameArr.push(element.name[0].toUpperCase());
      });

      nameArr = [...new Set(nameArr)];
      nameArr.sort((a, b) => {
        return a < b ? -1 : 1;
      });
      this.nameArr = nameArr;
      this.departmentList.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      });
    },
    addBtn() {
      this.$router.push("/departmentAdd");
    },
    editBtn(val) {
      this.$router.push("/departmentEdit/" + val);
    }
  },

  mounted() {
    this.loadDepartmentList();
  }
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