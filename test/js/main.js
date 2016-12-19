/**
 * Created by 28203 on 2016/12/4 0004.
 */

window.mainVM = {
    selectedCell: null,
    staffs: null,
    selectedDepartment: null,
    showDepartmentList: false,
    checked: false,
    onload: function () {
        var lastLoginSucceedTime = localStorage.getItem('lastLoginSucceedTime');
        if (lastLoginSucceedTime) {
            var now = new Date().getTime();
            var millisecondOfWeek = 7 * 24 * 60 * 60 * 1000;
            if (now - lastLoginSucceedTime > millisecondOfWeek) {
                alert('距离上次登录成功超过了一周,请重新登录!');
                window.location = 'login.html';
                return;
            }

            var lastUsername = localStorage.getItem('lastUsername');
            localStorage.setItem('user', lastUsername);
            this.selectedDepartment = '研发部';
            this.staffs = staffService.getStaffByDepartment(this.selectedDepartment).data;
            this.showDepartmentList = true;
            this.refreshDepartmentList();
            this.refreshTable();
            this.refreshCurrentLocation();
            this.refreshCheck();
            this.refreshUser();
        } else {
            var user = localStorage.getItem('user');
            if (!user) {
                window.location = 'login.html';
                return;
            }

            this.selectedDepartment = '研发部';
            this.staffs = staffService.getStaffByDepartment(this.selectedDepartment).data;
            this.showDepartmentList = true;
            this.refreshDepartmentList();
            this.refreshTable();
            this.refreshCurrentLocation();
            this.refreshCheck();
            this.refreshUser();
        }
    },

    refreshUser: function () {
        var user = localStorage.getItem('user');
        if (user) {
            var userDiv = document.getElementById('user');
            userDiv.innerHTML = user;
        }
    },

    showOrHiddenDepartmentList: function () {
        this.showDepartmentList = !this.showDepartmentList;
        var departmentList = document.getElementById('departmentList');
        if (this.showDepartmentList) {
            departmentList.style.visibility = 'visible';
        } else {
            departmentList.style.visibility = 'collapse';
        }
    },

    refreshDepartmentList: function () {
        var departmentList = document.getElementById('departmentList');
        if (this.showDepartmentList) {
            departmentList.style.visibility = 'visible';
        } else {
            departmentList.style.visibility = 'collapse';
        }

        var departments = departmentList.getElementsByTagName('div');
        for (var i = 0; i < departments.length; ++i) {
            var department = departments[i];
            if (department.innerHTML === this.selectedDepartment) {
                department.className = 'selectedDepartment';
            } else {
                department.className = '';
            }
        }
    },

    refreshTable: function () {
        var table = document.getElementById('table');

        for (var i = table.rows.length - 1; i > 0; i--) {
            table.deleteRow(i);
        }

        for (var i = 0; i < this.staffs.length; i++) {
            var staff = this.staffs[i];
            staff.checked = this.checked;
            var row = table.insertRow(i + 1);
            this.createRow(staff, row);
        }
    },

    createRow: function (staff, row) {
        var cell = row.insertCell(0);
        var checkbox = document.createElement('input');
        checkbox.id = staff.number;
        checkbox.type = 'checkbox';
        checkbox.checked = staff.checked;
        checkbox.onclick = this.onCheckboxClick;
        cell.appendChild(checkbox);
        cell = row.insertCell(1);
        this.createCell('number', staff, cell);
        cell = row.insertCell(2);
        this.createCell('name', staff, cell);
        cell = row.insertCell(3);
        this.createCell('department', staff, cell);
        cell = row.insertCell(4);
        this.createCell('position', staff, cell);
        cell = row.insertCell(5);
        this.createCell('joinTime', staff, cell);

        return row;
    },

    onCheckboxClick: function (e) {
        var number = e.target.id;
        for (var i = 0; i < mainVM.staffs.length; ++i) {
            var staff = mainVM.staffs[i];
            if (staff.number === number) {
                staff.checked = !staff.checked;
                break;
            }
        }
    },

    createCell: function (property, staff, cell) {
        var cellid = staff.number + staff[property];
        var text = staff[property];
        if (this.selectedCell === cellid) {
            this.createEditCell(cellid, text, cell);
        } else {
            this.createReadOnlyCell(cellid, text, cell);
        }
    },

    createEditCell: function (cellid, text, cell) {
        var input = document.createElement('input');
        input.id = cellid;
        input.type = 'input';
        input.text = text;
        cell.appendChild(input);
    },

    createReadOnlyCell: function (cellid, text, cell) {
        var div = document.createElement('div');
        div.id = cellid;
        div.innerHTML = text;
        cell.appendChild(div);
    },

    refreshCurrentLocation: function () {
        var currentLocation = document.getElementById('currentLocation');
        currentLocation.innerHTML = '当前位置:部门列表 -> '+ this.selectedDepartment;
    },

    onDepartmentClick: function (e) {
        this.selectedDepartment = e.innerHTML;
        this.staffs = staffService.getStaffByDepartment(this.selectedDepartment).data;
        this.refreshDepartmentList();
        this.refreshTable();
        this.refreshCurrentLocation();
        this.refreshCheck();
    },

    refreshCheck: function () {
        var checkAll = document.getElementById('checkAll');
        checkAll.checked = this.checked;
    },

    checkAll: function (checked) {
        this.checked = checked;
        this.refreshTable();
    },

    exit: function () {
        localStorage.removeItem('user');
        window.location = 'login.html'
    },

    add: function () {
        var number = document.getElementById('number');
        var name = document.getElementById('name');
        var department = document.getElementById('department');
        var position = document.getElementById('position');
        var joinTime = document.getElementById('joinTime');
        var staff = {
            number: number.value,
            name: name.value,
            department: department.value,
            position: position.value,
            joinTime: joinTime.value
        };
        staffService.addStaff(staff);
        this.staffs = staffService.getStaffByDepartment(this.selectedDepartment).data;
        this.refreshTable();
    },

    del: function () {
        if (confirm('确定要删除选中项吗?')) {
            for (var i = 0; i < this.staffs.length; i++) {
                var staff = this.staffs[i];
                if (staff.checked) {
                    staffService.delStaff(staff);
                }
            }

            this.staffs = staffService.getStaffByDepartment(this.selectedDepartment).data;
            this.refreshTable();
        }
    }
};
