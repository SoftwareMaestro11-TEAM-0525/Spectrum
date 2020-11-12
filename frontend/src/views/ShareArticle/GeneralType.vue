<template>
  <div class="body" v-html="convertedContent"></div>
</template>

<script>
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

export default {
  name: "GeneralType",
  props: ["content"],
  data() {
    return {
      convertedContent: null
    };
  },
  mounted() {
    const converter = new QuillDeltaToHtmlConverter(
      JSON.parse(this.content).ops,
      {}
    );

    this.convertedContent = converter.convert();
  }
};
</script>

<style scoped></style>
