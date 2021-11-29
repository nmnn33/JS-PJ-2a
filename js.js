window.onload = function () {
    //Kun klikataan Search nappia
    document.getElementById("btnSearch").addEventListener('click', searchArtist);
    document.getElementById("btnSearch").addEventListener('click', searchArtist);
}

//Jokaiselle imagelle event, joka tulostaa albumin kappaleet
document.addEventListener('click', function (e) {
    if (e.target.tagName == "IMG") {
        document.getElementById("")
        lastfm.album.getInfo({ album:  }, {
            success: function (data) {

                //vain jos error
            }, error: function (code, message) {
                console.log("jotain meni pieleen.")
            }
        });
    }
});

/* Create a cache object */
var cache = new LastFMCache();

/* Create a LastFM object */
var lastfm = new LastFM({
    apiKey: '84b00f245537c71aacfbc7df5244ef43',
    apiSecret: 'bd7834ff7be6ebfe0290c6975c9edc4a',
    cache: cache
});

/* Load some artist info. */

/*lastfm.artist.getInfo({ artist: 'Justin Bieber' }, {
    success: function (data) {
        console.log(data)
    }, error: function (code, message) {
        console.log("jotain meni pieleen.")
    }
});*/

//Kun klikataan Search nappia, otetaan haku artist.search API komennolla, joka viedään artistTopAlbums komentoon
function searchArtist() {
    var search = document.getElementById("searchArtistField").value;
    lastfm.artist.search({ artist: search }, {
        success: function (data) {
            /* Use data. */
            console.log(data);
            //Json datasta artisti
            var artist = data["results"]["artistmatches"]["artist"];
            var list = document.getElementById("searchResults");
            /*Testi, joka tulostaa search tulokset listaan DIV:iin
            //txt , johon tulee meidän ol elementti ja artistien nimet
            var txt = '<ol id="listOrdered">';
            //Loop , syntyy ol lista täynnä artistien nimiä, jotaka upotetaan div
            for(var i = 0; i < artist.length; i++) {
                txt += '<li>'+artist[i]["name"]+'</li>';
            }
            txt += '</ol>';
            list.innerHTML = txt;
            */
            var name = artist[0]["name"];
            //Toinen funktio, joka saa artistin nimen parametriksi
            albumiTop(name, list);
            //vain jos error
        }, error: function (code, message) {
            console.log("jotain meni pieleen.")
        }
    });
}

//Jatkoa searchArtist() funktiolle, nyt otetaan artistin albumit!
function albumiTop(name, list) {
    lastfm.artist.getTopAlbums({ artist: name }, {
        success: function (data) {
            console.log(data);
            //Json datasta album
            var albumi = data["topalbums"]["album"];
            //txt tulee kaikki, joka upotetaan DIV searchResults HTML:n. Kyseessä kortteja albumi nimi + kuva + kappaleet
            var txt = '<div class="cards">';
            //albumi nimi, kuva, kappaleet kortteihin for LOOP
            for (var i = 0; i < albumi.length; i++) {
                txt += '<article class="card"><header><h4>' + albumi[i]["name"] + '</h4></header>';
                //Jos kuva ei saatavilla, korvaa se sen virhe kuvalla
                if (albumi[i]["image"][2]["#text"] != "") {
                    txt += '<img src="' + albumi[i]["image"][2]["#text"] + '">';
                } else {
                    txt += '<img src="' + 'https://img.icons8.com/ios/50/000000/image-not-avialable.png' + '">';
                }
                txt += '</article>';
            }
            txt += '</div>';
            //tulostus div searchResults
            list.innerHTML = txt;

            //vain jos error
        }, error: function (code, message) {
            console.log("jotain meni pieleen.")
        }
    });
}