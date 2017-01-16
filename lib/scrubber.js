var sanitizer = require('sanitizer');
var dash = require('lodash');
var config = require('../base-config.js')

function uriPolicy(value) {
	return value;
}

function scrub(toScrub) {
	if (dash.isEmpty(toScrub) || (!isNaN(toScrub))) return toScrub;

	if (typeof toScrub != "undefined" && toScrub !== null) {

		var expandedText = toScrub.replace(new RegExp("^([A-Z]+-[0-9]+)", 'ig'), "<a href=' + config.jiraUrl + '/browse/$1>$1</a><br>");
		expandedText = expandedText.replace('\n', "<br>");

		//clip the string if it is too long
		if (expandedText.length > 65535) {
			expandedText = expandedText.substr(0, 65535);
		}

		return sanitizer.sanitize(expandedText, uriPolicy);
	}
	else {
		return '';
	}
}

exports.sanitize = sanitizer.sanitize;
exports.scrub = scrub;
