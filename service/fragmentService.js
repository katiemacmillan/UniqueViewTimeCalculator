
var fragmentHandler = {
    addTimeFragment : function(fragment, timeFragments){
        const newStart = fragment.startTime;
        const newEnd = fragment.endTime;
        fragment.time = newEnd - newStart;

        console.log(fragment);
        for (var f in timeFragments){
            const oldStart = timeFragments[f].startTime;
            const oldEnd = timeFragments[f].endTime;

            if (newEnd < oldStart){
                // time fragment comes before the existing fragment
                timeFragments.splice(f, 0, fragment);
                return timeFragments;

            } else if(newStart < oldStart){
                if (newEnd > oldEnd){
                    // time fragment extends existing fragment start and end time
                    timeFragments[f] = fragment;
                    return timeFragments;
                } else {
                    // time fragment extends existing fragment start time
                    timeFragments[f].startTime = newStart;
                    timeFragments[f].time = oldEnd - newStart;
                    return timeFragments;
                }

            } else if(newStart >= oldStart && newStart <= oldEnd){
                if (newEnd > oldEnd){
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
    consolidateTimeFragments : function(timeFragments){
        var i = 0;
        var fragments = [];
        const count = timeFragments.length;

        while (i < count){
            var frag1 = timeFragments[i];
            if( i < count - 1){
                var frag2 = timeFragments[i+1];
                if (frag1.endTime > frag2.startTime){
                    frag1.endTime = frag2.endTime;
                    frag1.time = frag1.endTime - frag2.startTime;
                    // we're going to skip the next fragment
                    i+=1;
                }    
            }
            fragments.push(frag1);
            i+=1;
        }
        return fragments;
    },

    getTotalViewTime : function (viewedFragments){
        var time = 0;
        for (var v in viewedFragments){
            time += viewedFragments[v].time;
        }
        return time;
    }

}

module.exports = fragmentHandler;