import * as moment from 'moment'
import sha1 from 'js-sha1'
import _ from 'lodash'
import AsyncStorage from '@react-native-community/async-storage'
import Toast from 'react-native-root-toast'
import BigNumber from 'bignumber.js'
// import { NativeModules } from 'react-native'

BigNumber.config({
  FORMAT: {
    // string to prepend
    prefix: '',
    // decimal separator
    decimalSeparator: '.',
    // grouping separator of the integer part
    groupSeparator: ',',
    // primary grouping size of the integer part
    groupSize: 3,
    // secondary grouping size of the integer part
    secondaryGroupSize: 0,
    // grouping separator of the fraction part
    fractionGroupSeparator: ' ',
    // grouping size of the fraction part
    fractionGroupSize: 0,
    // string to append
    suffix: ''
  }
})

const showNotification = (description = 'description', duration = Toast.durations.SHORT, position = Toast.positions.BOTTOM) => {
  showToast(description, {
    position,
    duration
  })
  // todo show notification
  // notification[type]({
  //   message,
  //   description
  // });
}

// todo get master cache
const getSettingCryptoCache = () => {

}

const trimAll = obj => {
  if (_.isArray(obj)) {
    console.log('please pass object here! src/common/utils.js:29')
    return
  }

  _.forEach(obj, (value, key) => {
    if (typeof obj[`${key}`] === 'object') {
      trimAll(obj[`${key}`])
    } else {
      if (key !== `${key}`.trim()) {
        delete obj[`${key}`]
        key = `${key}`.trim()
      }
      if (typeof value === 'string') {
        obj[`${key}`] = _.trim(value)
      }
    }
  })
}

const paddingZeros = (num, count = 19) =>
  ('0'.repeat(count) + num).substr(-count, count)
const trimRightZero = num =>
  `${num}`.split('.').length === 2 ? _.trimEnd(num, '0') : `${num}`
const trimDot = num => _.trimEnd(`${num}`, '.')
const trimRightZeroAndDot = num => trimDot(trimRightZero(num))
const formatCurrency = (number) => {
  let formatResult = trimRightZeroAndDot(new BigNumber(number).toFormat(8))
  return formatResult === 'NaN' ? '0' : formatResult
}

function hash (object) {
  return sha1(JSON.stringify(object))
}

function getCoinName (coins, symbol) {
  return _.find(coins, ['symbol', symbol])
}

function resetCacheTimeTVChart () {
  AsyncStorage.setItem('currentTimeRequest', '')
  AsyncStorage.setItem('previousTimeRequest', '')
}

// async function isExpiredToken (token) {
//   if (!token) {
//     token = await call(AsyncStorage.getItem, consts.TOKEN_LOGIN)
//   }
//   return !!token && moment(token.time_expired / 1000).isBefore()
// }

function upperCaseFirst (input) {
  return _.upperFirst(input)
}

const defaultOptions = {
  duration: Toast.durations.SHORT,
  position: Toast.positions.CENTER,
  backgroundColor: 'rgba(0,0,0, 0.5)',
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 0,
  onShow: () => {
    // calls on toast\`s appear animation start
  },
  onShown: () => {
    // calls on toast\`s appear animation end.
  },
  onHide: () => {
    // calls on toast\`s hide animation start.
  },
  onHidden: () => {
    // calls on toast\`s hide animation end.
  }
}

function showToast (message = 'something wrong here!', options = {containerStyle: { zIndex: 100, elevation: 100 }}) {
  // console.xlog(message, "message");
  // console.xlog(options, "options");
  return Toast.show(message, {...defaultOptions, ...options})
}

// function extractSignature (msg) {
//   return new Promise((resolve, reject) => {
//     NativeModules.TrustKeysModule.SHA256(msg, (aHash) => {
//       NativeModules.TrustKeysModule.getPubKeySigChat(aHash
//         , (obj) => {
//           let pubKeyChat = obj.pubKey
//           let sigChatForMsg = obj.sig
//           let HashOfMsg = aHash
//           resolve({pubKeyChat, sigChatForMsg, HashOfMsg})
//         }
//       )
//     }) // sha256
//   })
// }

// function $t (schema = '') {
//   return (path = '', ...params) => {
//     return vsprintf(getLocalLanguage()[schema][path], params)
//   }
// }

export default {
  extractSignature,
  // setLang,
  upperCaseFirst,
  // $t,
  showToast,
  // isAddress,
  // isExpiredToken,
  resetCacheTimeTVChart,
  getSettingCryptoCache,
  // parseTranStatus,
  getCoinName,
  hash,
  trimAll,
  paddingZeros,
  trimRightZero,
  trimRightZeroAndDot,
  // parseOrderType,
  // parseTradeType,
  // IcoMoon,
  formatCurrency,
  showNotification,
  formatTimeFromUnix: (unixTime, format = 'DD/MM/YYYY') =>
    moment.unix(parseInt(`${unixTime}`.substr(0, 10))).format(format)
  // handleExport: (data, nameFile = 'test', extension = 'csv') => {
  //   if (data.length === 0) {
  //     // todo show notification
  //     // showNotification(
  //     //   'Notification',
  //     //   'Please select at least one config before export',
  //     //   consts.TYPE_WARNING,
  //     // );
  //     return;
  //   }
  //   const dataConverted = convert_aobj2aoa([...data]);
  //   const dataConvertedWithHeader = addHeader(dataConverted, [
  //     ...Object.keys(data[0]),
  //   ]);
  //   let workSheet = XLSX.utils.aoa_to_sheet(dataConvertedWithHeader);
  //   let bookNew = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(bookNew, workSheet, nameFile);
  //   XLSX.writeFile(bookNew, `${nameFile}.${extension}`);
  // },
}
