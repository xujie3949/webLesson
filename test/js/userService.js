/**
 * Created by 28203 on 2016/12/4 0004.
 */
window.userService = {
    login: function (username, password) {
        var res = {
            success: false,
            msg: ''
        };

        var users = this.getUsers();
        if(!users.hasOwnProperty(username)) {
            res.success = false;
            res.msg = '不存在的用户名!';
            return res;
        }

        if(password !== users[username]) {
            res.success = false;
            res.msg = '密码不正确!';
            return res;
        }

        res.success = true;
        res.msg = '登录成功!';
        return res;
    },

    getUsers: function () {
        var json = localStorage.getItem('users');
        if (json) {
            return JSON.parse(json);
        }
        return {};
    },

    setUsers: function (users) {
        localStorage.setItem('users', JSON.stringify(users));
    },

    addUser: function (username, password) {
        var res = {
            success: false,
            msg: ''
        };

        var users = this.getUsers();
        if(users.hasOwnProperty(username)) {
            res.success = false;
            res.msg = '用户名已经存在!';
            return res;
        }

        users[username] = password;
        this.setUsers(users);

        res.success = true;
        res.msg = '注册成功!';
        return res;
    }
};
