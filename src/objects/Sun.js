import { Object3D } from "three";
import { preloader } from "../loader";

export default class Sun extends Object3D {
  constructor() {
    super();

    this.scale.setScalar(0.3);
    this.position.set(-180, 100, -280);
    this.rotation.y = Math.PI * -0.25;

    const sun = preloader.get("sun");

    this.add(sun.scene);
  }
}
