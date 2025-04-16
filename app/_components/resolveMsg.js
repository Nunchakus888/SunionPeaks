
(async (loopParams) => {

  const utils = window.utils;

  const stats = window.stats || {};

  const API = {
    // 根据标签过滤好友
    // https://www.zhipin.com/wapi/zprelation/friend/filterByLabel
    filterByLabel: async (params) => {
      const urlEncodedData = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        urlEncodedData.append(key, value);
      });
      const { code, message, zpData } = await utils.fetchApi({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: `/zprelation/friend/filterByLabel?${utils.getQueryString(params)}`,
        method: 'POST',
        body: urlEncodedData,
      });

      if (code !== 0) {
        console.error('filterByLabel', message);
        return;
      }
      return zpData.result;
    },


    /**
     * https://www.zhipin.com/wapi/zprelation/friend/getBossFriendListV2.json
     * friendIds=33820364%2C5708115%2C32582458%2C689109830%2C11504522%2C45896468%2C113603277%2C31106657%2C517253932%2C42303941%2C698388049%2C551832216%2C6106106%2C3608792%2C695967657%2C574961379%2C99881900%2C117921062%2C687268801%2C20806642%2C652140006%2C594605127%2C5960935%2C32532046%2C43958328%2C82074007%2C630784689%2C45884169%2C28972912%2C70722310%2C44170466%2C504233762%2C76006005%2C508414338%2C37518020%2C32500275
     * dzFriendIds
     * @param {*} params 
     * @returns 
     */
    getBossFriendListV2: async ({
      friendIds,
    }) => {
      const { code, message, zpData } = await utils.fetchApi({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: '/zprelation/friend/getBossFriendListV2.json',
        method: 'POST',
        body: {
          friendIds: typeof friendIds === 'string' ? friendIds : friendIds.join(','),
          dzFriendIds: '',
        },
      });

      if (code !== 0) {
        console.error('getBossFriendListV2', message);
        return;
      }
      return zpData.friendList;
    },

    /**
     * https://www.zhipin.com/wapi/zpjob/chat/geek/info
     * uid
     * geekSource
     * securityId
     */
    chatGeekInfo: async ({
      uid,
      geekSource,
      securityId,
    }) => {
      const { code, message, zpData } = await utils.fetchApi({
        url: '/zpjob/chat/geek/info',
        method: 'POST',
        body: {
          uid,
          geekSource,
          securityId,
        },
      });

      if (code !== 0) {
        console.error('chatGeekInfo', message);
        return;
      }
      return zpData;
    },

    /**
     * 获取geek信息
     * https://www.zhipin.com/wapi/zpjob/view/geek/info?encryptJid=435d5714a68a7a8d03Vz2dS4FVVR&expectId=1186920366&securityId=NGyko6oCKEUrx-g1DMu9lNcWrHoKfkEfx0oxOmNOiAYRn5F-mWAhZCUxcbNaoBcuPGjmK8pw0vmlNsjdizI-j9nbNHmXKkeFdS4Wf9gTv3pBGspGktxDtaxeRGJTMt2onAN0lXHrHFqyeS3khgCu8MYf1jwWq_QvL6CCkq6OdQ0q2nl0mWObr0zR-IAWtJnXVeQ6VoQfvIWgFp-dr4wwkLmnTOE1-BLak5DXeAgdu9JUoXqYCqd31TBsm1ONpFrs2Kgc5DH38zNWXkaPkLbeUpsAxFis5DxzFWtBCr4CSGhfRlHlgrHa735l1nJ4gFktZBmFamTxE5tsrrXu3GPgLTqncAT-EoaG4k3nwuwFwc3ootqS9iQmHYfaYmkwcNGwOkAvEc6UXywsQjAfyrkqQG57kIyk6m8syBw8MRUdNOmkhPf2e-zlhNxVbCkJpwQbsQarPiQw4BzGA835HP--izL7YfbHbNb3mLKEwksINgME6pmW9VmnnkTMfCu0jEh6OihaO9raUCm-yFWHzpwUOM4KFZmAHiwZUuERS4uAal3tgkcqPCEA38FKjmtNFLMMEf_SUyGWz0g3ghtY-4prXLoJ-lMEsAXhMfh275fitbCP6Ez4H2o-6uiqMQajwLTa4oExAHJNmKK-WLjD3JMnpXQwegpO9PIr6DDU5nIGhk_oqyTVKXGO4PMy&lid=6a252a09-148a-488c-806b-64c4005db7ef.f1:common.eyJzZXNzaW9uSWQiOiI0YjgzYzc3ZC01NjE3LTQ2NjItOGNiNi1lYjEyM2I2MjlhMzEiLCJyY2RCelR5cGUiOiJmMV9icmNkIn0.6&entrance=0&wayType=0&sourceType=3
     * @param {*} param0 
     * @returns 
     */
    geekInfo: async ({
      encryptJid,
      securityId,
      encryptExpectId,
      scene,
      source,
      uid,
    }) => {
      const params = {
        encryptJid,
        securityId,
        encryptExpectId,
        scene,
        source,
        uid,
      };
      const { code, message, zpData } = await utils.fetchApi({
        url: `/zpjob/view/geek/info?${utils.getQueryString(params)}`,
      });

      if (code !== 0) {
        console.error('geekInfo', message);
        return;
      }
      return zpData;
    },

    /**
     * https://www.zhipin.com/wapi/zpjob/chat/geek/groupset
     * relationType=8&from=2&geekId=b3d89cd5774727480XV90tS5GVRT
     * @param {*} param0 
     * @returns 
     */
    geekGroupset: async ({
      relationType,
      from,
      geekId,
    }) => {
      const { code, message, zpData } = await utils.fetchApi({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: '/zpjob/chat/geek/groupset',
        method: 'POST',
        body: {
          relationType,
          from,
          geekId,
        },
      });

      if (code !== 0) {
        console.error('geekGroupset', message);
        return;
      }
      return zpData;
    },
  };

  async function just2resolveMsg() {
    const geeks = await API.filterByLabel({
      labelId: 1,
    });
    console.log(geeks);

    while (geeks.length) {
      // cut 30
      const geek = geeks.slice(0, 30);
      console.log(geek);

      // sleep 5 seconds
      await utils.sleep(5);

      const { friendId, friendSource, encryptFriendId, name, updateTime } = geek;

      // 获取好友信息
      const friendList = await API.getBossFriendListV2({
        friendIds: geek.map(g => g.friendId).join(','),
      });
      console.log(friendList);

      while (friendList.length) {
        if (loopParams.breakChat) {
          // save
          console.save(stats);
          break;
        }
        stats.chatting.total++;

        const friend = friendList.shift();
        const { securityId, name, sourceType, relationType, relationLabelList, lastTime, encryptJobId, jobName, expectId, uid, encryptUid } = friend;

        /**
         * 5: "未处理",
         * 6: "沟通中",
         * 8: "不合适",
         * 9: "已约面",
         * default: "等待回复"
         */
        await utils.sleep(5);

        if (relationType === 5) {
          stats.chatting.pick++;

          console.log(friend);
          // query info
          const { data: geekInfo, status: geekStatus } = await API.geekInfo({
            encryptJid: encryptJobId,
            securityId,
            encryptExpectId: expectId,
            scene: 0,
            // source: 1,
            uid: encryptUid,
          });
          console.warn('geekInfo:', geekInfo, geekStatus);

          const { geekDetailInfo } = geekInfo;
          const { geekBaseInfo, showExpectPosition } = geekDetailInfo;
          const { name, gender, degreeCategory, applyStatus, applyStatusContent, userDescription, userDescHighlightList, workYearsDesc, age, salary, locationName } = geekBaseInfo;
          const { expectId, encryptExpectId, uid, expectLocationName, lowSalary, highSalary, salaryDesc } = showExpectPosition;
          // 判断是否符合条件
          const geek = {
            ...geekBaseInfo,
            geekDesc: {
              content: userDescription,
              indexList: userDescHighlightList,
            },
            geekName: name,
            geekGender: gender,
            geekWorkYear: workYearsDesc,
            geekDegree: degreeCategory,
            lowSalary,
            highSalary,
            salaryDesc,
            expectLocationName,
            applyStatusDesc: applyStatusContent,
            ageDesc: age,
            geekUrl: utils.previewGeekURL({
              securityId,
              lid: '',
              jobId: encryptJobId,
              status: applyStatus,
              isInnerAccount: 0,
              isResume: 0,
              isPreview: 0,
            }),
            expectId,
            encryptExpectId,
            uid,
            encryptUid,
          };
          const isValid = utils.validation(geek, stats.chatting);

          if (!isValid) {
            await utils.sleep(5);
            // groupset
            const isSuccess = await API.geekGroupset({
              // 8: "不合适",
              relationType: 8,
              from: 2,
              geekId: encryptUid,
            });

            if (isSuccess) {
              stats.chatting.reject++;
            }

            continue;
          }

          // 有未读消息，但未处理
          stats.chatting.pending++;
          // stats.chatting.pickList.push(utils.formatGeekCard(geek));

          await utils.sleep(5);
        } else {
          continue;
        }
      }

    }
  }

  just2resolveMsg();

})(loopParams);
