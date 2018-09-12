"use strict";

const ver = '20180912 1913'
const functions = require("firebase-functions");
var nanoid = require('nanoid')
const REPORT_TYPES = [
  'cuckoo'
]

// Dialog Flow
const {
  dialogflow,
  Image,
  UpdatePermission,
  SimpleResponse,
  BasicCard,
  Button,
  Suggestions,
  SignIn
} = require("actions-on-google");

const app = dialogflow({
   debug: false
});

app.intent("Time report", conv => {
  setLastReport(conv)
  const reportType = getReportType(conv);
  const userId = setUserId(conv)
  const bellTimes = getBellTimes(9)
  console.log('Time report : ' + bellTimes + ' to [' + userId + '] : (' + reportType + ') ver.' + ver)

  switch(reportType){
    case REPORT_TYPES[0]:
      const ssml = getCuckooClockSSML(bellTimes)
      conv.close('<speak>' + ssml + '</speak>')
      break;
  }
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

// function --------------------------------------------------------------
// 時報のタイプを返す（user strage）
const getReportType = (conv) =>{
  let repotType = conv.user.storage.repotType
  if(!repotType){
    repotType = REPORT_TYPES[0]
    conv.user.storage.repotType = repotType
  }
  return repotType
}

const setUserId = (conv) => {
  let userId
  if (conv.user.storage && conv.user.storage.userId) {
    userId = conv.user.storage.userId
  }else{
    let now = new Date();
    userId = nanoid()
    conv.user.storage.userId = userId
    conv.user.storage.create = Math.round(now.getTime()/1000)
  }
  return userId
}

const setLastReport = (conv) => {
  let now = new Date();
  conv.user.storage.lastReport = Math.round(now.getTime()/1000)
}

const getBellTimes = (offset) => {
  let now = new Date();
  let h = now.getHours() + offset
  let m = now.getMinutes()
  return Math.round(h + m / 60) % 12
}

// Cuckoo -----------------------------------------------------------------
const getCuckooClockSSML = (num) => {
  const url = getCuckooClockAudioUrl(num)
  const text = "ぱっぽー ".repeat(num)
  return '<audio src="' + url + '">' + text + '</audio>'
}

const getCuckooClockAudioUrl = (num) => {
  const file = 'cuckoo_' + ('0' + num).slice(-2) + '.mp3'
  return 'https://yambal.github.io/static-mtral/' + file
}
