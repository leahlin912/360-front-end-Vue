<template>
    <div>
        <div class="container">
            <span class="navbar">
                <form class="form-inline">
                    <div class="navbar-brand page-title" >系統參數設定</div>
                </form>
            </span>
            <div class="list-group">
                <span class="navbar">
                <form class="form-inline">
                    <div class="navbar-brand page-title">公司名稱: {{user.enterprise_id.full_name}}</div>
                </form>
                </span>
            </div>
            <div style="padding-left:15px; padding-top: 10px;">
                <span class="page-title">部門:</span>
                <button v-for="department in dptmtList" id="departmet" type="button" class="m-1 align-middle btn badge badge-pill badge-primary" style="height:35px;" @click="deleteDepartment(department)">
                    <span style="color:#F9FBFD;">{{department.dptmtName}}</span>
                    <span style="color:#F9FBFD">(編號: {{department.department_id}})</span>
                    <span > X</span>
                </button>   
            </div>
            <div class="input-group-append input" style="padding-left:5px">
                    <input type="text" class="form-control" style=" min-width: 200px" placeholder="請輸入要新增的部門名稱" v-model="newDepartmentName">
                    <span class="btn btn-outline-primary overflow-auto" style="height:39px; min-width: 100px; " @click="addDepartment()"> 新增部門 </span>
                </div>
                <span class="navbar">
                    <form class="form-inline">
                        <div class="navbar-brand page-title">PR值狀態調整</div>
                    </form>
                </span>
            <div class="btn-group">
                <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{checkPR(parameter)}}
                </button>
                <div class="dropdown-menu dropdown-menu-lg-left">
                    <button class="dropdown-item" type="button" v-on:click="checkStatus(1)">強制往前調成相同PR</button>
                    <button class="dropdown-item" type="button" v-on:click="checkStatus(2)">比較評比人數，再排名PR</button>
                </div>
            </div>
        </div>      
    </div>
</template>
    <script>
    import Api from "../../api";
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: 'System4_1',
        created() {
            this.user = this.$store.state.user;
            console.log(this.$store.state.user);
            console.log(this.user);
            Api.parameter_get()
            .then((response) => {
                // console.log('-----------')
                // console.log(response);
                // console.log('-----------')
                this.parameter = response.data[0];
                // console.log(this.parameter)
            }).catch((err) => {
                console.log(err.response);
            });

            var dptmtList=[];
            Api.department_getDepartments()
            .then((response) => {
                console.log(response);
                console.log("取得所有部門");
                for(let i=0;i<response.data.length;i++){
                    dptmtList.push({
                        department_id:response.data[i]._id,
                        dptmtName:response.data[i].name,
                        isShow:true})
                };
                this.dptmtList = dptmtList;
                console.log("test:"+dptmtList.length); 
            }).catch((err) => {
                console.log(err.response);
            });
        },
        data () { 
            return {
                statusContent: "",
                user: "",
                parameter: {},
                dptmtList: [],
                enterprise: {},
                newDepartmentName: ""
            }
        },
        methods:{
            checkPR(parameter){
                if(parameter.pr_same_score_decide == 1){
                    return "強制往前調成相同PR";
                }else if(parameter.pr_same_score_decide == 2){
                    return "比較評比人數，再排名PR";
                }
            },
            checkStatus: function(number){
                console.log(number)
                console.log(this.parameter._id)
                Api.parameter_setSatus({
                    _id: this.parameter._id,
                    pr_same_score_decide: number
                }).then((response) => {
                    this.parameter.pr_same_score_decide = response.data.pr_same_score_decide;
                    // 設置全域變數
                    // this.$store.dispatch('setProject',this.currentProject)
                    console.log(response)
                }).catch((err) => {
                    console.log(err)
                })
            },
            addDepartment(){
                let departmentNakme = this.newDepartmentName;

                //console.log(this.user.enterprise_id._id)

                Api.department_add({
                    enterprise_id: this.user.enterprise_id._id,
                    name: this.newDepartmentName
                }).then((response) => {
                    //console.log(response)

                    this.dptmtList.push({
                        department_id:response.data._id,
                        dptmtName:response.data.name,
                        isShow:true
                    })
                    //console.log(this.dptmtList)

                }).catch((err) => {
                    console.log(err)
                });
            },
            deleteDepartment(department){

                let department_id = department.department_id
                console.log(department_id);
                Api.department_delete({
                    _id: department_id
                }).then((response) =>{
                    let value = this.dptmtList.indexOf(department);
                    this.dptmtList.splice(value, 1);

                }).catch((err) => {
                    console.log(err);
                });
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
    .campaign-group{
        width: 100%;
    }
    .btn-group{
        width: 30%;
        left: 15px;
    }
    .input{
        width: 50%;
        margin-top: 25px;
        margin-left: 10px;
    }
</style>