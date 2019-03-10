<template>
    <div>
        <loadingFunc id:loading></loadingFunc>
        <div class="container">
            <span class="navbar">
                <form class="form-inline">
                    <a class="navbar-brand page-title" href="#">第一階段 自選評量者管理</a>
                </form>
            </span>
            <div class="list-group">
                <!-- 階段活動 -->
                <ul class="list-group p-2">
                    <li class="list-group-item d-flex align-items-center">   
                        <span class="d-flex project-group fc-dark row">
                            <div id="name" >
                                <span class="p-2 col-md-2" style="font-weight: bolder">目前查看的專案：{{currentProject.name}}</span>
                            </div>
                            <!-- <div class="p-2 project-group row d-flex  m-2">
                                <div class="input-group mb-3">
                                    <select class="form-control" v-model="pickedProjectId">
                                        <option v-for="project in projectList" :key="project.name" :value="project._id">{{project.name}}</option>
                                        </option :value="currentProject._id" disabled selected hidden>{{currentProject.name}}</option>
                                    </select>
                                    <div class="input-group-append">
                                        <span class="btn btn-outline-primary" @click="resetProject()"> 查看其他專案</span>
                                    </div>
                                </div>  
                            </div>  -->
                        </span>
                    </li>
                    <li class="list-group-item d-flex align-items-center">
                        <span class="d-flex project-group fc-dark row">
                            <div id="name" class="col-md-3">
                                <span v-if="identifyStatus(currentProject.evaluation_date_start,currentProject.evaluation_date_end)==0" class="badge badge-pill badge-warning ">未開始</span>
                                <span v-else-if="identifyStatus(currentProject.evaluation_date_start,currentProject.evaluation_date_end)==1" class="badge badge-pill badge-primary">進行中</span>
                                <span v-else-if="identifyStatus(currentProject.evaluation_date_start,currentProject.evaluation_date_end)==2" class="badge badge-pill badge-secondary">已結束</span>
                                <span class="p-2" style="font-weight:bolder">自選評量者階段</span></div>
                            <div id="period" class="col-md-4">
                                <span><span style="color:#98A0AB">Period：</span> {{currentProject.evaluation_date_start}}</span>
                                <span> ～ {{currentProject.evaluation_date_end}}</span>
                            </div>
                            <div class="col-md-5">
                                <span class="progress">
                                    <span class="progress-bar bg-secondary" role="progressbar" v-bind:style="{width:identifyProgress(currentProject.evaluation_status4_num,currentProject.employee_num)}" aria-valuemin="0" aria-valuemax="100">{{identifyProgress(currentProject.evaluation_status4_num,currentProject.employee_num)}}</span>
                                </span>
                            </div>
                        </span>
                    </li>
                    
                </ul>
            </div>
            <div class="list-group">
                <!-- 階段活動 -->
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
                            <span v-else v-for="name in checkedNames" class="rounded border border-secondary m-1 p-1" style="color:#6c757d">
                                {{name.be_evaluated_name}}
                            </span>
                        </div>
                        <div class="button-group" >
                            <button type="button" class="m-1 btn btn-xs fs-10 btn-bold btn-notify-name"  @click="notifyMembers()">
                                通知多位員工<img src="../../assets/alarm.png" width="20">
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
            <ul class="list-group p-2">
                <li class="d-flex align-items-center">
                    <div class="question-group">
                        
                        <li class="list-group-item d-flex align-items-center" style="background-color:#F8F9FA">
                            <span class="d-flex fc-dark row" style="font-weight:bolder">
                                <div id="name" >
                                    <span class="p-2" style="font-weight: bolder">各部門選擇評量人進度</span>
                                </div>
                            </span>   
                        </li>
                        <span  class="card" >
                            <div v-for="department in showDptmtOptions">
                                <span class="card-header d-flex justify-content-between align-items-center" @click="department.isShow=!department.isShow">
                                    <button id="department-title" class="btn btn-link" type="button">
                                    {{department.dptmtName}}
                                    </button>
                                    <span id="progress-area" style="text-align:left">
                                        <span class="progress">
                                            <!-- Y(已完成)/N(未進行)/P(被駁回)/W(等待審核中) -->
                                            <span v-show="department.evaluation_statusN_num!=0" class="progress-bar bg-danger" role="progressbar" v-bind:style="{width:identifyPercentage(department.evaluation_statusN_num,department.employee_num)}"   aria-valuemin="0" aria-valuemax="100">{{department.evaluation_statusN_num}}未進行</span>
                                            <span v-show="department.evaluation_statusP_num!=0" class="progress-bar bg-warning" role="progressbar"  v-bind:style="{width:identifyPercentage(department.evaluation_statusP_num,department.employee_num)}"  aria-valuemin="0" aria-valuemax="100">{{department.evaluation_statusP_num}}被駁回</span>
                                            <span v-show="department.evaluation_statusW_num!=0" class="progress-bar bg-secondary" role="progressbar" v-bind:style="{width:identifyPercentage(department.evaluation_statusW_num,department.employee_num)}" aria-valuemin="0" aria-valuemax="100">{{department.evaluation_statusW_num}}人審核中</span>
                                            <span v-show="department.evaluation_statusY_num!=0" class="progress-bar bg-primary" role="progressbar" v-bind:style="{width:identifyPercentage(department.evaluation_statusY_num,department.employee_num)}"  aria-valuemin="0" aria-valuemax="100">{{department.evaluation_statusY_num}}人已完成</span>
                                        </span>
                                    </span>
                                    <span id="percentage-area">
                                        <!-- {{department.employee_num}} -->
                                    </span>
                                    <div id="more-area" >
                                        <img v-if="department.isShow" src="../../assets/less.png" width="20">
                                        <img v-else src="../../assets/more.png" width="20">
                                    </div>
                                    
                                </span>
                                <li v-if="department.isShow" class="list-group-item list-group-item-action d-flex align-items-center border-top" v-for="member in department.memberList">
                                    <div class="situation-group">
                                        <input type="checkbox" :value="member" v-model="checkedNames">
                                    </div>
                                    <div class="d-flex info-group fc-dark row">
                                        <div id="name" class="col-md-3">{{member.be_evaluated_name}}</div>
                                        <div id="serial-number" class="col-md-8">{{member.be_evaluated_job_no}}</div>
                                        <!-- <div id="direct-boss" class="col-md-4">......</div> -->
                                    </div>
                                    <div class="d-flex status-group fc-dark row">
                                        <span v-if="(member.supervisor_check=='Y')" class="col-md-6"><span class="badge badge-primary">已完成</span></span>
                                        <span v-else-if="(member.supervisor_check=='W')" class="col-md-6"><span class="badge badge-secondary">審核中</span></span>
                                        <span v-else-if="(member.supervisor_check=='P')" class="col-md-6"><span class="badge badge-warning">被駁回</span></span>
                                        <span v-else class="col-md-6"><span class="  badge badge-danger">未進行</span></span>
                                        <span class="col-md-6">已挑：{{member.evaluated.length}} 人</span>
                                    </div>
                                    <div class="button-group" >
                                        <button type="button" class="btn btn-xs fs-10 btn-bold btn-edit1" @click="editMember(member)">
                                            <img src="../../assets/edit.png" width="20">
                                        </button>
                                        <button type="button" class="btn btn-xs fs-10 btn-bold btn-delete1"  @click="notifyAMember(member)">
                                            <img src="../../assets/alarm.png" width="20">
                                        </button>
                                        <button type="button" class="btn btn-xs fs-10 btn-bold btn-view1"  @click="viewMember(member)">
                                            <img src="../../assets/view.png" width="20">
                                        </button>
                                    </div>
                                </li>
                            </div>
                        </span>
                    </div>
                </li>
            </ul>
        </div>

        <!-- 檢視員工彈出視窗 -->
        <div v-if="showViewModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">{{identifyDptmt(chosedMember.be_evaluated_department_id)}} {{chosedMember.be_evaluated_name}}</h5>
                                        <form class="form-inline">
                                                <span v-if="(chosedMember.supervisor_check=='Y')" class="badge badge-primary">已完成</span></span>
                                                <span v-else-if="(chosedMember.supervisor_check=='W')" class="badge badge-secondary">審核中</span></span>
                                                <span v-else-if="(chosedMember.supervisor_check=='P')" class="badge badge-warning">被駁回</span></span>
                                                <span v-else class="  badge badge-danger">未進行</span></span>
                                        </form>
                                </div>
                                <div class="modal-body modal-open">
                                    <form>
                                        <div v-for="evaluator in chosedEvaluator"class="form-group row p-1 m-1">
                                            <label class="col-sm-2 font-weight-bold">{{identyfyRelation(evaluator.relation)}}</label>
                                            <div class="col-sm-7">
                                                <form class="form-inline align-items-center">
                                                    {{identifyDptmtById(evaluator.evaluated_id)}} 
                                                    {{identifyNameById(evaluator.evaluated_id)}}
                                                </form>
                                            </div>
                                        </div>  
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    </button>
                                    <button type="button" class="btn btn-secondary" @click="showViewModal = false">Close</button>
                                    <button type="button" class="btn btn-primary" @click="reEditMember()">edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <!-- 編輯員工彈出視窗 -->
        <div v-if="showEditModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">{{identifyDptmt(chosedMember.be_evaluated_department_id)}} {{chosedMember.be_evaluated_name}}</h5>
                                        <form class="form-inline">
                                                <span v-if="(chosedMember.supervisor_check=='Y')" class="badge badge-primary">已完成</span></span>
                                                <span v-else-if="(chosedMember.supervisor_check=='W')" class="badge badge-secondary">審核中</span></span>
                                                <span v-else-if="(chosedMember.supervisor_check=='P')" class="badge badge-warning">被駁回</span></span>
                                                <span v-else class="  badge badge-danger">未進行</span></span>
                                        </form>
                                </div>
                                <div class="modal-body modal-open">
                                    <form>
                                        <div v-for="evaluator in chosedEvaluator"class="form-group row p-1 m-1">
                                            <div class="form-group row m-1 evaluator-group">
                                                <label class="col-sm-3 font-weight-bold p-1">{{identyfyRelation(evaluator.relation)}}</label>
                                                <div class="col-sm-8">
                                                    <div class="form-inline align-items-center">
                                                        {{identifyDptmtById(evaluator.evaluated_id)}} 
                                                        {{identifyNameById(evaluator.evaluated_id)}}
                                                        <!-- {{evaluator.evaluated_id}} -->
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="button-group">
                                                <span class="btn btn-outline-secondary btn-sm m-1" @click="removeEvaluator(evaluator.evaluated_id)">移除 X</span>
                                            </div>
                                        </div>  
                                    </form>
                                    <form class="border-top">
                                        <div class="row form-group row p-1 m-1">
                                            <div class="form-group row m-1 evaluator-group">
                                                <label class="col-sm-3 p-1">關係</label>
                                                <div class="col-md-8">
                                                    <select class="modal-form-control form-control-sm" v-model="relationPicked">
                                                        <option value="1">主管</option>
                                                        <option value="2">同事</option>
                                                        <option value="3">下屬</option>
                                                        <option value="4">其他</option>
                                                    </select>
                                                </div>
                                                <label class="col-sm-3 p-1">部門</label>
                                                <div class="col-md-8">
                                                    <select class="modal-form-control form-control-sm" v-model="departmentIdPicked">
                                                        <option v-for="dptmt in showDptmtOptions" :value="dptmt.department_id" >{{dptmt.dptmtName}}</option>
                                                    </select>
                                                </div>
                                                <label class="col-sm-3 p-1">評量人</label>
                                                <div class="col-md-8">
                                                    <select class="modal-form-control form-control-sm " v-model="evaluatorIdPicked">
                                                        <option v-for="employee in filterByDptmt(allEmployeeList,departmentIdPicked)" :value="employee._id" >
                                                            {{employee.name}}
                                                        </option>
                                                    </select> 
                                                </div>
                                            </div>
                                            <span class="button-group p-1 ">
                                                <span class="btn btn-outline-primary btn-sm " @click="addEvaluator()">
                                                    ＋增加 
                                                </span>
                                            </span>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    </button>
                                    <button type="button" class="btn btn-secondary" @click="showEditModal = false">Close</button>
                                    <button type="button" class="btn btn-primary" @click="toSaveChange()">save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div> 
        <!-- Modal -->
        <div class="modal fade" id="modalCenter" tabindex="-1" role="dialog" aria-labelledby="modalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalLongTitle">成功通知</h5>
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
    name: 'EvaluatorManagement',
    components: {
        loadingFunc
    },
    created:function(){
        $('#loading').show();
        var cProject={}
        cProject=this.$store.state.project
        var cProjectId=cProject._id
        var today=this.$store.state.today

        let dptmtList=[];
        let evaluationList=[];
        let projectList=[];
        let allEmployeeList=[];
        let Func1 = async () => {
            try{
                let response = await Api.department_getDepartments()
                console.log("245/取得所有部門");
                console.log(response);
                for(let i=0;i<response.data.length;i++){
                    dptmtList.push({
                        department_id:response.data[i]._id,
                        dptmtName:response.data[i].name,
                        employee_num:0,
                        memberList:[],
                        evaluation_statusY_num:0,
                        evaluation_statusN_num:0,
                        evaluation_statusP_num:0,
                        evaluation_statusW_num:0,
                        isShow:false})
                };
                //透過project_id取得第一階段選擇評量人的整體進度
                console.log("260/cProjectId:"+cProjectId)
                response = await Api.evaluationList_getAll({project_id:cProjectId})
                console.log("262/取得專案進度")
                console.log(response);
                cProject.employee_num=response.data.employee_num;
                cProject.evaluation_status1_num=response.data.evaluation_status1_num;
                cProject.evaluation_status2_num=response.data.evaluation_status2_num;
                cProject.evaluation_status3_num=response.data.evaluation_status3_num;
                cProject.evaluation_status4_num=response.data.evaluation_status4_num;

                //透過id取得該專案中員工的第一階段選擇評量人的進度狀態
                response = await Api.evaluationList_getAllFirstStatus({project_id: cProjectId})
                console.log("274/進行中專案的評量人狀態");
                console.log(response);
                evaluationList=response.data

                //取得所有專案
                response = await Api.project_getAll()
                console.log("280/取得所有專案");
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

                //取得所有員工
                response = await Api.employees_getAll()
                console.log("317/取得所有員工");
                console.log(response);
                allEmployeeList=response.data

            }catch(err){
                console.log(err);
            }
        }
        let Func2 = async () => {
            await Func1()
            console.log("308/:開始進行Func2內容")
            for(let i=0;i<dptmtList.length;i++){
                let response = evaluationList.filter(function(member){
                    return member.be_evaluated_department_id==dptmtList[i].department_id
                })
                dptmtList[i].memberList=response
                dptmtList[i].employee_num=response.length
                
                
                if(response.length==0){
                    dptmtList[i].evaluation_statusY_num=0
                    dptmtList[i].evaluation_statusN_num=0
                    dptmtList[i].evaluation_statusP_num=0
                    dptmtList[i].evaluation_statusW_num=0
                }else{
                    dptmtList[i].evaluation_statusY_num = (response.filter(function(member){
                        return member.supervisor_check=='Y'
                    })).length
                    
                    dptmtList[i].evaluation_statusN_num = response.filter(function(member){
                        return member.supervisor_check=='N'
                    }).length
                    
                    dptmtList[i].evaluation_statusP_num = response.filter(function(member){
                        return member.supervisor_check=='P'
                    }).length
                    
                    dptmtList[i].evaluation_statusW_num = response.filter(function(member){
                        return member.supervisor_check=='W'
                    }).length
                    
                }
            }
        }

        Func2().then(()=>{
            console.log("344/:Func2結束")
            this.today=today;
            this.pickedProjectId=cProjectId;
            this.currentProjectId=cProjectId;
            this.currentProject=cProject;
            this.showDptmtOptions=dptmtList;
            this.evaluationList=evaluationList;
            this.projectList=projectList;
            this.allEmployeeList=allEmployeeList;
            $('#loading').hide();
        });
            

    },
    data () {
        return {
            today:'',
            currentProjectId:'',
            currentProject:{},
            showDptmtOptions:[],
            evaluationList:[],
            projectList:[],
            pickedProjectId:'',
            allEmployeeList:[],
            inputKeyword:"",
            showViewModal:false,
            showEditModal:false,
            checkedNames:[],//勾選人寄email
            chosedMember:{},
            chosedEvaluator:[],
            relationPicked:'',
            departmentIdPicked:'',
            evaluatorIdPicked:'',
            dialogMessage:'',
        }
    },
    methods:{
        identifyStatus(start,end){
            if(Date.parse(start).valueOf() > Date.parse(this.today).valueOf()){
                return 0;//未開始
            }else if(Date.parse(end).valueOf() < Date.parse(this.today).valueOf()){
                return 2; //已經結束
            }else{
                return 1;//進行中
            }
        },
        identifyProgress(finish,total){
            let temp = (100*(finish/total)).toFixed(2)+"%";
            return temp;
        },
        identifyPercentage(statusNum,totalNum){
            if(statusNum==0||totalNum==0){
                return 0+"%";
            }else{
                console.log("275/statusNum:"+statusNum);
                console.log("276/totalNum:"+totalNum);
                let percentage = (100*((statusNum/totalNum).toFixed(2)))+"%";
                console.log("278/temp:"+percentage);
                return percentage;
            }
        },
        identifyDptmt(dptmtId){
            for(let i=0;i<this.showDptmtOptions.length;i++){
                if(this.showDptmtOptions[i].department_id==dptmtId){
                    return this.showDptmtOptions[1].dptmtName;
                }
            }
        },
        identyfyRelation(value){
            if(value==1){
                return "主管"
            }else if(value==1){
                return "同事"
            }else if(value==2){
                return "下屬"
            }else{
                return "其他"
            }
        },
        identifyDptmtById(id){
            let departmentId;
            for(let i=0;i<this.allEmployeeList.length;i++){
                if(this.allEmployeeList[i]._id==id){
                    departmentId = this.allEmployeeList[i].department_id
                    for(let i=0;i<this.showDptmtOptions.length;i++){
                        console.log("449/"+this.showDptmtOptions[i].department_id) 
                        if(this.showDptmtOptions[i].department_id==departmentId){
                            return this.showDptmtOptions[i].dptmtName
                        }
                    }
                }
            }
            
        },
        identifyNameById(id){
            for(let i=0;i<this.allEmployeeList.length;i++){
                if(this.allEmployeeList[i]._id==id){
                    return this.allEmployeeList[i].name
                }
            }
        },
        searchKeyword(){
            console.log("searchKeyword"+this.inputKeyword);
        },
        notifyMembers(){
            let memberList=[]
            if(this.checkedNames.length==0){
                return;
            }else{
                for(let i=0;i<this.checkedNames.length;i++){
                    memberList.push(this.checkedNames[i].be_evaluated_id)
                }
                console.log("495/memberList:"+JSON.stringify(memberList))
                Api.sendMail({
                    optionStr:"SelectionOfAppraisers",
                    project_id:this.currentProjectId,
                    emp_id_list:JSON.stringify(memberList),
                })
                .then((response)=>{
                    console.log("502/成功寄送")
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
            memberList.push(member.be_evaluated_id)
            console.log("505/memberList:"+JSON.stringify(memberList))
            Api.sendMail({
                optionStr:"SelectionOfAppraisers",
                project_id:this.currentProjectId,
                emp_id_list:JSON.stringify(memberList)
            })
            .then((response)=>{
                console.log("512/成功寄送")
                console.log(response)
                this.dialogMessage = '成功寄送email通知給 '+member.be_evaluated_name+"!";
                $('#modalCenter').modal('show');
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        editMember(member){
            this.showEditModal=true
            this.relationPicked=''
            this.departmentIdPicked=''
            this.evaluatorIdPicked=''
            //  先清空再重新放入新選的member資料
            this.chosedEvaluator=[]
            
            this.chosedMember=member
            for(let i=0;i<member.evaluated.length;i++){
                this.chosedEvaluator.push({
                    _id:member.evaluated[i]._id,
                    evaluated_id:member.evaluated[i].evaluated_id,
                    evaluation_completed:member.evaluated[i].evaluation_completed,
                    relation:member.evaluated[i].relation
                })
            }
        },
        viewMember(member){
            this.showViewModal=true
            this.chosedMember=member
            this.chosedEvaluator=[]
            for(let i=0;i<member.evaluated.length;i++){
                this.chosedEvaluator.push({
                    _id:member.evaluated[i]._id,
                    evaluated_id:member.evaluated[i].evaluated_id,
                    evaluation_completed:member.evaluated[i].evaluation_completed,
                    relation:member.evaluated[i].relation
                })
            }
        },
        reEditMember(){
            this.showViewModal=false
            // this.showEditModal=true
            this.relationPicked=''
            this.departmentIdPicked=''
            this.evaluatorIdPicked=''
            this.editMember(this.chosedMember)
        },
        addEvaluator(){
            console.log("482/前:"+this.chosedEvaluator.length)
            this.chosedEvaluator.push({
                evaluated_id:this.evaluatorIdPicked,
                evaluation_completed:false,
                relation:this.relationPicked,
            })
            console.log("488/後:"+this.chosedEvaluator.length)
            // this.chosedMember.evaluated.push({
            //     evaluated_id:this.evaluatorIdPicked,
            //     evaluation_completed:false,
            //     relation:this.relationPicked,
            // })
            this.relationPicked=''
            this.departmentIdPicked=''
            this.evaluatorIdPicked=''
        },
        removeEvaluator(id){
            let indexNum = this.chosedEvaluator.findIndex(x=>x.evaluated_id===id);
            console.log("466/index:"+indexNum)
            this.chosedEvaluator.splice(indexNum,1)
            // let indexNum = this.chosedMember.evaluated.findIndex(x=>x.evaluated_id===id);
            // console.log("466/index:"+indexNum)
            // this.chosedMember.evaluated.splice(indexNum,1)
        },
        toSaveChange(){
            let member=this.chosedMember
            let chosedEvaluator =this.chosedEvaluator
            console.log("509/chosedEvaluator:"+chosedEvaluator.length)
            console.log("470/準備儲存資料")
            console.log("475/"+JSON.stringify({
                project_id:member.project_id,
                be_evaluated_id:member.be_evaluated_id,
                evaluated:JSON.stringify(chosedEvaluator),
                be_evaluation_completed:member.be_evaluation_completed,
                evaluated_all_completed:member.evaluated_all_completed,
                supervisor_check:'Y',
                supervisor_opinion:member.supervisor_opinion
            }))
            
            Api.evaluationList_HRUpdate({
                project_id:member.project_id,
                be_evaluated_id:member.be_evaluated_id,
                evaluated:JSON.stringify(chosedEvaluator),
                be_evaluation_completed:member.be_evaluation_completed,
                evaluated_all_completed:member.evaluated_all_completed,
                supervisor_check:'Y',
                supervisor_opinion:member.supervisor_opinion
            })
            .then((response)=>{
                console.log("482/更新成功")
                console.log(response)
                console.log("前557/"+this.chosedMember.project_id)
                
                let id =response.data.be_evaluated_id
                for(let i=0;i<this.allEmployeeList.length;i++){
                    if(this.allEmployeeList[i]._id==id){
                        let departmentId = this.allEmployeeList[i].department_id
                        for(let j=0;j<this.showDptmtOptions.length;j++){
                            if(this.showDptmtOptions[j].department_id==departmentId){
                                for(let m=0;m<this.showDptmtOptions[j].memberList.length;m++){
                                    if(this.showDptmtOptions[j].memberList[m].be_evaluated_id==response.data.be_evaluated_id){
                                        this.showDptmtOptions[j].memberList[m]={
                                            project_id:response.data.project_id,
                                            be_evaluated_id:response.data.be_evaluated_id,
                                            evaluated:response.data.evaluated,
                                            be_evaluation_completed:response.data.be_evaluation_completed,
                                            evaluated_all_completed:response.data.evaluated_all_completed,
                                            supervisor_check:response.data.supervisor_check,
                                            supervisor_opinion:response.data.supervisor_opinion
                                        }
                                    }
                                    console.log("577/前:"+this.showDptmtOptions[j].evaluation_statusY_num)
                                    this.showDptmtOptions[j].evaluation_statusY_num++;
                                    console.log("577/:"+this.showDptmtOptions[j].evaluation_statusY_num)
                                }
                            }
                        }
                        
                    }
                }
                // this.chosedMember={
                //     project_id:response.data.project_id,
                //     be_evaluated_id:response.data.be_evaluated_id,
                //     evaluated:response.data.evaluated,
                //     be_evaluation_completed:response.data.be_evaluation_completed,
                //     evaluated_all_completed:response.data.evaluated_all_completed,
                //     supervisor_check:response.data.supervisor_check,
                //     supervisor_opinion:response.data.supervisor_opinion
                // }
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        filterByDptmt(array,dptmtId){
            return array.filter(function(employee){
                return employee.department_id===dptmtId;
            })
        },
        // 更改檢視的專案(功能取消)
        // resetProject(){
        //     let dptmtList = this.showDptmtOptions;
        //     let resetProjectId = this.pickedProjectId;
        //     let resetProject = {};
        //     let resetEvaluationList = [];
        //     console.log("500/resetProjectId:"+resetProjectId)
        //     //call另一專案的內容（未完成）
        //     let Func1 = async () => {
        //         try{
                    
        //             //project_id取得project
        //             let response = await Api.project_get({_id: resetProjectId})
        //             console.log("507/取得專案object")
        //             console.log(response);
        //             resetProject=response.data
        //             //透過project_id取得第一階段選擇評量人的整體進度
        //             response = await Api.evaluationList_getAll({_id:resetProjectId})
        //             console.log("512/取得專案進度")
        //             console.log(response);
        //             resetProject.employee_num=response.data.employee_num;
        //             resetProject.evaluation_status1_num=response.data.evaluation_status1_num;
        //             resetProject.evaluation_status2_num=response.data.evaluation_status2_num;
        //             resetProject.evaluation_status3_num=response.data.evaluation_status3_num;
        //             resetProject.evaluation_status4_num=response.data.evaluation_status4_num;
        //             resetProject.project_statusN_num=response.data.project_statusN_num;
        //             resetProject.project_statusY_num=response.data.project_statusY_num;

        //             //透過id取得該專案中員工的第一階段選擇評量人的進度狀態
        //             console.log("574/resetProjectId:"+resetProjectId);
        //             response = await Api.evaluationList_getAllFirstStatus({project_id: resetProjectId})
        //             console.log("576/進行中專案的評量人狀態");
        //             console.log(response);
        //             resetEvaluationList=response.data;
        //         }catch(err){
        //             console.log(err);
        //         }
        //     }
        //     let Func2 = async () => {
        //         await Func1()
        //         console.log("534/:開始進行Func2內容")
        //         for(let i=0;i<dptmtList.length;i++){
        //             let response = resetEvaluationList.filter(function(member){
        //                 return member.be_evaluated_department_id==dptmtList[i].department_id
        //             })
        //             dptmtList[i].memberList=response
        //             dptmtList[i].employee_num=response.length

        //             if(response.length==0){
        //                 dptmtList[i].evaluation_statusY_num=0
        //                 dptmtList[i].evaluation_statusN_num=0
        //                 dptmtList[i].evaluation_statusP_num=0
        //                 dptmtList[i].evaluation_statusW_num=0
        //             }else{
        //                 dptmtList[i].evaluation_statusY_num = (response.filter(function(member){
        //                     return member.supervisor_check=='Y'
        //                 })).length
                        
        //                 dptmtList[i].evaluation_statusN_num = response.filter(function(member){
        //                     return member.supervisor_check=='N'
        //                 }).length
                        
        //                 dptmtList[i].evaluation_statusP_num = response.filter(function(member){
        //                     return member.supervisor_check=='P'
        //                 }).length
                        
        //                 dptmtList[i].evaluation_statusW_num = response.filter(function(member){
        //                     return member.supervisor_check=='W'
        //                 }).length
                        
        //             }
        //         }
        //     }
        //     Func2().then(()=>{
        //         console.log("568/:Func2結束")
        //         this.showDptmtOptions=dptmtList;
        //         this.currentProjectId=resetProjectId;
        //         this.currentProject=resetProject;
        //         this.evaluationList=resetEvaluationList;
        //     });
        // }
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
    .question-group{
        width: 100%
    }
    
    .campaign-group{
        width: 100%
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
    .situation-group{
        width: 10%;
        vertical-align:top;
        text-align: center;
        font-size: 10px;
    }
    .info-group{
        -ms-flex-align: center;
        align-items: center;
        justify-content: space-between;
        align-items: center;
        justify-content: space-between;
        display: -webkit-box;
        width: 40%
    }
    .status-group{
        -ms-flex-align: center;
        align-items: center;
        justify-content: space-between;
        align-items: center;
        justify-content: space-between;
        display: -webkit-box;
        width: 35%
    }
    .button-group{
        text-align:center;
        width: 20%;
    }
    .evaluator-group{
        width: 70%;
    }
    .checked-group{
        width: 80%;
        text-align:left;
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