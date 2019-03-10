<template>
    <div id="watchAnswer" class="container ml-6">   
        <loadingFunc id:loading></loadingFunc>
        <div class="row">
            <div class="col-12">
                <span class="navbar navbar-light bg-light indexLevel1">
                <form class="form-inline">
                    <a class="navbar-brand page-title">評量內容紀錄</a>            
                </form>
                </span>
            </div>
        </div>

        <div v-if="show">
        <div class="row"><div class="col ml-3 mt-2"><p style="font-weight: bold; font-size: 18px"> 專案名稱：{{project.name}} </p></div></div>
        <div class="row"><div class="col ml-3 mb-2"><p style="font-weight: bold; font-size: 18px"> 評量對象：{{watchTarget.name}} </p></div></div>
        
        <div class="card shadow bg-light mb-5 ml-3 mt-1" style="width: 100%">
            <div class="card-header"><h5><span class="badge badge-pill bg-primary shadow-sm ml-1" style="color:#FFFFFF">題目</span></h5>
                <div class="cardHeadText ml-3">匿名與否</div></div>
            <div class="card-body">
                <h5><span class="badge badge-pill bg-warning shadow-sm ml-1" style="color:#132948">答案</span></h5>
                <p v-if="anonymous" class="card-text ml-3">匿名</p>
                <p v-if="anonymous == false" class="card-text ml-3">不匿名</p>
            </div>
        </div>


        <h2 class="ml-3 mb-5"><span class="badge shadow-lg" style="background-color:#132948; color:#FFFFFF">公司整體題目</span></h2>    
        <div v-for="(item, index) in answersFiltered[0]" v-bind:key="index + 'A'">
        <div class="card shadow bg-light mb-5 ml-3"  style="width: 100%">
            <div class="card-header">
                <!-- <span class="badge badge-pill" style="background-color:#A6C4F7">題目</span> -->
                <h5><span class="badge badge-pill bg-primary shadow-sm ml-1" style="color:#FFFFFF">題目{{index + 1}}</span></h5>
                <div class="cardHeadText ml-3">{{item.topic_id.content}}</div></div>
            <div class="card-body">
                <h5><span class="badge badge-pill bg-warning shadow-sm ml-1" style="color:#132948">答案</span></h5>
                <p v-if="item.topic_id.type === 1 || item.topic_id.type === 3" class="card-text ml-3">{{item.topic_res}}</p>
                <p v-if="item.topic_id.type === 2" class="card-text ml-3">{{item.topic_score}}</p>            
            </div>
        </div>
        </div>
        
        <h2 v-if="this.answersFiltered[1].length !== 0" class="ml-3 mt-5 mb-5">
            <span class="badge shadow-lg" style="background-color: #132948; color:#FFFFFF">部門題目</span></h2>
        <div v-for="(item, index2) in answersFiltered[1]" v-bind:key="index2 + 'B'">
        <div class="card bg-light mb-5 ml-3 shadow" style="width: 100%">
            <div class="card-header">
                <h5><span class="badge badge-pill bg-primary shadow-sm ml-1" style="color:#FFFFFF">題目{{index2 + 1}}</span></h5>
                <div class="cardHeadText ml-3">{{item.topic_id.content}}</div></div>
            <div class="card-body">
                <h5><span class="badge badge-pill bg-warning shadow-sm ml-1" style="color:#132948">答案</span></h5>
                <p v-if="item.topic_id.type === 1 || item.topic_id.type === 3" class="card-text ml-3">{{item.topic_res}}</p>
                <p v-if="item.topic_id.type === 2" class="card-text ml-3">{{item.topic_score}}</p>            
            </div>
        </div>
        </div>

        <h2 class="ml-3 mt-5 mb-5"><span class="badge shadow-lg" style="background-color: #132948; color:#FFFFFF">給他/她的建議</span></h2>
        <div class="card bg-light mb-4 ml-3" style="width: 100%">
            <div class="card-body">
                <p class="card-text ml-3">{{this.answerProject.suggest}}</p>            
            </div>
        </div>
        </div>



    </div>
</template>


<script>
import Api from "../../api";
import { mapGetters, mapActions } from 'vuex'
import loadingFunc from '../Loading'


export default {
    name:"WatchAnswer",

    components: {
        loadingFunc
    },

    created() {
        $('#loading').show();

        this.watchTarget = this.$route.query.watchTarget;
        this.watchTargetID = this.watchTarget._id;
            console.log(this.watchTarget);
            console.log(this.watchTargetID);

       
        this.project = this.$route.query.watchProject;
        this.projectID = this.project._id;
            console.log(this.project);
            console.log(this.projectID);

        this.user = this.$store.state.user;
        this.userID = this.user._id;
            console.log(this.user);
            console.log(this.user._id);
        

        Api.getHistoricalRecordOfTopicRes({
            user_id: this.userID  
            // user_id: '5c458f17d3dc242ae01dbb20'  
            }).then((response) => {
                console.log(response);
                let responseData = response.data;
                console.log(responseData);
                for (let i = 0; i < responseData.length; i++) {
                    console.log(responseData[i]);
                    // console.log(responseData[2].project_id._id);
                    // console.log(this.projectID);
                    if (responseData[i].project_id === null){
                        continue;
                    }
                    if (responseData[i].project_id._id == this.projectID) {
                        this.answerProject = responseData[i];                                                
                    }
                }
                console.log(this.answerProject);
                this.anonymous = this.answerProject.result_anonymous;
                console.log(this.anonymous);
                this.answersList = this.answerProject.topic;
                console.log(this.answersList);
                this.answersFiltered = this.setAnswers();
                console.log(this.answersFiltered);
                this.show = true;
                $('#loading').hide();
            }).catch((err) => {
                console.log(err.response);
            });


    },

    data(){
        return {
            show: false,
            watchTarget:'',
            watchTargetID:'',
            projectID:'',
            project:'',
            user:'',
            userID:'',

            answerProject:'',
            anonymous: true,
            answersList:[],
            answersFiltered:[],
        }
    },

    methods: {
        setAnswers: function() {    
            console.log(this.answersList);    
            let ansAll = [];
            let ansCompany = [];
            let ansDpt = [];

            for(let i = 0; i < this.answersList.length; i++){
                // console.log(this.questions[i].applicable_dep_id === null);
                // console.log(this.evaluateTarget.department_id);
                if (this.answersList[i].topic_id.applicable_dep_id === null) {
                    ansCompany.push(this.answersList[i]);
                } else {
                    ansDpt.push(this.answersList[i]);
                } 
            }
            console.log(ansCompany);
            console.log(ansDpt);

            ansAll.push(ansCompany);
            ansAll.push(ansDpt);            
            console.log(ansAll); 
            return ansAll;           
        },




    }






}
</script>
    

<style scoped lang="scss">
@import "~bootstrap/scss/bootstrap";
.page-title{
    font-weight:bold;
    font-size: 25px;
    color: #12263F;
}


.cardHeadText {
    font-weight: bold;
}

</style>





