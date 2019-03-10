<template>
  <div id="chooseEvaluator" class="container">    
    <div class="row">
      <div class="col-12">
        <span class="navbar navbar-light bg-light indexLevel1">
          <form class="form-inline">
              <a class="navbar-brand page-title">自選評量者</a>            
          </form>
        </span>
      </div>
    </div>

    <div class="col ml-3 mt-3" style="font-weight:bold"><p>專案名稱：{{project.name}}</p></div>
    <div class="row  ml-3 mb-3"><div class="col" style="font-weight:bold">
      <p> 自選評量者時間：{{this.project.evaluation_date_start}}～{{this.project.evaluation_date_end}}</p>
    </div></div>

    <div class="row">
      <div class="col">
        <div class="row" id="examine"><h5 style="margin-top: 1%; margin-left:8%">目前審核情形</h5></div>
        <div class="row">
        <div class="table-responsive-md my-1">
          <table class="table shadow" id="resultTable" style="background-color: #D2DDEB; border-radius: 5px; margin-left:11%; width: 400px">
            <thead>
              <tr>
                <td><span class="badge badge-pill" style="background-color:#A6C4F7"> 尚未送審 </span></td>
                <td><span class="badge badge-pill" style="background-color:#A6C4F7"> 審核中 </span></td>
                <td><span class="badge badge-pill" style="background-color:#A6C4F7"> 主管已同意 </span></td>
                <td><span class="badge badge-pill" style="background-color:#A6C4F7"> 主管駁回 </span></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td align="center"><font-awesome-icon icon="circle" v-if="isUnsubmit"  style="color:#2C7BE5" id="lightUnsubmit"/></td>
                <td align="center"><font-awesome-icon icon="circle" v-if="isConfirming" style="color:#2C7BE5" id="lightConfirming"/></td>
                <td align="center"><font-awesome-icon icon="circle" v-if="isPass"  style="color:#2C7BE5" id="lightPass"/></td>
                <td align="center"><font-awesome-icon icon="circle" v-if="isDisagree"  style="color:#2C7BE5" id="lightDisagree"/></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  <!-- </div>
    
  <div class="row"> -->
    <div class="col" style="margin-left: 5%">
      <div class="row"><h5 style="margin-top: 1%; margin-left:2%">主管建議：</h5></div>
      <div class="card row shadow" style="width: 25rem; background-color: #ecf5ff; border: none; margin-left: 0%">
        <div class="card-body" style="min-height: 100px"><p class="card-text">{{supervisorOpinion}}</p></div>
      </div>
    </div>
  </div>
  

  <div class="row mr-4" id="chooseArea">
    <div v-if="btnSubmitFunc" class="container">
    <div class="row"><h5 class="col-12" style="margin-top: 5%; margin-left:3%">選擇評量者</h5></div>

    <div class="table-responsive-md row ml-2">
      <table class="col-12" style="margin-left: 1%">
        <tr>
          <td>
            <div class="col-12 my-1">
              <label class="mr-sm-3" for="inlineFormCustomSelect">關係：</label>
              <select class="custom-select mr-sm-3" v-model="chosenRelationship">
                <!-- <option selected>請選擇</option> -->
                <option value="1">主管</option>
                <option value="2">同事</option>
                <option value="3">下屬</option>
                <option value="4">其他</option>
              </select>
            </div>
          </td>

          <td>
            <div class="col-auto my-1">
              <label class="mr-sm-3" for="inlineFormCustomSelect">部門：</label>
              <select class="custom-select mr-sm-3" v-model="chosenDpt">
                <!-- <option selected>請選擇</option> -->
                <option v-for="dpt in dptList" :key="dpt._id" :label="dpt.name" v-bind:value="dpt._id">{{dpt.name}}</option>
              </select>
            </div>
          </td>

          <td>
            <div class="col-auto my-1">
              <label class="mr-sm-3" for="inlineFormCustomSelect">姓名：</label>
              <select class="custom-select mr-sm-3" v-model="chosenID">
                <!-- <option selected>Choose...</option> -->
                <option v-for="item in filterByDpt(employeeList, chosenDpt)"
                  :key="item._id" :label="item.name" :value="item._id"
                >{{item.name}}</option>
                <!-- <option v-for="item in filterByDpt(memberList, chosenDpt)" :key="item.name" :label="item.name" :value="chosenID"></option> -->
                <!-- <option v-for="item in filterByDpt2(chosenDpt)" :key="item.name" :label="item.name" :value="chosenID"></option> -->
                <!-- <option v-for="item in filteredMemberList" :key="item.name" :label="item.name" :value="chosenID"></option> -->
                <!-- <option v-for="item in memberList" :key="item.id" :label="item.name" v-bind:value="item.id">{{item.name}}{{item.id}}</option> -->
              </select>
            </div>
          </td>

          <td>
            <button type="button" class="btn btn-outline-primary mr-sm-3" @click="saveEvaluators">新增</button>
          </td>

        </tr>
      </table>
    </div>
    </div>


    <div id="chooseResult" class="container">
      <div class="row"><h5 class="col-12" style="margin-top: 3%; margin-left: 3%">目前選擇結果</h5></div>    
    <div class="row">
      <!-- <div class="table-responsive-md ml-2 col-md-12 my-1"> -->
      <div class="table-responsive ml-2 col-md-12 my-1">
      <table id="tableR" class="col-11" align="center" style="table-layout:fixed; margin-left:4%; margin-right:5%">
        <tr class="row" align="center" style="color:#2C7BE5; background-color: #F6F6F6; font-weight: bold">  
          <th class="col-3">關係</th>
          <th class="col-7">人選</th>
        </tr>
        <tr class="row" align="center" style="background-color: #ffffff">
          <td class="col-3" align="center" style="font-weight: bold">主管</td>
          <td class="col-7">
            <div v-if="btnSubmitFunc"><button type="button" class="btn btn-outline-secondary" @click="deleteSupervisor(item.evaluated_id._id)"
              v-for="item in myevaluators_supervisor" :key="item.evaluated_id._id" :label="item.evaluated_id.name" v-bind:value="item.evaluated_id._id"
            > {{item.evaluated_id.name}} X </button></div>       
            <div v-if="btnSubmitFunc === false"><button type="button" class="btn btn-outline-secondary"
              v-for="item in myevaluators_supervisor" :key="item.evaluated_id._id" :label="item.evaluated_id.name" v-bind:value="item.evaluated_id._id"
            > {{item.evaluated_id.name}} </button></div>
          </td>
        </tr>
        <tr class="row" align="center" style="background-color: #ffffff">
          <td class="col-3" align="center" style="font-weight: bold">同事</td>
          <td class="col-7">
            <div v-if="btnSubmitFunc"><button type="button" class="btn btn-outline-secondary" @click="deleteColleage(item.evaluated_id._id)"
              v-for="item in myevaluators_colleage" :key="item.evaluated_id._id" :label="item.evaluated_id.name" v-bind:value="item.evaluated_id._id"
            > {{item.evaluated_id.name}} X </button></div>            
            <div v-if="btnSubmitFunc === false"><button type="button" class="btn btn-outline-secondary"
              v-for="item in myevaluators_colleage" :key="item.evaluated_id._id" :label="item.evaluated_id.name" v-bind:value="item.evaluated_id._id"
            > {{item.evaluated_id.name}} </button></div>
          </td>
        </tr>
        <tr class="row" align="center" style="background-color: #ffffff">
          <td class="col-3" align="center" style="font-weight: bold">下屬</td>
          <td class="col-7">
            <div v-if="btnSubmitFunc"><button type="button" class="btn btn-outline-secondary" @click="deleteSubordinate(item.evaluated_id._id)"
              v-for="item in myevaluators_subordinate" :key="item.evaluated_id._id" :label="item.evaluated_id.name" v-bind:value="item.evaluated_id._id"
            > {{item.evaluated_id.name}} X </button></div>            
            <div v-if="btnSubmitFunc === false"><button type="button" class="btn btn-outline-secondary"
              v-for="item in myevaluators_subordinate" :key="item.evaluated_id._id" :label="item.evaluated_id.name" v-bind:value="item.evaluated_id._id"
            > {{item.evaluated_id.name}} </button></div>
            
          </td>
        </tr>
        <tr class="row" align="center" style="background-color: #ffffff">
          <td class="col-3" align="center" style="font-weight: bold">其他</td>
          <td class="col-7">
            <div v-if="btnSubmitFunc"><button type="button" class="btn btn-outline-secondary" @click="deleteOther(item.evaluated_id._id)"
              v-for="item in myevaluators_other" :key="item.evaluated_id._id" :label="item.evaluated_id.name" v-bind:value="item.evaluated_id._id"
            > {{item.evaluated_id.name}} X </button></div>            
            <div v-if="btnSubmitFunc === false"><button type="button" class="btn btn-outline-secondary"
              v-for="item in myevaluators_other" :key="item.evaluated_id._id" :label="item.evaluated_id.name" v-bind:value="item.evaluated_id._id"
            > {{item.evaluated_id.name}} </button></div>
          </td>
        </tr>

      </table>


      <button
        v-if="btnSubmitFunc" type="button" class="btn btn-primary" @click="saveToDB" style="margin-left: 50%; margin-top: 1%"
      >送審</button>
    </div>
    </div>
  </div>
  </div>
  </div>
