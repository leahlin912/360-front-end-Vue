<template>
  <div v-if="isShow" id="menu" class="d-none d-sm-block">
  <!-- <div v-if="isShow" id="menu" class="d-block"> -->
    <div class="left">
      <div class="item">
        <li style="list-style-type:none" aria-expanded="false">
        <a href="#" @click.prevent="changeLink('HomePage')" style="text-decoration: none">
        <font-awesome-icon icon="home" class="dropbtn2"/>
        首頁</a>
        </li>
      </div>

      <!-- <div style="border-style: solid; border-color:#dfdfdf; border-width: 0.5px"> -->
      <div class="useritem">
        <li data-toggle="collapse" data-target="#userservice" class="collapsed" style="list-style-type:none;" aria-expanded="false"  aria-controls="userservice">
          <a href="#" style="text-decoration: none">
            <font-awesome-icon icon="user" class="dropbtn2 fa-w-14"/>
            員工功能            
          </a>
        </li>
        <ul class="sub-menu collapse" id="userservice" style="list-style-type:none; padding-left:70px; padding-top:5px" aria-expanded="false" >
          <li><a href="#" @click.prevent="changeLink('SelfInfo')" style="text-decoration: none">個人基本資料</a></li>
          <hr/>
          <div v-if="onChooseEvaluator">
          <li><a href="#" @click.prevent="changeLink('SelfChooseEvaluator')" style="text-decoration: none">自選評量者</a></li>
          <hr/>
          </div>
          <div v-if="onDoEvaluation">
          <li><a href="#" @click.prevent="changeLink('EvaluationEntry')" style="text-decoration: none">評量他人</a></li>
          <hr/>
          </div>
          <li><a href="#" @click.prevent="changeLink('HistoryGiveEvaluation')" style="text-decoration: none">歷史互評紀錄</a></li>
          <hr/>
          <li><a href="#" @click.prevent="changeLink('ResultEntry')" style="text-decoration: none">受評結果</a></li>
          <!-- <hr/>
          <li><a href="#" @click.prevent="changeLink('EvaluationEntry/WatchAnswer')" style="text-decoration: none">測試頁面</a></li> -->
        </ul>
      </div>  
      
      <!-- <div v-if="'purview' in user">      -->
      <div v-if="has20supervisor" class="supervisoritem">
      <div class="supervisoritem">
        <li data-toggle="collapse" data-target="#supervisorservice" class="collapsed" style="list-style-type:none;" aria-expanded="false"  aria-controls="supervisorservice">
          <a href="#" style="text-decoration: none">
            <font-awesome-icon icon="user-tie" class="dropbtn2 fa-w-14"/>
            主管功能            
          </a>
        </li>
        <ul class="sub-menu collapse" id="supervisorservice" style="list-style-type:none; padding-left:70px; padding-top:5px " aria-expanded="false" >
          <div v-if="onChooseEvaluator">
          <li><a href="#" @click.prevent="changeLink('ConfirmEvaluator')" style="text-decoration: none">審核評量下屬者</a></li>
          <hr/>
          </div>
          <li><a href="#" @click.prevent="changeLink('HistoryEvaluator')" style="text-decoration: none">查看評量下屬者</a></li>
          <hr/>
          <li><a href="#" @click.prevent="changeLink('DptResult')" style="text-decoration: none">部門整體結果</a></li>
          <hr/>
          <li><a href="#" @click.prevent="changeLink('SubordinateResult')" style="text-decoration: none">部門員工個別結果</a></li>
        </ul>
      </div>
      </div>

      <!-- <div v-if="'purview' in user">     -->
      <div v-if="has30hr" class="humanitem"> 
      <div class="humanitem">
        <li data-toggle="collapse" data-target="#humanservice" class="collapsed" style="list-style-type:none;" aria-expanded="false"  aria-controls="humanservice">
          <a href="#" style="text-decoration: none">
            <font-awesome-icon icon="pencil-ruler" class="dropbtn2 fa-w-14"/>
            人資功能            
          </a>
        </li>
        <ul class="sub-menu collapse" id="humanservice" style="list-style-type:none; padding-left:70px; padding-top:5px" aria-expanded="false" >
          <li><a href="#" @click.prevent="changeLink('EmployeeData')" style="text-decoration: none">員工資料</a></li>
          <hr/>
          <li><a href="#" @click.prevent="changeLink('QuestionsPool')" style="text-decoration: none">題庫管理</a></li>
          <hr/>
          <li><a href="#" @click.prevent="changeLink('HistoricalProjects')" style="text-decoration: none">專案列表</a></li>
          <hr/>
          <li><a href="#" @click.prevent="changeLink('CurrentProject')" style="text-decoration: none">現行專案管理</a></li>
          <hr/>
          <li><a href="#" @click.prevent="changeLink('EvaluatorManagement')" style="text-decoration: none">(一) 自選評量者管理</a></li>
          <hr/>
          <li><a href="#" @click.prevent="changeLink('EvaluateStatusManagement')" style="text-decoration: none">(二) 互評狀態管理</a></li>
          <hr/>
          <li><a href="#" @click.prevent="changeLink('ProjectReport')" style="text-decoration: none">評量結果報告</a></li>
        </ul>
      </div>
      </div>

      <!-- <div v-if="'purview' in user">     -->
      <div v-if="has40system" class="adminitem"> 
      <div class="adminitem">
        <li data-toggle="collapse" data-target="#service" class="collapsed" style="list-style-type:none" aria-expanded="false"  aria-controls="service">
          <a href="#" style="text-decoration: none">
            <font-awesome-icon icon="server" class="dropbtn2 fa-w-14"/>
            系統設定            
          </a>
        </li>
        <!-- background-color:#f8f8ff -->
        <ul class="sub-menu collapse" id="service" style="list-style-type:none; padding-left:70px; padding-top: 5px" aria-expanded="false" >
          <li><a href="#" @click.prevent="changeLink('System4_1')" style="text-decoration: none">參數設定</a></li>
          <hr/>
          <li><a href="#" @click.prevent="changeLink('System4_2')" style="text-decoration: none">權限群組設定</a></li>
          <hr/>
          <li><a href="#" @click.prevent="changeLink('SystemPage4_3')" style="text-decoration: none">員工權限設定</a></li>
          <hr/>
          <li><a href="#" @click.prevent="changeLink('SystemPage4_4')" style="text-decoration: none">公告欄管理</a></li>
        </ul>
      </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",

  created() {
        this.project = this.$store.state.project;
            console.log(this.project);
        this.user = this.$store.state.user;
            console.log(this.user);            
        this.nowTime = this.$store.state.today;
            console.log(this.nowTime);


        console.log((Date.parse(this.project.evaluation_date_start).valueOf() <= Date.parse(this.nowTime).valueOf()) && (Date.parse(this.nowTime).valueOf() <= Date.parse(this.project.evaluation_date_end).valueOf()))
        console.log((Date.parse(this.project.project_date_start).valueOf() <= Date.parse(this.nowTime).valueOf()) && (Date.parse(this.nowTime).valueOf() <= Date.parse(this.project.project_date_end).valueOf()))
        
        if ((Date.parse(this.project.evaluation_date_start).valueOf() <= Date.parse(this.nowTime).valueOf()) && (Date.parse(this.nowTime).valueOf() <= Date.parse(this.project.evaluation_date_end).valueOf())) {
          this.onChooseEvaluator = true;
        }

        if ((Date.parse(this.project.project_date_start).valueOf() <= Date.parse(this.nowTime).valueOf()) && (Date.parse(this.nowTime).valueOf() <= Date.parse(this.project.project_date_end).valueOf())) {
          this.onDoEvaluation = true;
        }
      
        if ('system_code_id' in this.user.purview) {
          for(let i = 0; i < this.user.purview.system_code_id.length; i++) {
              switch(this.user.purview.system_code_id[i].system_code) {
                case '1.0':
                  this.has10employee = true;
                  break;              
                case '2.0':
                  this.has20supervisor = true;
                  break;
                case '3.0':
                  this.has30hr = true;      
                  break;        
                case '4.0':
                  this.has40system = true; 
                  break; 
                default:
                  this.has10employee = true;   
                  break;             
              }
          } 
        } else {
          this.has10employee = true; 
        }

        this.isShow = true;
  },
  
  data () {
    return {        
        isShow: false,

        onChooseEvaluator: false,
        onDoEvaluation: false,
        
        project:'',
        projectID:'',
        user:'',
        userID:'',

        nowTime:'',
        
        has10employee: false,
        has20supervisor: false,
        has30hr: false,
        has40system: false,

    }
  },
  
  methods: {
    changeLink: function(link){
      console.log(link);
      this.$router.push("/" + link);
    }

  }
}
</script>

