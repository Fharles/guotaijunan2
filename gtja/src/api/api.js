const Url = {
  'yybRank': {
    url: '/Ranking/getComdetailRank',
    params: {
      'CompanyCode': 'a1100',
      'Quarter': 1,
      'RankType': 1,
      'userInfo': ''
    }
  },
  // 获取用户信息
  'getUser': {
    url: '/Ranking/getincompanyRank'
  },
  //分公司/营业部排名
  "filiale":{
    url:"/Ranking/getRankCompetition",
    params:{
      userInfo:''
    }
  },
  //排名全部赛选条件
  "Relation":{
    url:'/Ranking/getRankRelation',
    params:{
      userInfo:''
    }
  },
  //获取地区
  "getAreas":{
    url:"/Ranking/AreaRank",
    params:{
      userInfo:''
    }
  },
  // 搜索接口
  'searchData': {
    url: '/company/getGjaJscSearchCom'
  },
  // 获取子节点数据
  'childrenData': '/company/getChildrenCompanys'
}
export default Url
