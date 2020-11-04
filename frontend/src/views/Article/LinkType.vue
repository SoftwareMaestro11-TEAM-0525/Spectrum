<template>
  <div class="body">
    <div class="linkButton">
      <img src="~@/assets/image/link.png" alt="링크 아이콘" class="icon" />
      <div class="content">
        <span class="url">
          https://notefolio.net/?work_categories=&orderrrrrrrrrrrrr
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
  name: "LinkType"
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
  height: 65px;
  border: 1px solid #ededed;
  cursor: pointer;
  padding: 20px;
  align-items: center;
  display: flex;

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
      width: 290px;
      white-space: nowrap;
      font-size: 14px;
      color: #363636;
      overflow: hidden;
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
