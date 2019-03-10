<template>
    <div>
        <div class="container">
            <nav class="navbar navbar-light bg-light">
                <form class="form-inline">
                    <a class="navbar-brand page-title breadcrumb-item" href="#/HistoricalProjects">專案列表</a>
                    <span class="navbar-brand page-title"> > </span>
                    <span v-if="pageStatus==0" class="navbar-brand page-title">檢視專案</span>
                    <span v-else class="navbar-brand page-title">編輯專案</span>
                </form>
            </nav>
            <div class="list-group">
                <div class="">
                    <li class="d-flex align-items-center">
                        <div class="col-md-8">
                            <input v-if="pageStatus==pageStatus_View" id="project-title" class="form-control mr-sm-2"  placeholder="輸入專案名稱" v-model="projectObj.name" disabled>
                            <input v-else id="project-title" class="form-control mr-sm-2" placeholder="輸入專案名稱" v-model="projectObj.name">
                            
                        </div>
                                    
                        <div v-if="pageStatus==0" class="col-md-4">
                            <span class="btn btn-primary  m-1" @click="switchToEdit()">
                                進行編輯
                            </span>
                        </div>
                        <div v-else class="col-md-4">
                            <span class="btn btn-primary  m-1" @click="saveAllChange()">
                                儲存所有修改
                            </span>
                        </div>
                    </li>
                </div>
                <!-- 階段活動 -->
                <ul class="list-group p-2">
                    <li class="d-flex align-items-center">
                        <div class="campaign-group">
                            <ul class="list-group">
                                <li class="list-group-item d-flex align-items-center" style="background-color:#F8F9FA">
                                    <span class="d-flex info-group fc-dark row">
                                        <div id="name" >
                                            <span class="p-2" style="font-weight: bolder">階段活動</span>
                                        </div>
                                    </span>
                                </li>
                                <li class="list-group-item d-flex align-items-center">
                                    <span class="d-flex info-group fc-dark row">
                                        <div id="name" class="col-md-4">                                               
                                            <span v-if="identifyStatus(projectObj.evaluation_date_start,projectObj.evaluation_date_end)==0" class="badge badge-pill badge-warning ">未開始</span>
                                            <span v-else-if="identifyStatus(projectObj.evaluation_date_start,projectObj.evaluation_date_end)==1" class="badge badge-pill badge-primary">進行中</span>
                                            <span v-else-if="identifyStatus(projectObj.evaluation_date_start,projectObj.evaluation_date_end)==2" class="badge badge-pill badge-secondary">已結束</span>
                                            <span class="p-2" style="font-weight:bolder">挑選評比人階段</span>
                                        </div>
                                        <div id="period" class="col-md-4">
                                            <span style="color:#98A0AB">Start：</span> 
                                            <input v-if="pageStatus==pageStatus_View" class="form-control" type="date" v-model="projectObj.evaluation_date_start" disabled>
                                            <input v-else class="form-control" type="date" v-model="projectObj.evaluation_date_start" >
                                        </div>
                                        <div id="period" class="col-md-4 col-md-offset-1">
                                            <span  style="color:#98A0AB">End：</span>
                                            <input v-if="pageStatus==pageStatus_View" class="form-control" type="date" v-model="projectObj.evaluation_date_end" disabled>
                                            <input v-else class="form-control" type="date" v-model="projectObj.evaluation_date_end" >
                                        </div>
                                    </span>
                                </li>
                                <li class="list-group-item d-flex align-items-center">
                                    <span class="d-flex info-group fc-dark row">
                                        <div id="name" class="col-md-4">
                                            <span v-if="identifyStatus(projectObj.project_date_start,projectObj.project_date_end)==0" class="badge badge-pill badge-warning ">未開始</span>
                                            <span v-else-if="identifyStatus(projectObj.project_date_start,projectObj.project_date_end)==1" class="badge badge-pill badge-primary">進行中</span>
                                            <span v-else-if="identifyStatus(projectObj.project_date_start,projectObj.project_date_end)==2" class="badge badge-pill badge-secondary">已結束</span>
                                            <span class="p-2" style="font-weight:bolder">員工互評階段</span>
                                        </div>
                                        <div id="period" class="col-md-4">
                                            <span style="color:#98A0AB">start：</span>
                                            <input v-if="pageStatus==pageStatus_View" class="form-control" type="date" v-model="projectObj.project_date_start" disabled> 
                                            <input v-else class="form-control" type="date" v-model="projectObj.project_date_start" > 
                                        </div>
                                        <div id="period" class="col-md-4 col-md-offset-1">
                                            <span style="color:#98A0AB">End：</span>
                                            <input v-if="pageStatus==pageStatus_View" class="form-control" type="date" v-model="projectObj.project_date_end" disabled>
                                            <input v-else class="form-control" type="date" v-model="projectObj.project_date_end">
                                        </div>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <!-- 增加評測題目 -->
                <ul v-if="pageStatus==pageStatus_Edit" class="list-group p-2">
                    <li class="d-flex align-items-center">
                        <div class="question-group">
                            <ul class="list-group">
                                <li class="list-group-item d-flex align-items-center" style="background-color:#F8F9FA">
                                    <span class="d-flex fc-dark row" style="font-weight:bolder">
                                        <div id="name" >
                                            <span class="p-2" style="font-weight: bolder">增加評測題目</span>
                                        </div>
                                    </span>   
                                </li>
                                <!-- 下拉選單欄位 -->
                                <li class="list-group-item d-flex align-items-center">
                                    <div class="p-2 info-group row d-flex">
                                        <!-- <label class="col-form-label">適用部門</label> -->
                                        <div class="col-md-4 m-2">
                                            部門
                                            <select class="modal-form-control form-control-sm " v-model="departmentSelected">
                                                <option v-for="dptmt in showDptmtOptions" :value="dptmt.department_id" >{{dptmt.dptmtName}}</option>
                                            </select>
                                        </div>
                                        <!-- <div class="col-md-2 col-sm-2 m-2">
                                            <label>題型</label>
                                            <select class="modal-form-control form-control-sm " v-model="typeSelected">
                                                <option v-for="departments in allQuestions" :value="departments" >{{departments.department}}</option>
                                            </select>
                                        </div> -->
                                        <div class="col-md-7 m-2">
                                            題目內容
                                            <select class="modal-form-control form-control-sm " v-model="questionSelected">
                                                <option v-for="question in filterByDptmt(allQuestions,departmentSelected)" :value="question._id" >
                                                    {{identifyType(question.type)}}|
                                                    <div id="discription" class="col-md-4">
                                                        <span class="h5">Q:</span>{{question.content}}|
                                                    </div>
                                                    <div id="option" class="col-md-3">
                                                        <span class="h5">A:</span>{{question.option}}
                                                    </div>    
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="btn-alignRight">
                                        <span class="btn btn-outline-primary btn-sm m-1" @click="toAddQuestion()">
                                            ＋增加 
                                        </span>
                                    </div>
                                    
                                </li>
                                
                            </ul>
                        </div>
                    </li>
                </ul>
                <!-- 已選擇題目 -->
                <ul class="list-group p-2">
                    <li class="d-flex align-items-center">
                        <div class="question-group">
                            
                            <li class="list-group-item d-flex align-items-center" style="background-color:#F8F9FA">
                                <span class="d-flex fc-dark row" style="font-weight:bolder">
                                    <div id="name" >
                                        <span class="p-2" style="font-weight: bolder">已選擇題目</span>
                                    </div>
                                </span>   
                            </li>
                            <span  class="card " >
                                <div v-for="department in showDptmtOptions">
                                    <span class="card-header d-flex justify-content-between align-items-center" @click="department.isShow=!department.isShow">
                                        <button id="department-title" class="btn" type="button">
                                            {{department.dptmtName}}
                                        </button>
                                        
                                        <button type="button" class="btn-sm btn-primary ">
                                            題數<span class="badge badge-light">{{(filterByDptmt(oldQuestions,department.department_id)).length}}</span>
                                        </button>
                                    </span>
                                    <li v-if="department.isShow" class="list-group-item list-group-item-action d-flex align-items-center border-top" v-for="question in filterByDptmt(oldQuestions,department.department_id)">
                                        <span class="d-flex info-group fc-dark row">
                                            <div class="col-md-3 p-2 " style="width: 80px;">
                                                <span class="badge badge-pill badge-primary">{{identifyAbility(question.ability_id)}}</span>
                                            </div>
                                            <div id="type" class="col-md-2">
                                                {{identifyType(question.type)}}
                                            </div>
                                            <div id="discription" class="col-md-4">
                                                <span class="h5">Q:</span>{{question.content}}
                                            </div>
                                            <div id="option" class="col-md-3">
                                                <span v-show="question.type==3">
                                                    <span class="h5">A:</span>{{question.option}}
                                                </span>
                                            </div>                 
                                        </span>
                                        <div v-if="pageStatus==pageStatus_Edit" class="btn-alignRight">
                                            <span class="btn btn-outline-secondary btn-sm m-1" @click="toDeleteQuestion(question)">刪除 X</span>
                                        </div>
                                    </li>
                                </div>
                            </span>
                            
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
    
