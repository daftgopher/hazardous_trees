const baseUri = 'https://data.cityofnewyork.us/resource/';
const data2015 = 'uvpi-gqnh';

class TreeData {

  // getPoorHealthTreeData(){
  //   let request = new XMLHttpRequest();
  //   return new Promise(function(resolve, reject){
  //     request.onload = function(){
  //       if (this.status >= 200 && this.status < 400) {
  //         resolve(JSON.parse(this.response));
  //       } else {
  //         reject(console.error('Error'));
  //       }
  //     }
  //     request.open('GET', 'https://data.cityofnewyork.us/resource/uvpi-gqnh.json?$where=health = "Poor"', true);
  //     request.send();
  //   });
  // }
}

module.exports = new TreeData();
