/**
 * Created by jiljiang on 2016/10/27.
 */

(function () {
	var auto = true;

	$(window).click(function () {
		auto = false;
	});

	function delay(func, timeout, comment) {
		return {
			next: function (func, timeout, comment) {
				this._next = delay(func, timeout, comment);
				return this._next;
			},
			start: function () {
				var my = this;

				setTimeout(function () {
					if(comment) console.log('[Mock] Comment:', comment);

					if(func() === false) {
						console.log('[Mock] Abort!!!');
					}

					if(my._next) {
						my._next.start();
					} else {
						console.log('[Mock] End!');
					}
				}, timeout);
			}
		};
	}

	function click($element) {
		$element = $element[0];
		if(!$element) return false;

		var event = document.createEvent("HTMLEvents");
		event.initEvent("click", true, true);
		$element.dispatchEvent(event);
	}
	window.mockClick = click;

	function $class(className, $element) {
		if($element) {
			return $($element).find('[class^="' + className + '"]');
		} else {
			return $('[class^="' + className + '"]');
		}
	}

	var d = delay(function () {
		if(!auto) {
			console.log('[Mock] Skip mock operation.');
			return false;
		}

		var $home = $class("index__title", "header");
		return click($home);
	}, 1000, "Go home");

	d
		.next(function () {
			var $project = $class("index__historyList").find(" > li:first > button:last");
			return click($project);
		}, 100, "Select project")
		.next(function () {
			return click($("header ul > li:first a"));
		}, 1000, "Switch ability tab")
	;

	d.start();
})();
