"use strict";

const functions = require("firebase-functions");

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
const app = dialogflow();

/*
app.intent("Default Welcome Intent", conv => {
  console.log("Default Welcome Intent")
  const reportType = getReportType(conv);

  switch(reportType){
    case REPORT_TYPES[0]:
      const bellTimes = getBellTimes(9)
      const ssml = getCuckooClockSSML(bellTimes)
      conv.close('<speak>' + ssml + '</speak>')
      break;
  }
});
*/

app.intent("Time report", conv => {
  console.log("Time report")
  const reportType = getReportType(conv);

  switch(reportType){
    case REPORT_TYPES[0]:
      const bellTimes = getBellTimes(9)
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
