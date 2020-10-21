<template>
  <div class="popup">
    <div class="header">
      <span>노드 종류를 선택해 주세요.</span>
      <div class="checkbox-wrapper">
        <div>
          <div>시작 노드로 설정</div>
          <div class="tooltip">
            이 노드를 경험이 시작되는 노드로 설정합니다.
          </div>
        </div>
        <div
          class="checkbox"
          :class="{ checked: isChecked }"
          @click="toggleCheckbox"
        ></div>
      </div>
    </div>
    <div class="select">
      <div
        class="item"
        data-item="General"
        :class="{ selected: nowSelected.isGeneralSelected }"
        @click="selectType"
      >
        <div>
          <i class="icon-general"></i>
          <div>일반</div>
        </div>
      </div>
      <div
        class="item"
        data-item="Link"
        :class="{ selected: nowSelected.isLinkSelected }"
        @click="selectType"
      >
        <div>
          <i class="icon-link"></i>
          <div>링크</div>
        </div>
      </div>
      <div
        class="item"
        data-item="File"
        :class="{ selected: nowSelected.isFileSelected }"
        @click="selectType"
      >
        <div>
          <i class="icon-file"></i>
          <div>파일</div>
        </div>
      </div>
    </div>
    <div class="buttons">
      <button class="cancel" @click="cancel">취소</button>
      <button class="confirm" @click="submit">확인</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputPopup",
  data() {
    return {
      isChecked: false,
      nowSelected: {
        isFileSelected: false,
        isLinkSelected: false,
        isGeneralSelected: false
      }
    };
  },
  props: ["nodeID"],
  methods: {
    toggleCheckbox: function() {
      this.isChecked = !this.isChecked;
    },
    selectType: function(e) {
      this.nowSelected.isGeneralSelected = false;
      this.nowSelected.isLinkSelected = false;
      this.nowSelected.isFileSelected = false;

      const itemData = e.currentTarget.getAttribute("data-item");
      eval("this.nowSelected.is" + itemData + "Selected = true;");
    },
    cancel: function() {
      this.$emit("cancelPopup", false, "");
    },
    submit: function() {
      const type = this.nowSelected;

      if (type.isGeneralSelected) {
        this.$router.push({ name: "Input", params: { type: "general"}, query: { isStart: (this.isChecked ? 'true' : 'false'), nodeID: this.nodeID }});
      } else if (type.isFileSelected) {
        this.$router.push({ name: "Input", params: { type: "file" }, query: { isStart: (this.isChecked ? 'true' : 'false') } });
      } else if (type.isLinkSelected) {
        this.$router.push({ name: "Input", params: { type: "link"}, query: { isStart: (this.isChecked ? 'true' : 'false') } });
      } else {
        alert("노드 종류를 선택해 주세요.");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 990px;
  height: 500px;
  border-radius: 6px;
  background-color: #ffffff;
  z-index: 1;
  border: 1px solid #ededed;
  .header {
    display: flex;
    justify-content: space-between;
    margin: 64px 100px 64px 100px;
    > span {
      font-size: 23px;
      font-weight: bold;
      color: #363636;
    }
    .checkbox-wrapper {
      display: flex;
      align-items: center;
      font-size: 15px;
      font-weight: bold;
      .checkbox {
        width: 24px;
        height: 24px;
        background-position: center center;
        background-size: contain;
        margin-left: 60px;
        background-image: url("../assets/image/icon-unchecked.svg");
        cursor: pointer;
      }
      .checked {
        background-image: url("../assets/image/icon-checked.svg");
      }
      .tooltip {
        font-size: 12px;
        font-weight: normal;
        color: #a3a3a3;
      }
    }
  }
  .select {
    display: flex;
    justify-content: space-around;
    margin: 0 64px 72px 64px;
    .item {
      width: 170px;
      height: 170px;
      border-radius: 50%;
      background-color: #f8f8f8;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      cursor: pointer;
      font-weight: bold;
      i {
        display: block;
        width: 45px;
        height: 45px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: contain;
        margin-bottom: 8px;
      }
    }
    .selected {
      background-color: #363636;
      color: white;
    }
  }
  .buttons {
    display: flex;
    justify-content: center;
    button {
      width: 76px;
      height: 44px;
      border-radius: 8px;
      color: white;
      font-size: 15px;
      border: none;
      outline: none;
      cursor: pointer;
      font-weight: bold;
    }
    .cancel {
      background-color: #d7d7d9;
      margin-right: 12px;
    }
    .confirm {
      background-color: #524fff;
    }
  }
}
.icon-general {
  background-image: url("../assets/image/icon-nodetype/icon-general.svg");
}
.selected .icon-general {
  background-image: url("../assets/image/icon-nodetype/icon-general-white.svg");
}
.icon-file {
  background-image: url("../assets/image/icon-nodetype/icon-file.svg");
}
.selected .icon-file {
  background-image: url("../assets/image/icon-nodetype/icon-file-white.svg");
}
.icon-link {
  background-image: url("../assets/image/icon-nodetype/icon-link.svg");
}
.selected .icon-link {
  background-image: url("../assets/image/icon-nodetype/icon-link-white.svg");
}
</style>
