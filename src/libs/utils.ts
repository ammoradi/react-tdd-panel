const phoneNumberRegex: RegExp = /^0?9\d{9}$/

export const isPhoneValid = (phoneNumber: string) =>
  phoneNumberRegex.test(phoneNumber)

export const zeroPad = (num: number, places: number): string =>
  String(num).padStart(places, '0')

export const isAsync = (func: (...rest: any) => any): boolean => {
  const string = func.toString().trim()

  return !!(string.match(/^async /) || string.match(/return _ref[^.]*\.apply/))
}

// JavaScriptSimpleEncoder => iSmtpplierEcnScaovdaeJr
// see https://gist.github.com/ammoradi/d327078962545d60a46f32a655628163
export const encodeString = (inputStr: string): string => {
  const len = inputStr.length

  if (!len) return inputStr

  const isLenEven = len % 2 === 0

  const str: string = isLenEven ? `${inputStr} ` : inputStr
  const halfLength: number = Math.floor(len / 2)
  let result: string = str[halfLength]

  for (let i = 1; i <= halfLength; i += 1) {
    result += str[halfLength - i]
    result += str[halfLength + i]
  }

  if (isLenEven) return result.slice(0, len)

  return result
}

// iSmtpplierEcnScaovdaeJr => JavaScriptSimpleEncoder
// see https://gist.github.com/ammoradi/d327078962545d60a46f32a655628163
export const decodeString = (str: string): string => {
  const len = str.length

  if (!len) return str

  let result = str[0]
  let factor = -1

  for (let i = 1; i < len; i += 1) {
    result = factor > 0 ? result + str[i] : str[i] + result
    factor *= -1
  }

  return result
}

export const getBase64 = (img: Blob, callback: (url: any) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
