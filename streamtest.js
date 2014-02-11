function include(filename, type) {
    var head = document.getElementsByTagName('head')[0];
    if (type == "js") {
        var script = document.createElement('script');
        script.src = filename;
        script.type = 'text/javascript';
        head.appendChild(script)
    }
    if (type == "css") {
        var cs_s = document.createElement('link');
        cs_s.href = filename;
        cs_s.type = 'text/css';
        cs_s.setAttribute("rel", "stylesheet");
        head.appendChild(cs_s);
    }
}



function getStreamTestVideoList() {
    //"<div id='StreamTestVideoList' style='float:right;border: 1px solid;top:0;position:absolute;right:10px' class='STVLcls'>" +
    //class='STVLcls'
    return "<div id='StreamTestVideoList'  >" +
        "<a id='StreamTestClose'>x</a>" +
        "<div id='STVLHeader'>" +
        "<img class=\"STVL_logo\" src=\"http://www.streamtest.net/images/logo.png\" /><br/>" +
        "<div id='STVLhd'><span>We have detected the following streams on this page, which one would you like to test?</span><br/>" +
        "</div>" +
        "</div>" + '<p id="presetStreamUrlsMsg">' + window.location.host + ' is offering the following streams for testing: </p>' +
        "<div id='STVLBody'>" +
        "</div><div id=\"STVLFooter\">&copy; StreamTest.net All Rights Reserved</div>" +
        "</div>" +
        "<div id='StreamTestBackground'></div>"
}



include("http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js", "js");

include("http://www.streamtest.com/Content/streamtestcss.css", "css");

var checker = 0;

function jqueryLoaded() {
    clearInterval(checker);
    $(document).ready(function () {

        //SETTING UP OUR POPUP
        //0 means disabled; 1 means enabled;
        var popupStatus = 0;

        //loading popup with jQuery magic!
        function loadPopup() {
            //loads popup only if it is disabled
            if (popupStatus == 0) {
                $("#StreamTestBackground").css({
                    "opacity": "0.7"
                });
                $("#StreamTestBackground").fadeIn("slow");
                $("#StreamTestVideoList").fadeIn("slow");
                if (typeof StreamTestURLS !== 'undefined') {
                    $("#presetStreamUrlsMsg").show();
                    $("#STVLBody").css('height', '56%');
                }
                popupStatus = 1;
            }
        }

        //disabling popup with jQuery magic!
        function disablePopup() {
            //disables popup only if it is enabled
            if (popupStatus == 1) {
                $("#StreamTestBackground").fadeOut("slow");
                $("#StreamTestVideoList").fadeOut("slow");
                popupStatus = 0;
            }
        }

        //centering popup
        function centerPopup() {
            //request data for centering
            var windowWidth = document.documentElement.clientWidth;
            var windowHeight = document.documentElement.clientHeight;

            $("#StreamTestBackground").css({
                "height": windowHeight
            });

        }

        function parseStringEnd(urlstring) {
            var tmpstring = urlstring.toString();
            //characters that ends the url in a well formed url , 
            // space, quote (part of the html, its supposed an url must to be encoded)
            // apphostrophe, > greather than, < lower than
            var urlEndChars = new Array();
            urlEndChars[0] = ' ';
            urlEndChars[1] = '"';
            urlEndChars[2] = '\'';
            urlEndChars[3] = '>';
            urlEndChars[4] = '<';
            urlEndChars[5] = ')';
            urlEndChars[6] = '(';
            urlEndChars[7] = '\n';
            urlEndChars[8] = '\t';
            urlEndChars[9] = '\r';

            var tmpstr2 = "";

            for (var j = 0; j < urlEndChars.length; j++) {
                tmpstr2 = tmpstring.toString().split(urlEndChars[j].toString());

                if (tmpstr2.length > 1) {
                    tmpstring = tmpstr2[0];
                }
                else {
                    tmpstring = tmpstr2;
                }
            }

            return tmpstring;
        }



        // protocol to parse
        var protocol_ = 'rtmp:';
        // get full html
        // with jquery
        var fullhtml = $("html").html();
        // pure js
        //      var fullhtml = document.getElementsByTagName('html')[0].innerHTML;
        fullhtml = fullhtml.toLowerCase();

        //parse all protocol strings
        //urlarray = fullhtml.split(protocol_);

        var rtmpRegEx = /(rtmp|rtsp)(:\/\/[\w-]+)(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;~+#-])?/g;
        urlarray = fullhtml.match(rtmpRegEx);

        var q = "";
        // start at position 1, position 0 contains all the <body, etc strings

        if (typeof StreamTestURLS !== 'undefined') {
            for (var i = 1; i < StreamTestURLS.length; i++) {
                //if (urlarray[i].toString().trim().length > 0) {
                //    // concatenate, also add the protocol string, cause 
                //    //split function drop it from the resulting string
                //    linkfound = protocol_ + parseStringEnd(urlarray[i]);
                linkfound = StreamTestURLS[i];
                q += "<a class='STLVhl' href=http://www.streamtest.net/?stream_url=" + linkfound + ">" + linkfound + "</a>";
                //}
            }
        }
        else {
            for (var i = 1; i < urlarray.length; i++) {

                //if (urlarray[i].toString().trim().length > 0) {
                //    // concatenate, also add the protocol string, cause 
                //    //split function drop it from the resulting string
                //    linkfound = protocol_ + parseStringEnd(urlarray[i]);
                linkfound = urlarray[i];
                q += "<a class='STLVhl' href=http://www.streamtest.net/?stream_url=" + linkfound + ">" + linkfound + "</a>";
                //}
            }
        }



        if ($('#StreamTestVideoList').length) { // Video List already exists
        } else { // add it
            $(document.body).append(getStreamTestVideoList());
        }
        
        $("#STVLBody").html(q);

        $('a.STLVhl').each(function () {
            $(this).attr('target', '_blank');
        });

        $("#StreamTestClose").click(function () {
            disablePopup();
        });

        //Click out event!
        $("#StreamTestBackground").click(function () {
            disablePopup();
        });
        //Press Escape event!
        $(document).keypress(function (e) {
            if (e.keyCode == 27 && popupStatus == 1) {
                disablePopup();
            }
        });

        $('a[href^="http://www.StreamTest.net/badges"], a[href^="http://www.streamtest.net/badges"]').click(function (e) {
            //$('StreamTestVideoList').bPopup();
            //centering with css
            centerPopup();
            //load popup
            loadPopup();

            e.preventDefault();
        });

    });

}

function checkJquery() {
    if (window.jQuery) {
        jqueryLoaded();
    }
    if (checker == 0) {
        //alert('Setting up interval');
        checker = window.setInterval(checkJquery, 100);
    }
}

checkJquery();