<style scoped lang="scss">
@import "~bootstrap/scss/bootstrap";

#menu {
  z-index: 1;
  position:absolute;
}

a {
  font-weight:bold;
  color:#12263F;  
}

p {  
  color:#12263F;  
}



ul{
  // margin-top: 5px;
  padding-bottom: 2px;
}

li {
  margin-top: 10px;
  margin-bottom: 15px;
}



.left {
  float: left;
  // height: 100vh;
  height: 100%;
  color: #12263f;
  background: rgba(255, 255, 255, 0.5) ;
  display: inline-block;
  white-space: nowrap;
  width: 55px;  
  transition: width 1s;
  border-style: solid;
  border-color:#dfdfdf;
  border-width: 0.5px;  
  // z-index: 2500
}

.left:hover {
  width: 250px;
}

// .item:hover {
//   background-color: #ccc;
// }


.font-awesome-icon,
.dropbtn2 {
  margin-left: 15px;
  margin-right: 20px;
//   padding: 7px 7px;
  color:#12263F;
  font-size: 25px;
  width: 25px;
}

.item {
  // height: 50px;  
  overflow: hidden;
  color: #12263f;
  margin-top: 10px;
  // margin-bottom: 15px;
  // margin-left: 15px;
  
}

.useritem {
  // height: 50px;
  overflow: hidden;
  color: #12263f;
  // margin-top: 20px;
  // margin-left: 15px;
    
}

.supervisoritem {
  // height: 50px;
  overflow: hidden;
  color: #12263f;
  // margin-top: 5px;
  // margin-left: 15px;
  
}

.humanitem {
  // height: 50px;
  overflow: hidden;
  color: #12263f;
  // margin-top: 5px;
  // margin-left: 15px;
  
}

.adminitem {
  // height: 50px;
  overflow: hidden;
  color: #12263f;
  // margin-top: 5px;
  // margin-left: 15px;
  
}








</style>





