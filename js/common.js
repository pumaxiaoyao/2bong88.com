var fFrame = getParent(window);
var EnableIPadStyle = true;
var EnableIScroll = false;

function getParent(b) {
    var a = b;
    for (var c = 0; c < 4; c++) {
        if (a.SiteMode != null) {
            return a
        } else {
            a = a.parent
        }
    }
    return null
}

function indexOf(a, c) {
    for (var b = 0; b < a.length; b++) {
        if (a[b] == c) {
            return b
        }
    }
    return -1
}

function addCommas(b) {
    var a = new RegExp("(-?[0-9]+)([0-9]{3})");
    while (a.test(b)) {
        b = b.replace(a, "$1,$2")
    }
    return b
}

function removeCommas(b) {
    var a = /,/g;
    return b.replace(a, "")
}

function trim(b) {
    var a = /^(\s*)$/;
    if (a.test(b)) {
        b = b.replace(a, "");
        if (b.length == 0) {
            return b
        }
    }
    a = /^(\s*)([\W\w]*)(\b\s*$)/;
    if (a.test(b)) {
        b = b.replace(a, "$2")
    }
    return b
}

function validateOnKD(b, a) {
    return true;
}
var selBetMode = "";

function validateOnKP(c, a, k, b) {
    var d = (document.all) ? a.keyCode : a.which;
    if (k == null) {
        k = 0;
        if (document.selection) {
            c.focus();
            var f = document.selection.createRange();
            if (f != null) {
                var h = c.createTextRange();
                var g = h.duplicate();
                h.moveToBookmark(f.getBookmark());
                g.setEndPoint("EndToStart", h);
                k = g.text.length
            }
        }
    }
    if (c.value.length > 0 && k == 0) {
        if (d == 48) {
            return true
        }
    }
    if (d == 13) {
        if (b != null) {
            b(a);
            return true
        }
        if (c.id == "Bingo_BPstake") {
            betSubmitBingo(a)
        } else {
            betSubmit(a)
        }
        return false
    }
    if (/^$/.test(removeCommas(c.value)) && /0/.test(String.fromCharCode(d))) {
        return true
    }
    if (/[^0-9]/.test(String.fromCharCode(d))) {
        if (d != 8 && d != 0) {
            return true
        }
    }
    return true
}

function validateOnKPPhone(b, a, c) {
    var f = (document.all) ? a.keyCode : a.which;
    var d = c;
    if ((f == 13 || f == 8 || f == 45) && (d == "stakeField" || d == "scoreField")) {
        return true
    }
    if ((f == 13 || f == 8 || f == 46 || f == 45 || f == 39 || f == 37) && (d == "oddsField" || d == "hdpField")) {
        return true
    }
    if (/[^0-9]/.test(String.fromCharCode(f))) {
        return false
    }
    return true
}

function payOutOnKU(fld, e) {
    fld.value = addCommas(removeCommas(fld.value));
    if (/^$/.test(removeCommas(fld.value))) {
        if (fFrame.siteMode == "1") {
            document.getElementById("payOut_P").innerHTML = ""
        } else {
            if (fld.id == "HorseBPstake") {
                document.getElementById("VRPayout").innerHTML = "";
                document.getElementById("VRMaxPayout").innerHTML = ""
            } else {
                if (fld.id == "Bingo_BPstake") {
                    document.getElementById("Bingo_payOut").innerHTML = ""
                } else {
                    document.getElementById("payOut").innerHTML = ""
                }
            }
        }
    } else {
        var bodds;
        var bettype;
        var sitetype;
        var oddstype;
        var bingobettype;
        var bingooddstype;
        if (fFrame.SiteMode == "1") {
            bettype = document.getElementById("bettype_P").value;
            sitetype = document.getElementById("siteType_P").value;
            oddstype = document.getElementById("oddsType_P").value;
            switch (bettype) {
                case "1":
                case "7":
                case "28":
                    bodds = document.getElementById("bp_odds3").value;
                    break;
                case "3":
                case "8":
                    bodds = document.getElementById("bp_odds2").value;
                    break;
                default:
                    bodds = document.getElementById("bp_odds1").value;
                    break
            }
        } else {
            if (fld.id == "HorseBPstake") {
                if (parseInt(fFrame.LastSelectedSport, 10) >= 181 && parseInt(fFrame.LastSelectedSport, 10) <= 185) {
                    var oddsStr = document.getElementById("VRaceOddsDisp2").innerHTML.replace("/", "+");
                    var oddsValue = eval(oddsStr);
                    document.getElementById("VRPayout").innerHTML = payOutCalculate(oddsValue, removeCommas(fld.value), false);
                    document.getElementById("VRMaxPayout").innerHTML = payOutCalculate(oddsValue, removeCommas(fld.value) / 2, false)
                }
            } else {
                if (fld.id == "Bingo_BPstake") {
                    bettype = "";
                    sitetype = "";
                    oddstype = "";
                    bingobettype = document.getElementById("Bingo_bettype").value;
                    bingooddstype = document.getElementById("Bingo_oddsType").value
                } else {
                    bettype = document.getElementById("bettype").value;
                    sitetype = document.getElementById("siteType").value;
                    oddstype = document.getElementById("oddsType").value;
                    bingobettype = "";
                    bingooddstype = ""
                }
            }
        }
        var pairArray = ["1", "2", "3", "7", "8", "12", "20", "21"];
        if ((indexOf(pairArray, bettype) != -1) && (oddstype != "1")) {
            if (oddstype == "5") {
                document.getElementById("payOut").innerHTML = payOutCalculate(parseInt(removeCommas(document.getElementById("bodds").innerHTML), 10) / 100, removeCommas(fld.value), true)
            } else {
                if (fFrame.SiteMode == "1") {
                    document.getElementById("payOut_P").innerHTML = payOutCalculate(removeCommas(bodds), removeCommas(fld.value), true)
                } else {
                    document.getElementById("payOut").innerHTML = payOutCalculate(removeCommas(document.getElementById("bodds").innerHTML), removeCommas(fld.value), true)
                }
            }
        } else {
            var bingoArray = ["81", "82", "83", "84", "85", "86", "87", "88", "89", "90"];
            if (indexOf(bingoArray, bingobettype) != -1) {
                if (bingooddstype != 1) {
                    if (bingooddstype == "5") {
                        document.getElementById("Bingo_payOut").innerHTML = payOutCalculate(parseInt(removeCommas(document.getElementById("Bingo_bodds").innerHTML), 10) / 100, removeCommas(fld.value), true)
                    } else {
                        document.getElementById("Bingo_payOut").innerHTML = payOutCalculate(removeCommas(document.getElementById("Bingo_bodds").innerHTML), removeCommas(fld.value), bingobettype != "89" && bingobettype != "90")
                    }
                } else {
                    document.getElementById("Bingo_payOut").innerHTML = payOutCalculate(removeCommas(document.getElementById("Bingo_bodds").innerHTML), removeCommas(fld.value), false)
                }
            } else {
                if (fFrame.SiteMode == "1") {
                    document.getElementById("payOut_P").innerHTML = payOutCalculate(removeCommas(bodds), removeCommas(fld.value), false)
                } else {
                    document.getElementById("payOut").innerHTML = payOutCalculate(removeCommas(document.getElementById("bodds").innerHTML), removeCommas(fld.value), false)
                }
            }
        }
    }
}

