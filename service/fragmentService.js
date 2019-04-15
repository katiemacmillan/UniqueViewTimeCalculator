var fragmentHandler = {
    addTimeFragment: function (fragment, timeFragments) {
        const newStart = fragment.startTime;
        const newEnd = fragment.endTime;
        fragment.time = newEnd - newStart;

        for (var f in timeFragments) {
            const oldStart = timeFragments[f].startTime;
            const oldEnd = timeFragments[f].endTime;

            if (newEnd < oldStart) {
                // time fragment comes before the existing fragment
                timeFragments.splice(f, 0, fragment);
                return timeFragments;

            } else if (newStart < oldStart) {
                if (newEnd > oldEnd) {
                    // time fragment extends existing fragment start and end time
                    timeFragments[f] = fragment;
                    return timeFragments;
                } else {
                    // time fragment extends existing fragment start time
                    timeFragments[f].startTime = newStart;
                    timeFragments[f].time = oldEnd - newStart;
                    return timeFragments;
                }

            } else if (newStart >= oldStart && newStart <= oldEnd) {
                if (newEnd > oldEnd) {
                    // time fragment extends existing fragment end time
                    timeFragments[f].endTime = newEnd;
                    timeFragments[f].time = newEnd - oldStart;
                } else {
                    // time is completely within viewed fragment
                    return timeFragments;
                }
            }
        }
        // if we reach here, the fragment comes after all existing fragments
        timeFragments.push(fragment);
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

        do {
            var frag1 = timeFragments[current];
            var frag2 = timeFragments[next];

            var overlap = frag1.endTime > frag2.startTime
            while (overlap) {
                // extend frag2's start time
                frag2.startTime = frag1.startTime;
                frag2.time = frag2.endTime - frag2.startTime;

                next += 1;
                if (next < count && frag1.endTime > timeFragments[next + 1].startTime) {
                    frag1 = frag2;
                    frag2 = timeFragments[next];
                } else {
                    overlap = false;
                }
            }
            current = next;
            next += 1;
            fragments.push(frag2);

        } while (next < count);

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

module.exports = fragmentHandler;