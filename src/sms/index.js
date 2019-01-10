const Nexmo = require('nexmo')
const config = require('./config')

const nexmo = new Nexmo({
  apiKey: config.apiKey,
  apiSecret: config.apiSecret
})

/**
 * 检查手机号码格式
 * @param {String} cty_cod  国际码
 * @param {String} mobile 手机号码
 */
const format = (cty_cod, mobile) => {
  const phoneNum = String(Number(mobile)) // 为了让mobild第一个号码不为0，所以先转成数型态再转回字符串。
  const country_cod = cty_cod ? String(cty_cod).replace(/\+/g, '') : '' // Remove symbol +
  return country_cod + phoneNum
}

/**
 * 寄送简讯
 * @param {String} cty_cod  国际码
 * @param {String} mobile 手机号码
 * @param {String} text 简讯内容
 */
const send = (cty_cod, mobile, text) =>
  new Promise((resolve, reject) => {
    const from = 'Nexmo'
    const to = format(cty_cod, mobile)
    const opts = {
      type: 'unicode'
    }
    nexmo.message.sendSms(from, to, text, opts, (err, data) => {
      /** *
       * data :
            { 'message-count': '1',
                messages:
                [ { to: '886938891988',
                'message-id': '0F0000010DE3C4C8',
                status: '0',
                'remaining-balance': '10.00010000',
                'message-price': '0.04420000',
                network: '46601' } ]
            }
        * */
      if (err) {
        return reject(err)
      }
      if (data && data.messages.length > 0) {
        const msgInfo = data.messages[0]
        if (msgInfo.status === '0') {
          resolve()
        } else {
          reject(new Error(`Sending to [${to}]. , Error code : ${msgInfo.status}, Error message : ${msgInfo['error-text']}`))
        }
      }
    })
  })

module.exports = {
  send
}
