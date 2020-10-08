const mysql = require('mysql');

$(document).ready(function () {
  // $('#dataTable').DataTable();
  try {
    connection = createMysqlConnection();

    all_rooms_details = 'SELECT * FROM rooms';
    price_details_query = 'SELECT * FROM room_prices';
    room_types = 'SELECT * FROM room_types';
    room_status = 'SELECT * FROM room_statuses';
    reserved_rooms = 'SELECT DISTINCT room_id FROM bookings b2' +
      'WHERE is_valid =1 AND LOCALTIME() between' +
      'reserved_from and reserved_to';



    connection.query(all_rooms_details, function (err, all_rooms_details_result, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }
      // Query return Success
      // console.log("Query succesfully executed", all_rooms_details_result);
      all_rooms_details_result.forEach(element => {
        // element.key = 'TEST'
        console.log(element);
      });
    });
    // console.log("Query succesfully executed", all_rooms_details_result);


  } catch {
    console.log("errro")

  }
});



// Connect to Database
function createMysqlConnection() {
  // Add the credentials to access your database
  var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'P@ssw0rd', // or the original password : 'apaswword'
    database: 'Hotel_Saptanil'
  });

  // connect to mysql
  connection.connect(function (err) {
    // in case of error
    if (err) {
      console.log(err.code);
      console.log(err.fatal);
    } else {
      console.log('success');
    }
  });

  return connection;
}