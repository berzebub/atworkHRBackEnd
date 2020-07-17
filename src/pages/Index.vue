<template>
  <q-page class="flex flex-center">
  
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
      db.collection("test").add({ test: 1234 });
    }
  }
};
</script>
