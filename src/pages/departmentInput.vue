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
            ref="email"
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
            @input="checkAll()"
            value
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
import { GoBack } from "quasar";
export default {
  data() {
    return {
      isPwd: true,
      all: false,
      isPasswordEroor: false,
      isEroorOptions: false,
      department: {
        displayName: "",
        email: "",
        password: "",
        userGroup: [],
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
      this.department.displayName = this.$route.params.displayName
      this.department.email = this.$route.params.email
      this.department.userGroup = this.$route.params.customClaims.dataEntryPermissions;
      if (this.department.userGroup.length == 4) {
        this.all = true;
      }
    },
    checkAll() {
      this.isEroorOptions = false;
      if (this.department.userGroup.length == this.permissions.length) {
        this.all = true;
      } else {
        this.all = false;
      }
    },
    sanctionAll() {
      if (this.all) {
        let test = this.permissions.map((x) => {
          return x.value;
        });
        this.department.userGroup = test;
        this.isEroorOptions = false;
      } else {
        this.department.userGroup = [];
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
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (
        this.$refs.name.hasErrors ||
        this.$refs.email.hasError ||
        this.$refs.password.hasError || 
        this.department.userGroup.length == 0
      ) {
          this.isEroorOptions = true;
          return
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
          hotelId: this.hotelId,
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

        let isHrAdmin = false;
        if (this.$route.params.customClaims.isHrAdmin) {
          isHrAdmin = true;
        }

        let apiURL =
          "https://us-central1-atwork-dee11.cloudfunctions.net/atworkFunctions/user/hrUpdate";
        const updateData = {
          uid: this.$route.params.uid,
          displayName: this.department.displayName,
          dataEntryPermissions: this.department.userGroup,
          accessProgram: ["HR"],
          hotelId: this.hotelId,
          isHrAdmin: isHrAdmin,
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
      if (this.$route.params.displayName == undefined) {
        this.$router.push("departmentMain");
      } else {
        this.loadEdit();
      }
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