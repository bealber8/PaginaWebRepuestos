window.onload = initialize;

function initialize(){
  document.getElementById("rss").addEventListener("click", showRSS);
}

function showRSS(){
  createRSS();
  // location.href = "rss.xml";
}

function createRSS(){
  var myRSS = '<?xml version="1.0" encoding="UTF-8"?>';
  myRSS += '<rss version="2.0">';
  myRSS += '<channel>';
  myRSS += '<title>Auto Recambios Bealber</title>';
  myRSS += '<link>http://www.autorecambiosbealber.com</link>';
  myRSS += '<description>Noticias de nuevos productos en el inventario</description>';

  var myNews = firebase.database().ref().child("misNoticias");
  myNews.once("value", function(snapshot){
    var data = snapshot.val();
    for (var key in data) {
      myRSS += '<item>';
      myRSS += '<title>' + data[key].titulo + '</title>';
      myRSS += '<description>' + data[key].descripcion + '</description>';
      myRSS += '<link>' + data[key].url + '</link>';
      myRSS += '</item>';
    }

    myRSS += '</channel>';
    myRSS += '</rss>';

    console.log(myRSS);

    window.open('data:text/xml,'+encodeURIComponent(myRSS),
     "Test", "width=300,height=300,scrollbars=1,resizable=1");

  });

}
