import { Object3D, EquirectangularReflectionMapping } from "three";
import { preloader } from "../loader";

export default class Moon extends Object3D {
  constructor() {
    super();

    this.scale.setScalar(0.04);
    this.position.set(20, 0, 10);
    this.rotation.y = Math.PI * -0.25;

    const moon = preloader.get("moon");

    this.add(moon.scene);
  }
}