function betSubmit(a) {
    var c = false;
    if (a == "click") {
        c = true
    } else {
        var b = (document.all) ? a.keyCode : a.which;
        if (b == 13) {
            c = true
        }
    }
    if (c) {
        if (fFrame != null) {
            if (fFrame.SiteMode == "1") {
                return formvalidationP("fomConfirmBetPhone")
            } else {
                return formvalidation("fomConfirmBet")
            }
        }
    } else {
        return true
    }
}

function betSubmitMP(a) {
    var c = false;
    if (a == "click") {
        c = true
    } else {
        var b = (document.all) ? a.keyCode : a.which;
        if (b == 13) {
            c = true
        }
    }
    if (c) {
        return MPformvalidation("betform")
    } else {
        return true
    }
}

function betSubmitBingo(a) {
    var c = false;
    if (a == "click") {
        c = true
    } else {
        var b = (document.all) ? a.keyCode : a.which;
        if (b == 13) {
            c = true
        }
    }
    if (c) {
        return Bingoformvalidation("fomBingoConfirmBet")
    } else {
        return true
    }
}

function payOutOnKUOT(b, a) {
    b.value = addCommas(removeCommas(b.value));
    if (/^$/.test(removeCommas(b.value))) {
        if (fFrame.SiteMode == "1") {
            document.getElementById("payOut_P").innerHTML = ""
        } else {
            document.getElementById("payOut").innerHTML = ""
        }
    } else {
        if (fFrame.SiteMode == "1") {
            document.getElementById("payOut_P").innerHTML = payOutCalculate(removeCommas(document.getElementById("odds").value), removeCommas(b.value), false)
        } else {
            document.getElementById("payOut").innerHTML = payOutCalculate(removeCommas(document.getElementById("bodds").innerHTML), removeCommas(b.value), false)
        }
    }
}

function payOutOnKUPhone(b, a) {
    b.value = addCommas(removeCommas(b.value));
    if (/^$/.test(removeCommas(b.value))) {
        document.getElementById("payOut").innerHTML = ""
    } else {
        if ((document.getElementById("bettype").value == 1 || document.getElementById("bettype").value == 2 || document.getElementById("bettype").value == 3 || document.getElementById("bettype").value == 7 || document.getElementById("bettype").value == 8 || document.getElementById("bettype").value == 20) && (document.getElementById("siteType").value != "DECIMAL" && document.getElementById("siteType").value != "DECIADD")) {
            document.getElementById("payOut").innerHTML = payOutCalculate(removeCommas(document.getElementById("odds").innerHTML), removeCommas(b.value), true)
        } else {
            document.getElementById("payOut").innerHTML = payOutCalculate(removeCommas(document.getElementById("odds").innerHTML), removeCommas(b.value), false)
        }
    }
}

function payOutCalculate(a, c, b) {
    var d = "";
    if (b) {
        d = addCommas((c * (1 + Math.abs(a))).toFixed(2))
    } else {
        d = addCommas((c * Math.abs(a)).toFixed(2))
    }
    return d
}

function checkValue(e, f, k) {
    var n = "0123456789";
    var o = "";
    var a = true;
    for (var d = 0; d < e.value.length; d++) {
        if (e.value.charAt(d) == ".") {
            break
        }
        if (e.value.charAt(d) != "," && n.indexOf(e.value.charAt(d)) != -1) {
            o += e.value.charAt(d)
        }
    }
    var p = addCommas(o);
    e.value = p;
    if (f != null && f != "" && k != null && k != "") {
        var g = document.getElementById(f);
        var l = document.getElementById(k);
        var h;
        if (g.tagName == "INPUT") {
            h = g.value
        } else {
            h = g.innerHTML
        }
        if (!isNaN(h) && !isNaN(o)) {
            var c = parseFloat(h) * parseFloat(o);
            var q = String(c.toFixed(2));
            var b = q.split(".");
            var m = addCommas(b[0]) + "." + b[1];
            if (!isNaN(c)) {
                if (l.tagName == "INPUT") {
                    l.value = m
                } else {
                    l.innerHTML = m
                }
            } else {
                if (l.tagName == "INPUT") {
                    l.value = ""
                } else {
                    l.innerHTML = ""
                }
            }
        } else {
            if (l.tagName == "INPUT") {
                l.value = ""
            } else {
                l.innerHTML = ""
            }
        }
    }
}

