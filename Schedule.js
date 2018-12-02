var mainText = document.getElementById("mainText");
var submitBtn = document.getElementById("submitBtn");
var root = firebase.database().ref();


window.onload = function () {
    var Yid = new Array();
    for (var i = 0; i < 7; i++) {
        Yid[i] = new Array(i);
        for (var j = 0; j < 11; j++) {
            if (j == 10) {
                Yid[i][j] = i.toString() + "X";
                break;
            }
            Yid[i][j] = i.toString() + j.toString();
        }
    }

    var Y00 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[0][0]);
    var Y10 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[1][0]);
    var Y20 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[2][0]);
    var Y30 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[3][0]);
    var Y40 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[4][0]);
    var Y50 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[5][0]);
    var Y60 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[6][0]);
    var Y01 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[0][1]);
    var Y11 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[1][1]);
    var Y21 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[2][1]);
    var Y31 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[3][1]);
    var Y41 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[4][1]);
    var Y51 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[5][1]);
    var Y61 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[6][1]);
    var Y02 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[0][2]);
    var Y12 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[1][2]);
    var Y22 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[2][2]);
    var Y32 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[3][2]);
    var Y42 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[4][2]);
    var Y52 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[5][2]);
    var Y62 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[6][2]);
    var Y03 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[0][3]);
    var Y13 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[1][3]);
    var Y23 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[2][3]);
    var Y33 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[3][3]);
    var Y43 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[4][3]);
    var Y53 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[5][3]);
    var Y63 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[6][3]);
    var Y04 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[0][4]);
    var Y14 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[1][4]);
    var Y24 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[2][4]);
    var Y34 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[3][4]);
    var Y44 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[4][4]);
    var Y54 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[5][4]);
    var Y64 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[6][4]);
    var Y05 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[0][5]);
    var Y15 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[1][5]);
    var Y25 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[2][5]);
    var Y35 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[3][5]);
    var Y45 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[4][5]);
    var Y55 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[5][5]);
    var Y65 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[6][5]);
    var Y06 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[0][6]);
    var Y16 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[1][6]);
    var Y26 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[2][6]);
    var Y36 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[3][6]);
    var Y46 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[4][6]);
    var Y56 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[5][6]);
    var Y66 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[6][6]);
    var Y07 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[0][7]);
    var Y17 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[1][7]);
    var Y27 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[2][7]);
    var Y37 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[3][7]);
    var Y47 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[4][7]);
    var Y57 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[5][7]);
    var Y67 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[6][7]);
    var Y08 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[0][8]);
    var Y18 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[1][8]);
    var Y28 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[2][8]);
    var Y38 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[3][8]);
    var Y48 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[4][8]);
    var Y58 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[5][8]);
    var Y68 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[6][8]);
    var Y09 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[0][9]);
    var Y19 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[1][9]);
    var Y29 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[2][9]);
    var Y39 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[3][9]);
    var Y49 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[4][9]);
    var Y59 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[5][9]);
    var Y69 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[6][9]);
    var Y0X = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[0][10]);
    var Y1X = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[1][10]);
    var Y2X = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[2][10]);
    var Y3X = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[3][10]);
    var Y4X = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[4][10]);
    var Y5X = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[5][10]);
    var Y6X = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Yid[6][10]);

    Y00.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[0][0]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[0][0]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y10.once('value', function (snapshot) {
        var temp = snapshot.val();
        if (temp == true) {
            document.getElementById(Yid[1][0]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[1][0]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y20.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[2][0]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[2][0]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y30.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[3][0]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[3][0]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y40.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[4][0]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[4][0]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y50.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[5][0]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[5][0]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y60.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[6][0]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[6][0]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y01.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[0][1]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[0][1]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y11.once('value', function (snapshot) {
        var temp = snapshot.val();
        if (temp == true) {
            document.getElementById(Yid[1][1]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[1][1]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y21.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[2][1]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[2][1]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y31.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[3][1]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[3][1]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y41.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[4][1]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[4][1]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y51.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[5][1]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[5][1]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y61.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[6][1]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[6][1]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y02.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[0][2]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[0][2]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y12.once('value', function (snapshot) {
        var temp = snapshot.val();
        if (temp == true) {
            document.getElementById(Yid[1][2]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[1][2]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y22.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[2][2]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[2][2]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y32.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[3][2]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[3][2]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y42.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[4][2]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[4][2]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y52.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[5][2]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[5][2]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y62.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[6][2]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[6][2]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y03.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[0][3]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[0][3]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y13.once('value', function (snapshot) {
        var temp = snapshot.val();
        if (temp == true) {
            document.getElementById(Yid[1][3]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[1][3]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y23.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[2][3]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[2][3]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y33.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[3][3]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[3][3]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y43.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[4][3]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[4][3]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y53.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[5][3]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[5][3]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y63.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[6][3]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[6][3]).style.background = 'rgb(255, 222, 222)';
        }
    });
    Y04.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[0][4]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[0][4]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y14.once('value', function (snapshot) {
        var temp = snapshot.val();
        if (temp == true) {
            document.getElementById(Yid[1][4]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[1][4]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y24.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[2][4]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[2][4]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y34.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[3][4]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[3][4]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y44.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[4][4]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[4][4]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y54.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[5][4]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[5][4]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y64.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[6][4]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[6][4]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y05.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[0][5]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[0][5]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y15.once('value', function (snapshot) {
        var temp = snapshot.val();
        if (temp == true) {
            document.getElementById(Yid[1][5]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[1][5]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y25.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[2][5]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[2][5]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y35.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[3][5]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[3][5]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y45.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[4][5]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[4][5]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y55.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[5][5]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[5][5]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y65.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[6][5]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[6][5]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y06.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[0][6]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[0][6]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y16.once('value', function (snapshot) {
        var temp = snapshot.val();
        if (temp == true) {
            document.getElementById(Yid[1][6]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[1][6]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y26.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[2][6]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[2][6]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y36.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[3][6]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[3][6]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y46.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[4][6]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[4][6]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y56.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[5][6]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[5][6]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y66.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[6][6]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[6][6]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y07.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[0][7]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[0][7]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y17.once('value', function (snapshot) {
        var temp = snapshot.val();
        if (temp == true) {
            document.getElementById(Yid[1][7]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[1][7]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y27.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[2][7]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[2][7]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y37.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[3][7]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[3][7]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y47.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[4][7]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[4][7]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y57.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[5][7]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[5][7]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y67.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[6][7]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[6][7]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y08.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[0][8]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[0][8]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y18.once('value', function (snapshot) {
        var temp = snapshot.val();
        if (temp == true) {
            document.getElementById(Yid[1][8]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[1][8]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y28.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[2][8]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[2][8]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y38.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[3][8]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[3][8]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y48.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[4][8]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[4][8]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y58.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[5][8]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[5][0]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y68.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[6][8]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[6][8]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y09.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[0][9]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[0][9]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y19.once('value', function (snapshot) {
        var temp = snapshot.val();
        if (temp == true) {
            document.getElementById(Yid[1][9]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[1][9]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y29.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[2][9]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[2][9]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y39.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[3][9]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[3][9]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y49.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[4][9]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[4][9]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y59.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[5][9]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[5][9]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y69.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[6][9]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[6][9]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y0X.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[0][10]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[0][10]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y1X.once('value', function (snapshot) {
        var temp = snapshot.val();
        if (temp == true) {
            document.getElementById(Yid[1][10]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[1][10]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y2X.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[2][10]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[2][10]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y3X.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[3][10]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[3][10]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y4X.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[4][10]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[4][10]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y5X.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[5][10]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[5][10]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y6X.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Yid[6][10]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Yid[6][10]).style.background = 'rgb(255, 222, 222)';
        }
    });
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var Tid = new Array();
    for (var i = 0; i < 7; i++) {
        Tid[i] = new Array(i);
        for (var j = 0; j < 11; j++) {
            if (j == 10) {
                Tid[i][j] = "T" + i.toString() + "X";
                break;
            }
            Tid[i][j] = "T" + i.toString() + j.toString();
        }
    }

    var T00 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[0][0]);
    var T10 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[1][0]);
    var T20 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[2][0]);
    var T30 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[3][0]);
    var T40 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[4][0]);
    var T50 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[5][0]);
    var T60 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[6][0]);
    var T01 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[0][1]);
    var T11 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[1][1]);
    var T21 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[2][1]);
    var T31 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[3][1]);
    var T41 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[4][1]);
    var T51 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[5][1]);
    var T61 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[6][1]);
    var T02 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[0][2]);
    var T12 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[1][2]);
    var T22 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[2][2]);
    var T32 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[3][2]);
    var T42 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[4][2]);
    var T52 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[5][2]);
    var T62 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[6][2]);
    var T03 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[0][3]);
    var T13 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[1][3]);
    var T23 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[2][3]);
    var T33 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[3][3]);
    var T43 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[4][3]);
    var T53 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[5][3]);
    var T63 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[6][3]);
    var T04 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[0][4]);
    var T14 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[1][4]);
    var T24 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[2][4]);
    var T34 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[3][4]);
    var T44 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[4][4]);
    var T54 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[5][4]);
    var T64 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[6][4]);
    var T05 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[0][5]);
    var T15 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[1][5]);
    var T25 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[2][5]);
    var T35 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[3][5]);
    var T45 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[4][5]);
    var T55 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[5][5]);
    var T65 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[6][5]);
    var T06 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[0][6]);
    var T16 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[1][6]);
    var T26 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[2][6]);
    var T36 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[3][6]);
    var T46 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[4][6]);
    var T56 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[5][6]);
    var T66 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[6][6]);
    var T07 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[0][7]);
    var T17 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[1][7]);
    var T27 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[2][7]);
    var T37 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[3][7]);
    var T47 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[4][7]);
    var T57 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[5][7]);
    var T67 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[6][7]);
    var T08 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[0][8]);
    var T18 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[1][8]);
    var T28 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[2][8]);
    var T38 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[3][8]);
    var T48 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[4][8]);
    var T58 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[5][8]);
    var T68 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[6][8]);
    var T09 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[0][9]);
    var T19 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[1][9]);
    var T29 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[2][9]);
    var T39 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[3][9]);
    var T49 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[4][9]);
    var T59 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[5][9]);
    var T69 = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[6][9]);
    var T0X = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[0][10]);
    var T1X = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[1][10]);
    var T2X = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[2][10]);
    var T3X = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[3][10]);
    var T4X = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[4][10]);
    var T5X = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[5][10]);
    var T6X = root.child('Team').child('Team1').child('Schedule').child('eventList').child('eventId').child('userId').child('availability').child(Tid[6][10]);

    Y00.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[0][0]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[0][0]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y10.once('value', function (snapshot) {
        var temp = snapshot.val();
        if (temp == true) {
            document.getElementById(Tid[1][0]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[1][0]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y20.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[2][0]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[2][0]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y30.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[3][0]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[3][0]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y40.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[4][0]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[4][0]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y50.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[5][0]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[5][0]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y60.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[6][0]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[6][0]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y01.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[0][1]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[0][1]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y11.once('value', function (snapshot) {
        var temp = snapshot.val();
        if (temp == true) {
            document.getElementById(Tid[1][1]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[1][1]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y21.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[2][1]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[2][1]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y31.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[3][1]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[3][1]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y41.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[4][1]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[4][1]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y51.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[5][1]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[5][1]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y61.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[6][1]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[6][1]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y02.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[0][2]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[0][2]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y12.once('value', function (snapshot) {
        var temp = snapshot.val();
        if (temp == true) {
            document.getElementById(Tid[1][2]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[1][2]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y22.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[2][2]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[2][2]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y32.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[3][2]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[3][2]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y42.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[4][2]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[4][2]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y52.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[5][2]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[5][2]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y62.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[6][2]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[6][2]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y03.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[0][3]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[0][3]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y13.once('value', function (snapshot) {
        var temp = snapshot.val();
        if (temp == true) {
            document.getElementById(Tid[1][3]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[1][3]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y23.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[2][3]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[2][3]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y33.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[3][3]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[3][3]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y43.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[4][3]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[4][3]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y53.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[5][3]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[5][3]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y63.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[6][3]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[6][3]).style.background = 'rgb(255, 222, 222)';
        }
    });
    Y04.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[0][4]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[0][4]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y14.once('value', function (snapshot) {
        var temp = snapshot.val();
        if (temp == true) {
            document.getElementById(Tid[1][4]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[1][4]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y24.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[2][4]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[2][4]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y34.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[3][4]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[3][4]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y44.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[4][4]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[4][4]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y54.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[5][4]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[5][4]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y64.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[6][4]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[6][4]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y05.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[0][5]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[0][5]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y15.once('value', function (snapshot) {
        var temp = snapshot.val();
        if (temp == true) {
            document.getElementById(Tid[1][5]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[1][5]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y25.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[2][5]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[2][5]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y35.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[3][5]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[3][5]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y45.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[4][5]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[4][5]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y55.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[5][5]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[5][5]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y65.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[6][5]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[6][5]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y06.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[0][6]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[0][6]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y16.once('value', function (snapshot) {
        var temp = snapshot.val();
        if (temp == true) {
            document.getElementById(Tid[1][6]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[1][6]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y26.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[2][6]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[2][6]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y36.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[3][6]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[3][6]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y46.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[4][6]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[4][6]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y56.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[5][6]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[5][6]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y66.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[6][6]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[6][6]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y07.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[0][7]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[0][7]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y17.once('value', function (snapshot) {
        var temp = snapshot.val();
        if (temp == true) {
            document.getElementById(Tid[1][7]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[1][7]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y27.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[2][7]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[2][7]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y37.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[3][7]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[3][7]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y47.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[4][7]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[4][7]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y57.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[5][7]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[5][7]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y67.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[6][7]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[6][7]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y08.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[0][8]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[0][8]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y18.once('value', function (snapshot) {
        var temp = snapshot.val();
        if (temp == true) {
            document.getElementById(Tid[1][8]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[1][8]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y28.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[2][8]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[2][8]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y38.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[3][8]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[3][8]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y48.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[4][8]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[4][8]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y58.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[5][8]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[5][8]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y68.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[6][8]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[6][8]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y09.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[0][9]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[0][9]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y19.once('value', function (snapshot) {
        var temp = snapshot.val();
        if (temp == true) {
            document.getElementById(Tid[1][9]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[1][9]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y29.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[2][9]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[2][9]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y39.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[3][9]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[3][9]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y49.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[4][9]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[4][9]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y59.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[5][9]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[5][9]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y69.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[6][9]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[6][9]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y0X.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[0][10]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[0][10]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y1X.once('value', function (snapshot) {
        var temp = snapshot.val();
        if (temp == true) {
            document.getElementById(Tid[1][10]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[1][10]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y2X.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[2][10]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[2][10]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y3X.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[3][10]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[3][10]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y4X.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[4][10]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[4][10]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y5X.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[5][10]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[5][10]).style.background = 'rgb(255, 222, 222)';
        }
    });

    Y6X.once('value', function (snapshot) {
        var temp = snapshot.val();

        if (temp == true) {
            document.getElementById(Tid[6][10]).style.background = 'rgb(51, 153, 0)';
        }
        if (temp == false) {
            document.getElementById(Tid[6][10]).style.background = 'rgb(255, 222, 222)';
        }
    });



}

function submitClick() {
    var firebaseRef = firebase.database().ref();

    firebaseRef.child("Text").set("Some value");
}

function f(e) {
    // var userId = firebase.auth().currentUser.uid;
    // window.alert(userId);
    var T = document.getElementById("T" + e.id);
    //var firebaseRef = firebase.database().ref('Team/' + teamId + '/Schedule/eventList/' + eventId + '/' + userId + '/availability');

    //var firebaseRef = firebase.database().ref('Team/Team1/Schedule/eventList/eventId/' + userId + '/availability');

    //firebaseRef.child("0:").set(e.data-col);
    //window.alert("TEST");
    //window.alert(e.data-col);

    if (e.style.background == "rgb(255, 222, 222)") {
        e.style.background = "rgb(51, 153, 0)";
    } else {
        e.style.background = "rgb(255, 222, 222)";
    }

    if (T.style.background == "rgb(255, 255, 255)") {
        T.style.background = "rgb(51, 153, 0)";
    } else {
        T.style.background = "rgb(255, 255, 255)";
    }
}
