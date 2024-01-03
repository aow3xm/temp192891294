var arrNhanVien = [];
document.querySelector('#btnThemNV').addEventListener('click', themNhanVien)
function themNhanVien() {
    document.querySelector('#btnThemNV').disabled = false;
    document.querySelector('#btnCapNhat').disabled = true;
    var listInputs = document.querySelectorAll('.form-group input, .form-group select');
    listInputs[0].disabled = false;
    var listSpans = document.querySelectorAll('.sp-thongbao');
    var isValid = true;

    for (var i = 0; i < listInputs.length; i++) {
        var inputId = listInputs[i].id;
        var val = listInputs[i].value;
        var error = listSpans[i].id;
        isValid &= checkEmpty(val, error);
        switch (inputId) {
            case 'name':
                isValid &= checkIncludeNumber(val, error);
                break;
            case 'tknv':
                isValid &= checkDigit(val.length, 4, 6, error, 'ký tự');
                break;

            case 'email':
                isValid &= checkEmail(val, error);
                break;
            case 'luongCB':
                isValid &= checkDigit(val, 1000000, 20000000, error, 'đồng');
                isValid &= checkIncludeLetter(val, error);
                break;
            case 'gioLam':
                isValid &= checkDigit(val, 80, 200, error, 'giờ');
                isValid &= checkIncludeLetter(val, error);
                break;
        }

    }
    if (isValid) {
        var nhanVien = new NhanVien();
        nhanVien.tknv = listInputs[0].value;
        nhanVien.name = listInputs[1].value;
        nhanVien.email = listInputs[2].value;
        nhanVien.password = listInputs[3].value;
        nhanVien.datepicker = listInputs[4].value;
        nhanVien.luongCB = listInputs[5].value;
        nhanVien.chucvu = listInputs[6].value;
        nhanVien.gioLam = listInputs[7].value;
        arrNhanVien.push(nhanVien)
        luuDuLieu();
        hienThiDuLieu();
        // document.querySelector('form').reset();
        console.log(arrNhanVien)
    }
}

function luuDuLieu() {
    var jsonArrNhanVien = JSON.stringify(arrNhanVien);
    localStorage.setItem('arrNhanVien', jsonArrNhanVien)
}

function hienThiDuLieu() {
    if (!localStorage.getItem('arrNhanVien')) {
        localStorage.setItem('arrNhanVien', '[]');
    }
    var jsonArrNhanVien = localStorage.getItem('arrNhanVien');
    arrNhanVien = JSON.parse(jsonArrNhanVien);
    var content = '';
    for (var i = 0; i < arrNhanVien.length; i++) {
        var nhanVien = arrNhanVien[i];
        var nv = new NhanVien(nhanVien.tknv, nhanVien.name, nhanVien.email, nhanVien.password, nhanVien.datepicker, nhanVien.luongCB, nhanVien.chucvu, nhanVien.gioLam);
        content += `
            <tr>
                <td>${nv.tknv}</td>
                <td>${nv.name}</td>
                <td>${nv.email}</td>
                <td>${nv.datepicker}</td>
                <td>${nv.chucvu}</td>
                <td>${nv.tongLuong()}</td>
                <td>${nv.xepLoai()}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNhanVien('${nv.tknv}')">Xóa</button>
                    <button class="btn btn-primary mt-2" data-toggle="modal" data-target="#myModal" onclick="chinhSua('${nv.tknv}')">Chỉnh sửa</button>
                </td>
            </tr>
        `
    }
    document.querySelector('#tableDanhSach').innerHTML = content;


}

