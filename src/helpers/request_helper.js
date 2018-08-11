const RequestHelper = function (url) {
  this.url = url
}
//Get request using Promises:
// RequestHelper.prototype.get = function (onComplete) {
//   return new Promise((resolve,reject)=>{
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', this.url);
//     xhr.send();
//     xhr.setRequestHeader('Accept', 'application/json');
//     xhr.addEventListener('load', function() {
//       if(this.status !== 200){
//         reject(`Oh not the status code is ${xhr.status}`);
//       }
//       const data = JSON.parse(this.responseText);
//       resolve(data);
//     });
//   });
// }

//Get request using Feth:
RequestHelper.prototype.get = function (onComplete) {
  return fech(this.url)
  .then(response => response.json);
}


module.exports = RequestHelper;
