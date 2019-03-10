<template>
    <div id="doEvaluation" class="container ml-6">           
        <loadingFunc id:loading></loadingFunc>

        <div class="row">
            <div class="col-12">
                <span class="navbar navbar-light bg-light indexLevel1">
                <form class="form-inline">
                    <a class="navbar-brand page-title">評量題目</a>            
                </form>
                </span>
            </div>
        </div>

        <div class="row"><div class="col ml-3 mt-4"><p> 專案名稱：{{project.name}} </p></div></div>
        <div class="row"><div class="col ml-3 mt-1 mb-4"><p> 評量對象：{{evaluateTarget.name}} </p></div></div>
        

        <div class="card shadow mt-2 mb-5 ml-3" style="width:99%; font-size: 17px; font-weight: bold">
        <div class="card-body  mt-3">            
        <div class="row ml-3 justify-content-start">
            <div class="col-1.5">是否匿名：</div>
            <div class="col-2 ml-0 mb-3">
                <div class="form-check form-check-inline mr-2">
                    <input class="form-check-input" type="radio" name="anonymousOptions" id="inlineRadio1" value=true v-model="anonymous">
                    <label class="form-check-label ml-1" for="inlineRadio1">是</label>
                </div>
                <div class="form-check form-check-inline mr-2">
                    <input class="form-check-input" type="radio" name="anonymousOptions" id="inlineRadio2" value=false v-model="anonymous">
                    <label class="form-check-label ml-1" for="inlineRadio2">否</label>
                </div>
            </div>
        </div>
        </div>
        </div>


    <div v-if="showQ">
        <h2 class="ml-3 mt-2 mb-5"><span class="badge badge-info shadow-lg">公司整體題目</span></h2>
        <div v-for="(item, index) in questionsFiltered[0]" v-bind:key="index + 'A'">
        
        <form v-if="item.type === 1" class="ml-3">
            <div class="card shadow-lg mb-5">
            <div class="card-body">
            <div class="form-group ml-3 mb-1 justify-content-start">
                <label for="essayQ" class="qTitle badge badge-warning shadow-sm mb-2">題目{{index + 1}}</label>
                <div class="row ml-2 mt-3"><p class="col-1.5">受評能力：</p>
                    <p class="col-5"><span class="badge badge-primary shadow-sm" style="font-size:17px">{{item.abilityName}}</span></p>
                </div>  
                <div class="row ml-2"><p class="col-1.5">題目內容：</p><p class="col-10">{{item.content}}</p></div>  
                <p class="essayQ ml-2">回應內容：</p>
                <textarea class="form-control ml-md-3" style="width:95%" id=itemID rows="5" v-model="item.response"></textarea>                
            </div>
            </div>
            </div>
        </form>

        <form v-if="item.type === 2" class="mt-3  ml-3">
            <div class="card shadow-lg mb-5">
            <div class="card-body">
            <div class="form-group ml-3 justify-content-start">                
                <label for="likertScale" class="qTitle badge badge-warning shadow-sm mb-2">題目{{index +1}}</label>
                <div class="row ml-2 mt-3"><p class="col-1.5">受評能力：</p>
                    <p class="col-5"><span class="badge badge-primary shadow-sm" style="font-size:17px">{{item.abilityName}}</span></p>
                </div>   
                <div class="row ml-2"><p class="col-1.5">題目內容：</p><p class="col-10">{{item.content}}</p></div>   
                    <div id="likertScale" class="col ml-0">
                        <div class="form-check form-check-inline  mr-4">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value=1 v-model="item.response">
                            <label class="form-check-label ml-2" for="inlineRadio1">1</label>
                        </div>
                        <div class="form-check form-check-inline mr-4">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value=2 v-model="item.response">
                            <label class="form-check-label ml-2" for="inlineRadio2">2</label>
                        </div>
                        <div class="form-check form-check-inline mr-4">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value=3 v-model="item.response">
                            <label class="form-check-label ml-2" for="inlineRadio2">3</label>
                        </div>
                        <div class="form-check form-check-inline mr-4">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value=4 v-model="item.response">
                            <label class="form-check-label ml-2" for="inlineRadio2">4</label>
                        </div>
                        <div class="form-check form-check-inline mr-4">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio5" value=5 v-model="item.response">
                            <label class="form-check-label ml-2" for="inlineRadio2">5</label>
                        </div>
                    </div>                
            </div>
            </div>
            </div>
        </form>

        <form v-if="item.type === 3" class="form-group ml-3">
            <div class="card shadow-lg mb-5">
            <div class="card-body">
            <label for="multiplechoice" class="qTitle badge badge-warning shadow-sm ml-3 mb-2">題目{{index + 1}}</label>            
            <div class="row ml-4 mt-3"><p class="col-1.5">受評能力：</p>
                <p class="col-5"><span class="badge badge-primary shadow-sm" style="font-size:17px">{{item.abilityName}}</span></p>
            </div> 
            <div class="row ml-4"><p class="col-1.5">題目內容：</p><p class="col-10"> {{item.content}} </p></div>   
                    
            <div class="form-check ml-4">
            <span v-for="(optionItem, index1) in item.option" v-bind:key="index1">
                <input class="form-check-input" type="radio" name="choice" :value="optionItem" v-model="item.response"/>
                <label>{{optionItem}}</label><br/>
            </span>
            </div>
            </div>
            </div>            
        </form>   
        </div>


        <h2 v-if="questionsFiltered[1].length !== 0" class="ml-3 mt-2 mb-5"><span class="badge badge-info shadow-lg">部門題目</span></h2>
        <div v-for="(item, indexA) in questionsFiltered[1]" v-bind:key="indexA +'C'">
        
        <form v-if="item.type === 1" class="ml-3">
            <div class="card shadow-lg mb-5">
            <div class="card-body">
            <div class="form-group ml-3 mb-1 justify-content-start">
                <label for="essayQ" class="qTitle badge badge-warning shadow-sm mb-2">題目{{indexA + 1}}</label>
                <div class="row ml-2 mt-3"><p class="col-1.5">受評能力：</p>
                    <p class="col-5"><span class="badge badge-primary shadow-sm" style="font-size:17px">{{item.abilityName}}</span></p>
                </div>  
                <div class="row ml-2"><p class="col-1.5">題目內容：</p><p class="col-10">{{item.content}}</p></div>  
                <p class="essayQ ml-2">回應內容：</p>
                <textarea class="form-control ml-md-3" style="width:95%" id=itemID rows="5" v-model="item.response"></textarea>                
            </div>
            </div>
            </div>
        </form>

        <form v-if="item.type === 2" class="mt-3 ml-3">
            <div class="card shadow-lg mb-5">
            <div class="card-body">
            <div class="form-group ml-3 justify-content-start">                
                <label for="likertScale" class="qTitle badge badge-warning shadow-sm mb-2">題目{{indexA +1}}</label>
                <div class="row ml-2"><p class="col-1.5">受評能力：</p><p class="col-5">【 {{item.abilityName}} 】</p></div>  
                <div class="row ml-2"><p class="col-1.5">題目內容：</p><p class="col-10">{{item.content}}</p></div>   
                    <div id="likertScale" class="col ml-0">
                        <div class="form-check form-check-inline mr-4">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value=1 v-model="item.response">
                            <label class="form-check-label ml-2" for="inlineRadio1">1</label>
                        </div>
                        <div class="form-check form-check-inline mr-4">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value=2 v-model="item.response">
                            <label class="form-check-label ml-2" for="inlineRadio2">2</label>
                        </div>
                        <div class="form-check form-check-inline mr-4">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value=3 v-model="item.response">
                            <label class="form-check-label ml-2" for="inlineRadio2">3</label>
                        </div>
                        <div class="form-check form-check-inline mr-4">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value=4 v-model="item.response">
                            <label class="form-check-label ml-2" for="inlineRadio2">4</label>
                        </div>
                        <div class="form-check form-check-inline mr-4">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio5" value=5 v-model="item.response">
                            <label class="form-check-label ml-2" for="inlineRadio2">5</label>
                        </div>
                    </div>                
            </div>
            </div>
            </div>
        </form>

        <form v-if="item.type === 3" class="form-group ml-3">
            <div class="card shadow-lg mb-5">
            <div class="card-body">
            <label for="multiplechoice" class="qTitle badge badge-warning shadow-sm mb-2 ml-3">題目{{indexA + 1}}</label>            
             <div class="row ml-4 mt-3"><p class="col-1.5">受評能力：</p>
                <p class="col-5"><span class="badge badge-primary shadow-sm" style="font-size:17px">{{item.abilityName}}</span></p>
            </div> 
            <div class="row ml-4"><p class="col-1.5">題目內容：</p><p class="col-10"> {{item.content}} </p></div>   
                    
            <div class="form-check ml-4">
            <span v-for="(optionItem, index4) in item.option" v-bind:key="index4">
                <input class="form-check-input" type="radio" name="choice" :value="optionItem" v-model="item.response"/>
                <label>{{optionItem}}</label><br/>
            </span>
            </div>
            </div>
            </div>
        </form>   
        </div>

        <h2 class="ml-3 mt-2 mb-5"><span class="badge badge-info shadow-lg">給他/她的建議</span></h2>
        <form class="ml-3">
            <div class="card shadow-lg mb-5"  style="padding:15px 0px 15px 0px">
            <div class="card-body">
            <div class="form-group ml-3 mb-1 justify-content-start">
                <textarea class="form-control ml-md-3" style="width:95%" id=itemID rows="7"  v-model="colleageSuggestion"></textarea>                 
            </div>
            </div>
            </div>
        </form>


        <!-- bigCanvas -->
        <div class="row mb-5 d-none d-sm-block" style="margin-left: 40%; margin-top: 6%">
            <div class="form-inline">
            <button type="button" class="btn btn-secondary btn-lg" @click="saveTmp">暫存</button>
            <button type="button" class="btn btn-primary btn-lg ml-5" @click="sendout" style="float: left;">送出</button>                    
            </div>
        </div>

        <!-- smallCanvas -->
        <div class="row mb-5 d-block d-sm-none" style="margin-left: 15%; margin-top: 6%">
            <div class="form-inline">
            <button type="button" class="btn btn-secondary btn-lg" @click="saveTmp">暫存</button>
            <button type="button" class="btn btn-primary btn-lg ml-5" @click="sendout" style="float: left;">送出</button>                    
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
    name:"DoEvaluation",

    components: {
        loadingFunc
    },

    created() {
        $('#loading').show();

        var q1 = [];

        this.evaluateTarget = this.$route.query.evaluateTarget;
        this.evaluateTargetID = this.evaluateTarget._id;
            console.log(this.evaluateTarget);
            console.log(this.evaluateTargetID);

        this.project = this.$store.state.project;
        this.projectID = this.project._id;
            console.log(this.project);
            console.log(this.projectID);

        this.user = this.$store.state.user;
        this.userID = this.user._id;
            console.log(this.user);
            console.log(this.user._id);
        
        this.questionsList = this.project.topic_id;
            console.log(this.questionsList);

        // Api.department_getDepartments(
        //     ).then((response) => {
        //         console.log(response);
        //         this.dptList = response.data;
        //           console.log(this.dptList);

        //     }).catch((err) => {
        //         console.log(err.response);
        //     });

        Api.ability_getAll().then((response) => {
                console.log(response);       
                this.abilityList = response.data;         
                console.log(this.abilityList);
            }).catch((err) => {
                console.log(err.response);
            });
        
        
        let func = async () => {
            try{
                for(let i = 0; i < this.questionsList.length; i++) {
                    console.log(this.questionsList[i]);
                    let response = await Api.topic_get({_id: this.questionsList[i]});
                    console.log(i);
                    console.log(response);
                    let question = response.data;
                    console.log(question);
                    console.log(typeof question);                    
                    q1.push(question);  
                }
            } catch(err) {
                console.log(err);
            }
        };

        func().then(() => {
            this.questions = q1;
                console.log(this.questions)
            this.questionsFiltered = this.setQuestions();
                console.log(this.questionsFiltered);
                console.log(this.questionsFiltered[0]);
                console.log(this.questionsFiltered[1]);
            this.showQ = true;
                console.log(this.showQ);
            $('#loading').hide();
        }).catch((err) => {
            console.log(err.response);
        });
        

        },



    data(){
        return {
            showQ: false,
            evaluateTarget:'',
            evaluateTargetID:'',
            projectID:'',
            project:'',
            user:'',
            userID:'',

            anonymous: true,
            questions:[],
            questionsList:[],
            questionsFiltered:[],
            colleageSuggestion:'',
            abilityList:[],

            itemID:'essayQ1'            
        }
    },

    methods: {        
        setQuestions: function() {    
            console.log(this.questions);    
            let qAll = [];
            let qCompany = [];
            let qDpt = [];

            for(let i = 0; i < this.questions.length; i++){
                if (this.questions[i].applicable_dep_id === null) {
                    this.questions[i].response = '';

                    let abilityName = this.getAbilityName(this.questions[i].ability_id);
                    if (abilityName !== -1) {
                        this.questions[i].abilityName = abilityName;
                    } 

                    qCompany.push(this.questions[i]);
                } else if (this.questions[i].applicable_dep_id === this.evaluateTarget.department_id._id) {
                    this.questions[i].response = '';         
                    
                    let abilityName = this.getAbilityName(this.questions[i].ability_id);
                    if (abilityName !== -1) {
                        this.questions[i].abilityName = abilityName;
                    }

                    qDpt.push(this.questions[i]);
                } else {
                    continue;
                }
            }
            console.log(qCompany);
            console.log(qDpt);

            qAll.push(qCompany);
            qAll.push(qDpt);            
            console.log(qAll); 
            return qAll;           
        },

        getAbilityName: function(abilityID) {
            for (let i = 0; i < this.abilityList.length; i++) {
                if (abilityID == this.abilityList[i]._id) {
                    return this.abilityList[i].ability
                }
            } 
            return -1
        },

        sendout: function() {
            console.log('anonymous:' + this.anonymous)
            console.log(this.questionsFiltered);
            var topicArr = [];

            for (let i = 0; i < this.questionsFiltered.length; i++) {

                for (let j = 0; j < this.questionsFiltered[i].length; j++) {
                    if (this.questionsFiltered[i][j].type === 1 || this.questionsFiltered[i][j].type === 3) {
                        let topicObj = {topic_id: this.questionsFiltered[i][j]._id,
                                        topic_res: this.questionsFiltered[i][j].response,
                                        topic_score: ''}
                        console.log(topicObj);
                        topicArr.push(topicObj);
                        console.log(topicArr);
                    }
                    if (this.questionsFiltered[i][j].type === 2) {
                        let topicObj = {topic_id: this.questionsFiltered[i][j]._id,
                                        topic_res: '',
                                        topic_score: this.questionsFiltered[i][j].response}
                        console.log(topicObj);
                        topicArr.push(topicObj);
                        console.log(topicArr);
                    }
                }
            }

            console.log(topicArr);
            console.log(this.projectID);
            console.log(this.userID);
            console.log(this.evaluateTargetID);
            console.log(JSON.stringify(topicArr));
            console.log(this.anonymous);
            console.log(this.colleageSuggestion);
            

            let func2 = async () => {
            try{
                let response = await Api.updAssessment({
                    project_id: this.projectID,
                    user_id:  this.userID,
                    be_evaluated_id: this.evaluateTargetID,
                    topic: JSON.stringify(topicArr),
                    result_anonymous: this.anonymous,
                    completed: true,
                    suggest: this.colleageSuggestion
                });
                
                console.log(response);
                         
            } catch(err) {
                console.log(err);
            }
            };

            func2().then(() => {
                this.$router.push("/EvaluationEntry");
            }).catch((err) => {
                console.log(err.response);
            });
        },

        saveTmp: function() {
            console.log('anonymous:' + this.anonymous)
            console.log(this.questionsFiltered);
            var topicArr = [];

            for (let i = 0; i < this.questionsFiltered.length; i++) {

                for (let j = 0; j < this.questionsFiltered[i].length; j++) {
                    if (this.questionsFiltered[i][j].type === 1 || this.questionsFiltered[i][j].type === 3) {
                        let topicObj = {topic_id: this.questionsFiltered[i][j]._id,
                                        topic_res: this.questionsFiltered[i][j].response,
                                        topic_score: ''}
                        console.log(topicObj);
                        topicArr.push(topicObj);
                        console.log(topicArr);
                    }
                    if (this.questionsFiltered[i][j].type === 2) {
                        let topicObj = {topic_id: this.questionsFiltered[i][j]._id,
                                        topic_res: '',
                                        topic_score: this.questionsFiltered[i][j].response}
                        console.log(topicObj);
                        topicArr.push(topicObj);
                        console.log(topicArr);
                    }
                }
            }

            console.log(topicArr);
            console.log(this.projectID);
            console.log(this.userID);
            console.log(this.evaluateTargetID);
            console.log(JSON.stringify(topicArr));
            console.log(this.anonymous);
            console.log(this.colleageSuggestion);
            

            let func3 = async () => {
            try{
                let response = await Api.updAssessment({
                    project_id: this.projectID,
                    user_id:  this.userID,
                    be_evaluated_id: this.evaluateTargetID,
                    topic: JSON.stringify(topicArr),
                    result_anonymous: this.anonymous,
                    completed: false,
                    suggest: this.colleageSuggestion
                });
                
                console.log(response);
                         
            } catch(err) {
                console.log(err);
            }
            };

            func3().then(() => {
                this.$router.push("/EvaluationEntry");
            }).catch((err) => {
                console.log(err.response);
            });


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

.qTitle{
    font-weight: bold;
    font-size: 22px;
}

p {
    font-weight: bold;
    font-size: 17px;     
}

.card {
    width: 100%; 
    // background-color:#E3EBF8; 
    background-color:rgb(214, 230, 253); 
    border-radius: 20px;
    border: none;
}

.align-items-center {
        -ms-flex-align: center;
        align-items:center;
        justify-content: space-between;
    }



</style>
