
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}


$.fn.bannerSlides = function (options) {
	if (this.length > 1) {
		this.each(function () { $(this).bannerSlides(options) });
		return this;
	}

	var that = this;
	this.coverList = [],
	this.slideContainer = $(this),
	this.slides = 0,
	this.slidesLen = 0,
	this.transitionTime = 1300,
	this.delay = 7000,
	this.index = 1,
  this.resolution = 800,

	this.initialize = function () {
		// Get the cover images to show from data attribute
		if(that.slideContainer.attr('data')){
			that.coverList = that.slideContainer.attr('data').split(',');
		}

    if (screen.width >= 3200) that.resolution = 3200;
    else if (screen.width >= 2400) that.resolution = 2400;
    else if (screen.width >= 1600) that.resolution = 1600;
    else if (screen.with >= 1200) that.resolution = 1200;
		// If the data attribute was not defined, we scan the page for image class "_" and add them to coverList
		if(that.coverList.length == 0){
			$('img._').map(function(){that.coverList.push($(this).attr('src').replace(/\/s[0-9]+\//, "/s" + that.resolution + "/"));});
		}

		that.slidesLen = that.coverList.length;
		for(i=0; i< that.slidesLen; i++){
			$('#coverList').append("<li id='b"+i+"'></li>");
		}

		this.index = Math.floor((Math.random() * that.slidesLen));
		that.slides = that.slideContainer.find('li');
		that.coverList = shuffle(that.coverList);

		/*
		setTimeout(function(){
			$("#overlay" ).animate({ "right": "4vh", "width":"33%", "left": "initial" }, {duration: that.transitionTime} );
			$("#overlay h1").animate({"font-size":"-=2vw", "line-height":"-=2vw", "text-align":"right"}, "slow");
			$("#overlay .excerpt").animate({"font-size":"-=3px", "text-align":"right"}, "slow");
			$("#overlay .byline").animate({"margin-top":"-=3vh", "text-align":"right"}, "slow");
		}, that.delay - 2000);
		*/

		that.doTransition(this.index);
	};

	this.doTransition = function(index) {
		var preIndex = index - 1;
		if(index == that.slidesLen) index = 0;
		var attr = $('#b'+index).attr('style');
		if (typeof attr === typeof undefined) {
			$('#b'+index).css('background-image', 'url('+that.coverList[index]+')');
		}
		$(that.slides[preIndex]).fadeOut(that.transitionTime);
		$(that.slides[index]).fadeIn(that.transitionTime);
		index++;

		if(that.slidesLen == 1) return;

		setTimeout(function() { that.doTransition(index); }, that.delay);
	}

	return this.initialize();
}


function replaceVideo(id){
	$('#' + id).hide();
	$('#' + id).after("<div class='video'><iframe allowfullscreen='allowfullscreen' frameborder='0' src='https://www.youtube.com/embed/"+id+"?modestbranding=1&rel=0'/></div>");
}

function loadVideo(el, youtube_id){
	$('#' + el).empty();
	$('#' + el).show();
	$('#' + el).append("<iframe allowfullscreen='allowfullscreen' class='video' frameborder='0' src='https://www.youtube.com/embed/"+youtube_id+"?modestbranding=1&rel=0'/>");
}

$(document).ready(function(){
	if($('#coverList').length){
		$('#coverList').bannerSlides();
	}

  var resolution = 800;
  if (screen.width >= 3200) resolution = 3200;
  else if (screen.width >= 2400) resolution = 2400;
  else if (screen.width >= 1600) resolution = 1600;
  else if (screen.width >= 1200) resolution = 1200;

	$('.photoset img').each(function(i){
		var highres = $(this).attr('src').replace(/\/s([\d]*)\//,"/s" + resolution + "/");
		$(this).attr('data-highres', highres);
    if ($(this).attr('src').includes('/s1600')) {
      var reres = $(this).attr('src').replace(/\/s([\d]*)\//,"/s" + resolution + "/");
      $(this).attr('src', reres);
    }
	});

	$('.photoset').photosetGrid({
		highresLinks: true,
		rel: 'gallery',
		gutter: '10px',

		onComplete: function(){
			$('.photoset a').colorbox({
				photo: true,
				scalePhotos: true,
				maxHeight: '100%',
				maxWidth: '100%',
        slideshow: true,
        slideshowAuto: false,
        slideshowSpeed: 5000,
        speed: 500,
        transition: 'fade'
			});
		}
	});

	$('.markdown').each(function(i){
		var url = $(this).attr('data');
		var el = $(this);
		$.ajax({url: url}).done(function(data){
			var arr = data.split("\n");
			var listContent = "";
			for(a in arr){
				ll = arr[a];
				if(ll.length>1  && ll.indexOf("- ") == 0){
					if(listContent == "") listContent = "<ul>"
						listContent += "<li>" + ll.substr(2,ll.length) + "</li>";
					continue;
				}
				else if(listContent != ""){
					listContent += "</ul>";
					el.append(listContent);
					listContent = "";
				}

				el.append(ll + "<br />");
			}
		});
	});

	$('.video').each(function(i){
		data = $(this).attr('data');
		$(this).append('<iframe src="https://www.youtube.com/embed/' + data + '?color=white&showinfo=0&rel=0" frameborder="0" allowfullscreen/>');

	});

	$('.videoset').each(function(i){
		data = $(this).attr('data');
		list = data.split(',');
		if(list.length > 0){
			layer = list[0];
			$(this).attr('data-layout', list.length);
			for(l in list){
				//$(this).append('<img src="https://img.youtube.com/vi/' + list[l] + '/0.jpg" onclick="loadVideo(\'' + layer + '\', \'' + list[l] + '\')" />');
				$(this).append('<img src="http://i.ytimg.com/vi/' + list[l] + '/sddefault.jpg" onclick="loadVideo(\'' + layer + '\', \'' + list[l] + '\')" />');
			}
			$(this).after('<div class="video" id="'+ layer +'" style="display:none"></div>');
		}
	});
	$('.videoset').photosetGrid({
		gutter: '10px'
	});

	jQuery("#colorbox").swipe( {
		//Generic swipe handler for all directions
		swipeRight:function(event, direction, distance, duration, fingerCount) {
			jQuery.colorbox.prev();
		},
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
			jQuery.colorbox.next();
		},
		//Default is 75px, set to 0 for demo so any distance triggers swipe
		threshold:0
	});

	$(document).ready(function(){
		var toc = $('#toc');
		if(toc){
			toc.html("&#8258; ");
			$('.group').each(function(i){
				var title = $(this).find('h2').clone().children().remove().end().text();

				var subtitle = '';
				$(this).find('h3').each(function(x){
					var subAnchor = $(this).text().replace(/[\s|\(|\)|,]+/g, '-');
					$(this).attr('id', subAnchor);
					subtitle += '<li><a href="#'+subAnchor+'">' + $(this).text() + "</a></li>";
				});
				$(this).find('h2').after('<div class="subline"><ul>' + subtitle + '</ul></div>');

				var anchor = title.replace(/\s+/g, '-');

				$(this).find('h2').attr('id', anchor);
				var link = '<a href="#' + anchor + '">' + title + '</a>';

				if(i != 0) link = " &middot; " + link;
				else i = 1;
				toc.append(link);
			});
		}
	});
});

var sc_project=10403974;
var sc_invisible=1;
var sc_security="54511e28";
var scJsHost = (("https:" == document.location.protocol) ? "https://secure." : "http://www.");
document.write("<script type='text/javascript' src='" + scJsHost+ "statcounter.com/counter/counter_xhtml.js'></script>");
