<template>
    <div>
        <div class="container">
            <loadingFunc id:loading></loadingFunc>
            <span class="navbar">
                <form class="form-inline">
                    <a class="navbar-brand page-title" href="#/ProjectManagement">個人評量結果報告</a>
                </form>
            </span>
            
            <!-- 目前查看的專案 -->
            <div class="list-group">
                    <ul class="list-group pl-2 pr-2">
                        <li class="list-group-item d-flex align-items-center">   
                            <span class="d-flex project-group fc-dark row">
                                <div >
                                    <span class="p-2 col-md-2" style="font-weight: bolder">目前查看的專案：{{identifyProject(projectId)}}</span>
                                </div>
                                <div class="p-2 project-group row d-flex  m-2">
                                    <div class="input-group">
                                        <select class="form-control" v-model="pickedProjectId">
                                            <option v-for="project in projectList" :key="project._id" :value="project._id">{{project.name}}</option>
                                            </option :value="pickedProjectId" disabled selected hidden>{{identifyProject(pickedProjectId)}}</option>
                                        </select>
                                        <div class="input-group-append">
                                            <span class="btn btn-outline-primary" @click="resetProject()"> 查看其他專案</span>
                                        </div>
                                    </div>  
                                </div> 
                            </span>
                        </li>
                    </ul>
                </div>
            
            <!-- 員工個人資料 -->
            <div v-if="employee!={}" class="list-group">
                <ul class="list-group p-2">
                    <li class="list-group-item d-flex align-items-center">   
                        <span class="d-flex project-group fc-dark row">
                            <div id="name" >
                                <span class="p-2 col-md-2" style="font-weight: bolder">員工個人資訊：</span>
                            </div>
                        </span>
                    </li>
                    <li  class=" list-group-item d-flex align-items-center " style="text-align:right"> 
                        <div class="checked-group m-1 p-2">
                            <form style="text-align:left">
                                <div class="form-group row">
                                    <label class="col-sm-2 " >姓名</label>
                                    <div class="col-sm-10">
                                        <form class="form-inline align-items-center">
                                            {{employee.name}}
                                            <form class="form-inline">
                                                <span v-if="(employee.situation==='Y')" class="badge badge-pill badge-primary" >在職中</span>
                                                <span v-else class="badge badge-pill badge-secondary">已離職</span>
                                            </form>
                                        </form>
                                    </div>
                                    <label class="col-sm-2">編號</label>
                                    <div class="col-sm-10">
                                        {{employee.job_no}}
                                    </div>
                                    <label class="col-sm-2">帳號</label>
                                    <div class="col-sm-10">
                                        {{employee.email}}
                                    </div>
                                    <label class="col-sm-2">部門</label>
                                    <div class="col-sm-10">
                                        {{employee.department_id}}
                                    </div>
                                    <label class="col-sm-2">職稱</label>
                                    <div class="col-sm-10">
                                        <form class="form-inline align-items-center">
                                            {{employee.job_title}}
                                            <form class="form-inline">
                                                <input type="checkbox" class="form-check-input"  v-model="employee.position"  :true-value=2 :false-value=1 disabled>
                                                <label >主管級</label>
                                            </form>
                                        </form>
                                    </div>
                                    <label class="col-sm-2">主管</label>
                                    <div class="col-sm-10">
                                        {{employee.supervisor_id}}
                                    </div>
                                    
                                </div>  
                            </form>
                        </div>
                        
                    </li>
                </ul>
            </div>
            <!-- 員工報告結果呈現 -->
            <div class="row project-group d-flex m-2">
                <div v-for="(ability,index) in abilityType" class="list-group col-md-12 mb-2" >
                    <ul class="list-group">
                        <li class="list-group-item d-flex align-items-center">   
                            <div id="ability" >
                                <span v-if="ability.department_id===null">全體 
                                    <!-- <span v-if="ability.ability_id==null">(能力null)</span> -->
                                    <span>{{ability.ability_id.ability}}</span>
                                </span>
                                <span v-else>{{ability.department_id.name}} 
                                    <!-- <span v-if="ability.ability_id==null">(能力null)</span> -->
                                    <span>{{ability.ability_id.ability}}</span>
                                </span>
                            </div>
                            <div v-if="ability.hasPR">
                                {{(ability.employee_pr_avg).toFixed(2)}}分/PR值:{{ability.employee_pr_value}}
                            </div>
                        </li>
                        <li  v-if="ability.hasPR" class="list-group-item d-flex align-items-center"> 
                            <canvas :id="ability.chart" class="chart-area"></canvas>
                        </li>
                        <li v-if="ability.qa.length>0" v-for="qaObj in ability.qa" class="list-group-item p-4" style="text-align:left"> 
                            <span class="qa-question2" ><span style="color:#307BF6" >問答題：</span></span>
                            {{qaObj.topic.content}}
                            <table class="qa-table table table-hover table-sm border-top">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">回饋內容</th>
                                        <th scope="col">評量者</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item,index) in qaObj.topic_res_list">
                                    <th  scope="row">{{(index+1)}}</th>
                                    <td>{{item.topic_res}}</td>
                                    <td v-if="item.result_anonymous">匿名</td>
                                    <td v-else>{{item.evaluated_id.name}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </li>
                        <li  v-if="ability.select.length>0"  class="list-group-item d-flex align-items-center"> 
                            <span class="qa-question2" ><span style="color:#307BF6">選擇題</span></span>
                            <li  v-if="ability.selectChartsList.length>0" v-for="(bSelect,index) in ability.selectChartsList" class="list-group-item d-flex align-items-center"> 
                                <canvas :id="bSelect.chart" class="chart-area"></canvas>
                            </li> 
                        </li> 
                    </ul>
                </div>
            </div>
            
        </div>
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
    </div>
</template>
    
<script>
    import Chart from 'chart.js';
    import Api from "../../api";
    import loadingFunc from '../Loading';
    export default {
        name: 'PersonalReport',
        components: {
            loadingFunc
        },
        created(){
            $('#loading').show();
        },
        mounted() {
            var project_id=this.$route.query.project_id;
            var user_id=this.$route.query.user_id;

            console.log("75/"+project_id)
            console.log("76/"+user_id)

            let projectList=[];

            let employee={};
            let evaluation_list={};
            let pro_topic_res=[];
            let project_pr=[];
            let abilityType=[];
            let abilityNum=''
            // let prChartsArr =[];
            let Func1 = async()=>{
                try{
                //取得所有的專案
                let response = await Api.project_getAll()
                console.log("163/取得所有專案");
                console.log(response);
                projectList=response.data
                }catch(err){
                    console.log(err)
                }
            }
            

            let Func2 = async()=>{
                try{
                    //取得該員工在該專案的pr資料
                    console.log('Func2')
                    console.log(project_id);
                    console.log(user_id)
                    let response = await Api.getAssessmentResult({project_id:project_id,user_id:user_id})
                    console.log("186/取得該員工在該專案的pr資料");
                    console.log(response)
                    employee=response.data.employee
                    evaluation_list=response.data.evaluation_list
                    pro_topic_res=response.data.pro_topic_res
                    project_pr=response.data.project_pr
                }catch(err){
                    console.log(err)
                    this.dialogMessage = '該員工於此專案尚無評量結果!';
                    $('#modalCenter').modal('show');
                    $('#loading').hide();
                }
            }
            let Func3 = async()=>{
                await Func2();
                //有幾個pr指數(能力)
                abilityNum = project_pr.length

                for(let i = 0;i<project_pr.length;i++){
                    let ability={
                        score:project_pr[i].classify_topic.score,
                        qa:project_pr[i].classify_topic.qa,
                        select:project_pr[i].classify_topic.select,
                        ability_id:project_pr[i].ability_id,
                        department_id:project_pr[i].department_id,
                        chart:"prChart"+i
                    };
                    if(project_pr[i].pr_avg!=0){
                        ability.hasPR = true
                        ability.pr_avg = project_pr[i].pr_avg
                        ability.employee_pr_avg = project_pr[i].employee_prs[0].pr_avg
                        ability.employee_pr_value = project_pr[i].employee_prs[0].pr_value
                    }else{
                        ability.hasPR = false
                    }
                    //判斷有沒有選擇題，先建立選擇題圖表的id
                    if(project_pr[i].classify_topic.select.length>0){
                        let tempArr =[]
                        for(let j=0;j<project_pr[i].classify_topic.select.length;j++){
                            let tempOptions=[];
                            let tempOptionsNum=[];
                            for(let m=0;m<project_pr[i].classify_topic.select[j].option.length;m++){
                                await tempOptions.push(project_pr[i].classify_topic.select[j].option[m].option_res.topic_res)
                                await tempOptionsNum.push(project_pr[i].classify_topic.select[j].option[m].option_res.option_num)
                            }
                            await tempArr.push({chart:"selectChart"+i+j,options:tempOptions,optionsNum:tempOptionsNum,content:project_pr[i].classify_topic.select[j].content});
                        }
                        ability.selectChartsList = tempArr;
                        console.log("230/"+tempArr)
                    }else{
                        ability.selectChartsList = []
                    }
                    
                    console.log("221/ability:"+i+":"+JSON.stringify(ability))
                    console.log("222/ability.score:"+i+":"+JSON.stringify(ability.score))
                    console.log("223/ability.selectChartsList:"+i+":"+JSON.stringify(ability.selectChartsList))
                    await abilityType.push(ability)
                }
            }
            let Func4 = async()=>{
                await Func3();
                this.employee=employee
                this.evaluation_list=evaluation_list
                this.pro_topic_res=pro_topic_res
                this.project_pr=project_pr
                this.abilityNum=abilityNum
                this.abilityType=abilityType
                console.log("255/"+JSON.stringify(this.abilityType))
            }
            let Func5 = async()=>{
                await Func4();
                await this.drawCharts();
                $('#loading').hide();
            }
            

            Func1().then(()=>{
                this.pickedProjectId=project_id
                this.projectId=project_id
                this.userId=user_id
                this.projectList=projectList
            });

            Func5();
            

        },
        data () {
            return {
                userId:'',
                projectId:'',
                pickedProjectId:'',
                projectList:[],
                employee:{},
                evaluation_list:{},
                pro_topic_res:[],
                project_pr:[],
                abilityNum:'',
                abilityType:[],
                prCharts:[],
                dialogMessage:'',
            }
        },
        methods:{
            resetProject(){
                this.projectId = this.pickedProjectId
                //更換畫面中該員工的專案報告結果
                $('#loading').show();
                let Func2 = async()=>{
                    try{
                        //取得該員工在該專案的pr資料
                        console.log("309/projectId:"+this.projectId);
                        console.log("310/userId:"+this.userId)
                        let response = await Api.getAssessmentResult({project_id:this.projectId,user_id:this.userId})
                        console.log("312/取得該員工在該專案的pr資料");
                        console.log(response)
                        this.employee=response.data.employee
                        this.evaluation_list=response.data.evaluation_list
                        this.pro_topic_res=response.data.pro_topic_res
                        this.project_pr=response.data.project_pr
                    }catch(err){
                        console.log(err)
                        this.dialogMessage = '該員工於此專案尚無評量結果!';
                        $('#modalCenter').modal('show');
                        $('#loading').hide();
                    }
                }
                let Func3 = async()=>{
                    await Func2();
                    this.abilityType=[];
                    //有幾個pr指數(能力)
                    this.abilityNum = this.project_pr.length

                    for(let i = 0;i<this.project_pr.length;i++){
                        let ability={
                            score:this.project_pr[i].classify_topic.score,
                            qa:this.project_pr[i].classify_topic.qa,
                            select:this.project_pr[i].classify_topic.select,
                            ability_id:this.project_pr[i].ability_id,
                            department_id:this.project_pr[i].department_id,
                            chart:"prChart"+i
                        };
                        if(this.project_pr[i].pr_avg!=0){
                            ability.hasPR = true
                            ability.pr_avg = this.project_pr[i].pr_avg
                            ability.employee_pr_avg = this.project_pr[i].employee_prs[0].pr_avg
                            ability.employee_pr_value = this.project_pr[i].employee_prs[0].pr_value
                        }else{
                            ability.hasPR = false
                        }
                        //判斷有沒有選擇題，先建立選擇題圖表的id
                        if(this.project_pr[i].classify_topic.select.length>0){
                            let tempArr =[]
                            for(let j=0;j<this.project_pr[i].classify_topic.select.length;j++){
                                let tempOptions=[];
                                let tempOptionsNum=[];
                                for(let m=0;m<this.project_pr[i].classify_topic.select[j].option.length;m++){
                                    await tempOptions.push(this.project_pr[i].classify_topic.select[j].option[m].option_res.topic_res)
                                    await tempOptionsNum.push(this.project_pr[i].classify_topic.select[j].option[m].option_res.option_num)
                                }
                                await tempArr.push({chart:"selectChart"+i+j,options:tempOptions,optionsNum:tempOptionsNum,content:this.project_pr[i].classify_topic.select[j].content});
                            }
                            ability.selectChartsList = tempArr;
                            console.log("357/"+tempArr)
                        }else{
                            ability.selectChartsList = []
                        }
                        
                        // console.log("362/ability:"+i+":"+JSON.stringify(ability))
                        // console.log("363/ability.score:"+i+":"+JSON.stringify(ability.score))
                        // console.log("364/ability.selectChartsList:"+i+":"+JSON.stringify(ability.selectChartsList))
                        await this.abilityType.push(ability)
                    }
                }
                let Func4 = async()=>{
                    await Func3();
                    await this.drawCharts();
                    $('#loading').hide();
                }
                Func4();
            },
            identifyProject(id){
                for(let i=0;i<this.projectList.length;i++){
                    if(this.projectList[i]._id==id){
                        return this.projectList[i].name
                    }
                }
            },
            drawCharts(){
                this.$nextTick(function () {
                    this.createChart();
                    this.creatSelectCharts();
                })
            },
            createChart(){
                console.log("279/this.abilityType:"+this.abilityType.length)
                for(let i=0;i<this.abilityType.length;i++){
                    let chartName =  'prChart'+i;
                    if(this.abilityType[i].hasPR){
                        console.log("283/this.abilityType[i].chart:"+this.abilityType[i].chart)
                        let ctx = document.getElementById(this.abilityType[i].chart).getContext("2d");
                        console.log(ctx);
                        new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels:['主管','同事','下屬','其他'],
                                datasets: [
                                {
                                    type: 'bar',
                                    label: 'score',
                                    data: [this.abilityType[i].score.supervisor.Score,
                                            this.abilityType[i].score.colleague.Score,
                                            this.abilityType[i].score.subordinate.Score,
                                            this.abilityType[i].score.other.Score],
                                    backgroundColor: '#2C7BE5',
                                    borderColor: '#2C7BE5',
                                    borderWidth: 1
                                }]
                            },
                            options: {
                                responsive: true,
                                title: {
                                    display: true,
                                    text: this.abilityType[i].ability_id.ability+"PR"
                                },
                                legend: { //是否要顯示圖示
                                    display: false,
                                },
                                tooltips: { //是否要顯示 tooltip
                                    enabled: true,
                                },
                                scales: {
                                    yAxes: [{
                                        // gridLines: {
                                        //     color: "#7F91AC",
                                        // },
                                        ticks: {
                                            beginAtZero: true,
                                            min: 0,
                                            max: 5 
                                        },
                                    }],
                                    xAxes: [{
                                        // gridLines: {
                                        //     color: "rgba(0, 0, 0, 0)",
                                        // },
                                        ticks: {
                                            beginAtZero: true,
                                        },
                                        barPercentage: 0.4
                                    }]
                                },
                            }
                        });
                    }
                }
            },
            creatSelectCharts(){
                for(let i=0;i<this.abilityType.length;i++){
                    for(let j=0;j<this.abilityType[i].selectChartsList.length;j++){
                        console.log("360/this.abilityType[i].selectChartsList[j].chart:"+this.abilityType[i].selectChartsList[j].chart)
                        let ctx = document.getElementById(this.abilityType[i].selectChartsList[j].chart).getContext("2d");
                        console.log(ctx);
                        new Chart(ctx,{
                            type:'bar',
                            data:{  
                                labels:this.abilityType[i].selectChartsList[j].options,
                                datasets:[
                                    {
                                        type:'bar',
                                        label:'count',
                                        data:this.abilityType[i].selectChartsList[j].optionsNum,
                                        backgroundColor: '#2C7BE5',
                                        borderColor: '#2C7BE5',
                                        borderWidth: 1
                                    },
                                ]
                            },
                            options:{
                                responsive: true,
                                title: {
                                    display: true,
                                    text:this.abilityType[i].selectChartsList[j].content,
                                },
                                legend: { //是否要顯示圖示
                                    display: false,
                                },
                                tooltips: { //是否要顯示 tooltip
                                    enabled: true,
                                },
                                scales: {
                                    yAxes: [{
                                        // gridLines: {
                                        //     color: "#7F91AC",
                                        // },
                                        ticks: {
                                            fixedStepSize: 1,
                                            beginAtZero: true,
                                            min: 0,
                                            max: 5 
                                        },
                                    }],
                                    xAxes: [{
                                        // gridLines: {
                                        //     color: "rgba(0, 0, 0, 0)",
                                        // },
                                        ticks: {
                                            beginAtZero: true,
                                        },
                                        barPercentage: 0.3
                                    }]
                                },
                            }
                        })
                    }
                }
            }
        }
    }
