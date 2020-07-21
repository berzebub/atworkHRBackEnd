<template>
  <div>
    <div @click="gen()" class="absolute-center">
      <q-btn size="30px" label="GENDATA" color="negative"></q-btn>
    </div>
  </div>
</template>

<script>
import { db } from "../router";
export default {
  data() {
    return {};
  },
  methods: {
    gen() {
      let genDepartmentTemp = {
        hotelId: "ITNxdT5zAb0Mq6AyhPfd",
        name: "ห้องอาหาร"
      };
      let genEmployeeTemp = {
        departmentId: "IoCA4OEte02K8dZUkMnW",
        hotelId: "ITNxdT5zAb0Mq6AyhPfd",
        startLevelId: "vg4mEOkmTJFCLuzuCN9p",
        uid: "Q63BSlqdFMhI8gK6FVYz9gpBeQP2",
        email: "test@test.com",
        name: "test",
        tel: "0956365478",
        star: 0
      };
      let genLevelTemp = {
        name: "พนักงานต้อนรับ",
        status: true
      };
      let genHotelTemp = {
        adminName: "tatum",
        daminPhone: "0956686593",
        email: "test@test.com",
        name: "TESTHOTEL",
        password: "123456"
      };
      let genKpiLogTemp = {
        hotelId: "ITNxdT5zAb0Mq6AyhPfd",
        departmentId: "IoCA4OEte02K8dZUkMnW",
        numOfPractice: 0,
        numOfStar: 0,
        month: "มกราคม",
        year: "2563",
        filter: ""
      };
      db.collection("department")
        .add(genDepartmentTemp)
        .then(() => {
          this.$router.push("/kpi");
        });

      db.collection("employee")
        .add(genEmployeeTemp)
        .then(() => {
          this.$router.push("/kpi");
        });

      db.collection("level")
        .add(genLevelTemp)
        .then(() => {
          this.$router.push("/kpi");
        });
      db.collection("hotel")
        .add(genHotelTemp)
        .then(() => {
          this.$router.push("/kpi");
        });
      db.collection("kpiLog")
        .add(genKpiLogTemp)
        .then(() => {
          this.$router.push("/kpi");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>