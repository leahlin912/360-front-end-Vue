<template>
    <div>
    <font-awesome-icon icon="edit" style="color:#7F91AC;font-size:20px" class="btnEdit" @click="editEvaluators"/>
            
    <div v-if="toEdit">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog" role="document">
                <div class="modal-content">

                  <div class="modal-header">
                    <h5 class="modal-title">編輯評量員工者</h5>
                  </div>
                  
                  <div class="modal-body modal-open">
                    <p> 員工姓名：{{editName}} </p>

                    <div class="row" id="chooseArea">
                        <div class="col-12"><h5 style="margin-top: 2%; margin-left:3%">選擇評量者</h5></div>
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
                            </div>
                    </div>

                    <div id="chooseResult" class="row">
                        <div class="col-12"><h5 style="margin-top: 2%; margin-left: 3%">目前選擇結果</h5></div>    
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
                                <!-- <p v-show="chooseAsDirector" v-for="name in evaluatorList[0].directorEvaluator" :key="name" :label="name" v-bind:value="name"> {{name}} </p> -->
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
                        </div>
                        </div>
                    </div>
                  </div>

                  <div class="modal-footer">                                
                    <button type="button" class="btn btn-secondary" @click="toEdit = false">關閉</button>
                    <button type="button" class="btn btn-primary" @click="change">修改</button>
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
export default {
    name: "EditEvaluator",
    data() {
        return {
            chosenRelationship: "",
            chosenDpt: "請選擇",
            chosenID: "請選擇",
            chosenPeople: "",

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
                 
        }
    },

    methods: {
        editEvaluator: function(employeeeID) {
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
            
            Api.myevaluators_get({project_id:'5c3be3ddd7fcd2054431f8c3',
                    user_id: employeeeID.toString
                    }).then((response) => {
                        console.log("myevaluators_get");                
                        console.log(response);                
                        this.myevaluationList = response.data[0].evaluated;
                        console.log("myevaluationList_load");
                        console.log(this.myevaluationList);
                        // if(this.myevaluationList.supervisor_check !== null) {
                        this.supervisor_check = response.data[0].supervisor_check;                
                            
                        }).catch((err) => {
                        console.log(err.response);
                    });


            

        }



    }
}
</script>


<style scoped lang="scss">
@import "~bootstrap/scss/bootstrap";






</style>
