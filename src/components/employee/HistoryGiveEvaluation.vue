<template>
    <div id="HistoryGiveEvaluation" class="container">   
        <loadingFunc id:loading></loadingFunc>
        <div class="row">
            <div class="col-12">
                <span class="navbar navbar-light bg-light indexLevel1">
                <form class="form-inline">
                    <a class="navbar-brand page-title">歷史互評紀錄</a>            
                </form>
                </span>
            </div>
        </div>
        
        <div v-if="showList === false"><p style="font-size:20px; color: red; font-weight:normal; margin-top: 2.5%; margin-left: 2%">
            目前無此專案的評量對象！</p></div>

        <div v-if="showList">

        <div class="row">            
        <table class="table-responsive-md ml-3 col-12">
        <table class="table ml-3 table-curved">
        <thead class="thead" style="background-color:#F7F7F7">
            <tr align="center">
            <th scope="col" class="align-middle" style="height: 80px; width: 20%; vertical-align: middle;">評量對象</th>
            <th scope="col" class="align-middle" style="width: 30%; vertical-align: middle;">專案名稱</th>
            <th scope="col" class="align-middle" style="width: 30%; vertical-align: middle;">專案時間</th>
            <th scope="col" class="align-middle" style="width: 20%; vertical-align: middle;">評量內容</th>
            </tr>
        </thead>
        <tbody style="background-color:#FFFFFF">
            <tr v-for="(item, index) in historyList" v-bind:key="index" align="center">
            <td scope="row" class="align-middle" style="height: 80px; vertical-align: middle;">{{item.be_evaluated_id.name}}</td>
            <td class="align-middle" style="vertical-align: middle;">{{item.project_id.name}}</td>
            <td class="align-middle" style="vertical-align: middle;">{{item.project_id.project_date_start}} ～ {{item.project_id.project_date_end}}</td>

            <td class="align-middle" style="vertical-align: middle;">
                <button class="btn btn-xs fs-10 btn-bold btn-view1" type="button"  @click="watchAnswer(item)">
                <img src="../../assets/view.png" width="20">
                </button>
            </td>
            </tr>
        </tbody>
        </table>
        </table>
        </div>
        
        </div>









    </div>
</template>

<script>
import Api from "../../api";
import { mapGetters, mapActions } from 'vuex'
import loadingFunc from '../Loading'


export default {
    name: 'HistoryGiveEvaluation',

    components: {
        loadingFunc
    },

    created() {
        $('#loading').show();

        // this.project = this.$store.state.project;
        // this.projectID = this.project._id;
        //     console.log(this.project);
        //     console.log(this.project._id);
        this.user = this.$store.state.user;
        this.userID = this.user._id;
            console.log(this.user);
            console.log(this.user._id);


        Api.getHistoricalRecordOfTopicRes({
            user_id: this.userID   
            }).then((response) => {
                console.log(response);
                this.historyList = response.data;
                   console.log(this.historyList);
                if (this.historyList.length !== 0) {
                    this.showList = true;
                } else {
                    this.showList = false;
                }
                $('#loading').hide();
            }).catch((err) => {
                console.log(err.response);
                this.showList = false;
                $('#loading').hide();
            });




    },

    data(){
        return {
            showList: false,
            project:"",
            projectID:"",
            user:"",
            userID:"",      
            
            historyList:[],
            chosenProjectID:'',
            chosenProjectHistoryList:[]



        }
    },

    methods: {
        watchAnswer: function(watchAnswer) {
            this.$router.push({path:'/EvaluationEntry/WatchAnswer', 
                query:{watchTarget: watchAnswer.be_evaluated_id, watchProject: watchAnswer.project_id}})
        },

        filterByProject: function() {
            console.log(this.chosenProjectID);      
            for (let i = 0; i < this.historyList.length; i++) {
                if (this.historyList[i].project_id._id === this.chosenProjectID) {
                    this.chosenProjectHistoryList.push(this.historyList[i]);
                }
            }
            console.log(this.chosenProjectHistoryList);
            this.showList = true;
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

.btn-view1 {
  background-color: #eff0f1;
  margin-top: 5pt;
}


.table-curved {
    border-collapse: separate;
    border-spacing: 0;
}
.table-curved {
    border:  2px solid #EDEDED;
    border-radius: 6px;
}
// .table-curved td, .table-curved th {
//     border-left:  1px solid #EDEDED;
//     border-top:  1px solid #EDEDED;
// }
.table-curved th {
    border-top: none;
    border-bottom: none;
}
.table-curved th:first-child {
    border-radius: 6px 0 0 0;
}
.table-curved th:last-child {
    border-radius: 0 6px 0 0;
}
.table-curved th:only-child{
    border-radius: 6px 6px 0 0;
}
.table-curved tr:last-child td:first-child {
    border-radius: 0 0 0 6px;
}
.table-curved tr:last-child td:last-child {
    border-radius: 0 0 6px 0;
}


</style>
