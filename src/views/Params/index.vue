<template>
  <div>
    <ParamsHead />
    <ParamsList />
    <ParamsAdd />
  </div>
</template>

<script>
import ParamsList from "./ParamsList.vue";
import ParamsHead from "./ParamsHead.vue";
import ParamsAdd from "./ParamsAdd.vue"
export default {
  components: {
    ParamsList,
    ParamsHead,
    ParamsAdd
  },
};
</script>

<style>
</style>