function checkKeyPress(c, a, d) {
    var b = (document.all) ? a.keyCode : a.which;
    if (c.value.length > 0 && d == 0) {
        if (b == 48) {
            return false
        }
    }
    var f = "0123456789";
    var g = (document.all) ? a.keyCode : a.which;
    if (g == 13 || g == 8) {
        return betSubmitMP(a)
    }
    key = parseInt(String.fromCharCode(g), 10);
    if (f.indexOf(key) == -1) {
        return false
    }
    if (c.value.length == 0 && key == "0") {
        return false
    }
    return true
}

function emailCheck(h) {
    var g = /^(.+)@(.+)$/;
    var r = '\\(\\)<>@,;:\\\\\\"\\.\\[\\]';
    var u = "[^\\s" + r + "]";
    var q = '("[^"]*")';
    var n = /^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
    var a = u + "+";
    var v = "(" + a + "|" + q + ")";
    var t = new RegExp("^" + v + "(\\." + v + ")*$");
    var e = new RegExp("^" + a + "(\\." + a + ")*$");
    var p = h.match(g);
    if (p == null) {
        return false
    }
    var s = p[1];
    var c = p[2];
    if (s.match(t) == null) {
        return false
    }
    var m = c.match(n);
    if (m != null) {
        for (var l = 1; l <= 4; l++) {
            if (m[l] > 255) {
                return false
            }
        }
        return true
    }
    var d = c.match(e);
    if (d == null) {
        alert("The domain name doesn't seem to be valid.");
        return false
    }
    var b = new RegExp(a, "g");
    var f = c.match(b);
    var o = f.length;
    if (f[f.length - 1].length < 2 || f[f.length - 1].length > 4) {
        return false
    }
    if (o < 2) {
        var k = "This address is missing a hostname!";
        return false
    }
    return true
}

function gotoSportsBookPage() {
    if (parent.top.LastSelectedMenu != null) {
        parent.top.LastSelectedMenu = 0;
        parent.top.LastSelectedSport = -1;
        parent.top.LastSelectedMArket = "T"
    }
    parent.leftFrame.location = "leftAllInOne.aspx"
}

function OpenNumberGameresresult() {
    parent.topFrame.OpenListPage("ResultFrame.aspx?sportType=161&mode=league", 680, 810)
}

function SunPlus_Marquee() {
    var a = this;
    this.marquee_mouse = 1;
    this.scroll_speed = 1;
    this.marquee_flag = true;
    this.scrollerwidth = 500;
    this.DivElm = null;
    this.Mymarquee_scroll = function() {
        b()
    };

    function b() {
        var c;
        c = a.DivElm.style;
        if (a.marquee_mouse && a.marquee_flag) {
            c.left = parseInt(c.left, 10) - a.scroll_speed;
            if (parseInt(c.left, 10) <= -a.DivElm.offsetWidth) {
                c.left = a.scrollerwidth
            }
        }
        window.setTimeout(b, 100)
    }
}

function isNum(a) {
    numtype = "0123456789";
    for (i = 0; i < a.length; i++) {
        if (numtype.indexOf(a.substring(i, i + 1)) < 0) {
            return false
        }
    }
    return true
}

function check_email(b) {
    var e = b.length;
    if (e == 0) {
        return false
    }
    for (var d = 0; d < e; d++) {
        var a = b.charAt(d);
        if (!((a >= "A" && a <= "Z") || (a >= "a" && a <= "z") || (a >= "0" && a <= "9") || (a == "-") || (a == "_") || (a == ".") || (a == "@"))) {
            return false
        }
    }
    if ((b.indexOf("@") == -1) || (b.indexOf("@") == 0) || (b.indexOf("@") == (e - 1))) {
        return false
    }
    if ((b.indexOf("@") != -1) && (b.substring(b.indexOf("@") + 1, e).indexOf("@") != -1)) {
        return false
    }
    if ((b.indexOf(".") == -1) || (b.indexOf(".") == 0) || (b.lastIndexOf(".") == (e - 1))) {
        return false
    }
    var g, h;
    e = b.length;
    g = b.substring(b.indexOf("@") + 1, e);
    var f = g.indexOf(".");
    while (f > 0) {
        h = g.substring(0, g.indexOf("."));
        e = h.length;
        if (e < 2) {
            return false
        }
        e = g.length;
        g = g.substring(g.indexOf(".") + 1, e);
        f = g.indexOf(".")
    }
    e = g.length;
    if (e < 2) {
        return false
    }
    if (isNum(g)) {
        return false
    }
    if ((b.indexOf("@.")) >= 0) {
        return false
    }
    return true
}

function replaceSubstring(c, a, l) {
    var h = c;
    if (a == "") {
        return c
    }
    if (l.indexOf(a) == -1) {
        while (h.indexOf(a) != -1) {
            var m = h.substring(0, h.indexOf(a));
            var n = h.substring(h.indexOf(a) + a.length, h.length);
            h = m + l + n
        }
    } else {
        var g = new Array("~", "`", "_", "^", "#");
        var f = 1;
        var e = "";
        while (e == "") {
            for (var b = 0; b < g.length; b++) {
                var k = "";
                for (var d = 0; d < f; d++) {
                    k += g[b]
                }
                if (a.indexOf(k) == -1) {
                    e = k;
                    b = g.length + 1
                }
            }
        }
        while (h.indexOf(a) != -1) {
            var m = h.substring(0, h.indexOf(a));
            var n = h.substring(h.indexOf(a) + a.length, h.length);
            h = m + e + n
        }
        while (h.indexOf(e) != -1) {
            var m = h.substring(0, h.indexOf(e));
            var n = h.substring(h.indexOf(e) + e.length, h.length);
            h = m + l + n
        }
    }
    return h
}

