import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


const state = {    
    user:"",     // 使用者id
    project:"",    //正在進行的計畫名稱
    token:"",
    
    today:""   //今日日期

}

const getters = {
    getUser (state) {
        console.log('[getters] getUser')
        return state.user;
    },

    getProject (state) {
        console.log('[getters] getProject')
        return state.project;
    },
    
    getToken (state) {
        console.log('[getters] getToken')
        return state.token;
    },

    getToday (state) {
        console.log('[getters] getToday')
        return state.today;
    }

}

const actions = {
    setUser({ commit }, user) {      //setUser
        console.log('[actions] setUser', user)
        commit('SET_USER', user)
    },

    setProject({ commit }, project) {      //setProject
        console.log('[actions] setProject', project)
        commit('SET_PROJECT', project)
    },
    
    setToken({ commit }, token) {      //setProject
        console.log('[actions] setToken', token)
        commit('SET_TOKEN', token)
    },

    setToday({ commit }) {      //setToday
        var date = new Date();
        console.log('date' + date);
        var separator = "-";
        var year = date.getFullYear();
        var month = 1 + date.getMonth();
        var day = date.getDate();
        if(month<10){
            month="0"+month;
        }
        if(day<10){
            day="0"+day;
        }
        var currentDate = year + separator + month + separator + day;
        console.log("currentdate:" + currentDate);

        console.log('[actions] setToday');
        commit('SET_TODAY', currentDate);
    }


}

const mutations = {
    ['SET_USER'] (state, user) {
        state.user = user
    },

    ['SET_PROJECT'] (state, project) {
        state.project = project
    },
    
    ['SET_TOKEN'] (state, token) {
        state.token = token
    },

    ['SET_TODAY'] (state, today) {
        state.today = today
    }



}


export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})