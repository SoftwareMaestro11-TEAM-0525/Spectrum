<template>
  <div class="container">
    <nav-bar :isMainpage="false"></nav-bar>
    <div class="wrapper">
      <input type="text" name="title" placeholder="제목을 입력해 주세요.">
      <div class="date">
        <div>
          <div><b>날짜 등록</b></div>
          <div>수행한 날짜를 입력해주세요.</div>
        </div>
        <div>
          <div>
            <label for="start-date">시작일</label>
            <input type="text" id="start-date" name="start-date">
          </div>
          <span>~</span>
          <div>
            <label for="end-date">종료일</label>
            <input type="text" id="end-date" name="end-date">
            <div></div>
          </div>
        </div>
      </div>
      <div class="date-error">
        종료일이 시작일보다 이전입니다.
      </div>
      <div class="tag">
        <div><b>태그</b></div>
        <div class="tagInput" :class="{ focus: isTagFocus }">
          <ul><li v-for="(tag, index) in tags" :key="tag.text">{{ tag.text }}<span @click="removeTagItem(index)">&#x2715;</span></li></ul>
          <input type="text" placeholder="Add tag..."
                 @focus="tagInputFocus()" @blur="tagInputBlur()" v-on:input="tagTyping" @keypress.enter="addTagItem">
        </div>
        <div>
          <b>Create</b>{{ tagString }}
        </div>
      </div>
      <div class="content">
        <div><b>내용</b></div>
        <div class="editor" ref="editor"></div>
      </div>
      <div class="attach">
        <div><b>첨부파일</b></div>
        <div>
          <input type="text" readonly value="그림.jpg">
          <button @click="attachFile"><b>파일 추가</b></button>
        </div>
      </div>
      <div>
        <button>입력 완료</button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Quill from 'quill'

export default {
  name: "input.vue",
  components: {
    NavBar
  },
  mounted() {
    let options = {
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],

          ['bold', 'italic', 'underline'],        // toggled buttons
          ['blockquote', 'code-block'],

          [{ 'list': 'ordered'}, { 'list': 'bullet' }],

          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'align': [] }],
          ['link', 'image']
        ]
      },
      theme: "snow",
      bounds: ".editor"
    }
    this.editor = new Quill(this.$refs.editor, options)
  },
  data() {
    return {
      tagMsg: "",
      isTagFocus: false,
      tags: [
        { text: "떡볶이" },
        { text: "순대"}
      ],
      tagString: "",
      editor: null
    }
  },
  methods: {
    tagInputFocus: function() {
      this.isTagFocus = true;
    },
    tagInputBlur: function() {
      if (this.tagString) return;
      this.isTagFocus = false;
    },
    addTagItem: function(e) {
      this.tags.push({text : this.tagString})
      this.tagString = ""
      e.target.value = ""
    },
    removeTagItem: function(idx) {
      this.tags.splice(idx, 1)
    },
    attachFile: function () {

    },
    tagTyping: function(e) {
      this.tagString = e.target.value
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~quill/dist/quill.snow.css";

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
        content: '*';
        color: #ed4956;
      }
    }
    .date {
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
    .date-error {
      width: 100%;
      text-align: right;
      font-size: 12px;
      color: #ed4956;
      margin: 4px 0 32px 0;
    }
    .tag {
      margin-bottom: 54px;
      > div > b{
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
        ul{
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
      .tagInput+div {
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
      .focus+div {
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
    >div:last-child {
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
