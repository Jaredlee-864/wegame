function getCookie(key) {
  var arr = document.cookie.split("; ");
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].split("=")[0] === key) {
      return arr[i].split("=")[1];
    }
  }
  return "";
}
function removeCookie(key, obj = {}) {
  obj.expires = -1;
  setCookie(key, null, obj);
}
function setCookie(key, val, obj = {}) {
  var p = obj.path ? `;path=${obj.path}` : "";

  var dateStr = "";
  if (obj.expires) {
    var d = new Date();
    d.setDate(d.getDate() + obj.expires);
    dateStr = `;expires=${d}`;
  }
  document.cookie = `${key} = ${val}${p}${dateStr}`;
}
