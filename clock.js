$(document).ready(function() {

    //starts dropbox
    var client = new Dropbox.Client({
        key: "rpoaJF96/4A=|+x8epsIYlax/w7sMdMP5PwIgWkvOnZYlvmSXTMXM2A==",
        sandbox: true
    });
    client.authDriver(new Dropbox.Drivers.Redirect({
        rememberUser: true
    }));
    client.authenticate(function(error, client) {
        if (error) {
            console.log(error)
            // Replace with a call to your own error-handling code.
            //
            // Don't forget to return from the callback, so you don't execute the code
            // that assumes everything went well.
            return showError(error);
        }

        // Replace with a call to your own application code.
        //
        // The user authorized your app, and everything went well.
        // client is a Dropbox.Client instance that you can use to make API calls.
        // console.log("Hello, " + userInfo.name + "!");
        client.readdir("/", function(error, entries) {
            if (error) {
                return showError(error); // Something went wrong.
            }
            console.log("Your Dropbox contains " + entries.join(", "));
            entriees = entries
            slideshowurl = []
            for (z = entries.length - 1; z >= 0; z--) {
                client.makeUrl(entries[z], {
                    downloadHack: true
                }, function(error, data) {
                    if (error) {
                        return showError(error); // Something went wrong.
                    }
                    slideshowurl.push(data.url.replace("dl.dropbox", "dl.dropboxusercontent"))
                    datae = data; // data has the file's contents
                    if (entries.length == slideshowurl.length) {
                        slideshow(slideshowurl)
                        console.log(slideshowurl)
                    }
                });
            };
        });
    });

    $("#timecheck input[type=text]").focusout(validatetime)
    weathercenter()
    $("#timecheck input[type=radio]").change(weathercenter)
    getcook()
    $("#buzzpp").html(">")
    weather()
    alarmon = false
    $('#controlalarm').hide();
    getremote()
    date()
    setInterval(function() {
        updateClock()
    }, 1000)
    setInterval(function() {
        checkalarms()
    }, 55000)
    //every 55 seconds, should make impossible to miss minute, test
    setInterval(function() {
        getremote()
    }, 1800000)
    //every 1/2 hour check from remotly
    setInterval(function() {
        date()
    }, 90000000)
    $("#date").click(function() {
        console.log("clicked")
        $("#controlalarm").show().siblings().hide()
        if ($("#controlalarm").css('display') != 'none') {
            Mousetrap.bind('esc', function() {
                console.log('you pressed esc!');
                $("#controlalarm").hide().siblings().show()
                Mousetrap.unbind("esc")
            });
        }

    })
})
//openkeyval
// var adate= ["this","that"]
// window.remoteStorage.setItem('alarmclock0112358', adate);
// ovar ourCallback = function(value, key) {
//     var value=value
// }
// window.remoteStorage.getItem('alarmclock0112358', ourCallback);
//parse date, push to array and to remotestorage, when time comes start alarm
//rephreshs page at 1 AM(hopefully) for date

function refreshAt(hours, minutes, seconds) {
    var now = new Date();
    var then = new Date();

    if (now.getHours() > hours || (now.getHours() == hours && now.getMinutes() > minutes) || now.getHours() == hours && now.getMinutes() == minutes && now.getSeconds() >= seconds) {
        then.setDate(now.getDate() + 1);
    }
    then.setHours(hours);
    then.setMinutes(minutes);
    then.setSeconds(seconds);

    var timeout = (then.getTime() - now.getTime());
    setTimeout(function() {
        window.location.reload(true);
    }, timeout);
}
//represhs at 1 oclock(hopefully check date) to represh date
refreshAt(1, 0, 0)

//does clock

