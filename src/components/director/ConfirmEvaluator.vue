<template>
  <div id="confirmEvaluator" class="container">
    <loadingFunc id:loading></loadingFunc>
    
    <div class="row">
      <div class="col-12">
        <span class="navbar navbar-light bg-light indexLevel1">
          <form class="form-inline">
              <a class="navbar-brand page-title">審核評量下屬者</a>            
          </form>
        </span>
      </div>
    </div>

    <div class="row"><div class="col ml-3"><p> 專案名稱：{{project.name}} </p></div></div>
    <!-- <div class="row"><div class="col ml-3"><p> 時間：{{projectTime}} </p></div></div> -->
    <div class="row"><div class="col ml-3"><p> 部門：{{user.department_id.name}} </p></div></div>

  <table v-if="showChooseStatus" class="table-responsive-md ml-2">
  <table class="table ml-3 table-curved">
  <thead class="thead" style="background-color:#F7F7F7">
    <tr align="center">
      <th scope="col" class="align-middle" style="vertical-align: middle;">員工編號</th>
      <th scope="col" class="align-middle" style="vertical-align: middle;">員工姓名</th>
      <th scope="col" class="align-middle" style="vertical-align: middle;">審核</th>
      <th scope="col" class="align-middle" style="vertical-align: middle;">查看<br/>評量者名單</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item, index) in subList" v-bind:key="index" align="center" style="background-color:#FFFFFF">
      <td scope="row" class="align-middle" style="vertical-align: middle;">{{item.employee.job_no}}</th>
      <td class="align-middle" style="vertical-align: middle;">{{item.employee.name}}</td>
      <!-- Y(已審核)/N(未審核)/P(不通過)/W(審核中) -->
      <td class="align-middle" style="vertical-align: middle;">         
        <span v-if="item.isUnsubmit" class="badge badge-pill badge-secondary"> 尚未提交 </span>         
        
        <!-- <button v-show="item.isSubmitting" @click="checkEvaluators"> -->
        <font-awesome-icon v-if="item.isConfirming" icon="user-check" style="color:red; font-size:20px; " 
            class="btnCheck" @click="checkEvaluators(item.employee._id)"/>
                
        <span v-if="item.isPass" class="badge badge-pill badge-secondary"> 審核完成 </span>        
        <span v-if="item.isDisagree" class="badge badge-pill badge-secondary"> 駁回待重送 </span>  
      </td>

      <td class="align-middle" style="vertical-align: middle;">
        <font-awesome-icon icon="eye" v-if="item.isPass || item.isDisagree" style="color:#7F91AC;font-size:20px" class="btnEye" @click="watchEvaluators(item.employee._id)"/>
        <!-- <button v-show="item.isPass || item.isDisagree" class="btn btn-xs fs-10 btn-bold btn-view1"  @click="watchEvaluators(item.employee._id)">
          <img src="../../assets/view.png" width="20">
        </button> -->
      </td>
    </tr>    
  </tbody>
  </table>
  </table>


      <div v-if="toCheck">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog" role="document">
                <div class="modal-content">

                  <div class="modal-header">
                    <h5 class="modal-title">審核評量員工者</h5>
                  </div>
                  
                  <div class="modal-body modal-open">
                    <p> 員工姓名：{{checkName}} </p>
                    <p> 員工自選名單：</p>
                    <table class="table" id="tableEvaluators">
                        <thead>
                            <tr class="col-3" align="center" style="backgound-color:#f5f5f5">        
                                <th class="col-1" style="vertical-align: middle;">關係</th>
                                <th class="col-1" style="vertical-align: middle;">姓名</th>
                                <th class="col-1" style="vertical-align: middle;">單位</th>
                                
                                 <!-- style="min-width: 2%" -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in checkPerson.EvaluationList.evaluated"  align="center">                            
                                
                                    <td v-if="(item.relation === '1')" style="vertical-align: middle;">主管</td>                                
                                    <td v-if="(item.relation === '2')" style="vertical-align: middle;">同事</td>                                
                                    <td v-if="(item.relation === '3')" style="vertical-align: middle;">下屬</td>                                
                                    <td v-if="(item.relation === '4')" style="vertical-align: middle;">其他</td>     
                                
                                <td style="vertical-align: middle;">{{item.evaluated_id.name}}</td>

                                <td style="vertical-align: middle;">{{item.evaluated_id.department_id.name}}</td>

                            </tr>                            
                        </tbody>
                    </table>
                    <div class="form-group">
                        <label for="textarea">審查意見：</label>
                        <textarea class="form-control" id="textarea1" v-model="advise" rows="3"></textarea>
                    </div>
                  </div>         
                  
                  <div class="modal-footer">                                
                    <button type="button" class="btn btn-secondary" @click="closeCheckWindow()">關閉</button>
                    <button type="button" class="btn btn-primary" @click="agree">同意</button>
                    <button type="button" class="btn btn-primary" @click="disagree">駁回</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </transition>
      </div> 
      
      <div v-if="toWatch">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog" role="document">
                <div class="modal-content">

                  <div class="modal-header">
                    <h5 class="modal-title">查看評量員工者</h5>
                  </div>
                  
                  <div class="modal-body modal-open">
                    <p> 員工姓名：{{watchName}} </p>
                    <p> 員工自選名單：</p>
                    <table class="table" id="tableEvaluators2">
                        <thead>
                            <tr class="col-3" align="center" style="backgound-color:#f5f5f5">    
                                <th class="col-1" style="vertical-align: middle;">關係</th>
                                <th class="col-1" style="vertical-align: middle;">姓名</th>
                                <th class="col-1" style="vertical-align: middle;">單位</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in watchPerson.EvaluationList.evaluated"  align="center">   
                                                         
                                    <td v-if="(item.relation === '1')" style="vertical-align: middle;">主管</td>                                
                                    <td v-if="(item.relation === '2')" style="vertical-align: middle;">同事</td>                                
                                    <td v-if="(item.relation === '3')" style="vertical-align: middle;">下屬</td>                                
                                    <td v-if="(item.relation === '4')" style="vertical-align: middle;">其他</td>              
                                
                                <td style="vertical-align: middle;">{{item.evaluated_id.name}}</td>

                                <td style="vertical-align: middle;">{{item.evaluated_id.department_id.name}}</td>
                            </tr> 
                        </tbody>
                    </table>
                    <p> 審查意見：</p>                    
                    <div class="card row ml-2" style="width: 95%; min-height: 100px">                        
                        <div class="card-body">                            
                            <p class="card-text" v-if="watchPerson.EvaluationList.supervisor_opinion !== 'undefined' && watchPerson.EvaluationList.supervisor_opinion != null">{{watchPerson.EvaluationList.supervisor_opinion}}</p>
                            <p class="card-text" v-if="watchPerson.EvaluationList.supervisor_opinion === 'undefined' || watchPerson.EvaluationList.supervisor_opinion == null"></p>
                        </div>
                    </div>                    
                  </div>         
                  
                  <div class="modal-footer">                                
                    <button type="button" class="btn btn-secondary" @click="toWatch = false">關閉</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div> 




  </div>
