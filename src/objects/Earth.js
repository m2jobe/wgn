import { Object3D } from "three";
import { preloader } from "../loader";

export default class Earth extends Object3D {
  constructor() {
    super();

    this.scale.setScalar(0.12);
    this.rotation.y = Math.PI * -0.25;

    const earth = preloader.get("earth");

    this.add(earth.scene);
  }
}
