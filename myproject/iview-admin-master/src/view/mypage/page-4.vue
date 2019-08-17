<template>
  <div>
    <Card>
      <Row>
        <Col :span='24'
             style="margin-bottom:5px">
        <h3>提交图片</h3>
        </Col>
        <Col :span="8">
        <i-select v-model="typeModel"
                  style="width:200px">
          <i-option v-for="(item,index) in typeList"
                    :value="item.value"
                    :key="index">{{item.label}}</i-option>
        </i-select>
        </Col>
        <Col :span="8">
        <i-input v-model="imgurl"
                 style="width:300px"
                 placeholder="请输入图片来源"></i-input>
        </Col>
        <Col :span="8">
        <i-button type="primary"
                  @click="submitImg">提交</i-button>
        </Col>
      </Row>
    </Card>
    <Card style="margin-top:10px">
      <Row>
        <Col :span='24'
             style="margin-bottom:5px">
        <h3>查询图片</h3>
        </Col>
        <Col :span="8"
             style="margin-bottom:5px">
        <i-select v-model="typeModel1"
                  style="width:200px">
          <i-option v-for="(item,index) in typeList"
                    :value="item.value"
                    :key="index">{{item.label}}</i-option>
        </i-select>
        </Col>
        <Col :span="16">
        <i-button type="primary"
                  @click="findImg">查询</i-button>
        </Col>
        <Col :span='24'
             style="margin-top:5px">
        <i-table stripe
                 :columns="columns"
                 :data="data"></i-table>
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
  name: 'page_4',
  data () {
    return {
      typeList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 0,
          label: '七牛云'
        },
        {
          value: 1,
          label: '百度云盘'
        },
        {
          value: 2,
          label: 'github'
        }
      ],
      imgurl: '',
      typeModel: '',
      imgurl1: '',
      typeModel1: '',
      total: 0,
      current: 1,
      pageSize: 10,
      columns: [
        { title: '来源',
          key: 'type',
          render: (h, params) => {
            return h('div', params.row.type === 0 ? '七牛云' : params.row.type === 1 ? '百度云盘' : 'github')
          } },
        { title: '图片路径',
          key: 'img',
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.img,
                  style: 'width: 100px;border-radius: 2px;'
                }
              })
            ])
          }
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
      data: []
    }
  },
  mounted () {
    this.findImg()
  },
  methods: {
    submitImg () {
      let data = qs.stringify({
        type: this.typeModel,
        img: this.imgurl
      })
      axios.post(url.submitImg, data).then(res => {
        this.$Notice.success({
          title: res.data.message
        })
      })
    },
    remove (params) {
      let data = qs.stringify({
        id: params._id
      })
      axios.post(url.removeImg, data).then(res => {
        this.$Notice.success({
          title: res.data.message
        })
      })
      this.findImg()
    },
    findImg () {
      let data = qs.stringify({
        type: this.typeModel1,
        page: this.current,
        pageNum: this.pageSize
      })
      axios.post(url.getImg, data).then(res => {
        this.data = res.data.data.rows
        this.total = res.data.data.count
      })
    },
    changePage (page) {
      this.current = page
      this.findImg()
    },
    changeSize (size) {
      this.pageSize = size
      this.findImg()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
