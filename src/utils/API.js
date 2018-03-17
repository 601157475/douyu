// import R from 'ramda'
// import md5 from 'js-md5'
// const md5=require("js-md5")
// const R =require('ramda')
//根据指定参数返回相应api的完整地址
//请求基地址: http://capi.douyucdn.cn
// const BASE_URL="http://capi.douyucdn.cn";
// console.log(md5("xxas"))




//获取父频道
function getT1Live() {
    return "/api/v1/getColumnList"
}

//获取子频道(参1：父频道名;来自获取父频道对象中的short_name属性)
function getT2Live(short_name){
    return `/api/v1/getColumnDetail?shortName=${short_name}`
}

//获取父频道所有直播列表
// function getT1Room(cate_id,limit=20,offset=0){
//     return `/api/v1/getColumnRoom/${cate_id}?limit=${limit}&offset=${offset}`
// }    

// 获取子频道所有直播列表
// 从第 offset 个数据开始，获取 limit 个数据,通过返回的数组长度是否小于 limit 判断是否还有未获取到的数据 
// tag_id or short_name

function getT2Room(tag_id,limit=20,offset=0){
    return `/api/v1/live/${tag_id}?&limit=${limit}&offset=${offset}`
}

//获取房间信息(已挂)


//搜索直播间
function searchRoom(str,limit=20,offset=0){
    return `/api/v1/searchNew/${str}/1?limit=${limit}&offset=${offset}`
}

/*
//--------------------需登录验证-----------------------
//登录获取token
function login(usr,psw){
    const psw_md5=md5(psw);
    return `/api/v1/login?username=${usr}&password=${psw_md5}`
}

//获取个人信息
function getInfo(token){
    return `/api/v1/my_info?token=${token}`
}

//获取关注列表
function getAllReminds(token){
    return `/api/v1/remind_list?token=${token}&limit=10&offset=1`
}

//获取正在直播列表
function getLivingReminds(token,isLiving=true){
    return isLiving?`/api/v1/followRoom?token=${token}&live=1`:`/api/v1/followRoom?token=${token}&live=1`
}

//获取观看历史
function getHistory(token){
    return `/api/v1/history?token=${token}`
}



//----------error------
//取消关注
function delRemind(token,ids){
    return `/api/v1/follow/del`
}

*/

// 重写localStorage，改变发送消息 storageChanged
const setItem=localStorage.setItem;
const removeItem=localStorage.removeItem;
localStorage.setItem=function(k,v){
    const event=new Event("storageChanged");
    setItem.apply(this,arguments);
    window.dispatchEvent(event);
}

localStorage.removeItem=function(k){
    const event=new Event("storageChanged");
    removeItem.apply(this,arguments);
    window.dispatchEvent(event);
}

// 未来功能
// 等待更新
function handleFeature(e){
    alert('等待更新');
    e.preventDefault();
}
export {getT1Live,getT2Live,getT2Room,searchRoom,handleFeature}