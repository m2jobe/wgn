import {
  BufferGeometry as Geometry,
  Vector3,
  PointsMaterial,
  Points,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  BufferAttribute,
  Float32BufferAttribute,
  Spherical,
} from "three";
import { preloader } from "../loader";

export default class Celestials {
  constructor(scene) {
    this.scene = scene;
    this.starGeo = new Geometry();
    this.stars = null;
  }

  randomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  createTheStarsFilledWithPotential(earth) {
    // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position.
    const stars = [];
    for (var z = -1000; z < 1000; z += 2) {
      // Make a sphere (exactly the same as before).
      var geometry = new SphereGeometry(0.4, 32, 32);
      var material = new MeshBasicMaterial({ color: 0xffffff });
      var sphere = new Mesh(geometry, material);

      // This time we give the sphere random x and y positions between -500 and 500
      sphere.position.x = Math.random() * 1000 - 400;
      sphere.position.y = Math.random() * 1000 - 400;
      sphere.position.z = Math.random() * 1000 - 400;

      if (Math.abs(sphere.position.x - earth.position.x) < 200) {
        sphere.position.x += 400;
      }

      if (Math.abs(sphere.position.y - earth.position.y) < 200) {
        sphere.position.y += 400;
      }

      if (Math.abs(sphere.position.z - earth.position.z) < 200) {
        sphere.position.z += 400;
      }

      // scale it up a bit
      sphere.scale.x = sphere.scale.y = 2;

      //add the sphere to the scene
      this.scene.add(sphere);

      //finally push it to the stars array
      stars.push(sphere);
    }
  }

  rotateTheCelestials(earth, moon, portal, sun) {
    if (!this.stars) {
      //return ;
    }

    /*this.starGeo.vertices.forEach((p) => {
      p.velocity += p.acceleration;
      p.y -= p.velocity;

      if (p.y < -200) {
        p.y = 200;
        p.velocity = 0;
      }
    });
    this.starGeo.verticesNeedUpdate = true;*/
    //this.stars.rotation.y += 0.001;

    if (earth && earth.rotation) {
      earth.rotation.z += 0.001;
    }

    if (moon && moon.rotation) {
      moon.rotation.z -= 0.002;
    }

    if (sun && sun.rotation) {
      sun.rotation.z += 0.003;
    }

    if (portal && portal.rotation) {
      portal.rotation.y += 0.01;
    }
  }

  createOrbsNearEarth(earth) {
    const geometry = new SphereGeometry(15, 32, 16);
    const material = new MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new Mesh(geometry, material);
    sphere.scale.setScalar(0.06);
    sphere.position.set(
      earth.position.x - 2,
      earth.position.y + 3,
      earth.position.z + 21
    );
    //this.scene.add(sphere);
  }
}