</template>


<script>
import Api from "../../api";
import { mapGetters, mapActions } from 'vuex'
import loadingFunc from '../Loading'



export default {
  name: 'ConfirmEvaluator',

  components: {
        loadingFunc
    },


  created() {
    $('#loading').show();

    this.project = this.$store.state.project;
    this.projectID = this.project._id;
        console.log(this.project);
        console.log(this.project._id);
    this.user = this.$store.state.user;
    this.userID = this.user._id;
        console.log(this.user);
        console.log(this.user._id);

    this.getSubList();
    
    },

  data () {
    return {
      hasEvaluators: true,
      toCheck: false,
      toWatch: false,
      showChooseStatus: false,
      checkId: "",
      checkPerson: "",
      checkName: "",      
      watchId: "",
      watchPerson: "",
      watchName: "",      


      user:"",
      userID:"",
      subList:[],
      subChooseList:[],
      dptList:[],
    
      project:"",
      projectID:"",
      advise:''
     
    }
  },

  methods: {
    getSubList: async function() {
        await Api.subEvaluationList_get({
                project_id: this.projectID,
                user_id: this.userID   //主管自己的id
                }).then((response) => {  
                    console.log(response);     
                    this.subList = response.data;     
                    console.log(this.subList); 
                })

        await this.setShowStatus();

        this.showChooseStatus = true;
        
        $('#loading').hide();
                
    },

    setShowStatus: function() {
        for(let i = 0; i < this.subList.length; i++) {
            this.subList[i].isPass = false;
            this.subList[i].isUnsubmit = false;
            this.subList[i].isDisagree = false;
            this.subList[i].isConfirming = false;
            // if(typeof this.subList[i].subsubChooseList != 'undefined' || this.subList[i].subsubChooseList != null) {
                switch(this.subList[i].EvaluationList.supervisor_check) {   //Y(已審核)/N(未審核)/P(不通過)/W(審核中)
                    case "Y":
                        this.subList[i].isPass = true;
                        break;        
                    // case "N":
                    //     this.subList[i].isUnsubmit = true;
                    //     break;
                    case "P":
                        this.subList[i].isDisagree = true;
                        break;
                    case "W":
                        this.subList[i].isConfirming = true;
                        break;
                    default:
                        this.subList[i].isUnsubmit = true;
                        break;  
                }
                 
        }
    },

   


    checkEvaluators: function(checkId) {
        this.toCheck = true;
        this.checkId = checkId;
        this.checkPerson = this.subList.find(item => item.employee._id === checkId);
        this.checkName = this.checkPerson.employee.name;
        this.showChooseStatus = false;
        console.log(checkId);
        console.log(this.subList);
        console.log(this.checkPerson);
    },

    closeCheckWindow: function() {
        this.toCheck = false;
        this.getSubList();
    },

    agree: async function() {
        // this.advise = document.getElementById("textarea1").value;
        this.toCheck = false;
        console.log(this.advise);
        $('#loading').show();
                
        await Api.updSubEvaluationListStatus({
            project_id: this.projectID,
            be_evaluated_id: this.checkId,   //受評人ID
            supervisor_check: 'Y',
            supervisor_opinion: this.advise.toString
            }).then((response) => {
                console.log("myevaluators_update");
                console.log(response);                
            }).catch((err) => {
                console.log(err.response);
            });      
        
        await this.getSubList(); 
        
        await Api.sendMail({
          optionStr: 'SupervisorAgree',
          project_id: this.projectID,
          emp_id_list: JSON.stringify([this.checkId])
          }).then((response) => {
            console.log(response);
          }).catch((err) => {
            console.log(err.response);
          });

        $('#loading').hide();
    },

    disagree:async function() {
        // this.advise = document.getElementById("textarea1").value;
        
        this.toCheck = false;
        console.log(this.advise);
        console.log(typeof this.advise);

        $('#loading').show();

        console.log(this.projectID)
        console.log(this.checkId)
        console.log(this.advise)


        await Api.updSubEvaluationListStatus({
            project_id: this.projectID,
            be_evaluated_id: this.checkId,   //受評人ID
            supervisor_check: 'P',
            supervisor_opinion: this.advise
            }).then((response) => {
                console.log("myevaluators_update");
                console.log(response);                
            }).catch((err) => {
                console.log(err.response);
            });

        await this.getSubList();
        // this.$forceUpdate();
        // this.$router.push("/ConfirmEvaluator");

        await Api.sendMail({
          optionStr: 'SupervisorDismissed',
          project_id: this.projectID,
          emp_id_list: JSON.stringify([this.checkId])
          }).then((response) => {
            console.log(response);
          }).catch((err) => {
            console.log(err.response);
          });

          $('#loading').hide();
    },

    watchEvaluators: function(watchId) {
        this.toWatch = true;
        this.watchId = watchId;
        this.watchPerson = this.subList.find(item => item.employee._id  === watchId);
        this.watchName = this.watchPerson.employee.name;
        console.log(watchId);
        console.log(this.subList);
        console.log(this.watchPerson);
    }

  } 

}
</script>


