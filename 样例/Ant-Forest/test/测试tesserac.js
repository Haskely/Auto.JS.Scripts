
let TesseracOcrUtil = require('../lib/TesseracOcrUtil.js')
console.show()
let base64 = 'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF12lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMDgtMDVUMjM6NDg6MzgrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDgtMDVUMjM6NDg6MzgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIwLTA4LTA1VDIzOjQ4OjM4KzA4OjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYyOGZkZmM5LTVmMzEtNGY2Yy1hOTQxLWFlOTg0MGM2NjJkMCIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmJkNGRhOWY2LTVmY2YtZjE0YS04OTBhLWE3MjM5ZTUxNzAyOCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjBhMmUwNDNhLWFjMzItNGYyYi04ODI2LTlhNDVjM2VhYmM0NyIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjBhMmUwNDNhLWFjMzItNGYyYi04ODI2LTlhNDVjM2VhYmM0NyIgc3RFdnQ6d2hlbj0iMjAyMC0wOC0wNVQyMzo0ODozOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjYyOGZkZmM5LTVmMzEtNGY2Yy1hOTQxLWFlOTg0MGM2NjJkMCIgc3RFdnQ6d2hlbj0iMjAyMC0wOC0wNVQyMzo0ODozOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+KmkHqAAAAK1JREFUSIntlMEKxCAMRCdx8f9/WLMHtxK0sa5WaMG5qWGYvKjA1tbWH6LLChEBQFRWpv2fizplZhERER5LpH310nuffAEMWicRUc6b7EIIOJq4AJLj6JbrzVNoXalr0D2aAvJIa00wzx0VH+t2fmZyFVew0CCQnsGa1lab2j2fnpYtHKMZyuLYfjtaN6S2oPU+sxp9OzLmUzfmvHCML5VzjnkJFiaiGOPYj9zWF9aESETnIZk2AAAAAElFTkSuQmCC'
let start = new Date().getTime()
let result = TesseracOcrUtil.recognize(base64)
log('??????API????????????' + (new Date().getTime() - start) + 'ms')
if (result) {
  log('???????????????' + JSON.stringify(result))
  if (result.code === 'success') {
    log('tesserac???????????????' + JSON.stringify(result))
    let countdown = parseInt(result.word)
    log('??????????????????' + countdown)
  } else {
    log('?????????????????????')
  }
} else {
  log('????????????')
}

let imgResult = TesseracOcrUtil.getImageNumber(base64)
log('imageNumber???????????????' + imgResult)