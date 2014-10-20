Polymer({

  overlayIndex: 1,

  ready: function(){

    this.overlays = [

      "beard_guy",

      "big_hair_lady",

      "egypt_lady"

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

    }.bind(this))

  }

});