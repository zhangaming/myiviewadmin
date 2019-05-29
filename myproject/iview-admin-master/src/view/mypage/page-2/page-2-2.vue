<!-- 第二页 -->
<template>
  <div>
    <Card>
      <Row>
        <Col :span="24"
             style="margin-bottom:5px">
        <Button type="primary"
                @click="getList">刷新</Button>
        </Col>
        <Col :span="24">
        <i-table stripe
                 :columns="columns1"
                 :data="data1"></i-table>
        </Col>
      </Row>
    </Card>
    <Modal v-model="showModal"
           :title="titleModal"
           :width="800"
           @on-ok="ok"
           @on-cancel="cancel">
      <div class="html_show"
           v-html="articleHtml"></div>
    </Modal>
    <Modal v-model="editModal"
           title="修改文章"
           :width="1200"
           @on-ok="ok1"
           @on-cancel="cancel1">
      <div class="html_show">
        <Row class="one">
          <Col :span="8">
          <i-input v-model="title"
                   type="text"
                   style="width:200px"
                   placeholder="请输入题目"></i-input>
          </Col>
          <Col :span="8">
          <i-select :model.sync="type"
                    style="width:200px"
                    @on-change="selectChange">
            <Option-group label="测试">
              <i-option v-for="(item,index) in testList"
                        :value="item.value"
                        :key="index">{{ item.label }}</i-option>
            </Option-group>
            <Option-group label="vue">
              <i-option v-for="(item,index) in vueList"
                        :value="item.value"
                        :key="index">{{ item.label }}</i-option>
            </Option-group>
            <Option-group label="js">
              <i-option v-for="(item,index) in jsList"
                        :value="item.value"
                        :key="index">{{ item.label }}</i-option>
            </Option-group>
          </i-select>
          </Col>
          <Col :span="8">
          <Date-picker type="date"
                       placeholder="选择日期"
                       style="width: 200px"
                       @on-change="changeDate"></Date-picker>
          </Col>
        </Row>
        <div class="markdown-wrapper">
          <div class="plugins-tips">
            mavonEditor：基于Vue的markdown编辑器。 访问地址：
            <a href="https://github.com/hinesboy/mavonEditor"
               target="_blank">mavonEditor</a>
          </div>
          <mavon-editor v-model="content"
                        ref="md"
                        @imgAdd="$imgAdd"
                        @change="change"
                        style="min-height: 600px" />
        </div>
      </div>
    </Modal>

  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import axios from 'axios'
import qs from 'qs'
import 'mavon-editor/dist/css/index.css'
import url from '@/api/myapi.js'
export default {
  name: 'page_2_2',
  data () {
    return {
      editId: '',
      title: '',
      content: '',
      html: '',
      configs: {},
      testList: [
        {
          value: 'test',
          label: '测试'
        }
      ],
      vueList: [
        {
          value: 'vuex',
          label: 'vuex'
        }
      ],
      jsList: [
        {
          value: 'js',
          label: 'js'
        }
      ],
      type: '',
      date: '',
      showModal: false,
      editModal: false,
      articleHtml: '',
      titleModal: '',
      columns1: [
        {
          title: '题目',
          key: 'title'
        },
        {
          title: '类型',
          key: 'type'
        },
        {
          title: '阅读数',
          key: 'read'
        }, {
          title: '创建时间',
          key: 'createTime'
        }, {
          title: '更新时间',
          key: 'updateTime'
        },
        {
          title: 'Action',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Tooltip', { props: {
                content: '点击显示文章',
                placement: 'top'
              } }, [h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.row)
                  }
                }
              }, '显示')]),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.edit(params.row)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data1: [
        {
          id: 1,
          title: '测试',
          type: 'test',
          read: 1,
          createTime: '2000-01-01',
          updateTime: '2000-01-11'
        }
      ],
      total: 0,
      current: 0,
      pageSize: 10
    }
  },

  components: {
    mavonEditor
  },

  computed: {},

  mounted () {
    this.getList()
  },
  methods: {
    ok () {
      this.$Message.info('点击了确定')
      this.getList()
    },
    cancel () {
      this.$Message.info('点击了取消')
      this.getList()
    },
    ok1 () {
      console.log(this.type, this.date, this.title)
      if (!this.html || !this.content || !this.type || !this.date || !this.title || !this.editId) {
        this.$Message.info('请输入完整信息')
        return
      }
      let data = qs.stringify({
        id: this.editId,
        type: this.type,
        html: this.html,
        content: this.content,
        title: this.title,
        updateTime: this.date
      })
      // console.log('data', data)
      axios.post(url.editArticle, data).then(res => {
        this.$Notice.success({
          title: res.data.message
        })
        this.getList()
      }).catch(err => {
        console.log('err', err)
      })
    },
    cancel1 () {
      this.$Message.info('点击了取消')
    },
    show (params) {
      let data = qs.stringify({
        id: params._id,
        isadd: false
      })
      axios.post(url.getArticleView, data).then(res => {
        this.articleHtml = res.data.data.html
        this.titleModal = res.data.data.title
        this.showModal = true
      })
    },
    edit (params) {
      let data = qs.stringify({
        id: params._id,
        read: params.read,
        isadd: false
      })
      axios.post(url.getArticleView, data).then(res => {
        console.log(res.data.data)
        this.content = res.data.data.content
        this.html = res.data.data.html
        this.type = res.data.data.type
        this.title = res.data.data.title
        this.editId = res.data.data._id
        this.editModal = true
      })
    },
    remove (params) {
      console.log(params)
      let data = qs.stringify({
        id: params._id
      })
      axios.post(url.removeArticle, data).then(res => {
        this.$Notice.success({
          title: res.data.message
        })
        this.getList()
      })
    },
    async getList () {
      let data = qs.stringify({
        page: this.current + 1,
        pageNum: this.pageSize
      })
      axios.post(url.getArticleList, data).then(res => {
        // let count = res.data.data.count
        // let current = res.data.data.current
        // let pageSize = res.data.data.pageSize
        this.data1 = res.data.data.rows
      })
    },
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd (pos, $file) {
      var formdata = new FormData()
      formdata.append('file', $file)
    },
    change (value, render) {
      this.html = render
    },
    changeDate (value) {
      this.date = value
    },
    selectChange (value) {
      this.type = value
    }
  }
}

</script>
<style>
pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
}
.ivu-select-dropdown {
  z-index: 10000;
}
</style>

<style lang='less' scoped>
.html_show {
  padding: 0 10px;
}
</style>
