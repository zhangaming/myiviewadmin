<!-- 第三 -->
<template>
  <div>
    <Card>
      <Row style="margin-bottom:5px">
        <Col :span='8'>
        <Date-picker type="date"
                     placeholder="选择日期"
                     style="width: 200px"
                     @on-change="changeDate"></Date-picker>
        </Col>
        <Col :span='8'>
        <i-select v-model="typeModel"
                  style="width:200px">
          <i-option v-for="(item,index) in typeList"
                    :value="item.value"
                    :key="index">{{item.label}}</i-option>
        </i-select>
        </Col>
        <Col :span='8'>
        <i-button type="primary"
                  size="small"
                  @click="search">搜索</i-button>
        </Col>
      </Row>
      <Row>

        <Col :span='24'>
        <i-table stripe
                 :columns="columns1"
                 :data="data1"></i-table>

        </Col>
        <Col :span="24"
             style="margin-top:10px">
        <Page :total="total"
              show-elevator
              @on-change="changePage"
              @on-page-size-change="changeSize"
              show-sizer></Page>
        </Col>

      </Row>
    </Card>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import url from '@/api/myapi.js'
export default {
  name: 'page_3',
  data () {
    return {
      total: 0,
      current: 1,
      pageSize: 10,
      date: '',
      typeModel: '',
      columns1: [
        {
          title: '昵称',
          key: 'user'
        },
        {
          title: '留言',
          key: 'message'
        },
        {
          title: '来源',
          key: 'type'
        },
        {
          title: '时间',
          key: 'time'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('Button', {
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
          }
        }
      ],
      typeList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 'test',
          label: '测试'
        }
      ],
      data1: []
    }
  },

  components: {},

  computed: {},

  created () {
    this.getmsg()
  },
  mounted () {

  },

  methods: {
    remove (params) {
      console.log(params)
      let data = qs.stringify({
        id: params._id
      })
      axios.post(url.removeMessage, data).then(res => {
        this.$Notice.success({
          title: res.data.message
        })
      })
      this.getmsg()
    },
    search () {
      this.getmsg()
    },
    changeDate (value) {
      this.date = value
    },
    changePage (page) {
      this.current = page
      this.getmsg()
    },
    changeSize (size) {
      this.pageSize = size
      this.getmsg()
    },
    getmsg () {
      let data = qs.stringify({
        page: this.current,
        pageNum: this.pageSize,
        type: this.typeModel
      })
      axios.post(url.getMessage, data).then(res => {
        this.total = res.data.data.count
        this.data1 = res.data.data.rows
      })
    }

  }
}

</script>
<style lang='less' scoped>
</style>
