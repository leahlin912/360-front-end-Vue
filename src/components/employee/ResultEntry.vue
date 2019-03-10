<template>
    <div id="resultEntry" class="container">   
        <loadingFunc id:loading></loadingFunc>
        <div class="row">
            <div class="col-12">
                <span class="navbar navbar-light bg-light indexLevel1">
                <form class="form-inline">
                    <a class="navbar-brand page-title">受評結果查詢</a>            
                </form>
                </span>
            </div>
        </div>

    <div class="row"><div class="col mt-2"><p style="font-size: 17px; margin-left: 2%">
        姓名：{{user.name}}</p></div></div>
    <div class="row"><div class="col mb-2"><p style="font-size: 17px; margin-left: 2%">
        部門：{{user.department_id.name}}</p></div></div>    

    <div v-if="showList === false"><p style="font-size:20px; color: red; font-weight: normal; margin-top: 2%; margin-left: 2%">
        目前沒有任何受評結果！</p></div>

    <div v-if="showList">
    <div class="row">
    <table class="table-responsive-md ml-3 col-12">
    <table class="table ml-3 table-curved">
      <thead class="thead" style="background-color:#F7F7F7">
        <tr align="center">
          <th scope="col" class="align-middle" style="height: 80px; vertical-align: middle; width: 35%;">專案名稱</th>
          <th scope="col" class="align-middle" style="vertical-align: middle; width: 25%;">專案時間</th>
          <th scope="col" class="align-middle" style="vertical-align: middle; width: 20%;">專案狀態</th>
          <th scope="col" class="align-middle" style="vertical-align: middle; width: 20%;">受評結果</th>
        </tr>
      </thead>
      <tbody style="background-color:#FFFFFF">
        <tr v-for="(item, index) in hisProjectList" v-bind:key="index" align="center">
          <td scope="row" class="align-middle" style="vertical-align: middle;">{{item.name}}</th>
          <td class="align-middle" style="vertical-align: middle;">{{item.project_date_start}} ~ {{item.project_date_end}}</td>
          <td class="align-middle" style="vertical-align: middle;"> 
            <p v-if="item.close === 'Y'" style="margin-top: 10%">已結束</p>
            <p v-if="item.close === 'N'" style="margin-top: 10%">進行中</p>
          </td>

          <td class="align-middle" style="vertical-align: middle;">
            <!-- <font-awesome-icon icon="eye" style="color:#7F91AC;font-size:20px" class="btnEye" @click="watchEvaluators" /> -->

            <!-- <button v-if="item.close === 'Y'" class="btn btn-xs fs-10 btn-bold btn-view1" type="button"  @click="watchResult(item)"> -->
            <button  class="btn btn-xs fs-10 btn-bold btn-view1" type="button"  @click="watchResult(item)">
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
    name:"ResultEntry",

    components: {
        loadingFunc
    },

    created() {
        $('#loading').show();

        this.user = this.$store.state.user;
        this.userID = this.user._id;
            console.log(this.user);
            console.log(this.user._id);



        //  Api.getAssessmentResult({
        //      project_id: this.projectID,
        //      user_id: this.userID
        //      }).then((response) => {
        //         console.log(response);
        //         this.hisProjectList = response.data;
        //         console.log(this.hisProjectList);
        //         this.showList = true;
        //         $('#loading').hide();
        //     }).catch((err) => {
        //         console.log(err.response);
        //         // if ('data' in err.response && err.response.data.errorMsg === "Data not found") {
        //             this.showList = true;
        //             $('#loading').hide();
        //         // }
        //     });  
         Api.getHistoricalProject({
            user_id: this.userID
            }).then((response) => {
                console.log(response);
                this.hisProjectList = response.data;
                console.log(this.hisProjectList);
                this.showList = true;
                $('#loading').hide();
            }).catch((err) => {
                console.log(err.response);
                if ('data' in err.response && err.response.data.errorMsg === "Data not found") {
                    this.showList = false;
                    $('#loading').hide();
                }
            });  

        
    },

    data(){
        return {
            showList: false,            
            user:"",
            userID:"",
            
            hisProjectList:[]

        }
    },

    methods: {
        watchResult: function(item) {
            this.$router.push({path:'/PersonalReport', 
                query:{project_id: item._id, user_id: this.userID}})        
        }


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
