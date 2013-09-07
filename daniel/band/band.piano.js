BandJS.loadPack('instrument', 'piano', function(name, audioContext) {
    var types = {
        grand: 0
    };

    if (typeof types[name] === 'undefined') {
        throw new Error(name + ' is not a valid Piano type');
    }

    return {
        createSound: function(destination, frequency) {

        var pianoSound = audioContext.createBufferSource();

        var note;
        var tuningTable = {
            27.50: 'a0',
            29.14: 'bb0',
            30.87: 'b0',
            32.70: 'c1',
            34.65: 'db1',
            36.71: 'd1',
            38.89: 'eb1',
            41.20: 'e1',
            43.65: 'f1',
            46.25: 'gb1',
            49.00: 'g1',
            51.91: 'ab1',
            55.00: 'a1',
            58.27: 'bb1',
            61.74: 'b1',
            65.41: 'c2',
            69.30: 'db2',
            73.42: 'd2',
            77.78: 'eb2',
            82.41: 'e2',
            87.31: 'f2',
            92.50: 'gb2',
            98.00: 'g2',
            103.83: 'ab2',
            110.00: 'a2',
            116.54: 'bb2',
            123.47: 'b2',
            130.81: 'c3',
            138.59: 'db3',
            146.83: 'd3',
            155.56: 'eb3',
            164.81: 'e3',
            174.61: 'f3',
            185.00: 'gb3',
            196.00: 'g3',
            207.65: 'ab3',
            220.00: 'a3',
            233.08: 'bb3',
            246.94: 'b3',
            261.63: 'c4',
            277.18: 'db4',
            293.66: 'd4',
            311.13: 'eb4',
            329.63: 'e4',
            349.23: 'f4',
            369.99: 'gb4',
            392.00: 'g4',
            415.30: 'ab4',
            440.00: 'a4',
            466.16: 'bb4',
            493.88: 'b4',
            523.25: 'c5',
            554.37: 'db5',
            587.33: 'd5',
            622.25: 'eb5',
            659.26: 'e5',
            698.46: 'f5',
            739.99: 'gb5',
            783.99: 'g5',
            830.61: 'ab5',
            880.00: 'a5',
            932.33: 'bb5',
            987.77: 'b5',
            1046.50: 'c6',
            1108.73: 'db6',
            1174.66: 'd6',
            1244.51: 'eb6',
            1318.51: 'e6',
            1396.91: 'f6',
            1479.98: 'gb6',
            1567.98: 'g6',
            1661.22: 'ab6',
            1760.00: 'a6',
            1864.66: 'bb6',
            1975.53: 'b6',
            2093.00: 'c7',
            2217.46: 'db7',
            2349.32: 'd7',
            2489.02: 'eb7',
            2637.02: 'e7',
            2793.83: 'f7',
            2959.96: 'gb7',
            3135.96: 'g7',
            3322.44: 'ab7',
            3520.00: 'a7',
            3729.31: 'bb7',
            3951.07: 'b7',
            4186.01: 'c8'
        }

        console.log(tuningTable[frequency] + frequency);

        var request = new XMLHttpRequest();
        var url = "sound-resources/" + tuningTable[frequency] + ".mp3";
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        //decode async
        request.onload = function() {
            audioContext.decodeAudioData(request.response, function(buffer) {

                pianoSound.buffer = buffer;

                pianoSound.connect(destination);
                
            })
        }

        request.send();

        return pianoSound;
    }
};
});

    