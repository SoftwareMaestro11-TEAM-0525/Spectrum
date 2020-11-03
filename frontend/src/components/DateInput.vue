<template>

</template>

<script>
export default {
  name: "DateInput.vue",
  data() {
    return {
      start: "",
      end: ""
    };
  },
  methods: {
    handleStartDate() {
      this.$emit("handleStartDate", this.start);
    },
    handleEndDate() {
      this.$emit("handleendDate", this.end);
    }
  }
};
</script>

<style scoped lang="scss">

</style>
