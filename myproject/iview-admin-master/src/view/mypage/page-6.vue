<!-- 第三 -->
<template>
  <div>
    <Card>
      <Row style="margin-bottom:5px">
        <Col :span='12'>
        <i-input v-model="value"
                 placeholder="请输入..."
                 style="width: 200px"></i-input>
        </Col>
        <Col :span='12'>
        <i-button type="primary"
                  size="small"
                  @click="submit">增加</i-button>
        <i-button type="primary"
                  size="small"
                  @click="getskill">刷新</i-button>
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
import URL from '@/api/myapi.js'
export default {
  name: 'page_6',
  data () {
    return {
      total: 0,
      current: 1,
      pageSize: 10,
      value: '',
      date: '',
      typeModel: '',
      columns1: [
        {
          title: '技能',
          key: 'skill'
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
      data1: []
    }
  },

  components: {},

  computed: {},

  created () {
    this.getskill()
  },
  watch: {
    data1 (newVal) {
      if (newVal.length === 0) {
        this.current--
        if (this.current === 0) {
          this.current = 1
        }
        this.getskill()
      }
    }
  },
  mounted () {

  },

  methods: {
    remove (params) {
      console.log(params)
      let data = qs.stringify({
        id: params._id
      })
      axios.post(URL.removeSkill, data).then(res => {
        this.$Notice.success({
          title: res.data.message
        })
      })
      this.getskill()
    },
    changePage (page) {
      this.current = page
      this.getskill()
    },
    changeSize (size) {
      this.pageSize = size
      this.getskill()
    },
    submit () {
      let data = qs.stringify({
        skill: this.value
      })
      axios.post(URL.submitSkill, data).then(res => {
        this.$Notice.success({
          title: res.data.message
        })
        this.getskill()
      })
    },
    getskill () {
      let data = qs.stringify({
        page: this.current,
        pageNum: this.pageSize
      })
      axios.post(URL.getSkill, data).then(res => {
        this.total = res.data.data.count
        this.data1 = res.data.data.rows
      })
    }
  }
}

</script>
<style lang='less' scoped>
</style>