function updateClock() {
    currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    var currentSeconds = currentTime.getSeconds();

    // Pad the minutes and seconds with leading zeros, if required
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
    currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;

    // Choose either "AM" or "PM" as appropriate
    var timeOfDay = (currentHours < 12) ? "AM" : "PM";

    // Convert the hours component to 12-hour format if needed
    currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;

    // Convert an hours component of "0" to "12"
    currentHours = (currentHours == 0) ? 12 : currentHours;

    if (currentSeconds % 2 == 0) {
        $("#colon").animate({
            opacity: 0.65
        }, 500);
    }
    if (currentSeconds % 2 == 1) {
        $("#colon").animate({
            opacity: 0
        }, 500);
    }
    // console.log(currentSeconds)
    // Update the time display
    $("#hours").html(currentHours);
    $("#minutes").html(currentMinutes);
    $("#AmPm").html(timeOfDay);
    //console.log(currentTimeString)
}

function date() {
    //date
    var datedate = new Date();
    var weekdayNames = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");

    var monthNames = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

    //var dateString = datedate.toLocaleDateString();
    var weekday = weekdayNames[datedate.getDay()];
    var month = monthNames[datedate.getMonth()];
    var dateString = weekday + ', ' + month + ' ' + datedate.getDate() + ' ' + datedate.getFullYear();
    $("#date").html(dateString)
}



//weather
// Docs at http://simpleweather.monkeecreate.com
var weatherimg

function weather() {
    $.simpleWeather({
        zipcode: '21131',
        woeid: '',
        location: '',
        unit: 'f',
        success: function(weather) {
            html = '<div id="currenttemp">' + weather.temp + '&deg;' + weather.units.temp + '</div>';
            html += '<li>' + weather.currently + '</li>';
            html += '                                                             <li>' + weather.high + '-' + weather.low + '&deg;' + weather.units.temp + '</li>';
            html += '<br>Tomorrow: ';
            html += weather.tomorrow.forecast;
            html += '                                                             <li>' + weather.tomorrow.low + '-' + weather.tomorrow.high + '&deg;' + weather.units.temp + '</li>';

            $("#weather").html(html);
            // if ([31, 32, 33, 34, 36].indexOf(parseFloat(weather.code)) != -1) {
            //     $(".meteocons").html("a")
            // } else if ([20, 21, 22, 26, 27, 28, 29, 30].indexOf(parseFloat(weather.code)) != -1) {
            //     $(".meteocons").html("e")
            // } else if ([0, 1, 2, 3, 4, 37, 38, 39, 45, 47].indexOf(parseFloat(weather.code)) != -1) {
            //     $(".meteocons").html("f")
            // } else if ([5, 6, 7, 8, 9, 10, 11, 12, 35, 40].indexOf(parseFloat(weather.code)) != -1) {
            //     $(".meteocons").html("i")
            // } else if ([23, 24].indexOf(parseFloat(weather.code)) != -1) {
            //     $(".meteocons").html("j")
            // } else if ([13, 14, 15, 16, 17, 41, 42, 43, 46].indexOf(parseFloat(weather.code)) != -1) {
            //     $(".meteocons").html("b")
            // };
            // if (weather.code == 32 || 31 || 33 || 34 || 36) {
            //     weatherimg = "https://dl.dropboxusercontent.com/u/24397004/alarm%20clock/images/weather/sunny.jpg"
            // } else if (weather.code == 5 || 6 || 7 || 13 || 14 || 15 || 16 || 17 || 18 || 25 || 41 || 42 || 43 || 46) {
            //     weatherimg = "https://dl.dropboxusercontent.com/u/24397004/alarm%20clock/images/weather/snow.jpg"
            // } else if (weather.code == 3 || 4 || 8 || 9 || 10 || 11 || 12 || 35 || 37 || 38 || 39 || 40 || 45 || 47) {
            //     weatherimg = "https://dl.dropboxusercontent.com/u/24397004/alarm%20clock/images/weather/rain.jpg"
            // } else if (weather.code == 19 || 20 || 21 || 22 || 23 || 24 || 26 || 27 || 28 || 29 || 30) {
            //     weatherimg = "https://dl.dropboxusercontent.com/u/24397004/alarm%20clock/images/weather/cloudy.jpg"
            // }
        },
        error: function(error) {
            $("#weather").html('<p>' + error + '</p>');
        }
    });
}

