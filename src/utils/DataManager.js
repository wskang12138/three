import { EventBus } from "./EventBus";
import axios from 'axios'

export class DataManager {
    static getInstance() {
        if (!this.instance) {
            this.instance = new DataManager()
        }
        return this.instance
    }
    getData() {
        return new Promise(resovle => {
            axios.get('/api/city').then(res => {
                resovle(res)
            })
        })
    }
    refreshData() {
        setInterval(async () => {
            let data = await this.getData()
            EventBus.getInstance().emit('refreshHomeCount', data)
        }, 15000);
    }
}