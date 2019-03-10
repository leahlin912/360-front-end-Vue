<template>
    <div>
        <loadingFunc id:loading></loadingFunc>
        <div class="container">
            <span class="navbar">
                <form class="form-inline">
                    <a class="navbar-brand page-title" href="#">專案列表</a>
                    <button id="btn-add" class="btn btn-outline-primary  my-2 my-sm-0" type="button" data-toggle="modal" v-on:click="goCreatePage()">+ add new project</button>
                </form>
                <form class="d-flex ">
                    <div class="input-group input-group-md  my-2 my-sm-0">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> 
                                <img src="../../assets/search.png" width="20">
                            </span>
                        </div>
                        <input type="text" class="form-control" placeholder="輸入專案標題" aria-label="Search" v-model="inputKeyword" v-on:keyup.enter="searchKeyword()">
                    </div>
                    <button id="btn-search" class="btn btn-outline-primary my-2 my-sm-0" type="button" v-on:click="searchKeyword()" >Search</button>
                </form>
            </span>
            <div  class="m-2">
                <div class="row">
                    <div class="d-flex col-lg-12">
                        <div class="list-group flex-fill"> 
                            <span v-for="project in showProjectList">
                                <div class="card">
                                    <span class="card-header d-flex justify-content-between align-items-center" v-on:click="project.isShow=!project.isShow">
                                        <button id="department-title" class="btn btn-link" type="button" >
                                        {{project.name}}
                                        </button>
                                        <div v-if="(project.close=='Y')" class="button-group ml-auto p-2" >
                                            <button class="btn btn-xs fs-10 btn-bold btn-view1"  @click="goResultPage(project._id)">檢視結果報告
                                                <img src="../../assets/folder.png" width="20">
                                            </button>
                                            <button type="button" class="ml-2 btn btn-xs fs-10 btn-bold btn-notValid btn-outline-secondary" data-placement="left" @click="clickToValid(project)">
                                                取消結案
                                            </button>
                                        </div>
                                        <div v-else class="button-group ml-auto p-2 " >
                                            <button type="button" class="btn btn-xs fs-10 btn-bold btn-edit1" @click="clickToEditProject(project)">
                                                <img src="../../assets/edit.png" width="20">
                                            </button>
                                            <button v-if="project.isCurrentProject" type="button" class="btn btn-xs fs-10 btn-bold btn-delete1" title="此專案正在進行中，不得刪除" disabled>
                                                <img src="../../assets/delete.png" width="20">
                                            </button>
                                            <button v-else type="button" class="btn btn-xs fs-10 btn-bold btn-delete1"  @click="clickToDeleteProject(project)">
                                                <img src="../../assets/delete.png" width="20">
                                            </button>
                                            <button type="button" class="btn btn-xs fs-10 btn-bold btn-view1"  @click="clickToViewProject(project)">
                                                <img src="../../assets/view.png" width="20">
                                            </button>
                                            <button type="button" class="ml-2 btn btn-xs fs-10 btn-bold btn-notValid btn-outline-secondary" data-placement="left" title="設定為結案，即可查看結案報告" @click="clickToUnvalid(project)">
                                                進行結案
                                            </button>
                                        </div>
                                    </span>

                                    
                                    <div v-show="project.isShow">
                                        <ul class="list-group">
                                            <li class="d-flex align-items-center">
                                                <div class="campaign-group">
                                                    <ul class="list-group">
                                                        <li class="list-group-item d-flex align-items-center">
                                                            <span class="d-flex info-group fc-dark row">
                                                                <div id="name" class="col-md-4">
                                                                    <span v-if="identifyStatus(project.evaluation_date_start,project.evaluation_date_end)==0" class="badge badge-pill badge-warning ">未開始</span>
                                                                    <span v-else-if="identifyStatus(project.evaluation_date_start,project.evaluation_date_end)==1" class="badge badge-pill badge-primary">進行中</span>
                                                                    <span v-else-if="identifyStatus(project.evaluation_date_start,project.evaluation_date_end)==2" class="badge badge-pill badge-secondary">已結束</span>
                                                                    <span class="p-2" style="font-weight:bolder">自選評量者階段</span></div>
                                                                <div id="period" class="col-md-4">
                                                                    <span><span style="color:#98A0AB">Period：</span> {{project.evaluation_date_start}}</span>
                                                                    <span> ～ {{project.evaluation_date_end}}</span>
                                                                </div>
                                                                <div class=" col-md-4">
                                                                    <span class="progress">
                                                                        <div class="progress-bar bg-secondary" role="progressbar" v-bind:style="{width:identifyProgress(project.evaluation_status4_num,project.employee_num)}" aria-valuemin="0" aria-valuemax="100">{{identifyProgress(project.evaluation_status4_num,project.employee_num)}}</div>
                                                                    </span>
                                                                </div>
                                                            </span>
                                                        </li>
                                                        <li class="list-group-item d-flex align-items-center">
                                                            <span class="d-flex info-group fc-dark row">
                                                                <div id="name" class="col-md-4">
                                                                        <span v-if="identifyStatus(project.project_date_start,project.project_date_end)==0" class="badge badge-pill badge-warning ">未開始</span>
                                                                        <span v-else-if="identifyStatus(project.project_date_start,project.project_date_end)==1" class="badge badge-pill badge-primary">進行中</span>
                                                                        <span v-else-if="identifyStatus(project.project_date_start,project.project_date_end)==2" class="badge badge-pill badge-secondary">已結束</span>
                                                                    <span class="p-2" style="font-weight:bolder"> 員工互評階段</span></div>
                                                                <div id="period" class="col-md-4">
                                                                    <span ><span style="color:#98A0AB">Period：</span> {{project.project_date_start}}</span>
                                                                    <span> ～ {{project.project_date_end}}</span>
                                                                </div>
                                                                <div class=" col-md-4">
                                                                    <span class="progress">
                                                                        <div v-show="project.project_statusY_num!=0||project.project_statusN_num!=0" class="progress-bar bg-secondary" role="progressbar" v-bind:style="{width:identifyProgress((project.project_statusY_num+project.project_statusX_num),project.employee_num)}" aria-valuemin="0" aria-valuemax="100">{{identifyProgress((project.project_statusY_num+project.project_statusX_num),project.employee_num)}}</div>
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
        </div>
        <div v-if="showUnvalidModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">進行結案</h5>
                                </div>
                                <div class="modal-body modal-open">
                                    請再次確認是否為 {{chosedProject.name}} 結案，結案後將無法再進行編輯，但是可以查看結案報告。
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="showUnvalidModal=false">Cancel</button>
                                    <button type="button" class="btn btn-primary" @click="unvalidProject()">確認</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>  
        <div v-if="showValidModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">取消結案</h5>
                                </div>
                                <div class="modal-body modal-open">
                                    請再次確認是否為 {{chosedProject.name}} 取消結案，取消結案後將無法查案結案報告。
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="showValidModal=false">Cancel</button>
                                    <button type="button" class="btn btn-primary" @click="revalidProject()">確認</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div> 
        <div v-if="showDeleteModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Delete Project</h5>
                                </div>
                                <div class="modal-body modal-open">
                                    請再次確認是否刪除{{chosedProject.name}} 專案?
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
        </div>
    </div>
