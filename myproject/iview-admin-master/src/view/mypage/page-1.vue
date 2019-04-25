<!-- 个人demo -->
<template>
  <div>
    <Card>
      <tables ref="tables"
              editable
              searchable
              search-place="top"
              v-model="tableData2"
              :columns="columns2"
              @on-delete="handleDelete" />
      <Button style="margin: 10px 0;"
              type="primary"
              @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getTableData, Teamtable } from '@/api/data'
import qs from 'qs'
export default {
  name: 'page_1',
  data () {
    return {
      columns: [
        { title: 'Name', key: 'name', sortable: true },
        { title: 'Email', key: 'email', editable: true },
        { title: 'Create-Time', key: 'createTime' },
        {
          title: 'Handle',
          key: 'handle',
          options: ['delete'],
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              }, [
                h('Button', '自定义删除')
              ])
            }
          ]
        }
      ],
      tableData: [],
      columns2: [
        { title: '数字', key: 'num', sortable: true },
        { title: '名字', key: 'name', editable: true },
        // { title: 'Create-Time', key: 'createTime' },
        { title: '图片路径',
          key: 'urlImg',
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.urlImg,
                  style: 'width: 100px;border-radius: 2px;'
                }
              })
            ])
          }
        },
        {
          title: '操作',
          key: 'handle',
          options: ['delete'],
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              }, [
                h('Button', '删除')
              ])
            }
          ]
        }
      ],
      tableData2: []
    }
  },

  components: { Tables },

  computed: {},

  mounted () {
    getTableData().then(res => {
      this.tableData = res.data
    })
    let data = qs.stringify({
      page: 1,
      pageSize: 10
    })
    Teamtable(data).then(res => {
      console.log('res', res)
      this.tableData2 = res.data.data
    })
  },

  methods: {
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  }
}

</script>
<style>
</style>
