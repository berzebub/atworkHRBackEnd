<template>
  <q-page class="container">
    <div class="q-pa-md">
      <div class="text-right">
        <div>
          <span class="q-px-lg">การใช้งานระบบรางวัล</span>
          <toggle-button
            :labels="{ checked: 'เปิดใช้งาน', unchecked: 'ปิดใช้งาน' }"
            :height="40"
            :width="140"
            :color="{
          checked: ['#0097A7'  ],
          unchecked: ['#909090']
        }"
            :font-size="16"
            v-model="status"
            @change="loadRewardList()"
          />
        </div>
      </div>
    </div>
    <div class="q-mx-md row justify-between">
      <div class="row modeBox brx q-mb-md">
        <div class="q-px-md col self-center">
          <q-radio
            color="cyan-8"
            @input="mode"
            v-model="showMode"
            val="person"
            label="ชื่อพนักงาน"
          />
        </div>
        <div class="q-px-md col self-center">
          <q-radio color="cyan-8" @input="mode" v-model="showMode" val="reward" label="ของรางวัล" />
        </div>
      </div>
      <div>
        <div class="q-mb-md">
          <q-select
            style="width:330px"
            outlined
            dense
            v-model="department"
            :options="departmentOptions"
          />
        </div>
      </div>
    </div>
    <div class="q-px-md relative-position">
      <q-table :data="rewardList" :columns="columnsAll" row-key="name" binary-state-sort>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">{{ props.row.name }}</q-td>
            <q-td key="photo" :props="props">
              <div class="row justify-center">
                <div class="brx" style="width:180px;height:180px"></div>
              </div>
            </q-td>
            <q-td key="number" :props="props">{{ props.row.number }}</q-td>
            <q-td key="history" :props="props">
              <q-btn icon="fas fa-file-alt" round color="cyan-8" />
            </q-td>
            <q-td key="reward" :props="props">
              <q-btn icon="fas fa-trash-alt" round color="cyan-8" />
              <q-btn v-if="!status" class="absolute-center backDrop"></q-btn>
            </q-td>
            <q-td key="edit" :props="props">
              <q-btn icon="fas fa-trash-alt" round color="cyan-8" />
            </q-td>
            <q-td key="delete" :props="props">
              <q-btn icon="fas fas fa-edit" round color="cyan-8" />
            </q-td>
            <q-td key="status" :props="props">
              <q-btn icon="fas fa-file-alt" round color="cyan-8" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      status: true,
      showMode: "person",
      department: "ชื่อพนักงาน",
      departmentOptions: [
        {
          label: "ชื่อพนักงาน",
          value: "person"
        },
        {
          label: "ของรางวัล",
          value: "reward"
        }
      ],
      columnsAll: [],
      rewardList: [],
      columnsPerson: [
        { name: "name", label: "ชื่อ-สกุล", align: "left" },
        { name: "number", label: "จำนวนดาว", align: "center" },
        {
          style: "width: 120px",
          name: "history",
          label: "ประวัติการแลก",
          align: "center"
        },
        {
          style: "width: 120px",
          name: "reward",
          label: "แลกรางวัล",
          align: "center"
        }
      ],
      columnsReward: [
        { name: "name", label: "ของรางวัล", align: "left" },
        { name: "photo", label: "รูป", align: "center" },
        { name: "number", label: "จำนวนดาว", align: "center" },
        {
          style: "width: 120px",
          name: "delete",
          label: "ลบ",
          align: "center"
        },
        {
          style: "width: 120px",
          name: "edit",
          label: "แก้ไข",
          align: "center"
        },
        {
          style: "width: 120px",
          name: "status",
          label: "เปิด/ปิด",
          align: "center"
        }
      ]
    };
  },
  methods: {
    loadRewardList() {
      console.log("www");
    },
    mode() {
      if (this.showMode == "person") {
        this.rewardList = [
          {
            name: "นันทนา เศรษฐี",
            number: 337,
            history: "6%",
            reward: "7%"
          },
          {
            name: "นันทนา เศรษฐี",
            number: 337,
            history: "6%",
            reward: "7%"
          }
        ];
        this.columnsAll = this.columnsPerson;
      } else {
        this.rewardList = [
          {
            name: "awdwdawd",
            number: 337,
            edit: "6%",
            reward: "7%"
          },
          {
            name: "qqqqqqq",
            number: 337,
            edit: "6%",
            delete: "7%"
          }
        ];
        this.columnsAll = this.columnsReward;
      }
    }
  },
  mounted() {
    this.mode();
  }
};
</script>

<style  scoped>
.modeBox {
  width: 330px;
  height: 40px;
  border: 1px solid #9e9e9e;
}
.backDrop {
  width: 40px;
  height: 40px;
  background-color: black;
  opacity: 0.3;
  z-index: 10;
  border-radius: 100%;
}
</style>