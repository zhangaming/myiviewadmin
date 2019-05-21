const LOCALURL = 'http://localhost:3000/'
const URL = {
  submitImg: LOCALURL + 'submitImg', // 提交照片墙图片路径
  removeImg: LOCALURL + 'removeImg', // 删除图片
  getImg: LOCALURL + 'getImg', // 获取图片来源
  submitMessage: LOCALURL + 'submitMessage', // 录入留言板
  getMessage: LOCALURL + 'getMessage', // 获取留言信息
  removeMessage: LOCALURL + 'removeMessage', // 删除留言
  submitArticle: LOCALURL + 'submitArticle', // 提交文章
  removeArticle: LOCALURL + 'removeArticle', // 删除文件
  getArticleView: LOCALURL + 'getArticleView', // 获取文章内容
  editArticle: LOCALURL + 'editArticle', // 编辑文章
  getArticleList: LOCALURL + 'getArticleList', // 获取文章列表
  submitSkill: LOCALURL + 'submitSkill', // 录入技能
  getSkill: LOCALURL + 'getSkill', // 获取技能信息
  removeSkill: LOCALURL + 'removeSkill', // 删除技能
  ipList: LOCALURL + 'ipList' // 获取IP
}

module.exports = URL