</script>

<style>
    body{
        background:#F9FBFD; 
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        /* -webkit-font-smoothing: antialiased; */
        -moz-osx-font-smoothing: grayscale;
        /* text-align: center; */
        color: #2c3e50;
        /* margin-top: 60px; */
    }
    #content {
        /* margin: auto; */
        background-color: #FFFFFF;
        /* padding: 20px; */
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
        color: #2F3E4E;
        font-size: 15px;
        text-align: left;
        font-weight: bolder;
        width: 30%;
    }
    #progress-area{
        width: 50%;
    }
    #percentage-area{
        width: 10%;
    }
    #more-area{
        width: 10;
        text-align: right;
        width:15%;
    }
    .qa-question{
        font-size: 15px;
        text-align: left;
        font-weight: bolder;
        margin-top: 30%
    }
    .qa-question2{
        font-size: 15px;
        text-align: left;
        font-weight: bolder;
    }
    .qa-table{
        font-size: 14px;
        text-align: left;
    }
    .fc-light{
        font-size: 15px;
        color: #6E757C;
    }
    .fc-dark{
        font-size: 15px;
        color: #2F3E4E;
    }
    #project-title{
        font-weight:bold;
        font-size: 20px;
        color:#307BF6;
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
    .project-group{
        -ms-flex-align: center;
        align-items: center;
        justify-content: space-between;
        align-items: center;
        justify-content: space-between;
        display: -webkit-box;
        width: 100%
    }
    .result-group{
        -ms-flex-align: center;
        align-items: center;
        justify-content: space-between;
        align-items: center;
        justify-content: space-between;
        display: -webkit-box;
        width: 50%
    }
    .question-area{
        text-align:left;

    }
    .chart-area{
        text-align:center;
        padding-left: 20px;
        padding-right: 20px;
    }
    .checked-group{
        width: 80%;
    }
    .btn-edit1{
        background-color: #D2DDEB;
        margin-top: 5pt;
    }
    .btn-delete1{
        background-color: #D2DDEB;
        margin-top: 5pt;
    }
    .btn-notify-name{
        background-color: #D2DDEB;
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
    #ability{
        font-size: 15px;
        text-align: left;
        font-weight: bolder;
        color:#307BF6;
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
</style>