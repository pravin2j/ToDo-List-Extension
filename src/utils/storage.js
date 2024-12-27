const storage = {
    getTodos:()=>{
        return new Promise((resolve)=>{
            if(chrome.storage) {
                chrome.storage.local.get(['todo'], (data)=>{
                    resolve(data.todo || [])
                })
            } else {
                const todo = localStorage.getItem('todo')
                resolve(todo ? JSON.parse(todo) : [])
            }
        })
    },
    setTodos:(todo)=>{
        return new Promise((resolve)=>{
            if(chrome.storage) {
                chrome.storage.local.set({todo}, resolve)
            } else {
                localStorage.setItem('todo', JSON.stringify(todo))
                resolve()
            }
        })
    },
}

export default storage