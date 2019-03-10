<template>
<nav class="navbar navbar-expand-sm navbar-dark" style="background-color: #132948; height: 50px">
  <a class="navbar-brand" href="#/HomePage">360度回饋評量系統</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div  class="collapse navbar-collapse menu" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto mr-1">
      <!-- <ul class="nav navbar-nav navbar-right"> -->

      <!-- <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <font-awesome-icon icon="bell" style="color:#7F91AC;font-size:20px" class="dropbtn2"/>           
        </a>
        <div class="dropdown-menu"  mr-auto aria-labelledby="navbarDropdown">
          <p class="dropdown-item" href="#">通知1</p>
          <div class="dropdown-divider"></div>
          <p class="dropdown-item" href="#">Another action</p>
          <div class="dropdown-divider"></div>
          <p class="dropdown-item" href="#">Something else here</p>
        </div>
      </li> -->

      <li class="nav-item dropdown ml-0" style="margin-right: 18px">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" style="color:#7F91AC; font-size:17px; margin-top:1.5px" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{user.name}}
        </a>
        <div class="dropdown-menu dropdown-menu-right shawdow-lg" aria-labelledby="navbarDropdown" style="background-color:#E3EBF8; border-width:0.5px; margin-top:3.5px">
          <p class="dropdown-item">員工編號：{{user.job_no}}</p>
          <p class="dropdown-item">帳號：{{user.account}}</p> 
          <div class="dropdown-divider"></div>
          <p class="dropdown-item">部門：{{user.department_id.name}}</p>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#/">
        <font-awesome-icon icon="sign-out-alt" style="color:#7F91AC; font-size:20px; margin-top:3px" class="dropbtn2"/>           
        </a>
      </li>
    </ul>




    <ul class="navbar-nav ml-auto mr-1 d-block d-sm-none">
      <li class="nav-item dropdown ml-0 mr-6">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" style="color:#7F91AC" @click="showEmployeeList=!showEmployeeList">
          員工功能
        </a>
      </li>
      <span v-if="showEmployeeList">        
        <li class="nav-item ml-0 mr-6" style="list-style-type:none" >
          <a class="nav-link" href="#" @click.prevent="changeLink('SelfInfo')" style="text-decoration: none">個人基本資料</a>
        </li>
        <div v-if="onChooseEvaluator">
        <li class="nav-item ml-0 mr-6" style="list-style-type:none" >
          <a class="nav-link" href="#" @click.prevent="changeLink('SelfChooseEvaluator')" style="text-decoration: none">自選評量者</a>
        </li>
        </div>
        <div v-if="onDoEvaluation">
        <li class="nav-item  ml-0 mr-6"  style="list-style-type:none">
          <a class="nav-link" href="#" @click.prevent="changeLink('EvaluationEntry')" style="text-decoration: none">評量他人</a>
        </li>
        </div>
        <li class="nav-item ml-0 mr-6" style="list-style-type:none" >
          <a class="nav-link" href="#" @click.prevent="changeLink('HistoryGiveEvaluation')" style="text-decoration: none">歷史互評紀錄</a>
        </li>
        <li class="nav-item ml-0 mr-6" style="list-style-type:none" >
          <a class="nav-link" href="#" @click.prevent="changeLink('ResultEntry')" style="text-decoration: none">受評結果</a>
        </li>
      </span>

      <li v-if="has20supervisor" class="nav-item dropdown ml-0 mr-6">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" style="color:#7F91AC" @click="showSupervisorList=!showSupervisorList">
          主管功能
        </a>
      </li>
      <span  v-if="showSupervisorList">
        <div v-if="onChooseEvaluator">
        <li class="nav-item ml-0 mr-6" style="list-style-type:none" >
          <a class="nav-link" href="#" @click.prevent="changeLink('ConfirmEvaluator')" style="text-decoration: none">審核評量下屬者</a>
        </li>
        </div>
        <li class="nav-item ml-0 mr-6" style="list-style-type:none" >
          <a class="nav-link" href="#" @click.prevent="changeLink('HistoryEvaluator')" style="text-decoration: none">查看評量下屬者</a>
        </li>
        <li class="nav-item ml-0 mr-6" style="list-style-type:none" >
          <a class="nav-link" href="#" @click.prevent="changeLink('DptResult')" style="text-decoration: none">部門整體結果</a>
        </li>
        <li class="nav-item ml-0 mr-6" style="list-style-type:none" >
          <a class="nav-link" href="#" @click.prevent="changeLink('SubordinateResult')" style="text-decoration: none">部門員工個別結果</a>
        </li>
      </span>

      <li v-if="has30hr" class="nav-item dropdown ml-0 mr-6">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" style="color:#7F91AC" @click="showHrList=!showHrList">
          人資功能
        </a>
      </li>
      <span v-if="showHrList">
        <li class="nav-item ml-0 mr-6" style="list-style-type:none" >
          <a class="nav-link" href="#" @click.prevent="changeLink('EmployeeData')" style="text-decoration: none">員工資料</a>
        </li>
        <li class="nav-item ml-0 mr-6" style="list-style-type:none" >
          <a class="nav-link" href="#" @click.prevent="changeLink('QuestionsPool')" style="text-decoration: none">題庫管理</a>
        </li>
        <li class="nav-item ml-0 mr-6" style="list-style-type:none" >
          <a class="nav-link" href="#" @click.prevent="changeLink('HistoricalProjects')" style="text-decoration: none">專案列表</a>
        </li>
        <li class="nav-item ml-0 mr-6" style="list-style-type:none" >
          <a class="nav-link" href="#" @click.prevent="changeLink('CurrentProject')" style="text-decoration: none">現行專案管理</a>
        </li>
        <li class="nav-item ml-0 mr-6" style="list-style-type:none" >
          <a class="nav-link" href="#" @click.prevent="changeLink('EvaluatorManagement')" style="text-decoration: none">自選評量者管理</a>
        </li>
        <li class="nav-item ml-0 mr-6" style="list-style-type:none" >
          <a class="nav-link" href="#" @click.prevent="changeLink('EvaluateStatusManagement')" style="text-decoration: none">互評狀態管理</a>
        </li>
        <li class="nav-item ml-0 mr-6" style="list-style-type:none" >
          <a class="nav-link" href="#" @click.prevent="changeLink('ProjectReport')" style="text-decoration: none">評量結果報告</a>
        </li>
      </span>

      <li v-if="has40system" class="nav-item dropdown ml-0 mr-6">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" style="color:#7F91AC" @click="showSystemList=!showSystemList">
          系統設定
        </a>
      </li>
      <span  v-if="showSystemList">
        <li class="nav-item ml-0 mr-6" style="list-style-type:none" >
          <a class="nav-link" href="#" @click.prevent="changeLink('System4_1')" style="text-decoration: none">參數設定</a>
        </li>
        <li class="nav-item ml-0 mr-6" style="list-style-type:none" >
          <a class="nav-link" href="#" @click.prevent="changeLink('System4_2')" style="text-decoration: none">權限群組設定</a>
        </li>
        <li class="nav-item ml-0 mr-6" style="list-style-type:none" >
          <a class="nav-link" href="#" @click.prevent="changeLink('SystemPage4_3')" style="text-decoration: none">員工權限設定</a>
        </li>
        <li class="nav-item ml-0 mr-6" style="list-style-type:none" >
          <a class="nav-link" href="#" @click.prevent="changeLink('SystemPage4_4')" style="text-decoration: none">公告欄管理</a>
        </li>
      </span>
    </ul>
  </div>
</nav>




</template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name:'NavbarNew',

    created() {
      this.user = this.$store.state.user;
        console.log(this.user);

      this.project = this.$store.state.project;
        console.log(this.project);

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
        user:"",
        // userID: "",
        // userName: "王小明",
        // userAccount: "asd",
        userDpt: "",
        //for sidebar
        isSupervisor: true,
        isHumanDpt: true,
        isAdmin: true,

        showEmployeeList:false,
        showSupervisorList:false,
        showHrList:false,
        showSystemList:false,


        has10employee: false,
        has20supervisor: false,
        has30hr: false,
        has40system: false,
        isShow: false
      }
    },

    methods:{
      //for sidebar
      changeLink: function(link){
        console.log(link);
        this.$router.push("/" + link);
      }
    }

}
</script>

<style scoped lang="scss">

.dropdown-item:hover{
  background-color:#FFFFFF
}

.menu {
  z-index: 1;
  background-color: #132948;
  // position:absolute;

}

</style>
