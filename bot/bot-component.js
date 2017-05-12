AFRAME.registerComponent('buildbot', {
  schema: {
  },
  init: function() {
    var el = this.el;
    var loader = new THREE.JSONLoader();

    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    loader.load('bot/buildbot.js', this.handleAssetLoaded);
    window.setInterval( function() {
      el.emit('botspin');
    }, 13000);
    
    window.setInterval(function () {
      var newX = getRandomIntInclusive(-7, 7);
      var newY = getRandomIntInclusive(-7, 7);
      var newZ = getRandomIntInclusive(-7, 7);
      el.setAttribute('animation', 'to', newX + " " + newY + " " + newZ);
      el.emit('botmove');
      window.setTimeout(function() {
        el.setAttribute('animation', 'from', newX + " " + newY + " " + newZ);
      }, 9000);
    }, 20000);
  },
  handleAssetLoaded: function(geometry, materials) {
    var el = document.querySelector("#bot");
    var material = new THREE.MeshFaceMaterial(materials);

    for(var i = 0; i < materials.length; ++i) {
      materials[i].morphTargets = true;
      materials[i].shading = THREE.FlatShading;
    }

    var mesh_obj = new THREE.Mesh(geometry, material);
    el.setObject3D('mesh', mesh_obj);
  }
});
