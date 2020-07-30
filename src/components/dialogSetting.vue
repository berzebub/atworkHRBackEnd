<template>
  <div>
    <q-dialog v-if="type == 1" v-model="successData" persistent>
      <div class="bg-white row q-pa-lg" align="center" style="width:400px ">
        <div class="col-12 q-pt-md">
          <q-btn outline round color="cyan-8" icon="fas fa-trash-alt" size="12px" />
          <span class="text-h6 q-pl-md">ยืนยันการลบรายชื่อ</span>
        </div>
        <div class="col-12 text-subtitle1 q-pt-md">คุณต้องการลบ "{{ name }}"</div>

        <div class="col-6 q-pr-sm q-pt-lg" align="right">
          <q-btn
            @click="emitCancel()"
            v-close-popup
            outline
            color="cyan-8"
            label="ยกเลิก"
            style="width:120px"
          />
        </div>
        <div class="col-6 q-pl-sm q-pt-lg" align="left">
          <q-btn @click="emitValue()" color="cyan-8" label="ยืนยัน" style="width:120px" />
        </div>
      </div>
    </q-dialog>
    <q-dialog v-if="type == 2" v-model="successData" persistent>
      <div class="bg-white row q-pa-lg" align="center" style="width:400px ">
        <div class="col-12 q-pt-md">
          <!-- <q-btn outline round color="blue-10" icon="far fa-check-circle" size="12px" /> -->
          <q-icon color="blue-10" size="24px" name="far fa-check-circle" />
          <span class="text-h6 q-pl-md">สำเร็จ</span>
        </div>
        <div class="col-12 text-subtitle1 q-pt-md">{{ name }}</div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: ["type", "name"],
  data() {
    return {
      successData: true,
    };
  },
  methods: {
    emitValue() {
      this.$emit("emitConfirmDelete", false);
    },
    emitCancel() {
      this.$emit("emitCancelDelete", false);
    },
  },
  mounted() {
    let stoTypeList = [2, 4];

    if (stoTypeList.includes(this.type)) {
      setTimeout(() => {
        this.successData = false;
      }, 1300);
      setTimeout(() => {
        this.$emit("autoClose");
      }, 1500);
    }
  },
};
</script>

<style scoped>
</style>