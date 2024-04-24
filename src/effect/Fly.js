// 飞行器
import * as THREE from 'three'
import { BaseModel } from "../model/BaseModel";

export class Fly extends BaseModel {
    init() {
        this.scene.add(this.model)

        this.pointIndex = 0 // 数组下标，用于换取坐标数组里，某个坐标对象
        this.isCameraMove = false // 控制摄像机是否跟随切换位置的开关

        this.generateMovePath()
    }
    generateMovePath() {
        // EllipseCurve 椭圆曲线
        const AirFly_PATH = new THREE.EllipseCurve(
            0, 0, // 椭圆中心坐标
            110, 110, // x和y轴向上椭圆的半径
            0, -2 * Math.PI, // 开始角度和扫描角度
            false, // 是否按照顺时针来绘制
            0 // 以弧度表示，椭圆从X轴正方向逆时针的旋转角度
        )
        let tempArr = AirFly_PATH.getPoints(3500)

        // 把坐标向 y 轴移动 120 单位（模仿在天空的效果）
        let res = []
        for (let i = 0; i < tempArr.length; i++) {
            // z 轴的坐标位置，是几何图形未旋转之前，垂直于世界坐标系 y 轴的坐标点
            let item = new THREE.Vector3(tempArr[i].x, 120, tempArr[i].y)
            res.push(item)
        }
        this.pointsArr = res


        // const geometry = new THREE.BufferGeometry().setFromPoints(res);
        // const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
        // const ellipse = new THREE.Line(geometry, material);
        // this.scene.add(ellipse)
    }
    onTick() {
        if (this.pointIndex < this.pointsArr.length - 1) {
            if (this.isCameraMove) {
                this.camera.position.copy(this.pointsArr[this.pointIndex])
                this.camera.lookAt(0, 10, 0)
            }
            this.model.position.copy(this.pointsArr[this.pointIndex])
            this.pointIndex += 1
        } else {
            this.pointIndex = 0
        }
    }
}