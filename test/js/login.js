/**
 * Created by 28203 on 2016/12/4 0004.
 */

window.loginVM = {
    onload: function () {
        var lastUsername = localStorage.getItem('lastUsername');
        if (lastUsername) {
            document.getElementById('username').value = lastUsername;
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
        localStorage.removeItem('user');
        localStorage.removeItem('lastLoginSucceedTime');
        localStorage.removeItem('lastUsername');

        var username = document.getElementById('username').value.trim();
        var password = document.getElementById('password').value.trim();

        var res = userService.login(username, password);
        if (!res.success) {
            alert(res.msg);
            return;
        }

        localStorage.setItem('user', username);

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
