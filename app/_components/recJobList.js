fetch("https://www.zhipin.com/wapi/zpjob/job/recJobList", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en,zh-CN;q=0.9,zh;q=0.8",
      "priority": "u=1, i",
      "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "traceid": "F-d60f3bT085HqwpoU",
      "x-requested-with": "XMLHttpRequest",
      "zp_token": "V2Q9wkFO3_3VhgXdJtzB8fLSOw7DzezQ~~|Q9wkFO3_3VhgXdJtzB8fLSOw7DnXzA~~"
    },
    "referrer": "https://www.zhipin.com/web/frame/recommend/?filterParams=&t=&inspectFilterGuide=&version=7242&status=0&jobid=4bdc394870e4a2c403Z53N28EVdZ&source=0",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
  });
  

const recJobList = {
  "code": 0,
  "message": "Success",
  "zpData": {
      "onlineJobList": [
          {
              "encryptId": "4bdc394870e4a2c403Z53N28EVdZ",
              "jobName": "电商产品经理",
              "brandName": null,
              "proxyJob": 0,
              "locationName": "杭州",
              "salaryDesc": "20-35K",
              "refinedEntrance": 1,
              "workType": 0,
              "workTypeName": null,
              "cardTypes": null,
              "expireDesc": null,
              "expireType": 0,
              "expireDate": null,
              "jobType": 0,
              "hitFullPartTime": false,
              "positionCode": 110101
          },
          {
              "encryptId": "435d5714a68a7a8d03Vz2dS4FVVR",
              "jobName": "高级前端开发工程师",
              "brandName": null,
              "proxyJob": 0,
              "locationName": "杭州",
              "salaryDesc": "15-25K",
              "refinedEntrance": 1,
              "workType": 0,
              "workTypeName": null,
              "cardTypes": null,
              "expireDesc": null,
              "expireType": 0,
              "expireDate": null,
              "jobType": 0,
              "hitFullPartTime": false,
              "positionCode": 100901
          },
          {
              "encryptId": "3931883bf43e4c1603V_3t2_FlRZ",
              "jobName": "市场投放（英语、海外市场）",
              "brandName": null,
              "proxyJob": 0,
              "locationName": "杭州",
              "salaryDesc": "13-23K",
              "refinedEntrance": 1,
              "workType": 0,
              "workTypeName": null,
              "cardTypes": null,
              "expireDesc": null,
              "expireType": 0,
              "expireDate": null,
              "jobType": 0,
              "hitFullPartTime": false,
              "positionCode": 140608
          }
      ]
  }
}