function currencyFormat(d, k, b, c) {
    var l = 0;
    var g = "";
    var f = j = 0;
    var h = len2 = 0;
    var m = "0123456789";
    var a = aux2 = "";
    var n = (document.all) ? c.keyCode : c.which;
    if (n == 8) {
        d.value = ""
    }
    if (n == 13) {
        return true
    }
    g = parseInt(String.fromCharCode(n), 10);
    if (m.indexOf(g) == -1) {
        return false
    }
    h = d.value.length;
    for (f = 0; f < h; f++) {
        if ((d.value.charAt(f) != "0") && (d.value.charAt(f) != b)) {
            break
        }
    }
    a = "";
    for (; f < h; f++) {
        if (m.indexOf(d.value.charAt(f)) != -1) {
            a += d.value.charAt(f)
        }
    }
    a += g;
    h = a.length;
    if (h == 0) {
        d.value = ""
    }
    if (h > 0) {
        aux2 = "";
        for (j = 0, f = h - 1; f >= 0; f--) {
            if (j == 3) {
                aux2 += k;
                j = 0
            }
            aux2 += a.charAt(f);
            j++
        }
        d.value = "";
        len2 = aux2.length;
        for (f = len2 - 0; f >= 0; f--) {
            d.value += aux2.charAt(f)
        }
        d.value += a.substr(h, h)
    }
    return false
}

function countPayOut() {
    var b = trim(removeCommas(document.getElementById("OTStake").value));
    var a = trim(removeCommas(document.getElementById("ot_spOddsValue").innerHTML));
    if (b.length != 0 && a.length != 0) {
        document.getElementById("OTpayOut").innerHTML = addCommas((b * a).toFixed(2))
    } else {
        document.getElementById("OTpayOut").innerHTML = ""
    }
}

