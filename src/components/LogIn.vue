<template>
  <div class="login finish-wrap">   
  <div class="row">
  <div id="loginCard" class="card shadow col-xs-6 col-sm-3">
  <div class="card-body">
    <!-- <h2><b>360度績效考核系統</b></h2> -->
    <!-- <h1 id="title" class="card-title">360</h1> -->
    <img class="card-img-top mt-3 mb-3" src="../assets/title33.png" width="70" style="float: center">
 <!-- style="padding:20px 50px 20px 50px" -->

 <!-- style="margin-top:90%" -->
    <form class="inputarea" v-on:submit.stop.prevent="login">
    <!-- <form class="inputarea row"> -->
      <div class="form-group input-group inputGroupOutside">
		    <div class="input-group-prepend iconOutside">
          <span class="input-group-text"> 
          <font-awesome-icon icon="user-circle" class="iconA bg-white"/></span>
          <!-- <label>帳號</label> -->
          <!-- <img class="iconB" src="../assets/account.png"> -->
		    </div>	    
        <input class="inputA form-control" type="text" v-model="account" placeholder=" account" required>
        <!-- <div class="clearfix hidden-xs"></div> -->
	    </div>
      
      

      <div class="form-group input-group">
		    <div class="input-group-prepend iconOutside">
          <span class="input-group-text"> 
          <font-awesome-icon icon="lock" class="fa-w-16 iconA bg-white"/></span>
          <!-- <label>密碼</label>  fa-w-15  -->
		      </div>
          <input class="inputA form-control" type="password" v-model="password" placeholder=" password" required>     
      </div>

      <!-- <button class="btn btn-primary shadow" v-on:click="login">登入</button> -->
      <!-- <button class="btn shadow" type="submit" v-on:click="login">登入</button> -->
      <button class="btn shadow" type="submit">登入</button>
    </form>    
  </div>
  </div>
  </div>
  </div>
</template>

<script>
import {setCookie, getCookie} from '../cookies/cookiemethods.js'
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'LogIn',

  // created() {
  //   console.log(this.$store.state.user_id);
  // },

  data () {
    return {
      account: '',
      password: '',
      userIDload:''
    }
  },

  methods: {
    login: function(){
      let data = {'account': this.account,'password': this.password};

    
      // 註銷登入
      // this.$router.push('/HomePage');

      axios.post('http://35.194.169.85:3000/api/login', data).then((response)=>{
        console.log(response);                 
        if(response.data.success === true) {
          setCookie('Token', response.data.token, 60*60);

          var user = JSON.parse(response.data.user);
            console.log(user);            
            console.log(user.purview);            
          if (user.purview == null) {
            user.purview = {description: '員工'}
          }
          // this.setUserIDin(this.userIDload);
          //   console.log(this.$store.state.user_id)
          this.$store.dispatch('setUser', user);
            //  console.log(this.userIDload)
             console.log(this.$store.state.user)
             
          var project = JSON.parse(response.data.project);
            console.log(project);
          // this.setUserIDin(this.userIDload);
          //   console.log(this.$store.state.user_id)
          this.$store.dispatch('setProject', project);
            //  console.log(this.userIDload)
             console.log(this.$store.state.project)
          
          this.$store.dispatch('setToday');
             console.log(this.$store.state.today)
          
          //登入資訊存入sessionStorage
          window.sessionStorage.setItem('user', JSON.stringify(user));
          window.sessionStorage.setItem('project', JSON.stringify(project));
          window.sessionStorage.setItem('today', this.$store.state.today);
          // window.sessionStorage.setItem('token', JSON.stringify(response.data.token));
          window.sessionStorage.setItem('token', JSON.stringify(getCookie('Token')));

          setTimeout(function(){
            this.$router.push('/HomePage');
          }.bind(this), 1500);
        } else {
          alert('登入失敗，請重新登入！');
        }
      }
      ).catch(error => console.log(error));         
    },

    // ...mapActions({
    //   setUserIDin: "setUserID",
    //   setProjectIDin:"setProjectID"
    // })

    ...mapActions([
      'setUser',
      'setProject',
      'setToday'
    ])


  },

  computed: {
    ...mapGetters([
      'getUser',
      'getProject',
      'getToday'
    ])
    // ...mapGetters({
    //   userID : 'getUserID',
    //   projectID : 'getProjectID'
    // })
  }


}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.login {
    text-align: center;
    /* margin-top: 5%; */
    font-family: Microsoft JhengHei;
    border: 0px;
    padding-top: 5%;
    /* background-color: #FFFFFF */
    /* background: linear-gradient(to bottom, #cfe7fa 0%,#6393c1 100%);     */
    /* scroll-behavior: smooth; */
    height: 100%;
    overflow: scroll; 
    overflow-x: hidden;
    overflow-y: scroll;
}

.finish-wrap{
  /* background: linear-gradient(to bottom, #cfe7fa 0%,#6393c1 100%);     */
  /* background: linear-gradient(to bottom, #a281ee 0%,#a2eaf3 100%);   //原色   */
  background: linear-gradient(to bottom, #90BEFF 0%,#275594 100%);     
  min-height: 100%;
  position: fixed;
  width: 100%;

}

h1 {
  font-weight: bold
}

#loginCard {
  /* background: linear-gradient(to bottom, #cfe7fa 0%,#6393c1 100%); */
  width: 40%; 
  height: 30%;
  margin: 0 auto; 
  /* padding: 0px 25px 25px 25px; */
  padding: 0px 3% 3% 3%;
  border-radius: 10px;
  background:rgba(255, 255, 255, 0.3);
  /* background:rgb(247, 242, 236) */
  /* background: #FFFFFF */
  overflow: visible; 
}

.inputGroupOutside {
  height: 45px;
  float: center;
  /* margin-top: 4%; */
}


.iconOutside {
  /* border-top-left-radius: 4px; 
  border-bottom-left-radius: 4px; 
  border: 0.5px solid #132948;
  background-color: #FFFFFF;
  color:#FFFFFF; */
  height: 45px;
  margin-top: 6%
}

.input-group-prepend span{
  width: 4vw;
  height: 45px;
  background-color: #FFFFFF;
  /* border: none; */
  border-top-left-radius: 4px; 
  border-bottom-left-radius: 4px; 
  border: 0.5px solid #132948;
}


.iconA {
  font-size: 2vw;  
  color: #132948
  /* margin-top: 20px; */
  /* font-size: 50px;   */  
  /* border-radius: 4px;   */
  /* border-top-left-radius: 4px; 
  border-bottom-left-radius: 4px;  */
  /* border:1px solid #DBDBDB; */
  /* border: 0.5px solid #132948; */
  /* padding: 11px;   */
  /* color: rgba(121, 120, 120, 0.466) */  
}

input {
  cursor: pointer;
  /* border-radius: 4px;   */
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  /* border:1px solid #DBDBDB; */
  border: 0.5px solid #132948;
  /* height: 51px; */
  margin-top: 6%;  
  height: 45px;
  width: 10vw;
  font-size: 1.25vw
}




button {
  margin-top: 4%;
  /* width: 245px; */
  width: 100%;
  height: 45px;
  background-color:#132948;
  color: #FFFFFF;
  font-size: 1.25vw;
  overflow: hidden; 
  float: center
}

button:hover {
  color: #FFFFFF
}



/* label { */
  /* margin-right: 20px; */
  /* font-size: 19px */
/* } */

</style>
