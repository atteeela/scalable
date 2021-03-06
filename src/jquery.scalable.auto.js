/*!
 * jQuery Scalable
 * http://sbp.so/scalable
 * Copyright 2012, Sean B. Palmer. Apache License 2.0
 */

(function ($) {
	"use strict";

	$.widget("ui.scalable", {
		options: {
			arrow: false
		},

		_create: function () {
			var widget = this;

			widget.element.resizable({
				aspectRatio: true,
				autoHide: true,
				handles: "e",
				minHeight: 48,
				minWidth: 72,

				create: function (event, ui) {
					widget._original_width = widget.element.width();
					widget._original_height = widget.element.height();
				},

				stop: function (event, ui) {
					if (widget._hide_after_drag) {
						widget._bar.hide();
						widget._hide_after_drag = false;
					}
				}
			});

			widget._wrapper = widget.element.parent()
				.css("position", "relative");			
			widget._original_wwidth = widget._wrapper.width();
			widget._original_wheight = widget._wrapper.height();

			widget._handle = $(".ui-resizable-e", widget._wrapper)
				.wrap("<div></div>");
			widget._bar = widget._handle.parent();

			if (widget.options.arrow) {
				widget._arrow = widget.options.arrow;
			}

			widget._handle.css({
				background: "url(" + widget._arrow + ") no-repeat",
				position: "absolute",
				cursor: "e-resize",
				top: "0",
				right: "0"
			}).width(72)
				.height(48);

			function show_bar() {
				if (widget._wrapper.hasClass("ui-resizable-resizing")) {
					widget._hide_after_drag = false;
				} else { widget._bar.show(); }
			}

			function hide_bar() {
				if (widget._wrapper.hasClass("ui-resizable-resizing")) {
					widget._hide_after_drag = true;
				} else { widget._bar.hide(); }
			}

			widget._bar.addClass("ui-scalable-bar")
				.css({
					background: "rgba(204, 204, 204, .2)",
					position: "absolute",
					cursor: "pointer",
					top: "0",
					left: "0",
					width: "100%",
					height: "48px"
				}).click($.proxy(widget.reset, widget))
				.hover(show_bar, hide_bar)
				.hide();

			widget.element.hover(show_bar, hide_bar);

			widget._bar.children()
				.click(function () { return false; });
		},

		_arrow: ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0c" +
			"DovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MiIgaGVpZ2" +
			"h0PSI0OCI+PGxpbmVhckdyYWRpZW50IGlkPSJhIj48c3RvcCBzdG9" +
			"wLWNvbG9yPSIjY2NjIiBvZmZzZXQ9IjAiLz48c3RvcCBzdG9wLWNv" +
			"bG9yPSIjZWVlIiBvZmZzZXQ9IjEiLz48L2xpbmVhckdyYWRpZW50P" +
			"jxwYXRoIGQ9Im0xMS41LDIzLjUgMTYsMTAgMCwtOCAxNiwwIDAsOC" +
			"AxNiwtMTAgLTE2LC0xMCAwLDggLTE2LDAgMCwtOHoiIHN0eWxlPSJ" +
			"maWxsOnVybCgjYSk7c3Ryb2tlOiM1NTUiLz48L3N2Zz4="),

		reset: function () {
			var widget = this;

			widget._wrapper.width(widget._original_wwidth)
				.height(widget._original_wheight);
			widget.element.width(widget._original_width)
				.height(widget._original_height);
		},

		destroy: function () {
			$.Widget.prototype.destroy.call(this);
			this.element.resizable("destroy");
		}
	});

	// $.extend($.ui.scalable, {
	//   version: "0.0.1"
	// });
})(jQuery);
$(function () {
	// $(document).data("scalable", {auto: false});
	if ($(document).data("scalable")) {
		if ($(document).data("scalable").auto === false) {
			return;
		}
	}
	$(".scalable").scalable();
});
