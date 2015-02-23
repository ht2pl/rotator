/* 
 *    jQuery Rotator v0.2.BETA - 2014-09-16
 * 
 *    Copyright (c) 2014 Lukasz Lelek
 *    http://ht2.pl/scripts/rotator/
 *    
 *    Licensed MIT 
 */

if (typeof Object.create !== "function") {
    Object.create = function (obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}
(function ($, window, document) {

    var Rotate = {

        init : function (el,options) {

             var base = this;
             base.rotatelist = el;
             base.options = $.extend({}, $.fn.rotator.options, options);

             base.item = new  Array;

             for (var i = 0, length = base.rotatelist.length; i < length; i++)
             {
                
               base.item[i] = new Array;
               base.item[i].rotateId =  $(base.rotatelist[i]).attr('id');
               base.item[i].terms    =  $("#"+base.item[i].rotateId+" ul li");
               base.item[i].animate  =  base.valid_anim($("#"+base.item[i].rotateId).attr('data-rotate-animate').split(','));
               base.item[i].arena    =  $("#"+base.item[i].rotateId+" .rotate-arena");
               base.item[i].interval =  base.valid_interval($("#"+base.item[i].rotateId).attr('data-rotate-interval'));

               $("#"+base.item[i].rotateId+" ul").hide();
               
               base.rotatePlay(i);

             }


        },
        rotatePlay : function (i) {

            var base = this;

            setTimeout(function() {

                  var item = base.item[i];

                  var ct = item.arena.data("term") || 0;

                  item.arena.data("term", ct === item.terms.length - 1 ? 0 : ct + 1).html(item.terms.eq([ct]).html());


                    base.anim(item.arena,item.animate[0]);

                    setTimeout(function() {

                        base.anim(item.arena,item.animate[1]);

                         base.rotatePlay(i);

                    },  item.interval);

            }, 1000);

        },
        valid_anim: function(x) {

            var base = this;
            if (x) {
                return x;
            } else {
                return $("#"+base.options.interval).attr('data-rotate-animate').split(',');
            }

        },
        valid_interval: function(x) {

            var base = this;
            if ( isNaN(x) ) {
                return base.options.interval;

            } else {
                return x;
            }

        },
        anim: function(arena,x) {
                var base = this;              
                arena.removeClass().addClass('rotate-arena ' + x + ' '+base.options.animateClass).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
        }

    };

    $.fn.rotator = function (options) {
            var rotator = Object.create(Rotate);
            rotator.init(this,options);
            $.data(this, "rotator", Rotate);
    };

    $.fn.rotator.options = {
        animateClass : "animated",
        interval     : "5000",
        animate      : "fadeInUp,fadeOutDown"
    };

} (jQuery, window, document));
