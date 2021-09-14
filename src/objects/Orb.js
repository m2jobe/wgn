import { Object3D } from "three";
import { preloader } from "../loader";

export default class Orb extends Object3D {
  constructor() {
    super();

    this.scale.setScalar(0.3);
    this.position.set(2, 10, 10);
    this.rotation.y = Math.PI * -0.25;

    const orb = preloader.get("orb");

    this.animations = orb.animations;
    this.add(orb.scene);
  }
}