//slideshow

function slideshow(slideshowarray) {
    slideshowfinal = []
    // console.log(slideshowarray)
    for (var i = slideshowarray.length - 1; i >= 0; i--) {
        slideshowfinal.push({
            src: slideshowarray[i]
        })
        if (i) {
            $.vegas('slideshow', {
                delay: 3000,
                backgrounds: slideshowfinal,
                fade: 1000,
                preload: false
            });

        }
    };
}
//jplayer

function buzzalarm() {
    $("#buzzpp").html(">")
    // streamsound = new buzz.sound("http://66.225.205.192/;stream/1")
    //     streamsound.fadeIn(10000
}
//alarm affect how much by changing rate of set interval(after comma) or what add to i

function alarm() {
    alarmon = true
    getreminder()
    $("#buzzpp").html("=")
    streamsound = new buzz.sound("http://66.225.205.192/;stream/1")
    streamsound.play().fadeIn(2000)
    var restartslide = setTimeout(slideshow, 60000);
    setTimeout(function() {
        // $("#reminders").html("") 
        streamsound.stop()
        $("#buzzpp").html(">")
    }, 3600000);
    Mousetrap.bind('ctrl+space', function() {
        console.log('you pressed spacebar!');
        slideshow(slideshowurl)
        Mousetrap.unbind("ctrl>space")
        streamsound.fadeOut(5000).stop()
        $("#buzzpp").html(">")
        alarmon = false
    });

    //gets day of year of today(for picture link)
    var daynumofyear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 864E5)
    $.vegas('stop')({
        src: "http://img.earthshots.org/2013/full/" + daynumofyear + ".jpg"
    });
}


//false alarms spreadsheet

function getremote() {
    //for alarm times
    window.remoteStorage.getItem('alarmclock0112358', function(value, key) {
        test = value
        test = test.split(",");
        if (test[0] != "FOR ANOTHER ALARM") {
            test.unshift("FOR ANOTHER ALARM")
        }
        for (var i = test.length - 1; i >= 0; i--) {
            if (test[i] == "") {
                test.splice(i, 1)
            }
        }
        window.remoteStorage.setItem('alarmclock0112358', test);
        dojedit(test)
        setalarms(test)
    });
}

function getreminder() {
    //for reminders
    $.getJSON("http://pipes.yahoo.com/pipes/pipe.run?_id=69811a7385c6fe19c13fa0484c3c4d44&_render=json", function(data) {
        data2 = data
        remindhtml = ""
        for (var i = data.value.items.length - 1; i >= 0; i--) {
            //test if cal or email
            // console.log(i)
            // if (data.value.items[i].from == "cal") {
            //     if (moment(data.value.items[i]["gd:when"].startTime) == Date.today()) {
            //         console.log("shoudl diplay")
            //     }
            // }
            // if (data.value.items[i].from == "mail") {
            //     console.log("mail done")
            // // var remindhtml += data.value.items[i].title
            // }
            // $("#reminders").html(remindhtml)  
        }
        // if (data.value.items[i].from == "cal"){
        //     console.log("from cal")
        //     if(Date.equals(Date.parse(data.value.items[i]["y:published"]["month_name"] + " " + data.value.items[i]["y:published"]["day"]), Date.today())){
        //         console.log("cal would go")
        //         remindhtml += data.value.items[i].title + "; "
        //     }
        // }
        // else if(data.value.items[i].from == "mail"){
        //     console.log("from mail")
        //     if(Date.equals(Date.parse(data.value.items[i]["y:published"]["month_name"] + " " + data.value.items[i]["y:published"]["day"]).add(1).days(), Date.today())){
        //         console.log("mail would go")
        //     }
        // }
        // // if(Date.equals(Date.parse(data.value.items[i]["y:published"]["month_name"] + data.value.items[i]["y:published"]["day"]), Date.today())){
        // //     console.log("from cal")
        // //     console.log(data.value.items[i])
        // //     remindhtml += data.value.items[i].title + "; "
        // // }
        //     if (i==0){
        //     $("#reminders").html(remindhtml)                    
        //     }
        // items = [];
        // $.each(data, function (key, val) {
        //     items.push(val)
        //     val2 = val
        // });
    });
}

