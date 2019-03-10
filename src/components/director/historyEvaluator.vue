<template>
  <div id="historyEvaluator" class="container">  
    <loadingFunc id:loading></loadingFunc>
   
    <div class="row">
      <div class="col-12">
        <span class="navbar navbar-light bg-light indexLevel1">
          <form class="form-inline">
              <a class="navbar-brand page-title">查看評量下屬者</a>            
          </form>
        </span>
      </div>
    </div>

    <div class="row">
    <div class="col-sm-4 my-2  ml-3">
      <label class="mr-sm-1" for="inlineFormCustomSelect" style="font-size: 20px">選擇查看專案：</label>
      <select class="custom-select mr-sm-1" v-model="chosenProjectID">
        <!-- <option selected>請選擇</option> -->
        <option v-for="project in projectList" :key="project._id" :label="project.name" v-bind:value="project._id">{{project}}</option>
      </select>
    </div>
      <td  style="padding-top: 45px">
        <button type="button" class="btn btn-primary" @click="filterByProject(chosenProjectID)">選擇</button>
      </td>
    </div>
    

    <div v-if="choosed">
    <div class="row"><div class="col ml-3 mt-3"><p>專案名稱：{{chosenProject[0].name}}</p></div></div>
    <!-- <div class="row"><div class="col ml-3"><p>專案開始時間：{{chosenProject[0].project_date_start}}</p></div></div>
    <div class="row"><div class="col ml-3"><p>專案結束時間：{{chosenProject[0].project_date_end}}</p></div></div> -->
    <div class="row"><div class="col ml-3 mb-2"><p>部門：{{user.department_id.name}}</p></div></div>
   
    <div v-if="showList" class="row">
    <table class="table-responsive-md ml-3 col-12">
    <table class="table ml-3  table-curved">
      <thead class="thead" style="background-color:#F7F7F7">
        <tr align="center">
          <th scope="col" style="vertical-align: middle;">員工編號</th>
          <th scope="col" style="vertical-align: middle;">員工姓名</th>
          <!-- <th scope="col">評量者人數</th> -->
          <th scope="col" style="vertical-align: middle;">評量者名單</th>
        </tr>
      </thead>
      <tbody style="background-color:#FFFFFF">
        <tr v-for="(item, index) in subList" v-bind:key="index" align="center">
          <td scope="row" style="vertical-align: middle;">{{item.employee.job_no}}</td>
          <td style="vertical-align: middle;">{{item.employee.name}}</td>
          <!-- <td>{{item.EvaluationList.evaluated.length}}</td> -->

          <td style="vertical-align: middle;">
            <!-- <font-awesome-icon icon="eye" style="color:#7F91AC;font-size:20px" class="btnEye" @click="watchEvaluators" /> -->
            <font-awesome-icon icon="eye"  v-if="item.EvaluationList.supervisor_check === 'Y'" style="color:#7F91AC;font-size:25px" class="btnEye" @click="watchEvaluators(item)"/>
              <!-- <button v-if="item.EvaluationList.supervisor_check === 'Y'" class="btn btn-xs fs-10 btn-bold btn-view1" type="button"  @click="watchEvaluators(item)">
              <img src="../../assets/view.png" width="20">
            </button> -->
          </td>
        </tr>
      </tbody>
    </table>
    </table>
    </div>
    </div>


    <div v-if="toWatch">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                
                <div class="modal-header"><h5 class="modal-title">查看評量員工者</h5></div>

                <div class="modal-body modal-open">
                  <p>員工姓名：{{watchPerson.employee.name}}</p>
                  <p>評量員工者名單：</p>
                  <table class="table" id="tableEvaluators1">
                        <thead>
                            <tr align="center" style="backgound-color:#f5f5f5">         
                                <th class="col" style="width: 30%; vertical-align: middle;">關係</th>
                                <th class="col" style="width: 20%; vertical-align: middle;">姓名</th>
                                <th class="col" style="width: 30%; vertical-align: middle;">單位</th>                                
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
  name: 'HistoryEvaluator',

  components: {
        loadingFunc
    },

  created() {
    $('#loading').show();


    this.user = this.$store.state.user;
    this.userID = this.user._id;
      console.log(this.user);
      console.log(this.user._id);


    Api.project_getAll().then((response) => {
                console.log("project_getAll");
                console.log(response);
                this.projectList = response.data;
                console.log(this.projectList);
                
                $('#loading').hide();
            }).catch((err) => {
                console.log(err.response);
            });  

    

  },

  data() {
    return {
      user:"",
      userID:"",
      hasEvaluators: true,
      toWatch: false,
      // watchId: "",
      watchPerson: "",
      // watchName: "",

      choosed: false,
      chosenProjectID:"",
      chosenProject:"",
    //   projectName: "2018年度評比(下)",
      // projectTime: "2018/07/01~2018/12/31",
      projectTime: "",
      
      projectList:[],
      
      supervisorDpt: "",
      subList:[],
      showList: false

       
    };
  },

  methods: {
    filterByProject: function(chosenProjectID) {
      $('#loading').show();
      console.log(this.chosenProjectID);   
      if (chosenProjectID == '') {
        alert('請選擇專案！');
        $('#loading').hide();
        return;
      }   
      this.chosenProject = this.projectList.filter(function(item) {
                            return item._id == chosenProjectID;
                          });
      console.log(this.chosenProject);
      this.getSubList(chosenProjectID);      
      this.choosed = true;

      return this.chosenProject;                    
    },

    getSubList: function(chosenProjectID) {
        Api.subEvaluationList_get(
        {project_id: chosenProjectID,
         user_id: this.userID   //主管自己的id
        }).then((response) => {
            console.log("subEvaluationList_get");                
            console.log(response);       

            this.subList = response.data;     
              console.log(this.subList); 

            setTimeout(function(){
              this.showList = true;              
              $('#loading').hide();
            }.bind(this), 1000);

        }).catch((err) => {
            console.log(err.response);
        });   
    },

    // getChooseList: function() {
    //     for(let i = 0; i < this.subList.length; i++) {
    //         if (typeof this.subList[i]._id != "undefined") {
    //             Api.myevaluators_get(
    //                 {project_id: this.chosenProjectID,
    //                 user_id: this.subList[i]._id.toString()
    //                 }).then((response) => {                               
    //                     console.log(response); 
    //                     // console.log(this.subList);
    //                     // console.log(this.subList[i]);
    //                     console.log(response.data[0]);
    //                     console.log(typeof response.data[0]);
    //                     this.subList[i].subsubChooseList = response.data[0];

    //                     console.log(this.subList[i]);
                        
    //                     console.log(this.subList[i].subsubChooseList)
                                             
    //                 }).catch((err) => {
    //                     console.log(err.response);
    //                 }); 
    //         }
    //     }
    // },

    watchEvaluators: function(watchObj) {
      this.toWatch = true;
      console.log(this.toWatch);
      // this.checkId = checkId;
      // this.checkPerson = this.evaluatorList.find(item => item.id === checkId);
      // this.checkName = this.checkPerson.name;
      // console.log(checkId);
      this.watchPerson = watchObj;
      console.log(this.watchPerson);
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

.table {
  font-family: Microsoft JhengHei;
}

p {
  font-weight:bold;
}

font-awesome-icon {  
  cursor: pointer;
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







.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-form-control {
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
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

.modal-body {
  max-height: calc(100vh - 210px);
  overflow-y: auto;
}
.modal-open {
  overflow: scroll;
}

.page-title {
  font-weight: bold;
  font-size: 25px;
  color: #12263f;
}
#btn-add {
  margin-left: 5dp;
}
#input-search {
  margin-left: 5dp;
}
#input-search {
  margin-left: 5dp;
}
#department-title {
  font-weight: bold;
  font-size: 20px;
}
.fc-light {
  font-size: 15px;
  color: #6e757c;
}
.fc-dark {
  font-size: 15px;
  color: #2f3e4e;
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
  align-items: center;
  justify-content: space-between;
}
.situation-group {
  width: 15%;
  vertical-align: top;
}
.info-group {
  -ms-flex-align: center;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  justify-content: space-between;
  display: -webkit-box;
  width: 70%;
}
.button-group {
  text-align: center;
  width: 15%;
}
.btn-edit1 {
  background-color: #d2ddeb;
  margin-top: 5pt;
}
.btn-delete1 {
  background-color: #d2ddeb;
  margin-top: 5pt;
}
.btn-view1 {
  background-color: #d2ddeb;
  margin-top: 5pt;
}
.btn-edit2 {
  background-color: #eff0f1;
  margin-top: 5pt;
}
.btn-delete2 {
  background-color: #eff0f1;
  margin-top: 5pt;
}
.btn-view2 {
  background-color: #eff0f1;
  margin-top: 5pt;
}
#name {
  font-size: 15px;
  text-align: left;
  font-weight: bolder;
}
#serial-number {
  font-size: 15px;
  text-align: left;
}
#position {
  font-size: 15px;
  text-align: left;
}
#account {
  font-size: 15px;
  text-align: left;
}
#direct-boss {
  font-size: 15px;
  text-align: left;
  color: #98a0ab;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-form-control {
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
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
.modal-form-control-2 {
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
.switch input {
  display: none;
}
.switch {
  display: inline-block;
  width: 60px;
  height: 30px;
  margin: 8px;
  transform: translateY(50%);
  position: relative;
}

.slider {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 30px;
  box-shadow: 0 0 0 2px #777, 0 0 4px #777;
  cursor: pointer;
  border: 4px solid transparent;
  overflow: hidden;
  transition: 0.4s;
}
.slider:before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background: #777;
  border-radius: 30px;
  transform: translateX(-30px);
  transition: 0.4s;
}

input:checked + .slider:before {
  transform: translateX(30px);
  background: #2c7be5;
}
input:checked + .slider {
  box-shadow: 0 0 0 2px #2c7be5, 0 0 2px #2c7be5;
}
.modal-body {
  max-height: calc(100vh - 210px);
  overflow-y: auto;
}
.modal-open {
  overflow: scroll;
}
</style>
