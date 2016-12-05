/**
 * Created by 28203 on 2016/12/4 0004.
 */

window.mainVM = {
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
        } else {
            var user = localStorage.getItem('user');
            if (!user) {
                window.location = 'login.html';
            }
        }
    },

    showPassword: function () {
        var showPassword = document.getElementById('showPassword').checked;
        var passwordInput = document.getElementById('password');
        if (showPassword) {
            passwordInput.type = 'text';
        }else {
            passwordInput.type = 'password';
        }
    },

    login: function () {
        var username = document.getElementById('username').value.trim();
        var password = document.getElementById('password').value.trim();

        var res = userService.login(username, password);
        if (!res.success) {
            localStorage.removeItem('user');
            localStorage.removeItem('lastUsername');
            alert(res.msg);
            return;
        }

        localStorage.setItem('user', 'username');

        var rememberUsername = document.getElementById('rememberUsername').checked;
        if (rememberUsername) {
            localStorage.setItem('lastUsername', username);
        }

        var keepLogin = document.getElementById('keepLogin').checked;
        if (keepLogin) {
            localStorage.setItem('lastLoginSucceedTime', new Date().getTime());
        }

        window.location = 'main.html';
    }
};
