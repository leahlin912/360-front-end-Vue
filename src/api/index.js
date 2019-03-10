import axios from "axios";
import qs from "qs";

let axiosBase = () => {
    return axios.create({
        crossDomain: true,
        async: true,
        baseURL: "http://35.194.169.85:3000",//35.194.169.85
        headers: {
            //token
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    });
};

const test = () => {
    return axiosBase().get("/api");
};

const employee_add = (jsonObj) => {      //新增一個會員
    return axiosBase().post("/api/employee/add", qs.stringify(jsonObj));
};


const bulletinboard_get = () => {     //取得公佈欄資料
    return axiosBase().get("/api/billboard/getList");
};

const bulletinboard_add = (jsonObj) => {      //新增一個公告項目
    return axiosBase().post("/api/billboard/add", qs.stringify(jsonObj));
};

const bulletinboard_update = (jsonObj)=>{  //更新一個公告欄項目
    return axiosBase().post("api/billboard/upd", qs.stringify(jsonObj));
}

const bulletinboard_delete = (jsonObj)=>{  //刪除一個公告欄項目
    return axiosBase().post("api/billboard/del", qs.stringify(jsonObj));
}

const myevaluators_get = (jsonObj) => {   //取得自己選擇的專案關係人
    return axiosBase().post("/api/evaluationList/getList", qs.stringify(jsonObj));
};

const myevaluators_update = (jsonObj) => {   //新增/修改自己選擇的專案關係人
    return axiosBase().post("/api/evaluationList/updEvaluationList", qs.stringify(jsonObj));
};

const subEvaluationList_get = (jsonObj) => {   //主管查看下屬選擇的專案關係人
    return axiosBase().post("/api/evaluationList/getSubEvaluationList", qs.stringify(jsonObj));
};

const updSubEvaluationListStatus = (jsonObj) => {   //新增/修改自己選擇的專案關係人
    return axiosBase().post("/api/evaluationList/updSubEvaluationListStatus", qs.stringify(jsonObj));
};

const getAssessmentList = (jsonObj) => {   //取得需要評量的對象
    return axiosBase().post("/api/assessment/getAssessmentList", qs.stringify(jsonObj));
};

const getAssessmentResult = (jsonObj) => {   //取得評量結果
    return axiosBase().post("api/assessment/getAssessmentResult", qs.stringify(jsonObj));
};

const getAssessmentResultList = (jsonObj) => {   //取得部門專案結果
    return axiosBase().post("/api/assessmentResultOfDep/getAssessmentResultList", qs.stringify(jsonObj));
};

const updAssessment = (jsonObj) => {    //新增/更新評量回應
    return axiosBase().post("/api/assessment/updAssessment", qs.stringify(jsonObj));
};

const getHistoricalRecordOfTopicRes = (jsonObj) => {   //登入者歷史互評紀錄
    return axiosBase().get("/api/assessment/getHistoricalRecordOfTopicRes/" + jsonObj.user_id);
}

const getHistoricalProject = (jsonObj) => {    //取得登入者評量過的專案清單
    return axiosBase().get("/api/pro_topic_res/getHistoricalProject/" + jsonObj.user_id);
};


const employee_importAll = () => {      //新增csv會員檔案
    return axiosBase().post("/api/employee/importAllEmployees");
};

const employee_get = (jsonObj) => {      //用Oid去得到會員
    return axiosBase().post("/api/employee/get", qs.stringify(jsonObj));
};

const employees_getAll = () => {        //得到所有會員
    return axiosBase().post("/api/employee/getEmployees")
};

const employee_update = (jsonObj) => {      //用Oid人資修改會員資料
    return axiosBase().post("/api/employee/update", qs.stringify(jsonObj));
};

const employee_delete = (jsonObj) =>{       //用Oid刪除會員
    return axiosBase().delete("/api/employee/delete/" + jsonObj._id);
};

//用企業_id 取得企業
const enterprise_get = (jsonObj) => {
    return axiosBase().post("/api/enterprise/get", qs.stringify(jsonObj));
};

const department_getDepartments = () => { //取得所有部門
    return axiosBase().post("/api/department/getDepartments");
};

//要給企業_id 新增部門
const department_add = (jsonObj) => {
    return axiosBase().post("/api/department/add", qs.stringify(jsonObj));
}

//輸入_id刪除部門
const department_delete = (jsonObj) => {
    return axiosBase().delete("/api/department/delete/"+ jsonObj._id);
}

const topic_add = (jsonObj) => {       //新增題目
    return axiosBase().post("/api/topic/add", qs.stringify(jsonObj));
};

const topic_get = (jsonObj) => {        //用Oid找到對應的題目
    return axiosBase().post("/api/topic/get", qs.stringify(jsonObj));
}

const topic_getAll = () => {        //取得全部的題目
    return axiosBase().post("/api/topic/getTopics");
};

const topic_update = (jsonObj) => {        //用Oid去更新題目
    return axiosBase().post("/api/topic/update", qs.stringify(jsonObj));
};

const topic_delete = (jsonObj) => {        //用Oid去刪除題目
    return axiosBase().delete("/api/topic/delete/" + jsonObj._id);
}
//新增專案
const project_add = (jsonObj) => {          
    return axiosBase().post("/api/project/add", qs.stringify(jsonObj));
}
//用Oid取得專案
const project_get = (jsonObj) => {          
    return axiosBase().post("/api/project/get", qs.stringify(jsonObj));
};
//取得所有專案
const project_getAll = () => {
    return axiosBase().post("/api/project/getProjects");
}
//用Oid更新專案
const project_update = (jsonObj) => {
    return axiosBase().post("/api/project/update", qs.stringify(jsonObj));
};
//用Oid刪除專案
const project_delete = (jsonObj) => {
    return axiosBase().delete("/api/project/delete/"+ jsonObj._id);
}

//系統參數設定可以傳當前的ProjectOid
const parameter_update = (jsonObj) => {
    return axiosBase().post("/api/parameter/update", qs.stringify(jsonObj));
}

//取得系統的狀態 包含ProjectOid
const parameter_get = () => {
    return axiosBase().post("/api/parameter/getParameters");
}

//改變4-1狀態的API
const parameter_setSatus = (jsonObj) => {
    return axiosBase().post("/api/parameter/setParametersStatus", qs.stringify(jsonObj));
}

//取得人資看到所有評量活動狀態的API
const evaluationList_getAll = (jsonObj) => {
    return axiosBase().post("/api/evaluationList/getEvaluations", qs.stringify(jsonObj));
}
//用專案Oid獲得某個專案的所有人的“第一階段-選擇評量人狀態”  
const evaluationList_getAllFirstStatus = (jsonObj) => {
    return axiosBase().post("/api/evaluationList/getAllFirstStatus", qs.stringify(jsonObj));
}
//傳入專案Oid跟受評人Oid人資修更新某個人的自選評量關係人
const evaluationList_HRUpdate = (jsonObj) => {
    return axiosBase().post("/api/evaluationList/HRUpdateEvaluationList", qs.stringify(jsonObj));
}
//輸入專案Oid取得所有評量人的狀態
const evaluationList_getAllSecondStatusMembers = (jsonObj) => {
    return axiosBase().post("/api/evaluationList/getAllSecondStatusMembers", qs.stringify(jsonObj));
}
//傳入評量人Oid取得這個評量人要評的受評人資料
const evaluationList_getSecondStatus_be_evaluated = (jsonObj) => {
    return axiosBase().post("/api/evaluationList/getSecondStatus_be_evaluated", qs.stringify(jsonObj));
}
//新增問題能力的API
const ability_add = (jsonObj) => {
    return axiosBase().post("/api/ability/add", qs.stringify(jsonObj));
}
//用Oid刪除問題能力的API
const ability_delete = (jsonObj) => {
    return axiosBase().delete("/api/ability/delete/" + jsonObj._id);
}
//取得所有問題能力的API
const ability_getAll = () => {
    return axiosBase().post("/api/ability/getAbilitys");
}
//取得全部員工的專案結果
const getAllAssessmentResult = (jsonObj) => {  
    return axiosBase().get("/api/assessment/getAllAssessmentResult/" + jsonObj._id);
}
//取得全部專案PR
const getProject_pr = () => {
    return axiosBase().post("/api/project_pr/getProject_pr");
}

//取得4-2權限
const purview_getAll = () => {
    return axiosBase().post("/api/purview/getPurviews");
}

//刪除4-2權限
const purview_delete = (jsonObj) => {
    return axiosBase().delete("/api/purview/delete/" + jsonObj._id);
}

//新增4-2權限
const purview_add = (jsonObj) => {
    return axiosBase().post("/api/purview/add", qs.stringify(jsonObj));
}

//設定4-3Purview 輸入員工_id 以及輸入 purview的Oid設定員工權限
const purview_setPurview = (jsonObj) => {
    return axiosBase().post("/api/employee/setPurview", qs.stringify(jsonObj));
}

//取得4-2所有的system_code
const system_code_getAll = () => {
    return axiosBase().post("/api/system_code/getSystem_codes");
}
//取得所有的
const prCal=(jsonObj)=>{
    return axiosBase().get("/api/project_pr/prCal/" + jsonObj._id);
}

//寄送email
const sendMail = (jsonObj) => {
    return axiosBase().post("/api/sendMail", qs.stringify(jsonObj));
}

//輸入專案取得專案評量人是否完成的狀態
const evaluationList_getProject_status = (jsonObj) => {
    return axiosBase().post("/api/evaluationList/getProject_status", qs.stringify(jsonObj));
}


export default {
    test,
    employee_add,
    myevaluators_get,
    myevaluators_update,
    subEvaluationList_get,
    updSubEvaluationListStatus,
    bulletinboard_get,
    bulletinboard_add,
    bulletinboard_update,
    bulletinboard_delete,
    enterprise_get,
    department_getDepartments,
    department_add,
    department_delete,
    getAssessmentList,
    updAssessment,
    getHistoricalRecordOfTopicRes,
    getAssessmentResult,
    getAssessmentResultList,
    getHistoricalProject,
    employee_importAll,
    employee_get,
    employees_getAll,
    employee_update,
    employee_delete,
    topic_add,
    topic_get,
    topic_getAll,
    topic_update,
    topic_delete,
    project_add,
    project_get,
    project_getAll,
    project_update,
    project_delete,
    parameter_update,
    parameter_get,
    parameter_setSatus,
    evaluationList_getAll,
    evaluationList_getAllFirstStatus,
    evaluationList_HRUpdate,
    evaluationList_getAllSecondStatusMembers,
    evaluationList_getSecondStatus_be_evaluated,
    evaluationList_getProject_status,
    ability_add,
    ability_delete,
    ability_getAll,
    getProject_pr,
    getAllAssessmentResult,
    purview_getAll,
    purview_delete,
    purview_add,
    purview_setPurview,
    system_code_getAll,
    prCal,
    sendMail
}