function onKeyDownFunc(d, b) {
    var c = (document.all) ? b.keyCode : b.which;
    if (c == 9) {
        var a = document.getElementById(d);
        if (a != null) {
            a.focus();
            a.select()
        }
    }
}
var MD5 = function(W) {
    function B(b, a) {
        return (b << a) | (b >>> (32 - a))
    }

    function g(b, k) {
        var c, x, d, F, a;
        d = (b & 2147483648);
        F = (k & 2147483648);
        c = (b & 1073741824);
        x = (k & 1073741824);
        a = (b & 1073741823) + (k & 1073741823);
        if (c & x) {
            return (a ^ 2147483648 ^ d ^ F)
        }
        if (c | x) {
            if (a & 1073741824) {
                return (a ^ 3221225472 ^ d ^ F)
            } else {
                return (a ^ 1073741824 ^ d ^ F)
            }
        } else {
            return (a ^ d ^ F)
        }
    }

    function r(a, b, c) {
        return (a & b) | ((~a) & c)
    }

    function t(a, b, c) {
        return (a & c) | (b & (~c))
    }

    function v(a, b, c) {
        return (a ^ b ^ c)
    }

    function y(a, b, c) {
        return (b ^ (a | (~c)))
    }

    function s(k, G, H, I, ab, aa, F) {
        k = g(k, g(g(r(G, H, I), ab), F));
        return g(B(k, aa), G)
    }

    function u(k, G, H, I, ab, aa, F) {
        k = g(k, g(g(t(G, H, I), ab), F));
        return g(B(k, aa), G)
    }

    function w(k, G, H, I, ab, aa, F) {
        k = g(k, g(g(v(G, H, I), ab), F));
        return g(B(k, aa), G)
    }

    function z(k, G, H, I, ab, aa, F) {
        k = g(k, g(g(y(G, H, I), ab), F));
        return g(B(k, aa), G)
    }

    function o(H) {
        var G;
        var c = H.length;
        var k = c + 8;
        var x = (k - (k % 64)) / 64;
        var d = (x + 1) * 16;
        var F = Array(d - 1);
        var b = 0;
        var a = 0;
        while (a < c) {
            G = (a - (a % 4)) / 4;
            b = (a % 4) * 8;
            F[G] = (F[G] | (H.charCodeAt(a) << b));
            a++
        }
        G = (a - (a % 4)) / 4;
        b = (a % 4) * 8;
        F[G] = F[G] | (128 << b);
        F[d - 2] = c << 3;
        F[d - 1] = c >>> 29;
        return F
    }

    function Y(d) {
        d = d.replace(/\r\n/g, "\n");
        var k = "";
        for (var b = 0; b < d.length; b++) {
            var a = d.charCodeAt(b);
            if (a < 128) {
                k += String.fromCharCode(a)
            } else {
                if ((a > 127) && (a < 2048)) {
                    k += String.fromCharCode((a >> 6) | 192);
                    k += String.fromCharCode((a & 63) | 128)
                } else {
                    k += String.fromCharCode((a >> 12) | 224);
                    k += String.fromCharCode(((a >> 6) & 63) | 128);
                    k += String.fromCharCode((a & 63) | 128)
                }
            }
        }
        return k
    }
    var Z = Array();
    var A, f, l, n, q, e, h, m, p;
    var C = 7,
        D = 12,
        E = 17,
        J = 22;
    var K = 5,
        L = 9,
        M = 14,
        N = 20;
    var O = 4,
        P = 11,
        Q = 16,
        R = 23;
    var S = 6,
        T = 10,
        U = 15,
        V = 21;
    W = Y(W);
    Z = o(W);
    e = 1732584193;
    h = 4023233417;
    m = 2562383102;
    p = 271733878;
    for (A = 0; A < Z.length; A += 16) {
        f = e;
        l = h;
        n = m;
        q = p;
        e = s(e, h, m, p, Z[A + 0], C, 3614090360);
        p = s(p, e, h, m, Z[A + 1], D, 3905402710);
        m = s(m, p, e, h, Z[A + 2], E, 606105819);
        h = s(h, m, p, e, Z[A + 3], J, 3250441966);
        e = s(e, h, m, p, Z[A + 4], C, 4118548399);
        p = s(p, e, h, m, Z[A + 5], D, 1200080426);
        m = s(m, p, e, h, Z[A + 6], E, 2821735955);
        h = s(h, m, p, e, Z[A + 7], J, 4249261313);
        e = s(e, h, m, p, Z[A + 8], C, 1770035416);
        p = s(p, e, h, m, Z[A + 9], D, 2336552879);
        m = s(m, p, e, h, Z[A + 10], E, 4294925233);
        h = s(h, m, p, e, Z[A + 11], J, 2304563134);
        e = s(e, h, m, p, Z[A + 12], C, 1804603682);
        p = s(p, e, h, m, Z[A + 13], D, 4254626195);
        m = s(m, p, e, h, Z[A + 14], E, 2792965006);
        h = s(h, m, p, e, Z[A + 15], J, 1236535329);
        e = u(e, h, m, p, Z[A + 1], K, 4129170786);
        p = u(p, e, h, m, Z[A + 6], L, 3225465664);
        m = u(m, p, e, h, Z[A + 11], M, 643717713);
        h = u(h, m, p, e, Z[A + 0], N, 3921069994);
        e = u(e, h, m, p, Z[A + 5], K, 3593408605);
        p = u(p, e, h, m, Z[A + 10], L, 38016083);
        m = u(m, p, e, h, Z[A + 15], M, 3634488961);
        h = u(h, m, p, e, Z[A + 4], N, 3889429448);
        e = u(e, h, m, p, Z[A + 9], K, 568446438);
        p = u(p, e, h, m, Z[A + 14], L, 3275163606);
        m = u(m, p, e, h, Z[A + 3], M, 4107603335);
        h = u(h, m, p, e, Z[A + 8], N, 1163531501);
        e = u(e, h, m, p, Z[A + 13], K, 2850285829);
        p = u(p, e, h, m, Z[A + 2], L, 4243563512);
        m = u(m, p, e, h, Z[A + 7], M, 1735328473);
        h = u(h, m, p, e, Z[A + 12], N, 2368359562);
        e = w(e, h, m, p, Z[A + 5], O, 4294588738);
        p = w(p, e, h, m, Z[A + 8], P, 2272392833);
        m = w(m, p, e, h, Z[A + 11], Q, 1839030562);
        h = w(h, m, p, e, Z[A + 14], R, 4259657740);
        e = w(e, h, m, p, Z[A + 1], O, 2763975236);
        p = w(p, e, h, m, Z[A + 4], P, 1272893353);
        m = w(m, p, e, h, Z[A + 7], Q, 4139469664);
        h = w(h, m, p, e, Z[A + 10], R, 3200236656);
        e = w(e, h, m, p, Z[A + 13], O, 681279174);
        p = w(p, e, h, m, Z[A + 0], P, 3936430074);
        m = w(m, p, e, h, Z[A + 3], Q, 3572445317);
        h = w(h, m, p, e, Z[A + 6], R, 76029189);
        e = w(e, h, m, p, Z[A + 9], O, 3654602809);
        p = w(p, e, h, m, Z[A + 12], P, 3873151461);
        m = w(m, p, e, h, Z[A + 15], Q, 530742520);
        h = w(h, m, p, e, Z[A + 2], R, 3299628645);
        e = z(e, h, m, p, Z[A + 0], S, 4096336452);
        p = z(p, e, h, m, Z[A + 7], T, 1126891415);
        m = z(m, p, e, h, Z[A + 14], U, 2878612391);
        h = z(h, m, p, e, Z[A + 5], V, 4237533241);
        e = z(e, h, m, p, Z[A + 12], S, 1700485571);
        p = z(p, e, h, m, Z[A + 3], T, 2399980690);
        m = z(m, p, e, h, Z[A + 10], U, 4293915773);
        h = z(h, m, p, e, Z[A + 1], V, 2240044497);
        e = z(e, h, m, p, Z[A + 8], S, 1873313359);
        p = z(p, e, h, m, Z[A + 15], T, 4264355552);
        m = z(m, p, e, h, Z[A + 6], U, 2734768916);
        h = z(h, m, p, e, Z[A + 13], V, 1309151649);
        e = z(e, h, m, p, Z[A + 4], S, 4149444226);
        p = z(p, e, h, m, Z[A + 11], T, 3174756917);
        m = z(m, p, e, h, Z[A + 2], U, 718787259);
        h = z(h, m, p, e, Z[A + 9], V, 3951481745);
        e = g(e, f);
        h = g(h, l);
        m = g(m, n);
        p = g(p, q)
    }
    var X = WordToHex(e) + WordToHex(h) + WordToHex(m) + WordToHex(p);
    return X.toLowerCase()
};

