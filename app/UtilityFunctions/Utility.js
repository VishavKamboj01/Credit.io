const getReadableDate = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const parts = date.toString().split(" ");
  const readableDate = parts[2] +" "+ parts[1] +" "+ parts[3];
  return readableDate;
};

function sqlToJsDate(sqlDate) {
  //sqlDate in SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")

  var sqlDateArr1 = sqlDate.split("-");
  //format of sqlDateArr1[] = ['yyyy','mm','dd hh:mm:ms']
  var sYear = sqlDateArr1[0];
  var sMonth = (Number(sqlDateArr1[1]) - 1).toString();
  var sqlDateArr2 = sqlDateArr1[2].split(" ");
  //format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']
  var sDay = sqlDateArr2[0];
  var sqlDateArr3 = sqlDateArr2[1].split(":");
  //format of sqlDateArr3[] = ['hh','mm','ss.ms']
  var sHour = sqlDateArr3[0];
  var sMinute = sqlDateArr3[1];
  var sqlDateArr4 = sqlDateArr3[2].split(".");
  //format of sqlDateArr4[] = ['ss','ms']
  var sSecond = sqlDateArr4[0];

  return new Date(sYear, sMonth, sDay, sHour, sMinute, sSecond);
}

function jsToSqlDate(date) {
  const sqlDate =
    date.getUTCFullYear() +
    "-" +
    ("00" + (date.getUTCMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getUTCDate()).slice(-2) +
    " " +
    ("00" + date.getUTCHours()).slice(-2) +
    ":" +
    ("00" + date.getUTCMinutes()).slice(-2) +
    ":" +
    ("00" + date.getUTCSeconds()).slice(-2);
  return sqlDate;
}

function getDate(dateTime){
  return dateTime.toISOString().split('T')[0];
}

function formatTime(d) {
  let date = new Date(d);
  var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const time = hours + ":" + minutes;
  return timeConvert(time);
}

function timeConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
    time[0] = +(time[0] % 12) || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
}

export default {
  getReadableDate,
  formatTime,
  sqlToJsDate,
  jsToSqlDate,
  getDate,
};
