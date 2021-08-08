<template>
  <div>
    <ProductHead />
    <ProjectList />
    <Page />
    <AddProject />
    <ProductUpdate />
  </div>
</template>

<script>
import ProjectList from "./ProjectList.vue";
import Page from "./Page.vue";
import ProductHead from "./ProductHead.vue";
import AddProject from "./AddProject.vue"
import ProductUpdate from "./ProductUpdate.vue"

export default {
  name: "Project",
  components: {
    ProjectList,
    Page,
    ProductHead,
    AddProject,
    ProductUpdate
  },
};
</script>

<style>
</style>