function WordToHex(c) {
    var d = "",
        e = "",
        a, b;
    for (b = 0; b <= 3; b++) {
        a = (c >>> (b * 8)) & 255;
        e = "0" + a.toString(16);
        d = d + e.substr(e.length - 2, 2)
    }
    return d
}
var CFS = function(k) {
    function e(q) {
        var r = "";
        for (var o = 1; o <= q.length; o++) {
            r += q.charAt(o - 1).charCodeAt(0)
        }
        var p = new Number(r);
        r = p.toString(16);
        return r
    }
    var g = 30,
        h, a;
    h = g - k.length;
    if (h > 1) {
        for (var d = 1; d <= h; d++) {
            k = k + String.fromCharCode(21)
        }
    }
    var l = new Number(1);
    for (var c = 1; c <= g; c++) {
        a = g + k.charAt(c - 1).charCodeAt(0) * c;
        l = l * a
    }
    var n = new Number(l.toPrecision(15));
    k = n.toString().toUpperCase();
    var m = "";
    for (var b = 1; b <= k.length; b++) {
        m = m + e(k.substring(b - 1, b + 2))
    }
    var f = "";
    for (var b = 20; b <= m.length - 18; b += 2) {
        f = f + m.charAt(b - 1)
    }
    return f.toUpperCase()
};

function userBrowser() {
    var a = navigator.userAgent.toLowerCase();
    if ((/msie/i.test(a) && !/opera/.test(a)) || (!!navigator.userAgent.match(/Trident\/7\./))) {
        return "IE"
    } else {
        if (/firefox/i.test(a)) {
            return "Firefox"
        } else {
            if (/chrome/i.test(a) && /webkit/i.test(a) && /mozilla/i.test(a)) {
                return "Chrome"
            } else {
                if (/opera/i.test(a)) {
                    return "Opera"
                } else {
                    if (/webkit/i.test(a) && !(/chrome/i.test(a) && /webkit/i.test(a) && /mozilla/i.test(a))) {
                        return "Safari"
                    } else {
                        return "unKnow"
                    }
                }
            }
        }
    }
}

function SwitchDispHidden(a) {
    var a = document.getElementById(a);
    if (a.style.display == "none") {
        a.style.display = ""
    } else {
        a.style.display = "none"
    }
}
var OptionListObj_DisStyle = null;

function SetHideDisStyleOptionList(a) {
    var b = 3;
    if (OptionListObj_DisStyle == null) {
        OptionListObj_DisStyle = new DivOption(document.getElementById("disstyle"), b)
    }
    OptionListObj_DisStyle.act(a, null, null)
}
var OptionListObj_OddsType = null;

function SetHideOddsTypeOptionList(a) {
    var b = 3;
    if (OptionListObj_OddsType == null) {
        OptionListObj_OddsType = new DivOption(document.getElementById("selOddsType"), b)
    }
    OptionListObj_OddsType.act(a, null, null)
}
var OptionListObj_SecurityQ = null;

function SetHideSecurityQOptionList(a) {
    var b = 3;
    if (OptionListObj_OddsType == null) {
        OptionListObj_OddsType = new DivOption(document.getElementById("selSecurityQ"), b)
    }
    OptionListObj_OddsType.act(a, null, null)
}
var OptionListObj_Other = null;

function SetHideOptionList(a) {
    var b = 3;
    if (OptionListObj_Other == null) {
        OptionListObj_Other = new DivOption(document.getElementById("selSecurityQ"), b)
    }
    OptionListObj_Other.act(a, null, null)
}
var LoginObj = null;

function SetHideLoginWindow(a) {
    var b = 3;
    if (LoginObj == null) {
        LoginObj = new DivPop(document.getElementById("loginact"), b)
    }
    LoginObj.act(a, null, null)
}
var BettingObj = null;

function SetHideBetWindow(a) {
    if (document.getElementById("BankingAct") != null) {
        document.getElementById("BankingAct").style.display = "none"
    }
    var b = 3;
    if (BettingObj == null) {
        BettingObj = new DivPop(document.getElementById("BettingAct"), b)
    }
    BettingObj.act(a, null, null)
}
var BankingObj = null;

function SetHideBankingWindow(a) {
    if (document.getElementById("BettingAct") != null) {
        document.getElementById("BettingAct").style.display = "none"
    }
    var b = 3;
    if (BankingObj == null) {
        BankingObj = new DivPop(document.getElementById("BankingAct"), b)
    }
    BankingObj.act(a, null, null)
}

function ShowPopWindow(a, b) {
    if (b == 1) {
        document.getElementById(a).style.display = "block"
    } else {
        document.getElementById(a).style.display = "none"
    }
}

function openBingoRuleInfo() {
    if (fFrame.RuleInfo == null || fFrame.RuleInfo.closed) {
        fFrame.RuleInfo = fFrame.window.open("index_info.aspx?page=11", "RuleInfo")
    }
}

function switchAsia_Europe(b, a) {
    if (fFrame.SiteId == "4280" || fFrame.SiteId == "4200800") {
        if (b == 1) {
            if (a) {
                fFrame.location.href = "http://inner." + fFrame.DomainName + ":36120/index.aspx?lng=en_eu"
            } else {
                fFrame.location.href = "http://www." + fFrame.DomainName + "/index.aspx?lng=en_eu"
            }
        }
        if (b == 2) {
            if (a) {
                fFrame.location.href = "http://inner." + fFrame.DomainName + ":36120/index.aspx?lng=en"
            } else {
                fFrame.location.href = "http://www." + fFrame.DomainName + "/index.aspx?lng=en"
            }
        }
    }
}
var ScoreInfoPopWindow;
var ScoreMapInfoUrl;
var strRefresh;
var strWaiting;
var preMatchId;

function popScoreMap(f, g, k, a, h, d, l) {
    var m = 100;
    var n = 0;
    if (g == null) {
        var c = getEvent();
        if (CheckIScroll()) {
            m = 300;
            n += 100
        } else {
            n += c.clientY + 15;
            m = c.clientX
        }
        try {
            if (fFrame.leftFrame.g_BetProcesCurrMatchid == f && fFrame.leftFrame.document.getElementById("BetProcessContainer").style.display != "none" && $(fFrame.leftFrame.document.getElementById("scoremap")).is(":visible")) {
                var c = document.createEvent("HTMLEvents");
                c.initEvent("click", true, true);
                fFrame.leftFrame.document.getElementById("scoremap").dispatchEvent(c);
                return
            }
        } catch (b) {
            $(fFrame.leftFrame.document.getElementById("scoremap")).trigger("click");
            return
        }
    } else {
        m = 0;
        n += 100
    }
    fFrame.topFrame.g_SMF.openScoreMap(f, m, n, k, a, h, d, l)
}

