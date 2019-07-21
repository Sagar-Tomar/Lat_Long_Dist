const fs = require('fs');
const readline = require('readline');
const path = require('path');


const usersData = path.join(__dirname, 'usersData.txt');

function calDistUsingFile(filePathName, distInKm, refLat1, refLong1) {
  var arrayOfUsers = [];
  const readFileInterface = readline.createInterface({
    input: fs.createReadStream(filePathName),
    output: process.stdout,
    console: false
  });

  readFileInterface.on('line', function(line) {
    let usersLocation = JSON.parse(line);

    if (calCulateDistance(refLat1, refLong1, parseFloat(usersLocation.latitude), parseFloat(usersLocation.longitude)) <= distInKm) {
      arrayOfUsers.push({ "user_id": usersLocation.user_id, "name": usersLocation.name });
    };

  }).on('close', function() {
  
    arrayOfUsers = arrayOfUsers.sort(function(a, b) {
      return a.user_id - b.user_id;

    });
    console.log("Users satisfying condition");
    console.log(arrayOfUsers);
    return arrayOfUsers;



  });
}



function calCulateDistance(lat1, lon1, lat2, lon2) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    let radian1 = Math.PI * lat1 / 180;
    let radian2 = Math.PI * lat2 / 180;
    let radAngleLon = Math.PI * (lon1 - lon2) / 180;
    let dist = Math.sin(radian1) * Math.sin(radian2) + Math.cos(radian1) * Math.cos(radian2) * Math.cos(radAngleLon);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    return dist * 180 / Math.PI * 60 * 1.1515 * 1.609344;
  }
}




calDistUsingFile(usersData, 100, 53.339428, -6.257664);


module.exports = calDistUsingFile;