<style scoped lang="scss">
  @import "~bootstrap/scss/bootstrap";

.page-title{
        font-weight:bold;
        font-size: 25px;
        color: #12263F;
    }


.table {
    font-family: Microsoft JhengHei;
    table-layout: fixed;
}

p {
    font-weight:bold;
}

th {
  height: 80px;
}

td {
  height: 80px;  
}


.table-curved {
    border-collapse: separate;
    border-spacing: 0;
}
.table-curved {
    border:  2px solid #EDEDED;
    border-radius: 6px;
}
// .table-curved td, .table-curved th {
//     border-left:  1px solid #EDEDED;
//     border-top:  1px solid #EDEDED;
// }
.table-curved th {
    border-top: none;
    border-bottom: none;
}
.table-curved th:first-child {
    border-radius: 6px 0 0 0;
}
.table-curved th:last-child {
    border-radius: 0 6px 0 0;
}
.table-curved th:only-child{
    border-radius: 6px 6px 0 0;
}
.table-curved tr:last-child td:first-child {
    border-radius: 0 0 0 6px;
}
.table-curved tr:last-child td:last-child {
    border-radius: 0 0 6px 0;
}






.page-title{
        font-weight:bold;
        font-size: 25px;
        color: #12263F;
    }
    #btn-add{
        margin-left: 5dp;
    }
    #input-search{
        margin-left: 5dp;
    }
    #input-search{
        margin-left: 5dp;
    }
    #department-title{
        font-weight:bold;
        font-size: 20px;
    }
    .fc-light{
        font-size: 15px;
        color: #6E757C;
    }
    .fc-dark{
        font-size: 15px;
        color: #2F3E4E;
    }

    .fs-10 {
        font-size: 15px;
        text-align: center;
    }
    .flexbox {
        display: -webkit-box;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
    }
    .align-items-center {
        -ms-flex-align: center;
        align-items:center;
        justify-content: space-between;
    }
    .situation-group{
        width: 15%;
        vertical-align:top;
    }
    .info-group{
        -ms-flex-align: center;
        align-items: center;
        justify-content: space-between;
        align-items: center;
        justify-content: space-between;
        display: -webkit-box;
        width: 70%
    }
    .button-group{
        text-align:center;
        width: 15%;
    }
    .btn-edit1{
        background-color: #D2DDEB;
        margin-top: 5pt;
    }
    .btn-delete1{
        background-color: #D2DDEB;
        margin-top: 5pt;
    }
    .btn-view1{
        background-color: #D2DDEB;
        margin-top: 5pt;
    }
    .btn-edit2{
        background-color: #EFF0F1;
        margin-top: 5pt;
    }
    .btn-delete2{
        background-color: #EFF0F1;
        margin-top: 5pt;
    }
    .btn-view2{
        background-color: #EFF0F1;
        margin-top: 5pt;
    }
    #name{
        font-size: 15px;
        text-align: left;
        font-weight: bolder;
    }
    #serial-number{
        font-size: 15px;
        text-align: left;
    }
    #position{
        font-size: 15px;
        text-align: left;
    }
    #account{
        font-size: 15px;
        text-align: left;
    }
    #direct-boss{
        font-size: 15px;
        text-align: left;
        color: #98A0AB;
    }
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
        
    }
    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }
    .modal-form-control{
        display: block;
        width: 100%;
        height: 34px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s
    }
    .modal-form-control-2{
        display: block;
        width: 70%;
        height: 34px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s
    }
    .switch input { 
        display:none;
    }
.switch {
    display:inline-block;
    width:60px;
    height:30px;
    margin:8px;
    transform:translateY(50%);
    position:relative;
}

.slider {
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    border-radius:30px;
    box-shadow:0 0 0 2px #777, 0 0 4px #777;
    cursor:pointer;
    border:4px solid transparent;
    overflow:hidden;
    transition:.4s;
}
.slider:before {
    position:absolute;
    content:"";
    width:100%;
    height:100%;
    background:#777;
    border-radius:30px;
    transform:translateX(-30px);
    transition:.4s;
}

input:checked + .slider:before {
    transform:translateX(30px);
    background:#2C7BE5;
}
input:checked + .slider {
    box-shadow:0 0 0 2px #2C7BE5,0 0 2px #2C7BE5;
}
.modal-body {
    max-height: calc(100vh - 210px);
    overflow-y: auto;
}
.modal-open {
    overflow: scroll;
}
</style>
