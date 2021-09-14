import { Object3D } from 'three'
import { preloader } from '../loader'

export default class Portal extends Object3D {
  constructor () {
    super()

    this.scale.setScalar(0.1)
    this.position.set(-100, -100, 0)
    
    const portal = preloader.get('portal')
    
    this.add(portal.scene)
  }
}
