Polymer({

  overlayIndex: 1,

  keyLock: false,

  ready: function(){

    this.overlays = [

      "beard_guy",

      "big_hair_lady",

      "egypt_lady",

      "napoleon"

    ]

    document.addEventListener("keyup", function(e){

      if(e.keyCode == 39){

        if(this.overlayIndex + 1 == this.overlays.length){

          this.overlayIndex = 0;

        }

        else{

          this.overlayIndex++;

        }

      }

      else if(e.keyCode == 37){

        if(this.overlayIndex - 1 == -1){

          this.overlayIndex = this.overlays.length - 1;

        }

        else{

          this.overlayIndex--;

        }

      }

      else if(e.keyCode == 32 && !this.keyLock){

        this.keyLock = true;

        this.$.sound.play();

        this.$.flash.className = "flash";

        this.job("", function(){

          this.$.flash.className = "";

          this.job("", function(){

            this.keyLock = false;

          }, 1000)

        }, 400)

        this.saveImage();

      }

    }.bind(this))

  },

  saveImage: function(){

    this.$.stream.captureFrame();

    var blob = this.appendOverlay();

    chrome.syncFileSystem.requestFileSystem(function(fs){

      var d = new Date();

      fs.root.getFile(d.getTime() + ".jpg", {create: true}, function(fileEntry){

        fileEntry.createWriter(function(writer){

          writer.write(blob)

        }, function(){});

      }, function(){});

    }.bind(this))

  },

  appendOverlay: function(){

    var ctx = this.cap.getContext('2d');

    ctx.drawImage(this.$.overlay, 0, 0, 1280, 720);

    var blob = this.dataURLToBlob(this.cap.toDataURL("image/jpeg"), "image/jpeg");

    return blob;

  },

  dataURLToBlob: function(dataURL, type){

    var binary = atob(dataURL.split(",")[1]), array = [];

    for(var i = 0; i < binary.length; i++){

      array.push(binary.charCodeAt(i));

    }

    return new Blob([new Uint8Array(array)], {type: type});

  }

});