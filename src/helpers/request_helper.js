const RequestHelper = function (url) {
  this.url = url
}
// Get request using Promises:
RequestHelper.prototype.get = function (onComplete) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', this.url);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.addEventListener('load', function() {
    if(this.status !== 200){
      return;
    }
    const data = JSON.parse(this.responseText);
    onComplete(data);
  });
  xhr.send();
};

module.exports = RequestHelper;

//Get request using Feth:
// RequestHelper.prototype.get = function (onComplete) {
//   return fech(this.url)
//   .then(response => response.json);
// }


module.exports = RequestHelper;
