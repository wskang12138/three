import { EventBus } from "../utils/EventBus";

let modeArr = [
    {
        mode: 'mode-topView', // id 名字，也作为 EventBus 中自定义事件名字
        isOpen: false // 当前按钮状态-true开始，false关闭中
    },
    {
        mode: 'mode-roaming',
        isOpen: false
    },
]

for (let i = 0; i < modeArr.length; i++) {
    let item = modeArr[i]
    document.getElementById(item.mode).onclick = function () {
        item.isOpen = !item.isOpen  // 控制打开状态等
        // 触发这个名字在发布订阅对象里，下属数组里所有方法触发，并传递第二个参数过去
        if (item.mode === 'mode-topView') {
            modeArr[1].isOpen = false
            EventBus.getInstance().emit('mode-roaming', false)
        } else if (item.mode === 'mode-roaming') {
            modeArr[0].isOpen = false
            EventBus.getInstance().emit('mode-topView', false)
        }

        EventBus.getInstance().emit(item.mode, item.isOpen)
    }
}