<template>
  <q-page class="flex flex-center">
    <q-btn @click="test()"></q-btn>
  </q-page>
</template>

<script>
import { db } from "../router/index";
export default {
  name: "PageIndex",
  data() {
    return {};
  },
  methods: {
    test() {
      db.collection("employee")
        .get()
        .then((data) => {
          console.log(data);
        });
    },
  },
};
</script>
