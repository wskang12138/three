// 单击事件管理类
import * as THREE from 'three'

export class ClickHandler {
    static getInstance() {
        if (!this.instance) {
            this.instance = new ClickHandler()
        }
        return this.instance
    }
    init(camera) {
        this.camera = camera
        this.list = []  // 光线投射交互计算的物体
        this.map = new Map()    // key 可以是 three.js 物体（与点击要执行的回调函数产生一对一关系）

        // 光线投射
        const rayCaster = new THREE.Raycaster()
        const pointer = new THREE.Vector2()

        window.addEventListener('click', (e) => {
            e.stopPropagation()
            pointer.x = (e.clientX / window.innerWidth) * 2 - 1
            pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
            rayCaster.setFromCamera(pointer, this.camera)
            const resList = rayCaster.intersectObjects(this.list, false)
            if (resList.length > 0) {
                const targetObj = resList[0]
                const fn = this.map.get(targetObj.object)
                fn(targetObj.object)
            }
        })
    }

    addMesh(mesh, fn) {
        this.list.push(mesh)
        this.map.set(mesh, fn)
    }
}