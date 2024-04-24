export class BaseModel {
    constructor(model, scene, camera, control) {
        this.model = model
        this.scene = scene
        this.camera = camera
        this.control = control
        // 因为子类无需定义 constructor，所以没有地方调用 init 方法，因此在这里调用子类的 init
        this.init()
    }
}