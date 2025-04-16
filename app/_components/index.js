// boss-1 boss 买家版，因为有1，0才有意义

const loopParams = {
  breakLoop: false,
  breakChat: false,
}

  ; (async (loopParams) => {

    ; (function (console) {

      console.save = function (data) {

        if (!data) {
          console.error('Console.save: No data')
          return;
        }

        const filename = `${new Date().toLocaleString()}.json`

        if (typeof data === "object") {
          data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], { type: 'text/json' }),
          e = document.createEvent('MouseEvents'),
          a = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
      }
    })(console);

    const utils = {
      bashUrl: "https://www.zhipin.com/wapi",
      loggerItem: {},
      stats: {
        /**
         * 沟通
         * total: 总人数
         * pick: 消息未处理数
         * reject: 拒绝数
         * reply: 回复数
         * pending: 有未读消息，但未处理
         * pickList: 回复列表
         * ngList: 拒绝列表
         */
        chatting: {
          total: 0,
          pick: 0,
          reply: 0,
          reject: 0,
          pending: 0,
          pickList: [],
          ngList: [],
        },
      },
      statsItem: {
        page: 1,
        recommand: 0,
        pick: 0,
        chat: 0,
        search: 0,
        isFriend: 0,
        chatList: [],
        ngList: [],
      },
      randomId: function (e) {
        for (var t = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], r = "", n = 0; n < e; n++)
          r += t[Math.ceil(35 * Math.random())];
        return r
      },
      getTraceId: () => {
        var e = function () {
          for (var e = Date.now().toString(16), t = "", i = 0; i < 10; i++)
            t += "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(62 * Math.random())];
          return "".concat(e.slice(-6)).concat(t)
        }();
        return "F-".concat(e)
      },
      params: {
        zp_token: '',
      },

      form: {
        100901: {
          name: '前端开发工程师',
          _geekWorkYear: 3,
          _geekDegree: ['本科', '硕士'],
          _lowSalary: 10000,
          _highSalary: 100000,
          _expectLocationName: ['北京', '杭州'],
          _greeting: `你好呀____！关注到你有电商系统的开发经验，YCloud正在寻找能攻坚核心交易场景的技术伙伴。在这里你将：
            主导复杂电商交易系统的前端架构设计
            攻克极端性能优化挑战（如千人千面SKU渲染、弱网环境加载加速）
            负责多端适配方案（覆盖iOS/Android/Web，确保全球用户体验一致性）
            公司业务覆盖200+国家，提供晚餐等福利且不打卡。
            欢迎投递简历，期待与你共同解决跨境电商的技术挑战！
          `,
          keywords: ['电商'],
          _ageDesc: '25-30',
        },
        110101: {
          name: '产品经理',
          _geekWorkYear: 8,
          _geekDegree: ['本科', '硕士'],
          _lowSalary: 10000,
          _highSalary: 100000,
          _expectLocationName: ['北京', '杭州'],
          _greeting: `你好呀____！关注到你有丰富的电商行业经验，我们非常期待与你聊聊。
            YCloud作为全球智能云通讯服务商，正在用AI技术赋能电商场景。
            这里有大厂级的复杂项目（比如跨境电商、AI中台、跨境SASS服务）
            但没有大厂的繁琐流程。弹性不打卡+晚餐等福利。
            欢迎投递简历，期待与你共同解决电商的技术挑战！
          `,
          keywords: ['电商'],
          _ageDesc: '25-35',
        },
        140608: {
          name: '市场投放',
          _geekWorkYear: 3,
          _geekDegree: ['本科', '硕士'],
          _lowSalary: 10000,
          _highSalary: 100000,
          _expectLocationName: ['北京', '杭州'],
          _greeting: `你好呀____！注意到你有对__business__业务的独到见解，YCloud正在搭建全球化的智能营销网络。
            这个岗位将直接负责欧美/东南亚市场的增长策略，用我们的AI通讯工具玩转跨文化用户触达。
            团队英语为工作语言，上下班不打卡，晚餐等超多福利。
            欢迎投递简历，期待与你共同解决电商的技术挑战！
          `,
          keywords: ['海外投放', 'whatsapp', 'facebook', 'tiktok', 'kol', 'google', 'linkedin', 'instagram', 'twitter', 'youtube', 'pinterest', 'snapchat', 'youtube'],
          _ageDesc: '25-35',
        },
      },

      formatGreeting(geekCard, greeting) {
        const { geekName, keywords } = geekCard;
        if (keywords) {
          greeting = greeting.replace(/__business__/, keywords);
        }
        return greeting.replace(/____/, `${geekName}`);
      },

      formatGeekCard(geekCard) {
        const { geekDesc, lid, jobId, securityId, geekEdus, geekName, geekWorkYear, salary, expectPositionCode, geekDegree, lowSalary, expectLocationName, applyStatusDesc, ageDesc } = geekCard;

        return {
          lid,
          jobId,
          securityId,
          geekName,
          geekWorkYear,
          salary,
          expectPositionCode,
          geekDegree,
          lowSalary,
          expectLocationName,
          applyStatusDesc,
          ageDesc,
          content: geekDesc?.content,
          geekUrl: utils.previewGeekURL(geekCard),
          geekEdus: geekEdus.map(i => `${i.school} ${i.major}`).join(';'),
        }
      },
      validation(geekCard, stats) {
        const { geekWorkYear, expectPositionCode, geekDegree, lowSalary, ageDesc, geekDesc } = geekCard;

        const form = utils.form[expectPositionCode];
        const params = utils.formatGeekCard(geekCard);

        if (!form) {
          // stats.ngList.push({ ...params, feedback: `职位不符合: ${expectPositionCode} not in ${Object.keys(utils.form)}` });
          return false;
        }

        const { keywords } = form;
        const { content } = geekDesc || {};

        const kw = keywords.some(keyword => new RegExp(keyword, 'i').test(content))
        if (!kw) {
          stats.ngList.push({ ...params, feedback: `关键词不符合: not in ${keywords}` });
          return false;
        } else {
          // pick keywords and save keywords to current geekCard
          const matchedKeywords = keywords.filter(keyword => new RegExp(keyword, 'i').test(content)).join('、');
          geekCard.keywords = matchedKeywords;
        }

        // workYear
        const workYear = parseInt(geekWorkYear.match(/(\d*).*/)[1]);
        if (workYear < form._geekWorkYear) {
          stats.ngList.push({ ...params, feedback: `工作年限不符合: ${workYear} < ${form._geekWorkYear}` });
          return false;
        }

        // degree
        if (!form._geekDegree.includes(geekDegree)) {
          stats.ngList.push({ ...params, feedback: `学历不符合: ${geekDegree} not in ${form._geekDegree}` });
          return false;
        }

        // salary
        if (form._highSalary) {
          if (lowSalary > form._highSalary) {
            stats.ngList.push({ ...params, feedback: `薪资不符合: 最低预期${lowSalary} > ${form._highSalary}` });
            return false;
          }
        }

        // age
        if (form._ageDesc) {
          const [minAge, maxAge] = form._ageDesc.split('-').map(Number);
          const age = parseInt(ageDesc.match(/(\d*).*/)[1]);
          if (age < minAge || age > maxAge) {
            stats.ngList.push({ ...params, feedback: `年龄不符合: ${age} not in ${form._ageDesc}` });
            return false;
          }
        }

        return true;
      },

      traceId: () => `${utils.randomId(8)}-${utils.randomId(4)}-${utils.randomId(4)}-${utils.randomId(4)}-${utils.randomId(12)}`,

      fetchApi: async ({ url, method = 'GET', headers = {}, data, body }) => {
        return window.fetch(`${utils.bashUrl + url}`, {
          "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en,zh-CN;q=0.9,zh;q=0.8",
            "sec-ch-ua": "\"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
            "priority": "u=1, i",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "\"Android\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            ...utils.params,
            ...headers,
            traceid: utils.getTraceId(),
          },
          body: body || (data ? JSON.stringify(data) : null),
          method,
          "referrer": location.href,
          "referrerPolicy": "strict-origin-when-cross-origin",
          "mode": "cors",
          "credentials": "include",
        })
          .then(res => res.json())
      },
      getQueryString: (params) => {
        return Object.entries(params).map(([key, value]) => `${key}=${value || ''}`).join('&');
      },

      geekList: async (params) => {
        const { code, message, zpData } = await utils.fetchApi({
          url: `/zpjob/rec/geek/list?${utils.getQueryString(params)}`,
        });

        if (code !== 0) {
          console.error('geekList', message);
          return;
        }
        return zpData;
      },

      // https://www.zhipin.com/wapi/zpitem/web/refinedGeek/list?page=1&encryptJobId=435d5714a68a7a8d03Vz2dS4FVVR&coverScreenMemory=0&age=16,-1&activation=0&school=0&gender=0&major=0&recentNotView=0&exchangeResumeWithColleague=0&keyword1=-1&switchJobFrequency=0&degree=0&experience=0&intention=0&salary=0
      getRefinedGeekList: async (params) => {
        const { code, message, zpData } = await utils.fetchApi({
          url: `/zpitem/web/refinedGeek/list?${utils.getQueryString(params)}`,
        });
        
        if (code !== 0) {
          console.error('getRefinedGeekList', message);
          return;
        }
        return zpData;
      },


      getGeekInfo: async (params) => {
        // https://www.zhipin.com/wapi/zpjob/view/geek/info?encryptJid=435d5714a68a7a8d03Vz2dS4FVVR&expectId=1186920366&securityId=NGyko6oCKEUrx-g1DMu9lNcWrHoKfkEfx0oxOmNOiAYRn5F-mWAhZCUxcbNaoBcuPGjmK8pw0vmlNsjdizI-j9nbNHmXKkeFdS4Wf9gTv3pBGspGktxDtaxeRGJTMt2onAN0lXHrHFqyeS3khgCu8MYf1jwWq_QvL6CCkq6OdQ0q2nl0mWObr0zR-IAWtJnXVeQ6VoQfvIWgFp-dr4wwkLmnTOE1-BLak5DXeAgdu9JUoXqYCqd31TBsm1ONpFrs2Kgc5DH38zNWXkaPkLbeUpsAxFis5DxzFWtBCr4CSGhfRlHlgrHa735l1nJ4gFktZBmFamTxE5tsrrXu3GPgLTqncAT-EoaG4k3nwuwFwc3ootqS9iQmHYfaYmkwcNGwOkAvEc6UXywsQjAfyrkqQG57kIyk6m8syBw8MRUdNOmkhPf2e-zlhNxVbCkJpwQbsQarPiQw4BzGA835HP--izL7YfbHbNb3mLKEwksINgME6pmW9VmnnkTMfCu0jEh6OihaO9raUCm-yFWHzpwUOM4KFZmAHiwZUuERS4uAal3tgkcqPCEA38FKjmtNFLMMEf_SUyGWz0g3ghtY-4prXLoJ-lMEsAXhMfh275fitbCP6Ez4H2o-6uiqMQajwLTa4oExAHJNmKK-WLjD3JMnpXQwegpO9PIr6DDU5nIGhk_oqyTVKXGO4PMy&lid=6a252a09-148a-488c-806b-64c4005db7ef.f1:common.eyJzZXNzaW9uSWQiOiI0YjgzYzc3ZC01NjE3LTQ2NjItOGNiNi1lYjEyM2I2MjlhMzEiLCJyY2RCelR5cGUiOiJmMV9icmNkIn0.6&entrance=0&wayType=0&sourceType=3
        const { code, message, zpData } = await utils.fetchApi({
          url: `/zpjob/view/geek/info?${utils.getQueryString(params)}`,
        });

        if (code !== 0) {
          console.error('getGeekInfo', message);
          return;
        }
        return zpData;
      },
      previewGeekURL: ({
        expectId,
        isInnerAccount,
        isResume,
        isPreview,
        status,
        jobId,
        lid,
        securityId,
      }) => {
        const params = {
          expectId,
          isInnerAccount,
          isResume,
          isPreview,
          status,
          jobId,
          lid,
          securityId,
        };
        return `https://m.zhipin.com/web/frame/recommend/resume?${utils.getQueryString(params)}`;
      },
      recJobList: async () => {
        const { code, message, zpData } = await utils.fetchApi({
          url: `/zpjob/job/recJobList`,
        });

        if (code !== 0) {
          console.error('recJobList', message);
          return;
        }
        return zpData.onlineJobList;
      },

      getRelatedInfo: async () => {
        const { code, message, zpData } = await utils.fetchApi({
          url: `/zpjob/rec/relatedInfo`,
        });

        if (code !== 0) {
          console.error('getRelatedInfo', message);
          return;
        }
        return zpData.relatedInfo.geekCard4SearchBOS;
      },

      getZpToken: async () => {
        const { code, message, zpData } = await utils.fetchApi({
          url: `/zppassport/set/zpToken`,
          method: 'POST',
        });


        if (code !== 0) {
          console.error('getZpToken', message);
          return;
        }
        const zp_token = document.cookie.match(/bst=([^;]+)/)[1];
        return zp_token;
      },

      startChat: async (params) => {
        // gid=88adfd69c44d3b061HZ_0t2_EFQ~&suid=&jid=435d5714a68a7a8d03Vz2dS4FVVR&expectId=1186920366&lid=6a252a09-148a-488c-806b-64c4005db7ef.f1%3Acommon.eyJzZXNzaW9uSWQiOiI0YjgzYzc3ZC01NjE3LTQ2NjItOGNiNi1lYjEyM2I2MjlhMzEiLCJyY2RCelR5cGUiOiJmMV9icmNkIn0.6&greet=&from=&securityId=NGyko6oCKEUrx-g1DMu9lNcWrHoKfkEfx0oxOmNOiAYRn5F-mWAhZCUxcbNaoBcuPGjmK8pw0vmlNsjdizI-j9nbNHmXKkeFdS4Wf9gTv3pBGspGktxDtaxeRGJTMt2onAN0lXHrHFqyeS3khgCu8MYf1jwWq_QvL6CCkq6OdQ0q2nl0mWObr0zR-IAWtJnXVeQ6VoQfvIWgFp-dr4wwkLmnTOE1-BLak5DXeAgdu9JUoXqYCqd31TBsm1ONpFrs2Kgc5DH38zNWXkaPkLbeUpsAxFis5DxzFWtBCr4CSGhfRlHlgrHa735l1nJ4gFktZBmFamTxE5tsrrXu3GPgLTqncAT-EoaG4k3nwuwFwc3ootqS9iQmHYfaYmkwcNGwOkAvEc6UXywsQjAfyrkqQG57kIyk6m8syBw8MRUdNOmkhPf2e-zlhNxVbCkJpwQbsQarPiQw4BzGA835HP--izL7YfbHbNb3mLKEwksINgME6pmW9VmnnkTMfCu0jEh6OihaO9raUCm-yFWHzpwUOM4KFZmAHiwZUuERS4uAal3tgkcqPCEA38FKjmtNFLMMEf_SUyGWz0g3ghtY-4prXLoJ-lMEsAXhMfh275fitbCP6Ez4H2o-6uiqMQajwLTa4oExAHJNmKK-WLjD3JMnpXQwegpO9PIr6DDU5nIGhk_oqyTVKXGO4PMy&customGreetingGuide=-1

        const urlEncodedData = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          urlEncodedData.append(key, value);
        });
        const { code, message, zpData } = await utils.fetchApi({
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          url: `/zpjob/chat/start`,
          method: 'POST',
          body: urlEncodedData,
        });

        if (code !== 0) {
          console.error('startChat', message);
          return;
        }
        return zpData;
      },

      sleep: async (seconds) => {
        // sleep random 2000 - seconds * 1000
        return new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * seconds * 1000) + 2000));
      }
    }

    window.utils = utils;


    const params = utils.params;

    // 查询招聘列表
    async function queryRecruitmentList() {
      if (!params.zp_token) params.zp_token = await utils.getZpToken();

      // query retJobList
      const retJobList = await utils.recJobList();

      console.warn('retJobList:', retJobList);


      while (retJobList.length) {
        const job = retJobList.shift();

        if (loopParams.breakLoop) {
          return;
        }
        // 保存当前岗位日志，用于统计
        utils.stats[job.positionCode] = {
          name: job.jobName,
          positionCode: job.positionCode,
          locationName: job.locationName,
          salaryDesc: job.salaryDesc,
          ...JSON.parse(JSON.stringify(utils.statsItem)),
        };
        const stats = utils.stats[job.positionCode];
        console.warn('current job:', job);
        await just2hello(job, stats);
      }

      console.save(utils.stats);
    }

    async function just2hello(job, stats) {
      console.error('just2hello--stats:', utils.stats);
      const { encryptId, jobName, positionCode, brandName, proxyJob, locationName, salaryDesc, refinedEntrance, workType, workTypeName, cardTypes, expireDesc, expireType, expireDate, jobType, hitFullPartTime } = job;
      if (!params.zp_token) params.zp_token = await utils.getZpToken();

      // https://www.zhipin.com/wapi/zpjob/rec/geek/list?age=16,-1&school=0&activation=0&recentNotView=0&gender=0&exchangeResumeWithColleague=0&major=0&switchJobFrequency=0&keyword1=-1&degree=0&experience=0&intention=0&salary=0&jobId=4bdc394870e4a2c403Z53N28EVdZ&page=2&coverScreenMemory=0&cardType=0
      const { geekList, hasMore, page } = await utils.geekList({
        age: 16,
        page: stats.page,
        jobId: encryptId,
        major: 0,
        school: 0,
        gender: 0,
        salary: 0,
        degree: 0,
        keyword1: '',
        cardType: 0,
        intention: 0,
        experience: 0,
        activation: 0,
        recentNotView: 0,
        coverScreenMemory: 0,
        switchJobFrequency: 0,
        exchangeResumeWithColleague: 0,
      });

      console.warn('geekList:', geekList, 'hasMore:', hasMore, 'page:', page);

      // stats.recommand += geekList.length;

      while (geekList.length) {
        stats.recommand += 1;
        const geek = geekList.shift();
        const { isFriend, geekId, encryptGeekId } = geek;

        console.warn(`${stats.recommand}---geek-item:`, geek);
        if (loopParams.breakLoop) {
          console.save(utils.stats);
          return;
        }

        if (isFriend) {
          stats.isFriend += 1;
          continue;
        }

        const { geekCard, geekLastWork, showEdus, showWorks } = geek;
        const { lid, securityId, expectId, geekDesc, geekWorkYear, geekDegree, lowSalary, expectLocationName, applyStatusDesc, ageDesc } = geekCard;

        // 判断是否符合条件
        const { _geekWorkYear, _geekDegree, _lowSalary, _expectLocationName, _applyStatusDesc, _ageDesc } = utils.form;

        await utils.sleep(2);

        if (!utils.validation(geekCard, stats)) {
          console.warn(`${stats.recommand}---geek-item is invalid:`, geekCard);
          continue;
        }

        stats.pick += 1;

        // https://www.zhipin.com/wapi/zpjob/view/geek/info?encryptJid=435d5714a68a7a8d03Vz2dS4FVVR&expectId=1186920366&securityId=NGyko6oCKEUrx-g1DMu9lNcWrHoKfkEfx0oxOmNOiAYRn5F-mWAhZCUxcbNaoBcuPGjmK8pw0vmlNsjdizI-j9nbNHmXKkeFdS4Wf9gTv3pBGspGktxDtaxeRGJTMt2onAN0lXHrHFqyeS3khgCu8MYf1jwWq_QvL6CCkq6OdQ0q2nl0mWObr0zR-IAWtJnXVeQ6VoQfvIWgFp-dr4wwkLmnTOE1-BLak5DXeAgdu9JUoXqYCqd31TBsm1ONpFrs2Kgc5DH38zNWXkaPkLbeUpsAxFis5DxzFWtBCr4CSGhfRlHlgrHa735l1nJ4gFktZBmFamTxE5tsrrXu3GPgLTqncAT-EoaG4k3nwuwFwc3ootqS9iQmHYfaYmkwcNGwOkAvEc6UXywsQjAfyrkqQG57kIyk6m8syBw8MRUdNOmkhPf2e-zlhNxVbCkJpwQbsQarPiQw4BzGA835HP--izL7YfbHbNb3mLKEwksINgME6pmW9VmnnkTMfCu0jEh6OihaO9raUCm-yFWHzpwUOM4KFZmAHiwZUuERS4uAal3tgkcqPCEA38FKjmtNFLMMEf_SUyGWz0g3ghtY-4prXLoJ-lMEsAXhMfh275fitbCP6Ez4H2o-6uiqMQajwLTa4oExAHJNmKK-WLjD3JMnpXQwegpO9PIr6DDU5nIGhk_oqyTVKXGO4PMy&lid=6a252a09-148a-488c-806b-64c4005db7ef.f1:common.eyJzZXNzaW9uSWQiOiI0YjgzYzc3ZC01NjE3LTQ2NjItOGNiNi1lYjEyM2I2MjlhMzEiLCJyY2RCelR5cGUiOiJmMV9icmNkIn0.6&entrance=0&wayType=0&sourceType=3
        // const geekInfo = await utils.getGeekInfo({
        //   encryptJid: encryptId,
        //   expectId,
        //   securityId,
        //   entrance: 0,
        //   wayType: 0,
        //   sourceType: 3,
        // });
        // console.warn('4--geekInfo:', geekInfo);
        // const { securityJid, geekDetailInfo, geekDetailInfo: { geekBaseInfo } } = geekInfo;
        // const { suid, name, nameRareChars, large, tiny, headImg, gender, degree, degreeCategory, freshGraduate, applyStatus, email, workYears, workYearDesc, age, eventTime, activeTimeDesc, unregister, longitude, latitude, appVersion, resumeStatus, complete, status, applyStatusContent, userId, blur, workEduDesc, userHighlightList, workYearsDesc, userDescription, foldedRows, studyAbroadCert, userDescHighlightList, workDate8, workDate8Desc, workDate9, workDate9Desc, workDate10, workDate10Desc, workDate11, workDate11Desc, workDate12, workDate12Desc, workDate13, workDate13Desc, workDate14, workDate14Desc, workDate15, workDate15Desc, workDate16, workDate16Desc, workDate17, workDate17Desc, workDate18, workDate18Desc, workDate19, workDate19Desc, workDate20, workDate20Desc } = geekBaseInfo;


        await utils.sleep(5);

        // greeting
        // gid=88adfd69c44d3b061HZ_0t2_EFQ~&suid=&jid=435d5714a68a7a8d03Vz2dS4FVVR&expectId=1186920366&lid=6a252a09-148a-488c-806b-64c4005db7ef.f1%3Acommon.eyJzZXNzaW9uSWQiOiI0YjgzYzc3ZC01NjE3LTQ2NjItOGNiNi1lYjEyM2I2MjlhMzEiLCJyY2RCelR5cGUiOiJmMV9icmNkIn0.6&greet=&from=&securityId=NGyko6oCKEUrx-g1DMu9lNcWrHoKfkEfx0oxOmNOiAYRn5F-mWAhZCUxcbNaoBcuPGjmK8pw0vmlNsjdizI-j9nbNHmXKkeFdS4Wf9gTv3pBGspGktxDtaxeRGJTMt2onAN0lXHrHFqyeS3khgCu8MYf1jwWq_QvL6CCkq6OdQ0q2nl0mWObr0zR-IAWtJnXVeQ6VoQfvIWgFp-dr4wwkLmnTOE1-BLak5DXeAgdu9JUoXqYCqd31TBsm1ONpFrs2Kgc5DH38zNWXkaPkLbeUpsAxFis5DxzFWtBCr4CSGhfRlHlgrHa735l1nJ4gFktZBmFamTxE5tsrrXu3GPgLTqncAT-EoaG4k3nwuwFwc3ootqS9iQmHYfaYmkwcNGwOkAvEc6UXywsQjAfyrkqQG57kIyk6m8syBw8MRUdNOmkhPf2e-zlhNxVbCkJpwQbsQarPiQw4BzGA835HP--izL7YfbHbNb3mLKEwksINgME6pmW9VmnnkTMfCu0jEh6OihaO9raUCm-yFWHzpwUOM4KFZmAHiwZUuERS4uAal3tgkcqPCEA38FKjmtNFLMMEf_SUyGWz0g3ghtY-4prXLoJ-lMEsAXhMfh275fitbCP6Ez4H2o-6uiqMQajwLTa4oExAHJNmKK-WLjD3JMnpXQwegpO9PIr6DDU5nIGhk_oqyTVKXGO4PMy&customGreetingGuide=-1
        const chatResult = await utils.startChat({
          lid,
          gid: encryptGeekId,
          jid: encryptId,
          from: '',
          greet: utils.formatGreeting(geekCard, utils.form[positionCode]._greeting),
          expectId,
          securityId,
          geekDesc: geekDesc.content,
          customGreetingGuide: '-1',
        });

        console.warn('chatResult:', chatResult);

        stats.chat += 1;
        if (chatResult) {

          const { greeting, greetingTip, stateDesc, status } = chatResult;

          if (status === 3) {
            // 达到上限
            console.warn('chatResult is over limit:', chatResult);
            return;
          }

          stats.chatList.push({
            ...utils.formatGeekCard(geekCard),
            greeting,
            greetingTip,
            stateDesc,
            status,
          });

          if (greetingTip === 1) {
            console.log('greeting', greeting);
          }
        }

        await utils.sleep(10);
      }

      if (hasMore) {
        console.warn('hasMore:', hasMore, 'page:', page, 'stats:', utils.stats);
        await utils.sleep(5);
        stats.page += 1;
        await just2hello(job, stats);
      } else {
        console.warn('End--has no more:', 'page:', page, 'stats:', stats);
        await utils.sleep(5);
      }
    }

    // catch global error and save stats
    queryRecruitmentList();

    window.onerror = function (message, source, lineno, colno, error) {
      console.error('Global error caught:', {
        message,
        source,
        lineno,
        colno,
        error
      });

      return true;
    };

  })(loopParams)

