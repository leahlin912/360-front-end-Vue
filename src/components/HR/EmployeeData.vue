<template>
    <div id="window">
        <loadingFunc id:loading></loadingFunc>
        <div class="container">
            <span class="navbar">
                <form class="form-inline">
                    <a class="navbar-brand page-title" href="#">員工資料管理</a>
                    <button id="btn-add" class="btn btn-outline-primary  my-2 my-sm-0" type="button" data-toggle="modal" v-on:click="clickAddMember()">+ add new member</button>
                </form>
                <form class="d-flex ">
                    <div class="input-group input-group-md  my-2 my-sm-0">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> 
                                <img src="../../assets/search.png" width="20">
                            </span>
                        </div>
                        <input type="text" class="form-control" placeholder="輸入員工姓名或編號" aria-label="Search" v-model="inputKeyword" v-on:keyup.enter="searchKeyword()">
                    </div>
                    <button id="btn-search" class="btn btn-outline-primary my-2 my-sm-0" type="button"  v-on:click="searchKeyword()" >Search</button>
                </form>
            </span>
            <!-- 所有員工資料列表(新的) -->
            <ul class="list-group p-2">
                <li class="d-flex align-items-center">
                    <div class="people-group">
                        <li class="list-group-item d-flex align-items-center" style="background-color:#F8F9FA">
                            <span class="d-flex fc-dark row" style="font-weight:bolder">
                                <div id="name" >
                                    <span class="p-2" style="font-weight: bolder">所有員工列表</span>
                                </div>
                            </span>   
                        </li>
                        <span  class="card " >
                            <div v-for="department in showDptmtOptions">
                                <span v-show="department.members.length>0"  class="card-header d-flex justify-content-between align-items-center" @click="department.isShow = !department.isShow">
                                    <button id="department-title" class="btn" type="button">
                                        {{department.dptmtName}}
                                    </button>
                                    <button type="button" class="btn-sm btn-primary ">
                                        人數<span class="badge badge-light">{{getTrueNum(filterByDptmt(department.department_id))}}</span>
                                    </button>
                                </span >
                                <span v-if="department.isShow" v-for="member in filterByDptmt(department.department_id)">
                                    <li v-if="(member.situation==='Y')" class="list-group-item list-group-item-action d-flex align-items-center border-top" >
                                        <div class="situation-group mr-2">
                                            <span class="badge badge-pill badge-primary">在職中</span>
                                        </div>
                                        <div class="d-flex info-group fc-dark row pl-3">
                                            <div id="name" class="col-md-2 form-inline"><span id="name-nobolder" class="d-block d-md-none">姓名：</span>{{member.name}}</div>
                                            <div id="serial-number" class="col-md-2 form-inline"><span class="d-block d-md-none">員編：</span>{{member.job_no}}</div>
                                            <div id="position" class="col-md-2 form-inline"><span class="d-block d-md-none">職稱：</span>{{member.job_title}}</div>
                                            <div id="email" class="col-md-3 form-inline"><span class="d-block d-md-none">信箱：</span>{{member.email}}</div>
                                            <div id="direct-boss" class="col-md-2 form-inline"><span class="d-block d-md-none">主管：</span>{{identifySupervisorName(member.supervisor_id)}}</div>
                                        </div>              
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
                                    </li>
                                </span>
                                <span v-if="department.isShow" v-for="member in filterByDptmt(department.department_id)">
                                    <li v-if="(member.situation==='N')" class="list-group-item list-group-item-action d-flex align-items-center border-top" >
                                        <div class="situation-group p-2">
                                            <span class="badge badge-pill badge-secondary">已離職</span>
                                        </div>
                                        <div class="d-flex info-group fc-dark row p-3 ">
                                            <div id="name" class="col-md-2">{{member.name}}</div>
                                            <div id="serial-number" class="col-md-2">{{member.job_no}}</div>
                                            <div id="position" class="col-md-2">{{member.job_title}}</div>
                                            <div id="email" class="col-md-3">{{member.email}}</div>
                                            <div id="direct-boss" class="col-md-2">{{member.supervisor_id}}</div>
                                        </div>              
                                        <div class="button-group ml-auto p-2" >
                                            <button class="btn btn-xs fs-10 btn-bold btn-edit2" @click="clickToEditMember(member)">
                                                <img src="../../assets/edit.png" width="20">
                                            </button>
                                            <button type="button" class="btn btn-xs fs-10 btn-bold btn-delete2" @click="clickToDeleteMember(member)">
                                                <img src="../../assets/delete.png" width="20">
                                            </button>
                                            <button class="btn btn-xs fs-10 btn-bold btn-view2"  @click="viewMember(member)">
                                                <img src="../../assets/view.png" width="20">
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
        <!-- 新增員工彈出視窗 -->
        <div v-if="showAddMemberModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Add New Member</h5>
                                    <label class="btn btn-outline-primary" style="text-align:right">
                                        <input style="display:none;" type="file" accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                                        +上傳多筆(.csv)
                                    </label>
                                </div>
                                <form>
                                    <div class="modal-body modal-open">
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label">姓名</label>
                                            <div class="col-sm-10">
                                                <div class="form-inline align-items-center">
                                                    <input type="text" class="modal-form-control-2 is-valid" placeholder="姓名" v-model="aNewMember.name" required/>
                                                    <!-- <a href="#" class="badge badge-pill badge-primary">在職中</a> -->
                                                    <button v-if="(aNewMember.situation==='Y')" class="badge badge-pill badge-primary" type="button" v-on:click="addChangeSituation()">在職中</button>
                                                    <button v-else class="badge badge-pill badge-secondary" type="button" v-on:click="addChangeSituation()">已離職</button>
                                                </div>
                                            </div>
                                            <label class="col-sm-2 col-form-label">編號</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="modal-form-control" placeholder="員工編號" v-model="aNewMember.job_no" required>
                                            </div>
                                            <label class="col-sm-2 col-form-label">信箱</label>
                                            <div class="col-sm-10">
                                                <input type="email" class="modal-form-control" placeholder="Email" v-model="aNewMember.email" required>
                                            </div>
                                            <label class="col-sm-2 col-form-label">部門</label>
                                            <div class="col-sm-10">
                                                <select class="modal-form-control form-control-sm" v-model="aNewMember.department_id" required>
                                                    <option v-for="dptmt in showDptmtOptions" :key="dptmt.dptmtName" :value="dptmt.department_id">{{dptmt.dptmtName}}</option>
                                                    <option :value="aNewMember.department_id" disabled selected hidden>choose department...</option>
                                                </select>
                                            </div>
                                            <label class="col-sm-2 col-form-label">職稱</label>
                                            <div class="col-sm-10">
                                                <div class="form-inline align-items-center">
                                                    <input type="text" class="modal-form-control-2" placeholder="職稱" v-model="aNewMember.job_title" required>
                                                    <div class="form-inline">
                                                        <input type="checkbox" class="form-check-input" v-model="aNewMember.position" :true-value=2 :false-value=1>
                                                        <label for="checkbox" >主管級{{aNewMember.position}}</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <label class="col-sm-2 col-form-label">主管</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="modal-form-control" placeholder="直屬主管的員工編號" v-model="aNewMember.supervisor_id">
                                            </div>
                                            <!-- <div>situation:{{aNewMember.situation}}</div>
                                            <div>name{{aNewMember.name}}</div>
                                            <div>job_no{{aNewMember.job_no}}</div>
                                            <div>email{{aNewMember.email}}</div><br>
                                            <div>job_title{{aNewMember.job_title}}</div>
                                            <div>position{{aNewMember.position}}</div>
                                            <div>supervisor_id{{aNewMember.supervisor_id}} </div>
                                            <div>department{{aNewMember.department_id}}</div> -->
                                        </div>  
                                    </div>
                                    <div class="modal-footer">
                                        </button>
                                        <button type="button" class="btn btn-secondary" @click="showAddMemberModal = false">Close</button>
                                        <button type="button" class="btn btn-primary" v-on:click="saveANewMember">Save</button>
                                    </div>
                                </form>
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
                                    <h5 class="modal-title">Edit Member</h5>
                                </div>
                                <div class="modal-body modal-open">
                                    <form>
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label" >姓名</label>
                                            <div class="col-sm-10">
                                                <form class="form-inline align-items-center">
                                                    <input type="text" class="modal-form-control-2" v-model="toEditChosedMember.name">
                                                    <form class="form-inline">
                                                        <button v-if="(toEditChosedMember.situation==='Y')" class="badge badge-pill badge-primary" type="button" v-on:click="editChangeSituation()">在職中</button>
                                                        <button v-else class="badge badge-pill badge-secondary" v-on:click="editChangeSituation()" type="button">已離職</button>
                                                    </form> 
                                                </form>
                                            </div>
                                            <label class="col-sm-2 col-form-label">編號</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="modal-form-control" placeholder="員工編號" v-model="toEditChosedMember.job_no">
                                            </div>
                                            <label class="col-sm-2 col-form-label">信箱</label>
                                            <div class="col-sm-10">
                                                <input type="email" class="modal-form-control" placeholder="Email" v-model="toEditChosedMember.email">
                                            </div>
                                            <label class="col-sm-2 col-form-label">部門</label>
                                            <div class="col-sm-10">
                                                <select class="modal-form-control form-control-sm" v-model="toEditChosedMember.department_id">
                                                    <option v-for="dptmt in showDptmtOptions" :key="dptmt.dptmtName" :value="dptmt.department_id">{{dptmt.dptmtName}}</option>
                                                    <option :value="toEditChosedMember.department_id" disabled selected hidden>{{toEditChosedMember.department_id}}</option>
                                                </select>
                                            </div>
                                            <label class="col-sm-2 col-form-label">職稱</label>
                                            <div class="col-sm-10">
                                                <form class="form-inline align-items-center">
                                                    <input type="text" class="modal-form-control-2" v-model="toEditChosedMember.job_title" placeholder="職稱">
                                                    <form class="form-inline">
                                                        <input type="checkbox" class="form-check-input" v-model="toEditChosedMember.position"  :true-value=2 :false-value=1>
                                                        <label for="checkbox" >主管級</label>
                                                    </form>
                                                </form>
                                            </div>
                                            <label class="col-sm-2 col-form-label">主管</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="modal-form-control"  placeholder="直屬主管的員工編號" v-model="toEditChosedMember.supervisor_jobno">
                                            </div>
                                        </div>  
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    </button>
                                    <button type="button" class="btn btn-secondary" @click="showEditModal = false">Close</button>
                                    <button type="button" class="btn btn-primary" @click="saveChosedMember()">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <!-- 檢視員工彈出視窗 -->
        <div v-if="showViewModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">View Member</h5>
                                </div>
                                <div class="modal-body modal-open">
                                    <form>
                                        <div class="form-group row">
                                            <label class="col-sm-2 " >姓名</label>
                                            <div class="col-sm-10">
                                                <form class="form-inline align-items-center">
                                                    {{chosedMember.name}}
                                                    <form class="form-inline">
                                                        <span v-if="(chosedMember.situation==='Y')" class="badge badge-pill badge-primary" >在職中</span>
                                                        <span v-else class="badge badge-pill badge-secondary">已離職</span>
                                                    </form>
                                                </form>
                                            </div>
                                            <label class="col-sm-2">編號</label>
                                            <div class="col-sm-10">
                                                {{chosedMember.job_no}}
                                            </div>
                                            <label class="col-sm-2">信箱</label>
                                            <div class="col-sm-10">
                                                {{chosedMember.email}}
                                            </div>
                                            <label class="col-sm-2">部門</label>
                                            <div class="col-sm-10">
                                                {{chosedMember.department_id}}
                                            </div>
                                            <label class="col-sm-2">職稱</label>
                                            <div class="col-sm-10">
                                                <form class="form-inline align-items-center">
                                                    {{chosedMember.job_title}}
                                                    <form class="form-inline">
                                                        <input type="checkbox" class="form-check-input"  v-model="chosedMember.position"  :true-value=2 :false-value=1 disabled>
                                                        <label >主管級</label>
                                                    </form>
                                                </form>
                                            </div>
                                            <label class="col-sm-2">主管</label>
                                            <div class="col-sm-10">
                                                {{chosedMember.supervisor_jobno}}({{chosedMember.supervisor_name}})
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
        <!-- 刪除員工彈出視窗 -->
        <div v-if="showDeleteModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Delete Member</h5>
                                </div>
                                <div class="modal-body modal-open">
                                    你確定要刪除<span id="name"> {{chosedMember.name}} </span>這筆員工資料？
                                </div>
                                <div class="modal-footer">
                                    </button>
                                    <button type="button" class="btn btn-secondary" @click="showDeleteModal = false">Cancel</button>
                                    <button type="button" class="btn btn-primary" @click="deleteMember()">delete</button>
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
import { mapGetters, mapActions } from 'vuex'
import loadingFunc from '../Loading';
export default {
    name: 'EmployeeData',
    components: {
        loadingFunc
    },
    created: function() {
        $('#loading').show();
        this.enterpriseId = this.$store.state.user.enterprise_id._id
        
        var dptmtList=[];
        //get from API
        Api.department_getDepartments()
            .then((response) => {
                console.log(response);
                for(let i=0;i<response.data.length;i++){
                    dptmtList.push({
                        department_id:response.data[i]._id,
                        dptmtName:response.data[i].name,
                        members:[],
                        isShow:false})
                };
                this.showDptmtOptions=dptmtList;
            }).catch((err) => {
                console.log(err.response);
            });

        //get from API
        var dataList=[];
        Api.employees_getAll()
            .then((response)=>{
                console.log(response);
                for(let i=0;i<response.data.length;i++){
                    dataList.push({
                        enterprise_id:response.data[i].enterprise_id,
                        department_id:response.data[i].department_id,
                        name:response.data[i].name,
                        job_no:response.data[i].job_no,
                        job_title:response.data[i].job_title,
                        email:response.data[i].email,
                        account:response.data[i].account,
                        password:response.data[i].password,
                        supervisor_id:response.data[i].supervisor_id,
                        situation:response.data[i].situation,
                        position:response.data[i].position,
                        _id:response.data[i]._id,
                    })
                }
                this.showDataList = dataList;
                this.allDataList = dataList;
                console.log("test:"+this.showDataList.length);
                $('#loading').hide();
            }).catch((err)=>{
                console.log(err.response);
            });
    },
    data(){
        return {
            // 頁面顯示資料(原則：部門[showDptmtOptions]&員工[showDataList]資料先分別存,filterByDptmt再自動配適)
            showDptmtOptions:[],
            showDataList:[],
            allDataList:[],
            //前端資料
            chosedMember:{enterprise_id:'',department_id:"",name:"",job_no:"",job_title:"",account:"",email:"",password:'',supervisor_id:"",situation:"",position:"",_id:""},
            toEditChosedMember:{}, 
            aNewMember:{enterprise_id:this.enterpriseId,department_id:'',name:'',job_no:'',job_title:'',account:"",email:"",password:'default',supervisor_id:'',situation:'',position:'',_id:''},
            inputKeyword:'',
            searchResult:[],
            // showSearchResult:false,
            // resultListIsShow:true,
            showAddMemberModal: false,
            showEditModal:false,
            showViewModal:false,
            showDeleteModal:false,
            searchedMemberList:[],
            
        }
    },
    methods:{
        filterByDptmt:function(id){
            return this.showDataList.filter(function(member){
                return member.department_id===id;
            })
        },
        getTrueNum(members){
            let count=0;
            for(let i=0;i<members.length;i++){
                if(members[i].situation==="Y"){
                    count++;
                }
            }
            return count;
        },
        searchKeyword(){
            let keyword = this.inputKeyword;
            console.log("422/keyword:"+keyword)
            console.log("423/this.allDataList:"+this.allDataList.length)
            if(keyword==''){
                this.showDataList = this.allDataList;
            }else{
                this.showDataList = this.allDataList.filter(function(member){
                    console.log("428/member.name:"+member.name)
                    return (member.name.includes(keyword)||member.job_no.includes(keyword));
                })
            }
        },
        identifySupervisorName(supervisorId){
            for(let i=0;i<this.allDataList.length;i++){
                if (this.allDataList[i]._id===supervisorId){
                    return this.allDataList[i].name;
                }
            }
        },
        identifySupervisorJobno(supervisorId){
            for(let i=0;i<this.allDataList.length;i++){
                if (this.allDataList[i]._id===supervisorId){
                    return this.allDataList[i].job_no;
                }
            }
        },
        clickAddMember(){
            this.showAddMemberModal = true;
            this.aNewMember.enterprise_id='';
            this.aNewMember.department_id='';
            this.aNewMember.name='';
            this.aNewMember.job_no='';
            this.aNewMember.job_title='';
            this.aNewMember.account='';
            this.aNewMember.email='';
            this.aNewMember.password='default';
            this.aNewMember.supervisor_id='';
            this.aNewMember.situation='Y';
            this.aNewMember.position='1';
            this.aNewMember._id="";
        },
        addChangeSituation(){
            if(this.aNewMember.situation==='Y'){
                this.aNewMember.situation='N';
            }else{
                this.aNewMember.situation='Y';
            }
        },
        editChangeSituation(){
            console.log("改之前:"+this.toEditChosedMember.situation)
            if(this.toEditChosedMember.situation==='Y'){
                this.toEditChosedMember.situation='N';
            }else{
                this.toEditChosedMember.situation='Y';
            }
            console.log("改之後:"+this.toEditChosedMember.situation)
        },
        //列表中按下編輯
        clickToEditMember(member){
            this.chosedMember = member;
            this.toEditChosedMember = {
                enterprise_id:member.enterprise_id,
                department_id:member.department_id,
                account:member.account,
                email:member.email,
                password:member.job_no,
                job_no:member.job_no,
                name:member.name,
                position:member.position,
                job_title:member.job_title,
                supervisor_id:member.supervisor_id,
                situation:member.situation,
                _id:member._id
            };
            this.toEditChosedMember.supervisor_name=this.identifySupervisorName(member.supervisor_id)
            console.log("500/"+this.toEditChosedMember.supervisor_name)
            this.toEditChosedMember.supervisor_jobno=this.identifySupervisorJobno(member.supervisor_id)
            console.log("500/"+this.toEditChosedMember.supervisor_jobno)
            this.showEditModal=true
        },
        saveChosedMember(){
            this.showEditModal=false;
            let member = this.toEditChosedMember;
            console.log("508/situation:"+member.situation);
            console.log("508/member.supervisor_id:"+member.supervisor_jobno);
            Api.employee_update({
                enterprise_id:member.enterprise_id,
                department_id:member.department_id,
                account:member.account,
                email:member.email,
                password:member.password,
                job_no:member.job_no,
                name:member.name,
                position:member.position,
                job_title:member.job_title,
                supervisor_id:member.supervisor_jobno,
                situation:member.situation,
                _id:member._id
            }).then((response)=>{
                console.log("之前this.chosedMember.department_id:"+this.chosedMember.department_id);
                console.log("之前this.chosedMember.name:"+this.chosedMember.name);
                console.log("之前this.chosedMember.situation:"+this.chosedMember.situation);
                console.log("之前this.chosedMember.password:"+this.chosedMember.password);
                console.log(response);
                //待修改為API回傳值資料
                this.chosedMember.enterprise_id=response.data.enterprise_id,
                this.chosedMember.department_id=response.data.department_id,
                this.chosedMember.account=response.data.account,
                this.chosedMember.email=response.data.email,
                this.chosedMember.password=response.data.password,
                this.chosedMember.job_no=response.data.job_no,
                this.chosedMember.name=response.data.name,
                this.chosedMember.position=response.data.position,
                this.chosedMember.job_title=response.data.job_title,
                this.chosedMember.supervisor_id=response.data.supervisor_id,
                this.chosedMember.situation=response.data.situation,
                this.chosedMember._id=response.data._id
                console.log("回傳後this.chosedMember.department_id:"+this.chosedMember.department_id);
                console.log("回傳後this.chosedMember.name:"+this.chosedMember.name);
                console.log("回傳後this.chosedMember.situation:"+this.chosedMember.situation);
            }).catch((err)=>{
                console.log(err);
            })
        },
        viewMember(member){
            this.showViewModal=true,
            this.chosedMember=member,
            this.chosedMember.supervisor_name=this.identifySupervisorName(member.supervisor_id)
            console.log("500/"+this.chosedMember.supervisor_name)
            this.chosedMember.supervisor_jobno=this.identifySupervisorJobno(member.supervisor_id)
            console.log("500/"+this.chosedMember.supervisor_jobno)
            console.log("viewMember"+ this.chosedMember.name);
        },
        clickToDeleteMember(member){
            this.showDeleteModal=true,
            this.chosedMember = member;
            console.log("clickToDeleteMember"+this.chosedMember.name);
        },
        deleteMember(){
            console.log("要刪除的member_id:"+this.chosedMember._id);
            this.showDeleteModal = false;
            Api.employee_delete({
                _id:this.chosedMember._id
            }).then((response) => {
                console.log(response);
                let indexNum=this.showDataList.indexOf(this.chosedMember);
                console.log("indexNum:"+indexNum);
                this.showDataList.splice(indexNum,1);
                console.log("刪除資料成功:");
            }).catch((err) => {
                console.log(err);
            });
        },
        reEditMember(){
            this.showViewModal=false,
            this.clickToEditMember(this.chosedMember)
            console.log("reEditMember"+this.chosedMember)
        },
        
        saveANewMember(){
            this.showAddMemberModal=false;
            let member=this.aNewMember;
            // 呼叫API(丟一個member給server,server回傳一個member object)
            console.log("562/Api之前")
            console.log("enterprise_id:"+this.enterpriseId)
            console.log("department_id:"+member.department_id)
            console.log("account:"+member.job_no)
            console.log("email:"+member.email)
            console.log("password:"+member.password)
            console.log("job_no:"+member.job_no)
            console.log("name:"+member.name)
            console.log("position:"+member.position)
            console.log("job_title:"+member.job_title)
            console.log("supervisor_id:"+member.supervisor_id)
            console.log("situation:"+member.situation)
            // console.log("member._id:"+member._id)
            Api.employee_add({
                enterprise_id:this.enterpriseId,
                department_id:member.department_id,
                account:member.job_no,
                email:member.email,
                password:member.password,
                job_no:member.job_no,
                name:member.name,
                position:member.position,
                job_title:member.job_title,
                supervisor_id:member.supervisor_id,
                situation:member.situation,
                purview:""
                // _id:member._id
            }).then((response) => {
                console.log("652/API回傳值:");
                console.log("653/前:"+this.showDataList.length);
                console.log(response);
                // 假設API回傳responseNewMember
                //人資部："5c36ae12ab713d3d144a3d81"
                let responseNewMember = {
                    enterprise_id:response.data.enterprise_id._id,
                    department_id:response.data.department_id._id,
                    account:response.data.account,
                    email:response.data.email,
                    password:response.data.password,
                    job_no:response.data.job_no,
                    name:response.data.name,
                    position:response.data.position,
                    job_title:response.data.job_title,
                    supervisor_id:response.data.supervisor_id,
                    situation:response.data.situation,
                    _id:response.data._id,
                    purview:response.data.purview
                };
                //再存回前端showDataList[]
                this.showDataList.push(responseNewMember);
                console.log("671/後:"+this.showDataList.length);
                console.log("responseNewMember存回前端");
                // let responseNewMember = response;
            }).catch((err) => {
                console.log(err);
            });
        },
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    body{
        background:#F9FBFD; 
    }
    #window {
        z-index: -1;
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
    .situation-group{
        width: 10%;
        vertical-align:top;
        text-align: center;
    }
    .info-group{
        -ms-flex-align: center;
        align-items: center;
        justify-content: space-between;
        display: -webkit-box;
        width: 70%;
        padding: left 30;
        
    }
    .button-group{
        text-align:center;
        width: 20%;
    }
    .people-group{
        width: 100%
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
    #name{
        font-size: 15px;
        text-align: left;
        font-weight: bolder;
    }
    #name-nobolder{
        font-weight:initial;
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