function RefreshScoreMap(a) {
    window.top.location.href = a
}

function ClosedWin() {
    window.open("", "_self", "");
    window.opener = null;
    window.close()
}

function enableStyle() {
    var a = document.getElementById("sp_r1");
    var b = document.getElementById("sp_r2");
    a.style.color = "#4B5D8F";
    a.style.cursor = "pointer";
    a.innerHTML = "<span >" + strRefresh + "</span>";
    a.disabled = false;
    b.style.color = "#4B5D8F";
    b.style.cursor = "pointer";
    b.innerHTML = "<span >" + strRefresh + "</span>";
    b.disabled = false
}

function disableStyle() {
    var a = document.getElementById("sp_r1");
    var b = document.getElementById("sp_r2");
    if (a.disabled || b.disabled) {
        return false
    }
    a.style.color = "#CCCCCC";
    a.style.cursor = "";
    a.className = "btnIcon right disable";
    a.disabled = true;
    b.style.color = "#CCCCCC";
    b.style.cursor = "";
    b.className = "btnIcon right disable";
    b.disabled = true;
    return true
}

function NumberGroupTitle(h) {
    var c = h.innerHTML.split("~");
    var f = h.innerHTML.replace("<br>", ",").split(",");
    var a = false;
    var b = false;
    if (f.length <= 1) {
        b = true
    }
    if (c.length <= 1) {
        a = true
    }
    if (a && b) {
        h.title = "";
        return
    }
    var d;
    var e;
    if (!a) {
        var k = "";
        d = parseInt(c[0], 10);
        e = parseInt(c[1], 10);
        for (var g = d; g <= e; g++) {
            k = k + "," + g
        }
        h.title = k.substr(1)
    }
    if (!b) {
        h.title = h.innerHTML.replace("<br>", ",")
    }
}

function setSelecter(b, f, g, c) {
    if (c == null) {
        c = false
    }
    var e = $("#" + b + "_Txt");
    if (c) {
        e.find("div")[0].className = $(f).find("div")[0].className
    } else {
        e.html($(f).html())
    }
    e.attr("title", $(f).attr("title"));
    $("#" + b).attr("value", g);
    if (b == "aSorter") {
        var a;
        var d = "D";
        if (document.DataForm_L != null) {
            a = document.DataForm_L;
            d = "L"
        } else {
            a = document.DataForm;
            d = "D"
        }
        if (g != a.OrderBy.value) {
            setRefreshSort()
        } else {
            if (d != "L") {
                refreshData()
            } else {
                refreshAll()
            }
        }
    }
}

function getSelecterValue(a) {
    return $("#" + a).attr("value")
}

function onKeyPressSelecter(d, b) {
    var h = $("#" + d + "_menu > .selected");
    var a = String.fromCharCode(b.charCode).toUpperCase();
    $(".submenu li").removeClass("selected");
    if (b.keyCode == 13) {
        h.click();
        return
    }
    if (b.keyCode == 38) {
        if (h.prev().length == 0) {
            $("#" + d + "_Div .submenu li").siblings().last().addClass("selected")
        } else {
            h.prev().addClass("selected");
            if (CheckScrollMove(300, 22, h.prev().position().top)) {
                $("#" + d + "_menu").scrollTop($("#" + d + "_menu").scrollTop() + h.prev().position().top)
            }
        }
    }
    if (b.keyCode == 40) {
        if (h.next().length == 0) {
            $("#" + d + "_Div .submenu li").siblings().first().addClass("selected")
        } else {
            h.next().addClass("selected");
            if (CheckScrollMove(300, 22, h.next().position().top)) {
                $("#" + d + "_menu").scrollTop($("#" + d + "_menu").scrollTop() + h.next().position().top)
            }
        }
    }
    if (h.length == 0) {
        $("#" + d + "_Div .submenu li").each(function() {
            if (a == $(this).text().substring(0, 1)) {
                SetScrollAndSelected(d, $(this));
                return false
            }
        })
    } else {
        var f = true;
        var g = true;
        h.nextAll().each(function() {
            if (a == $(this).text().substring(0, 1)) {
                SetScrollAndSelected(d, $(this));
                f = false;
                g = false;
                return false
            }
        });
        if (f) {
            if (a == h.prevAll().last().text().substring(0, 1)) {
                SetScrollAndSelected(d, h.prevAll().last());
                return false
            }
            h.prevAll().last().nextUntil($(this)).each(function() {
                if (a == $(this).text().substring(0, 1)) {
                    SetScrollAndSelected(d, $(this));
                    g = false;
                    return false
                }
            })
        }
        if (g) {
            if (a == h.text().substring(0, 1)) {
                SetScrollAndSelected(d, h)
            }
        }
    }
}

function onOver(a) {
    $(".submenu li").removeClass("selected");
    $(a).addClass("selected")
}

function onOut(a) {
    $(a).removeClass("selected")
}

function SetScrollAndSelected(a, b) {
    b.addClass("selected");
    if (CheckScrollMove(300, 22, b.position().top)) {
        $("#" + a + "_menu").scrollTop($("#" + a + "_menu").scrollTop() + b.position().top)
    }
}

function CheckScrollMove(a, c, b) {
    if (b > a - c || b < 0) {
        return true
    }
    return false
}

