// $("#firstBusBox").click(function(){
//   $("#firstBusInfo").show();
// });

// function firstBus() {
//   var firstBus = document.getElementById('firstBusCard');
//   var ceremony = document.getElementById('ceremonyCard');
//   var reception = document.getElementById('receptionCard');
//   var lastBus = document.getElementById('lastBusCard');
//
//     if (firstBus.style.display === 'none') {
//         firstBus.style.display = 'block';
//         ceremony.style.display = 'none';
//         reception.style.display = 'none';
//         lastBus.style.display = 'none';
//
//     } else {
//         firstBus.style.display = 'none';
//         ceremony.style.display = 'block';
//         reception.style.display = 'none';
//         lastBus.style.display = 'none';
//     }
// }

var event_list = ["firstBusCard", "ceremonyCard", "receptionCard", "lastBusCard"];
var id_list = ["firstBusBtn", "ceremonyBtn", "receptionBtn", "lastBusBtn"];

function onShowEventInfo(index, id){
  for(var i=0;i<event_list.length;i++)
    try {
      document.getElementById(event_list[i]).style.display = "none";
      document.getElementById(id_list[i]).classList.remove("selectedButton");
    }
    catch(e) {
      console.error(e);
      throw new Error("No element found with id "+event_list[i]+" in event_list.")
    }
  try {
    document.getElementById(event_list[index]).style.display = "block";
    document.getElementById(id_list[id]).classList.add("selectedButton");
  }
  catch(e) {
    console.error(e);
    throw new Error("No element found with id "+event_list[index]+" in event_list.")
  }
}

setTimeout(function(){
  onShowEventInfo(1, 1);
},50);
