<template>
  <div id="selfInfo" class="container">    
    <div class="row mb-3">
      <div class="col-12">
        <span class="navbar navbar-light bg-light indexLevel1">
          <form class="form-inline">
              <a class="navbar-brand page-title">個人基本資料</a>            
          </form>
        </span>
      </div>
    </div>

    <!-- <div class="card mr-2" style="background-color:#ecf5ff"> -->
    <div class="card shadow p-3 ml-3 rounded" style="background-color: #ecf5ff; margin-bottom: 5%">
    <div class="card-body">
        <div class="row itemA"><div class="col-2 titleA">帳號:</div><div class="col-6">{{user.account}}</div></div>

        <div class="row itemB"><div class="col-2 titleA">密碼:</div><div class="col-6">
          <button type="button" class="btn btn-outline-info mt-0" @click="editPW()">修改密碼</button></div></div>

        <div class="row itemB"><div class="col-2 titleA">姓名:</div><div class="col-6">{{user.name}}</div></div>

        <div class="row itemB"><div class="col-2 titleA">員工編號:</div><div class="col-6">{{user.job_no}}</div></div>

        <div class="row itemB"><div class="col-2 titleA">部門:</div> <div class="col-6">{{user.department_id.name}}</div></div>

        <div v-if="user.position === 1" class="row itemB"><div class="col-2 titleA">職位:</div><div class="col-6">主管</div></div>
        <div v-if="user.position === 2" class="row itemB"><div class="col-2 titleA">職位:</div><div class="col-6">員工</div></div>
        
        <div v-if="user.email !== ''" class="row itemC"><div class="col-2 titleA">Email:</div><div class="col-6">{{user.email}}</div></div>
    </div>
    </div>

    <div v-if="toEditPW">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog" role="document">
                <div class="modal-content">

                  <div class="modal-header">
                    <h5 class="modal-title">更改密碼</h5>
                  </div>
                  
                  <div class="modal-body modal-open">
                    <form>
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-4 col-form-label">請輸入原密碼：</label>
                      <div class="col-sm-8">
                        <input type="password" class="form-control" id="inputPassword" v-model="oldPW">                      
                        <small v-if="error_oldPW" class="form-text text-muted" style="color:#FF0000">原密碼錯誤，請重新輸入</small>
                      </div>
                      </div>

                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-4 col-form-label">請輸入新密碼：</label>
                      <div class="col-sm-8">
                        <input type="password" class="form-control" id="inputNewPW" v-model="newPW">                     
                        <small v-if="error_newPW1" class="form-text text-muted text-danger">請輸入新密碼</small>
                        <small v-if="error_newPW2" class="form-text text-muted text-danger">新密碼與原密碼相同</small>
                      </div>
                      </div>

                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-4 col-form-label">請確認新密碼：</label>
                      <div class="col-sm-8">
                        <input type="password" class="form-control" id="inputCNewPW" v-model="confirmNewPW">
                        <small v-if="error_confirmNewPW" class="form-text text-muted text-danger">新密碼確認錯誤，請重新輸入</small>
                      </div>
                      </div>

                    </form>
                  </div>
                    
                  <div class="modal-footer">                                
                    <button type="button" class="btn btn-secondary" @click="closePWWindow()">關閉</button>
                    <button type="button" class="btn btn-primary" @click="savePW()">送出</button>
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
  name: "SelfInfo",
  created() {     
      this.project = this.$store.state.project;
      this.projectID = this.project._id;
        console.log(this.project);
        console.log(this.project._id);
      this.user = this.$store.state.user;
      this.userID = this.user._id;
        console.log(this.user);
        console.log(this.user._id);


      Api.employee_get({
        _id: this.userID   
        }).then((response) => {
          console.log(response);
          this.userData = response.data;
          console.log(this.userData);
        }).catch((err) => {
          console.log(err.response);
        });




  },

  
  data() {
    return {
      project:"",
      projectID:"",
      user:"",
      userID:"",
      userData:'',
      
      toEditPW: false,
      oldPW: '',
      newPW: '',
      confirmNewPW:'',
      error_oldPW: false,
      error_newPW1: false,
      error_newPW2: false,
      error_confirmNewPW: false,


    }
  },

  methods: {
    editPW: function() {
      this.toEditPW = true;
      console.log(this.toEditPW);
    },

    closePWWindow: function() {
      this.oldPW = ''
      this.newPW = ''
      this.confirmNewPW = ''
      this.error_oldPW = false
      this.error_newPW1 = false
      this.error_newPW2 = false
      this.error_confirmNewPW = false
      this.toEditPW = false
    },

    savePW: function() {
      if (this.oldPW !== this.userData.password) {
        this.error_oldPW = true;
        return;
      }
      if (this.newPW === '') {
        this.error_newPW1 = true;
        return;
      }
      if (this.newPW === this.userData.password) {
        this.error_newPW2 = true;
        return;
      }
      if (this.confirmNewPW !== this.newPW) {
        this.error_confirmNewPW = true;
        return;
      }
      
      if (this.newPW === this.confirmNewPW) {
        Api.employee_update({
                enterprise_id: this.userData.enterprise_id,
                department_id: this.userData.department_id,
                account: this.userData.account,
                email: this.userData.email,
                password: this.newPW,
                job_no: this.userData.job_no,
                name: this.userData.name,
                position: this.userData.position,
                job_title: this.userData.job_title,
                supervisor_id: this.userData.supervisor_id,
                situation: this.userData.situation,
                _id: this.userData._id
            }).then((response) => {
                console.log("employee_update");
                console.log(response);                
            }).catch((err) => {
                console.log(err.response);
            });
      } else {
        return;
      }

      this.toEditPW = false
    }



  }
}
</script>



<style scoped lang="scss">
@import "~bootstrap/scss/bootstrap";
.page-title {
        font-weight:bold;
        font-size: 25px;
        color: #12263F;
    }

.titleA {
  font-weight:bold;
}

.itemA {
  font-size: 20px;
  margin-top: 30px;
}

.itemB {
  font-size: 20px;
  margin-top: 40px;
}

.itemC {
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: 30px;
}


.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-form-control {
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
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

.modal-body {
  max-height: calc(100vh - 210px);
  overflow-y: auto;
}
.modal-open {
  overflow: scroll;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-form-control {
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
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
.modal-form-control-2 {
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
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
.switch input {
  display: none;
}
.switch {
  display: inline-block;
  width: 60px;
  height: 30px;
  margin: 8px;
  transform: translateY(50%);
  position: relative;
}

.slider {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 30px;
  box-shadow: 0 0 0 2px #777, 0 0 4px #777;
  cursor: pointer;
  border: 4px solid transparent;
  overflow: hidden;
  transition: 0.4s;
}
.slider:before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background: #777;
  border-radius: 30px;
  transform: translateX(-30px);
  transition: 0.4s;
}

input:checked + .slider:before {
  transform: translateX(30px);
  background: #2c7be5;
}
input:checked + .slider {
  box-shadow: 0 0 0 2px #2c7be5, 0 0 2px #2c7be5;
}
.modal-body {
  max-height: calc(100vh - 210px);
  overflow-y: auto;
}
.modal-open {
  overflow: scroll;
}


</style>