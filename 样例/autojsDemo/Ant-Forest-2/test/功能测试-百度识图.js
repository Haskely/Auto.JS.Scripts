/*
 * @Author: TonyJiangWJ
 * @Date: 2019-12-12 17:46:17
 * @Last Modified by: TonyJiangWJ
 * @Last Modified time: 2020-08-06 20:05:24
 * @Description: 
 */
let BaiduOcrUtil = require('../lib/BaiduOcrUtil.js')
console.show()
let base64 = 'iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAYAAACO98lFAAAE+ElEQVR42uWbZ0srWxSG57fbu2Kv2Dt+sHcULNixY8desPfuuvfZMIfJJPFMokl2ziwYEBJ15smq79oxsrKyJCMjQ9LT011xlZeXS29vr2xtbcnb25t8fX2JkZSUJHFxcRITE+OKKzExUfjgS0tLZXJyUp6ensRIS0uT+Ph410CwXjgAIAyoQMeNEGJjY5VHGLm5uYqIGyFwkQ+N4uJiSUlJcS2EhIQEMciW5AW3QiAkjMbGRpUt3QqBy+js7JTs7Gx3QxgZGZHCwkJ3Q5ifn1dlwtUQdnZ2pKKiwt0Qzs/Ppba21t0QXl9fpbm52VXzgxeEz89P6erqUhOWayHI/zY6Oip0jq6GsLy8LA0NDe6GsL+/r0Ii2m4+MzNTpqam5PLyUgkkXBcXF2o8ZjDy9Tt2+wPh5uZGhQTJkV46GgBUVVXJ3d2d+DOeyVfp9wsBiWlxcVHpCtEAAQ/gIf9mvMfuEX4hYNvb24pcNIzVuLtTm5iYcA7h7OxMBgcHo2KY4l6tRk6jupWUlMjBwYHHa7zXFwRaA2B6QHh8fFTewB/SHcLz87PHgxYVFf15jZ+txnvtEO7v71WD6FEdsI+PD5Vo6uvrtZfb+BTtLu3P5Xku62u7u7te3m5Yf4ES09/fL3l5eVpD8BXXgbzus0+wUqNK4A06V4mQQsDNrq6ulDewi9AVRCAQKP8BQTBDAqGFbKvrPoIHcwqB5wkYAkaZ6enp0VaFfn9/97hfqzxorw63t7fBQaCsUC517RnYH1ptb29PeS4XPYO9hwgKAgmSQaSlpUVLOd7eLH1nY2NjwUHAoD07OyuVlZXaqU7clxMj0TtR0v1CwBvorNjl69Y8EabfTZCBhMK3EDAS0NLSkuob2NnpBIJPmLyFRsonjmBsN5L7jyFg5AYmMcZXnc8xdHd3eyV3px5sOImrk5MTqa6u1npxa58ekQwDktf+ZuSGhYUFdd5HRwBlZWVe9xzILsURBHLD9fW10hvy8/O1g0CHaw/hgIVWp0Yi6ujo0EqGI+7tzZOT3iBoCGTi9fV11ZklJydrAYESbi/tOTk5oYPA4EJY0KywydahWhwfH3vcIwvmoPYOgRikHx4epK+vL+LiC8Kw3QjXkEMw7fDwULliJFtqBCB7qx9MUxc0BP7h5uamtLW1RWSZy2rALrhSxoNewwVr9A+AaGpqUh1lOCEMDAx43Q/DXtghmD3EysqKWuhG6/HgH0OgrSZR4op1dXVReUT4xxBMYzNM54ZHhDs0tIFgJksGFw6IkriiZcP9qxAIDTI2XSX1OloOjv8qBGvV2NjYUAc/GLh0T5ghgWCKGkdHR6qhQgbHK3QNj5BBMFtsZo25uTmthq6wQjD7CFZ7q6ur0t7erqUeEXIIVq9Aj2DPyRkInb57FTYIphEeKNgcvNJFsww7BMKDnQE7gfHxcSXn01NEchoNOwRrT8GugHGYngIR19/Zw38Wgn3TRQWh0yREqCLhzBcRh2AFcXp6qrpNNkckz3AdFNECghXGy8uLWrXPzMyojpOlD9/dDKXCrRUE+wkTTqSSM1ixIZigaTKhEi6/eQRZWwgo26ZnoFewUCFUWAAhsJog/mkI/sQbJPa1tTWZnp6WoaEhpXEi5jCfkFSD8ZCogeALCuHC4UxCZnh4WFpbW6WmpkaVW2aVgoIClU8IIcTg1NRUNciRX0i6JrD/AIVK3he5NivGAAAAAElFTkSuQmCC'
let start = new Date().getTime()
let result = BaiduOcrUtil.recognize(base64)
log('调用API总耗时：' + (new Date().getTime() -start) + 'ms')
if (result) {
  log('识图结果：' + JSON.stringify(result))
  if (result.words_result_num > 0) {
    let filter = result.words_result.filter(r => isFinite(parseInt(r.words)))
    if (filter && filter.length > 0) {
      log('百度识图结果：' + JSON.stringify(filter))
      let countdown = parseInt(filter[0].words)
      log('倒计时时间：' + countdown)
    }
  } else {
    log('没能识别出内容')
  }
} else {
  log('识别失败')
}

let imgResult = BaiduOcrUtil.getImageNumber(base64)
log('imageNumber调用结果：' + imgResult)