// 2D 物体 - 建筑信息
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

export class BuildInfo {
    constructor(scene, center, dataObj) {
        this.scene = scene
        this.center = center
        this.dataObj = dataObj

        this.list = []  // 保存名字和信息的 2 个 2D 物体

        this.createNameDiv()
        this.createInfoDiv()
    }
    createNameDiv() {
        const nameDiv = document.querySelector('#tag-1')
        nameDiv.innerHTML = this.dataObj.name
        // 标签虽然有 display：none; 但是转化成 2D 物体后会在 2D 渲染器中直接显示
        const nameObject = new CSS2DObject(nameDiv)
        nameObject.position.set(this.center.x, this.center.y + 11, this.center.z)
        this.scene.add(nameObject)
        this.list.push(nameObject)
    }
    createInfoDiv() {
        const infoDiv = document.querySelector('#tag-2')
        infoDiv.style.pointerEvents = 'all'
        const { squareMeters, accommodate, officesRemain, parkingRemain } = this.dataObj
        const textHtml = `
            <div>总平米数： ${squareMeters}</div>
            <div>容纳人数： ${accommodate}</div>
            <div>可出租位： ${officesRemain}</div>
            <div>空余车位： ${parkingRemain}</div>
        `
        infoDiv.innerHTML = textHtml

        infoDiv.addEventListener('click', (e) => {
            e.stopPropagation()
            this.clear.call(this)
        })

        const infoObject = new CSS2DObject(infoDiv)
        infoObject.position.set(this.center.x, this.center.y + 5, this.center.z)
        this.scene.add(infoObject)
        this.list.push(infoObject)
    }
    // 隐藏信息物体
    clear() {
        this.list.forEach(item => item.visible = false)
    }
}