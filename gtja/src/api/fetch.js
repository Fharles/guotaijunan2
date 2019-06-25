/* eslint-disable */
import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL = '/gtja-web/'
// axios.get('/GGT_ZBC_SCSD.json', {params: {secret: '426877d29bce4b8da7e6c120101121c9'}}).then(res=> {
// 	console.log(res)
// })
// 
// axios.get('https://data.alldobetter.com:8084/ggt-web/scyw/getNewsByReportDate',{params:{classId:5,belongDate:'2019-06-06'}}).then(res=>{
// 	console.log(res)
// })
////返回一个Promise(发送post请求)
export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params))
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
// 返回一个Promise(发送get请求)
export function fetchGet(url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: param}).then(response => {
      resolve(response)
    }, err => {
      reject(err)
    }).catch((error) => {
      reject(error)
    })
  })
}
export default {
  fetchPost,
  fetchGet
}