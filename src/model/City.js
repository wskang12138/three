import * as THREE from 'three'
import { BaseModel } from "./BaseModel";
import { EdgesLine } from '../effect/EdgesLine';
import { modifyCityDefaultMaterial } from '../shader/modifyCityMaterial';
import { CityWater } from '../effect/CityWater';
import { Fire } from '../effect/Fire';
import { getBoxCenter } from '../utils/getBoxCenter';
import { FireBall } from '../effect/FireBall';
import { BuildInfo } from '../dom/BuildInfo';
import { EffectManager } from '../effect/EffectManager';
import { ClickHandler } from '../utils/ClickHandler';
import { DataManager } from '../utils/DataManager';

export class City extends BaseModel {
    // 子类无 constructor，默认走父类的，而且 this 为子类的实例对象
    init() {
        this.scene.add(this.model)
        this.buildNameObj = {
            '01-shanghaizhongxindasha': '上海中心大厦',
            "02-huanqiujinrongzhongxin": "环球金融中心",
            "03-jinmaodasha": "金茂大厦",
            "04-dongfangmingzhu": "东方明珠",
        }
        this.initFire('01-shanghaizhongxindasha')
        this.initEffect()
        this.bindClick()
    }
    // 初始化城市效果
    initEffect() {
        // 中心城市建筑材质
        const centerMaterial = new THREE.MeshBasicMaterial({
            color: 0xA8CDED,
            transparent: true
        })
        // 外围城市建筑材质
        const periphery = new THREE.MeshBasicMaterial({
            color: 0xA8CDED,
            transparent: true
        })
        this.model.traverse(model => {
            if (model.name === 'Text') {
                // 隐藏默认建筑名字
                model.visible = false
                return
            }

            // 排除地板和河水物体
            if (model.name !== 'Shanghai-09-Floor' && model.name !== 'Shanghai-08-River') {
                // 修改城市建筑模型材质
                if (['Shanghai-02', 'Shanghai-03', 'Shanghai-04', 'Shanghai-05', 'Shanghai-06', 'Shanghai-07'].includes(model.name)) {
                    // 周围建筑
                    model.material = periphery
                    new EdgesLine(this.scene, model, new THREE.Color('#666666'))
                    // 对物体追加混合的着色器代码（渐变色白膜效果）
                    modifyCityDefaultMaterial(model, false)
                } else {
                    // 中心建筑
                    model.material = centerMaterial
                    new EdgesLine(this.scene, model, new THREE.Color('#00ffff'))
                    modifyCityDefaultMaterial(model, true)
                }
            }

            if (model.name === 'Shanghai-08-River') {
                model.visible = false
                const theWater = new CityWater(model, this.scene)
                // 把水波纹物体传入到动效管理类当中
                EffectManager.getInstance().addObj(theWater)
            }
        })
    }
    // 创建火灾标记
    // buildName 就是建模师模型中的小物体名字
    initFire(buildName) {
        const build = this.model.getObjectByName(buildName)
        const { center, size } = getBoxCenter(build)

        const fire = new Fire(this.scene, center, size)
        const ball = new FireBall(this.scene, center)

        EffectManager.getInstance().addObj(ball)

        setTimeout(() => {
            fire.clear()
            ball.clear()

            EffectManager.getInstance().removeObj(ball)
        }, 15000)
    }
    bindClick() {
        Object.keys(this.buildNameObj).forEach(item => {
            const build = this.model.getObjectByName(item)
            ClickHandler.getInstance().addMesh(build, (async (object) => {
                const res = await DataManager.getInstance().getData()
                // object: 3D物体
                const { center } = getBoxCenter(object)
                new BuildInfo(this.scene, center, res.data.data.info[item])
                console.log(98, this.scene.children);
            }))
        })
    }
}