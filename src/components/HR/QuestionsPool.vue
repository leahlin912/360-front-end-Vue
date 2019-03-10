<template>
    <div>
        <loadingFunc id:loading></loadingFunc>
        <div class="container">
            <span class="navbar">
                <form class="form-inline">
                    <a class="navbar-brand page-title" href="#">題庫管理</a>
                    <button id="btn-add" class="btn btn-outline-primary  my-2 my-sm-0" type="button" data-toggle="modal" v-on:click="clickAddQuestion()">+ add new question</button>
                </form>
                <form class="d-flex ">
                    <div class="input-group input-group-md  my-2 my-sm-0">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> 
                                <img src="../../assets/search.png" width="20">
                            </span>
                        </div>
                        <input type="text" class="form-control" placeholder="請輸入題目內容" aria-label="Search" v-model="inputKeyword" v-on:keyup.enter="searchKeyword()">
                    </div>
                    <button id="btn-search" class="btn btn-outline-primary my-2 my-sm-0" type="button" v-on:click="searchKeyword()">Search</button>
                </form>
            </span>
            <div class="list-group">
                <ul class="list-group p-2">
                    <li class="d-flex align-items-center">
                        <div class="campaign-group">
                            <ul class="list-group">
                                <li class="list-group-item d-flex align-items-center">
                                    <span class="d-flex ability-group fc-dark row">
                                        <div id="name" >
                                            <span class="p-2 col-md-2" style="font-weight: bolder">受評能力管理：</span>
                                        </div>
                                        <button v-for="ability in abilityList" id="ability" type="button" class="m-1 align-middle btn badge badge-pill badge-primary" style="height:25px;" @click="deleteAbility(ability)">
                                            <span style="color:#F9FBFD"> {{ability.ability}}</span>
                                            <span style="color:#F9FBFD" > X</span>
                                        </button>
                                        <div class="p-2 ability-group row d-flex  m-2">
                                            <div class="input-group mb-3">
                                                <input type="text" class="form-control" placeholder="請為標籤命名" v-model="aNewAbilityName">
                                                <!-- <select class="form-control" v-model="pickedProject">
                                                    <option v-for="project in projectList" :key="project.name" :value="project">project.name}}</option>
                                                    </option :value="pickedProject" disabled>currentProject.name}}</option>
                                                </select> -->
                                                <div class="input-group-append">
                                                    <span class="btn btn-outline-primary" @click="addAbility()"> +新增能力標籤 </span>
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
            <!-- 所有問題資料列表新的 -->
            <ul class="list-group p-2">
                <li class="d-flex align-items-center">
                    <div class="question-group">
                        
                        <li class="list-group-item d-flex align-items-center" style="background-color:#F8F9FA">
                            <span class="d-flex fc-dark row" style="font-weight:bolder">
                                <div id="name" >
                                    <span class="p-2" style="font-weight: bolder">所有題目列表</span>
                                </div>
                            </span>   
                        </li>
                        <span  class="card " >
                            <div v-for="department in showDptmtOptions">
                                <span class="card-header d-flex justify-content-between align-items-center" @click="department.isShow = !department.isShow">
                                    <button id="department-title" class="btn" type="button">
                                        {{department.dptmtName}}
                                    </button>
                                    
                                    <button type="button" class="btn-sm btn-primary ">
                                        題數<span class="badge badge-light">{{(filterByDptmt(showDataList,department.department_id)).length}}</span>
                                    </button>
                                </span>
                                <li v-if="department.isShow" class="list-group-item list-group-item-action d-flex align-items-center border-top" v-for="question in filterByDptmt(showDataList,department.department_id)">
                                    <span class="d-flex info-group fc-dark row">
                                        <div class="col-md-3 p-2" style="width: 80px;">
                                            <span  class="badge badge-pill badge-primary" >{{identifyAbility(question.ability_id)}}</span>
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
                                    <div class="button-group p-2" >
                                        <button  type="button"  class="btn btn-xs fs-10 btn-bold btn-edit1" @click="clickToEditQuestion(question)">
                                            <img src="../../assets/edit.png" width="20">
                                        </button>
                                        <button type="button" class="btn btn-xs fs-10 btn-bold btn-delete1" @click="clickkToDeleteMember(question)">
                                            <img src="../../assets/delete.png" width="20">
                                        </button>
                                        <button type="button" class="btn btn-xs fs-10 btn-bold btn-view1"   @click="viewQuestion(question)">
                                            <img src="../../assets/view.png" width="20">
                                        </button>
                                    </div>
                                    <!-- <div v-if="pageStatus==pageStatus_Edit" class="btn-alignRight">
                                        <span class="btn btn-outline-secondary btn-sm m-1" @click="toDeleteQuestion(question)">刪除 X</span>
                                    </div> -->
                                </li>
                            </div>
                        </span>
                        
                    </div>
                </li>
            </ul>
        </div>
        <!-- 新增問題彈出視窗 -->
        <div v-if="showAddQuestionModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Create A New Question</h5>
                                </div>
                                <div class="modal-body modal-open">
                                    <form>
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label">受評能力</label>
                                            <div class="col-sm-8">
                                                <select class="modal-form-control form-control-sm" v-model="aNewQuestion.ability_id" >
                                                    <option v-for="ability in abilityList" :key="ability.ability" :value="ability._id">{{ability.ability}}</option>
                                                    <option :value="aNewQuestion.ability_id" disabled selected hidden>choose ability...</option>
                                                </select>
                                            </div>
                                            <label class="col-sm-3 col-form-label">適用部門</label>
                                            <div class="col-sm-8">
                                                <select class="modal-form-control form-control-sm" v-model="aNewQuestion.applicable_dep_id" >
                                                    <option v-for="dptmt in showDptmtOptions" :key="dptmt.dptmtName" :value="dptmt.department_id">{{dptmt.dptmtName}}</option>
                                                    <option :value="aNewQuestion.applicable_dep_id" disabled selected hidden>choose department...</option>
                                                </select>
                                            </div>
                                            <label class="col-sm-3 col-form-label">題型</label>
                                            <div class="col-sm-8">
                                                <select class="modal-form-control form-control-sm" v-model="aNewQuestion.type">
                                                    <option v-for="type in questionTypes" :key="type.title" :value="type.serial" >{{type.title}}</option>
                                                    <option :value="aNewQuestion.type" disabled selected hidden>choose type...</option>
                                                </select>
                                            </div>
                                            <label class="col-sm-3 col-form-label">問題描述</label>
                                            <div class="col-sm-8">
                                                <textarea class="form-control"rows="3" placeholder="問題描述" v-model="aNewQuestion.content"></textarea>
                                            </div>
                                            <label v-if="aNewQuestion.type===3" class="col-sm-3 col-form-label">選項描述</label>
                                            <div v-if="aNewQuestion.type===3" class="mt-1 col-sm-8">
                                                <span v-for="option in aNewQuestion.option" class="btn btn-outline-secondary btn-sm m-1" v-model="aNewQuestion.option">{{option}} 
                                                    <span class="badge badge-light align-items-center text-align"  style="color:#6E757C" @click="newRemoveOption(option)">x</span>
                                                </span>
                                                <div class="input-group"> 
                                                    <input type="text" class="form-control" placeholder="選項" v-model="aNewAddOption">
                                                    <div class="input-group-append">
                                                        <button id="btn-add-option" class="btn btn-outline-primary btn-sm" type="button" v-on:click="newAddOption()">+ 新增選項</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>  
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="showAddQuestionModal = false">Close</button>
                                    <button type="button" class="btn btn-primary" @click="saveANewQuestion()">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <!-- 編輯問題彈出視窗 -->
        <div v-if="showEditModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Edit Question</h5>
                                </div>
                                <div class="modal-body modal-open">
                                    <form>
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label">適用部門</label>
                                            <div class="col-sm-8">  
                                                <select class="modal-form-control form-control-sm" v-model="toEditChosedQuestion.applicable_dep_id">
                                                    <option v-for="dptmt in showDptmtOptions" :key="dptmt.dptmtName" :value="dptmt.department_id">{{dptmt.dptmtName}}</option>
                                                    <option :value="toEditChosedQuestion.applicable_dep_id" disabled selected hidden>{{toEditChosedQuestion.applicable_dep_id}}</option>
                                                </select>
                                            </div>
                                            <label class="col-sm-3 col-form-label">受評能力</label>
                                            <div class="col-sm-8">
                                                <select class="modal-form-control form-control-sm" v-model="toEditChosedQuestion.ability_id" >
                                                    <option v-for="ability in abilityList" :key="ability.ability" :value="ability._id">{{ability.ability}}</option>
                                                    <option :value="toEditChosedQuestion.ability_id" disabled selected hidden>choose ability...</option>
                                                </select>
                                            </div>
                                            <label class="col-sm-3 col-form-label">題型</label>
                                            <div class="col-sm-8">
                                                <select class="modal-form-control form-control-sm" v-model="toEditChosedQuestion.type">
                                                    <option v-for="type in questionTypes" :key="type.title" :value="type.serial" >{{type.title}}</option>
                                                    <option :value="toEditChosedQuestion.type" disabled selected hidden>{{identifyType(toEditChosedQuestion.type)}}</option>
                                                </select>
                                            </div>
                                            <label class="col-sm-3 col-form-label">問題描述</label>
                                            <div class="col-sm-8">   
                                                <textarea class="form-control"rows="3" v-model="toEditChosedQuestion.content"></textarea>
                                            </div>
                                            <label v-if="toEditChosedQuestion.type===3" class="col-sm-3 col-form-label">選項描述</label>
                                            <div v-if="toEditChosedQuestion.type===3" class="mt-1 col-sm-8">
                                                <span v-for="option in tempOption" class="btn btn-outline-secondary btn-sm m-1" v-model="tempOption">{{option}} 
                                                    <span class="badge badge-light align-items-center text-align" style="color:#6E757C" @click="editRemoveOption(option)">x</span>
                                                </span>
                                                <div class="input-group"> 
                                                    <input type="text" class="form-control" placeholder="選項" v-model="anEditAddOption">
                                                    <div class="input-group-append">
                                                        <button id="btn-add-option" class="btn btn-outline-primary btn-sm" type="button" v-on:click="editAddOption()">+ 新增選項</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>  
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="showEditModal = false">Close</button>
                                    <button type="button" class="btn btn-primary" @click="saveChosedQuestion()">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <!-- 檢視問題彈出視窗 -->
        <div v-if="showViewModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">View Question</h5>
                                </div>
                                <div class="modal-body modal-open">
                                    <form>
                                        <div class="form-group row">
                                            <label class="col-sm-3">適用部門</label>
                                            <div class="col-sm-8">  
                                                {{identifyDptmt(chosedQuestion.applicable_dep_id)}}
                                            </div>
                                            <label class="col-sm-3">受評能力</label>
                                            <div class="col-sm-8">
                                                <form class="form-inline align-items-center">
                                                    {{identifyAbility(chosedQuestion.ability_id)}}
                                                </form>
                                            </div>
                                            <label class="col-sm-3">題型</label>
                                            <div class="col-sm-8">
                                                {{identifyType(chosedQuestion.type)}}
                                            </div>
                                            <label class="col-sm-3">問題描述</label>
                                            <div class="col-sm-8">   
                                                <p class="">{{chosedQuestion.content}}</p>
                                            </div>
                                            <label v-if="chosedQuestion.type===3" class="col-sm-3">選項描述</label>
                                            <div v-if="chosedQuestion.type===3" class="col-sm-8">
                                                <span v-for="option in chosedQuestion.option" class="text-outline" type="text">{{option}} 
                                                    <!-- <span class="badge badge-light align-items-center text-align" style="color:#6E757C" >x</span> -->
                                                </span>
                                            </div>
                                        </div>  
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="showViewModal = false">Close</button>
                                    <button type="button" class="btn btn-primary" @click="reEditQuestion()">Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <!-- 刪除問題彈出視窗 -->
        <div v-if="showDeleteModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Delete Question</h5>
                                </div>
                                <div class="modal-body modal-open">
                                    你確定要刪除這道題目？
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="showDeleteModal = false">Cancel</button>
                                    <button type="button" class="btn btn-primary" @click="deleteQuestion()">delete</button>
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
import loadingFunc from '../Loading';
export default {
    name: 'QuestionsPool',
    components: {
        loadingFunc
    },
    created:function(){
        $('#loading').show();
        var dptmtList=[];
        Api.department_getDepartments()
            .then((response) => {
                console.log(response);
                console.log("取得所有部門");
                dptmtList.push({
                    department_id:null,
                    dptmtName:"全公司",
                    questions:[],
                    isShow:true});
                for(let i=0;i<response.data.length;i++){
                    dptmtList.push({
                        department_id:response.data[i]._id,
                        dptmtName:response.data[i].name,
                        questions:[],
                        isShow:true})
                };
                this.showDptmtOptions=dptmtList;
                console.log("test1:"+dptmtList.length);
                console.log("test:"+this.showDptmtOptions.length);
            }).catch((err) => {
                console.log(err.response);
            });
        
        var dataList=[];
        Api.topic_getAll()
            .then((response)=>{
                console.log("取得所有題目");
                console.log(response);
                for(let i=0;i<response.data.length;i++){
                    dataList.push({
                        applicable_dep_id:response.data[i].applicable_dep_id,
                        _id:response.data[i]._id,
                        content:response.data[i].content,
                        option:response.data[i].option,
                        type:response.data[i].type,
                        ability_id:response.data[i].ability_id,
                        valid:response.data[i].valid,
                    })
                }
                this.showDataList = dataList;
                this.allQuestionList = dataList;
            }).catch((err)=>{
                console.log(err.response);
            });
        
        var abilityList=[]
        Api.ability_getAll()
        .then((response)=>{
            console.log("359/取得所有能力項目");
                console.log(response);
                for(let i=0;i<response.data.length;i++){
                    abilityList.push({
                        _id:response.data[i]._id,
                        ability:response.data[i].ability
                    })
                }
                $('#loading').hide();
                this.abilityList=abilityList;
        }).catch((err)=>{
            console.log(err);
        })
            
    },
    data () {
        return {
            showDptmtOptions:[],
            showDataList:[],
            allQuestionList:[],
            abilityList:[],
            inputKeyword:'',
            isShow:false,
            showAddQuestionModal: false,
            showEditModal:false,
            showViewModal:false,
            showDeleteModal:false,
            departmentIdArraylist:[],
            chosedQuestion:{applicable_dep_id:'',_id:'',content:'',option:'',type:'',ability_id:'',valid:''},
            questionTypes:[{title:"問答題",serial:1},{title:"分數題",serial:2},{title:"選擇題",serial:3}],
            toEditChosedQuestion:{applicable_dep_id:'',_id:'',content:'',option:[],type:'',ability_id:'',valid:"Y"},
            tempOption:[],
            aNewQuestion:{applicable_dep_id:'',_id:'',content:'',option:[],type:'',ability_id:'',valid:"Y"},
            aNewAddOption:'',
            anEditAddOption:'',
            aNewAbilityName:'',
            toDeleteChosedAbility:'',
        }
    },
    methods:{
        filterByDptmt:function(array,id){
            return array.filter(function(question){
                return question.applicable_dep_id===id;
            })
            
        },
        identifyAbility(id){
            for(let i=0;i<this.abilityList.length;i++){
                if(id==this.abilityList[i]._id){
                    return this.abilityList[i].ability
                }
            }
        },
        identifyDptmt(dptmtId){
            for(let i=0;i<this.showDptmtOptions.length;i++){
                if(dptmtId==this.showDptmtOptions[i].department_id){
                    return this.showDptmtOptions[i].dptmtName
                }
            }
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
        searchKeyword(){
            let keyword = this.inputKeyword;
            console.log("441/keyword:"+keyword)
            if(keyword==''){
                this.showDataList = this.allQuestionList;
            }else{
                this.showDataList = this.allQuestionList.filter(function(question){
                    console.log("428/question.content:"+question.content)
                    return (question.content.includes(keyword));
                })
            }
        },
        // 按下新增按鈕，打開彈出視窗
        clickAddQuestion(){
            this.showAddQuestionModal=true;
            this.aNewQuestion.applicable_dep_id='',
            this.aNewQuestion._id='',
            this.aNewQuestion.content='',
            this.aNewQuestion.option=[],
            this.aNewQuestion.type='',
            this.aNewQuestion.ability_id='',
            this.aNewQuestion.valid="Y"
        },
        newAddOption(){
            this.aNewQuestion.option.push(this.aNewAddOption);
            this.aNewAddOption='';
        },
        newRemoveOption(option){
            console.log("刪除:"+option);
            this.aNewQuestion.option.splice(this.aNewQuestion.option.indexOf(option),1);
        },

        // 在彈出視窗中，save呼叫API傳送到DB
        saveANewQuestion(){
            this.showAddQuestionModal=false;
            let question=this.aNewQuestion;
            let option="";
            for(let i=0;i<question.option.length;i++){
                if(option!=""){
                    option+=","
                }
                option+=question.option[i];
            }
            console.log("475/ability_id:"+question.ability_id)
            console.log("485前/applicable_dep_id:"+question.applicable_dep_id)
            Api.topic_add({
                applicable_dep_id:question.applicable_dep_id,
                _id:question._id,
                content:question.content,
                option:option,
                type:question.type,
                ability_id:question.ability_id,
                valid:question.valid
            }).then((response)=>{
                console.log(response);
                console.log("465/新增之前:"+this.showDataList.length)
                let responseNewQuestion={
                    applicable_dep_id:response.data.applicable_dep_id,
                    _id:response.data._id,
                    content:response.data.content,
                    option:response.data.option,
                    type:response.data.type,
                    ability_id:response.data.ability_id,
                    valid:response.data.valid
                }
                this.showDataList.push(responseNewQuestion);
                console.log("465/新增之後:"+this.showDataList.length)
            }).catch((err)=>{
                console.log(err);
            })
        },
        //列表中按下編輯
        clickToEditQuestion(question){
            this.chosedQuestion = question;/////
            this.tempOption=[];
            for(let i=0;i<question.option.length;i++){
                this.tempOption.push(question.option[i]);
            }
            console.log("415:"+this.tempOption);
            this.toEditChosedQuestion={
                applicable_dep_id:question.applicable_dep_id,
                _id:question._id,
                content:question.content,
                option:this.tempOption, 
                type:question.type,
                ability_id:question.ability_id,
                valid:question.valid
            };
            this.showEditModal=true;
        },
        saveChosedQuestion(){
            this.showEditModal=false;
            let question = this.toEditChosedQuestion;
            console.log("傳給API的question.applicable_dep_id:"+question.applicable_dep_id);
            console.log("傳給API的question.content:"+question.content);
            console.log("傳給API的question.option:"+question.option);
            let option="";
            for(let i=0;i<question.option.length;i++){
                if(option!=""){
                    option+=","
                }
                option+=question.option[i];
            }
            Api.topic_update({
                applicable_dep_id:question.applicable_dep_id,
                _id:question._id,
                content:question.content,
                option:option,
                type:question.type,
                ability_id:question.ability_id,
                valid:question.valid
            }).then((response)=>{
                console.log(response)
                this.chosedQuestion.applicable_dep_id=response.data.applicable_dep_id;
                this.chosedQuestion._id=response.data._id;
                this.chosedQuestion.content=response.data.content;
                this.chosedQuestion.option=response.data.option;
                this.chosedQuestion.type=response.data.type;
                this.chosedQuestion.ability_id=response.data.ability_id;
                this.chosedQuestion.valid=response.data.valid;
                console.log("回傳後this.chosedQuestion.applicable_dep_id:"+this.chosedQuestion.applicable_dep_id);
                console.log("回傳後this.chosedQuestion.content:"+this.chosedQuestion.content);
                console.log("回傳後this.chosedQuestion.option:"+this.chosedQuestion.option);
            }).catch((err)=>{
                console.log(err)
            })
        },
        editAddOption(){
            this.tempOption.push(this.anEditAddOption);
            this.anEditAddOption='';
        },
        editRemoveOption(option){
            console.log("刪除:"+option);
            this.tempOption.splice(this.tempOption.indexOf(option),1);
            console.log("選項:"+this.tempOption);
        },
        viewQuestion(question){
            this.showViewModal=true,
            this.chosedQuestion=question,
            console.log(this.chosedQuestion.content);
        },
        reEditQuestion(){
            this.showViewModal=false,
            this.clickToEditQuestion(this.chosedQuestion)
        },
        clickkToDeleteMember(Question){
            this.showDeleteModal=true,
            this.chosedQuestion=Question,
            console.log("checkToDeleteQuestion"+this.chosedQuestion.content);
        },
        deleteQuestion(){
            console.log("deleteQuestion:"+this.chosedQuestion.content);
            this.showDeleteModal = false;
            Api.topic_delete({
                _id:this.chosedQuestion._id,
            }).then((response) => {
                console.log(response);
                let indexNum=this.showDataList.indexOf(this.chosedQuestion);
                this.showDataList.splice(indexNum,1);
                console.log("刪除資料成功:");
            }).catch((err) => {
                console.log(err);
            });
        },
        addAbility(){
            let abilityName = this.aNewAbilityName
            console.log("564/abilityName:"+abilityName)
            Api.ability_add({ability:abilityName})
            .then((response)=>{
                console.log(response);
                console.log("新增成功");
                this.abilityList.push({
                    ability:response.data.ability,
                    _id:response.data._id
                })
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        deleteAbility(abilityObj){
            let ability=abilityObj
            console.log("575/ability:"+ability.ability)
            console.log("575/ability:"+ability._id)
            Api.ability_delete({_id:ability._id})
            .then((response)=>{
                console.log(response)
                let indexNum =this.abilityList.indexOf(abilityObj);
                this.abilityList.splice(indexNum,1);
            })
            .catch((err)=>{
                console.log(err)
            })
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
    #ability-title{
        font-weight:bold;
        font-size: 20px;
        color:#307BF6;
    }
    .campaign-group{
        width: 100%
    }
    .question-group{
        width: 100%
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
    .text-outline{
        margin: 2px;
        padding-left: 3px;
        padding-right: 3px;
        border: solid #99A0AA thin; 
        border-radius:5px;
        text-align:center;
        color: #99A0AA ;
    }
    .align-items-center {
        -ms-flex-align: center;
        align-items:center;
        justify-content: space-between;
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
    .info-group{
        /* -ms-flex-align:center; */
        /* align-items:center;  */
        /* justify-content: space-between; 
        display: -webkit-box; */
        /* width: 85%; */
        -ms-flex-align: center;
        align-items: center;
        justify-content: space-between;
        align-items: center;
        justify-content: space-between;
        display: -webkit-box;
        width: 80%
    }
    .button-group{
        text-align:center;
        width: 20%;
    }
    .ability-group{
        width: 100%;
    }
    .small-group{
        /* -ms-flex-align:center; */
        align-items:center; 
        justify-content:first baseline;
        word-break: break-all;
    }
    #ability{
        font-size: 15px;
        text-align: center;
        
    }
    #department-title{
        font-weight:bold;
        font-size: 18px;
        color:#307BF6;
    }
    #department{
        font-size: 15px;
        text-align: center;
        word-break: break-all;
        color:#307BF6;
    }  
    #type{
        font-size: 15px;
        text-align: left;
        font-weight: bolder;
    }
    #discription{
        font-size: 15px;
        text-align: left;
    }
    #option{
        font-size: 15px;
        text-align: left;
        color: #98A0AB;
    }
    #function{
        font-size: 15px;
        text-align: left;
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
    .form-control{
        font-size: 14px;
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