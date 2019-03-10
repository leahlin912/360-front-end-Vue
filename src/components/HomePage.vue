<template>
  <div id="home" class="container">   

    <div class="row">
    <span class="navbar navbar-light bg-light indexLevel1">
        <form class="form-inline">
            <a class="navbar-brand page-title">最新公告</a>            
        </form>
    </span>
    </div>
    
  <div v-if="showList === false">
    <div class="card shadow mt-2" style="background-color:#E3EBF8;">
      <div class="card-body">
        <p style="font-size:20px; font-weight: normal; margin-top: 2%; margin-left: 2%">
          目前沒有公告！</p>
      </div>
    </div>
  </div>

    <div v-if="showList">
    <table class="table-responsive-md ml-2" style="width: 100%">
      <!-- <table id="tableBulletin" class="table rwd-table table-curved" border="0" style="border-collapse:collapse; border-radius: 10px; border: 2px solid #EDEDED"> -->
      <table id="tableBulletin" class="table rwd-table table-curved" border="0">
        <thead class="thead" style="background-color:#F7F7F7">
          <tr align="center">      
             <!-- col-md-1 -->
            <th scope="col" style="width: 20%; vertical-align: middle;">公告標題</th>
            <th scope="col" style="width: 50%; vertical-align: middle;">公告內容</th>
            <th scope="col" style="width: 15%; vertical-align: middle;">公告開始日</th>
            <th scope="col" style="width: 15%; vertical-align: middle;">公告結束日</th>
          </tr>
        </thead>
        <tbody style="background-color:#FFFFFF">
           <!-- align="center" -->
          <tr v-for="item in showArr" v-bind:key="item.billboard_no" align="center">
            <td data-th="標題" class="align-middle;" style="vertical-align: middle;">{{item.title}}</td>      
            <td data-th="標題2" style="vertical-align: middle;">{{item.content}}</td>
            <td data-th="標3" class="align-middle;" style="vertical-align: middle;">{{item.startDate}}</td>
            <td data-th="標題4" class="align-middle;" style="vertical-align: middle;">{{item.endDate}}</td>      
          </tr>    
        </tbody>
      </table>
    </table>
    </div>
  </div>
</template>

<script>
import Api from "../api";
export default {
  name: 'HomePage',

  created() {
    

     Api.bulletinboard_get().then((response) => {
                  console.log(response);
                this.dataArr = response.data;
                  console.log(this.dataArr);
                  // console.log(this.showArr);

                this.showArr = this.getShowdata();
                  console.log(this.showArr);
                if (this.showArr.length !== 0) {
                  this.showList = true 
                } else {
                  this.showList = false 
                }
            }).catch((err) => {
                console.log(err.response);
            });

  },

  data () {
    return {
      dataArr: [],
      showArr: [],
      showList: false,
      // today: '',
      // todayTime: 1,

    }
  },

  methods:{
    getShowdata: function() {    //取得要呈現的資料
      // var currDate = Date.parse(new Date().toDateString());  //目前時間
      // console.log(new Date())
      // console.log(new Date().toUTCString())
      // console.log(currDate);

      var today = this.$store.state.today;
      var todayTime = Date.parse(today).valueOf();
      console.log(today);
      console.log(todayTime)


      var outputArr = [];
      this.dataArr.forEach(function(item){
        var date_start = Date.parse(item.date_start).valueOf();    //資料庫記錄公告開始時間
          console.log(item.date_start)
          console.log(date_start);
        var date_end = Date.parse(item.date_end).valueOf();    //資料庫記錄公告結束時間 
          console.log(item.date_end)       
          console.log(date_end);

        var test = item.date_start.split("T");
        var startDate = test[0];
        var startTime = Date.parse(startDate).valueOf()
          console.log(startDate);
          console.log(startTime);
        var test2 = item.date_end.split("T");
        var endDate = test2[0];
        var endTime = Date.parse(endDate).valueOf()
          console.log(endDate);
          console.log(endTime);

        // console.log(startTime);
        // console.log(endTime);
        // console.log(todayTime);
        // console.log(typeof startTime);
        // console.log(typeof endTime);
        // console.log(typeof todayTime);
        // console.log(todayTime >= startTime);
        // console.log(todayTime <= endTime);
        // console.log(todayTime >= startTime && todayTime <= endTime);


        if (todayTime >= startTime && todayTime <= endTime) {          
          item.isShow = true;         
          item.startDate = startDate;
          item.endDate = endDate;

          outputArr.push(item);  
          console.log(outputArr); 
        }
      })
      // console.log(outputArr);
      return outputArr;
    }


  }





}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~bootstrap/scss/bootstrap";
.page-title{
        font-weight:bold;
        font-size: 25px;
        color: #12263F;
    }

h1{
  margin-left: 9%;
  margin-top: 3.5%;
  font-weight: bold;
  float: center;
  color: #12263F;
  font-family: Microsoft JhengHei;
  font-size: 30 px;
}

h2{
  margin-left: 15%;
  margin-top: 3%;
  font-weight: bold;
  float: center;
  color: #12263F;
  font-family: Microsoft JhengHei;
  font-size: 25px;
}

th {
  height: 80px;
}

td {
  height: 80px;  
}



.tableBulletin {
  // background-color: transparent;
  table-layout: fixed;
  // border: solid 5px #777777;
  // border-collapse: separate;
  // border-spacing: 0;

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
