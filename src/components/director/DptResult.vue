<template>
    <div id="dptResult" class="container"> 
        <loadingFunc id:loading></loadingFunc>
        
        <!-- Modal -->
        <div class="modal fade" id="modalCenter" tabindex="-1" role="dialog" aria-labelledby="modalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLongTitle">提醒</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                {{dialogMessage}}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">關閉</button>
            </div>
            </div>
        </div>
        </div>

        <div class="row">
        <div class="col-12">
            <span class="navbar navbar-light bg-light indexLevel1">
            <form class="row">
                <a class="navbar-brand page-title">部門整體結果</a>            
            </form>
            </span>
        </div>
        </div>
    

        <form class="form-inline" style="padding-left:15px;">
            <div class="form-group mb-1"/>
            <div class="form-group mb-6">
                <label class="mr-sm-1" for="inlineFormCustomSelect">選擇查看專案：</label>
                <select class="custom-select mr-sm-1" v-model="chosenProjectID">
                <!-- <option selected>請選擇</option> -->
                <option v-for="project in projectList" :key="project._id" :label="project.name" v-bind:value="project._id">{{project}}</option>
                </select>
            </div>
            <div class="form-group mx-sm-3 mb-2">
                <td>
                <button type="button" class="btn btn-primary"   @click="filterByProject(chosenProjectID)">選擇</button>
                </td>
            </div>

            <!-- <div v-if="chosen"> -->
            <!-- <div class="row"><div class="col ml-3"><p>專案名稱：{{chosenProject[0].name}}</p></div></div>
            <div class="row"><div class="col ml-3"><p>專案開始時間：{{chosenProject[0].project_date_start}}</p></div></div>
            <div class="row"><div class="col ml-3"><p>專案結束時間：{{chosenProject[0].project_date_end}}</p></div></div> -->
            <!-- </div> -->
        </form> 

        <div id="dptResultChart" class="container">
            <div class="row" style="padding-top:15px;margin-left:50px;" v-for="(item, index) in chartArr" v-bind:key="index">
                <div class="col-12">
                    <div class="card" >
                        <div class="card-body">
                            <canvas :id="item" ></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
    import Api from "../../api";
    import { mapGetters, mapActions } from 'vuex'
    import Chart from 'chart.js';
    import loadingFunc from '../Loading'

    export default {
        name: "SelfResult",
        components: {
            loadingFunc
        },
        created() {  
            this.user = this.$store.state.user;
            this.userID = this.user._id;

            Api.project_getAll().then((response) => {
                    this.projectList = response.data;
                }).catch((err) => {
                    console.log(err.response);
            });  
        },
        mounted(){
            $('#loading').hide();
        },
        data () {
            return {
                user:'',
                userID:'',
                res_message:'',    
                chosen: false,
                chosenProject:'',
                chosenProjectID:'',
                projectList:[],

                dptResult:'',

                prObjArr: [] ,
                CHART_STR: 'chart',
                chartArr:[],
                dialogMessage:''
            }
        },
            
        methods: {
            filterByProject: async function(chosenProjectID) {  
                this.chosenProject = this.projectList.filter(function(item) {
                                    return item._id == chosenProjectID;
                                    });
                this.chosen = true;
 
                await this.getDptResultByProject();
                await this.getPR();
            
                return this.chosenProject;   
            },

            getDptResultByProject:async function() {
                $('#loading').show();

                await Api.getAssessmentResultList({
                     project_id: this.chosenProjectID,
                     user_id: this.userID
                    //  project_id: '5c47e499234e3c3860c521d8',
                    //  user_id: '5c4e9f31d5e6e2141085be93'
                }).then((response) => {
                    this.dptResult = response.data;
                    $('#loading').hide();
                }).catch((err) => {
                    $('#loading').hide();
                    this.dialogMessage = '部門結果資料載入錯誤!';
                    $('#modalCenter').modal('show');
                    console.log(err.response);
                });  
            },

            getPR:async function() {
                let projectPr = this.dptResult.project_pr;
                this.prObjArr = [];

                if(projectPr == undefined) return;
                if(projectPr.length == 0) {
                    this.dialogMessage = '無此專案的部門結果資料!';
                    $('#modalCenter').modal('show');
                }

                for(let i=0; i<projectPr.length; i++){
                    let chartObj = {};
                    let empNameList = [];
                    let prAvgArr = [];
                    let prAvgPersonArr = [];
                    
                    chartObj['text'] = (projectPr[i].ability_id && projectPr[i].ability_id.ability != null) ? projectPr[i].ability_id.ability : "null" ;
                    chartObj['pr_avg_text'] = '平均PR';
                    chartObj['pr_avg_person_text'] = '個人PR';

                    for(let j=0; j<projectPr[i].employee_prs.length; j++){
                        let empPr = projectPr[i].employee_prs[j];
                        empNameList.push(empPr.be_evaluated_id.name);
                        prAvgArr.push(projectPr[i].pr_avg);
                        prAvgPersonArr.push(empPr.pr_value);
                    }

                    chartObj['empNameList'] = empNameList;
                    chartObj['prAvgArr'] = prAvgArr;
                    chartObj['prAvgPersonArr'] = prAvgPersonArr;
                    this.prObjArr.push(chartObj);
                }
    
                await this.addChartElement();
            },
            
            addChartElement: function() {
                this.chartArr = [];
                for(let i=0; i<this.prObjArr.length; i++){
                    let chartName = this.CHART_STR+i;
                    this.chartArr.push(chartName);
                }

                this.$nextTick(()=>{
                    this.plotCharts();
                });
            },

            plotCharts: function() {
                for(let i=0; i<this.prObjArr.length; i++){
                    let chartName = this.chartArr[i];
                    let ctx = document.getElementById(chartName).getContext("2d");

                    new Chart(ctx, 
                        {
                            type: 'bar',
                            data: {
                                labels: this.prObjArr[i].empNameList,
                                datasets: [{
                                    type: 'line',
                                    label: this.prObjArr[i].pr_avg_text,
                                    data: this.prObjArr[i].prAvgArr
                                },
                                {
                                    type: 'bar',
                                    label: this.prObjArr[i].pr_avg_person_text,
                                    data: this.prObjArr[i].prAvgPersonArr,
                                    backgroundColor: '#2C7BE5',
                                    borderColor: '#2C7BE5',
                                    borderWidth: 1
                                }]
                            },
                            options: {
                                responsive: true,
                                title: {
                                    display: true,
                                    text: this.prObjArr[i].text,
                                    fontSize: 20,
                                },
                                legend: { //是否要顯示圖示
                                    display: true,
                                },
                                tooltips: { //是否要顯示 tooltip
                                    enabled: true
                                },
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                },
                                layout: {
                                    padding: {
                                        left: 50,
                                        right: 0,
                                        top: 0,
                                        bottom: 0
                                    }
                                }
                            }
                        }
                    );//new Chart end
                }//for end
            }// end plotCharts func
        }//end methods
    }//end export default
</script>

<style scoped lang="scss">
@import "~bootstrap/scss/bootstrap";
.page-title{
        font-weight:bold;
        font-size: 25px;
        color: #12263F;
    }

#dptResultChart {
    width: 700px;
    height: 600px;
    z-index: 0; 
    position:relative;
    top:45%;
    left:0%;
}

.form-inline { 
  position: relative;  
  left:25%;
  top: 30%;
}

.row {
  /*向左右兩邊凸出15px*/
  margin-right: -15px; 
  margin-left: -15px;
}
 
.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {
  /*向左右兩邊內陷15px，這是製造每個col之間的空隙*/
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}

</style>
