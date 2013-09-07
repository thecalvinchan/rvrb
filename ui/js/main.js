<<<<<<< HEAD
window.tracksRef;
=======
>>>>>>> 7ea326e8a0b2d7039683033d6567faa7e03655d7
function trackCtrl($scope) {
    $scope.tracks = [{name:"Track One doe"},{name:"Track Two doe"}];
    $scope.addTrack = function() {
        var newTrack = new track($scope.newTrackName,[],0);
        $scope.tracks.push(newTrack);
        $scope.lastAddedTrack = newTrack;
        $("#addClipModal").modal("show");
        delete $scope.newTrackName;
    };
    $scope.addClip = function() {
        $scope.lastAddedTrack.addClip($scope.newClipName); 
<<<<<<< HEAD
    };
    $scope.$watch("tracks", function(value) {
        console.log(value);
    },true);
    window.tracksRef = $scope.tracks;
}    

function dragClipEnd(trackName,clipId) {
    return function(event) {
        console.log(event.layerX);
        clip.offset = event.layerX;
        console.log(clip);
    };
}

=======
    }
}    

// Event Listener Functions

function dragClip(clipId) {
    return function() {
        console.log("Dragging clip "+clipId);
        event.dataTransfer.effectAllowed = 'move';
        console.log(event.layerX);
    };
}

function dragClipEnd(clipId) {
    return function() {
        console.log(event.layerX);
    };
}  

>>>>>>> 7ea326e8a0b2d7039683033d6567faa7e03655d7
// Classes

// string name
// array clips
function track(name,clips,numClips) {
    this._name = name;
    this._clips = clips;
    this._numClips = numClips;
}

track.prototype = {
    addClip : function(clipName) {
        var clipId = "uniqueid"+(this._numClips++);
        var newClip = new clip(clipId,this._name,0,200,0);
        this._clips.push(newClip);
    }
}

track.prototype = Object.create(track.prototype,{
    name: {
        get: function() {
            console.log("called track getName function");
            return this._name;
        },
        set: function(value) {
            this._name = value;
        }
    },
    clips: {
        get: function() {
            console.log("called track getClips function");
            return this._clips;
        },
        set: function(value) {
            this._clips = value;
        }
    }
});

function clip(clipId,trackId,start,end,offset) {
    this._clipId = clipId;
    this._trackId = trackId;
    this._start = start;
    this._end = end;
    this._offset = offset;
}

<<<<<<< HEAD
=======
clip.prototype = {
    dragEnd: function(event) {
        console.log(event.layerX);
    }
}

>>>>>>> 7ea326e8a0b2d7039683033d6567faa7e03655d7
clip.prototype = Object.create(clip.prototype, {
    clipId: {
        get: function() {
            return this._clipId;
        }
    },
    trackId: {
        get: function() {
            return this._trackId;
        },
        set: function(value) {
            this._trackId = value;
        }
    },
    start: {
        get: function() {
            console.log("called clip getStart function");
            return this._start;
        },
        set: function(value) {
            this._start = value;
        }
    },
    end: {
        get: function() {
            console.log("called clip getEnd function");
            return this._end;
        },
        set: function(value) {
            this._end = value;
        }
    },
    duration: { //static
        value: function() {
            return this._end - this._start;
        }
    },
    offset: {
        get: function() {
            return this._offset;
        },
        set: function(value) {
            this._offset = value;
        }
    }
}); 
