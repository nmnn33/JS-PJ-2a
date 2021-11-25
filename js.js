/*window.onload = function () {
    //document.getElementById("Fetch").addEventListener('click', 'api');
    function api();
}*/
window.onload = function api() {
    // Create AJAX object and other variables
    var xmlhttp = new XMLHttpRequest();
    var i;
    // Specify the data / url to be fetched
    xmlhttp.open("GET", "http://www.last.fm/api/auth/?api_key=84b00f245537c71aacfbc7df5244ef43", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var xmlDoc = xmlhttp.responseXML;
            //testiä varten
            console.log(xmlDoc);
        }
    }
}