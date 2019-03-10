<template>
    <div>
        <div class="container">
            <span class="navbar">
                <form class="form-inline">
                    <a class="navbar-brand page-title" href="#">公告欄管理</a>
                    <button id="btn-add" class="btn btn-outline-primary  my-2 my-sm-0" type="button" data-toggle="modal" v-on:click="clickAddNotice()">+ add a new notice</button>
                </form>
            </span>
            <!-- 所有公告資料列表 -->
            <ul class="list-group p-2">
                <li class="list-group-item d-flex align-items-center" style="background-color:#F8F9FA">
                    <span class="d-flex fc-dark row" style="font-weight:bolder">
                        <div id="name" >
                            <span class="p-2" style="font-weight: bolder">公告列表</span>
                        </div>
                    </span>   
                </li>
                <li v-if="showDataList.length==0" class="list-group-item d-flex align-items-center">
                    <div class="card-body -flex row">
                        <div class=" col-lg-1">
                            <img src="../../assets/danger.png" width="30">
                        </div>
                        <div class="m-1  col-lg-9">
                            <h5 style="color:#307BF6">提醒！</h5>
                            <p>目前沒有公告事項，請建立一公告事項.</p>
                        </div>
                    </div>
                </li>
                <li v-else v-for="notice in showDataList" class="list-group-item list-group-item-action d-flex align-items-center border-top" >
                    
                    <div class="d-flex info-group fc-dark row pl-3">
                        
                        <div id="name" class="col-md-2 form-inline"><span class="d-block d-md-none" style="font-weight:initial; color:#98A0AB">標題：</span>{{notice.title}}</div>
                        <div id="serial-number" class="col-md-5 form-inline"><span class="d-block d-md-none" style="color:#98A0AB">內容：</span>{{notice.content}}</div>
                        <div id="period" class="col-md-5">
                            <span v-if="identifyStatus(notice.date_start,notice.date_end)==0" class="badge badge-pill badge-warning ">未公告</span>
                            <span v-else-if="identifyStatus(notice.date_start,notice.date_end)==1" class="badge badge-pill badge-primary">公告中</span>
                            <span v-else-if="identifyStatus(notice.date_start,notice.date_end)==2" class="badge badge-pill badge-secondary">已結束</span>
                            <div>
                                <span style="color:#98A0AB">Period：</span>
                                <span > {{notice.date_start.split("T")[0]}}</span>
                                <span> ～ {{notice.date_end.split("T")[0]}}</span>
                            </div>
                        </div>
                    </div>              
                    <div class="button-group ml-auto p-2 " >
                        <button class="btn btn-xs fs-10 btn-bold btn-edit1" @click="clickToEditNotice(notice,notice._id)">
                            <img src="../../assets/edit.png" width="20">
                        </button>
                        <button type="button" class="btn btn-xs fs-10 btn-bold btn-delete1"  @click="clickToDeleteNotice(notice,notice._id)">
                            <img src="../../assets/delete.png" width="20">
                        </button>
                    </div>
                </li>
            </ul>
        </div>
        <div v-if="showAddModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Create A New Notice</h5>
                                </div>
                                <div class="modal-body modal-open">
                                    <form>
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label">標題</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="modal-form-control" placeholder="公告標題" v-model="aNewNotice.title" required>
                                            </div>
                                            <label class="col-sm-2 col-form-label">內容</label>
                                            <div class="col-sm-10">
                                                <textarea class="form-control"rows="3" placeholder="公告內容" v-model="aNewNotice.content"></textarea>
                                            </div>
                                            <label class="col-sm-2 col-form-label">日期</label>
                                            <div class="col-sm-10">
                                                <div id="period" class="col-md-12">
                                                    <span style="color:#98A0AB">start：</span>
                                                    <input class="form-control" type="date" v-model="aNewNotice.date_start" > 
                                                </div>
                                                <div id="period" class="col-md-12">
                                                    <span style="color:#98A0AB">End：</span>
                                                    <input class="form-control" type="date" v-model="aNewNotice.date_end" >
                                                </div>
                                            </div>
                                        </div>  
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="showAddModal = false">Close</button>
                                    <button type="button" class="btn btn-primary" @click="saveANewNotice()">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <div v-if="showEditModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Edit the Notice</h5>
                                </div>
                                <div class="modal-body modal-open">
                                    <form>
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label">標題</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="modal-form-control" placeholder="公告標題" v-model="toEditChosedNotice.title" required>
                                            </div>
                                            <label class="col-sm-2 col-form-label">內容</label>
                                            <div class="col-sm-10">
                                                <textarea class="form-control"rows="3" placeholder="公告內容" v-model="toEditChosedNotice.content"></textarea>
                                            </div>
                                            <label class="col-sm-2 col-form-label">日期</label>
                                            <div class="col-sm-10">
                                                <div id="period" class="col-md-12">
                                                    <span style="color:#98A0AB">start：</span>
                                                    <input class="form-control" type="date" v-model="toEditChosedNotice.date_start" > 
                                                </div>
                                                <div id="period" class="col-md-12">
                                                    <span style="color:#98A0AB">End：</span>
                                                    <input class="form-control" type="date" v-model="toEditChosedNotice.date_end" >
                                                </div>
                                            </div>
                                        </div>  
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="showEditModal = false">Close</button>
                                    <button type="button" class="btn btn-primary" @click="saveChosedNotice()">Save</button>
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
                                        <h5 class="modal-title">Delete Notice</h5>
                                    </div>
                                    <div class="modal-body modal-open">
                                        請再次確認是否刪除「{{chosedNotice.title}} 」此公告事項?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" @click="showDeleteModal=false">Cancel</button>
                                        <button type="button" class="btn btn-primary" @click="deleteNotice()">delete</button>
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
export default {
    name: 'SystemPage4_4',
    created: function() {
        let today=this.$store.state.today
        this.aNewNotice.date_start=today
        this.aNewNotice.date_end=today
        this.today=today
        console.log("190/this.today:"+this.today)
        
        let showDataList=[];
        let Func = async () => {
            try{    
                let response = await Api.bulletinboard_get()
                console.log("66/取得所有公告欄")
                console.log(response)
                showDataList=response.data
            }catch(err){
                console.log(err)
            }
        }
        Func().then(()=>{
            this.showDataList=showDataList;

            
        });
        
    },
    data(){
        return {
            today:'',
            showDataList:[],
            showAddModal:false,
            showEditModal:false,
            showDeleteModal:false,
            aNewNotice:{title:'',content:'',date_start:'',date_end:''},
            chosedNotice:{},
            toEditChosedNotice:{}
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
        clickAddNotice(){
            this.showAddModal=true;
        },
        saveANewNotice(){
            console.log()
            Api.bulletinboard_add({
                title:this.aNewNotice.title,
                content:this.aNewNotice.content,
                date_start:this.aNewNotice.date_start,
                date_end:this.aNewNotice.date_end
            })
            .then((response)=>{
                console.log("162/新增公告項目成功")
                console.log(response)
                this.showDataList.push({
                    _id:response.data.billboard._id,
                    title:response.data.billboard.title,
                    content:response.data.billboard.content,
                    date_start:response.data.billboard.date_start,
                    date_end:response.data.billboard.date_end
                })
                this.showAddModal=false;
            })
            .catch((err)=>{
                console(err)
            })
        },
        clickToEditNotice(notice){
            let tempNotice = notice
            this.toEditChosedNotice = {
                _id:tempNotice._id,
                title:tempNotice.title,
                content:tempNotice.content,
                date_start:tempNotice.date_start.split("T")[0],
                date_end:tempNotice.date_end.split("T")[0]
            }
            this.showEditModal = true
        },
        saveChosedNotice(){
            console.log("236/準備儲存編輯")
            let tempNotice = this.toEditChosedNotice
            console.log("billboard_id:"+tempNotice._id)
            console.log("title:"+tempNotice.title)
            console.log("content:"+tempNotice.content)
            console.log("date_start:"+tempNotice.date_start)
            console.log("date_end:"+tempNotice.date_end)
            Api.bulletinboard_update({
                billboard_id:this.toEditChosedNotice._id,
                title:this.toEditChosedNotice.title,
                content:this.toEditChosedNotice.content,
                date_start:this.toEditChosedNotice.date_start,
                date_end:this.toEditChosedNotice.date_end
            })
            .then((response=>{
                console.log("246/成功更新一個公告欄項目(02/05功能待測試確認正常與否)")
                console.log(response)
                console.log("277/_id:"+response.data._id)
                for(let i=0;i<this.showDataList.length;i++){
                    if(this.showDataList[i]._id==response.data.billboard._id){
                        this.showDataList[i]={
                            _id:response.data.billboard._id,
                            title:response.data.billboard.title,
                            content:response.data.billboard.content,
                            date_start:response.data.billboard.date_start,
                            date_end:response.data.billboard.date_end
                        }
                        console.log("this.showDataList.[i]._id"+this.showDataList[i].billboard_id)
                    }
                }
                this.showEditModal = false
            }))
            .catch((err)=>{
                console.log(err)
            })
        },
        clickToDeleteNotice(notice,_id){
            console.log("296/id:"+_id)
            this.chosedNotice = notice
            console.log("290/notice._id"+notice._id)
            this.showDeleteModal = true
        },
        deleteNotice(){
            console.log("294/刪除公告項目")
            console.log("billboard_id:"+this.chosedNotice._id)
            console.log("title:"+this.chosedNotice.title)

            Api.bulletinboard_delete({
                billboard_id:this.chosedNotice._id
            })
            .then((response)=>{
                console.log(response)
                for(let i=0;i<this.showDataList.length;i++){
                    if(this.chosedNotice._id==this.showDataList[i]._id){
                        this.showDataList.splice(i,1)
                    }
                }
                this.showDeleteModal = false
                console.log("300/成功刪除(02/05功能待測試確認正常與否)")
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
    button-group{
        text-align:center;
        width: 10%;
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