function setalarms(test) {
    foraddtoarray = []
    for (var i = test.length - 1; i >= 0; i--) {
        alarmval = test[i]
        // console.log(alarmval)
        if (alarmval.indexOf(';') != -1) {
            splittoday = alarmval.substring(0, alarmval.indexOf(';'));
            splittoday = splittoday.split("/")
            // splittime = Date.parse(alarmval.substring(alarmval.indexOf(';')+1,alarmval.indexOf('='))).toString("H:mm")
            splittime = alarmval.substring(alarmval.indexOf(';') + 1, alarmval.indexOf('='))
            splitwhatwant = alarmval.substring(alarmval.indexOf('=') + 1, alarmval.length);
            for (p = splittoday.length - 1; p >= 0; p--) {
                if (splittoday[p].toLowerCase() == "mon" || "tue" || "wed" || "thur" || "fri" || "sat" || "sun") {
                    foraddtoarray.push(splittoday[p] + " " + splittime + "=" + splitwhatwant)
                }
            }


            //pass a new part of array and add on with different days and what want to happen, then pass to  check alarm which every second goes through every one
        }
        if (i) {
            checkalarms()
        }
    }
}

function checkalarms() {
    // console.log(Date.parse(foraddtoarray[1].substring(foraddtoarray[1].indexOf(';')+1,foraddtoarray[1].indexOf('='))))
    if (!alarmon) {
        for (var i = foraddtoarray.length - 1; i >= 0; i--) {
            if (foraddtoarray[i].substring(foraddtoarray[i].indexOf(';') + 1, foraddtoarray[i].indexOf('=')).toLowerCase() == moment().format("ddd h:mm A").toLowerCase()) {
                // alarm(foraddtoarray[i].substring(foraddtoarray[i].indexOf('=')+1,foraddtoarray[i].length))
                console.log("DOING")
                alarm()
            }

        };
        // Date.equals(Date.today(), new Date().clearTime())             
    }
}

function dojedit(test) {
    jedithtml = ""
    for (var i = test.length - 1; i >= 0; i--) {

        jedithtml += "<div class='array' id='" + i + "'>" + test[i] + "</div>"


        if (i) {
            $("#arrayjedit").html(jedithtml);
        }
    }
    $('.array').editable(function(value, settings, td) {
        test[$(this).attr("id")] = value
        window.remoteStorage.setItem('alarmclock0112358', test);
        setalarms(test)
        return (value);

    }, {
        type: 'textarea',
        submit: 'OK',
        id: 'element_id'
    });
}

function getcook() {
    window.remoteStorage.getItem('getcook0112358', function(value, key) {
        //value=test
        value = JSON.parse(value)
        cookval = value
        $("#timecheck").children().eq(value.selected).children().eq(0).prop("checked", true)
        $("#timecheck input[type=text]:first").val(value[0][0])
        $("#timecheck input[type=text]:eq(1)").val(value[0][1])

        cookval = value
        $("#timecheck input").change(function() {
            tthis = $(this);
            if ($(this).attr("type") === "radio") {
                value.selected = $(this).parent().index()
                window.remoteStorage.setItem('getcook0112358', JSON.stringify(value));
            }
            if ($(this).attr("type") === "text") {
                value[0][$(this).index() - 1] = $(this).val()
                window.remoteStorage.setItem('getcook0112358', JSON.stringify(value));
            }
        })

    });
}