</template>
<script>
import Api from "../../api";
import { mapGetters, mapActions } from 'vuex';
import loadingFunc from '../Loading';
export default {
    name: 'HistoricalProjects',
    components: {
        loadingFunc
    },
    created:function(){
        $('#loading').show();
        this.today=this.$store.state.today
        console.log("190/this.today:"+this.today)
        var cProject=this.$store.state.project
        var cProjectId = ''
        if(cProject!={}){
            cProjectId=cProject._id
            console.log("167/cProjectId:"+cProjectId)
        }
        
        var dataList=[];
        let Func = async () => {
            try{
                //從API取得所有專案
                let response = await Api.project_getAll()
                console.log("162/取得所有專案");
                console.log(response);
                for(let i=0;i<response.data.length;i++){
                    if(response.data[i]._id==cProjectId){
                        dataList.push({
                            //回傳值參數
                            name:response.data[i].name,
                            _id:response.data[i]._id,
                            topic_id: response.data[i].topic_id,
                            close: response.data[i].close,//是否結案
                            evaluation_date_start:response.data[i].evaluation_date_start,
                            evaluation_date_end: response.data[i].evaluation_date_end,
                            project_date_start:response.data[i].project_date_start,
                            project_date_end:response.data[i].project_date_end,
                            //前端自帶參數
                            isShow:true,
                            isCurrentProject:true
                        });
                    }else{
                        dataList.push({
                            //回傳值參數
                            name:response.data[i].name,
                            _id:response.data[i]._id,
                            topic_id: response.data[i].topic_id,
                            close: response.data[i].close,//是否結案
                            evaluation_date_start:response.data[i].evaluation_date_start,
                            evaluation_date_end: response.data[i].evaluation_date_end,
                            project_date_start:response.data[i].project_date_start,
                            project_date_end:response.data[i].project_date_end,
                            //前端自帶參數
                            isShow:false,
                            isCurrentProject:false
                        });
                    }
                    
                }
                //從API取得每個專案的進度
                for(let i=0;i<dataList.length;i++){
                    let response = await Api.evaluationList_getProject_status({project_id:dataList[i]._id})
                    console.log('276/取得專案進度')
                    console.log(response)
                    
                    dataList[i].project_statusN_num=response.data.project_statusN_num;
                    dataList[i].project_statusY_num=response.data.project_statusY_num;
                    dataList[i].project_statusX_num=response.data.project_statusX_num;

                    response = await Api.evaluationList_getAll({project_id:dataList[i]._id})
                    console.log(response)
                    dataList[i].employee_num=response.data.employee_num;
                    dataList[i].evaluation_status1_num=response.data.evaluation_status1_num;
                    dataList[i].evaluation_status2_num=response.data.evaluation_status2_num;
                    dataList[i].evaluation_status3_num=response.data.evaluation_status3_num;
                    dataList[i].evaluation_status4_num=response.data.evaluation_status4_num;

                }
                this.showProjectList=dataList;
                this.allProjectList=dataList;
                $('#loading').hide();
            }catch(err){
                console.log(err)
            }
        }
        Func();
    },
    data () {
        return {
            today:'',
            showProjectList:[],
            allProjectList:[],
            
            inputKeyword:"",
            showDeleteModal:false,
            showUnvalidModal:false,
            showValidModal:false,
            chosedProject:{},
        }
    },
    methods:{
        identifyProgress(finish,total){
            let temp = (100*(finish/total)).toFixed(2)+"%";
            console.log("211/identifyProgress:"+temp);
            return temp;
        },
        searchKeyword(){
            console.log("searchKeyword"+this.inputKeyword);
        },
        searchKeyword(){
            let keyword = this.inputKeyword;
            console.log("422/keyword:"+keyword)
            console.log("423/this.allProjectList:"+this.allProjectList.length)
            if(keyword==''){
                this.showProjectList = this.allProjectList;
            }else{
                this.showProjectList = this.allProjectList.filter(function(project){
                    return (project.name.includes(keyword));
                })
            }
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
        clickToUnvalid(project){
            this.chosedProject = project;
            this.showUnvalidModal=true;
            console.log("結案彈出視窗:"+this.showUnvalidModal);
        },
        clickToValid(project){
            this.chosedProject = project;
            this.showValidModal=true;
            console.log("取消結案彈出視窗:"+this.showValidModal);
        },
        //取消結案
        revalidProject(){
            this.showValidModal=false;
            var topics="";
            for(let i=0;i<this.chosedProject.topic_id.length;i++){
                if(topics!=""){
                    topics+=",";
                }
                topics+=this.chosedProject.topic_id[i];
            }
            console.log("topics:"+topics)
            console.log("name"+this.chosedProject.name)
            console.log("242/:"+this.chosedProject._id);
            //取消close狀態
            Api.project_update({
                name:this.chosedProject.name,
                _id:this.chosedProject._id,
                topic_id:topics,
                close:"N",
                evaluation_date_start:this.chosedProject.evaluation_date_start,
                evaluation_date_end:this.chosedProject.evaluation_date_end,
                project_date_start:this.chosedProject.project_date_start,
                project_date_end:this.chosedProject.project_date_end,
            })
            .then((response)=>{
                console.log(response)
                this.chosedProject.close="N"
            })
            .catch((err)=>{
                console.log(err.response)
            })
        },
        //進行結案
        unvalidProject(){
            this.showUnvalidModal=false;
            var topics="";
            for(let i=0;i<this.chosedProject.topic_id.length;i++){
                if(topics!=""){
                    topics+=",";
                }
                topics+=this.chosedProject.topic_id[i];
            }
            console.log("topics:"+topics)
            console.log("name"+this.chosedProject.name)
            console.log("242/:"+this.chosedProject._id);
            //成功結案計算PR
            Api.prCal({_id:this.chosedProject._id})
            .then((response)=>{
                console.log("成功結案計算PR")
                console.log(response)
            })
            .catch((err)=>{
                console.log(err)
            })
            //改變專案close狀態
            Api.project_update({
                name:this.chosedProject.name,
                _id:this.chosedProject._id,
                topic_id:topics,
                close:"Y",
                evaluation_date_start:this.chosedProject.evaluation_date_start,
                evaluation_date_end:this.chosedProject.evaluation_date_end,
                project_date_start:this.chosedProject.project_date_start,
                project_date_end:this.chosedProject.project_date_end,
            })
            .then((response)=>{
                console.log(response)
                this.chosedProject.close="Y"
            })
            .catch((err)=>{
                console.log(err.response)
            })
        },
        clickToDeleteProject(project){
            console.log("290/"+project.name)
            console.log("290/"+this.showDeleteModal)
            this.chosedProject = project;
            this.showDeleteModal=true;
        },
        deleteProject(){
            this.showDeleteModal=false;
            console.log("295/this.chosedProject._id:"+this.chosedProject._id)
            Api.project_delete({
                _id:this.chosedProject._id
            })
            .then((response)=>{
                console.log(response)
                console.log("前:"+this.showProjectList.length)
                for(let i=0;i<this.showProjectList.length;i++){
                    if(this.chosedProject._id==this.showProjectList[i]._id){
                        this.showProjectList.splice(i,1)
                    }
                }
                console.log("後:"+this.showProjectList.length)
            })
            .catch((err)=>{
                console.log(err.response)
            })
        },
        clickToViewProject(project){
            console.log("_id:"+project._id);
            this.$router.push({path:'/ProjectManagement/ProjectEdit',query:{id:project._id,status:0}});
        },
        clickToEditProject(project){
            console.log("_id:"+project._id);
            this.$router.push({path:'/ProjectManagement/ProjectEdit',query:{id:project._id,status:1}});
        },
        goResultPage(project_id){
            this.$router.push({path:'/ProjectReport',query:{id:project_id}});
            console.log("_id:"+project_id);
        },
        goCreatePage(){
            this.$router.push({path:'/ProjectManagement/ProjectCreate'});
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
#department-title{
    font-weight:bold;
    font-size: 18px;
    color:#307BF6;
}
#period{
    font-size: 14px;
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
    width: 45%;
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
.btn-notValid{
    
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

/* input:checked + .slider:before {
    transform:translateX(30px);
    background:#2C7BE5;
}
input:checked + .slider {
    box-shadow:0 0 0 2px #2C7BE5,0 0 2px #2C7BE5;
} */
.modal-body {
    max-height: calc(100vh - 210px);
    overflow-y: auto;
}
.modal-open {
    overflow: scroll;
}
</style>