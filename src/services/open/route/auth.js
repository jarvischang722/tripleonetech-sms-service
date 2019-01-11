const { validate, getSchema, T } = require('../../../validator')

const SCHEMA = {
  merchant_code: T.string().regex(/^[a-zA-Z0-9_]+$/).min(6).max(50)
    .required(),
  country_code: T.string().max(5).required(),
  mobile: T.string().regex(/^[0-9]+$/).required(),
  locale: T.string().valid('en', 'zh-cn').default('en'),
  sign: T.string().required(),
}

module.exports = (route) => {
  const sendVerificationCode = async (req, res, next) => {
    try {
      validate(req.body, getSchema(SCHEMA, 'merchant_code', 'country_code', 'mobile', 'locale', 'sign'))
      // const result = await generateOpenToken(req.merchant.id)
      res.json({
        success: true,
        code: 0
      })
    } catch (err) {
      return next(err)
    }
  }

  route.post('/send_verification_code ', sendVerificationCode)
}
