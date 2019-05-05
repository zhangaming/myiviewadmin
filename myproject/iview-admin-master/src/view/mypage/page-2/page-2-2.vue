<!-- 第二页 -->
<template>
  <div>
    <Card>
      <Row>
        <Col>
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
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'page_2_2',
  data () {
    return {
      showModal: false,
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
          width: 150,
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

  components: {},

  computed: {},

  mounted () {
    this.getList()
  },
  methods: {
    ok () {
      this.$Message.info('点击了确定')
    },
    cancel () {
      this.$Message.info('点击了取消')
    },
    show (params) {
      console.log(params)
      let data = qs.stringify({
        id: params._id,
        read: params.read,
        isadd: false
      })
      const LOCALURL = 'http://localhost:3000/'
      let url = LOCALURL + 'article/getArticleView'
      axios.post(url, data).then(res => {
        console.log(res.data.data)
        this.articleHtml = res.data.data.html
        this.titleModal = res.data.data.title
        this.showModal = true
      })
    },
    remove (params) {
      console.log(params)
    },
    async getList () {
      let data = qs.stringify({
        page: this.current + 1,
        pageNum: this.pageSize
      })
      const LOCALURL = 'http://localhost:3000/'
      let url = LOCALURL + 'article/getArticleList'
      axios.post(url, data).then(res => {
        // let count = res.data.data.count
        // let current = res.data.data.current
        // let pageSize = res.data.data.pageSize
        this.data1 = res.data.data.rows
      })
    }
  }
}

</script>
<style lang='less' scoped>
pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
}
.html_show {
  padding: 0 10px;
}
</style>
