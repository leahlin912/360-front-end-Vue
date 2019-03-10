import Vue from 'vue'
import Router from 'vue-router'
import {setCookie,getCookie} from '../cookies/cookiemethods.js'

// import HelloWorld from '@/components/HelloWorld'
import LogIn from '@/components/LogIn'
import HomePage from '@/components/HomePage'
import NavbarNew from '../components/NavbarNew.vue'
import SideBar from '../components/SideBar.vue'

import SelfInfo from '@/components/employee/SelfInfo'
import SelfChooseEvaluator from '@/components/employee/SelfChooseEvaluator'
import EvaluationEntry from '@/components/employee/EvaluationEntry'
import DoEvaluation from '../components/employee/DoEvaluation.vue'
import DoEvaluationNew from '../components/employee/DoEvaluationNew.vue'
import WatchAnswer from '../components/employee/WatchAnswer.vue'
import ResultEntry from '@/components/employee/ResultEntry'
import HistoryGiveEvaluation from '../components/employee/HistoryGiveEvaluation.vue'
import SelfResult from '@/components/employee/SelfResult'
import PersonalReport from '@/components/employee/PersonalReport'

import ConfirmEvaluator from '@/components/director/ConfirmEvaluator'
import HistoryEvaluator from '@/components/director/HistoryEvaluator'
import DptResult from '@/components/director/DptResult'
import SubordinateResult from '@/components/director/SubordinateResult'

import QuestionsPool from'@/components/HR/QuestionsPool'
import ProjectManagement from '@/components/HR/ProjectManagement'
import EvaluatorManagement from '@/components/HR/EvaluatorManagement'
import EvaluateStatusManagement from '@/components/HR/EvaluateStatusManagement'
import ProjectEdit from '@/components/HR/ProjectEdit'
import ProjectCreate from '@/components/HR/ProjectCreate'
import EmployeeData from '@/components/HR/EmployeeData'
import HistoricalProjects from '@/components/HR/HistoricalProjects'
import ProjectReport from '@/components/HR/ProjectReport'
import CurrentProject from '@/components/HR/CurrentProject'
import System4_1 from "@/components/system/System4_1"
import System4_2 from "@/components/system/System4_2"
import SystemPage4_3 from "@/components/system/SystemPage4_3"
import SystemPage4_4 from "@/components/system/SystemPage4_4"
import test from '@/components/HR/test'
import store from '../store'; 

Vue.use(Router)

