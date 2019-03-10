<template>
    <div id="resultEntry" class="container">        
        <loadingFunc id:loading></loadingFunc>
        <div class="row">
            <div class="col-12">
                <span class="navbar navbar-light bg-light indexLevel1">
                <form class="form-inline">
                    <a class="navbar-brand page-title">部門員工個別結果查詢</a>            
                </form>
                </span>
            </div>
        </div>

        <div class="row mb-4">
            <div class="col-sm-4 my-2  ml-3">
            <label class="mr-sm-1" for="inlineFormCustomSelect" style="font-size: 20px">選擇查看專案：</label>
            <select class="custom-select mr-sm-1" v-model="chosenProjectID">
            <!-- <option selected>請選擇</option> -->
            <option v-for="project in projectList" :key="project._id" :label="project.name" v-bind:value="project._id">{{project}}</option>
            </select>
            </div>
            <td style="padding-top: 45px"><button type="button" class="btn btn-primary ml-3" @click="filterByProject(chosenProjectID)">
                選擇</button></td>
        </div>


        <div v-if="chosen">
        <div class="row"><div class="col" style="margin-left: 2%">
            <p>專案名稱：{{chosenProject[0].name}}</p></div></div>
        <div class="row"><div class="col" style="margin-left: 2%">
            <p>專案時間：{{chosenProject[0].project_date_start}} ~ {{chosenProject[0].project_date_end}}</p></div></div> 
        <div class="row"><div class="col" style="margin-left: 2%">
            <p>部門：{{user.department_id.name}}</p></div></div>    
        
        <div v-if="showList === false"><p style="font-size:20px; color: red; font-weight: bold; margin-top: 2%; margin-left: 2.5%">
        此專案目前無受評結果。</p></div>

        <div v-if="showList">
        <div class="row">
        <table class="table-responsive-md ml-3 col-12">
        <table id="tableList" class="table table-curved ml-3">
        <thead class="thead" style="background-color:#F7F7F7">
        <tr align="center">
          <th scope="col" style="height: 80px; vertical-align: middle;">員工編號</th>
          <th scope="col" style="vertical-align: middle;">員工姓名</th>
          <th scope="col" style="vertical-align: middle;">受評結果</th>
        </tr>
      </thead>
      <tbody style="background-color:#FFFFFF">
        <tr v-for="(item, index) in dptResult.employeeList" v-bind:key="index" align="center">
          <td style="height: 80px; vertical-align: middle;">{{item.job_no}}</td>
          <td style="vertical-align: middle;">{{item.name}}</td>
          
          <td style="vertical-align: middle;">
            <button v-if="item.hasResult" class="btn btn-xs fs-10 btn-bold btn-view1" type="button"  @click="watchResult(item)">
              <img src="../../assets/view.png" width="20">
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    </table>
    </div>
        </div>
    



        </div>



    </div>
</template>

<script>
import Api from "../../api";
import { mapGetters, mapActions } from 'vuex'
import loadingFunc from '../Loading'


export default {
    name:"ResultEntry",

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

    data(){
        return {
            showList: false,            
            user:"",
            userID:"",
            
            chosen: false,
            chosenProject:'',
            chosenProjectID:'',
            
            projectList:[],
            // hasResult: false,
            hasResultList:[],


        }
    }, 

    methods: {
        getProjectResult: function(){
            Api.getAssessmentResultList({
                user_id: this.userID
                }).then((response) => {
                    console.log(response);
                    this.employeeList = response.data;
                    console.log(this.employeeList);
                    // this.showList = true;
                }).catch((err) => {
                    console.log(err.response);
                });  
        },

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

            let func = async () => {
            try{
                let response = await Api.getAssessmentResultList({
                    project_id: this.chosenProjectID,
                    user_id: this.userID});

                console.log(response);
                this.dptResult = response.data;
                    console.log(this.dptResult);
                
                if (this.dptResult.project_pr.length !== 0) {
                    this.hasResultList = this.dptResult.project_pr[0].employee_prs;
                    console.log(this.hasResultList);
                }

                for(let k = 0; k < this.dptResult.employeeList.length; k++) {
                    this.dptResult.employeeList[k].hasResult = false;
                }
                console.log(this.dptResult.employeeList);


                for(let i = 0; i < this.dptResult.employeeList.length; i++) {
                    for (let j = 0; j < this.hasResultList.length; j++) {
                        if (this.hasResultList[j].be_evaluated_id._id == this.dptResult.employeeList[i]._id) {
                            this.dptResult.employeeList[i].hasResult = true;
                        } 
                    }
                }
                console.log(this.dptResult);


            } catch(err) {
                console.log(err);
            }};

            func().then(() => {
                this.chosen = true;
                if (this.dptResult.employeeList.length !== 0) {
                    this.showList = true;
                } else {
                    this.showList = false;
                }
                $('#loading').hide();
            }).catch((err) => {
                console.log(err.response);
            });

        return this.chosenProject;  
        },

        getDptResultByProject: function() {
            Api.getAssessmentResultList({
                project_id: this.chosenProjectID,
                user_id: this.userID
                // project_id: '5c3be3ddd7fcd2054431f8c3',
                // user_id: '5c3be3e6d7fcd2054431f8c4'
            }).then((response) => {
                console.log(response);
                this.dptResult = response.data;
                    console.log(this.dptResult);
            }).catch((err) => {
                console.log(err.response);
            });  
        },

        watchResult: function(item) {
            console.log(this.chosenProject[0])
            console.log(this.chosenProject[0]._id)            
            console.log(item)
            console.log(item._id)            
            // console.log(this.chosenProject)
            this.$router.push({path:'/PersonalReport', 
                query:{project_id: this.chosenProject[0]._id, user_id: item._id}})   
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

p {
    font-weight:bold;
}

.btn-view1 {
  background-color: #eff0f1;
  margin-top: 5pt;
}

.tableList{
    border: solid 1px #777777;

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



</style>
