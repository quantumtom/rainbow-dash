define(function(){return{render:function(){require(["hbar!parts/dialogs","data/dialogs"],function(dialogsPart,dialogsData){document.getElementById("page-body").innerHTML=dialogsPart(dialogsData),$('[data-toggle="tooltip"]').tooltip(),$('[data-toggle="popover"]').popover()})}}});