function onClickSelecter(a) {
    if (document.getElementById(a + "_Div").className.indexOf("disable") > -1) {
        return
    }
    var b = document.getElementById(a + "_menu");
    var c = function(f) {
        f = f || window.event;
        var d = f.srcElement || f.target;
        if (d.id != a + "_Div" && d.id != a + "_Txt" && d.id != a + "_menu" && d.id != a + "_Icon") {
            if (b != null) {
                b.style.visibility = "hidden"
            }
            $(document).unbind("click", c)
        }
    };
    if (b != null) {
        $(document).unbind("click", c);
        if (b.style.visibility == "visible") {
            b.style.visibility = "hidden"
        } else {
            b.style.visibility = "visible";
            $(document).bind("click", c)
        }
    }
}

function setSelecterDisable(b, c) {
    var e = document.getElementById(b + "_Div");
    var d = $("#" + b + "_Txt").find("div").length > 0;
    var a = d ? "button select icon" : "button select";
    if (e != null) {
        if (c == true) {
            e.className = a + " disable"
        } else {
            e.className = a
        }
    }
}

function RemoveSelecterItems(a) {
    var b = document.getElementById(a + "_menu");
    if (b.hasChildNodes()) {
        while (b.childNodes.length >= 1) {
            b.removeChild(b.firstChild)
        }
    }
    document.getElementById(a + "_Txt").innerHTML = "";
    document.getElementById(a).value = ""
}

function AddSelecterItem(id, name, value, isselect, callbackJS) {
    var parentobj = $("#" + id + "_menu");
    var newli = $("<li title='" + name + "'>" + name + "</li>");
    if (id != null) {
        newli.attr("id", id)
    }
    newli.click(function() {
        eval("setSelecter('" + id + "',this,'" + value + "');" + (callbackJS == null ? "" : callbackJS))
    });
    newli.appendTo(parentobj);
    if (isselect == true) {
        $("#" + id + "_Txt").html(name);
        $("#" + id + "_Txt").attr("title", name);
        $("#" + id).value = value
    }
}
String.format = function() {
    var c = arguments[0];
    if (c == null) {
        return ""
    }
    for (var a = 0; a < arguments.length - 1; a++) {
        var b = getStringFormatPlaceHolderRegEx(a);
        c = c.replace(b, (arguments[a + 1] == null ? "" : arguments[a + 1]))
    }
    return cleanStringFormatResult(c)
};

function getStringFormatPlaceHolderRegEx(a) {
    return new RegExp("({)?\\{" + a + "\\}(?!})", "gm")
}

function cleanStringFormatResult(a) {
    if (a == null) {
        return ""
    }
    return a.replace(getStringFormatPlaceHolderRegEx("\\d+"), "")
}

function isFlashSupported() {
    if (window.ActiveXObject) {
        try {
            if (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) {
                return true
            }
        } catch (a) {}
    }
    return navigator.plugins["Shockwave Flash"] ? true : false
}

function checkFlashSupport(a) {
    if (a == null) {
        a = isFlashSupported()
    }
    return a
}

function switchNoSupportFlashTxt(b, a) {
    setTimeout(function() {
        if ($("#" + b)) {
            if (checkFlashSupport(fFrame.FlashSupport)) {
                $("#" + b).hide();
                if (a != null) {
                    $("#" + a).show()
                }
            } else {
                $("#" + b).show();
                if (a != null) {
                    $("#" + a).hide()
                }
            }
        }
    }, 1)
}

function getEvent() {
    if (document.all) {
        return window.event
    }
    func = getEvent.caller;
    while (func != null) {
        var a = func.arguments[0];
        if (a) {
            if ((a.constructor == Event || a.constructor == MouseEvent) || (typeof(a) == "object" && a.preventDefault && a.stopPropagation)) {
                return a
            }
        }
        func = func.caller
    }
    return null
}

function importJS(src, look_for, onload, TargetFrame) {
    if (TargetFrame == null) {
        TargetFrame = window
    }
    var s = TargetFrame.document.createElement("script");
    s.setAttribute("type", "text/javascript");
    s.setAttribute("src", src);
    if (onload) {
        wait_for_script_load(look_for, onload)
    }
    if (eval("typeof " + look_for) == "undefined") {
        var head = TargetFrame.document.getElementsByTagName("head")[0];
        if (head) {
            head.appendChild(s)
        } else {
            TargetFrame.document.body.appendChild(s)
        }
    }
}

function wait_for_script_load(look_for, callback) {
    var interval = setInterval(function() {
        if (eval("typeof " + look_for) != "undefined") {
            clearInterval(interval);
            callback()
        }
    }, 50)
}

function CheckIsIpad() {
    if (!EnableIPadStyle) {
        return false
    }
    if (navigator.userAgent.match(/Android 4./i) || navigator.userAgent.match(/iPad/i)) {
        return true
    }
    return false
}

function CheckIScroll() {
    if (EnableIScroll && typeof(myScroll) != "undefined") {
        return true
    }
    return false
}
var Sport_Area_CLOSE = "closeEvents";
var Sport_Area_OPEN = "popWBlueArea";

function SportControl(b) {
    var a = document.getElementById("SportArea_" + b);
    if (a.className.indexOf(Sport_Area_CLOSE) != -1) {
        a.className = a.className.replace(Sport_Area_CLOSE, "").replace(/(^\s*)|(\s*$)/g, "")
    } else {
        a.className = a.className.replace(Sport_Area_OPEN, Sport_Area_OPEN + " " + Sport_Area_CLOSE).replace(/(^\s*)|(\s*$)/g, "")
    }
}

function showScoreMsg() {
    if ($("#scoremapmsg").css("visibility") == "hidden") {
        $("#scoremapmsg").css("visibility", "visible")
    } else {
        $("#scoremapmsg").css("visibility", "hidden")
    }
};