<template>
  <div>
    <Card style="margin-top:10px">
      <Row>
        <Col :span='24'
             style="margin-bottom:5px">
        <h3>查询图片</h3>
        </Col>
        <Col :span="8"
             style="margin-bottom:5px">
        <i-select v-model="typeModel"
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
        <Tabs active-key="key1">
          <Tab-pane label="照片墙"
                    key="key1">
            <div class="img-row">
              <Row>
                <i-col span="4"
                       v-for="(item,index) in data"
                       :key="index"><img :src="item.img"
                       style="width:100%; height:180px;"></i-col>
              </Row>
            </div>
          </Tab-pane>
          <Tab-pane label="标签二"
                    key="key2">
            <div class="img-row"></div>
          </Tab-pane>
          <Tab-pane label="标签三"
                    key="key3">
            <div class="img-row"></div>
          </Tab-pane>
        </Tabs>
        </Col>
        <Col :span="24"
             style="margin-top:10px">
        <Page :total="total"
              show-elevator
              :page-size-opts="pageArray"
              :page-size="pageSize"
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
  name: 'page_5',
  data () {
    return {
      typeList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 0,
          label: '测试'
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
      typeModel: '',
      total: 0,
      current: 1,
      pageSize: 18,
      pageArray: [18, 24, 36, 48],
      data: []
    }
  },
  mounted () {
    this.findImg()
  },
  methods: {
    findImg () {
      let data = qs.stringify({
        type: this.typeModel,
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
.img-row {
  min-height: 300px;
  width: 1000px;
}
</style>
