const mysql = require('mysql');
const bcrypt = require('bcrypt');
const ipc = require('electron').ipcRenderer;


(function ($) {
    "use strict";


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function () {
        if (showPass == 0) {
            $(this).next('input').attr('type', 'text');
            $(this).find('i').removeClass('fa-eye');
            $(this).find('i').addClass('fa-eye-slash');
            showPass = 1;
        } else {
            $(this).next('input').attr('type', 'password');
            $(this).find('i').removeClass('fa-eye-slash');
            $(this).find('i').addClass('fa-eye');
            showPass = 0;
        }

    });


})(jQuery);

$('#submit-login-form').on('click', function (event) {
    event.preventDefault();
    try {
        connection = createMysqlConnection();
    } catch (err) {
        console.log(err);
        return;
    }

    let email = $('#login_email').val();
    let password = $('#password').val();
    // console.log(stringToHash('1234567890'));
    if (email && password) {
        // Perform a query
        $query = 'SELECT * FROM `users` WHERE email = ?';

        connection.query($query, [email], function (err, rows, fields) {
            if (err) {
                console.log("An error ocurred performing the query.");
                console.log(err);
                return;
            }
            // Query return Success
            console.log("Query succesfully executed", rows);
            if (typeof rows !== 'undefined' && rows.length > 0) {
                let hash_password = rows[0].password;
                hash_password = hash_password.replace(/^\$2y(.+)$/i, '$2a$1');

                // Load hash from your password DB.
                bcrypt.compare(password, hash_password, function (err, res) {
                    // result == true
                    console.log(res)
                    if (res) {
                        ipc.sendSync('entry-accepted', 'ping');
                    }
                });
            } else {
                console.log('error');
            }
        });
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
