var $menubar = function() {
    var list, 
        bar = $('<div class="notepad-menubar"></div>'),
        barCss = [],
        r = -1;
    //menuFunc开始
    function menuFunc() { 
        //!隔绝函数之间的影响
        ! function() {
            for (var t = $('<ul class="menu-title"></ul>'), e = 0; e < list.length; e++) {
                var n = $('<li class="title"></li>');
                n.html(list[e].title), 
                n.attr("data-id", e), 
                t.append(n),
                n.click(function(t) {
                    var e = Number(this.dataset.id);
                    r = -1 === r ? (
                            barCss[e].css({ display: "inline-block" }), 
                            e
                        ) : 
                        r !== e ? (
                            barCss[r].css({ display: "none" }),
                            barCss[e].css({ display: "inline-block" }),
                            e
                        ) : 
                        (barCss[r].css({ display: "none" }), -1), 
                    t.stopPropagation();//停止事件
                }),
                n.hover(function() {
                    if (-1 !== r) {
                        var t = Number(this.dataset.id);
                        barCss[r].css({ display: "none" }),
                        barCss[t].css({ display: "inline-block" }),
                        r = t
                    }
                })
            }
            bar.append(t)
        }(),
        function() {
            for (var t = 0; t < list.length; t++) {
                for (var e = $('<ul class="menus"></ul>'), n = list[t].menuItems, l = 0; l < n.length; l++)
                    if ("hr" !== n[l].title) {
                        var a = $('<li class="menu-item"></li>');
                        if (a.html(n[l].title), a.attr("data-x", t), a.attr("data-y", l), "" !== n[l].shortcut) {
                            var i = $('<span class="shortcut"></span>');
                            i.html(n[l].shortcut), 
                            a.append(i)
                        }
                        n[l].enabled || a.addClass("disabled"),
                            e.append(a), a.click(function(t) {
                                if (t.stopPropagation(), !$(this).hasClass("disabled")) {
                                    var e = this.dataset.x,
                                        n = this.dataset.y;
                                        barCss[e].css({ display: "none" }),
                                        r = -1,
                                        list[e].menuItems[n].handler()
                                }
                            })
                    } else {
                        var s = $('<li class="menu-hr"></li>');
                        e.append(s)
                    }
                e.css({ width: list[t].width, left: list[t].left, display: "none" }), 
                bar.append(e), 
                barCss.push(e)
            }
        }(),
        $("body").append(bar)
    } //menuFunc结束
    return {
        show: function(t) {
            list = t, 
            menuFunc()
        },
        checked: function(t, e, n) {
            var l = d[t].find(".menu-item")[e];
            n ? $(l).prepend($('<span class="checked">✓</span>')[0]) : $(l).find(".checked").remove()
        },
        enabled: function(t, e, n) {
            var l = d[t].find(".menu-item")[e];
            n ? $(l).removeClass("disabled") : $(l).addClass("disabled")
        }
    }
}();
//mainContent
var $mainContent = function() {
    var mainContainer = $('<div class="notepad-editor"><textarea spellcheck="false" auto-size="none"></textarea></div>'),
        textarea = mainContainer.find("textarea"),
        s = { contentHandler: null, wrap: !1 },
        word = !1;
    return textarea.mousedown(function() { word = !0 }), 
        textarea.mouseup(function() { word = !1 }), 
        {
        show: function(a) {
            $.extend(s, a), 
            $("body").append(mainContainer), 
            textarea.trigger("focus")
        },
        setFont: function(a) {
            textarea.css(
                 { 
                    "font-family": a.family, 
                    "font-size": a.size + "pt" 
                }
            ), 
            "斜体" !== a.style ? "粗体" !== a.style ? "粗偏斜体" !== a.style || 
                textarea.css({ "font-weight": "bold", "font-style": "italic" }) : 
                textarea.css({ "font-weight": "bold" }) : 
                textarea.css({ "font-style": "italic" })
        }
    }
}();