</template>



<script>
import Api from "../../api";
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "SelfChooseEvaluator",
  created() {     
      this.project = this.$store.state.project;
      this.projectID = this.project._id;
        console.log(this.project);
        console.log(this.project._id);
      this.user = this.$store.state.user;
      this.userID = this.user._id;
        console.log(this.user);
        console.log(this.user._id);



      Api.department_getDepartments({}).then((response) => {
                console.log("department_getDepartments");
                console.log(response);
                this.dptList = response.data;
                console.log(this.dptList);
            }).catch((err) => {
                console.log(err.response);
            });

      Api.employees_getAll({}).then((response) => {
                console.log("employees_getAll");
                console.log(response);
                let resData = response.data;
                for (let i = 0; i < resData.length; i++) {
                  if (resData[i].situation === "Y") {
                    this.employeeList.push(resData[i]);
                  }
                }
                console.log("employeelist")
                console.log(this.employeeList);
            }).catch((err) => {
                console.log(err.response);
            });
      
      Api.myevaluators_get({
            project_id: this.projectID,
            user_id: this.userID
            }).then((response) => {
                  console.log("myevaluators_get");                
                  console.log(response);           
                this.showConfirmStatus();                    
                
                if(response.data.length !== 0) {
                  this.myevaluationList = response.data[0].evaluated;
                    console.log("myevaluationList_load");
                    console.log(this.myevaluationList);
                  this.showMyevaluators();
                  
                  this.supervisor_check = response.data[0].supervisor_check; 
                  if (this.supervisor_check !== 'W') {
                    this.supervisorOpinion = response.data[0].supervisor_opinion;
                  }
                  this.showConfirmStatus();   
                }
                }).catch((err) => {
                console.log(err.response);
            });

  },

  data() {
    return {
      project:"",
      projectID:"",
      user:"",
      userID:"",

      chosenRelationship: "",
      chosenDpt: "請選擇",
      chosenID: "請選擇",
      chosenPeople: "",
      msgDirector1: "",
      msgColleague1: "",
      msgSubordinate1: "",
      chooseAsDirector: false,
      chooseAsColleague: false,
      chooseAsSubordinate: false,

      supervisor_check:"",
      supervisorOpinion:'',
      isUnsubmit: false,
      isConfirming: false,
      isPass: false,
      isDisagree: false,
      btnSubmitFunc: true, //預設應為false, 只在unsubmit, disagree時為true


      employeeList:[],
      dptList:[],
      myevaluationList:[],
      myevaluators:[],
      myevaluators_supervisor:[],
      myevaluators_colleage:[],
      myevaluators_subordinate:[],
      myevaluators_other:[]
      
    };
  },

  methods: {
    filterByDpt: function(employeeList, chosenDpt) {
      return employeeList.filter(function(item) {
        return item.department_id == chosenDpt;
      });
    },
    // filterByDpt: function(memberList, chosenDpt){
    //     return memberList.filter(function(item){
    //         console.log(item.dpt.indexOf(chosenDpt));
    //         return (item.dpt.indexOf(chosenDpt) > -1) ;
    //     });
    // },

    
    showConfirmStatus: function() {      
      this.isUnsubmit = false;
      this.isConfirming = false;
      this.isPass = false;
      this.isDisagree = false; 
      this.btnSubmitFunc = false; //預設應為false, 只在unsubmit, disagree時為true
      console.log(this.supervisor_check);
      if (this.supervisor_check === "") {   
        this.isUnsubmit = true;
        this.btnSubmitFunc = true;          
        return;
      }
      switch(this.supervisor_check) {   //Y(已審核)/N(未審核)/P(不通過)/W(審核中)
        case "Y":    //Y(已審核)
          this.isPass = true;
          break;        
        case "N":    //N(未審核)
          this.isUnsubmit = true;
          this.btnSubmitFunc = true;
          break;
        case "P":    //P(不通過)
          this.isDisagree = true;
          this.btnSubmitFunc = true;
          break;
        case "W":    //W(審核中)
          this.isConfirming = true;
          break;
        default:
          this.isUnsubmit = true;
          this.btnSubmitFunc = true;
          break;  
      }
      console.log(this.isUnsubmit);
      console.log(this.isConfirming);
      console.log(this.isPass);
      console.log(this.isDisagree); 

    },

    showMyevaluators: function() {     //1.主管 2.同事 3下屬 4.其他
      if (this.myevaluationList.length === 0) {
        return;
      } 
      for(var i = 0; i < this.myevaluationList.length; i++) {
        this.myevaluators.push(this.myevaluationList[i]);
        if (this.myevaluationList[i].relation === "1") {  
          this.myevaluators_supervisor.push(this.myevaluationList[i]);
        }
        if (this.myevaluationList[i].relation === "2") {  
          this.myevaluators_colleage.push(this.myevaluationList[i]);
        }
        if (this.myevaluationList[i].relation === "3") {  
          this.myevaluators_subordinate.push(this.myevaluationList[i]);
        }
        if (this.myevaluationList[i].relation === "4") {  
          this.myevaluators_other.push(this.myevaluationList[i]);
        }         
      }
    },

    findEmployee: function(myevaluatorID) {
      var findWho = this.employeeList.find(
        item => item._id === myevaluatorID
      )
      // console.log(findWho);
      return findWho;
    },

    saveEvaluators: function() {
      // this.chosenPeople = this.employeeList.find(
      //   item => item._id === this.chosenID
      // );
      if(this.chosenID == this.userID) {
        alert('請選擇其他人作為您的評量人！');
        return;
      }

      for (let i = 0; i < this.myevaluators.length; i++) {
        if (this.myevaluators[i].evaluated_id._id == this.chosenID) {
          alert('請勿重複選擇同一人！');
          return;
        }
      }



      if (this.chosenRelationship === "1") {       //主管   
        this.chosenPeople = {
          evaluated_id: this.findEmployee(this.chosenID),
          // evaluated_id: this.chosenID,
          relation: "1",
          result_anonymous: true,
          evaluation_completed: false,          
        }
        // this.chooseAsDirector = true;        
        this.myevaluators_supervisor.push(this.chosenPeople);        
        this.myevaluators.push(this.chosenPeople);        
      }
      if (this.chosenRelationship === "2") {      //同事
        this.chosenPeople = {
          evaluated_id: this.findEmployee(this.chosenID),
          relation: "2",
          result_anonymous: true,
          evaluation_completed: false
        }
        // this.chooseAsColleague = true;
        this.myevaluators_colleage.push(this.chosenPeople); 
        this.myevaluators.push(this.chosenPeople);      
      }
      if (this.chosenRelationship === "3") {    //下屬
        this.chosenPeople = {
          evaluated_id: this.findEmployee(this.chosenID),
          relation: "3",
          result_anonymous: true,
          evaluation_completed: false
        }
        // this.chooseAsSubordinate = true;
        this.myevaluators_subordinate.push(this.chosenPeople);
        this.myevaluators.push(this.chosenPeople);       
      }
      if (this.chosenRelationship === "4") {     //其他
        this.chosenPeople = {
          evaluated_id: this.findEmployee(this.chosenID),
          relation: "4",
          result_anonymous: true,
          evaluation_completed: false
        }
        // this.chooseAsSubordinate = true;
        this.myevaluators_other.push(this.chosenPeople);  
        this.myevaluators.push(this.chosenPeople);     
      }
      console.log(this.myevaluators);
      console.log("myevaluators_super")
      console.log(this.myevaluators_supervisor);
      console.log("myevaluators_c")
      console.log(this.myevaluators_colleage);
      console.log("myevaluators_sub")
      console.log(this.myevaluators_subordinate);
      console.log("myevaluators_other")
      console.log(this.myevaluators_other);
      
    },


    deleteSupervisor: function(deleteID) {
      var index = -1;
      for (var i = 0; i < this.myevaluators_supervisor.length; i++) {
        if (this.myevaluators_supervisor[i].evaluated_id._id === deleteID){
          index = i;
          break;
        } else {
          index = -1;
        }
      }
      if (index !== -1) {
        this.myevaluators_supervisor.splice(index, 1);
      }
      this.deleteMyevaluators(deleteID);
      console.log(this.myevaluators_supervisor);
    },

    deleteColleage: function(deleteID) {
      var index = -1;
      for (var i = 0; i < this.myevaluators_colleage.length; i++) {
        if (this.myevaluators_colleage[i].evaluated_id._id === deleteID){
          index = i;
          break;
        } else {
          index = -1;
        }
      }
      if (index !== -1) {
        this.myevaluators_colleage.splice(index, 1);
      }
      this.deleteMyevaluators(deleteID);
      console.log(this.myevaluators_colleage);
    },

    deleteSubordinate: function(deleteID) {
      var index = -1;
      for (var i = 0; i < this.myevaluators_subordinate.length; i++) {
        if (this.myevaluators_subordinate[i].evaluated_id._id === deleteID){
          index = i;
          break;
        } else {
          index = -1;
        }
      }
      if (index !== -1) {
        this.myevaluators_subordinate.splice(index, 1);
      }
      this.deleteMyevaluators(deleteID);
      console.log(this.myevaluators_subordinate);
    },

    deleteOther: function(deleteID) {
      var index = -1;
      for (var i = 0; i < this.myevaluators_other.length; i++) {
        if (this.myevaluators_other[i].evaluated_id._id === deleteID){
          index = i;
          break;
        } else {
          index = -1;
        }
      }
      if (index !== -1) {
        this.myevaluators_other.splice(index, 1);
      }
      this.deleteMyevaluators(deleteID);
      console.log(this.myevaluators_other);
    },

    deleteMyevaluators: function(deleteID) {
      var index = -1;
      for (var i = 0; i < this.myevaluators.length; i++) {
        if (this.myevaluators[i].evaluated_id._id === deleteID){
          index = i;
          break;
        } else {
          index = -1;
        }
      }
      if (index !== -1) {
        this.myevaluators.splice(index, 1);
      }
      console.log(this.myevaluators);
    },

    saveToDB: function() {
      // this.isConfirming = true;
      this.supervisor_check = "W";
      this.supervisorOpinion = '';
      this.showConfirmStatus();
     
      Api.myevaluators_update({
            project_id: this.projectID,
            user_id: this.userID,
        // evaluated:JSON.stringify([{evaluated_id:"5c3be3e6d7fcd2054431f8c4",relation:"1",
        // result_anonymous:false,evaluation_completed:false}])
            // project_id:'5c3833b1a59eea349cafa9e5',
            // user_id: '5c3833b1a59eea349cafa9e6',
            evaluated: JSON.stringify(this.myevaluators)
            }).then((response) => {
                console.log("myevaluators_update");
                console.log(response);                
            }).catch((err) => {
                console.log(err.response);
            });

      console.log("myevaluators_aftersave")
      console.log(this.myevaluators);

        Api.sendMail({
          optionStr: 'EvaluationListSupervisorCheck',
          project_id: this.projectID,
          emp_id_list: JSON.stringify([this.user.supervisor_id])
          }).then((response) => {
            console.log(response);
          }).catch((err) => {
            console.log(err.response);
          });


    }
  
  }
};
</script>



<style scoped lang="scss">
@import "~bootstrap/scss/bootstrap";
.page-title{
        font-weight:bold;
        font-size: 25px;
        color: #12263F;
    }


.chooseEvaluator {
  color: #12263f;
  font-family: Microsoft JhengHei;
}

.examine {
  font-family: Microsoft JhengHei;
}

.chooseArea {
  font-family: Microsoft JhengHei;
  // margin-top: 55%
  // padding: 5% 5%
}

.chooseResult {
  // margin-left: 15%;
  // margin-right: 15%;
  // margin-top: 20%;
  font-family: Microsoft JhengHei;
}

.tableR{
  table-layout: fixed
}


h2,
h5 {
  font-family: Microsoft JhengHei;
  font-weight: bold;
}

tr,
td {
  font-family: Microsoft JhengHei;
  padding: 5px 15px;
}

// .tableR tr, .tableR td {
//     border: 1;
//     border-color: #548c00
// }

.modal-form-control {
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
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
</style>
