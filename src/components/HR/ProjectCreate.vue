<template>
    <div>
        <div class="container">
            <nav class="navbar navbar-light bg-light">
                <form class="form-inline">
                    <a class="navbar-brand page-title breadcrumb-item" href="#/HistoricalProjects">專案列表</a>
                    <span class="navbar-brand page-title"> > </span>
                    <span class="navbar-brand page-title">新增專案</span>
                </form>
            </nav> 
            <div class="list-group">
                <div class="">
                    <li class="d-flex align-items-center">
                        <div class="col-md-8">
                            <input id="project-title" class="form-control mr-sm-2" placeholder="輸入專案名稱" v-model="aNewProject.name">
                        </div>
                                    
                        <div class="col-md-4">
                            <span class="btn btn-outline-primary  m-1" @click="saveANewProject()">
                                Save All
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
                                            <span v-if="identifyStatus(aNewProject.evaluation_date_start,aNewProject.evaluation_date_end)==0" class="badge badge-pill badge-warning ">未開始</span>
                                            <span v-else-if="identifyStatus(aNewProject.evaluation_date_start,aNewProject.evaluation_date_end)==1" class="badge badge-pill badge-primary">進行中</span>
                                            <span v-else-if="identifyStatus(aNewProject.evaluation_date_start,aNewProject.evaluation_date_end)==2" class="badge badge-pill badge-secondary">已結束</span>
                                            <span class="p-2" style="font-weight:bolder">挑選評比人階段</span>
                                        </div>
                                        <div id="period" class="col-md-4">
                                            <span style="color:#98A0AB">Start：</span> 
                                            <input class="form-control" type="date" v-model="aNewProject.evaluation_date_start" >
                                        </div>
                                        <div id="period" class="col-md-4 col-md-offset-1">
                                            <span style="color:#98A0AB">End：</span>
                                            <input class="form-control" type="date" v-model="aNewProject.evaluation_date_end" >
                                        </div>
                                    </span>
                                </li>
                                <li class="list-group-item d-flex align-items-center">
                                    <span class="d-flex info-group fc-dark row">
                                        <div id="name" class="col-md-4">
                                            <span v-if="identifyStatus(aNewProject.project_date_start,aNewProject.project_date_end)==0" class="badge badge-pill badge-warning ">未開始</span>
                                            <span v-else-if="identifyStatus(aNewProject.project_date_start,aNewProject.project_date_end)==1" class="badge badge-pill badge-primary">進行中</span>
                                            <span v-else-if="identifyStatus(aNewProject.project_date_start,aNewProject.project_date_end)==2" class="badge badge-pill badge-secondary">已結束</span>
                                            <span class="p-2" style="font-weight:bolder">員工互評階段</span>
                                        </div>
                                        <div id="period" class="col-md-4">
                                            <span style="color:#98A0AB">start：</span>
                                            <input class="form-control" type="date" v-model="aNewProject.project_date_start" > 
                                        </div>
                                        <div id="period" class="col-md-4 col-md-offset-1">
                                            <span style="color:#98A0AB">End：</span>
                                            <input class="form-control" type="date" v-model="aNewProject.project_date_end" >
                                        </div>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <!-- 增加評測題目 -->
                <ul class="list-group p-2">
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
                                            題數<span class="badge badge-light">{{(filterByDptmt(aNewProjectPickedQuestion,department.department_id)).length}}</span>
                                        </button>
                                    </span>
                                    <li v-if="department.isShow" class="list-group-item list-group-item-action d-flex align-items-center border-top" v-for="question in filterByDptmt(aNewProjectPickedQuestion,department.department_id)">
                                        <span class="d-flex info-group fc-dark row">
                                            <div class="col-md-3 p-2 " style="width: 80px;">
                                                <span class="badge badge-pill badge-primary" >{{identifyAbility(question.ability_id)}}</span>
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
                                        <div class="btn-alignRight">
                                            <span class="btn btn-outline-secondary btn-sm m-1" @click="toDeleteQuestion(question._id)">刪除 X</span>
                                        </div>
                                        <!-- <button type="button" class="btn-sm btn-outline-secondary ">
                                            刪除 X
                                        </button> -->
                                    </li>
                                </div>
                            </span>
                            
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="showAddSucessModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Success</h5>
                                </div>
                                <div class="modal-body modal-open">
                                    新專案{{successProjectName}}已經成功被建立，若要設定為進行中專案，請到現行專案管理頁面設定!
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="closeModal()">OK</button>
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
import Api from "../../api"
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'ProjectCreate',
    created: function() {
        //獲得當天日期
        let currentDate = this.$store.state.today
        console.log("217"+this.$store.state.today)
        console.log("218/currentdate:"+currentDate)
        this.today=currentDate;
        console.log("219/this.today:"+this.today)
        this.aNewProject.evaluation_date_start=currentDate
        this.aNewProject.evaluation_date_end=currentDate
        this.aNewProject.project_date_start=currentDate
        this.aNewProject.project_date_end=currentDate
        console.log("224/this.aNewProject.evaluation_date_start:"+ this.aNewProject.evaluation_date_start)

        var dptmtList=[];
        var questionList=[];
        var currentQuestions=[];
        var abilityList=[];
        let Func = async()=>{
            try{
                //取得所有部門
                let response = await Api.department_getDepartments()
                console.log("231/取得所有部門");
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
                console.log("242/dptmtList:"+dptmtList.length)

                //取出所有問題
                response = await Api.topic_getAll()
                console.log("252/取得所有題目");
                console.log(response);
                for(let i=0;i<response.data.length;i++){
                    questionList.push({
                        applicable_dep_id:response.data[i].applicable_dep_id,
                        _id:response.data[i]._id,
                        content:response.data[i].content,
                        option:response.data[i].option,
                        type:response.data[i].type,
                        ability_id:response.data[i].ability_id,
                        // valid:response.data[i].valid,
                    })
                }
                console.log("259/questionList:"+questionList.length)

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

                //賦值
                this.today = currentDate;
                console.log("263/this.today"+this.today)
                this.showDptmtOptions=dptmtList;
                console.log("265/this.showDptmtOptions"+this.showDptmtOptions.length)
                this.allQuestions = questionList;
                console.log("367/this.allQuestions"+this.allQuestions.length)
                this.abilityList=abilityList;
            }catch(err){
                console.log(err);
            }
        }
        Func();
    },
    data () {
        return {
            today:'',
            showDptmtOptions:[],
            allQuestions:[],
            abilityList:[],
            
            tempQuestion:{
                applicable_dep_id:'',
                _id:'',
                content:'',
                option:[],
                type:'',
                ability_id:'',
                // valid:'',
            },
            departmentSelected:'',
            questionSelected:'',
            
            aNewProject:{
                name:"",
                _id:"",
                topic_id: [],
                close:"N",
                evaluation_date_start:'',
                evaluation_date_end:'',
                project_date_start:'',
                project_date_end:'',
            },
            aNewProjectPickedQuestion:[],
            showAddSucessModal:false,
            successProjectName:'',
            
        }
    },
    methods:{
        filterByDptmt:function(array,id){
            return array.filter(function(question){
                return question.applicable_dep_id===id;
            })
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
        toAddQuestion(){
            console.log("questionSelected"+this.questionSelected)
            console.log("前this.aNewProject.topic_id.length"+this.aNewProject.topic_id.length)
            this.aNewProject.topic_id.push(this.questionSelected)
            console.log("後this.aNewProject.topic_id.length"+this.aNewProject.topic_id.length)
            console.log("前this.aNewProjectPickedQuestion.length"+this.aNewProjectPickedQuestion.length)
            for(let j=0;j<this.allQuestions.length;j++){
                if(this.questionSelected==this.allQuestions[j]._id){
                    this.aNewProjectPickedQuestion.push(this.allQuestions[j]);
                    break;
                }
            }
            console.log("後this.aNewProjectPickedQuestion.length"+this.aNewProjectPickedQuestion.length)
        },
        toDeleteQuestion(id){
            console.log("id:"+id)
            let indexNum=this.aNewProject.topic_id.indexOf(id);
            console.log("indexNum:"+indexNum)
            this.aNewProject.topic_id.splice(indexNum,1);
            for(let j=0;j<this.aNewProjectPickedQuestion.length;j++){
                if(id==this.aNewProjectPickedQuestion[j]._id){
                    this.aNewProjectPickedQuestion.splice(j,1)
                }
            }
        },
        showAddSucess(name){
            this.successProjectName=name;
            this.showAddSucessModal=true;
        }
        ,
        closeModal(){
            this.showAddSucessModal=false;
            this.$router.push({path:'/HistoricalProjects'});
        },
        saveANewProject(){
            var topics="";
            for(let i=0;i<this.aNewProject.topic_id.length;i++){
                if(topics!=""){
                    topics+=",";
                }
                topics+=this.aNewProject.topic_id[i];
            }
            console.log("382/topics"+topics)
            console.log("383/name"+this.aNewProject.name)
            Api.project_add({
                name:this.aNewProject.name,
                _id:this.aNewProject._id,
                topic_id:topics,
                close:this.aNewProject.close,
                evaluation_date_start:this.aNewProject.evaluation_date_start,
                evaluation_date_end:this.aNewProject.evaluation_date_end,
                project_date_start:this.aNewProject.project_date_start,
                project_date_end:this.aNewProject.project_date_end,
            }).then((response)=>{
                console.log("成功")
                console.log(response)
                // this.aNewProject={
                //     name:response.data.name,
                //     _id:response.data._id,
                //     topic_id:response.data.topic_id,
                //     close:response.data.close,
                //     evaluation_date_start:response.data.evaluation_date_start,
                //     evaluation_date_end:response.data.evaluation_date_end,
                //     project_date_start:response.data.project_date_start,
                //     project_date_end:response.data.project_date_end,
                // }
                this.showAddSucess(response.data.name);
            }).catch((err)=>{
                console.log(err)
            })
        },
         // identifyProgress(finish,total){
        //     let temp = (100*(finish/total))+"%";
        //     console.log("identifyProgress:"+temp);
        //     return temp;
        // },
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