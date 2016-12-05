/**
 * Created by 28203 on 2016/12/4 0004.
 */

window.registerVM = {
    onload: function () {
        var a = this.getRandomNum(10, 99);
        var b = this.getRandomNum(10, 99);
        var c = a + b;
        localStorage.setItem('sum', c);

        var vcExpressionInput = document.getElementById('vcExpression');
        vcExpressionInput.value = a + ' + '+ b;
    },

    getRandomNum: function (min, max) {
        var Range = max - min;
        var Rand = Math.random();
        return (min + Math.round(Rand * Range));
    },

    refresh: function () {
        this.onload();
    },

    register: function () {
        var vcValue = document.getElementById('vcValue').value.trim();
        var sum = localStorage.getItem('sum');
        if (vcValue !== sum) {
            alert('验证码不正确!');
            return;
        }

        this.refresh();

        var username = document.getElementById('username').value.trim();
        var password = document.getElementById('password').value.trim();

        var res = userService.addUser(username, password);
        if (!res.success) {
            alert(res.msg);
            return
        }

        alert(res.msg);

        window.location = 'login.html';
    }
};
