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
                {{item.gmail}}
                <div class="q-mt-xs">
                  <span class="statusUser q-px-xs">พนักงาน</span>
                </div>
              </div>

              <div>
                <q-btn color="cyan-8" icon="fas fa-trash-alt" class="q-mx-md" round />
              </div>
              <div>
                <q-btn @click="editBtn()" color="cyan-8" icon="fas fa-edit" round />
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
import IndexVue from "./Index.vue";
export default {
  data() {
    return {
      nameArr: [],
      departmentList: [
        { name: "กะรัต นิตยานิล", gmail: "acornversion@gmail.com" },
        {
          name: "เกศลิน กาลปาศ",
          gmail: "acornversioawdawdawdawdawdawdn@gmail.com"
        },
        {
          name: "นศลิน กาลปาศ",
          gmail: "acornversioawdawdawdawdawdawdn@gmail.com"
        },
        { name: "เปาจรีย์ กิตติ", gmail: "acornversion@gmail.com" },
        { name: "ข", gmail: "acornversion@gmail.com" },
        { name: "ปาจรีย์ กิตติ", gmail: "pajaree.eduinn@gmail.com" },
        { name: "กัศลิน กาลปาศ", gmail: "acornversion@gmail.com" },
        { name: "เข", gmail: "acornversion@gmail.com" },
        {
          name: "บลิน กาลปาศ",
          gmail: "acornversioawdawdawdawdawdawdn@gmail.com"
        },
        { name: "กิศลิน กาลปาศ", gmail: "acornversion@gmail.com" },
        { name: "ไกศลิน กาลปาศ", gmail: "acornversion@gmail.com" }
      ]
    };
  },
  methods: {
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
    editBtn() {
      this.$router.push("/departmentEdit");
    }
  },

  mounted() {
    this.departmentSort();
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