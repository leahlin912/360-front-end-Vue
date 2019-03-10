<template>
    <div>
        <loadingFunc id:loading></loadingFunc>
        <div class="container">
            <span class="navbar">
                <form class="form-inline">
                    <a class="navbar-brand page-title" href="#">現行專案管理</a>
                    <!-- <button id="btn-add" class="btn btn-outline-primary  my-2 my-sm-0" type="button" data-toggle="modal" v-on:click="goCreatePage()">+ add new project</button> -->
                </form>
            </span>
            <!-- 選擇進行中專案 -->
            <div class="list-group">
                <!-- 階段活動 -->
                <ul class="list-group p-2">
                    <li class="d-flex align-items-center">
                        <div class="campaign-group">
                            <ul class="list-group">
                                <li class="list-group-item d-flex align-items-center">
                                    <span class="d-flex info-group fc-dark row">
                                        <div id="name" >
                                            <span class="p-2 col-md-2" style="font-weight: bolder">進行中專案：{{currentProject.name}}</span>
                                        </div>
                                        <div class="p-2 info-group row d-flex  m-2">
                                            <div class="input-group mb-3">
                                                <select class="form-control" v-model="pickedProject">
                                                    <option v-for="project in filterCloseProject()" :key="project.name" :value="project">{{project.name}}</option>
                                                    </option :value="currentProject" disabled>{{currentProject.name}}</option>
                                                </select>
                                                <div class="input-group-append">
                                                    <span v-if="(pickedProject._id==null)" class="d-inline-block" tabindex="0" data-toggle="tooltip" title="請先選取一個專案">
                                                        <button class="btn btn-outline-primary" style="pointer-events: none;" type="button" disabled>設為進行中專案</button>
                                                    </span>
                                                    <span v-else class="btn btn-outline-primary" @click="toSetCurrentProject()"> 設為進行中專案 </span>
                                                </div>
                                            </div>  
                                        </div> 
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </li>
                    
                </ul>
            </div>
            
            <div v-if="(havaCurrentProject=='Y')" class="list-group">
                <div class="row p-2">
                    <div class="d-flex col-lg-12">
                        <div class="list-group flex-fill"> 
                            <span>
                                <div class="card">
                                    <span class="card-header d-flex justify-content-between align-items-center" >
                                        <button id="project-title" class="btn btn-link" type="button" >
                                        {{currentProject.name}}
                                        </button>
                                        <div class="button-group ml-auto p-2 " >
                                            <button class="btn btn-xs fs-10 btn-bold btn-edit1" @click="clickToEditProject(currentProject)">
                                                <img src="../../assets/edit.png" width="20">
                                            </button>
                                            <button type="button" class="btn btn-xs fs-10 btn-bold btn-delete1"  @click="clickToDeleteProject(currentProject)" disabled>
                                                <img src="../../assets/delete.png" width="20">
                                            </button>
                                            <button class="btn btn-xs fs-10 btn-bold btn-view1"  @click="clickToViewProject(currentProject)">
                                                <img src="../../assets/view.png" width="20">
                                            </button>
                                        </div>
                                    </span>
                                    
                                    <div >
                                        <ul class="list-group">
                                            <li class="d-flex align-items-center">
                                                <div class="campaign-group">
                                                    <ul class="list-group">
                                                        <li class="list-group-item d-flex align-items-center">
                                                            <span class="d-flex info-group fc-dark row">
                                                                <div id="name" class="col-md-4">
                                                                    <span v-if="identifyStatus(currentProject.evaluation_date_start,currentProject.evaluation_date_end)==0" class="badge badge-pill badge-warning ">未開始</span>
                                                                    <span v-else-if="identifyStatus(currentProject.evaluation_date_start,currentProject.evaluation_date_end)==1" class="badge badge-pill badge-primary">進行中</span>
                                                                    <span v-else-if="identifyStatus(currentProject.evaluation_date_start,currentProject.evaluation_date_end)==2" class="badge badge-pill badge-secondary">已結束</span>
                                                                    <span class="p-2" style="font-weight:bolder">自選評量者階段</span></div>
                                                                <div id="period" class="col-md-4">
                                                                    <span><span style="color:#98A0AB">Period：</span> {{currentProject.evaluation_date_start}}</span>
                                                                    <span> ～ {{currentProject.evaluation_date_end}}</span>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <span class="progress">
                                                                        <div class="progress-bar bg-secondary" role="progressbar" v-bind:style="{width:identifyProgress(currentProject.evaluation_status4_num,currentProject.employee_num)}" aria-valuemin="0" aria-valuemax="100">{{identifyProgress(currentProject.evaluation_status4_num,currentProject.employee_num)}}</div>
                                                                    </span>
                                                                    </div>
                                                            </span>
                                                        </li>
                                                        <li class="list-group-item d-flex align-items-center">
                                                            <span class="d-flex info-group fc-dark row">
                                                                <div id="name" class="col-md-4">
                                                                        <span v-if="identifyStatus(currentProject.project_date_start,currentProject.project_date_end)==0" class="badge badge-pill badge-warning ">未開始</span>
                                                                        <span v-else-if="identifyStatus(currentProject.project_date_start,currentProject.project_date_end)==1" class="badge badge-pill badge-primary">進行中</span>
                                                                        <span v-else-if="identifyStatus(currentProject.project_date_start,currentProject.project_date_end)==2" class="badge badge-pill badge-secondary">已結束</span>
                                                                    <span class="p-2" style="font-weight:bolder">員工互評階段</span></div>
                                                                <div id="period" class="col-md-4">
                                                                    <span ><span style="color:#98A0AB">Period：</span> {{currentProject.project_date_start}}</span>
                                                                    <span> ～ {{currentProject.project_date_end}}</span>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <span class="progress">
                                                                        <div v-show="currentProject.project_statusY_num!=0||currentProject.project_statusN_num!=0" class="progress-bar bg-secondary" role="progressbar" v-bind:style="{width:identifyProgress((currentProject.project_statusY_num+currentProject.project_statusX_num),currentProject.employee_num)}" aria-valuemin="0" aria-valuemax="100">{{identifyProgress((currentProject.project_statusY_num+currentProject.project_statusX_num),currentProject.employee_num)}}</div>
                                                                    </span>
                                                                </div>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>    
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>   
            <div v-else-if="(havaCurrentProject=='N')" class="list-group">
                <ul class="list-group p-2">
                    <li class="list-group-item d-flex align-items-center">
                        <div class="card-body -flex row">
                            <div class=" col-lg-1">
                                <img src="../../assets/danger.png" width="30">
                            </div>
                            <div class="m-1  col-lg-9">
                                <h5 style="color:#307BF6">提醒！</h5>
                                <p>目前沒有進行中專案，請選擇一個專案或建立一個新專案.</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- <div v-if="showDeleteModal">
                <transition name="modal">
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Delete Project</h5>
                                    </div>
                                    <div class="modal-body modal-open">
                                        請再次確認是否刪除{{pickedProject.projectName}} 專案?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" @click="showDeleteModal=false">Cancel</button>
                                        <button type="button" class="btn btn-primary" @click="deleteProject()">delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div> -->
            <div v-if="showResetModal">
                <transition name="modal">
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Set Current Project</h5>
                                    </div>
                                    <div class="modal-body modal-open">
                                        你確定將<span id="name" style="font-weight:bolder"> {{pickedProject.name}} </span>設定為進行中專案
                                    </div>
                                    <div class="modal-footer">
                                        </button>
                                        <button type="button" class="btn btn-secondary" @click="showResetModal = false">Cancel</button>
                                        <button type="button" class="btn btn-primary" @click="setCurrentProject()"> 確定</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>  
        </div>      
    </div>
