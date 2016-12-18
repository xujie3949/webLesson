/**
 * Created by 28203 on 2016/12/4 0004.
 */
window.staffService = {
    getStaffByDepartment: function (department) {
        var res = {
            success: false,
            msg: ''
        };

        var staffs = [];
        var allStaffs = this.getStaffs();
        for(var i = 0; i < allStaffs.length; ++i) {
            var staff = allStaffs[i];
            if (staff.department === department) {
                staffs.push(staff);
            }
        }

        res.data = staffs;
        res.success = true;
        res.msg = '操作成功!';
        return res;
    },

    getStaffs: function () {
        var json = localStorage.getItem('staffs');
        if (json) {
            return JSON.parse(json);
        }
        return [];
    },

    setStaffs: function (staffs) {
        localStorage.setItem('staffs', JSON.stringify(staffs));
    },

    addStaff: function (staff) {
        var staffs = this.getStaffs();
        staffs.push(staff);
        this.setStaffs(staffs);
    },

    delStaff: function (staff) {
        var staffs = this.getStaffs();
        for (var i = 0; i < staffs.length; ++i) {
            if (staffs[i].number === staff.number) {
                staffs.splice(i, 1);
            };
        }
        this.setStaffs(staffs);
    }
};
