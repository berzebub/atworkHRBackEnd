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
          <q-input ref="gmail" dense outlined v-model="department.gmail" :rules="[val => !!val]" />
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
            @input="isEroorOptions = false "
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
import { db, auth } from "../router/index";
export default {
  data() {
    return {
      all: false,
      isEroorOptions: false,
      department: { name: "", gmail: "", password: "", sanctionGroup: [] },

      sanctionOptions: [
        {
          label: "KPI",
          value: "KPI"
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
    saveBtn() {
      this.$refs.name.validate();
      this.$refs.gmail.validate();
      this.$refs.password.validate();
      if (
        this.$refs.name.hasErrors ||
        this.$refs.gmail.hasError ||
        this.$refs.password.hasError
      ) {
      }
      if (this.department.sanctionGroup == "") {
        this.isEroorOptions = true;
        return;
      }
      db.collection("user_admin").add(this.department);
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