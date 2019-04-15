var fragmentService = require('./fragmentService.js');

var timeService = {

    calculateUVT: function (timeFragments) {
        var timeStamps = timeFragments.split(",");

        if (timeStamps.length % 2 !== 0) {
            return {
                data: null,
                error: "An invalid number of timestamps were entered. There should be two timestamps for each viewed fragment."
            }
        }
        var result = this.parseTimeStamps(timeStamps);
        if (result.error) {
            return {
                fragments: null,
                totalTime: null,
                error: result.error
            };
        }

        // get just unique viewed fragments
        var uniqueViewedFragments = [];
        for (var v in result.viewedFragments) {
            uniqueViewedFragments = fragmentService.addTimeFragment(result.viewedFragments[v], uniqueViewedFragments);
        }

        // consolidate unique fragments with overlapping end/start times
        uniqueViewedFragments = fragmentService.consolidateTimeFragments(uniqueViewedFragments);
        var uniqueViewTime = fragmentService.getTotalViewTime(uniqueViewedFragments)

        return {
            fragments: uniqueViewedFragments,
            totalTime: uniqueViewTime,
            error: null
        };
    },

    parseTimeStamps: function (timeStamps) {
        var fragments = [];
        var i = 0;
        while (i < timeStamps.length) {
            // verify that entries are numbers
            if (isNaN(timeStamps[i]) || isNaN(timeStamps[i + 1])) {
                return {
                    viewedFragments: fragments,
                    error: "Only numeric characters may be entered for fragment time stamps."
                };
            }

            // convert string values to base 10 integers
            const startTime = parseInt(timeStamps[i], 10);
            const endTime = parseInt(timeStamps[i + 1], 10);

            // verify time stamp ordering
            if (startTime > endTime) {
                return {
                    viewedFragments: fragments,
                    error: "Time stamps must occur in a sequence of start time followed by end time. A fragment's start time may not be larger than its end time."
                };
            }

            // store time stamp fragment
            fragments.push({
                startTime: startTime,
                endTime: endTime,
                time: endTime - startTime
            });
            i += 2;
        }

        return {
            viewedFragments: fragments,
            error: null
        };

    }

}
module.exports = timeService;