<template>
  <div class="container">
    <nav-bar :isMain="false"></nav-bar>
    <div class="wrapper">
      <input
        type="text"
        name="title"
        placeholder="제목을 입력해 주세요."
        v-model="titleString"
      />
      <div class="date">
        <div class="dataWrapper">
          <div>
            <div><b>날짜 등록</b></div>
            <div>수행한 날짜를 입력해주세요.</div>
          </div>
          <div>
            <div>
              <label>시작일</label>
              <flat-pickr
                v-model="date.start"
                :config="date.config.start"
                @on-change="onStartDateChange"
              ></flat-pickr>
            </div>
            <span>~</span>
            <div>
              <label>종료일</label>
              <flat-pickr
                v-model="date.end"
                :config="date.config.end"
                @on-change="onEndDateChange"
              ></flat-pickr>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div class="tag">
        <div><b>태그</b></div>
        <div class="tagInput" :class="{ focus: isTagFocus }">
          <ul>
            <li v-for="(tag, index) in tags" :key="tag.text">
              {{ tag.text }}<span @click="removeTagItem(index)">&#x2715;</span>
            </li>
          </ul>
          <input
            type="text"
            placeholder="키워드를 입력하고 엔터를 눌러 태그를 추가해주세요."
            @focus="tagInputFocus()"
            @blur="tagInputBlur()"
            v-on:input="tagTyping"
            @keypress.enter="addTagItem"
          />
        </div>
        <div><b>Create</b>{{ tagString }}</div>
      </div>
      <div class="content" v-if="$route.params.type === 'general'">
        <div><b>내용</b></div>
        <div class="editor" ref="editor"></div>
      </div>
      <div class="attach" v-if="$route.params.type === 'file'">
        <div><b>첨부파일</b></div>
        <div>
          <input
            type="text"
            readonly
            placeholder="선택된 파일 없음"
            v-model="fileURL"
          />
          <button @click="attachFile"><b>파일 추가</b></button>
        </div>
      </div>
      <div class="link" v-if="$route.params.type === 'link'">
        <div><b>링크</b></div>
        <input
          type="text"
          placeholder="URL을 입력해 주세요."
          v-model="linkURL"
        />
      </div>
      <div class="lock">
        <div><b>공개 여부</b></div>
        <div class="lockUI">
          <div
            :style="lockStyle.unlock"
            @click="toggleLock($event, 'unlock')"
          ></div>
          <div
            :style="lockStyle.lock"
            @click="toggleLock($event, 'lock')"
          ></div>
        </div>
      </div>
      <div>
        <button @click="submit">입력 완료</button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import Quill from "quill";
import ArticleService from "@/services/article.service";
import FileService from "@/services/file.service";
import flatPickr from "vue-flatpickr-component";
import { Korean } from "flatpickr/dist/l10n/ko.js";
import ImageUploader from "quill-image-uploader";

