<!-- 第三 -->
<template>
  <div>
    <Card>
      <Row style="margin-bottom:5px">
        <Col :span='12'>
        <i-input v-model="value"
                 placeholder="请输入城市id"
                 style="width: 200px"></i-input>
        </Col>
        <Col :span='12'>
        <i-button type="primary"
                  size="small"
                  @click="getskill">查询</i-button>
        <i-button type="primary"
                  size="small"
                  @click="refush">重置</i-button>
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
  name: 'page_1',
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
          title: '城市ID',
          key: 'cid'
        },
        {
          title: '城市',
          key: 'cname'
        },
        {
          title: '浏览次数',
          key: 'count'
        },
        {
          title: 'ip',
          key: 'ip'
        },
        {
          title: '是否初次访问',
          key: 'orNew'
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
  mounted () {

  },

  methods: {
    changePage (page) {
      this.current = page
      this.getskill()
    },
    changeSize (size) {
      this.pageSize = size
      this.getskill()
    },
    refush () {
      this.value = ''
      this.getskill()
    },
    getskill () {
      let data = qs.stringify({
        page: this.current,
        pageNum: this.pageSize,
        cid: this.value
      })
      axios.post(url.ipList, data).then(res => {
        this.total = res.data.data.count
        this.data1 = res.data.data.rows
      })
    }
  }
}

</script>
<style lang='less' scoped>
</style>
