/*!
 * 文件名称：Hui.js 跨平台移动端的Hui脚本
 * 文件作者：新生帝(JsonLei)
 * 编写日期：2016年03月20日
 * 版权所有：中山赢友网络科技有限公司
 * 企业官网：http://www.winu.net
 * 开源协议：GPL v2 License
 * 文件描述：一切从简，只为了更懒！让APICloud再飞一会！
 * 讨论群区：一起改变中国IT教育 18863883
 * 文档地址：http://www.kancloud.cn/winu/hybrid
 * 开源地址：http://git.oschina.net/winu.net/H.js
 */

; ! function (factory) {
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        var target = module['exports'] || exports;
        factory(target);
    } else if (typeof define === 'function' && define['amd']) {
        define(['exports'], factory);
    } else {
        factory(window['Hui'] = {
            tppl_flag: ['[:', ':]'],
            // ######################### 通用
            trim: function (str) {
                if (str) {
                    return str.replace(/(^\s*)|(\s*$)/g, '');
                }
            },
            getFileExt: function (fileName) {
                if (fileName && fileName.length > 2) {
                    return fileName.substring(fileName.lastIndexOf('.') + 1);
                } else {
                    console.warn("输入文件名有误！");
                }
            },
            getAgeForBirthDay: function (birthday) {
                var r = birthday.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
                if (r == null) {
                    return false;
                }
                var d = new Date(r[1], r[3] - 1, r[4]);
                if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
                    var Y = new Date().getFullYear();
                    return (Y - r[1]);
                }
                return 0;
            },
            isNumber: function (str) {
                return !isNaN(str);
            },
            isPlusDecimal: function (str) {
                return (/^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,2})?))$/).test(str);
            },
            isDate: function (str) {
                return (/^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))(\s+([01][0-9]:|2[0-3]:)?[0-5][0-9]:[0-5][0-9])?$/).text(str);
            },
            isNullOrEmpty: function (str) {
                var that = this;
                return (str == null || str == undefined || that.trim(str) == "") ? true : false;
            },
            getNowDateFormat: function (dateSeparator, timeSeparator, isShowTime, datetime) {
                var that = this;
                dateSeparator = that.isNullOrEmpty(dateSeparator) ? "-" : dateSeparator;
                timeSeparator = that.isNullOrEmpty(timeSeparator) ? ":" : timeSeparator;
                isShowTime = (typeof arguments[2] != 'boolean') ? true : arguments[2];

                var now = datetime ? datetime : new Date();
                var year = now.getFullYear();
                var month = now.getMonth() + 1;
                var date = now.getDate();
                var hours = now.getHours();
                var minutes = now.getMinutes();
                var seconds = now.getSeconds();

                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (date >= 0 && date <= 9) {
                    date = "0" + date;
                }
                var _date = year + dateSeparator + month + dateSeparator + date;
                var _time = hours + timeSeparator + minutes + timeSeparator + seconds;

                return isShowTime ? (_date + " " + _time) : _date;
            },
            transPHPTimestamp: function (timestamp, isShowTime) {
                var that = this;
                isShowTime = (typeof arguments[1] != 'boolean') ? true : arguments[1];
                var datetime = new Date(timestamp * 1000);
                that.getNowDateFormat('-', ':', isShowTime, datetime);
            },
            transJsTimestamp: function (timestamp, isShowTime) {
                var that = this;
                isShowTime = (typeof arguments[1] != 'boolean') ? true : arguments[1];
                var datetime = new Date(timestamp);
                that.getNowDateFormat('-', ':', isShowTime, datetime);
            },
            isObject: function (obj) {
                return (typeof obj == "object" && obj != null && obj != undefined);
            },
            cloneObj: function (oldObj) {
                var that = this;

                if (typeof (oldObj) != 'object') {
                    return oldObj;
                }
                if (oldObj == null) {
                    return oldObj;
                }
                var newObj = new Object();
                for (var i in oldObj) {
                    newObj[i] = that.cloneObj(oldObj[i]);
                }
                return newObj;
            },
            extendObj: function () {
                var that = this;

                var args = arguments;
                if (args.length < 2) {
                    return;
                }
                var temp = that.cloneObj(args[0]);
                //调用复制对象方法
                for (var n = 1; n < args.length; n++) {
                    for (var i in args[n]) {
                        temp[i] = args[n][i];
                    }
                }
                return temp;
            },
            isFunction: function (obj) {
                return typeof obj === "function";
            },
            isArray: function (arr) {
                return toString.apply(arr) === '[object Array]';
            },
            newGUID: function () {
                function _sub() {
                    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                }

                return (_sub() + _sub() + "-" + _sub() + "-" + _sub() + "-" + _sub() + "-" + _sub() + _sub() + _sub());
            },
            unique: function (arr) {
                var that = this;

                if (!that.isArray(arr)) {
                    return arr;
                }
                var result = [], hash = {};
                for (var i = 0, elem; (elem = arr[i]) != null; i++) {
                    if (!hash[elem]) {
                        result.push(elem);
                        hash[elem] = true;
                    }
                }
                return result;
            },
            // ############################ DOM操作
            D: function (cssSelector) {
                return document.querySelector(cssSelector);
            },
            Ds: function (cssSelector, parentSelector) {
                var that = this;

                var parent = parentSelector ? that.D(parentSelector) : document;
                return document.querySelectorAll(cssSelector);
            },
            cssText: function (cssSelector, cssString) {
                var that = this;

                var selectors = that.Ds(cssSelector);
                if (selectors.length > 0) {
                    for (var i = 0; i < selectors.length; i++) {
                        selectors[i].style.cssText = cssString;
                    }
                }
            },
            siblings: function (cssSelector) {
                var that = this;

                var elem = that.D(cssSelector);
                var r = [];
                var n = elem.parentNode.firstChild;
                for (; n; n = n.nextSibling) {
                    if (n.nodeType === 1 && n !== elem) {
                        r.push(n);
                    }
                }
                return r;
            },
            addClass: function (elements, classs) {
                var that = this;

                if (that.isArray(elements)) {
                    if (elements.length > 0) {
                        for (var i = 0; i < elements.length; i++) {
                            if (classs.indexOf(',') > -1) {
                                var _classArr = classs.split(",");
                                for (var i = 0; i < _classArr.length; i++) {
                                    if (_classArr != "") {
                                        elements[i].classList.add(_classArr[i]);
                                    }
                                }
                            }
                            else {
                                if (classs.indexOf(' ') > -1) {
                                    var _classArr = classs.split(" ");
                                    for (var i = 0; i < _classArr.length; i++) {
                                        if (_classArr != "") {
                                            elements[i].classList.add(_classArr[i]);
                                        }
                                    }
                                }
                                else {
                                    elements[i].classList.add(classs);
                                }
                            }
                        }
                    }
                }
                else {
                    elements.classList.add(classs);
                }
            },
            removeClass: function (elements, classs) {
                var that = this;

                if (that.isArray(elements)) {
                    if (elements.length > 0) {
                        for (var i = 0; i < elements.length; i++) {
                            if (classs.indexOf(',') > -1) {
                                var _classArr = classs.split(",");
                                for (var i = 0; i < _classArr.length; i++) {
                                    if (_classArr != "") {
                                        elements[i].classList.remove(_classArr[i]);
                                    }
                                }
                            }
                            else {
                                if (classs.indexOf(' ') > -1) {
                                    var _classArr = classs.split(" ");
                                    for (var i = 0; i < _classArr.length; i++) {
                                        if (_classArr != "") {
                                            elements[i].classList.remove(_classArr[i]);
                                        }
                                    }
                                }
                                else {
                                    elements[i].classList.remove(classs);
                                }
                            }
                        }
                    }
                }
                else {
                    elements.classList.remove(classs);
                }
            },
            hasClass: function (element, _class) {
                return element.classList.contains(_class);
            },
            getIndex: function (ele) {
                var a = [];

                if (ele && ele.nodeType && ele.nodeType == 1) {
                    var oParent = ele.parentNode;
                    var oChilds = oParent.childNodes;
                    var _childs = [];
                    for (var i = 0; i < oChilds.length; i++) {
                        if (oChilds[i] && oChilds[i].nodeType && oChilds[i].nodeType == 1) {
                            _childs.push(oChilds[i]);
                        }
                    }

                    for (var i = 0; i < _childs.length; i++) {
                        if (_childs[i] == ele) {
                            return i;
                        }
                    }
                } else {
                    return -1;
                }
            },
            isElement: function (obj) {
                return !!(obj && obj.nodeType == 1);
            },
            offsetByDom: function (element) {
                var that = this;

                if (!that.isElement(element)) {
                    return {
                        l: 0,
                        t: 0,
                        w: 0,
                        h: 0
                    };
                } else {
                    var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
                    var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

                    var rect = element.getBoundingClientRect();
                    return {
                        l: rect.left + sl,
                        t: rect.top + st,
                        w: element.offsetWidth,
                        h: element.offsetHeight
                    };
                }
            },
            offset: function (cssSelector) {
                var that = this;
                var element = that.D(cssSelector);
                if (!that.isElement(element)) {
                    return {
                        l: 0,
                        t: 0,
                        w: 0,
                        h: 0
                    };
                } else {
                    var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
                    var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

                    var rect = element.getBoundingClientRect();
                    return {
                        l: rect.left + sl,
                        t: rect.top + st,
                        w: element.offsetWidth,
                        h: element.offsetHeight
                    };
                }
            },
            jsonToStr: function (json) {
                if (typeof json === 'object') {
                    return JSON && JSON.stringify(json);
                }
            },
            strToJson: function (str) {
                if (typeof str === 'string') {
                    return JSON && JSON.parse(str);
                }
            },
            scrollToDocButton: function () {
                var that = this;
                that.D("body").scrollTop = that.D("body").scrollHeight;
            },
            // ######################### 模板引擎
            tppl: function (tpl, data) {
                var that = this;

                var fn = function (d) {
                    var i, k = [], v = [];
                    for (i in d) {
                        k.push(i);
                        v.push(d[i]);
                    };
                    return (new Function(k, fn.$)).apply(d, v);
                };
                if (!fn.$) {
                    var tpls = tpl.replace(/[\r\n]/g, "").split(that.tppl_flag[0]);

                    fn.$ = "var $=''";
                    for (var t in tpls) {
                        var p = tpls[t].split(that.tppl_flag[1]);
                        if (t != 0) {
                            fn.$ += '=' == p[0].charAt(0) ? "+(" + p[0].substr(1) + ")" : ";" + p[0] + "$=$";
                        }
                        fn.$ += "+'" + p[p.length - 1].replace(/\'/g, "\\'") + "'";
                    }
                    fn.$ += ";return $;";

                }
                return data ? fn(data) : fn;
            },
            // ################## 启动画面
            swiperLaunth: function (scrollSelector, touchSelector, pageSelector, itemSelector, scrollTriggerLength) {
                scrollTriggerLength = typeof scrollTriggerLength == "number" ? scrollTriggerLength : 80;

                var that = this;

                var winWidth = document.body.clientWidth;
                var scrollObj = that.D(scrollSelector);
                var touchObj = that.D(touchSelector);
                var pageObj = that.D(pageSelector);
                var items = that.Ds(itemSelector, scrollSelector);
                var moveRange = 0;

                var _html = "";
                if (items.length > 0) {
                    for (var i = 0; i < items.length; i++) {
                        if (i == 0) {
                            _html += "<a class='active'></a>";
                            continue;
                        }
                        _html += "<a></a>";
                    }
                }
                pageObj.innerHTML = _html;

                var currentLeft = 0;
                var currentPageX = 0;
                touchObj.addEventListener('touchstart', function (event) {
                    if (event.targetTouches.length == 1) {
                        event.preventDefault();
                        var touch = event.targetTouches[0];
                        currentPageX = touch.clientX;
                        var ml = scrollObj.style.marginLeft;
                        currentLeft = ml == "" ? 0 : parseFloat(ml);
                    }
                }, false);
                touchObj.addEventListener('touchmove', function (event) {
                    if (event.targetTouches.length == 1) {
                        event.preventDefault();
                        var touch = event.targetTouches[0];
                        var range = currentPageX - touch.clientX;
                        var scrollRange = (currentLeft - range);
                        moveRange = range;

                        if (scrollRange >= 0 || scrollRange <= -winWidth * (items.length - 1)) {
                            return;
                        }

                        that.cssText(scrollSelector, "margin-left:" + scrollRange + "px;");
                    }
                }, false);

                touchObj.addEventListener('touchend', function (event) {
                    var ml = scrollObj.style.marginLeft;
                    ml = ml == "" ? 0 : parseFloat(ml);
                    var index = Math.round(Math.abs(ml / (winWidth)));

                    var index = that.getIndex(that.D(pageSelector + " a.active"));
                    if ((moveRange > -scrollTriggerLength && moveRange < 0) || (moveRange > 0 && moveRange < scrollTriggerLength)) {
                        that.cssText(scrollSelector, "transition: margin-left 0.2s; -webkit-transition: margin-left 0.2s;margin-left:" + (-index * winWidth) + "px; ");
                    }
                    // 向左划
                    if (moveRange >= scrollTriggerLength) {
                        var nextIndex = index + 1;
                        if (nextIndex < items.length) {
                            that.cssText(scrollSelector, "transition: margin-left 0.2s; -webkit-transition: margin-left 0.2s;margin-left:" + (-nextIndex * winWidth) + "px; ");
                            var currentDot = that.D(pageSelector + " a:nth-child(" + (nextIndex + 1) + ")");
                            that.addClass(currentDot, "active");

                            var bros = that.siblings(pageSelector + " a:nth-child(" + (nextIndex + 1) + ")");
                            that.removeClass(bros, "active");
                        }
                    }
                    // 向右滑
                    if (moveRange <= -scrollTriggerLength) {
                        var prevIndex = index - 1;
                        if (prevIndex >= 0) {
                            that.cssText(scrollSelector, "transition: margin-left 0.2s; -webkit-transition: margin-left 0.2s;margin-left:" + (-prevIndex * winWidth) + "px; ");
                            var currentDot = that.D(pageSelector + " a:nth-child(" + (prevIndex + 1) + ")");
                            that.addClass(currentDot, "active");

                            var bros = that.siblings(pageSelector + " a:nth-child(" + (prevIndex + 1) + ")");
                            that.removeClass(bros, "active");
                        }
                    }
                }, false);
            },
            // ################## 瀑布流
            waterfall: function (cssSelector) {
                var that = this;
                var column_count = 2;
                var padding_value = 10;
                var space_value = 10;
                var _width = that.offset(cssSelector).w;
                var column_width = (_width / column_count) - padding_value - space_value;
                that.cssText(cssSelector, '-webkit-column-width:' + column_width + 'px;-webkit-column-count: ' + column_count + ';padding:' + padding_value + 'px;-webkit-column-gap:' + space_value + 'px;');
            },
            // 微信联系人
            weixinContact: function () {
                var that = this;

                var swiperWord = that.D(".H-weixin-word");
                var showWord = that.D(".H-weixin-showWord");
                var wordOffset = [];

                // 计算位置和触发滑动
                function calcDom(clientY) {
                    var _currentItem = 0;
                    for (var i = 0; i < wordOffset.length; i++) {
                        var span = wordOffset[i];
                        if (clientY >= span.min && clientY <= span.max) {
                            _currentItem = span.dom;
                            break;
                        }
                        else {
                        }
                    }
                    if (_currentItem) {
                        var wordAttr = _currentItem.getAttribute("data-word");

                        if (wordAttr == "arrow") {
                            document.body.scrollTop = 0;
                        }
                        else {
                            var wordObj = that.D(".H-weixin-space[data-word=" + that.trim(wordAttr) + "]");
                            if (wordObj) {
                                document.body.scrollTop = wordObj.offsetTop + document.documentElement.scrollTop;
                            }
                        }
                    }
                    return _currentItem;
                }

                var wordItems = that.Ds(".H-weixin-word span");
                for (var i = 0; i < wordItems.length; i++) {
                    var _item = wordItems[i];
                    var _offset = that.offsetByDom(_item);
                    var _text = _item.innerHTML;
                    wordOffset.push({ dom: _item, min: Math.round(_offset.t), max: _offset.t + _offset.h });
                }

                swiperWord.addEventListener('touchstart', function (event) {
                    that.removeClass(showWord, "H-display-none");
                    that.addClass(swiperWord, "move");

                    if (event.targetTouches.length == 1) {
                        var touch = event.targetTouches[0];

                        var _clientY = touch.clientY > 0 ? touch.clientY : 0;
                        var span = calcDom(_clientY);
                        showWord.innerHTML = span.innerHTML;
                    }
                }, false);
                swiperWord.addEventListener('touchmove', function (event) {
                    if (event.targetTouches.length == 1) {
                        event.preventDefault();
                        var touch = event.targetTouches[0];

                        var _clientY = touch.clientY > 0 ? touch.clientY : 0;
                        var span = calcDom(_clientY);
                        showWord.innerHTML = span.innerHTML;
                    }
                }, false);
                swiperWord.addEventListener('touchend', function (event) {
                    that.addClass(showWord, "H-display-none");
                    that.removeClass(swiperWord, "move");
                }, false);
            },
            // 密码锁
            handLock: function (callback, themeColor) {
                var that = this;

                var R = 26, CW = 400, CH = 320, OffsetX = 30, OffsetY = 30;
                var PointLocationArr = [];

                function CaculateNinePointLotion(diffX, diffY) {
                    var Re = [];
                    for (var row = 0; row < 3; row++) {
                        for (var col = 0; col < 3; col++) {
                            var Point = {
                                X: (OffsetX + col * diffX + (col * 2 + 1) * R),
                                Y: (OffsetY + row * diffY + (row * 2 + 1) * R)
                            };
                            Re.push(Point);
                        }
                    }
                    return Re;
                }
                function Draw(cxt, _PointLocationArr, _LinePointArr, touchPoint) {
                    if (_LinePointArr.length > 0) {
                        cxt.beginPath();
                        for (var i = 0; i < _LinePointArr.length; i++) {
                            var pointIndex = _LinePointArr[i];
                            cxt.lineTo(_PointLocationArr[pointIndex].X, _PointLocationArr[pointIndex].Y);
                        }
                        cxt.lineWidth = 10;
                        cxt.strokeStyle = themeColor;
                        cxt.stroke();
                        cxt.closePath();
                        if (touchPoint != null) {
                            var lastPointIndex = _LinePointArr[_LinePointArr.length - 1];
                            var lastPoint = _PointLocationArr[lastPointIndex];
                            cxt.beginPath();
                            cxt.moveTo(lastPoint.X, lastPoint.Y);
                            cxt.lineTo(touchPoint.X, touchPoint.Y);
                            cxt.stroke();
                            cxt.closePath();
                        }
                    }
                    for (var i = 0; i < _PointLocationArr.length; i++) {
                        var Point = _PointLocationArr[i];
                        cxt.fillStyle = themeColor;
                        cxt.beginPath();
                        cxt.arc(Point.X, Point.Y, R, 0, Math.PI * 2, true);
                        cxt.closePath();
                        cxt.fill();
                        cxt.fillStyle = "#ffffff";
                        cxt.beginPath();
                        cxt.arc(Point.X, Point.Y, R - 3, 0, Math.PI * 2, true);
                        cxt.closePath();
                        cxt.fill();
                        if (_LinePointArr.indexOf(i) >= 0) {
                            cxt.fillStyle = themeColor;
                            cxt.beginPath();
                            cxt.arc(Point.X, Point.Y, R - 16, 0, Math.PI * 2, true);
                            cxt.closePath();
                            cxt.fill();
                        }

                    }
                }
                function IsPointSelect(touches, LinePoint) {
                    for (var i = 0; i < PointLocationArr.length; i++) {
                        var currentPoint = PointLocationArr[i];
                        var xdiff = Math.abs(currentPoint.X - touches.pageX);
                        var ydiff = Math.abs(currentPoint.Y - touches.pageY);
                        var dir = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
                        if (dir < R) {
                            if (LinePoint.indexOf(i) < 0) { LinePoint.push(i); }
                            break;
                        }
                    }
                }
                function InitEvent(canvasContainer, cxt) {
                    var LinePoint = [];
                    canvasContainer.addEventListener("touchstart", function (e) {
                        IsPointSelect(e.touches[0], LinePoint);
                    }, false);
                    canvasContainer.addEventListener("touchmove", function (e) {
                        e.preventDefault();
                        var touches = e.touches[0];
                        IsPointSelect(touches, LinePoint);
                        cxt.clearRect(0, 0, CW, CH);
                        Draw(cxt, PointLocationArr, LinePoint, { X: touches.pageX, Y: touches.pageY });
                    }, false);
                    canvasContainer.addEventListener("touchend", function (e) {
                        cxt.clearRect(0, 0, CW, CH);
                        Draw(cxt, PointLocationArr, LinePoint, null);
                        if (that.isFunction(callback)) {
                            callback(LinePoint);
                        }
                        LinePoint = [];
                    }, false);
                }

                window.onload = function () {
                    // 初始化
                    var c = that.D("#H-hand-lock");
                    CW = document.body.offsetWidth;
                    c.width = CW;
                    c.height = CH;
                    var cxt = c.getContext("2d");
                    InitEvent(c, cxt);
                    var X = (CW - 2 * OffsetX - R * 2 * 3) / 2;
                    var Y = (CH - 2 * OffsetY - R * 2 * 3) / 2;
                    PointLocationArr = CaculateNinePointLotion(X, Y);
                    Draw(cxt, PointLocationArr, [], null);
                }
            }
        });
    }
}(function (HuiExports) {
    var H = typeof HuiExports !== 'undefined' ? HuiExports : {};
});
