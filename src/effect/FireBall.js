import * as THREE from 'three'

export class FireBall {
    constructor(scene, center) {
        this.scene = scene
        this.center = center
        this.init()
    }
    init() {
        const geometry = new THREE.SphereGeometry(25, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2)
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color('#f4790d'),
            side: THREE.DoubleSide,
            depthTest: false  // 关闭深度测试（透视效果）- 多个像素点同时渲染
        })
        const sphere = new THREE.Mesh(geometry, material)
        sphere.position.set(this.center.x, 0, this.center.z)
        this.scene.add(sphere)
        this.nowMesh = sphere
        // this.nowMesh.scale.set(0, 0, 0)
    }
    onTick() {
        if (this.nowScale < 1) {
            this.nowScale += 0.005
            this.nowMesh.scale.set(this.nowScale, this.nowScale, this.nowScale)
        } else {
            this.nowScale = 0
        }
    }
    clear() {
        this.nowMesh.material.dispose()
        this.nowMesh.geometry.dispose()
        this.scene.remove(this.nowMesh)
    }
}

