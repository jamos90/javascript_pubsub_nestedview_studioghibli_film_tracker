const RequestHelper = function (url) {
  this.url = url
}

// Get request using Promises:
RequestHelper.prototype.get = function () {
  return fetch(this.url)
  .then (response => response.json());
};


// // Get request using Promises:
// RequestHelper.prototype.get = function () {
//   return new Promise((resolve, reject) =>{
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', this.url);
//     xhr.setRequestHeader('Accept', 'application/json');
//     xhr.send();
//     xhr.addEventListener('load', function() {
//       if(this.status !== 200){
//         reject(`Oh no! The status is ${xhr.status}`);
//       }
//       const data = JSON.parse(this.responseText);
//       resolve(data);
//     });
//   });
//
// };



module.exports = RequestHelper;