function xoaNhanVien(tknv) {
    for (var i = arrNhanVien.length - 1; i >= 0; i--) {
        var nhanVien = arrNhanVien[i];
        if (nhanVien.tknv === tknv) {
            arrNhanVien.splice(i, 1);
        }
    }
    luuDuLieu();
    hienThiDuLieu(arrNhanVien);

}
function chinhSua(tknv) {
    document.querySelector('#btnThemNV').disabled = true;
    document.querySelector('#btnCapNhat').disabled = false;
    var listInputs = document.querySelectorAll('.form-group input, .form-group select');
    listInputs[0].disabled = true;
    var listSpans = document.querySelectorAll('.sp-thongbao');
    var isValid = true;
    for (var i = 0; i < arrNhanVien.length; i++) {
        var nhanVien = arrNhanVien[i];
        if (nhanVien.tknv === tknv) {
            listInputs[0].value = nhanVien.tknv;
            listInputs[1].value = nhanVien.name;
            listInputs[2].value = nhanVien.email;
            listInputs[3].value = nhanVien.password;
            listInputs[4].value = nhanVien.datepicker;
            listInputs[5].value = nhanVien.luongCB;
            listInputs[6].value = nhanVien.chucvu;
            listInputs[7].value = nhanVien.gioLam;
        }
    }
    for (var i = 0; i < listInputs.length; i++) {
        var inputId = listInputs[i].id;
        var val = listInputs[i].value;
        var error = listSpans[i].id;
        isValid &= checkEmpty(val, error);
        switch (inputId) {
            case 'name':
                isValid &= checkIncludeNumber(val, error);
                break;
            case 'tknv':
                isValid &= checkDigit(val.length, 4, 6, error, 'ký tự');
                break;

            case 'email':
                isValid &= checkEmail(val, error);
                break;
            case 'luongCB':
                isValid &= checkDigit(val, 1000000, 20000000, error, 'đồng');
                isValid &= checkIncludeLetter(val, error);
                break;
            case 'gioLam':
                isValid &= checkDigit(val, 80, 200, error, 'giờ');
                isValid &= checkIncludeLetter(val, error);
                break;
        }

    }
    if (isValid) {
        var oldButton = document.querySelector('#btnCapNhat');
        var newButton = oldButton.cloneNode(true);
        oldButton.parentNode.replaceChild(newButton, oldButton);
        newButton.addEventListener('click', function () {
            capNhatNhanVien(tknv);
        });
    }

}
function capNhatNhanVien(tknv) {
    for (var i = 0; i < arrNhanVien.length; i++) {
        var nhanVien = arrNhanVien[i];
        if (nhanVien.tknv === tknv) {
            nhanVien.name = document.querySelector('#name').value;
            nhanVien.email = document.querySelector('#email').value;
            nhanVien.password = document.querySelector('#password').value;
            nhanVien.datepicker = document.querySelector('#datepicker').value;
            nhanVien.luongCB = document.querySelector('#luongCB').value;
            nhanVien.chucvu = document.querySelector('#chucvu').value;
            nhanVien.gioLam = document.querySelector('#gioLam').value;
        }
    }
    luuDuLieu();
    hienThiDuLieu(arrNhanVien);
}
document.querySelector('#btnTimNV').addEventListener('click', timNhanVien);
function timNhanVien() {
    var xepLoaiCanTim = document.querySelector('#searchName').value.trim();
    var jsonArrNhanVien = localStorage.getItem('arrNhanVien');
    if (jsonArrNhanVien) {
        var storedNhanVien = JSON.parse(jsonArrNhanVien);

        var recreatedNhanVien = storedNhanVien.map(function (data) {
            return new NhanVien(data.tknv, data.name, data.email, data.password, data.datepicker, data.luongCB, data.chucvu, data.gioLam);
        });

        var ketQuaTimKiem = recreatedNhanVien.filter(function (nhanVien) {
            return nhanVien.xepLoai().toLowerCase().includes(xepLoaiCanTim.toLowerCase());
        });
        var tbody = document.querySelector('#tableDanhSach');
        tbody.innerHTML = '';


        var content = '';
        for (var i = 0; i < ketQuaTimKiem.length; i++) {
            var nhanVien = ketQuaTimKiem[i];
            var nv = new NhanVien(nhanVien.tknv, nhanVien.name, nhanVien.email, nhanVien.password, nhanVien.datepicker, nhanVien.luongCB, nhanVien.chucvu, nhanVien.gioLam);
            content += `
            <tr>
                <td>${nv.tknv}</td>
                <td>${nv.name}</td>
                <td>${nv.email}</td>
                <td>${nv.datepicker}</td>
                <td>${nv.chucvu}</td>
                <td>${nv.tongLuong()}</td>
                <td>${nv.xepLoai()}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNhanVien('${nv.tknv}')">Xóa</button>
                    <button class="btn btn-primary mt-2" data-toggle="modal" data-target="#myModal" onclick="chinhSua('${nv.tknv}')">Chỉnh sửa</button>
                </td>
            </tr>
        `
        }
        document.querySelector('#tableDanhSach').innerHTML = content;

    }
}

document.querySelector('#searchName').addEventListener('input', function () {
    if (this.value == '') {
        hienThiDuLieu();
    }
})
hienThiDuLieu();

