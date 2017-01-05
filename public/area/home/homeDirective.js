/**
* homeDirective Module
*
* Description
*/
angular.module('home.directive', [])
	.directive('homeDirective', [function(){
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			// scope: {}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			 restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			 templateUrl: 'area/home/view2.html',
			 //replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				
    // Create variables (in this scope) to hold the API and image size
			    var jcrop_api,
			        boundx,
			        boundy,

			        // Grab some information about the preview pane
			        $preview = $('#preview-pane'),
			        $pcnt = $('#preview-pane .preview-container'),
			        $pimg = $('#preview-pane .preview-container img'),

			        xsize = $pcnt.width(),
			        ysize = $pcnt.height();
			    
			  //  console.log($('.modal').width());
			    $('#target').Jcrop({
			      onChange: updatePreview,
			      onSelect: updatePreview,
			      boxWidth:568,
			      aspectRatio: xsize / ysize
			    },function(){
			      // Use the API to get the real image size
			     
			     var bounds = this.getBounds();
			      boundx = bounds[0];
			     boundy = bounds[1];
			      // Store the API in the jcrop_api variable
			      jcrop_api = this;

			      // Move the preview into the jcrop container for css positioning
			      $preview.appendTo(jcrop_api.ui.holder);
			    });

			    function updatePreview(c)
			    {
			      if (parseInt(c.w) > 0)
			      {
			        var rx = xsize / c.w;
			        var ry = ysize / c.h;

			        $pimg.css({
			          width: Math.round(rx * boundx) + 'px',
			          height: Math.round(ry * boundy) + 'px',
			          marginLeft: '-' + Math.round(rx * c.x) + 'px',
			          marginTop: '-' + Math.round(ry * c.y) + 'px'
			        });
			      }
			    };
			    
			}
		};
	}]);