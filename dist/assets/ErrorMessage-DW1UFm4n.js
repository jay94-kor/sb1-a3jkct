import{a as n}from"./axios-CCb-kr4I.js";import{j as o,c,m as p}from"./tremor-DuBm45GE.js";const a=n.create({baseURL:"http://localhost:5000/api",timeout:1e4,headers:{"Content-Type":"application/json"}});a.interceptors.response.use(t=>t,t=>{var s,r;const e=((r=(s=t.response)==null?void 0:s.data)==null?void 0:r.message)||"서버와의 통신 중 오류가 발생했습니다.";throw console.error("API Error:",e),new Error(e)});const g={getAll:async()=>{const{data:t}=await a.get("/projects");return t},getById:async t=>{const{data:e}=await a.get(`/projects/${t}`);return e},create:async t=>{const{data:e}=await a.post("/projects",t);return e}},u={getOverview:async()=>{const{data:t}=await a.get("/budgets/overview");return t},getAlerts:async()=>{const{data:t}=await a.get("/budgets/alerts");return t}},l={getAll:async(t=1)=>{const{data:e}=await a.get(`/pos?page=${t}`);return e},create:async t=>{const{data:e}=await a.post("/pos",t);return e},update:async t=>{const{data:e}=await a.put(`/pos/${t.id}`,t);return e}};function w({message:t}){return o.jsx(c,{className:"bg-red-50 border-red-100",children:o.jsx(p,{className:"text-red-700",children:t})})}export{w as E,l as a,u as b,g as p};