function comList() {
    var a, 
        n = $('<div class="notepad-com-list"><input class="editor" type="text"><br><ul class="list"></ul></div>'),
        l = n.find(".editor"),
        i = n.find(".list"),
        s = { container: "", list: [], select: 0, width: "200px", isFont: !1, isFontStyle: !1, selectHandler: null };

    function e() {
        var t, e = $(s.container).find(".notepad-com-list");
        0 !== e.length && e.remove(),
        $(s.container).append(n), n.css({ width: s.width }),
        function() {
            var t, e, n, l = 0;
            if (s.isFont)
                for (l = 0; l < s.list.length; l++)
                (t = $('<li class="item"></li>')).css({ "font-family": s.list[l] }), 
                i.append(t.html(s.list[l]));
            else if (s.isFontStyle)
                for (l = 0; l < s.list.length; l++) 
                t = $('<li class="item"></li>'), 
                e = t, 
                "斜体" !== (n = s.list[l]) ? "粗体" !== n ? "粗偏斜体" !== n || 
                e.css({ "font-weight": "bold", "font-style": "italic" }) : 
                e.css({ "font-weight": "bold" }) : 
                e.css({ "font-style": "italic" }), 
                i.append(t.html(s.list[l]));
            else
                for (l = 0; l < s.list.length; l++) t = $('<li class="item"></li>'), i.append(t.html(s.list[l]));
            a = i.find(".item")
        }(),
        t = s.select,
        $(a[t]).addClass("selected"),
        l.val(s.list[t]),
        l.select()
    }
    this.show = function(t) {
        $.extend(s, t), 
        e(), 
        i.click(function(t) { 
            $(a[s.select]).removeClass("selected"), 
            s.select = s.list.indexOf($(t.target).html()), 
            $(a[s.select]).addClass("selected"), 
            l.val(s.list[s.select]), 
            l.select(), 
            s.selectHandler(s.select) 
        }), 
        l.keyup(function() {
            var t = 0;
            for (t = 0; t < s.list.length && 0 !== s.list[t].indexOf(l.val()); t++);
            t !== s.list.length && (
                    a[t].scrollIntoView({ behavior: "smooth", block: "start" }), 
                    $(a[s.select]).removeClass("selected"), 
                    $(a[t]).addClass("selected"), s.select = t
                )
        })
    }
}
var $dlgFont = function() {
    var e = $('<div class="notepad-dlg-mask notepad-dlg-font">'+
                '<div class="dialogbox notepad-dlgbox">'+
                    '<div class="notepad-dlg-titlebar">'+
                        '<p class="title">字体</p>'+
                        '<span class="close-btn" title="关闭">✖</span>'+
                    '</div>'+
                    '<div class="main notepad-dlg-main">'+
                        '<div class="font-family">'+
                            '<p>字体(F):</p>'+
                        '</div>'+
                        '<div class="font-style">'+
                        '<p>字形(Y):</p>'+
                        '</div>'+
                        '<div class="font-size">'+
                            '<p>大小(S):</p>'+
                        '</div>'+
                        '<fieldset class="sample">'+
                            '<legend>示例</legend>'+
                            '<p class="sample-txt">AaBbYyZz</p>'+
                        '</fieldset>'+
                        '<div class="script">'+
                            '<label>脚本(R):<br>'+
                            '<select>'+
                                '<option value="西欧语言">西欧语言</option>'+
                                '<option value="中文 GB2312">中文 GB2312</option>'+
                            '</select>'+
                            '</label>'+
                        '</div>'+
                        '<input class="btn-ok btn" type="button" value="确定">'+
                        '<input class="btn-cancel btn" type="button" value="取消">'+
                    '</div>'+
                '</div>'+
            '</div>'
        ),
        n = e.find(".btn-ok"),//find()在当前选中元素的上下文中寻找符合条件的后代，返回的是子元素
        l = e.find(".close-btn"),
        a = e.find(".btn-cancel"),
        t = e.find(".sample-txt"),
        i = e.find(".notepad-dlg-titlebar"),
        s = ["Agency FB", "Algerian", "Arial", "Arial Rounded MT", "Axure Handwriting",
         "Bahnschrift", "Baskerville Old Face", "Bauhaus 93", "Bell MT",
          "Berlin Sans FB", "Bernard MT", "BlackAdder ITC"],
        o = ["常规", "斜体", "粗体", "粗偏斜体"],
        c = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "22", "24", "26", "28", "36", "48", "72"],
        d = { family: "Arial", style: "常规", size: "16", okHandler: null };

    function r() { 
        t.css({ "font-family": d.family, "font-size": d.size + "pt" }), 
        "斜体" !== d.style ? "粗体" !== d.style ? "粗偏斜体" !== d.style || 
        t.css({ "font-weight": "bold", "font-style": "italic" }) : 
        t.css({ "font-weight": "bold" }) : 
        t.css({ "font-style": "italic" }) 
    }

    function u() { e.remove() }
    return { 
        show: function(t) { 
            $.extend(d, t), 
            $("body").append(e), 
            (new comList).show({ 
                container: ".notepad-dlg-font .font-family", 
                width: "176px", 
                list: s, 
                select: s.indexOf(d.family), 
                isFont: !0, 
                selectHandler: function(t) { d.family = s[t], r() }
             }), 
            (new comList).show({ 
                container: ".notepad-dlg-font .font-style", 
                width: "132px", 
                list: o, 
                select: o.indexOf(d.style), 
                isFontStyle: !0, 
                selectHandler: function(t) { d.style = o[t], r() } 
            }), 
            (new comList).show({ 
                container: ".notepad-dlg-font .font-size", 
                width: "64px", 
                list: c, 
                select: c.indexOf(d.size), 
                selectHandler: function(t) { d.size = c[t], r() } 
            }), 
            r(), 
            e.find(".dialogbox").draggable({ handle: i }), 
            l.click(u), 
            a.click(u), 
            n.click(function() { d.okHandler({ family: d.family, style: d.style, size: d.size }), u() }),
            e.click(function(t) { t.stopPropagation() }) 
        } 
    }
}();
var fontContent = { 
    config: { appContainer: ".fontContent" }, 
    bShowStatusBar: !1, 
    bWrap: !1, 
    fontFamily: "Arial", 
    fontStype: "常规", 
    fontSize: "16", 
    fontHandler: function(t) {
        fontContent.fontFamily = t.family, 
        fontContent.fontStype = t.style, 
        fontContent.fontSize = t.size, 
        $mainContent.setFont(t) 
    }
 };
