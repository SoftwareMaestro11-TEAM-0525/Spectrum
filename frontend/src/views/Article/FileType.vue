<template>
  <div class="body">
    <div class="fileButton">
      <img src="~@/assets/image/file.png" alt="파일 아이콘" class="fileIcon" />
      <div class="content">
        <div class="fileName">file_name.exe</div>
        <div class="fileSize">1MB</div>
      </div>
      <img
        src="~@/assets/image/download.png"
        alt="다운로드 아이콘"
        class="downloadIcon"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "FileType"
};
</script>

<style scoped lang="scss">
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fileButton {
  width: 350px;
  height: 70px;
  border: 1px solid #ededed;
  cursor: pointer;
  padding: 20px;
  align-items: center;
  display: flex;
  box-sizing: border-box;

  .fileIcon {
    width: 32px;
    height: 32px;
    display: inline-block;
    object-fit: contain;
    margin-right: 20px;
  }

  .content {
    flex-grow: 1;
    display: inline-flex;
    flex-direction: column;

    .fileName {
      font-size: 15px;
      color: #363636;
      margin-bottom: 4px;
    }

    .fileSize {
      font-size: 13px;
      color: #a3a3a3;
    }
  }

  .downloadIcon {
    width: 32px;
    height: 32px;
    display: inline-block;
    object-fit: contain;
  }
}
</style>
