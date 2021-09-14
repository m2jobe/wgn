import { Object3D } from "three";
import { preloader } from "../loader";

export default class Elsyium extends Object3D {
  constructor() {
    super();

    this.scale.setScalar(10);
    this.rotation.y = Math.PI * -0.25;

    const earth = preloader.get("elsyium");

    this.add(earth.scene);
  }
}
