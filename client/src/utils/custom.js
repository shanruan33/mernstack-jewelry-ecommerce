/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Image
5. Init Quantity


******************************/
import $ from 'jquery';

$(document).on('click', function () {
	"use strict";


	initImage();


	function initImage() {
		var images = $('.product_image_thumbnail');
		var selected = $('.product_image_large img');

		images.each(function () {
			var image = $(this);
			image.on('click', function () {
				var imagePath = new String(image.data('image'));
				selected.attr('src', imagePath);
			});
		});
	}


});

$(document).ready(function () {

	"use strict";


	var header = $('.header');
	var menuActive = false;
	var menu = $('.menu');
	var burger = $('.burger_container');
	var map;

	setHeader();

	$(window).on('resize', function () {
		setHeader();
	});

	$(document).on('scroll', function () {
		setHeader();
	});

	initMenu();

	function setHeader() {
		if ($(window).scrollTop() > 100) {
			header.addClass('scrolled');
		}
		else {
			header.removeClass('scrolled');
		}
	}

	function initMenu() {
		if ($('.menu').length) {
			var menu = $('.menu');
			if ($('.burger_container').length) {
				burger.on('click', function () {
					if (menuActive) {
						closeMenu();
					}
					else {
						openMenu();

						$(document).one('click', function cls(e) {
							if ($(e.target).hasClass('menu_mm')) {
								$(document).one('click', cls);
							}
							else {
								closeMenu();
							}
						});
					}
				});
			}
		}
	}

	function openMenu() {
		menu.addClass('active');
		menuActive = true;
	}

	function closeMenu() {
		menu.removeClass('active');
		menuActive = false;
	}

});

/* 

5. Init Accordions

*/
$(window).bind("load", function () {
	// code here
	initAccordions();

	function initAccordions() {
		if ($('.accordion').length) {
			var accs = $('.accordion');

			accs.each(function () {
				var acc = $(this);

				if (acc.hasClass('active')) {
					var panel = $(acc.next());
					var panelH = panel.prop('scrollHeight') + "px";

					if (panel.css('max-height') == "0px") {
						panel.css('max-height', panel.prop('scrollHeight') + "px");
					}
					else {
						panel.css('max-height', "0px");
					}
				}

				acc.on('click', function () {
					if (acc.hasClass('active')) {
						acc.removeClass('active');
						var panel = $(acc.next());
						var panelH = panel.prop('scrollHeight') + "px";

						if (panel.css('max-height') == "0px") {
							panel.css('max-height', panel.prop('scrollHeight') + "px");
						}
						else {
							panel.css('max-height', "0px");
						}
					}
					else {
						acc.addClass('active');
						var panel = $(acc.next());
						var panelH = panel.prop('scrollHeight') + "px";

						if (panel.css('max-height') == "0px") {
							panel.css('max-height', panel.prop('scrollHeight') + "px");
						}
						else {
							panel.css('max-height', "0px");
						}
					}
				});
			});
		}
	}
});

