// 火灾标记类
import * as THREE from 'three'

export class Fire {
    constructor(scene, center, size) {
        this.scene = scene
        this.center = center  // 建筑物中心点三维向量对象
        this.size = size   // 建筑物大小的三维向量对象
        this.init()
    }
    // 初始化火灾标志
    init() {
        const texture = new THREE.TextureLoader().load('icon/fire.png')
        texture.colorSpace = THREE.SRGBColorSpace
        const spriteMaterial = new THREE.SpriteMaterial({
            map: texture
        })
        const sprite = new THREE.Sprite(spriteMaterial)
        sprite.position.set(this.center.x, this.center.y + this.size.y / 2 + 4, this.center.z)
        sprite.scale.set(10, 10, 10)
        this.scene.add(sprite)
        this.model = sprite
    }
    clear() {
        this.scene.remove(this.model)
    }
}