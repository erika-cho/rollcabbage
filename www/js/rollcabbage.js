// 現在位置情報を取得
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(getRestaurantList, error);
}

// 周辺のお店一覧を取得
function getRestaurantList(pos) {
  console.log(pos.coords.latitude, pos.coords.longitude);
  var params = {
    keyid: '89fb80136ae38ae3f80c1af231f9a3c8',
    format: 'json',
    input_coordinates_mode: 2, // 世界測地系
    coordinates_mode: 2, // 世界測地系
    latitude: pos.coords.latitude,
    longitude: pos.coords.longitude,
    range: 3,
  };
  $.getJSON('http://api.gnavi.co.jp/ver1/RestSearchAPI/?callback=?', params, showRestaurants);
}

function showRestaurants(list) {
  $.each(list.rest, function(k, rest){

    var li = $('<li/>').addClass('rest').data({ id: rest.id })
                .html("<a href='./show.html?id=" + rest.id + "'>" + rest.name + "</a>");
    $('#restaurants').append(li);
  });
  $('#restaurants').listview('refresh');
}

function error(e) {
  console.log(e);
}
