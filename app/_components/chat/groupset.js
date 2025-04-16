

fetch("https://www.zhipin.com/wapi/zprelation/relation/groupset.json", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en,zh-CN;q=0.9,zh;q=0.8",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "traceid": "F-1d9ae8kenkkxVOcz",
    "x-requested-with": "XMLHttpRequest",
    "zp_token": "V2Q9wkFO3_3VhgXdJtzB8fLSOw7DzSzA~~|Q9wkFO3_3VhgXdJtzB8fLSOw7DvUwQ~~"
  },
  "referrer": "https://www.zhipin.com/web/chat/index",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "relationType=8&from=2&geekId=b3d89cd5774727480XV90tS5GVRT",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});

/**
 * 5: "未处理",
 * 6: "沟通中",
 * 7: "合适",
 * 8: "不合适",
 * 9: "已约面",
 * default: "等待回复"
 */

// const geekId = info.encryptUid

const res = {"code":0,"message":"Success","zpData":true}