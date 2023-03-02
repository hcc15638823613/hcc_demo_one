export function getUrlParams(url: string) {
  if (!url) return {};
  let urlStr = url?.split('?')[1];
  let obj: any = {};
  let paramsArr = urlStr?.split('&') || [];
  for (let i = 0, len = paramsArr.length; i < len; i++) {
    let arr = paramsArr[i].split('=');
    obj[arr[0]] = arr[1];
  }
  return obj;
}