// export default new Router({
const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'LogIn',
      component: LogIn
    },    
    {
      path: '/HomePage',
      meta: {
        requireAuth: true
      },
      name: 'HomePage',  //首頁
      components:{ 
        default: HomePage,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },    
    {
      path:'/SelfInfo',
      meta: {
        requireAuth: true
      },
      name: 'SelfInfo',   //1-1 選擇評量者
      components:{ 
        default: SelfInfo,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },    
    {
      path:'/SelfChooseEvaluator',
      meta: {
        requireAuth: true
      },
      name: 'SelfChooseEvaluator',   //1-2 選擇評量者
      components:{ 
        default: SelfChooseEvaluator,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },    
    {
      path:'/EvaluationEntry',
      meta: {
        requireAuth: true
      },
      name: 'EvaluationEntry',   //1-3 360度回饋評量
      components:{ 
        default: EvaluationEntry,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/EvaluationEntry/DoEvaluation',
      meta: {
        requireAuth: true
      },
      name: 'DoEvaluation',   //1-3-1 進行評量
      components:{ 
        default: DoEvaluation,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/EvaluationEntry/DoEvaluationNew',
      meta: {
        requireAuth: true
      },
      name: 'DoEvaluationNew',   //1-3-1 進行評量
      components:{ 
        default: DoEvaluationNew,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/EvaluationEntry/WatchAnswer',
      meta: {
        requireAuth: true
      },
      name: 'WatchAnswer',     //1-3-2 查看目前回應
      components:{ 
        default: WatchAnswer,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/HistoryGiveEvaluation',
      meta: {
        requireAuth: true
      },
      name: 'HistoryGiveEvaluation',   //1-4 歷史互評紀錄
      components:{ 
        default: HistoryGiveEvaluation,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/test',
      meta: {
        requireAuth: false
      },
      name: 'test',   
      components:{ 
        default: test,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/ResultEntry',
      meta: {
        requireAuth: true
      },
      name: 'ResultEntry',   //1-5 查看受評結果查詢頁
      components:{ 
        default: ResultEntry,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/SelfResult',
      meta: {
        requireAuth: true
      },
      name: 'SelfResult',   //1-5-1 受評結果
      components:{ 
        default: SelfResult,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/ConfirmEvaluator',
      meta: {
        requireAuth: true
      },
      name: 'ConfirmEvaluator',   //2-1 審核評量下屬者
      components:{ 
        default: ConfirmEvaluator,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/HistoryEvaluator',
      meta: {
        requireAuth: true
      },
      name: 'HistoryEvaluator',   //2-2 查看評量下屬者
      components:{ 
        default: HistoryEvaluator,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/DptResult',
      meta: {
        requireAuth: true
      },
      name: 'DptResult',   //2-3 查看評量部門評量結果
      components:{ 
        default: DptResult,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/SubordinateResult',
      meta: {
        requireAuth: true
      },
      name: 'SubordinateResult',   //2-4 查看評量部門評量結果
      components:{ 
        default: SubordinateResult,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/EmployeeData',
      meta: {
        requireAuth: true
      },
      name: 'EmployeeData',
      components:{ 
        default: EmployeeData,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/QuestionsPool',
      meta: {
        requireAuth: true
      },
      name: 'QuestionsPool',
      components:{ 
        default: QuestionsPool,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/HistoricalProjects',
      meta: {
        requireAuth: true
      },
      name: 'HistoricalProjects',
      components:{ 
        default: HistoricalProjects,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/ProjectManagement',
      meta: {
        requireAuth: true
      },
      name: 'ProjectManagement',
      components:{ 
        default: ProjectManagement,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/CurrentProject',
      meta: {
        requireAuth: true
      },
      name: 'CurrentProject',
      components:{ 
        default: CurrentProject,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/ProjectManagement/ProjectEdit',
      meta: {
        requireAuth: true
      },
      name: 'ProjectEdit',
      components:{ 
        default: ProjectEdit,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/ProjectManagement/ProjectCreate',
      meta: {
        requireAuth: true
      },
      name: 'ProjectCreate',
      components:{ 
        default: ProjectCreate,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/EvaluatorManagement',
      meta: {
        requireAuth: true
      },
      name: 'EvaluatorManagement',
      components:{ 
        default: EvaluatorManagement,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/EvaluateStatusManagement',
      meta: {
        requireAuth: true
      },
      name: 'EvaluatorEvaluateStatusManagementStatus',
      components:{ 
        default: EvaluateStatusManagement,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/ProjectReport',
      meta: {
        requireAuth: true
      },
      name: 'ProjectReport',
      components:{ 
        default: ProjectReport,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/System4_1',
      meta: {
        requireAuth: true
      },
      name: 'System4_1',
      components:{ 
        default: System4_1,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/System4_2',
      meta: {
        requireAuth: true
      },
      name: 'System4_2',
      components:{ 
        default: System4_2,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/SystemPage4_3',
      meta: {
        requireAuth: true
      },
      name: 'SystemPage4_3',
      components:{ 
        default: SystemPage4_3,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/SystemPage4_4',
      meta: {
        requireAuth: true
      },
      name: 'SystemPage4_4',
      components:{ 
        default: SystemPage4_4,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
    {
      path:'/PersonalReport',
      meta: {
        requireAuth: true
      },
      name: 'PersonalReport',
      components:{ 
        default: PersonalReport,
        navbarnew: NavbarNew,
        sidebar: SideBar
      }
    },
  ]
})

router.beforeEach((to, from, next) => { 
  let token = getCookie('Token');
  console.log(token)

  //從sessionStorage 存入 vuex--s--
  let winToken = window.sessionStorage.getItem('token');
  let winUser = window.sessionStorage.getItem('user');
  let winProject = window.sessionStorage.getItem('project');
  let winToday = window.sessionStorage.getItem('today');

  if(!store.state.user && winToken && winToken != 'undefined')
    setCookie('Token', JSON.parse(winToken), 60*60);

  if(!store.state.user && winUser && winUser != 'undefined')
    store.dispatch('setUser',JSON.parse(winUser));

  if(!store.state.project && winProject && winProject != 'undefined')
    store.dispatch('setProject',JSON.parse(winProject)); 
  
  if(!store.state.today && winToday && winToday != 'undefined')
    store.dispatch('setToday',winToday); 
  //從sessionStorage 存入 vuex--e--

  if (to.meta.requireAuth) {
    if (store.state.user) {
      next();
    } else {
      next({path:'/'});
    }
  } else {
    next();
  }

  
}
)


export default router;

