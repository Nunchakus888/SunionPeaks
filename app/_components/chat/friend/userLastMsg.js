
fetch("https://www.zhipin.com/wapi/zpchat/boss/userLastMsg", {
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
    "traceid": "F-7c9ff9AstvzKOtef",
    "x-requested-with": "XMLHttpRequest",
    "zp_token": "V2Q9wkFO3_3VhgXdJtzB8fLSOw7DzTwA~~|Q9wkFO3_3VhgXdJtzB8fLSOw7DzVzA~~"
  },
  "referrer": "https://www.zhipin.com/web/chat/index",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "src=0&friendIds=515112517%2C588192751%2C28049630%2C43187628%2C583635973%2C119625725%2C97811056%2C588152922%2C60208873%2C60157010%2C43810301%2C48802800%2C44922304%2C546703217%2C93234428%2C21449886%2C116147335%2C509469842%2C505746447%2C640550768%2C39485945%2C48384980%2C537003506%2C13225598%2C67580119%2C103152985%2C76096582%2C30799409%2C79376578%2C65021948%2C29754696%2C51340703",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});


/**
 * src: 0
 * friendIds
 * 515112517,588192751,28049630,43187628,583635973,119625725,97811056,588152922,60208873,60157010,43810301,48802800,44922304,546703217,93234428,21449886,116147335,509469842,505746447,640550768,39485945,48384980,537003506,13225598,67580119,103152985,76096582,30799409,79376578,65021948,29754696,51340703
 * 
 */



/**
 * userLastMsg
 * 
 * lastMsgInfo 
 * 
 * msgId
 * encryptMsgId
 * showText
 * fromId
 * toId
 * status
 *  0: 已读
 *  1: 已读?
 *  2: 未读?
 * msgTime
 * lastTS
 */

