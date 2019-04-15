/* A service to deal with fragment pieces */
var fragmentService = {
    /* Add a time fragment to the given list of fragments */
    addTimeFragment: function (newFragment, timeFragments) {
        const newStart = newFragment.startTime;
        const newEnd = newFragment.endTime;

        for (var f in timeFragments) {
            var oldFragment = timeFragments[f];
            const oldStart = oldFragment.startTime;
            const oldEnd = oldFragment.endTime;

            if (newEnd < oldStart) {
                // time fragment comes before the existing fragment
                timeFragments.splice(f, 0, newFragment);
                return timeFragments;

            } else if (newStart < oldStart) {
                if (newEnd > oldEnd) {
                    // time fragment extends existing fragment start and end time
                    timeFragments[f] = newFragment;
                    return timeFragments;
                } else {
                    // time fragment extends existing fragment start time
                    oldFragment.startTime = newStart;
                    oldFragment.time = oldFragment.endTime - oldFragment.startTime;
                    timeFragments[f] = oldFragment;
                    return timeFragments;
                }

            } else if (newStart >= oldStart && newStart <= oldEnd) {
                if (newEnd > oldEnd) {
                    // time fragment extends existing fragment end time
                    oldFragment.endTime = newEnd;
                    oldFragment.time = oldFragment.endTime - oldFragment.startTime;
                    timeFragments[f] = oldFragment;
                } else {
                    // time is completely within viewed fragment
                    return timeFragments;
                }
            }
        }
        // if we reach here, the fragment comes after all existing fragments
        timeFragments.push(newFragment);
        return timeFragments;
    },

    /*
     * Consolidate any overlapping time fragments within the set
     */
    consolidateTimeFragments: function (timeFragments) {
        var current = 0;
        var next = 1;
        var fragments = [];
        const count = timeFragments.length;

        // loop through fragments looking for start/end time overlaps
        do {
            if (next < count) {
                var compareFragment = timeFragments[current];
                var storeFragment = timeFragments[next];

                var overlap = compareFragment.endTime > storeFragment.startTime;

                // continue to build up fragment until no more overlaps are found, always increasing start time of latest fragment
                while (overlap) {
                    storeFragment.startTime = compareFragment.startTime;
                    storeFragment.time = storeFragment.endTime - storeFragment.startTime;

                    next += 1;
                    if (next < count && compareFragment.endTime > timeFragments[next].startTime) {
                        compareFragment = storeFragment;
                        storeFragment = timeFragments[next];
                    } else {
                        overlap = false;
                    }
                }

                fragments.push(storeFragment);
                current = next;
                next += 1;

            } else {
                // make sure the last fragment gets added if it's not accounted for
                fragments.push(timeFragments[current]);
                current += 1;
            }

        } while (current < count);

        return fragments;
    },

    getTotalViewTime: function (viewedFragments) {
        var time = 0;
        for (var v in viewedFragments) {
            time += viewedFragments[v].time;
        }
        return time;
    }

}

module.exports = fragmentService;