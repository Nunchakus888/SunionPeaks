fetch("https://www.zhipin.com/wapi/zprelation/friend/getBossFriendListV2.json", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en,zh-CN;q=0.9,zh;q=0.8",
    "content-type": "application/x-www-form-urlencoded",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "traceid": "F-edf9387GB2LTRUwi",
    "x-requested-with": "XMLHttpRequest",
    "zp_token": "V2Q9wkFO3_3VhgXdJtzB8fLSOw7DzezQ~~|Q9wkFO3_3VhgXdJtzB8fLSOw7DnXzA~~"
  },
  "referrer": "https://www.zhipin.com/web/chat/recommend",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "friendIds=74721249&dzFriendIds=",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});

const response = {
  "code": 0,
  "message": "Success",
  "zpData": {
      "friendList": [
          {
              "friendSource": 0,
              "securityId": "LY9qrj1QSPmP1-L1twzJyO9_kegOH0VlC2Dd8YMoyCEkEceS-TJBoanLehUWaJKQVH7BqYJPia5WVMCToSEcfEzCYFFtKlwIsKlQJkyGN0Y2qwcbCdpr0O265yb3aiFJ8yxWEx5UPRQ1d0JeIIUGpo_lrAqK7LmGlD99VzWbLu9G-OTsRDt3YQ~~",
              "name": "刘坤",
              "avatar": "https://img.bosszhipin.com/beijin/upload/avatar/20250227/607f1f3d68754fd0a6470da3cd7fa0eb96057ba8758ad1fef0546ed855e7167dace8729b127d36dd_s.png.webp",
              "isTop": 0,
              "sourceTitle": "",
              "relationType": 0,
              "lastMsg": null,
              "lastMessageInfo": null,
              "lastTime": "10:29",
              "lastTS": 1742178580000,
              "sourceType": 1,
              "sourceExtend": null,
              "jobId": 419295571,
              "jobSource": 0,
              "encryptJobId": "435d5714a68a7a8d03Vz2dS4FVVR",
              "itemType": 0,
              "jobName": "高级前端开发工程师",
              "newGeek": 0,
              "filterReasonList": null,
              "relationLabelList": [
                  9
              ],
              "expectId": 1186920366,
              "encryptExpectId": null,
              "lastWorkExpr": null,
              "degree": null,
              "expectSalary": null,
              "uid": 32590206,
              "encryptUid": "88adfd69c44d3b061HZ_0t2_EFQ~",
              "isFiltered": false
          }
      ]
  }
}