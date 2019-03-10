<template>
    <div>
        <div class="container">
            <span class="navbar">
                <form class="form-inline">
                    <a class="navbar-brand page-title" href="#">員工權限設定</a>
                    <!-- <button id="btn-add" class="btn btn-outline-primary  my-2 my-sm-0" type="button" data-toggle="modal" v-on:click="clickAddMember()">+ add new member</button> -->
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
            <!-- 所有員工資料列表 -->
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
                                    <li class="list-group-item list-group-item-action d-flex align-items-center border-top" >
                                        <div class="situation-group mr-2">
                                            <span  v-if="(member.situation==='Y')" class="badge badge-pill badge-primary">在職中</span>
                                            <span  v-else class="badge badge-pill badge-secondary">已離職</span>
                                        </div>
                                        <div class="d-flex info-group fc-dark row pl-3">
                                            <div id="name" class="col-md-2 form-inline"><span id="name-nobolder" class="d-block d-md-none">姓名：</span>{{member.name}}</div>
                                            <div id="serial-number" class="col-md-2 form-inline"><span class="d-block d-md-none">員編：</span>{{member.job_no}}</div>
                                            <div id="position" class="col-md-2 form-inline"><span class="d-block d-md-none">職稱：</span>{{member.job_title}}</div>
                                            <div id="email" class="col-md-6 form-inline"><span class="d-block d-md-none">權限：</span>
                                                <!-- <select class="modal-form-control form-control-sm" v-model="member.purview">
                                                    <option v-for="group in authorityList" :key="group.title" :value="group._id" >{{group.title}}</option>
                                                    <option :value="member.purview" disabled selected hidden>{{identifyPurview(member.purview)}}</option>
                                                </select> -->
                                                <select  class="modal-form-control form-control-sm" v-model="member.purview" @change="updatePurview(member)">
                                                    <option v-for="purview in purviewList" :key="purview.description" :value="purview">{{purview.description}}</option>
                                                    <option v-if="member.purview!=null" :value="member.purview" disabled selected hidden>{{member.purview.description}}</option>
                                                </select>
                                            </div>
                                        </div>              
                                        
                                    </li>
                                </span>
                            </div>
                        </span>
                        
                    </div>
                </li>
            </ul>
        </div>
        
    </div>
</template>
    
<script>
import Api from "../../api";
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'SystemPage4_3',
    created: function() {
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
                console.log("131/拿到所有員工");
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
                        purview:response.data[i].purview,
                    })
                }
                this.showDataList = dataList;
                this.allDataList = dataList;
                console.log("test:"+this.showDataList.length);
            }).catch((err)=>{
                console.log(err.response);
            });
        var purviewLisr=[];
        Api.purview_getAll()
        .then((response)=>{
            console.log("159/拿到所有的purview")
            console.log(response)
            this.purviewList=response.data
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    data(){
        return {
            // 頁面顯示資料(原則：部門[showDptmtOptions]&員工[showDataList]資料先分別存,filterByDptmt再自動配適)
            showDptmtOptions:[],
            showDataList:[],
            allDataList:[],
            purviewList:[],
            //前端資料
            inputKeyword:'',
            
            
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
        updatePurview(user){
            console.log("183/:userId:"+user._id)
            console.log("184/:purview:"+user.purview.description)
            console.log("185/:purviewId:"+user.purview._id)
            Api.purview_setPurview({_id:user._id,purview:user.purview._id})
            .then((response)=>{
                console.log("187/:更新成功，拿到member")
                console.log(response)
            })
            .catch((err)=>{
                console.log("err:"+err)
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
        align-items: center;
        justify-content: space-between;
        display: -webkit-box;
        width: 90%;
        padding: left 30;
        
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