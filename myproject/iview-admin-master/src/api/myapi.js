const LOCALURL = 'http://localhost:3000/'
const URL = {
  submitImg: LOCALURL + 'imgs/submitImg', // 提交照片墙图片路径
  removeImg: LOCALURL + 'imgs/removeImg', // 删除图片
  getImg: LOCALURL + 'imgs/getImg', // 获取图片来源
  submitMessage: LOCALURL + 'liuyan/submitMessage', // 录入留言板
  getMessage: LOCALURL + 'liuyan/getMessage', // 获取留言信息
  removeMessage: LOCALURL + 'liuyan/removeMessage', // 删除留言
  submitArticle: LOCALURL + 'article/submitArticle', // 提交文章
  removeArticle: LOCALURL + 'article/removeArticle', // 删除文件
  getArticleView: LOCALURL + 'article/getArticleView', // 获取文章内容
  editArticle: LOCALURL + 'article/editArticle', // 编辑文章
  getArticleList: LOCALURL + 'article/getArticleList' // 获取文章列表
}

module.exports = URL
