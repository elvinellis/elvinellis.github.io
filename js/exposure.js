
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

		this.initialize = function () {
			if(that.slideContainer.attr('data')){
				that.coverList = that.slideContainer.attr('data').split(',');
			}
			if(that.coverList.length == 0){
				$('img._').map(function(){that.coverList.push($(this).attr('src').replace(/\/s[0-9]+\//, "/s1600/"));});
			}
			that.slidesLen = that.coverList.length;
			for(i=0; i< that.slidesLen; i++){
				$('#coverList').append("<li id='b"+i+"'></li>");
			}

			this.index = Math.floor((Math.random() * that.slidesLen));
			that.slides = that.slideContainer.find('li');
			that.coverList = shuffle(that.coverList);

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

	$('.photoset img').each(function(i){
		//var highres = $(this).attr('src').substr(0,101) + 's1600/';
		var highres = $(this).attr('src').replace(/\/s([\d]*)\//,"/s1600/");
			$(this).attr('data-highres', highres);
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
				maxWidth: '100%'
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
