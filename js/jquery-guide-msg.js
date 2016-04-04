(function ($, window, undefined) {
    var featuresObj = {};
    parseFeatureJson();

    function parseFeatureJson(callback, $targetElt, msgKey) {
        $.getJSON("feature.json", function (data) {
            $.extend(featuresObj, data);
            if (typeof callback === "function") {
                callback($targetElt, msgKey);
            }
        });
    }

    function showGuideMsgBoxImp($targetElt, msgKey) {
        if (isShowGuide(msgKey)) {
            var id = Math.round(Math.random() * 1000000);
            createMsgHtml(id, getGuideMsg(msgKey));
            var msgBox = getMsgObj(id);
            positionMsgBox(msgBox, $targetElt);
            msgBox.show();

            msgBox.on("click", ".close", function () {
                markRead(msgKey);
                msgBox.hide();
            });
        }
    }

    function getGuideMsg(key) {
        return featuresObj[key];
    }

    function isShowGuide(key) {
        return getCookie(key) === "";
    }

    function positionMsgBox(msgBox, $targetElt) {
        var offset = $targetElt.offset();
        var eltHeight = $targetElt.outerHeight();
        msgBox.css("top", (offset.top + eltHeight + 10) + "px");
        msgBox.css("left", offset.left + "px");
    }

    function markRead(key) {
        setCookie(key, featuresObj[key]);
    }

    function getMsgObj(id) {
        return $("#guide_msg_box_" + id);
    }

    function createMsgHtml(id, content) {
        var msgHtml = stringFormat('<div class="guide_msg_bg"></div></div><div class="guide_msg_box" id="guide_msg_box_{0}"><span class="guide_msg_content">{1}</span><div class="close"></div></div>', [id, content]);
        $("body").append(msgHtml);
    }

    /*------------------- internal function -------------------*/
    function stringFormat(str, args) {
        return str.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    }

    function setCookie(cname, cvalue) {
        document.cookie = cname + "=" + cvalue + "; ";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }

    /*------------------- inject function -------------------*/
    $.fn.extend({
        showGuideMsgBox: function (msgKey) {
            if ($.isEmptyObject(featuresObj)) {
                parseFeatureJson(showGuideMsgBoxImp, $(this), msgKey);
            }
            else {
                showGuideMsgBoxImp($(this), msgKey);
            }
        }
    });

}(jQuery, this));