$(function() {
    $menubar.show(fontContent.menuData),
    $mainContent.show({ contentHandler: function(t) { $menubar.enabled(1, 6, t) } }),
    $mainContent.setFont({ family: fontContent.fontFamily, style: fontContent.fontStype, size: fontContent.fontSize })
});
fontContent.menuData = [{
        title: "文件(F)",
        menuItems: [{
                title: "新建(N)",
                shortcut: "Ctrl+N",
                enabled: !0,
                handler: function() {}
            },
            {
                title: "打开(O)...",
                shortcut: "Ctrl+O",
                enabled: !0,
                handler: function() {}
            },
            {
                title: "保存(S)",
                shortcut: "Ctrl+S",
                enabled: !0,
                handler: function() {}
            },
            {
                title: "另存为(A)...",
                shortcut: "",
                enabled: !0,
                handler: function() {}
            },
            {
                title: "hr",
                shortcut: "",
                enabled: !0,
                handler: null
            },
            {
                title: "页面设置(U)...",
                shortcut: "",
                enabled: !0,
                handler: function() {}
            },
            {
                title: "打印(P)...",
                shortcut: "Ctrl+P",
                enabled: !0,
                handler: function() {}
            },
            {
                title: "hr",
                shortcut: "",
                enabled: !0,
                handler: null
            },
            {
                title: "退出(X)",
                shortcut: "",
                enabled: !0
            }
        ],
        width: "202px",
        left: "0px"
    },
    {
        title: "编辑(E)",
        menuItems: [{
                title: "撤销(U)",
                shortcut: "Ctrl+Z",
                enabled: !0,
                handler: function() {}
            },
            {
                title: "hr",
                shortcut: "",
                enabled: !0,
                handler: null
            },
            {
                title: "剪切(T)",
                shortcut: "Ctrl+X",
                enabled: !0,
                handler: function() {}
            },
            {
                title: "复制(C)",
                shortcut: "Ctrl+C",
                enabled: !0,
                handler: function() {}
            },
            {
                title: "粘贴(P)",
                shortcut: "Ctrl+V",
                enabled: !0,
                handler: function() {}
            }, 
            {
                title: "删除(L)",
                shortcut: "Del",
                enabled: !0,
                handler: function() {}
            },
            {
                title: "hr",
                shortcut: "",
                enabled: !0,
                handler: null
            },
            {
                title: "使用 Bing 搜索...",
                shortcut: "Ctrl+E",
                enabled: !0
            },
            {
                title: "查找(F)...",
                shortcut: "Ctrl+F",
                enabled: !0
            },
            {
                title: "查找下一个(N)",
                shortcut: "F3",
                enabled: !0,
                handler: function() {}
            },
            {
                title: "替换(R)...",
                shortcut: "Ctrl+H",
                enabled: !0
            },
            {
                title: "转到(G)...",
                shortcut: "Ctrl+G",
                enabled: !0
            },
            {
                title: "hr",
                shortcut: "",
                enabled: !0,
                handler: null
            },
            {
                title: "全选(A)",
                shortcut: "Ctrl+A",
                enabled: !0
            },
            {
                title: "时间/日期(D)",
                shortcut: "F5",
                enabled: !0
            }
        ],
        width: "218px",
        left: "80px"
    },
    {
        title: "格式(O)",
        menuItems: [{
                title: "自动换行(W)",
                shortcut: "",
                enabled: !0,
            },
            {
                title: "字体(F)...",
                shortcut: "",
                enabled: !0,
                handler: function() {
                    $dlgFont.show({ 
                        family: fontContent.fontFamily, 
                        style: fontContent.fontStyle, 
                        size: fontContent.fontSize, 
                        okHandler: fontContent.fontHandler 
                    })
                }
            }
        ],
        width: "156px",
        left: "160px"
    },
    {
        title: "查看(V)",
        menuItems: [{
            title: "状态栏(S)",
            shortcut: "",
            enabled: !0,
        }],
        width: "138px",
        left: "240px"
    },
    {
        title: "帮助(H)",
        menuItems: [{
                title: "查看帮助(H)",
                shortcut: "",
                enabled: !0
            },
            {
                title: "查看反馈",
                shortcut: "",
                enabled: !0
            },
            {
                title: "关于记事本(A)",
                shortcut: "",
                enabled: !0
            }
        ],
        width: "166px",
        left: "320px"
    }
];