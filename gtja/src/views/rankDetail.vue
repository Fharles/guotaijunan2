<template>
  <div class="fd-rank-wrap">
     <div v-if="isshowSearch" class="fd-show-search-wrap">
      <Search @getcompanyCode="receiveCode"/>
    </div>
    <div v-else>
      <div class="fd-masking" v-if="isShowSelect || isShowChoose"></div>
      <div class="fd-rank-header">
        <img class="fd-icon-back" @click="goBack()" src="../assets/images/icon-back.png" alt="">
        <div class="fd-text-title" @click="selectTitle">{{titleText}} <img  class="fd-icon-select" :class="{'fd-isshow': isShowSelect}"  src="../assets/images/icon-select.png" alt=""></div>
        <img class="fd-icon-search" @click="searchShow" src="../assets/images/icon-search.png" alt="">
        <div class="fd-select-wrap" v-if="isShowSelect">
          <div :class="{'fd-color': titleText === '分公司排名'}" @click="changeTitle(1)">分公司排名</div>
          <div :class="{'fd-color': titleText === '营业部排名'}" @click="changeTitle(2)">营业部排名</div>
        </div>
      </div>
      <div class="fd-choose-wrap" :class="{'fd-z-index': isShowSelect}">
        <div class="fd-choose-item1" @click="chooseQy">{{qyText}}区 <img class="fd-icon-choose-img" src="../assets/images/icon-choose.png" alt="">
        </div>
        <div class="fd-qy-wrap fd-choose-spe-item" v-if="isqySelect">
            <div class="fd-qy-item" v-for="(item,index) in areas" :key="index" :class="{active:areaIndex ==index}" @click="changeAreas(index)">{{item}}区</div>
          </div>
        <div class="fd-choose-item2" @click="chooseQb">全部 <img class="fd-icon-choose-img" src="../assets/images/icon-choose.png" alt="">
        </div>
        <div class="fd-qb-wrap fd-choose-spe-item" v-if="isqbSelect">
          <div class="fd-qb-item">
            <div class="fd-small-item first-item" v-for="(value,index) in allKey"
            :key="index" :class="{active:index ==chooseIndex }" @click="changeAllChoose(index)">{{value}} </div>
          </div>
          <div class="fd-qb-item second-item" style="width: 66.6%;">
            <div class="fd-small-item" v-for="(value,index) in allFiter[chooseKey]" :class="{active:secondIndex == index}" :Key= "index"
            @click="filterAll(index,$event)">{{value}}</div>
          </div>
          </div>
        <div class="fd-choose-item3" @click="chooseJd">{{jdText}} <img class="fd-icon-choose-img" src="../assets/images/icon-choose.png" alt=""></div>
        <div class="fd-jd-wrap fd-choose-spe-item" v-if="isjdSelect">
          <div class="fd-jd-item" v-for="(item,index) in quarter" :key="index" :class="{active:quarterIndex == index}"
          @click="changeQuater(index)">{{item}}</div>
        </div>
      </div>
      <div class="fd-content-wrap-zzf">
        <div class="fd-rank-top-wrap" v-for="(item,key,index) in pageData" :key="index" >
          <!-- -->
          <div class="fd-rank-title-wrap">
            <img class="fd-icon-rank-common" src="../assets/images/icon-data.png" alt="">
            {{key}}
          </div>
          <div class="fd-moban-common">
            <div class="fd-saiqu-title-wrap">
              <div class="fd-saiqu-left">排名</div>
              <div class="fd-saiqu-middle">{{item[0]['title']}}</div>
              <div class="fd-saiqu-right">较上季排名变化</div>
            </div>
            <div class="fd-list-wrap">
              <div class="fd-list-item" v-for="(i,index) in item" :key="index">
                <!--  -->
                <div class="fd-saiqu-left">
                  <img v-if="i.rank == 1" class="fd-number-img" src="../assets/images/medal1.png" alt="">
                  <img v-if="i.rank == 2" class="fd-number-img" src="../assets/images/medal2.png" alt="">
                  <img v-if="i.rank == 3" class="fd-number-img" src="../assets/images/medal3.png" alt="">
                <span v-if="i.rank > 3" v-text="i.rank"></span>
                </div>
                <div class="fd-saiqu-middle">{{i.name}}</div>
                <div class="fd-saiqu-right">
                  <img v-if="i.num>0" src="../assets/images/icon-up.png" alt="">
                  <img v-if="i.num<0" src="../assets/images/icon-down.png" alt="">
                <span v-text="Math.abs(i.num) > 0 ? Math.abs(i.num) : '-'"></span>
                </div>
              </div>
            </div>
            <div class="fd-more-wrap" v-if="isShowMore[key]">
              <img :class="{'fd-run-style': isClickMore[key]}" @click="clickMore(key)" src="../assets/images/icon-more.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Url from '@/api/api.js'
