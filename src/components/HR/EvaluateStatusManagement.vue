<template>
    <div>
        <loadingFunc id:loading></loadingFunc>
        <div class="container">
            <span class="navbar">
                <form class="form-inline">
                    <a class="navbar-brand page-title" href="#">第二階段 互評狀態管理</a>
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
                        </span>
                    </li>
                    <li class="list-group-item d-flex align-items-center">
                        <span class="d-flex project-group fc-dark row">
                            <div id="name" class="col-md-4">
                                <span v-if="identifyStatus(currentProject.project_date_start,currentProject.project_date_end)==0" class="badge badge-pill badge-warning ">未開始</span>
                                <span v-else-if="identifyStatus(currentProject.project_date_start,currentProject.project_date_end)==1" class="badge badge-pill badge-primary">進行中</span>
                                <span v-else-if="identifyStatus(currentProject.project_date_start,currentProject.project_date_end)==2" class="badge badge-pill badge-secondary">已結束</span>
                                <span class="p-2" style="font-weight:bolder">員工互評階段</span></div>
                            <div id="period" class="col-md-4">
                                <span><span style="color:#98A0AB">Period：</span> {{currentProject.project_date_start}}</span>
                                <span> ～ {{currentProject.project_date_end}}</span>
                            </div>
                            <div class="col-md-4">
                                <span class="progress">
                                    <div v-show="currentProject.project_statusY_num!=0||currentProject.project_statusN_num!=0" class="progress-bar bg-secondary" role="progressbar" v-bind:style="{width:identifyProgress((currentProject.project_statusY_num+currentProject.project_statusX_num),currentProject.employee_num)}" aria-valuemin="0" aria-valuemax="100">完成度:{{identifyProgress((currentProject.project_statusY_num+currentProject.project_statusX_num),currentProject.employee_num)}}</div>
                                </span>
                            </div>
                        </span>
                    </li>
                    
                </ul>
            </div>
            <div class="list-group">
                <!-- 通知多位員工 -->
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
                                {{name.name}}
                            </span>
                            <!-- <span v-else v-for="name in checkedNames" class="m-1 btn btn-xs fs-10 btn-bold btn-secondary">
                                {{name.name}}
                            </span> -->
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
                                            <span v-show="department.project_statusY_num!=0" class="progress-bar bg-primary" role="progressbar" v-bind:style="{width:identifyPercentage(department.project_statusY_num,department.employee_num)}"  aria-valuemin="0" aria-valuemax="100">{{department.project_statusY_num}}人已完成</span>
                                            <span v-show="department.project_statusX_num!=0" class="progress-bar bg-secondary" role="progressbar" v-bind:style="{width:identifyPercentage(department.project_statusX_num,department.employee_num)}"   aria-valuemin="0" aria-valuemax="100">{{department.project_statusX_num}}人無需評</span>
                                            <span v-show="department.project_statusN_num!=0" class="progress-bar bg-danger" role="progressbar" v-bind:style="{width:identifyPercentage(department.project_statusN_num,department.employee_num)}"   aria-valuemin="0" aria-valuemax="100">{{department.project_statusN_num}}人未完成</span>
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
                                        <div id="name" class="col-md-3">{{member.name}}</div>
                                        <div id="serial-number" class="col-md-8">{{member.employee_job_no}}</div>
                                        <!-- <div id="direct-boss" class="col-md-4">......</div> -->
                                    </div>
                                    <div class="d-flex status-group fc-dark row">
                                        <span v-if="(member.count.total==0)" class="col-md-4"><span class="badge badge-secondary">無需評</span></span>
                                        <span v-else-if="(member.count.unfinished==0)" class="col-md-4"><span class="badge badge-primary">已完成</span></span>
                                        <span v-else class="col-md-4"><span class="badge badge-danger">未完成</span></span>
                                        <span class="col-md-4">需評：{{member.count.total}} 人</span>
                                        <span class="col-md-4">待評：{{member.count.unfinished}} 人</span>
                                    </div>
                                    <div class="button-group" >
                                        <button type="button" class="btn btn-xs fs-10 btn-bold btn-view1"  @click="viewMember(member)">
                                            <img src="../../assets/view.png" width="20">
                                        </button>
                                        <button type="button" class="btn btn-xs fs-10 btn-bold btn-delete1"  @click="notifyAMember(member)">
                                            <img src="../../assets/alarm.png" width="20">
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
                                    <h5 class="modal-title">{{identifyDptmt(chosedMember.department_id)}} {{chosedMember.name}} {{chosedMember.employee_job_no}}</h5>
                                        <form class="form-inline">
                                            <span v-if="(chosedMember.count.unfinished==0)" class="col-md-4"><span class="badge badge-primary">已完成</span></span>
                                            <span v-else class="col-md-4"><span class="badge badge-secondary">未完成</span></span>
                                        </form>
                                </div>
                                <div class="modal-body modal-open">
                                    <form>
                                        <span class="col-md-4 font-weight-bold">需評人數：{{chosedMember.count.total}} 人</span>
                                        <span class="col-md-4 font-weight-bold">完成人數：{{chosedMember.count.finished}} 人</span>
                                        <span class="col-md-4 font-weight-bold">待評人數：{{chosedMember.count.unfinished}} 人</span>
                                        
                                        <div v-for="evaluator in chosedEvaluator"class="row p-2 m-2 col-md-12">
                                            <span v-if="evaluator.evaluated_finished" class="col-md-3" ><span class="badge badge-primary ">評比完成</span></span>
                                            <span v-else class="col-md-3 "><span class="badge badge-secondary">尚未評比</span></span>
                                            <span class="form-inline align-items-center col-md-8">
                                                {{identifyDptmt(evaluator.be_evaluated_department_id)}} {{evaluator.be_evaluated_name}}
                                            </span>
                                        </div>  
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    </button>
                                    <button type="button" class="btn btn-secondary" @click="showViewModal = false">Close</button>
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
    name: 'EvaluateStatusManagement',
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
                        project_statusN_num: 0,
                        project_statusY_num: 0,
                        project_statusX_num: 0,
                        isShow:false})
                };
                //透過project_id取得第一階段選擇評量人的整體進度
                console.log("260/cProjectId:"+cProjectId)
                response = await Api.evaluationList_getProject_status({project_id:cProjectId})
                console.log("262/取得專案進度")
                console.log(response);
                cProject.employee_num=(response.data.project_statusN_num+response.data.project_statusX_num+response.data.project_statusY_num)
                cProject.project_statusN_num=response.data.project_statusN_num;
                cProject.project_statusX_num=response.data.project_statusX_num;
                cProject.project_statusY_num=response.data.project_statusY_num;

                //透過id取得該專案中員工的第二階段評量他人的進度狀態
                response = await Api.evaluationList_getAllSecondStatusMembers({project_id: cProjectId})
                console.log("274/取得第二階段評量人資料");
                console.log(response);
                //假資料
                evaluationList=response.data
                console.log("223/"+JSON.stringify(response.data[0].count));

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
            //將evaluator放進不同部門中的memberList
            for(let i=0;i<dptmtList.length;i++){
                let response = evaluationList.filter(function(member){
                    return member.department_id==dptmtList[i].department_id
                })
                dptmtList[i].memberList=response
                dptmtList[i].employee_num=response.length
                
                if(response.length==0){
                    dptmtList[i].project_statusN_num=0
                    dptmtList[i].project_statusY_num=0  
                    dptmtList[i].project_statusX_num=0
                }else{
                    
                    dptmtList[i].project_statusX_num = response.filter(function(member){
                        return member.count.total==0
                    }).length
                    dptmtList[i].project_statusN_num = response.filter(function(member){
                        return member.count.unfinished!=0
                    }).length

                    let tempMemberList = (response.filter(function(member){
                        return member.count.unfinished==0
                    }))
                    dptmtList[i].project_statusY_num = tempMemberList.filter(function(member){
                        return  member.count.total!=0
                    }).length
                }
                
            }
        }

        Func2().then(()=>{
            console.log("344/:Func2結束")
            this.today=today;
            this.currentProjectId=cProjectId;
            this.currentProject=cProject;
            this.showDptmtOptions=dptmtList;
            this.evaluationList=evaluationList;
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
            allEmployeeList:[],
            inputKeyword:"",
            showViewModal:false,
            checkedNames:[],//勾選人寄email
            chosedMember:{},
            chosedEvaluator:[],
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
            console.log("211/identifyProgress:"+temp);
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
                    memberList.push(this.checkedNames[i].employee_id)
                }
                console.log("366/memberList:"+JSON.stringify(memberList))
                Api.sendMail({
                    optionStr:"MeasuringOthers",
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
            memberList.push(member.employee_id)
            console.log("385/memberList:"+JSON.stringify(memberList))
            Api.sendMail({
                optionStr:"MeasuringOthers",
                project_id:this.currentProjectId,
                emp_id_list:JSON.stringify(memberList)
            })
            .then((response)=>{
                console.log("512/成功寄送")
                console.log(response)
                this.dialogMessage = '成功寄送email通知給 '+member.name+"!";
                $('#modalCenter').modal('show');
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        viewMember(member){
            this.showViewModal=true
            this.chosedMember=member
            console.log("400/chosedMember:"+member.employee_id)
            this.chosedEvaluator=[]
            console.log("402/member.currentProjectId:"+this.currentProjectId)
            console.log("403/member.employee_id:"+this.chosedMember.employee_id)
            Api.evaluationList_getSecondStatus_be_evaluated({project_id: this.currentProjectId,evaluated_id:this.chosedMember.employee_id})
            .then((response)=>{
                console.log("405/獲得單一個員工的受評人list")
                console.log(response)
                this.chosedEvaluator=response.data
                console.log("409/"+this.chosedEvaluator.length)
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
    .checked-group{
        width: 80%;
        text-align:left;
    }
    .evaluator-group{
        width: 70%;
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