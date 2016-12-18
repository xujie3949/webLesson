/**
 * Created by 28203 on 2016/12/4 0004.
 */

var data = [
    {
        number: '039345',
        name: '李XX',
        department: '研发部',
        position: '高级软件开发工程师',
        joinTime: '2014年06月12日'
    },
    {
        number: '039346',
        name: '王XX',
        department: '研发部',
        position: '高级软件开发工程师',
        joinTime: '2014年07月15日'
    },
    {
        number: '039347',
        name: '张XX',
        department: '研发部',
        position: '高级软件开发工程师',
        joinTime: '2014年08月22日'
    },
    {
        number: '038345',
        name: '李XX',
        department: '数据制作',
        position: '作业员',
        joinTime: '2014年06月12日'
    },
    {
        number: '038346',
        name: '王XX',
        department: '数据制作',
        position: '作业员',
        joinTime: '2014年07月15日'
    },
    {
        number: '038347',
        name: '张XX',
        department: '数据制作',
        position: '作业员',
        joinTime: '2014年08月22日'
    },
    {
        number: '037345',
        name: '李XX',
        department: '品质保证',
        position: '品质保证工程师',
        joinTime: '2014年06月12日'
    },
    {
        number: '037346',
        name: '王XX',
        department: '品质保证',
        position: '品质保证工程师',
        joinTime: '2014年07月15日'
    },
    {
        number: '037347',
        name: '张XX',
        department: '品质保证',
        position: '品质保证工程师',
        joinTime: '2014年08月22日'
    },
    {
        number: '036345',
        name: '李XX',
        department: '企划部',
        position: '企划工程师',
        joinTime: '2014年06月12日'
    },
    {
        number: '036346',
        name: '王XX',
        department: '企划部',
        position: '企划工程师',
        joinTime: '2014年07月15日'
    },
    {
        number: '036347',
        name: '张XX',
        department: '企划部',
        position: '企划工程师',
        joinTime: '2014年08月22日'
    }
];

var staffs = localStorage.getItem('staffs');
if (!staffs) {
    var staffs = [];
    for (var i = 0; i < data.length; ++i) {
        var staff = data[i];
        staffs.push(staff);
    }
    localStorage.setItem('staffs', JSON.stringify(staffs));
}