export default {
  name: "input.vue",
  components: {
    NavBar,
    flatPickr
  },
  mounted() {
    if (this.$route.params.type !== "general") return;
    let options = {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],

          ["bold", "italic", "underline"], // toggled buttons
          ["blockquote", "code-block"],

          [{ list: "ordered" }, { list: "bullet" }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ align: [] }],
          ["link", "image"]
        ],
        imageUploader: {
          upload: file => {
            return new Promise((resolve, reject) => {
              const formData = new FormData();
              formData.append("file", file);
              formData.append("user_id", "0");
              formData.append("node_id", "0");

              FileService.post(formData)
                .then(result => {
                  console.log(result);
                  resolve(result.location);
                })
                .catch(error => {
                  reject("이미지 업로드 실패");
                  console.error("Error:", error);
                });
            });
          }
        }
      },
      theme: "snow",
      bounds: ".editor"
    };
    Quill.register("modules/imageUploader", ImageUploader);
    this.editor = new Quill(this.$refs.editor, options);
  },
  data() {
    return {
      titleString: "",
      date: {
        start: null,
        end: null,
        config: {
          start: {
            dateFormat: "Y-m-d",
            locale: Korean,
            minDate: new Date(),
            maxDate: null
          },
          end: {
            dateFormat: "Y-m-d",
            locale: Korean,
            minDate: null
          }
        }
      },
      tags: [],
      isLock: false,
      linkURL: "",
      fileURL: "",

      isTagFocus: false,
      tagString: "",
      editor: null,
      isDataError: false,
      lockStyle: {
        unlock: {
          backgroundImage:
            "url(" +
            require("@/assets/image/icon-lock/icon-selected-unlock.svg") +
            ")"
        },
        lock: {
          backgroundImage:
            "url(" +
            require("@/assets/image/icon-lock/icon-unselected-lock.svg") +
            ")"
        }
      }
    };
  },
  methods: {
    submit: async function() {
      if (!this.titleString) {
        alert("제목을 입력해 주세요.");
        return;
      }

      if (!this.date.start || !this.date.end) {
        alert("날짜를 올바르게 입력해 주세요.");
        return;
      }

      if (!this.tags || this.tags.length === 0) {
        alert("하나 이상의 태그를 입력해 주세요.");
        return;
      }

      if (this.$route.params.type === "general") {
        // Content 검증
      }

      // if (this.$route.params.type === "file") {
      // }

      await ArticleService.postArticles({
        userID: this.$store.state.auth.user.user_id,
        nodeID: -this.$store.state.mindmap.elements.nodes.length,
        type: this.$route.params.type,
        title: this.titleString,
        startDate: this.date.start,
        endDate: this.date.end,
        content: "이건 샘플 콘텐츠입니다!!", // 추후 처리 필요
        keyword: this.tags,
        webURL: this.linkURL,
        fileURL: this.fileURL,
        isSecret: this.isLock
      }).then(
        () => {
          const targetNodeId = (-this.$store.state.mindmap.elements.nodes
            .length).toString();
          this.$store.dispatch("mindmap/addMindmapNode", {
            id: targetNodeId,
            name: this.titleString
          });
          this.$store.dispatch("mindmap/addMindmapEdge", {
            id: (
              this.$store.state.mindmap.elements.edges.length + 1
            ).toString(),
            target: targetNodeId,
            source: this.$route.query.nodeID
          });
          this.$store
            .dispatch("mindmap/patchMindmapData", {
              userID: this.$store.state.auth.user.user_id
            })
            .then(
              () => {
                alert("글 작성 성공!");
                this.$router.push({ name: "Main" });
              },
              err => {
                return Promise.reject(err);
              }
            );
        },
        err => {
          alert("글 작성에 실패했습니다. 다시 시도해주세요.");
          console.log(err);
        }
      );

      await this.$store.dispatch("mindmap/addMindmapNode", {});
    },
    onStartDateChange(selectedDates, dateStr) {
      this.date.config.end.minDate = dateStr;
    },
    onEndDateChange(selectedDates, dateStr) {
      this.date.config.start.maxDate = dateStr;
    },
    handleStartDate(e, value) {
      this.startDate = value;
    },
    handleEndDate(e, value) {
      this.endDate = value;
    },
    tagInputFocus: function() {
      this.isTagFocus = true;
    },
    tagInputBlur: function() {
      if (this.tagString) return;
      this.isTagFocus = false;
    },
    addTagItem: function(e) {
      this.tags.push({ text: this.tagString });
      this.tagString = "";
      e.target.value = "";
    },
    removeTagItem: function(idx) {
      this.tags.splice(idx, 1);
    },
    attachFile: function() {},
    tagTyping: function(e) {
      this.tagString = e.target.value;
    },
    toggleLock: function(e, target) {
      if (target === "lock" && !this.isLock) {
        this.isLock = true;
        this.lockStyle.lock.backgroundImage =
          "url(" +
          require("@/assets/image/icon-lock/icon-selected-lock.svg") +
          ")";
        this.lockStyle.unlock.backgroundImage =
          "url(" +
          require("@/assets/image/icon-lock/icon-unselected-unlock.svg") +
          ")";
      } else if (target === "unlock" && this.isLock) {
        this.isLock = false;
        this.lockStyle.lock.backgroundImage =
          "url(" +
          require("@/assets/image/icon-lock/icon-unselected-lock.svg") +
          ")";
        this.lockStyle.unlock.backgroundImage =
          "url(" +
          require("@/assets/image/icon-lock/icon-selected-unlock.svg") +
          ")";
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../node_modules/quill/dist/quill.snow.css";
@import "../../../node_modules/flatpickr/dist/flatpickr.css";

.container {
  height: auto;
  min-height: 100vh;
}

.wrapper {
  width: 786px;
  margin: 64px auto;
  height: calc(100% - 64px);
  padding-top: 50px;

  input[name="title"] {
    width: 100%;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #ededed;
    font-size: 30px;
    padding: 15px 0;
    outline: none;
    margin-bottom: 48px;

    &::placeholder:after {
      content: "*";
      color: #ed4956;
    }
  }

  .tag {
    margin-bottom: 54px;

    > div > b {
      font-size: 15px;
    }

    .tagInput {
      width: 100%;
      height: 46px;
      border: solid 1px #ededed;
      margin: 10px 0 0 0;
      display: flex;
      justify-content: space-between;
      padding-left: 8px;
      border-radius: 6px;
      box-sizing: border-box;
      background-color: #ffffff;
      align-items: center;

      ul {
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: row;
        list-style: none;

        li {
          height: 30px;
          border-radius: 6px;
          background-color: #424242;
          margin-right: 10px;
          color: #ffffff;
          padding: 0 10px;
          font-size: 13px;
          line-height: 30px;

          span {
            margin-left: 4px;
            font-size: 13px;
            cursor: pointer;
          }
        }
      }

      input {
        height: 100%;
        border: none;
        outline: none;
        caret-color: #f65c6c;
        background-color: transparent;
        padding: 0;
        font-size: 13px;
        flex: 1;
      }
    }

    .focus {
      box-shadow: 0 -1px 10px 0 rgba(54, 54, 54, 0.15);
      background-color: #f7f7f5;
      border: 1px solid transparent;
      border-bottom: 1px solid #ededed;
      border-radius: 6px 6px 0 0;
    }

    .tagInput + div {
      display: none;
      width: 100%;
      height: 46px;
      box-shadow: 0 6px 10px 0 rgba(54, 54, 54, 0.15);
      padding-left: 12px;
      background-color: #ffffff;
      border-radius: 0 0 6px 6px;
      box-sizing: border-box;
      align-items: center;

      b {
        margin-right: 6px;
      }
    }

    .focus + div {
      display: flex;
    }
  }

  .content {
    margin-bottom: 54px;

    > div {
      margin-bottom: 10px;

      > b {
        font-size: 15px;
      }
    }

    .editor {
      height: 150px;
      background-color: white;
      border-radius: 0 0 6px 6px;
      font-size: 14px;
      border: 1px solid #ededed;
      color: #363636;
      overflow-y: scroll;
    }
  }

  .date {
    width: 100%;
    margin-bottom: 32px;

    .dataWrapper {
      width: 100%;
      display: flex;
      justify-content: space-between;

      > div:nth-child(1) {
        display: flex;
        justify-content: center;
        flex-direction: column;

        > div:nth-child(1) {
          font-size: 15px;
          color: #363636;
        }

        > div:nth-child(2) {
          font-size: 12px;
          color: #a3a3a3;
        }
      }

      > div:nth-child(2) {
        > div {
          display: inline-block;

          label {
            display: block;
            font-size: 12px;
            color: #363636;
            margin-bottom: 4px;
          }

          input {
            width: 172px;
            height: 36px;
            border: 1px solid #ededed;
            outline: none;
            font-size: 15px;
            text-align: center;
          }
        }

        span {
          margin: 0 10px;
          font-size: 15px;
        }
      }
    }
  }

  .attach {
    display: flex;
    justify-content: space-between;
    margin-bottom: 54px;

    div:nth-child(1) {
      display: flex;
      align-items: center;
      font-size: 15px;
    }

    div:nth-child(2) {
      font-size: 13px;

      input {
        width: 294px;
        height: 36px;
        box-sizing: border-box;
        outline: none;
        padding: 0 0 0 16px;
        border-radius: 6px;
        border: solid 1px #ededed;
        margin-right: 12px;
        color: #363636;
      }

      button {
        width: 72px;
        height: 36px;
        vertical-align: middle;
        border-radius: 6px;
        border: none;
        background-color: #f0f0f0;
        outline: none;
        cursor: pointer;
      }
    }
  }

  .link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 54px;

    input {
      width: 376px;
      height: 36px;
      border-radius: 6px;
      border: solid 1px #ededed;
      background-color: #ffffff;
      box-sizing: border-box;
      padding-left: 16px;
    }
  }

  .lock {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 54px;

    .lockUI > div {
      width: 36px;
      height: 36px;
      display: inline-block;
      cursor: pointer;
    }

    .lock-sel {
      background-image: url("~@/assets/image/icon-lock/icon-selected-lock.svg");
    }

    .lock-unsel {
      background-image: url("~@/assets/image/icon-lock/icon-unselected-lock.svg");
    }

    .unlock-sel {
      background-image: url("~@/assets/image/icon-lock/icon-selected-unlock.svg");
    }

    .unlock-unsel {
      background-image: url("~@/assets/image/icon-lock/icon-unselected-unlock.svg");
    }
  }

  > div:last-child {
    button {
      margin: 0 auto;
      width: 105px;
      height: 40px;
      border-radius: 8px;
      background-color: #524fff;
      outline: none;
      cursor: pointer;
      color: white;
      border: none;
      font-size: 15px;
      display: block;

      &:hover {
      }
    }
  }
}
</style>

<style lang="scss">
.ql-toolbar {
  background-color: white;
  border-radius: 6px 6px 0 0;
  border: 1px solid #ededed !important;
}
</style>
