import listItem from "./listItem";

interface list {
    list: listItem[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObject: listItem): void,
    removeItem(id: string): void, 
}

export default class fullList implements list {

    static instance: fullList = new fullList()

    private constructor(private _list : listItem[] = []) {}

    get list(): listItem[] {
        return this._list
    }

    load(): void {
        const storedList: string | null = localStorage.getItem("myItem")
        if (typeof storedList !== "string") return

        const parsedList: {_id: string, _item: string, _checked: boolean} []
        = JSON.parse(storedList)

        parsedList.forEach(itemObject => {
            const newListItem = new listItem(
                itemObject._id, 
                itemObject._item, 
                itemObject._checked)
                
                fullList.instance.addItem(newListItem)
        })
    }

    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list))
    }

    clearList(): void {
        this._list = []
        this.save()
    }

    addItem(itemObject: listItem): void {
        this._list.push(itemObject)
        this.save
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }
}