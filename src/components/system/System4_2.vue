<template>
    <div>
        <div class="container">
            <span class="navbar">
                <form class="form-inline">
                    <div class="navbar-brand page-title" >權限群組設定</div> 
                </form>
            </span>
            <div class="list-group">
            </div>
        </div>
        <!-- 顯示所有的權限 -->
        <div class="container">
            <span>
                <li v-if="purviews != []" v-for="purview in purviews" style="list-style-type:none; min-height:50px; margin-left: 15px; margin-top: 15px; font-weight:bold;">{{purview.description}}:<br>
                    <button v-for="system_code_ids in purview.system_code_id" id="departmet" type="button" class="m-1 align-middle btn badge badge-pill badge-primary" style="height:35px;">
                        <span style="color:#F9FBFD;">{{system_code_ids.description}}</span>
                        <span style="color:#F9FBFD">({{system_code_ids.system_code}})</span>
                    </button>  
                    <button class="btn btn-danger" style="list-style-type:none; height:30px; margin-left: 15px; font-weight:bold; line-height: 5px;" @click="deletePurview(purview)">刪除</button>
                    <br><br>
                </li> 
            </span>
        </div>
        <!-- 創建新的權限 -->
        <HR style="border:1 dashed #987cb9; margin-top:40px" width="80%" color=#987cb9 SIZE=1></HR>
        <div class="container">
            <span class="navbar">
                <form class="form-inline">
                    <div class="navbar-brand page-title">新增權限群組</div> 
                </form>
            </span>  
        </div>
        <div class="container">    
            <div>
                <input type="text" style="padding-top:5px; margin-bottom:10px" placeholder="請輸入要新增的權限名稱" v-model="PurviewName">
                <button v-for="system_code in system_codes" id="drag-source" type="button" class="button" style="height:35px; margin-top: 10px; margin-left: 10px; line-height: 10px;" @click="checkSystem_code(system_code)">{{system_code.description}}{{system_code.system_code}}</button>
            </div> 
            <div id="target-container" class="box" style="padding-top: 15px;">
                <button v-for="addSystem_code in addSystem_codes" id="drag-source" type="button" class="button" style="height:35px; margin-left: 10px; line-height: 10px;" @click="checkAddSystem_code(addSystem_code)">{{addSystem_code.description}}{{addSystem_code.system_code}}</button>
            </div>
            <span class="btn btn-outline-primary" style="height:39px; width: 150px; margin-top: 25px; margin-bottom:5px" @click="addPurview()"> +新增群組 </span>
        </div>    
    </div>
</template>
<script>
    import Api from "../../api";
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: 'System4_2',
        created:function(){
            Api.purview_getAll().then((response) => {
                console.log(response);
                
                for(let i = 0 ; i < response.data.length; i++){
                    let system_code_id = []
                    for(let j = 0 ; j < response.data[i].system_code_id.length; j++){
                        system_code_id.push({description: response.data[i].system_code_id[j].description,
                                            system_code: response.data[i].system_code_id[j].system_code})
                    };
                    this.purviews.push({
                        description: response.data[i].description,
                        system_code_id: system_code_id,
                        _id: response.data[i]._id
                    });
                };
                console.log("--------------------------");
                console.log(this.purviews);
                console.log("--------------------------");
            }).catch((err) => {
                console.log(err);
            });

            Api.system_code_getAll().then((response) => {
                console.log(response);
                for(let i = 0 ; i < response.data.length; i++){
                    this.system_codes.push({
                        description: response.data[i].description,
                        system_code: response.data[i].system_code,
                        _id: response.data[i]._id
                    });
                }
                console.log(this.system_codes);
            }).catch((err) => {
                console.log(err);
            })
        },
        data () { 
            return {
                purviews: [],
                system_codes: [],
                addSystem_codes: [],
                PurviewName: ""
            };
        },
        methods:{
            deletePurview(purview){
                console.log(purview)
                let purview_id = purview._id;
                Api.purview_delete({_id: purview_id}).then((response) => {
                    console.log(response)

                    let value = this.purviews.indexOf(response);
                    this.purviews.splice(value, 1);
                }).catch((err) => {
                    console.log(err)
                })
            },
            checkSystem_code(system_code){

                let value = this.system_codes.indexOf(system_code);

                this.addSystem_codes.push({
                    description: this.system_codes[value].description,
                    system_code: this.system_codes[value].system_code,
                    _id: this.system_codes[value]._id
                })

                this.system_codes.splice(value, 1);
            },
            checkAddSystem_code(addSystem_code){
                console.log(addSystem_code);

                let value = this.addSystem_codes.indexOf(addSystem_code);

                this.system_codes.push({
                        description: this.addSystem_codes[value].description,
                        system_code: this.addSystem_codes[value].system_code,
                        _id: this.addSystem_codes[value]._id
                })

                this.addSystem_codes.splice(value, 1);
            },
            addPurview(){
                if(this.PurviewName == ""|| this.addSystem_codes == ""){
                    console.log("input box is empty");
                    return;
                }
                //console.log(this.PurviewName);
                //console.log(this.addSystem_codes._id);

                let idString = "";

                for(let i = 0 ; i < this.addSystem_codes.length; i++){
                    idString += this.addSystem_codes[i]._id +","
                }
                console.log(idString);

                Api.purview_add({
                    description: this.PurviewName,
                    system_code_id: idString.substring(0, idString.length-1)
                }).then((response) => {
                    console.log(response);

                    let newSystem_code_id = []
                    for(let j = 0 ; j < response.data.system_code_id.length; j++){
                        newSystem_code_id.push({description: response.data.system_code_id[j].description,
                                            system_code: response.data.system_code_id[j].system_code})
                    };
                    this.purviews.push({
                        description: response.data.description,
                        system_code_id: newSystem_code_id,
                        _id: response.data._id
                    });
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    };
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
    .button{
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }
    .box{
        width:100%;
        min-height:70px;
        padding:5px;
        border:1px #ccc dashed;
        float:left;
        margin: auto;
        margin-top: 20px;
    }
    /* .campaign-group{
        width: 100%
    } */
</style>