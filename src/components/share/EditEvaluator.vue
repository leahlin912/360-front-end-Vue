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

    <div class="row">
      <div class="col-6">
        <div class="row" id="examine"><h5 style="margin-top: 1%; margin-left:5%">目前審核情形</h5></div>
        <div class="row">
        <div class="table-responsive-md my-1">
          <table class="table" id="resultTable" style="background-color: #D2DDEB; border-radius: 5px; margin-left:15%">
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
    <div class="col-6">
      <div class="row"><h5 style="margin-top: 1%; margin-left:3%">主管建議：</h5></div>
      <div class="card row" style="width: 18rem">
        <div class="card-body"><p class="card-text">{{myevaluationList.supervisor_opinion}}</p></div>
      </div>
    </div>
  </div>
  

    <div class="row" id="chooseArea">
      <div class="col-12"><h5 style="margin-top: 2%; margin-left:3%">選擇評量者</h5><div>
    </div>
    <div class="table-responsive-md">
      <table style="margin-left: 1%">
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
              </select>
            </div>
          </td>

          <td>
            <button type="button" class="btn btn-outline-primary mr-sm-3" @click="saveEvaluators">新增</button>
          </td>

        </tr>
      </table>
    </div>
    


    <div id="chooseResult" class="row">
      <div class="col-12"><h5 style="margin-top: 2%; margin-left: 3%">目前選擇結果</h5></div>
    </div>
    <div class="row">
      <div class="table-responsive ml-2 col-md-12 my-1 mr-3">
      <table id="tableR" class="col-10" align="center" style="table-layout:fixed; margin-left:4%; margin-right:20%">
        <tr class="row" align="center" style="color:#2C7BE5; background-color: #F6F6F6; font-weight: bold">  
          <th class="col-3">關係</th>
          <th class="col-7">人選</th>
        </tr>
        <tr class="row" align="center" style="background-color: #ffffff">
          <td class="col-3" align="center" style="font-weight: bold">主管</td>
          <td class="col-7">
            <button 
              type="button" class="btn btn-outline-secondary"
              v-for="item in myevaluators_supervisor" :key="item.evaluated_id._id" :label="item.evaluated_id.name" v-bind:value="item.evaluated_id._id"
              @click="deleteSupervisor(item.evaluated_id._id)"
            >{{item.evaluated_id.name}}  X</button>
          </td>
        </tr>
        <tr class="row" align="center" style="background-color: #ffffff">
          <td class="col-3" align="center" style="font-weight: bold">同事</td>
          <td class="col-7">
            <button
              type="button" class="btn btn-outline-secondary" 
              v-for="item in myevaluators_colleage" :key="item.evaluated_id._id" :label="item.evaluated_id.name" v-bind:value="item.evaluated_id._id"
              @click="deleteColleage(item.evaluated_id._id)"
            >{{item.evaluated_id.name}}  X</button>
          </td>
        </tr>
        <tr class="row" align="center" style="background-color: #ffffff">
          <td class="col-3" align="center" style="font-weight: bold">下屬</td>
          <td class="col-7">
            <button
              type="button" class="btn btn-outline-secondary"
              v-for="item in myevaluators_subordinate" :key="item.evaluated_id._id" :label="item.evaluated_id.name" v-bind:value="item.evaluated_id._id"
              @click="deleteSubordinate(item.evaluated_id._id)"
            >{{item.evaluated_id.name}}  X</button>
          </td>
        </tr>
        <tr class="row" align="center" style="background-color: #ffffff">
          <td class="col-3" align="center" style="font-weight: bold">其他</td>
          <td class="col-7">
            <button
              type="button" class="btn btn-outline-secondary"
              v-for="item in myevaluators_other" :key="item.evaluated_id._id" :label="item.evaluated_id.name" v-bind:value="item.evaluated_id._id"
               @click="deleteOther(item.evaluated_id._id)"
            >{{item.evaluated_id.name}}  X</button>
          </td>
        </tr>
      </table>

      <button
        v-if="btnSubmitFunc" type="button" class="btn btn-primary" @click="saveToDB" style="margin-left: 50%; margin-top: 1%"
      >修改</button>
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
      this.employee = '';    //選擇的員工ID
      this.employeeID = this.employee._id;
        console.log(this.employee);
        console.log(this.employee._id);



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
                this.employeeList = response.data;
                console.log("employeelist")
                console.log(this.employeeList);
            }).catch((err) => {
                console.log(err.response);
            });
      
      Api.myevaluators_get({
            project_id: this.projectID,
            user_id: this.employeeID
            }).then((response) => {
                  console.log("myevaluators_get");                
                  console.log(response);           
                this.showConfirmStatus();                    
                 
                this.myevaluationList = response.data[0].evaluated;
                  console.log("myevaluationList_load");
                  console.log(this.myevaluationList);
                // if(this.myevaluationList.supervisor_check !== null) {
                this.supervisor_check = response.data[0].supervisor_check; 
                this.showConfirmStatus();                    
                    
                }).catch((err) => {
                console.log(err.response);
            });

  },

  data() {
    return {
      project:"",
      projectID:"",
      employee:"",
      employeeID:"",

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
        
    showConfirmStatus: function() {      
      this.isUnsubmit = false;
      this.isConfirming = false;
      this.isPass = false;
      this.isDisagree = false; 
      this.btnSubmitFunc = true; //預設應為false, 只在unsubmit, disagree時為true
      console.log(this.supervisor_check);
      if (this.supervisor_check === "") {   
        this.isUnsubmit = true;
        return;
      }
      switch(this.supervisor_check) {   //Y(已審核)/N(未審核)/P(不通過)/W(審核中)
        case "Y":
          this.isPass = true;
          break;        
        case "N":
          this.isUnsubmit = true;
          // this.btnSubmitFunc = true;
          break;
        case "P":
          this.isDisagree = true;
          // btnSubmitFunc = true;
          break;
        case "W":
          this.isConfirming = true;
          break;
        default:
          this.isUnsubmit = true;
          // this.btnSubmitFunc = true;
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
      return findWho;
    },

    saveEvaluators: function() {
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
      this.showConfirmStatus();
     
      Api.myevaluators_update({
            project_id: this.projectID,
            user_id: this.employeeID,
            evaluated: JSON.stringify(this.myevaluators)
            }).then((response) => {
                console.log("myevaluators_update");
                console.log(response);                
            }).catch((err) => {
                console.log(err.response);
            });

      console.log("myevaluators_aftersave")
      console.log(this.myevaluators);
      
    },

    delete: function() {}
  
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

</style>