const res = {
  "code": 0,
  "message": "Success",
  "zpData": [
      {
          "lastTime": "昨天",
          "uid": 515112517,
          "lastMsgInfo": {
              "msgId": 193047622104833,
              "encryptMsgId": "e25ed176c5e1c5b81n1529m6FlBSw4y7Wfmc",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 515112517,
              "status": 2,
              "msgTime": 1742269967115
          },
          "encryptUid": "f5bfd953e9719cf30nV_2ty_FVNX",
          "lastTS": 1742269967115
      },
      {
          "lastTime": "昨天",
          "uid": 588192751,
          "lastMsgInfo": {
              "msgId": 193047566489090,
              "encryptMsgId": "1d51ad7dbb2c6abb1n1529m6FVRWxoS2UfOf",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 588192751,
              "status": 2,
              "msgTime": 1742269953537
          },
          "encryptUid": "29fe3adc24cd51d10nxy2tS_F1dR",
          "lastTS": 1742269953537
      },
      {
          "lastTime": "昨天",
          "uid": 28049630,
          "lastMsgInfo": {
              "msgId": 193047471625731,
              "encryptMsgId": "bda2c1f844fbef921n1529m6FFVRxI66Vvme",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 28049630,
              "status": 2,
              "msgTime": 1742269930377
          },
          "encryptUid": "c80e4e2f601d92011Xx639S7E1I~",
          "lastTS": 1742269930377
      },
      {
          "lastTime": "昨天",
          "uid": 43187628,
          "lastMsgInfo": {
              "msgId": 193047134680065,
              "encryptMsgId": "28177e4ff068ce911n1529m6EVFUxIS_Ufya",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 43187628,
              "status": 2,
              "msgTime": 1742269848115
          },
          "encryptUid": "f5fceb05bcaa742603d709q7Elo~",
          "lastTS": 1742269848115
      },
      {
          "lastTime": "昨天",
          "uid": 583635973,
          "lastMsgInfo": {
              "msgId": 193047081621258,
              "encryptMsgId": "6537fa525c14ad1e1n1529m6EFpRxI6-U_-X",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 583635973,
              "status": 2,
              "msgTime": 1742269835161
          },
          "encryptUid": "3eb0e5bc68a7113a0nx53d64GVVT",
          "lastTS": 1742269835161
      },
      {
          "lastTime": "昨天",
          "uid": 119625725,
          "lastMsgInfo": {
              "msgId": 193046995748353,
              "encryptMsgId": "9bcba4dfa5fbed7b1n1529m7GVtVxYi3Uv-c",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 119625725,
              "status": 2,
              "msgTime": 1742269814196
          },
          "encryptUid": "edfbbef818e3bc5e1nVz3d-4F1BV",
          "lastTS": 1742269814196
      },
      {
          "lastTime": "昨天",
          "uid": 97811056,
          "lastMsgInfo": {
              "msgId": 193046782539009,
              "encryptMsgId": "2f6b0dde3b199f341n1529m7F1pSx4-2UfqW",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 97811056,
              "status": 1,
              "msgTime": 1742269762142
          },
          "encryptUid": "43eaa1b74ef477543nNy2ty9FVQ~",
          "lastTS": 1742269762142
      },
      {
          "lastTime": "昨天",
          "uid": 588152922,
          "lastMsgInfo": {
              "msgId": 193046708847618,
              "encryptMsgId": "e3c18fdd6a88e9691n1529m7F1JYyoi4V_uX",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 588152922,
              "status": 1,
              "msgTime": 1742269744151
          },
          "encryptUid": "a7cb30ade59110d10nxy2ti_GVBS",
          "lastTS": 1742269744151
      },
      {
          "lastTime": "昨天",
          "uid": 60208873,
          "lastMsgInfo": {
              "msgId": 193046540822280,
              "encryptMsgId": "ef2ca1eee4e0b5801n1529m7FVZQyo69U_Kf",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 60208873,
              "status": 1,
              "msgTime": 1742269703130
          },
          "encryptUid": "b1c12e316e191fb30XR429W1F1E~",
          "lastTS": 1742269703130
      },
      {
          "lastTime": "昨天",
          "uid": 60157010,
          "lastMsgInfo": {
              "msgId": 193046434661903,
              "encryptMsgId": "63ab6c2ffe11a71a1n1529m7FFFUxIq-WPqc",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 60157010,
              "status": 1,
              "msgTime": 1742269677212
          },
          "encryptUid": "18f860a38e246a430XR73tq9EVI~",
          "lastTS": 1742269677212
      },
      {
          "lastTime": "昨天",
          "uid": 43810301,
          "lastMsgInfo": {
              "msgId": 193046386566658,
              "encryptMsgId": "03f3a8e1419425871n1529m7E1pWx4q5V_-X",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 43810301,
              "status": 2,
              "msgTime": 1742269665470
          },
          "encryptUid": "de1cd0c2c60fbf9603dy2t2-EFM~",
          "lastTS": 1742269665470
      },
      {
          "lastTime": "昨天",
          "uid": 48802800,
          "lastMsgInfo": {
              "msgId": 193046016521730,
              "encryptMsgId": "49b89360e827527e1n1529m7EFNWx46-Vvmf",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 48802800,
              "status": 1,
              "msgTime": 1742269575127
          },
          "encryptUid": "c94aced9946bde4d03xy29-1EFI~",
          "lastTS": 1742269575127
      },
      {
          "lastTime": "昨天",
          "uid": 44922304,
          "lastMsgInfo": {
              "msgId": 193045939868936,
              "encryptMsgId": "58cfdf1e2daec7791n1529m4GVFZyoq3WPmZ",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 44922304,
              "status": 2,
              "msgTime": 1742269556413
          },
          "encryptUid": "4e0b51698147cc4903Bz2d--EFY~",
          "lastTS": 1742269556413
      },
      {
          "lastTime": "昨天",
          "uid": 546703217,
          "lastMsgInfo": {
              "msgId": 193045873899267,
              "encryptMsgId": "95722e3a572092031n1529m4GFVTyoW2U_yY",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 546703217,
              "status": 2,
              "msgTime": 1742269540307
          },
          "encryptUid": "081199fff1cfff560nB83N2-ElNX",
          "lastTS": 1742269540307
      },
      {
          "lastTime": "昨天",
          "uid": 93234428,
          "lastMsgInfo": {
              "msgId": 193045795349505,
              "encryptMsgId": "0869de8da6a904631n1529m4F1tVwYi2VPqa",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 93234428,
              "status": 2,
              "msgTime": 1742269521129
          },
          "encryptUid": "431a45d50a65a0793nd42Nm5Elo~",
          "lastTS": 1742269521129
      },
      {
          "lastTime": "昨天",
          "uid": 21449886,
          "lastMsgInfo": {
              "msgId": 193045729883396,
              "encryptMsgId": "0af1b014a33612be1n1529m4F1BZyoS8UvOZ",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 21449886,
              "status": 2,
              "msgTime": 1742269505146
          },
          "encryptUid": "f75722a66ce599171XV-39S1GFQ~",
          "lastTS": 1742269505146
      },
      {
          "lastTime": "昨天",
          "uid": 116147335,
          "lastMsgInfo": {
              "msgId": 193045472335364,
              "encryptMsgId": "9de34670f9c880bc1n1529m4FFVSwY-6Uvyb",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 116147335,
              "status": 2,
              "msgTime": 1742269442269
          },
          "encryptUid": "ab0ca6328ca6a14c1nV82tm6E1FV",
          "lastTS": 1742269442269
      },
      {
          "lastTime": "昨天",
          "uid": 509469842,
          "lastMsgInfo": {
              "msgId": 193045013545987,
              "encryptMsgId": "c2967b4376dd44091n1529m4EFNTx4i6WPKY",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 509469842,
              "status": 2,
              "msgTime": 1742269330260
          },
          "encryptUid": "95ff1ace060623cf0nRz39u0GFZS",
          "lastTS": 1742269330260
      },
      {
          "lastTime": "昨天",
          "uid": 505746447,
          "lastMsgInfo": {
              "msgId": 193044623914755,
              "encryptMsgId": "5e6a5616197fac001n1529m5FlBTy427Vv-a",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 505746447,
              "status": 2,
              "msgTime": 1742269235135
          },
          "encryptUid": "49d58eb7f2fbdc0b0nR_3Nm7FFZX",
          "lastTS": 1742269235135
      },
      {
          "lastTime": "昨天",
          "uid": 640550768,
          "lastMsgInfo": {
              "msgId": 193044529837058,
              "encryptMsgId": "3a432c68fa5627571n1529m5FVBZyo-4Uf-X",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 640550768,
              "status": 2,
              "msgTime": 1742269212167
          },
          "encryptUid": "ba43e6ad12d2654e0XB63ti9F1RY",
          "lastTS": 1742269212167
      },
      {
          "lastTime": "昨天",
          "uid": 39485945,
          "lastMsgInfo": {
              "msgId": 193044406834688,
              "encryptMsgId": "9d1532c6195e6e571n1529m5FFJWyo-7V_KX",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 39485945,
              "status": 2,
              "msgTime": 1742269182136
          },
          "encryptUid": "efee982b575b1e5a1H1-09i0FFc~",
          "lastTS": 1742269182136
      },
      {
          "lastTime": "昨天",
          "uid": 48384980,
          "lastMsgInfo": {
              "msgId": 193044353521156,
              "encryptMsgId": "46b0f487afa23da51n1529m5E1dTx46-UP-Z",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 48384980,
              "status": 2,
              "msgTime": 1742269169121
          },
          "encryptUid": "64e9bd837a295b8b03x509m0GFI~",
          "lastTS": 1742269169121
      },
      {
          "lastTime": "昨天",
          "uid": 537003506,
          "lastMsgInfo": {
              "msgId": 193044152808707,
              "encryptMsgId": "430bb2206c9d50961n1529m5EVdSyoy3VvqY",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 537003506,
              "status": 2,
              "msgTime": 1742269120119
          },
          "encryptUid": "f6374c21a50895e30nd9292-FVJW",
          "lastTS": 1742269120119
      },
      {
          "lastTime": "昨天",
          "uid": 13225598,
          "lastMsgInfo": {
              "msgId": 193044046669059,
              "encryptMsgId": "dff26916e17968231n1529m5EFZWxIq2Uf-W",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 13225598,
              "status": 2,
              "msgTime": 1742269094206
          },
          "encryptUid": "71ac5ea890c02cba1nd42di4GVo~",
          "lastTS": 1742269094206
      },
      {
          "lastTime": "昨天",
          "uid": 67580119,
          "lastMsgInfo": {
              "msgId": 193043931133701,
              "encryptMsgId": "bfe4636f9f9210b51n1529m-GVFRw4-8Vvqe",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 67580119,
              "status": 2,
              "msgTime": 1742269065999
          },
          "encryptUid": "e72c98de1a83dbbd0XN_0928EVs~",
          "lastTS": 1742269065999
      },
      {
          "lastTime": "昨天",
          "uid": 103152985,
          "lastMsgInfo": {
              "msgId": 193043849700867,
              "encryptMsgId": "33eedfe3ed1edbdf1n1529m-GFZZxYy_WfyY",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 103152985,
              "status": 2,
              "msgTime": 1742269046118
          },
          "encryptUid": "a65f3b8770ad9c971nR52ti_GVpV",
          "lastTS": 1742269046118
      },
      {
          "lastTime": "昨天",
          "uid": 76096582,
          "lastMsgInfo": {
              "msgId": 193043771798531,
              "encryptMsgId": "e260447aa779dd6f1n1529m-F1VRxYW3VPme",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 76096582,
              "status": 2,
              "msgTime": 1742269027098
          },
          "encryptUid": "8eda8e25711366b00HJ60tu4GFA~",
          "lastTS": 1742269027098
      },
      {
          "lastTime": "昨天",
          "uid": 30799409,
          "lastMsgInfo": {
              "msgId": 193043685660419,
              "encryptMsgId": "d3018acf03f3e2b01n1529m-FlpVxIq_VfuW",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 30799409,
              "status": 2,
              "msgTime": 1742269006069
          },
          "encryptUid": "90c5b0f23519b5bc1HR90tS5EFs~",
          "lastTS": 1742269006069
      },
      {
          "lastTime": "昨天",
          "uid": 79376578,
          "lastMsgInfo": {
              "msgId": 193043608032258,
              "encryptMsgId": "cba1f97349df9e591n1529m-FlJYwo-9U_-X",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 79376578,
              "status": 2,
              "msgTime": 1742268987117
          },
          "encryptUid": "07843b12afb8c8f20H153Nu4F1o~",
          "lastTS": 1742268987117
      },
      {
          "lastTime": "昨天",
          "uid": 65021948,
          "lastMsgInfo": {
              "msgId": 193043370578949,
              "encryptMsgId": "96cc536acd90dfe21n1529m-E1VQx4u3WP6W",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 65021948,
              "status": 2,
              "msgTime": 1742268929145
          },
          "encryptUid": "7298c2122b30e2510XF62dy0FFo~",
          "lastTS": 1742268929145
      },
      {
          "lastTime": "昨天",
          "uid": 29754696,
          "lastMsgInfo": {
              "msgId": 193043292763394,
              "encryptMsgId": "348e476ebdcbecd91n1529m-EltSxYq8UvOb",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 29754696,
              "status": 2,
              "msgTime": 1742268910146
          },
          "encryptUid": "9446b2a663d393e21X193tm7GVQ~",
          "lastTS": 1742268910146
      },
      {
          "lastTime": "昨天",
          "uid": 51340703,
          "lastMsgInfo": {
              "msgId": 193043116988162,
              "encryptMsgId": "4677a92c2056ec181n1529m-EVNWy4S3UPyd",
              "showText": "Hi 云片&amp;YCloud是全球智能云通讯服务商，集成一站式的短信及WhatsApp商业软件、认证和营销管理能力。帮助企业在WhatsApp上开展营销、加速销售提供更好的客户支持，是Meta在大中华地区的首批商业解决方案服务商。",
              "fromId": 26359276,
              "toId": 51340703,
              "status": 2,
              "msgTime": 1742268867232
          },
          "encryptUid": "8a1db592b8eb5de40nV53926EFE~",
          "lastTS": 1742268867232
      }
  ]
}