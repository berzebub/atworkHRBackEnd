<template>
  <q-page class="container">
    <div align="center">
      <div class="q-pa-md text-left text-subtitle1" style="max-width:328px">
        <div>
          <span>ชื่อ นามสกุล</span>
          <q-input ref="name" dense outlined v-model="department.name" :rules="[val => !!val]" />
        </div>
        <div>
          <span>อีเมล</span>
          <q-input
            ref="gmail"
            :readonly="$route.name=='departmentEdit'"
            dense
            outlined
            v-model="department.email"
            :rules="[val => !!val 
          ,isCheckEmail,isValidEmail]"
          />
        </div>
        <div>
          <span>รหัสผ่าน</span>
          <div class="text-grey-6 text-body2">ไม่ต่ำกว่า 6 ตัวอักษร</div>
          <q-input
            ref="password"
            dense
            outlined
            v-model="department.password"
            :rules="[val => !!val]"
          />
        </div>
        <div class="row">
          <div class="self-center">สิทธิ์การใช้งาน</div>
          <div class="q-gutter-sm">
            <q-checkbox
              :keep-color="isEroorOptions"
              :color="!isEroorOptions?'cyan-8':'negative'"
              @input="sanctionAll()"
              v-model="all"
              label="ทั้งหมด"
            />
          </div>
        </div>
        <div style="margin-left:-10px">
          <q-option-group
            @input="checkAll(), isEroorOptions = false "
            :keep-color="isEroorOptions"
            :color="!isEroorOptions?'cyan-8':'negative'"
            v-model="department.sanctionGroup"
            :options="sanctionOptions"
            type="checkbox"
          />
        </div>
        <div v-show="isEroorOptions" align="center">
          <q-icon size="22px" name="fas fa-exclamation-circle" dense color="negative" flat></q-icon>
          <span class="text-body2 text-negative q-pl-sm">กรุณาเลือกสิทธิ์อย่างน้อยหนึ่งสิทธิ๋</span>
        </div>
        <div class="text-center q-gutter-lg q-pt-md">
          <q-btn @click="cancelBtn()" outline color="cyan-8" class="boxSave" label="ยกเลิก" />
          <q-btn @click="saveBtn()" color="cyan-8" class="boxSave" label="บันทึก" />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { db, axios } from "../router";
export default {
  data() {
    return {
      all: false,
      isEroorOptions: false,
      department: {
        name: "",
        email: "",
        password: "",
        sanctionGroup: [],
        uid: "test"
      },
      sanctionOptions: [
        {
          label: "KPI",
          value: "kpi"
        },
        {
          label: "รายงาน",
          value: "report"
        },
        {
          label: "พนักงาน",
          value: "person"
        },
        {
          label: "รางวัล",
          value: "reward"
        }
      ]
    };
  },
  methods: {
    loadEdit() {
      db.collection("user_admin")
        .doc(this.$route.params.key)
        .get()
        .then(doc => {
          doc.data().sanctionGroup.filter((x, index) => {
            if (index == 3) {
              this.all = true;
            }
          });
          this.department = doc.data();
        });
    },
    checkAll() {
      this.department.sanctionGroup.filter((x, index) => {
        if (index == 3) {
          this.all = true;
        } else {
          this.all = false;
        }
      });
    },
    sanctionAll() {
      if (this.all) {
        this.isEroorOptions = false;
        this.sanctionOptions.filter(x => {
          this.department.sanctionGroup.push(x.value);
        });
      } else {
        this.sanctionOptions.filter(x => {
          this.department.sanctionGroup = [];
        });
      }
    },
    cancelBtn() {
      this.$router.push("/departmentMain");
    },
    isValidEmail(val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "รูปแบบ E-mail ไม่ถูกต้อง";
    },
    async isCheckEmail(val) {
      if (this.$route.name != "departmentEdit") {
        let doc = await db
          .collection("user_admin")
          .where("email", "==", val)
          .get();
        return !doc.size || "E-mail นี้มีผู้ใช้งานแล้ว";
      }
    },
    async saveBtn() {
      this.$refs.name.validate();
      this.$refs.gmail.validate();
      this.$refs.password.validate();
      if (
        this.$refs.name.hasErrors ||
        this.$refs.gmail.hasError ||
        this.$refs.password.hasError
      ) {
      }
      if (
        this.department.name == "" ||
        this.department.email == "" ||
        this.department.password == ""
      ) {
        if (this.department.sanctionGroup == "") {
          this.isEroorOptions = true;
          return;
        }
        return;
      }

      if (this.$route.name == "departmentAdd") {
        // let jsonString = JSON.stringify(this.department);
        // const url = ``;

        // let getCreateUser = await axios.get(url);

        // let newDataUser = { ...this.dataUser };
        // delete newDataUser.password;
        // this.department.uid = getCreateUser.data.uid;
        let genCode = Math.random()
          .toString(36)
          .substring(7);
        this.department.loginKey = genCode;
        db.collection("user_admin").add(this.department);
        this.$router.push("/departmentMain");
      } else {
        if (this.all) {
          this.department.sanctionGroup = ["kpi", "report", "person", "reward"];
        }
        db.collection("user_admin")
          .doc(this.$route.params.key)
          .set(this.department);
        this.$router.push("/departmentMain");
      }
    }
  },
  mounted() {
    if (this.$route.name == "departmentEdit") {
      this.loadEdit();
    }
  }
};
</script>

<style scoped>
.boxSave {
  max-width: 120px;
  width: 100%;
}
</style>