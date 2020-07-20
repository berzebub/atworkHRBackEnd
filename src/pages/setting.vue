<template>
  <q-page>
    <div class="row">
      <div style="width:360px " class="shadow-1">
        <div class="bg-blue-10 text-white text-h6 row items-center shadow-5" style="height:56px">
          <span class="q-ml-lg">ตั้งค่า</span>
        </div>
        <div class="row" style="height:calc(100vh - 56px)">
          <div class="col-12">
            <div class="col-12 row items-center q-pa-md">
              <div class="text-subtitle1 col-10">ชื่อ - นามสกุล</div>
              <div class="col" align="right">
                <q-icon name="fas fa-chevron-right"></q-icon>
              </div>
            </div>
            <q-separator />

            <div class="col-12 row items-center q-pa-md">
              <div class="text-subtitle1 col-10">รหัสผ่าน</div>
              <div class="col" align="right">
                <q-icon name="fas fa-chevron-right"></q-icon>
              </div>
            </div>
            <q-separator />
          </div>
          <div class="col-12 self-end">
            <q-separator />
            <div class="col-12 row items-center q-pa-md">
              <q-icon size="md" name="fas fa-sign-out-alt"></q-icon>
              <span class="text-subtitle1 q-pl-sm">ออกจากระบบ</span>
            </div>
          </div>
        </div>
      </div>
      <div>555</div>
      <!-- <div class="absolute-center cursor-pointer">
      <q-btn @click="$router.push('/')" label=" TEST LOGOUT" color="red" size="50px" />
      </div>-->
    </div>
  </q-page>
</template>

<script>
export default {};
</script>

<style ></style>
