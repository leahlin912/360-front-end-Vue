<template>
    <div>
        <loadingFunc id:loading></loadingFunc>
        <div class="container">
            <span class="navbar">
                <form class="form-inline">
                    <a class="navbar-brand page-title" href="#/ProjectManagement">評量結果報告</a>
                </form>
            </span>
            <div class="list-group">
                <!-- 階段活動 -->
                <ul class="list-group p-2">
                    <li class="list-group-item d-flex align-items-center">   
                        <span class="d-flex project-group fc-dark row">
                            <div>
                                <span class="p-2 col-md-2" style="font-weight: bolder">目前檢視的專案：</span>
                            </div>
                            <div class="p-2 project-group row d-flex  m-2">
                                <div class="input-group mb-3">
                                    <select class="form-control" v-model="pickedProjectId">
                                        <option v-for="project in filterClosedProject()" :key="project.name" :value="project._id">{{project.name}}</option>
                                        <option :value="pickedProjectId"  style="color:#6c757d"  disabled selected hidden >請選擇一個專案...</option>    
                                    </select>
                                    <div class="input-group-append">
                                        <span v-if="(pickedProjectId=='')" class="d-inline-block" tabindex="0" data-toggle="tooltip" title="請先選取一個專案">
                                            <button class="btn btn-outline-primary" style="pointer-events: none;" type="button" disabled>檢視專案結果</button>
                                        </span>
                                        <span v-else class="btn btn-outline-primary" @click="getAProjectReport()"> 檢視專案結果</span>
                                    </div>
                                </div>  
                            </div> 
                        </span>
                    </li>
                </ul>
            </div>
            <div class="list-group">
                <!-- 選擇多位員工 -->
                <ul class="list-group p-2">
                    <li class="list-group-item d-flex align-items-center">   
                        <span class="d-flex project-group fc-dark row">
                            <div id="name" >
                                <span class="p-2 col-md-2" style="font-weight: bolder">被選取員工：</span>
                            </div>
                        </span>
                    </li>
                    <li class=" list-group-item d-flex align-items-center"> 
                        <div class="checked-group">
                            <span v-if="checkedNames.length===0" style="color:#6c757d" class="m-1">(尚未勾選任何員工)</span>
                            <span v-else v-for="name in checkedNames" class="m-1 btn btn-xs fs-10 btn-bold btn-secondary">
                                {{name.name}}
                            </span>
                        </div>
                        <div class="button-group-20 ml-autoborder-left" >
                            <button type="button" class="m-1 btn btn-xs fs-10 btn-bold btn-notify-name"  @click="notifyMembers()">
                                通知多位員工<img src="../../assets/alarm.png" width="20">
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
            <ul v-if="showResetList" class="list-group p-2">
                <li class="d-flex align-items-center">
                    <div class="people-group">
                        <li class="list-group-item d-flex align-items-center" style="background-color:#F8F9FA">
                            <span class="d-flex fc-dark row" style="font-weight:bolder">
                                <div>
                                    <span class="p-2" style="font-weight: bolder">所有員工列表</span>
                                </div>
                            </span>   
                        </li>
                        <span class="card " >
                            <div v-for="department in dptmtList">
                                <span class="card-header d-flex justify-content-between align-items-center" @click="department.isShow = !department.isShow">
                                    <button id="department-title" class="btn" type="button">
                                        {{department.dptmtName}}
                                    </button>
                                    <button type="button" class="btn-sm btn-primary ">
                                        人數<span class="badge badge-light">{{filterByDptmt(department.department_id).length}}</span>
                                    </button>
                                </span >
                                <span v-if="department.isShow" v-for="member in filterByDptmt(department.department_id)">
                                    <li class="list-group-item list-group-item-action d-flex align-items-center border-top" >
                                        <div class="situation-group">
                                            <input type="checkbox" :value="member.employee" v-model="checkedNames">
                                        </div>
                                        <div class="d-flex info-group fc-dark row ">
                                            <div class="col-md-6" style="font-weight:bolder">{{member.employee.name}}</div>
                                            <div class="col-md-6">{{member.employee.job_no}}</div>
                                        </div>
                                        <div class="d-flex pr-group fc-dark row p-3 ">
                                            <div v-for="pr in member.project_pr" class="col-md-4"><span v-if="pr.ability_id!=null">{{pr.ability_id.ability}}</span>> PR:{{pr.employee_prs[0].pr_avg.toFixed(2)}}</div>
                                        </div>                  
                                        <div class="button-group-15 ml-auto p-2 " >
                                            <button type="button" class="btn btn-xs fs-10 btn-bold btn-view1"  @click="viewMember(member)">
                                                <img src="../../assets/view.png" width="20">
                                            </button>
                                            <button type="button" class="btn btn-xs fs-10 btn-bold btn-edit1" @click="exportReport(member)">
                                                <img src="../../assets/export.png" width="20">
                                            </button>
                                            <button type="button" class="btn btn-xs fs-10 btn-bold btn-notify"  @click="notifyAMember(member)">
                                                <img src="../../assets/alarm.png" width="20">
                                            </button>
                                        </div>
                                    </li>
                                </span>
                            </div>
                        </span>
                        
                    </div>
                </li>
            </ul>
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
import Api from "../../api";
import loadingFunc from '../Loading';
export default {
    name: 'ProjectReport',
    components: {
        loadingFunc
    },
    created: function() {
        
        //路由傳入project_id
        var id='';
        var evaluatorList=[]
        // id=this.$route.query.id;
        // console.log("_id"+id);
        // //Api呼叫專案
        
        // if(id!=''){
        //     Api.getAllAssessmentResult({_id:id})
        //     .then((response)=>{
        //         console.log("124/router取得所有員工的報告結果");
        //         console.log(response);
        //         evaluatorList=response.data;
        //         this.showResetList=true;
        //     })
        //     .catch((err)=>{
        //         console.log(err);
        //     })
        // }
        
        // //從全域變數獲得當前專案
        // var cProject={}
        // cProject=this.$store.state.project
        // var cProjectId=cProject._id
        //從全域變數獲得當天日期
        var today=this.$store.state.today

        let dptmtList=[];
        let allQuestions=[];
        let projectList=[];
        // let evaluationList=[];
        let Func1 = async () => {
            try{
                //取得所有部門
                let response = await Api.department_getDepartments()
                console.log("67/取得所有部門");
                console.log(response);
                for(let i=0;i<response.data.length;i++){
                    dptmtList.push({
                        department_id:response.data[i]._id,
                        dptmtName:response.data[i].name,
                        isShow:false})
                };

                //取得所有題目
                response = await Api.topic_getAll()
                console.log("82/取得所有題目");
                console.log(response);
                for(let i=0;i<response.data.length;i++){
                    allQuestions.push({
                    applicable_dep_id:response.data[i].applicable_dep_id,
                    _id:response.data[i]._id,
                    content:response.data[i].content,
                    option:response.data[i].option,
                    type:response.data[i].type,
                    ability_id:response.data[i].ability_id,
                    })
                }

                //取得所有專案
                response = await Api.project_getAll()
                console.log("98/取得所有專案");
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
            }catch(err){
                console.log(err);
            }
        }
        Func1().then(()=>{
            this.dptmtList=dptmtList;
            this.allQuestions=allQuestions;
            this.projectList=projectList;
            this.evaluatorList=evaluatorList;
        });

    },
    mounted(){
        $('#loading').hide();
    },
    data () {
        return {
            dptmtList:[],
            allQuestions:[],
            projectList:[],
            pickedProjectId:'',
            showResetList:false,
            evaluatorList:[],
            checkedNames:[],
            dialogMessage:'',
        }
    },
    methods:{
        filterClosedProject(){
            return this.projectList.filter(function(project){
                return project.close=="Y";
            })
        },
        getAProjectReport(){
            $('#loading').show();
            //透過id取得該專案中員工的所有員工的報告結果
            console.log("133/this.pickedProjectId"+this.pickedProjectId)
            Api.getAllAssessmentResult({_id:this.pickedProjectId})
            .then((response)=>{
                console.log("134/取得所有員工的報告結果");
                console.log(response);
                this.evaluatorList=response.data;
                this.showResetList=true;
                $('#loading').hide();
            })
            .catch((err)=>{
                console.log(err);
                this.dialogMessage = '該專案尚無PR結果';
                $('#modalCenter').modal('show');
                $('#loading').hide();
            })
            
        },
        filterByDptmt:function(id){
            return this.evaluatorList.filter(function(member){
                if(member.employee!=null){
                    return member.employee.department_id===id;
                }
                
            })
        },
        notifyMembers(){
            let memberList=[]
            if(this.checkedNames.length==0){
                return;
            }else{
                for(let i=0;i<this.checkedNames.length;i++){
                    memberList.push(this.checkedNames[i]._id)
                }
                console.log("240/memberList:"+JSON.stringify(memberList))
                Api.sendMail({
                    optionStr:"EndOfTheCompetition",
                    project_id:this.pickedProjectId,
                    emp_id_list:JSON.stringify(memberList),
                })
                .then((response)=>{
                    console.log("247/成功寄送")
                    console.log(response)
                    this.dialogMessage = '成功寄送email通知給多位員工!';
                    $('#modalCenter').modal('show');
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        },
        notifyAMember(member){
            let memberList=[]
            memberList.push(member.employee._id)
            console.log("285/member:"+member._id)
            console.log("285/memberList:"+JSON.stringify(memberList))
            Api.sendMail({
                optionStr:"EndOfTheCompetition",
                project_id:this.pickedProjectId,
                emp_id_list:JSON.stringify(memberList)
            })
            .then((response)=>{
                console.log("292/成功寄送")
                console.log(response)
                this.dialogMessage = '成功寄送email通知給 '+member.employee.name+"!";
                $('#modalCenter').modal('show');
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        viewMember(member){
            console.log("261/查看個別員工報告project_id:"+this.pickedProjectId+";user_id:"+member.employee._id)
            this.$router.push({path:'/PersonalReport',query:{project_id:this.pickedProjectId,user_id:member.employee._id}});
        },
        exportReport(member){
            console.log("265/匯出報告project_id:"+this.pickedProjectId+";user_id:"+member.user_id)
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
        font-size: 20px;
        color:#307BF6;
    }
    #department{
        font-size: 15px;    
    } 
    #department-title{
        font-weight:bold;
        font-size: 20px;
        color:#307BF6;
    }
    #ability{
        font-size: 15px;    
    }
    #type{
        font-size: 15px;
        text-align: left;
        font-weight: bolder;
    }
    #discription{
        font-size: 15px;    
    }
    #option{
        font-size: 15px;    
        color:#98A0AB;
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
    .project-group{
        -ms-flex-align: center;
        align-items: center;
        justify-content: space-between;
        align-items: center;
        justify-content: space-between;
        display: -webkit-box;
        width: 100%
    }
    .checked-group{
        width: 80%;
        text-align:left;
    }
    .campaign-group{
        width: 100%
    }
    .people-group{
        width: 100%
    }
    .situation-group{
        width: 5%;
        vertical-align:top;
    }
    .info-group{
        -ms-flex-align: center;
        align-items: center;
        justify-content: space-between;
        align-items: center;
        justify-content: space-between;
        display: -webkit-box;
        width: 30%
    }
    .pr-group{
        -ms-flex-align: center;
        align-items: center;
        justify-content: space-between;
        align-items: center;
        justify-content: space-between;
        display: -webkit-box;
        width: 45%
    }
    .button-group-15{
        text-align:center;
        width: 20%;
    }
    .button-group-20{
        text-align:center;
        width: 20%;
    }
    .filter-group{
        width: 40%
    }
    .btn-notify-name{
        background-color: #D2DDEB;
    }
    .btn-alignRight{
        text-align: right;
        width: 10%;
        vertical-align:top;
    }
    .btn-edit1{
        background-color: #D2DDEB;
        margin-top: 5pt;
    }
    .btn-notify{
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