<template>
    <div>
        <div class="container">
            <span class="navbar">
                <form class="form-inline">
                    <a class="navbar-brand page-title" href="#">現行專案管理</a>
                    <a class="navbar-brand page-title" href="#">{{today}}{{currentProject.name}}</a>
                    <button id="btn-add" class="btn btn-outline-primary  my-2 my-sm-0" type="button" data-toggle="modal" v-on:click="goCreatePage()">+ add new project</button>
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
                                            <span class="p-2 col-md-2" style="font-weight: bolder">進行中專案</span>
                                        </div>
                                        <div class="p-2 info-group row d-flex  m-2">
                                                <div class="col-md-6">
                                                    <select class="modal-form-control form-control-sm " >
                                                        <option>
                                                            {{currentProjectId}}
                                                        </option>
                                                    </select>
                                                </div>
                                                <div class="col-md-4">
                                                    <span class="btn btn-primary btn-sm" @click="">
                                                        ＋設為進行中專案 
                                                    </span>
                                                </div>
                                            </div> 
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </li>
                    
                </ul>
            </div>
            <div class="list-group">
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
            <div  class="list-group">
                <div class="row p-2">
                    <div class="d-flex col-lg-12">
                        <div class="list-group flex-fill"> 
                            <span>
                                <div class="card">
                                    <span class="card-header d-flex justify-content-between align-items-center" v-on:click="project.isShow=!project.isShow">
                                        <button id="project-title" class="btn btn-link" type="button" >
                                        project.name
                                        </button>
                                        <!-- <div class="button-group ml-auto p-2 " >
                                            <button class="btn btn-xs fs-10 btn-bold btn-edit1" @click="clickToEditMember(member)">
                                                結案 >
                                            </button>
                                            
                                        </div> -->
                                        <div class="button-group ml-auto p-2 " >
                                            <button class="btn btn-xs fs-10 btn-bold btn-edit1" @click="clickToEditMember(member)">
                                                <img src="../../assets/edit.png" width="20">
                                            </button>
                                            <button type="button" class="btn btn-xs fs-10 btn-bold btn-delete1"  @click="clickToDeleteMember(member)">
                                                <img src="../../assets/delete.png" width="20">
                                            </button>
                                            <button class="btn btn-xs fs-10 btn-bold btn-view1"  @click="viewMember(member)">
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
                                                                    <span class="badge badge-pill badge-warning ">未開始</span>
                                                                    <!-- <span v-else-if="identifyStatus(project.evaluation_date_start,project.evaluation_date_end)==1" class="badge badge-pill badge-primary">進行中</span>
                                                                    <span v-else-if="identifyStatus(project.evaluation_date_start,project.evaluation_date_end)==2" class="badge badge-pill badge-secondary">已結束</span> -->
                                                                    <span class="p-2" style="font-weight:bolder">挑選評比人階段</span></div>
                                                                <div id="period" class="col-md-4">
                                                                    <span><span style="color:#98A0AB">Period：</span> {{project.evaluation_date_start</span>
                                                                    <span> ～ {{project.evaluation_date_end</span>
                                                                </div>
                                                                <div class="progress col-md-4">
                                                                    <!-- <div class="progress-bar bg-secondary" role="progressbar" v-bind:style="{width:identifyProgress(project.evaluation_status4_num,project.employee_num)}" aria-valuemin="0" aria-valuemax="100">{{identifyProgress(project.evaluation_status4_num,project.employee_num)}}</div> -->
                                                                </div>
                                                            </span>
                                                        </li>
                                                        <li class="list-group-item d-flex align-items-center">
                                                            <span class="d-flex info-group fc-dark row">
                                                                <div id="name" class="col-md-4">
                                                                        <span class="badge badge-pill badge-warning ">未開始</span>
                                                                        <!-- <span v-else-if="identifyStatus(project.project_date_start,project.project_date_end)==1" class="badge badge-pill badge-primary">進行中</span>
                                                                        <span v-else-if="identifyStatus(project.project_date_start,project.project_date_end)==2" class="badge badge-pill badge-secondary">已結束</span> -->
                                                                    <span class="p-2" style="font-weight:bolder">員工互評階段</span></div>
                                                                <div id="period" class="col-md-4">
                                                                    <span ><span style="color:#98A0AB">Period：</span> project.project_date_start}}</span>
                                                                    <span> ～ project.project_date_end}}</span>
                                                                </div>
                                                                <div class="progress col-md-4">
                                                                    <!-- <div class="progress-bar bg-secondary" role="progressbar" v-bind:style="{width:identifyProgress(project.project_statusY_num,project.employee_num)}" aria-valuemin="0" aria-valuemax="100">{{identifyProgress(project.project_statusY_num,project.employee_num)}}</div> -->
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
                                        你確定要刪除<span id="name"> {{chosedProject.projectName}} </span>這筆專案資料？
                                    </div>
                                    <div class="modal-footer">
                                        </button>
                                        <button type="button" class="btn btn-secondary" @click="showDeleteModal = false">Cancel</button>
                                        <button type="button" class="btn btn-primary" @click="deleteProject()">delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>   -->
        </div>      
    </div>