import {fetchGet,fetchPost} from '@/api/fetch.js'
import Search from '@/views/search.vue'
export default {
  name: 'rank',
  components: {
    Search
  },
  data () {
    return {
      isshowSearch: false,
      qyText: 'A',
      isShowSelect: false,
      titleText: '分公司排名',//入口title，后台传入数据
      CompanyType:1, //1-分公司，2-营业部
      areas:[],//区域分类，入口传入数据
      areaIndex:0,//区域选择
      chooseIndex:0,//选择全部，第一次默认加载第一个选项
      allFiter:{},//全部选项
      indexCode:[],
      secondIndex:undefined,
      allKey:[],
      chooseKey:'',//选择全部选项对应文字
      quarter:['一季度','二季度','三季度','四季度'],//季度
      jdText: '一季度',
      quarterIndex:0,//季度选项
      isShowChoose: false,
      isqySelect: false,
      isqbSelect: false,
      isjdSelect: false,
      isClickMore: {},
      isShowMore: {},
      pageData:{},//页面所有数据
      prePageData: {},// 展开更新的数据
      secondTite:[],//二级分类标题
      dataArr: [1,2,3,4,5,6,7]
    }
  },
  mounted(){
    this.CompanyType = this.$route.query.CompanyType
    if (this.CompanyType == 2) {
      this.titleText = '营业部排名'
    } else {
      this.titleText = '分公司排名'
    }
    this.qyText = this.$route.query.qy
    this.jdText = this.quarter[this.$route.query.jd -1]
    var relationParams = Url.Relation.params;
    relationParams.CompanyType=this.CompanyType;
    //获取全部筛选条件接口
    fetchGet(Url.Relation.url,relationParams).then(res=>{
      var res = res.data;
      if(res.code ==="000000"){
        var data = res.responseEntity;
        this.indexCode = data;
        var obj={};
        for(let i=0;i<data.length;i++){
           
          if (Object.prototype.toString.call(obj[data[i]['typeName']]) == '[object Array]') {
           
            obj[data[i]['typeName']].push(data[i]['indexAbbr'])
          } else {
            obj[data[i]['typeName']] = [];
            obj[data[i]['typeName']].push(data[i]['indexAbbr'])
          }
         
        }
        for(let key in obj){
         this.allKey.push(key);
        }
        this.chooseKey = this.allKey[0];
        this.allFiter = obj;
      }else{
        console.log(res.message);
      }
    })
    this.getQyJk()
    var jdIndex = 1
    if (this.jdText == '一季度') {
      jdIndex = 1
    } else if (this.jdText == '二季度') {
      jdIndex = 2
    } else if (this.jdText == '三季度') {
      jdIndex = 3
    } else {
      jdIndex = 4
    }
    this.getPage(this.qyText, undefined, jdIndex)
  },
  methods:{
    searchShow(flag) {
      if (flag) {
        // 显示搜索组件
        this.isshowSearch = true
      }
    },
    // 接受code
    receiveCode(obj) {
      var str = ''
      this.isShowChoose = false
      this.initChooseSelect()
      this.CompanyType = obj.companyType
      if (this.CompanyType === 1) {
        str = '分公司排名'
      } else {
        str = '营业部排名'
      }
      if (str === this.titleText) {
        this.isShowSelect = false
      } else {
        this.isShowSelect = false
        this.titleText = str
        // 调用接口
        // this.getSwitchQy(type)
        this.getSwitchQy(this.CompanyType)
      }
      this.isshowSearch = false
      // this.paramsRank.CompanyCode = obj.companyCode
      // this.CompanyType = obj.companyType
      //  if (this.CompanyType == 2) {
      //     this.getYybData(1, 1)
      //     // 请求分公司内排名数据
      //     this.getYybData(2, 1)
      //   } else {
      //     this.getYybData(1,1)
      //   }
    },
    // 获取区域接口
    getQyJk () {
      this.areas = []
      var areasParams =Url.getAreas.params;
      areasParams.TypeCode = this.CompanyType;
      fetchGet(Url.getAreas.url,areasParams).then(res=>{
        var res = res.data;
        if(res.code =="000000"){
          for(var i = 0;i<res.responseEntity.length;i++){
            this.areas.push(res.responseEntity[i].region)
          }
        //获取页面信息接口
        // this.getPage()
        }
      })
    },
    //goBack
    goBack(){
     window.history.back(-1); 
    },
    //获取页面信息接口
    getPage(area,innerCode,quater){
     var pageParams = Url.filiale.params;
    pageParams.CompanyType = this.CompanyType;
    pageParams.CompanyCode = '';
    pageParams.Region =area || this.areas[this.areaIndex] ;//当前区域
    pageParams.InnerCode =innerCode|| 9999;//全部
    pageParams.Quarter =quater|| this.quarterIndex+1;//当前季度
  
    fetchPost(Url.filiale.url,pageParams).then(res=>{
      var res = res.data;
      if(res.code =="000000"){
        var data = res.responseEntity;      
        var title={};
        var pageData = {}
        for(var i = 0;i<data.length;i++){
          title[data[i]['indexAbbr']] = 1;
          if (Object.prototype.toString.call(pageData[data[i]['indexAbbr']]) == '[object Array]') {
            pageData[data[i]['indexAbbr']].push({"name":data[i]['abbrchiname'],"num":data[i]['rankNumberChange'],"rank":data[i]['rankNumber'],"title":data[i]['typeName']})
          } else {
            pageData[data[i]['indexAbbr']] = [];
            pageData[data[i]['indexAbbr']].push({"name":data[i]['abbrchiname'],"num":data[i]['rankNumberChange'],"rank":data[i]['rankNumber'],"title":data[i]['typeName']})
          }
          
        }
        for( let i in title){
          this.secondTite.push(i);
        }
        this.prePageData = pageData;
        this.pageData = {}
        for (let key in pageData){
          if (pageData[key] && pageData[key].length > 5) {
            this.isShowMore[key] = true
            this.pageData[key] = pageData[key].slice(0, 5)
          } else {
            this.isShowMore[key] = false
            this.pageData[key] = pageData[key]
          }
          this.isClickMore[key] = false
        }
      }
    })
    },
    //选择季度
    changeQuater(index){
      this.quarterIndex = index;
      this.jdText = this.quarter[index]
      this.secondIndex = undefined
      this.chooseIndex = 0
      this.chooseKey = this.allKey[0]
      this.getPage(undefined,undefined,index+1)
      this.initChooseSelect();
    },
    //选择区域
    changeAreas(index){
      this.areaIndex = index;
      this.qyText = this.areas[index]
      this.secondIndex = undefined
      this.chooseIndex = 0
      this.chooseKey = this.allKey[0]
      this.getPage(this.areas[index])
      this.initChooseSelect();
    },
    // 点击头部调用区域接口
    getSwitchQy (type) {
      this.areas = []
      var areasParams =Url.getAreas.params;
      areasParams.TypeCode = type;
      fetchGet(Url.getAreas.url,areasParams).then(res=>{
        var res = res.data;
        if(res.code =="000000"){
          for(var i = 0;i<res.responseEntity.length;i++){
            this.areas.push(res.responseEntity[i].region)
          }
          this.qyText = this.areas[0]
          this.jdText = '一季度'
          // 初始化数据
          this.areaIndex = 0
          this.quarterIndex = 0
          this.secondIndex = undefined
          this.chooseIndex = 0
          this.chooseKey = this.allKey[0]
        //获取页面信息接口
        this.getPage(this.qyText, undefined, 1)
        }
      })
    },
    //全部选择
    changeAllChoose(index){
      this.chooseIndex = index;
       this.secondIndex = undefined;
      this.chooseKey = this.allKey[index];

    },
    //第二级选择全部
    filterAll(index,e){
      this.secondIndex = index;
      var name = e.target.innerText;
      for(var i = 0; i<this.indexCode.length;i++){
        if(name == this.indexCode[i].indexAbbr){
          var innerCode = this.indexCode[i].innerCode;
          //调用接口
          this.getPage(undefined,innerCode,undefined);
           this.initChooseSelect()
        }
      }
   //   var innerCode = this.
    },
    selectTitle () {
      this.isShowSelect = !this.isShowSelect
      this.initChooseSelect()
    },
    // 切换营业部和分公司
    changeTitle (type) {
      var str = ''
      this.isShowChoose = false
      this.initChooseSelect()
      this.CompanyType = type
      if (type === 1) {
        str = '分公司排名'
      } else {
        str = '营业部排名'
      }
      if (str === this.titleText) {
        this.isShowSelect = false
      } else {
        this.isShowSelect = false
        this.titleText = str
        // 调用接口
        this.getSwitchQy(type)
      }
    },
    initChooseSelect () {
      this.isqySelect = false
      this.isqbSelect = false
      this.isjdSelect = false
      this.isShowChoose = false
    },
    // 区域的选择
    chooseQy () {
      for (let i = 0; i< this.areas.length; i++) {
        if (this.qyText === this.areas[i]) {
          this.areaIndex = i
        }
      }
      if (this.isShowChoose && this.isqySelect) {
        this.initChooseSelect()
      } else {
        this.initChooseSelect()
        this.isShowChoose = true
        this.isqySelect = true
      }
    },
    // 全部的选择
    chooseQb () {
      if (this.isShowChoose && this.isqbSelect) {
        this.initChooseSelect()
      } else {
        this.initChooseSelect()
        this.isShowChoose = true
        this.isqbSelect = true
      }
    },
    // 季度的选择
    chooseJd () {
      this.quarterIndex = this.$route.query.jd - 1
      if (this.isShowChoose && this.isjdSelect) {
        this.initChooseSelect()
      } else {
        this.initChooseSelect()
        this.isShowChoose = true
        this.isjdSelect = true
      }
    },
    // 更多点击事件
    clickMore (type) {
      var obj = {}
      obj = this.isClickMore
      obj[type] = !obj[type]
      this.isClickMore = {}
      this.isClickMore = obj
      this.pageData = {}
      for (let key in this.prePageData) {
        if (this.isClickMore[key]) {
          this.pageData[key] = this.prePageData[key]
        } else {
          this.pageData[key] = this.prePageData[key].slice(0,5)
        }
      }
    }
  }
}
</script>
<style scoped>
.fd-jd-item{text-indent: -.55rem}
.fd-qy-wrap >.fd-qy-item{text-indent: -.5rem;}
.fd-jd-item.active{color: #3083EB}
.fd-rank-wrap{
  width: 100vw;
  height: 100vh;
}
.fd-icon-select{
  width: .28rem;
  height: .14rem;
  visibility: hidden;
}
.fd-icon-search{
  width: .36rem;
  height: .36rem;
  margin-right: .3rem;
}
.fd-text-title{
  font-size:.34rem;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color: #fff;
}
.fd-rank-header{
  width: 100%;
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  height: 1.28rem;
  background-color: #3083EB;
  justify-content: space-between;
}
.fd-icon-back{
  width: .2rem;
  height: .32rem;
  margin-left: .3rem;
}
.fd-select-wrap{
  width: 2.6rem;
  height: 1.6rem;
  background-color: #fff;
  position: absolute;
  left: calc(50vw - 1.3rem);
  top: 1.29rem;
  z-index:99; 
}
.fd-select-wrap > div{
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  color: #222;
  font-size: .28rem;
}
.fd-masking{
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index:99;
  background-color: rgba(0, 0,0, 0.3)
}
.fd-isshow{
  visibility: visible !important;
}
.fd-color{
  color: #3083EB !important;
}
.fd-choose-wrap{
  width: 100%;
  position: fixed;
  left: 0;
  top: calc(1.29rem - 1px);
  background-color: white;
  min-height: 1rem;
  display: flex;
  z-index: 200;
}
.fd-icon-choose-img{
  width: .2rem;
  height: .1rem;
  margin-left: .3rem;
}
.fd-choose-item1,.fd-choose-item2,.fd-choose-item3{
  color: #222222;
  font-size: .24rem;
  height: 1rem;
  line-height: 1rem;
  display: flex;
  align-items: center;
  width: 33.3%;
  justify-content: center;
  border-bottom: 1px solid rgba(230,230,230,1);
  position: relative;
}
.fd-qy-wrap{
  width:33.3%;
  position: absolute;
  left: 0;
  top: calc(1rem - 1px);
}
.fd-qy-wrap >.fd-qy-item{
  height: .6rem;
  text-align: center;
}
.fd-choose-spe-item{
  font-size: .24rem;
  
  z-index: 200;
  background-color: white;
}
.fd-qb-wrap{
  width: 100%;
  position: absolute;
  left: 0;
  top: calc(1rem - 1px);
  display: flex;
}
.fd-qb-wrap > .fd-qb-item{
  width: 33.3%;
}
.fd-small-item{
  width: 100%;
  height: .6rem;
  text-align: center;
}
.fd-small-item.active{
  color: #3083EB;
}
.fd-jd-wrap{
  position: absolute;
  right: 0;
  top: calc(1rem - 1px);
  width: 33.3%;
}
.fd-jd-item{
  height: .6rem;
  text-align: center;
}
.fd-rank-title-wrap{
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222222;
  font-size: .24rem;
  height: .9rem;
  width: 100%;
  font-weight: 500;
  /* border-bottom: 1px solid rgba(230,230,230,1); */
}
.fd-icon-rank-common{
  width: .26rem;
  height: .28rem;
  vertical-align: middle;
  margin-right: .2rem;
}
.fd-saiqu-left{
  padding-left: .2rem;
  width: 11%;
  text-align: center;
}
.fd-saiqu-right{
  padding-right: .2rem;
  width: 29%;
  text-align: center;
}
.fd-saiqu-middle{
  width: 60%;
  text-align: center;
}
.fd-saiqu-title-wrap{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: .6rem;
  border-top: 1px solid rgba(230,230,230,1);
  border-bottom: 1px solid rgba(230,230,230,1);
}
.fd-saiqu-title-wrap{
  font-size: .22rem;
  color: #9C9C9C;
}
.fd-list-item{
  font-size: .24rem;
  color: #444444;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: .83rem;
  /* border-top: 2px solid rgba(230,230,230,1);  */
}
.fd-number-img{
  width: .34rem;
  height: .54rem;
}
.fd-list-wrap{
  /* border-bottom: 2px solid rgba(230,230,230,1); */
}
.fd-content-wrap-zzf{
  padding-top: 2.28rem;
}
.fd-moban-common{
  padding: 0 .2rem;
}
.fd-more-wrap{
  width: 100%;
  height: .56rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg,rgba(255,255,255,0.49) 0%,rgba(255,255,255,1) 100%)
}
.fd-more-wrap img{
  width: .24rem;
  height: .22rem;
  transform: rotate(90deg);
  transition: all .5s;
}
.fd-run-style{
  transform: rotate(-90deg) !important;
}
.fd-z-index{
  z-index: 98!important;
}

.second-item{width: 66.6%;}
.second-item .fd-small-item{text-align: left;}
.first-item{text-align: right;padding-right: .5rem}
.fd-qy-wrap >.fd-qy-item.active{color: #3083EB}
.fd-show-search-wrap{
  position: fixed;
  width: 100vw;
  overflow-y: scroll;
  /* height: 100vh; */
  left: 0;
  top: 0;
  z-index: 5000000;
}
</style>