</template>
    
    <script>
    import Api from "../../api";
    import { mapGetters, mapActions } from 'vuex';
    import loadingFunc from '../Loading';
    export default {
        name: 'CurrentProject',
        components: {
            loadingFunc
        },
        created:function(){
            $('#loading').show();
            //從全域變數獲得當天日期
            var currentDate = this.$store.state.today
            console.log("184/currentdate:"+currentDate)
            this.today=currentDate;
            console.log("187/this.today:"+this.today)
            //從全域變數獲得專案
            var cProject=this.$store.state.project
            var cProjectId=cProject._id
            console.log("189/cProjectId:"+cProject._id)

            
            //取得parameter
            Api.parameter_get()
            .then((response)=>{
                console.log("197")
                console.log(response)
                this.parameterData.current_project_id=response.data[0].current_project_id
                this.parameterData.pr_same_score_decide=response.data[0].pr_same_score_decide
                this.parameterData._id=response.data[0]._id
                console.log("200/this.current_project_id:"+response.data[0].current_project_id)
                console.log("200/this.pr_same_score_decide:"+response.data[0].pr_same_score_decide)
                console.log("200/_id:"+response.data[0]._id)

            })
            .catch((err)=>{
                console.log(err)
            })

            var projectList=[];
            var cProject={};
            var cProgress={};
            let Func = async () => {
                try{
                    // 取得所有專案
                    let response = await Api.project_getAll()
                    console.log("214/取得所有專案");
                    console.log(response);
                    for(let i=0;i<response.data.length;i++){
                        projectList.push({
                            //回傳值參數
                            name:response.data[i].name,
                            _id:response.data[i]._id,
                            topic_id:response.data[i].topic_id,
                            close:response.data[i].close,
                            evaluation_date_start:response.data[i].evaluation_date_start,
                            evaluation_date_end: response.data[i].evaluation_date_end,
                            project_date_start:response.data[i].project_date_start,
                            project_date_end:response.data[i].project_date_en,
                        });
                    }
                    console.log("238/projectList:"+projectList.length)

                    //獲得project
                    response = await Api.project_get({_id: cProjectId})
                    if(cProjectId==null){
                        this.havaCurrentProject="N"
                    }else{
                        this.havaCurrentProject="Y"
                        console.log("251/取得當前進行中專案Object") 
                        console.log(response)
                        cProject= {
                            name:response.data.name,
                            _id:response.data._id,
                            topic_id: response.data.topic_id,
                            close:response.data.close,
                            evaluation_date_start:response.data.evaluation_date_start,
                            evaluation_date_end: response.data.evaluation_date_end,
                            project_date_start:response.data.project_date_start,
                            project_date_end:response.data.project_date_end,
                        }
                        console.log("272/"+cProject.name)
                        
                        //取得專案進度
                        response = await Api.evaluationList_getProject_status({project_id:cProjectId})
                        console.log('276/取得專案進度')
                        console.log(response)
                        
                        cProject.project_statusN_num=response.data.project_statusN_num;
                        cProject.project_statusY_num=response.data.project_statusY_num;
                        cProject.project_statusX_num=response.data.project_statusX_num;

                        response = await Api.evaluationList_getAll({project_id:cProjectId})
                        console.log(response)
                        cProject.employee_num=response.data.employee_num;
                        cProject.evaluation_status1_num=response.data.evaluation_status1_num;
                        cProject.evaluation_status2_num=response.data.evaluation_status2_num;
                        cProject.evaluation_status3_num=response.data.evaluation_status3_num;
                        cProject.evaluation_status4_num=response.data.evaluation_status4_num;
                    }
                    //賦值給data
                    this.projectList=projectList;
                    console.log("291/this.projectList:"+this.projectList.length)
                    this.currentProjectId=cProjectId;
                    console.log("293/"+this.currentProjectId)
                    this.currentProject=cProject;
                    console.log("295/"+this.currentProject.name)
                    $('#loading').hide();
                } catch(err){
                    console.log(err);
                }
            };
            Func()
        },
        data () { 
            return {
                currentProjectId:"",
                // currentProjectId:'5c3c07a81977fa197c28cc47',
                currentProject:{
                    name:"",
                    _id:"",
                    topic_id:[],
                    close:"",
                    evaluation_date_start:"",
                    evaluation_date_end: "",
                    project_date_start:"",
                    project_date_end:"",
                },
                today:'',
                projectList:[],
                havaCurrentProject:"",
                pickedProject:{},
                inputKeyword:"",
                showDeleteModal:false,
                chosedProject:{},
                showResetModal:false,

                //API撈出的資料
                parameterData:{
                    _id:'',
                    current_project_id:"",
                    pr_same_score_decide:""

                }
                
            }
        },
        methods:{
            // identifyProgress(finish,total){
            //     let temp = (100*(finish/total))+"%";
            //     console.log("identifyProgress:"+temp);
            //     return temp;
            // },
            identifyProgress(finish,total){
            console.log("331/finish:"+finish+";total:"+total)
            let temp = (100*(finish/total)).toFixed(2)+"%";
            console.log("211/identifyProgress:"+temp);
            return temp;
        },
            searchKeyword(){
                console.log("searchKeyword"+this.inputKeyword);
            },
            identifyStatus(start,end){
                if(Date.parse(start).valueOf() > Date.parse(this.today).valueOf()){
                    return 0;//未開始
                }else if(Date.parse(end).valueOf() < Date.parse(this.today).valueOf()){
                    return 2; //已經結束
                }else{
                    return 1;//進行中
                }
            },
            filterCloseProject(){
                return this.projectList.filter(function(project){
                    return project.close=="N";
                })
            },
            goResultPage(project_id){
                this.$router.push({path:'/ProjectReport',query:{id:project_id}});
                console.log("_id:"+project_id);
            },
            goCreatePage(){
                this.$router.push({path:'/ProjectManagement/ProjectCreate'});
            },
            toSetCurrentProject(){
                this.showResetModal=true;
            },
            setCurrentProject(){
                $('#loading').show();
                console.log("356/projectId:"+this.pickedProject._id)
                console.log("357/pr_same_score_decide:"+this.parameterData.pr_same_score_decide)
                console.log("357/_id:"+this.parameterData._id)
                Api.parameter_update({
                    _id:this.parameterData._id,
                    current_project_id:this.pickedProject._id,
                    pr_same_score_decide:this.parameterData.pr_same_score_decide,
                })
                .then((response)=>{
                    console.log("更新成功")
                    console.log(response)
                    this.resetCurrentprojectToVuex()
                    this.havaCurrentProject="Y"
                    console.log("this.havaCurrentProject:"+this.havaCurrentProject)
                })
                .catch((err)=>{
                    console.log(err)
                })
            },
            async resetCurrentprojectToVuex(){
                this.showResetModal=false;
                let response = await Api.parameter_get()
                this.currentProjectId = response.data[0].current_project_id
                console.log("380/id:"+this.currentProjectId)
                response = await Api.project_get({_id:this.currentProjectId})
                console.log("390/更新現行專案object")
                console.log(response)
                let tempCProject={}
                tempCProject = {
                    name:response.data.name,
                    _id:response.data._id,
                    topic_id: response.data.topic_id,
                    close:response.data.close,
                    evaluation_date_start:response.data.evaluation_date_start,
                    evaluation_date_end: response.data.evaluation_date_end,
                    project_date_start:response.data.project_date_start,
                    project_date_end:response.data.project_date_end,
                },
                console.log("395/id:"+this.currentProjectId)
                response = await Api.evaluationList_getProject_status({project_id:this.currentProjectId})
                console.log('396/更新現行專案進度')
                console.log(response)
                
                tempCProject.project_statusN_num=response.data.project_statusN_num;
                tempCProject.project_statusY_num=response.data.project_statusY_num;
                tempCProject.project_statusX_num=response.data.project_statusX_num;
                console.log(response)
                response = await Api.evaluationList_getAll({project_id:this.currentProjectId})
                console.log(response)
                tempCProject.employee_num=response.data.employee_num;
                tempCProject.evaluation_status1_num=response.data.evaluation_status1_num;
                tempCProject.evaluation_status2_num=response.data.evaluation_status2_num;
                tempCProject.evaluation_status3_num=response.data.evaluation_status3_num;
                tempCProject.evaluation_status4_num=response.data.evaluation_status4_num;

                this.currentProject=tempCProject;
                //設置全域變數
                console.log("423/設置全域變數")
                this.$store.dispatch('setProject',this.currentProject)
                $('#loading').hide();
            },
            clickToViewProject(project){
                console.log("_id:"+project._id);
                this.$router.push({path:'/ProjectManagement/ProjectEdit',query:{id:project._id,status:0}});
            },
            clickToEditProject(project){
                console.log("_id:"+project._id);
                this.$router.push({path:'/ProjectManagement/ProjectEdit',query:{id:project._id,status:1}});
            },

        }
        
    }
    
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    body{
        background:#F9FBFD; 
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
    #project-title{
        font-weight:bold;
        color:#307BF6;
        font-size: 18px; 
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
    .campaign-group{
        width: 100%
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
        width: 100%
    }
    
    .button-group{
        text-align:right;
        width: 30%;
        font-size: 15px;
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