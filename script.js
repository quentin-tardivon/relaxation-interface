
window.onload = () => {
  var myElement = document.getElementById('circle');

  // create a simple instance
  // by default, it only adds horizontal recognizers
  var mc = new Hammer(myElement);
  mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

  // listen to events...
  mc.on("panright", function(ev) {
    myElement.style.transform = 'translate(' + ev.deltaX + 'px,' + ev.deltaY + 'px)'    
  });
  
}
