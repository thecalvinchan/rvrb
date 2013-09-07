function trackContainer() {
    this._id = 0;
    this._tracks = {};
    this._numTracks = 0;
}

trackContainer.prototype = {
    addTrack: function() {
        var unique = this._numTracks++;
        var newTrack = new track(unique,this);
        this._tracks[unique] = newTrack;
    },
    removeTrack: function(trackId) {
        this.tracks[trackId] = null;
        delete this.tracks[trackId];
    },
    render: function() { 
        return '<ul class="trackFactory" id="tf'+this._id+'"></ul>'
    }
};

trackContainer.prototype = Object.create(trackContainer.prototype,{
    id : {
        get : function() {
            return this._id;
        }
    },
    tracks : {
        get : function() {
            return this._tracks;
        }
    },
    numTracks : {
        get : function() {
            return this._numTracks;
        },
        set : function(value) {
            this._numTracks = value;
        }
    }
});

function track(id,container) {
    this._id = id;
    this._container = container;
    this._clips = {};
    this._numClips = 0;
}    

track.prototype = {
    addClip: function() {
        var unique = this._numClips++;
        var clipData = {start:0,end:100,offset:300};
        var newClip = new clip(unique,this,clipData);
        this._clips[unique] = newClip;
    },
    render : function() {
        return '<li class="track" id="track'+this._id+'"></li>';
    }
};

track.prototype = Object.create(track.prototype, {
    id : {
        get : function() {
            return this._id;
        }
    },
    container : {
        get : function() {
            return this._container;
        }
    },
    clips : {
        get : function() {
            return this._clips;
        }
    },
    numClips : {
        get : function() {
            return this._numClips;
        },
        set : function(value) {
            this._numClips = value;
        }
    },
});

function clip(clipId,track,clipData) {
    this._id = clipId;
    this._track = track;
    this._clipData = clipData;
}

clip.prototype = {
    changeClipData: function(newClipData) {
        this._clipData = newClipData;
    },
    changeTrack: function(newTrack) {
        var copy = this;
        this._track.numClips--;
        this._track.clips[this._id] = null;
        delete this._track.clips[this._id];
        this._track = newTrack;
        this._track.clips[this._id] = this;
        this._track.numClips++;
    },
    render: function() {
        return '<div class="clip" id="clip'+this._id+'" style="width: '+(this._clipData.end-this._clipData.start)+'px; left: '+this._clipData.offset+'px;"></div>';
    }
};
         
clip.prototype = Object.create(clip.prototype, {
    id : {
        get : function() {
            return this._id;
        }
    },
    track : {
        get : function() {
            return this._track;
        }
    },
    clipData : {
        get : function() {
            return this._clipData;
        }
    }
});

document.onready = function() {
    window.trackFactory = new trackContainer();
    window.trackFactory.addTrack();
    window.trackFactory.tracks[0].addClip();
    console.log(window.trackFactory.tracks[0]);
    window.trackFactory.addTrack();
    window.trackFactory.tracks[0].clips[0].changeTrack(window.trackFactory.tracks[1]);
    console.log(window.trackFactory.tracks[0]);
    console.log(window.trackFactory.tracks[1]);
    render(document.getElementById("tracks"),window.trackFactory,addListeners); 
}

function render(dom,trackFactory,callback) {
    dom.innerHTML = trackFactory.render() + dom.innerHTML;
    var factoryDom = document.getElementById("tf"+trackFactory.id);
    for (track in trackFactory.tracks) {
        factoryDom.innerHTML += trackFactory.tracks[track].render();
        var trackDom = document.getElementById("track"+trackFactory.tracks[track].id);
        for (clip in trackFactory.tracks[track].clips) {
            trackDom.innerHTML += trackFactory.tracks[track].clips[clip].render();
        }
    }
    callback(trackFactory);
}

/** EVENT LISTENERS **/

function addListeners(trackFactory) {
    for (track in trackFactory.tracks) {
        for (clip in trackFactory.tracks[track].clips) {
            var obj = trackFactory.tracks[track].clips[clip];
            var dom = document.getElementById("clip"+obj.id);
            dom.addEventListener("mousedown",toggleDrag(obj));
            document.addEventListener("mousemove",moveDrag(obj));
            document.addEventListener("mouseup",toggleDrag(obj));
        }
    }
}

function toggleDrag(obj) {
    return function(event) {
        if (!obj.drag) {
            obj.drag = event.pageX;
            obj.original = document.getElementById("clip"+obj.id).getAttribute("style");
        }
        else {
            var delta = event.pageX - obj.drag;
            obj.clipData.offset += delta;
            document.getElementById("clip"+obj.id).setAttribute("style",obj.original);
            delete obj.drag;
            delete obj.original;
            console.log(obj.clipData);
            document.getElementById("clip"+obj.id).style.left = obj.clipData.offset + "px";
        }
    }
}

function moveDrag(obj) {
    return function(event) {
        if (obj.drag) {
            var delta = event.pageX - obj.drag;
            document.getElementById("clip"+obj.id).setAttribute("style",obj.original+" margin-left: "+delta+"px;");
        }
    }
}
