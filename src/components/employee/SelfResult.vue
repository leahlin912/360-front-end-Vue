<template>
  <div id="selfResult" class="container">    
    <div class="row">
      <div class="col-12">
        <span class="navbar navbar-light bg-light indexLevel1">
          <form class="form-inline">
              <a class="navbar-brand page-title">受評結果</a>            
          </form>
        </span>
      </div>
    </div>

    <div class="row">
    <div class="col-sm-4 my-2  ml-3">
      <label class="mr-sm-1" for="inlineFormCustomSelect">選擇查看專案：</label>
      <select class="custom-select mr-sm-1" v-model="chosenProjectID">
        <!-- <option selected>請選擇</option> -->
        <option v-for="project in projectList" :key="project._id" :label="project.name" v-bind:value="project._id">{{project}}</option>
      </select>
    </div>
      <td>
        <button type="button" class="btn btn-primary" @click="filterByProject(chosenProjectID)">選擇</button>
      </td>
    </div>

    <div class="row"><div class="col ml-3"><p>專案名稱：{{chosenProject[0].name}}</p></div></div>
    <!-- <div class="row"><div class="col ml-3"><p>專案開始時間：{{chosenProject[0].project_date_start}}</p></div></div>
    <div class="row"><div class="col ml-3"><p>專案結束時間：{{chosenProject[0].project_date_end}}</p></div></div> -->
    
    

  
    <div class="card" style="width: 18rem;">
      <div class="card-header" type="button" v-on:click="showSingle()"> Featured </div>
      <ul v-if="show" class="list-group list-group-flush">
        <li class="list-group-item">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Vestibulum at eros</li>
      </ul>
    </div>



  </div>
</template>

<script>
import Api from "../../api";
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "SelfResult",
  created() {   
    // 假資料
    this.watchProjectID = '5c47e499234e3c3860c521d8',   //選擇查看的專案ID
    this.userID = '5c458f17d3dc242ae01dbb1f'       //使用者ID

    // this.user = this.$store.state.user;
    // this.userID = this.user._id;
    //     console.log(this.user);
    //     console.log(this.user._id);


    Api.project_getAll().then((response) => {
      console.log("project_getAll");
      console.log(response);
      this.projectList = response.data;
        console.log(this.projectList);
      }).catch((err) => {
        console.log(err.response);
      });  


          // let func = async () => {
          //   try{
          //       let response = await Api.getAssessmentResult({
          //         project_id: this.watchProjectID,
          //         user_id: this.userID           
          //       });
          //       console.log(response);                         
          //   } catch(err) {
          //       console.log(err);
          //   }};
          // func();


    this.callAPI_getAssessmentResult(this.watchProjectID);

      
  },

  data () {
    return {
        watchProjectID: "",
        userID: "",

        projectList:[],
        chosenProjectID:'',
        chosenProject:'',


        show: false,

    }
  },

  methods: {
      showSingle: function(){
        if (this.show === false) {
          this.show = true;
        } else {
          this.show = false;
        }
      },


      filterByProject: function(chosenProjectID) {
        console.log(this.chosenProjectID);              
        if (chosenProjectID == '') {
          alert('請選擇專案！');
          return;
        }
        this.chosenProject = this.projectList.filter(function(item) {
                              return item._id == chosenProjectID;
                            });
        console.log(this.chosenProject);
        this.getSubList(chosenProjectID)
        this.choosed = true;
      return this.chosenProject;                    
    },


    function(watchProjectID){
      let func = async () => {
            try{
                let response = await Api.getAssessmentResult({
                  project_id: watchProjectID,
                  user_id: this.userID           
                });
                console.log(response);                         
            } catch(err) {
                console.log(err);
            }};
          func();

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


</style>

