<template>
    <div id="evaluationEntry" class="container">        
        <loadingFunc id:loading></loadingFunc>
        
        <div class="row">
            <div class="col-12">
                <span class="navbar navbar-light bg-light indexLevel1">
                <form class="form-inline">
                    <a class="navbar-brand page-title">評量他人</a>            
                </form>
                </span>
            </div>
        </div>

        <div class="row"><div class="col ml-3 mt-3"><p> 專案名稱：{{this.project.name}} </p></div></div>
        <div class="row"><div class="col ml-3"><p> 評量時間：{{this.project.project_date_start}}～{{this.project.project_date_end}}</p></div></div>

        <div v-if="showEvaluationList === false"><p style="font-size:20px; color: red; font-weight:normal; margin-top: 2.5%; margin-left: 2%">
            目前無此專案的評量對象！</p></div>

        <div v-if="showEvaluationList">
        <div class="row ml-3" id="examine"><h5 style="margin-top: 2%">選擇評量對象</h5></div>
        
        <table class="table-responsive-md ml-2">
        <table class="table ml-2 table-curved">
            <thead class="thead" style="background-color:#F7F7F7">
                <tr align="center">
                <th scope="col" class="align-middle"><div style="height: 50px; line-height: 50px; text-align:center">部門</div></th>
                <th scope="col" class="align-middle">姓名</th>
                <th scope="col" class="align-middle">評量狀態</th>
                <th scope="col" class="align-middle">進行評量</th>
                <th scope="col" class="align-middle">檢視</th>
                </tr>
            </thead>
        <tbody>
            <tr v-for="item in evaluationList" v-bind:key="item.be_evaluated_id._id" align="center" style="background-color:#FFFFFF">
            <td scope="row" class="align-middle">{{item.be_evaluated_id.department_id.name}}</td>
            <td class="align-middle">{{item.be_evaluated_id.name}}</td>
            
            <td v-if="item.iFinishHisEvaluation" class="align-middle">已送出</td>
            <td v-if="item.iFinishHisEvaluation === false" class="align-middle">待評核</td>
            
            <td class="align-middle">
                <button class="btn btn-xs fs-10 btn-bold btn-edit1" @click="doEvaluation(item)">
                    <img src="../../assets/edit.png" width="20">
                </button>
            </td>

            <td class="align-middle">
                <!-- <button v-if="item.iFinishHisEvaluation" class="btn btn-xs fs-10 btn-bold btn-view1"  @click="watchEvaluation(item.be_evaluated_id)"> -->
                <button v-if="item.iFinishHisEvaluation" class="btn btn-xs fs-10 btn-bold btn-view1"  @click="watchEvaluation(item.be_evaluated_id)">
                    <img src="../../assets/view.png" width="20">
                </button>
            </td>
            </tr>    
        </tbody>
        </table>
        </table>
        </div>
        <p style="margin-left: 2%; margin-bottom: 5%; font-weight: normal; color: #FF0000">※ 送出後，可再次進行評量。互評結果將以最後一次送出的內容為主。</p>

    </div>
</template>


<script>
import Api from "../../api";
import { mapGetters, mapActions } from 'vuex'
import loadingFunc from '../Loading'


export default {
    name:"EvaluationEntry",

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
        

        let Func = async() => {
            try {
                let response = await Api.getAssessmentList({
                                    project_id: this.projectID,            
                                    user_id: this.userID   
                                })
                console.log(response);
                this.evaluationListTmp = response.data;
                  console.log(this.evaluationListTmp);
                await this.setEvaluationList();
                  console.log(this.evaluationList);

                Api.getHistoricalRecordOfTopicRes({
                    user_id: this.userID  
                }).then((response) => {
                    console.log(response);
                    let responseData = response.data;
                    console.log(responseData);

                    for (let j = 0; j < this.evaluationList.length; j++) { 
                        console.log(j)                           
                        for (let i = 0; i < responseData.length; i++) {
                            console.log(responseData[i]);

                            if (responseData[i].project_id === null){
                                this.anyTmpSave = false;
                                continue
                            }
                            console.log(responseData[i].project_id._id === this.projectID)
                            if (responseData[i].project_id._id === this.projectID) {                                
                                console.log(this.evaluationList[j].be_evaluated_id._id == responseData[i].be_evaluated_id._id)
                                if (this.evaluationList[j].be_evaluated_id._id == responseData[i].be_evaluated_id._id) {
                                    this.evaluationList[j].hasTmpData = true;
                                    this.evaluationList[j].tmpSaveData = responseData[i]; 
                                    break;
                                } else {
                                    this.evaluationList[j].hasTmpData = false;
                                }
                            }                                           
                        }
                    }
                    console.log(this.evaluationList)
                    
                }).catch((err) => {
                    console.log(err.response);

                    if ('data' in err.response && err.response.data.errorMsg === "Data not found") {
                        this.anyTmpSave = false;
                    }
                })
            } catch(err) {
                console.log(err);
            }
        }

        Func().then(() => {            
            if (this.evaluationList.length !== 0) { 
                this.showEvaluationList = true;
            } else {
                this.showEvaluationList = false;
            }
            $('#loading').hide();
        }).catch((err) => {
            console.log(err);
            if ('data' in err && err.response.data.errorMsg === "Data not found") {
                this.anyTmpSave = false;
            }
        })

    },


    data(){
        return {
            showEvaluationList: false,
            project:"",
            projectID:"",
            user:"",
            userID:"",           

            evaluationListTmp:'',
            evaluationList:[],
            // evaluateTarget:"",
            watchTarget:"",
            anyTmpSave: false,
            // tmpSaveData:''
            
        }
    },

    methods: {
        doEvaluation: function(evaluateTarget) {
            console.log(evaluateTarget)
            console.log(evaluateTarget.hasTmpData)
            if ('hasTmpData' in evaluateTarget && evaluateTarget.hasTmpData === true) {
                this.$router.push({path:'/EvaluationEntry/DoEvaluationNew', 
                    query:{evaluateTarget: evaluateTarget.be_evaluated_id, tmpSave: evaluateTarget.hasTmpData, tmpSaveData: evaluateTarget.tmpSaveData}})
            } else {
                this.$router.push({path:'/EvaluationEntry/DoEvaluation', 
                    query:{evaluateTarget: evaluateTarget.be_evaluated_id}})            
            }
        },
        
        watchEvaluation: function(watchTarget) {
            this.$router.push({path:'/EvaluationEntry/WatchAnswer', 
                query:{watchTarget: watchTarget, watchProject: this.project}})
        },


        setEvaluationList: function() {
            for(let i = 0; i < this.evaluationListTmp.length; i++) {
                if (this.evaluationListTmp[i].supervisor_check === "Y") {
                    this.evaluationList.push(this.evaluationListTmp[i]);
                } else {
                    continue;
                }
            }
            console.log(this.evaluationList);
            for(let j = 0; j < this.evaluationList.length; j++) {
                for(let k = 0; k < this.evaluationList[j].evaluated.length; k++) {
                    if (this.evaluationList[j].evaluated[k].evaluated_id._id === this.userID) {
                        this.evaluationList[j].iFinishHisEvaluation = this.evaluationList[j].evaluated[k].evaluation_completed;
                    }
                }
            }
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

h5, p {
    font-weight: bold
}

.btn-edit1{
        background-color: #D2DDEB;
        margin-top: 5pt;
    }

.btn-view1{
        background-color: #D2DDEB;
        margin-top: 5pt;
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
