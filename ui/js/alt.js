function trackContainer() {
    this._id = 0;
    this._tracks = {};
    this._numTracks = 0;
}

trackContainer.prototype = {
    addTrack: function() {
        console.log(this);
        console.log(track);
        var unique = this._numTracks++;
        this._tracks[unique] = new track(unique,this);
        return this._tracks[unique];
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
        return '<li class="track" id="track'+this._id+'"><div class="trackInfo"><p><strong>Track '+(this._id+1)+'</strong></p><p><span class="glyphicon glyphicon-chevron-down"></span><span class="glyphicon glyphicon-volume-off"></span></p></div></li>';
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
    window.rvrb = new rvrbInit();
    rvrb.trackFactory = new trackContainer();
    rvrb.trackFactory.addTrack();
    rvrb.trackFactory.addTrack();
    rvrb.trackFactory.tracks[0].addClip();
    rvrb.trackFactory.tracks[0].addClip();
    console.log(rvrb.trackFactory.tracks[0]);
    rvrb.trackFactory.addTrack();
    rvrb.trackFactory.tracks[0].clips[0].changeTrack(rvrb.trackFactory.tracks[1]);
    console.log(rvrb.trackFactory.tracks[0]);
    console.log(rvrb.trackFactory.tracks[1]);
    rvrb.render(document.getElementById("tracks"),rvrb.trackFactory,addDragListeners); 
    document.getElementById("addNewTrack").addEventListener("click",function(){
        var track = rvrb.trackFactory.addTrack();
        console.log("hello");
        document.getElementById("tf"+rvrb.trackFactory.id).innerHTML += track.render();
        addDragListeners(rvrb);
    });
};

function rvrbInit() {
    this.render = function(dom,trackFactory,callback) {
        dom.innerHTML = trackFactory.render() + dom.innerHTML;
        var factoryDom = document.getElementById("tf"+trackFactory.id);
        for (var track in trackFactory.tracks) {
            factoryDom.innerHTML += trackFactory.tracks[track].render();
            var trackDom = document.getElementById("track"+trackFactory.tracks[track].id);
            for (var clip in trackFactory.tracks[track].clips) {
                trackDom.innerHTML += trackFactory.tracks[track].clips[clip].render();
            }
        }
        callback(this);
    };
    this._editTool = "select";
}

rvrbInit.prototype = {
    changeTool: function(newTool) {
        this._editTool = newTool;
    }
}

rvrbInit.prototype = Object.create(rvrbInit.prototype,{
    editTool : {
        get : function() {
            return this._editTool;
        }
    }
});

/** EVENT LISTENERS **/

function addDragListeners(app) {
    for (var track in app.trackFactory.tracks) {
        for (var clip in app.trackFactory.tracks[track].clips) {
            var obj = app.trackFactory.tracks[track].clips[clip];
            var dom = document.getElementById("clip"+obj.id);
            dom.addEventListener("mousedown",initDrag(app,obj));
            document.addEventListener("mousemove",moveDrag(obj));
            document.addEventListener("mouseup",endDrag(obj));
            //dom.addEventListener("click",initClick(obj,app));
        }
    }
}

function initDrag(app,obj) {
    return function(event) {
        if (!obj.drag) {
            obj.drag = event.pageX;
            obj.original = document.getElementById("clip"+obj.id).getAttribute("style");
        }
        if (app.editTool == "select") {
            if (app.selected && app.selected != obj) {
                app.selected = obj;
                $(".clip-selected").removeClass('clip-selected');
                $("#clip"+obj.id).addClass('clip-selected');
            }
            else if (!app.selected) {
                app.selected = obj;
                var id = "#clip"+obj.id;
                $("#clip"+obj.id).addClass('clip-selected');
            }
        }
    }
}

function endDrag(obj) {
    return function(event) {
        if (obj.drag) {
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
