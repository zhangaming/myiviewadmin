<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
import { indexLine, indexLineLocal } from '@/api/data'
export default {
  name: 'serviceRequests',
  data () {
    return {
      dom: null,
      mydata: {
        one: {
          name: '运营商/网络服务',
          arr: [120, 132, 101, 134, 90, 230, 210]
        },
        tow: {
          name: '银行/证券',
          arr: [257, 358, 278, 234, 290, 330, 310]
        },
        three: {
          name: '游戏/视频',
          arr: [379, 268, 354, 269, 310, 478, 358]
        },
        four: {
          name: '餐饮/外卖',
          arr: [320, 332, 301, 334, 390, 330, 320]
        },
        five: {
          name: '快递/电商',
          arr: [820, 645, 546, 745, 872, 624, 258]
        }
      }
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    getOption () {
      const mydata = this.mydata
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          top: '3%',
          left: '1.2%',
          right: '1%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: mydata.one.name,
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {
              color: '#2d8cf0'
            } },
            data: mydata.one.arr
          },
          {
            name: mydata.tow.name,
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {
              color: '#10A6FF'
            } },
            data: mydata.tow.arr
          },
          {
            name: mydata.three.name,
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {
              color: '#0C17A6'
            } },
            data: mydata.three.arr
          },
          {
            name: mydata.four.name,
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {
              color: '#4608A6'
            } },
            data: mydata.four.arr
          },
          {
            name: mydata.five.name,
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: { normal: {
              color: '#398DBF'
            } },
            data: mydata.five.arr
          }
        ]
      }
      return option
    }
  },
  async created () {
    try {
      await indexLine().then((res) => {
        this.mydata = res.data.data
      })
    } catch (error) {
      console.log(error)
      this.$Message.warning('EasyMock网站不稳定打不开', 3000)
      indexLineLocal().then(res => {
        this.mydata = res.data
      })
    }
  },
  mounted () {
  },
  watch: {
    mydata (newVaL) {
      let option = this.getOption()
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    }
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }

}
</script>
