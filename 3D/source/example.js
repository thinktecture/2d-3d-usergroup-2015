(function () {
	
	var container, camera, scene, renderer, controls, stats;
	
	init();
	animate();
	
	window.addEventListener('resize', onResize);
	
	function init() {
		stats = new Stats();
		document.body.appendChild(stats.domElement);
		
		container = document.getElementById('container');
		
		camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 500);
		camera.position.z = -20;
		camera.position.x = 20;
		
		scene = new THREE.Scene();
		
		// Sphere
		var textureLoader = new THREE.TextureLoader();
		textureLoader.load('assets/earth.jpg', function (texture) {
			var geometry = new THREE.SphereGeometry(5, 32, 32);
			var material = new THREE.MeshLambertMaterial({map: texture});
			var sphere = new THREE.Mesh(geometry, material);
			scene.add(sphere);
		});
		
		// Lights
		var ambientLight = new THREE.AmbientLight(0xaaaaaa);
		scene.add(ambientLight);
		
		var spotLight = new THREE.SpotLight(0xffffff);
		spotLight.position.set(500, 0, 500);
		scene.add(spotLight);
		
		// Stars
		var starsCount = 250;
		var stars = new THREE.Geometry();
		var starMaterial = new THREE.PointCloudMaterial({color: 0xffffff});
		
		for (var i = 0; i < starsCount; i++) {
			var x = Math.random() * 1000 - 500;
			var y = Math.random() * 1000 - 500;
			var z = Math.random() * 1000 - 500;
			
			var star = new THREE.Vector3(x, y, z);
			
			stars.vertices.push(star);
		}
		
		var pointCloud = new THREE.PointCloud(stars, starMaterial);
		scene.add(pointCloud);
		
		renderer = new THREE.WebGLRenderer({antialias: true});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(0x000000);
		container.appendChild(renderer.domElement);
		
		controls = new THREE.TrackballControls(camera, container);
	}
	
	function animate() {
		window.requestAnimationFrame(animate);
		
		stats.update();
		
		controls.update();
		
		renderer.render(scene, camera);
	}
	
	function onResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
	    camera.updateProjectionMatrix();
		
		renderer.setSize(window.innerWidth, window.innerHeight);
	}
	
})();