import Mock from 'mockjs'
import {
  doCustomTimes
} from '@/libs/util'
import orgData from './data/org-data'
import {
  treeData
} from './data/tree-select'
const Random = Mock.Random

export const getTableData = req => {
  let tableData = []
  doCustomTimes(5, () => {
    tableData.push(Mock.mock({
      name: '@name',
      email: '@email',
      createTime: '@date'
    }))
  })
  return tableData
}

export const getDragList = req => {
  let dragList = []
  doCustomTimes(5, () => {
    dragList.push(Mock.mock({
      name: Random.csentence(10, 13),
      id: Random.increment(10)
    }))
  })
  return dragList
}

export const uploadImage = req => {
  return Promise.resolve()
}

export const getOrgData = req => {
  return orgData
}

export const getTreeSelectData = req => {
  return treeData
}

// 新建的
export const indexInfoLocal = req => {
  let obj = {}
  obj.inforCardData = []
  obj.pieData = []

  doCustomTimes(6, () => {
    obj.inforCardData.push(Mock.mock({
      count: Random.integer(200, 800)
    }))
  })
  doCustomTimes(5, () => {
    obj.pieData.push(Mock.mock({
      value: Random.integer(100, 1500)
    }))
  })
  obj.barData = {
    Mon: Random.integer(1000, 35000),
    Tue: Random.integer(1000, 35000),
    Wed: Random.integer(1000, 35000),
    Thu: Random.integer(1000, 35000),
    Fri: Random.integer(1000, 35000),
    Sat: Random.integer(1000, 35000),
    Sun: Random.integer(1000, 35000)
  }

  return obj
}

export const indexLineLocal = req => {
  let one = Mock.mock({
    name: '运营商/网络服务',
    'arr|7': [
      '@integer(400, 500)'
    ]
  })
  let tow = Mock.mock({
    name: '银行/证券',
    'arr|7': [
      '@integer(250, 350)'
    ]
  })
  let three = Mock.mock({
    name: '游戏/视频',
    'arr|7': [
      '@integer(200, 600)'
    ]
  })
  let four = Mock.mock({
    name: '餐饮/外卖',
    'arr|7': [
      '@integer(300, 500)'
    ]
  })
  let five = Mock.mock({
    name: '快递/电商',
    'arr|7': [
      '@integer(250, 850)'
    ]
  })
  let obj = {
    one,
    tow,
    three,
    four,
    five
  }

  return obj
}
