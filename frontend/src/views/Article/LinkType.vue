<template>
  <div class="body">
    <div class="linkButton" @click="open">
      <img src="~@/assets/image/link.png" alt="링크 아이콘" class="icon" />
      <div class="content">
        <span class="url">
          {{ urlstring }}
        </span>
        <div class="tooltip">
          링크로 이동
          <img src="~@/assets/image/gray-right-arrow.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LinkType",
  props: ["urlstring"],
  methods: {
    open() {
      window.open(this.urlstring);
    }
  }
};
</script>

<style scoped lang="scss">
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.linkButton {
  width: 350px;
  height: 90px;
  border: 1px solid #ededed;
  cursor: pointer;
  padding: 20px;
  align-items: center;
  display: flex;
  box-sizing: border-box;

  .icon {
    width: 32px;
    height: 32px;
    display: inline-block;
    object-fit: contain;
    margin-right: 20px;
  }

  .content {
    display: inline-flex;
    flex-direction: column;

    .url {
      text-overflow: ellipsis;
      width: 270px;
      white-space: nowrap;
      font-size: 14px;
      color: #363636;
      overflow: hidden;
      margin-bottom: 8px;
    }

    .tooltip {
      font-size: 14px;
      color: #a3a3a3;
      img {
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>
