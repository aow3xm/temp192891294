function NhanVien(tknv, name, email, password, date, luongcb, chucVu, gioLam) {
    this.tknv = tknv;
    this.name = name;
    this.email = email;
    this.password = password;
    this.datepicker = date;
    this.luongCB = luongcb;
    this.chucvu = chucVu;
    this.gioLam = gioLam;
    this.tongLuong = function () {
        if (this.chucvu == "Sếp") {
            return this.luongCB * 3;
        } else if (this.chucvu == "Trưởng phòng") {
            return this.luongCB * 2;
        } else if (this.chucvu == "Nhân viên") {
            return this.luongCB;
        }
    }
    this.xepLoai = function () {
        if (this.gioLam >= 192) {
            return "Nhân viên xuất sắc";
        } else if (this.gioLam >= 176) {
            return "Nhân viên giỏi";
        } else if (this.gioLam >= 160) {
            return "Nhân viên khá";
        } else {
            return "Nhân viên trung bình";
        }
    }
}