<script>
import Api from "../../api";
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'ProjectEdit',
    created: function() {
        console.log("Edit")
        var projectId=this.$route.query.id;
        var pageStatus=this.$route.query.status;
        

        //從全域獲得當天日期
        var currentDate = this.$store.state.today
        console.log("209/currentdate:"+currentDate)

        var projectObj={};
        var dptmtList=[];
        var allQuestions=[];
        var oldQuestionsId=[];
        var oldQuestions=[];
        var abilityList=[];
        let Func = async()=>{
            try{
                //Api取出專案Object
                let response = await Api.project_get({_id:projectId})
                console.log("221/從Api取出專案Object");
                console.log(response);
                projectObj={
                    name:response.data.name,
                    _id:response.data._id,
                    topic_id:response.data.topic_id,
                    close:response.data.close,
                    evaluation_date_start:response.data.evaluation_date_start,
                    evaluation_date_end:response.data.evaluation_date_end,
                    project_date_start:response.data.project_date_start,
                    project_date_end:response.data.project_date_end,
                }
                // for(let i=0;i<response.topic_id.length;i++){
                //     projectObj.topic_id.push(response.topic_id[i]._id)
                // }
                oldQuestionsId=response.data.topic_id;
                console.log("232/oldQuestionsId"+response.data.topic_id.length);

                //獲得所有的部門
                response = await Api.department_getDepartments()
                console.log("237/取得所有部門");
                console.log(response);
                dptmtList.push({
                    department_id:null,
                    dptmtName:"全公司",
                    questions:[],
                    isShow:false});
                for(let i=0;i<response.data.length;i++){
                    dptmtList.push({
                        department_id:response.data[i]._id,
                        dptmtName:response.data[i].name,
                        questions:[],
                        isShow:false})
                };

                //取得所有題目
                response = await Api.topic_getAll()
                console.log("254/取得所有題目");
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
                //取得所有題目能力
                response = await Api.ability_getAll()
                console.log("275/取得所有能力項目");
                console.log(response);
                for(let i=0;i<response.data.length;i++){
                    abilityList.push({
                        _id:response.data[i]._id,
                        ability:response.data[i].ability
                    })
                }
            }catch(err){
                console.log(err)
            }
        }
        var oldQuestions=[];
        Func()
        .then(()=>{
            console.log("279/allQuestions.length:"+allQuestions.length);
            console.log("280/oldQuestionsId.length:"+oldQuestionsId.length);
            for(let i=0;i<oldQuestionsId.length;i++){
                for(let j=0;j<allQuestions.length;j++){
                    if(oldQuestionsId[i]==allQuestions[j]._id){
                        oldQuestions.push(allQuestions[j])
                    }
                }
            }
        })
        .then(()=>{
            console.log("291");
            this.pageStatus=pageStatus;
            this.today=currentDate;
            this.showDptmtOptions=dptmtList;
            this.allQuestions=allQuestions;
            this.projectObj=projectObj
            this.oldQuestions=oldQuestions;
            this.abilityList=abilityList;
            console.log("298");
        })
        .then(()=>{
            console.log("293/this.pageStatus"+this.pageStatus);
            console.log("294/this.today:"+this.today)
            console.log("295/this.showDptmtOptions:"+this.showDptmtOptions.length)
            console.log("296/this.allQuestions:"+this.allQuestions.length)
            console.log("297/this.projectObj.name:"+this.projectObj.name)
            console.log("298/this.oldQuestions:"+this.oldQuestions.length)
        })    

    },
    data () {
        return {
            //判斷頁面狀態的屬性
            pageStatus:'', //一開始的畫面是view狀態
            pageStatus_View:0, 
            pageStatus_Edit:1,
            
            //created賦值
            today:'',
            showDptmtOptions:[],
            projectObj:{},
            allQuestions:[],
            oldQuestions:[],
            abilityList:[],

            departmentSelected:'',
            questionSelected:'',
            showAddSucessModal:"false",
        }
    },
    methods:{
        identifyProgress(finish,total){
            let temp = (100*(finish/total))+"%";
            console.log("identifyProgress:"+temp);
            return temp;
        },
        filterByDptmt:function(array,id){
            console.log("333array:/"+array.length)
            let tempArray=[];
            console.log("335/"+this.oldQuestions)
            console.log("345/"+id)
            for(let i=0;i<array.length;i++){
                if(array[i].applicable_dep_id===id){
                    console.log("if/347題目/"+array[i].applicable_dep_id)
                    console.log("if/349題目/"+id)
                    tempArray.push(array[i])
                }
            }
            console.log("350/"+tempArray.length)
            return tempArray;
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
        identifyAbility(id){
            for(let i=0;i<this.abilityList.length;i++){
                if(id==this.abilityList[i]._id){
                    return this.abilityList[i].ability
                }
            }
        },
        showDatePattern(date){
            return date.year+'-'+date.month+'-'+date.day;
        },
        test(){
            return 1992+'-'+9+'-'+12;
        },
        identifyType(type){
            if(type==1){
                return "問答題";
            }else if(type==2){
                return "分數題";
            }else{
                return "選擇題";
            }
        },
        isBigScreen(){
            if(window.screen.width >=768){
                return true;
            }else{
                return false
            }
        },
        toAddQuestion(){
            console.log("questionSelected"+this.questionSelected)
            this.projectObj.topic_id.push(this.questionSelected)
            console.log("386/前this.oldQuestions.length"+this.oldQuestions.length)
            for(let j=0;j<this.allQuestions.length;j++){
                if(this.questionSelected==this.allQuestions[j]._id){
                    this.oldQuestions.push(this.allQuestions[j]);
                    console.log("390/後this.oldQuestions.length"+this.oldQuestions.length)
                    break;
                }
            }
            console.log("後this.oldQuestions.length"+this.oldQuestions.length)
        },
        toDeleteQuestion(question){
            console.log("question:"+question._id)
            let indexNum=this.projectObj.topic_id.indexOf(question._id);
            console.log("409/indexNum:"+indexNum)
            this.projectObj.topic_id.splice(indexNum,1);
            for(let j=0;j<this.oldQuestions.length;j++){
                if(question._id==this.oldQuestions[j]._id){
                    this.oldQuestions.splice(j,1)
                }
            }
        },
        switchToEdit(){
            this.pageStatus=1;
        },
        saveAllChange(){
            this.pageStatus=0;
            let topics="";
            for(let i=0;i<this.projectObj.topic_id.length;i++){
                if(topics!=""){
                    topics+=","
                }
                topics+=this.projectObj.topic_id[i];
            }
            console.log("414/topics:"+topics)
            Api.project_update({
                name:this.projectObj.name,
                _id:this.projectObj._id,
                topic_id:topics,
                close:this.projectObj.close,
                evaluation_date_start:this.projectObj.evaluation_date_start,
                evaluation_date_end:this.projectObj.evaluation_date_end,
                project_date_start:this.projectObj.project_date_start,
                project_date_end:this.projectObj.project_date_end,
            })
            .then((response)=>{
                console.log(response)
            })
            .catch((err)=>{
                console.log(err.response)
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
    .campaign-group{
        width: 100%
    }
    .question-group{
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
        width: 90%
    }
    .filter-group{
        width: 40%
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