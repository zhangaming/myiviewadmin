import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getTreeSelectData = () => {
  return axios.request({
    url: 'get_tree_select_data',
    method: 'get'
  })
}
// 新建的EasyMock
export const indexInfo = () => {
  return axios.request({
    url: 'indexInfo',
    method: 'get'
  })
}
export const indexLine = () => {
  return axios.request({
    url: 'indexLine',
    method: 'get'
  })
}
// 新建的本地Mock
export const indexInfoLocal = () => {
  return axios.request({
    url: 'indexInfoLocal',
    method: 'get'
  })
}
export const indexLineLocal = () => {
  return axios.request({
    url: 'indexLineLocal',
    method: 'get'
  })
}
export const Teamtable = (info) => {
  return axios.request({
    url: 'Teamtable',
    data: info,
    method: 'post'
  })
}
