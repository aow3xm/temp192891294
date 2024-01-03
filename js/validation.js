function checkEmpty(value, errorId) {
    if (!value) {
        document.getElementById(errorId).innerHTML = 'Không được để trống';
        document.getElementById(errorId).style.display = 'block';
        return false;
    }
    else {
        document.getElementById(errorId).innerHTML = '';
        return true;
    }
}

function checkDigit(value, min, max, errorId, msg) {
    if (value < min || value > max) {
        document.getElementById(errorId).innerHTML = `Vui lòng nhập từ ${min} đến ${max} ${msg}`;
        document.getElementById(errorId).style.display = 'block';
        return false;
    }
    else {
        document.getElementById(errorId).innerHTML = '';
        return true;
    }
}
function checkIncludeLetter(value, errorId) {
    if (value.match(/[a-z]/i)) {
        document.getElementById(errorId).innerHTML = 'Không được nhập chữ';
        document.getElementById(errorId).style.display = 'block';

        return false;
    }
    else {

        return true;
    }

}
function checkIncludeNumber(value, errorId) {
    if (value.match(/\d+/g)) {
        document.getElementById(errorId).innerHTML = 'Không được nhập số';
        document.getElementById(errorId).style.display = 'block';

        return false;
    }
    else {

        return true;
    }
}


function checkEmail(value, errorId) {
    if (!value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
        document.getElementById(errorId).innerHTML = 'Email không hợp lệ';
        document.getElementById(errorId).style.display = 'block';
        return false;
    }
    else {
        return true;
    }
}