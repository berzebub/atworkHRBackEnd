<template>
  <q-page class="container">
    <div align="center">
      <div class="q-pa-md text-left text-subtitle1" style="max-width:328px">
        <div>
          <span>ชื่อ นามสกุล</span>
          <q-input
            ref="name"
            dense
            outlined
            v-model="department.displayName"
            :rules="[val => !!val]"
          />
        </div>
        <div>
          <span>อีเมล</span>
          <q-input
            ref="gmail"
            type="email"
            :readonly="$route.name=='departmentEdit'"
            dense
            outlined
            v-model="department.email"
            :rules="[val => !!val 
          ,isValidEmail]"
          />
        </div>
        <div v-if="$route.name != 'departmentEdit'">
          <span>รหัสผ่าน</span>
          <div class="text-grey-6 text-body2">ไม่ต่ำกว่า 6 ตัวอักษร</div>
          <q-input
            ref="password"
            dense
            outlined
            v-model="department.password"
            :type="isPwd ? 'password' : 'text'"
            :rules="[val => !!val]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>
        <div v-else>
          <span>รหัสผ่าน</span>
          <div class="text-grey-6 text-body2">ไม่ต่ำกว่า 6 ตัวอักษร</div>
          <q-input ref="password" dense outlined value="123123123" readonly type="password"></q-input>
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
            v-model="department.userGroup"
            :options="permissions"
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
      isPwd: true,
      all: false,
      isPasswordEroor: false,
      isEroorOptions: false,
      department: {
        name: "",
        email: "",
        password: "",
        userGroup: [],
        uid: "test",
      },
      permissions: [
        {
          label: "KPI",
          value: "kpi",
        },
        {
          label: "รายงาน",
          value: "report",
        },
        {
          label: "พนักงาน",
          value: "personel",
        },
        {
          label: "รางวัล",
          value: "reward",
        },
      ],
    };
  },
  methods: {
    loadEdit() {
      this.department = this.$route.params;
      this.department.userGroup = this.$route.params.customClaims.dataEntryPermissions;
      this.department.hotelId = this.$q.localStorage.getItem("hotelId");
      console.log(this.department.hotelId);
      if (this.department.userGroup.length == 4) {
        this.all = true;
      }
    },
    checkAll() {
      this.department.userGroup.filter((x, index) => {
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
        this.permissions.filter((x) => {
          this.department.userGroup.push(x.value);
        });
      } else {
        this.permissions.filter((x) => {
          this.department.userGroup = [];
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
          .collection("user_hr")
          .where("email", "==", val)
          .get();
        return !doc.size || "E-mail นี้มีผู้ใช้งานแล้ว";
      }
    },
    isCheckPassword(val) {
      if (val.length < 6) {
        return val.length >= 6 || "";
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
        return;
      }

      if (
        this.department.displayName == "" ||
        this.department.email == "" ||
        this.department.password == "" ||
        this.department.userGroup == ""
      ) {
        if (this.department.userGroup == "") {
          this.isEroorOptions = true;
          return;
        }
        return;
      }

      this.loadingShow();
      if (this.$route.name == "departmentAdd") {
        let apiURL =
          "https://us-central1-atwork-dee11.cloudfunctions.net/atworkFunctions/user/create";
        let dataUser = {
          email: this.department.email,
          password: this.department.password,
          displayName: this.department.displayName,
          accessProgram: ["HR"],
          dataEntryPermissions: this.department.userGroup, //สิทธิ์การเข้าถึงเมนูในระบบ HR
          hotelId: this.department.hotelId,
        };

        let createUser = await axios.post(apiURL, dataUser);
        this.loadingHide();

        if (createUser.data.code) {
          //  ERROR
          return;
        }

        this.$router.push("/departmentMain");
      } else {
        if (this.all) {
          this.department.userGroup = ["kpi", "report", "personel", "reward"];
        }

        let apiURL =
          "https://us-central1-atwork-dee11.cloudfunctions.net/atworkFunctions/user/hrUpdate";
        const updateData = {
          uid: this.department.uid,
          displayName: this.department.displayName,
          dataEntryPermissions: this.department.userGroup,
          accessProgram: ["HR"],
          hotelId: this.department.hotelId,
        };
        let postData = await axios.post(apiURL, updateData);
        this.loadingHide();
        if (postData.data.code) {
          return;
        }

        this.$router.push("/departmentMain");
      }
    },
  },
  mounted() {
    if (this.$route.name == "departmentEdit") {
      this.loadEdit();
    }
  },
};
</script>

<style scoped>
.boxSave {
  max-width: 120px;
  width: 100%;
}
</style>