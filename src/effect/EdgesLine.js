// 边缘边线效果
import * as THREE from 'three'

export class EdgesLine {
    constructor(scene, mesh, color) {
        this.scene = scene
        this.mesh = mesh // 需要添加边线的小物体模型对象
        this.color = color // 边线颜色

        this.init()
    }
    init() {
        const edgesGeometry = new THREE.EdgesGeometry(this.mesh.geometry)
        const material = new THREE.LineBasicMaterial({ color: this.color })
        const line = new THREE.LineSegments(edgesGeometry, material)
        // 把目标小物体模型对象（位置，旋转角度，缩放）赋予给边线物体
        line.position.copy(this.mesh.position)
        line.rotation.copy(this.mesh.rotation)
        line.scale.copy(this.mesh.scale)
        this.scene.add(line)
    }
}