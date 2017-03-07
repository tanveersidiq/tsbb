//Directive for making elements draggable.
angular.module('drag', []).
directive('draggable', function ($document) {

  return function (scope, element, attr) {

    var startX = 0,
      startY = 0,
      x, y;

    //If statement checking what kind of object is clicked
    if (scope.hasOwnProperty('sticky')) {
      x = scope.sticky.Left;
      y = scope.sticky.Top;
    }

    element.css({
      top: y + 'px',
      left: x + 'px'
    });

    var parentElementTop = element.parent().position().top + element.parent().width() - 60;
    var parentElementLeft = element.parent().position().left + element.parent().height() + 50;

    element.on('mousedown', function (event) {
      // Prevent default dragging of selected content
      event.preventDefault();
      startX = event.screenX - x;
      startY = event.screenY - y;

      element.css({
        'z-index': 2,
        '-webkit-box-shadow': 1 + 'px ' + 2 + 'px ' + 1 + 'px ' + 2 + 'px ' + '#666',
        'box-shadow': 1 + 'px ' + 2 + 'px ' + 1 + 'px ' + 2 + 'px ' + '#666',
        '-moz-box-shadow': 1 + 'px ' + 2 + 'px ' + 1 + 'px ' + 2 + 'px ' + '#666'
      });

      $document.on('mousemove', mousemove);
      $document.on('mouseup', mouseup);
    });

    function mousemove(event) {
      y = event.screenY - startY;
      x = event.screenX - startX;

      if (x <= 292) {
        x = 292;
      }
      if (x >= parentElementTop) {
        x = parentElementTop;
      }
      if (y <= 120) {
        y = 120;
      }
      if (y >= parentElementLeft) {
        y = parentElementLeft;
      }

      element.css({
        top: y + 'px',
        left: x + 'px',
      });
    }

    function mouseup() {
      $document.off('mousemove', mousemove);
      $document.off('mouseup', mouseup);

      element.css({
        'z-index': 1,
        '-webkit-box-shadow': 'none',
        'box-shadow': 'none',
        '-moz-box-shadow': 'none'
      });

      if (scope.hasOwnProperty('sticky')) {

        if (scope.sticky.Left !== x || scope.sticky.Top !== y) {
          scope.sticky.Left = x;
          scope.sticky.Top = y;
          scope.updateStickyNotePosition(scope.sticky);
        }

      }

    }
  };
});