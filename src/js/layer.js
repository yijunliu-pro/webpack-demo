let a = 0,
    b = 2;

console.log(b);
console.log(a);
const dataUrl = '/cgi-bin/article.php?site=sports&cnt=30&of=json&oe=GBK';
$.ajax({
    url: '/api',
    method: "get",
    dataType: "jsonp",
    jsonpCallback: "CallBack",
    success: function(res) {
        console.log(res);
        // var videos_list = res.results[0].fields.video_ids;
        // var vList = "";
        // for (var i = 0, l = videos_list.length; i < l; i++) {
        //     vList += '<li vid="' + videos_list[i].vid + '" title="' + videos_list[i].title + '"><a href="javascript:;">' + videos_list[i].title + '</a></li>';
        // }
        // $('#playlist ul').html(vList);
    }
});
$(".datalist").html('11111');