function weatherhier(forearr, divto) {
    console.log(divto)
    if (forearr.indexOf("snow") == -1) {
        if (forearr.indexOf("rain") == -1) {
            if (forearr.indexOf("sleet") == -1) {
                if (forearr.indexOf("fog") == -1) {
                    if (forearr.indexOf("wind") == -1) {
                        if (forearr.indexOf("cloudy") == -1) {
                            if (forearr.indexOf("partly-cloudy-day") == -1) {
                                if (forearr.indexOf("clear-day") == -1) {
                                    alert("unknown weather, forearr.io")
                                } else {
                                    $(divto).html("a")
                                }
                            } else {
                                $(divto).html("e")
                            }
                        } else {
                            $(divto).html("e")
                        }
                    } else {
                        $(divto).html("j")
                    }
                } else {
                    $(divto).html("e")
                }
            } else {
                $(divto).html("i")
            }
        } else {
            $(divto).html("i")
        }
    } else {
        $(divto).html("b")
    }
}

function validatetime(){
    if(moment("2/3 " + $("#timecheck input[name=timecheckfrom]").val().toLowerCase()).isBefore(moment("2/3 "+$("#timecheck input[name=timecheckafter]").val().toLowerCase()))){
        weathercenter()
    }
    else{
        alert("Times aren't right, not in order or not valid")
        $(this).eq(0).focus();

    }

}

function weathercenter() {
    $.getJSON("http://whateverorigin.org/get?url=https://api.forecast.io/forecast/2e96d21ace402e85da164cf6d24869c7/45.5669,-88.9844&callback=?", function(data) {
        data = JSON.parse(data.contents)
        weatherdata = data


        if ($("#timecheck input[type='radio']:checked").parent().index()==0) {
            //is 1st checkbox(from a certain time)
            console.log(data)
            forecast = []
            for (var i = data.hourly.data.length - 1; i >= 0; i--) {
                if (moment.unix(data.hourly.data[i].time).isAfter(moment(moment().add("d", 1).format("M/D/YYYY") + " " + $("#timecheck input[name=timecheckfrom]").val().toLowerCase(), 'M/D/YYYY h:mm a')) && moment.unix(data.hourly.data[i].time).isBefore(moment(moment().format("M/D/YYYY") + " " + $("#timecheck input[name=timecheckafter]").val().toLowerCase(), 'M/D/YYYY h:mm a'))) {
                   console.log()
                    console.log(moment(data.hourly.data[i].time))
                    forecast.push(data.hourly.data[i].icon)
                    console.log(forecast)
                } else if (moment().isAfter(moment(moment().format("M/D/YYYY") + " " + $("#timecheck input[name=timecheckafter]").val().toLowerCase(), 'M/D/YYYY h:mm a'))) {
                    console.log("after the focused time");
                    if(moment.unix(data.hourly.data[i].time).dayOfYear()==moment().add('d', 1).dayOfYear()){
                        forecast.push(data.hourly.data[i].icon)
                    }
                }
                if(i==0){
                        console.log("done, in time")
                        console.log(forecast)
                        weatherhier(forecast,".meteocons")
                }
            }

            html = ""
            html += '<div id="currenttemp">' + Math.round((data.daily.data[0].temperatureMax + data.daily.data[0].temperatureMin) / 2) + "&degF</div><div id='notcurrenttemp'>" + data.daily.summary + "<br>" + data.daily.data[0].summary + "</div>"
            $("#weather").html(html)
        } else if ($("#timecheck input[type='radio']:checked").parent().index() == 2) {
            //second part, all day
                forecastall = []
            for (var i = data.hourly.data.length - 1 - 1; i >= 0; i--) {
                forecastall.push(data.hourly.data[i].icon)
                if (i==0) {
                    console.log("done, outside time"+forecastall)
                    weatherhier(forecastall, ".meteocons")
                }
            };
        }

    })

    // moment(moment().format("M/D/YYYY") + " " + $("#timecheck input[name=timecheckafter]").val(), 'M/D/YYYY h:mm a')
    // moment().format("h:mm a").toLowerCase()
}

//delete

function white() {
    $.vegas('stop')({
        src: "http://en.clipdealer.com/preview/image/000/848/201/previews/6--848201-Shaking%20hands%20on%20white%20background.jpg"
    });
}