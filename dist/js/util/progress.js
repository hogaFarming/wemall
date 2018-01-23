'use strict';

define(function () {
    var main_progree_mid = $('.main_progree_mid');
    return {
        // 倒计时方法
        countdown: function countdown(defaults) {
            return new Promise(function (res) {
                // defaults = {
                //     // 总时间
                //     fulltime: 180,
                //     // 当前进度
                //     percentage: 1
                // };
                var percentage = defaults.percentage;

                // 计算一个百分比的值
                var per_time = 1 / defaults.fulltime;

                var timer = setInterval(function () {

                    // 重新计算
                    percentage -= per_time;
                    if (percentage <= 0) {
                        clearInterval(timer);
                        percentage = 0;
                        res();
                    }

                    main_progree_mid.css('width', percentage * 370 + 'px');
                }, 1000);
            });
        }
    };
});