</template>
    
    <script>
    import Api from "../../api";
    export default {
        name: 'ProjectManagement',
        created:function(){

            //獲得當天日期
            var currentDate;
            var date = new Date();
                var separator = "-";
                var year = date.getFullYear();
                var month = 1 + date.getMonth();
                var day = date.getDate();
                if(month<10){
                    month="0"+month;
                }
                if(day<10){
                    day="0"+day;
                }
                currentDate = year + separator + month + separator + day;
                console.log("176/currentDate:"+currentDate)
                this.today=currentDate;
                console.log("296/this.today:"+this.today)

            var cProjectId='';
            var cProject={};
            var cProgress={};
            var projectList=[];
            
            let testFunc = async () => {
                try{
                    let response = await Api.parameter_get()
                    //取得當前進行中專案id
                    console.log(response)
                    cProjectId=response.data[0].current_project_id
                    console.log("199/cProjectId:"+cProjectId)

                    //獲得project
                    response = await Api.project_get({_id: cProjectId})
                    if(cProjectId==null){
                        return;
                    }
                    console.log("204/取得當前進行中專案Object") 
                    console.log(response)
                    cProject= {
                        //回傳值參數
                        name:response.data.name,
                        _id:response.data._id,
                        topic_id: response.data.topic_id,
                        project_end: response.data.project_end,//是否結束
                        valid: response.data.valid,//是否結案
                        // evaluation_date_start:response.data.evaluation_date_start,
                        // evaluation_date_end: response.data.evaluation_date_end,
                        // project_date_start:response.data.project_date_start,
                        // project_date_en:response.data.project_date_end,
                        evaluation_date_start:"2019-01-01",
                        evaluation_date_end: "2019-02-02",
                        project_date_start:"2019-03-03",
                        project_date_end:"2019-04-04",
                        //不需要的參數
                        description:response.data.description,
                        year:response.data.year,
                        __v:response.data.__v,
                    }
                    console.log("221/"+cProject.name)
                    
                    //fun2
                    response = await Api.evaluationList_getAll({_id:cProjectId})
                    console.log('228/取得專案進度')
                    console.log(response)
                    cProgress={
                        employee_num: response.data.employee_num,
                        evaluation_status1_num: response.data.evaluation_status1_num,
                        evaluation_status2_num: response.data.evaluation_status2_num,
                        evaluation_status3_num: response.data.evaluation_status3_num,
                        evaluation_status4_num: response.data.evaluation_status4_num,
                        project_statusN_num:response.data.project_statusN_num,
                        project_statusY_num:response.data.project_statusY_num,
                    }
                    console.log("244/currentProgress:"+cProgress.employee_num)

                    

                    // fun3
                    response = await Api.project_getAll()
                    console.log("265/取得所有專案");
                    console.log(response);
                    for(let i=0;i<response.data.length;i++){
                        projectList.push({
                            //回傳值參數
                            name:response.data[i].name,
                            _id:response.data[i]._id,
                            topic_id: response.data[i].topic_id,
                            valid: response.data[i].valid,
                            project_end: response.data[i].project_end,
                            // evaluation_date_start:response.data[i].evaluation_date_start,
                            // evaluation_date_end: response.data[i].evaluation_date_end,
                            // project_date_start:response.data[i].project_date_start,
                            // project_date_en:response.data[i].project_date_en,
                            evaluation_date_start:"2019-02-04",
                            evaluation_date_end: "2019-01-24",
                            project_date_start:"2018-01-04",
                            project_date_end:"2018-01-04",
                            //不需要的參數
                            description:response.data[i].description,
                            year:response.data[i].year,
                            _v:response.data[i]._v,
                        });
                    }
                    console.log("273/projectList:"+projectList.length)
                    
                    this.currentProjectId=cProjectId;
                    console.log("276/"+this.currentProjectId)

                    this.currentProject=cProject;
                    console.log("279/"+this.currentProject.name)

                    this.currentProgress=cProgress;
                    console.log("284/this.currentProgress:"+this.currentProgress.employee_num)

                    this.projectList=projectList;
                    console.log("285/this.projectList:"+this.projectList.length)

                } catch(err){
                    console.log(err);
                }
            };

            testFunc()

        },
        data () { 
            return {
                testtest:'',
                currentDate:'',
                currentProjectId:'',
                currentProject:{},
                currentProgress:{},
                today:'',
                projectList:[],
                projectIdArraylist:[],
                inputKeyword:"",
                showAddMemberModal:false,
                showDeleteModal:false,
                showViewModal:false,
                chosedProject:{},
                
            }
        },
        methods:{
            identifyProgress(finish,total){
                let temp = (100*(finish/total))+"%";
                console.log("identifyProgress:"+temp);
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
            goResultPage(project_id){
                this.$router.push({path:'/ProjectReport',query:{id:project_id}});
                console.log("_id:"+project_id);
            },
            goCreatePage(){
                this.$router.push({path:'/ProjectManagement/ProjectCreate'});
            }
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
        font-size: 15px; 
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