import './css/style.css'
import fullList from './model/fullList'
import listItem from './model/listItem'
import listTemplate from './templates/listTemplate'


const initApp = (): void => {
  const FullList = fullList.instance
  const template = listTemplate.instance

  const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement
  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault()

    const input = document.getElementById("newItem") as HTMLInputElement
    
    const newEntryText: string = input.value.trim()
    if (!newEntryText.length)
    return

    const itemId: number = FullList.list.length
    ? parseInt(FullList.list[FullList.list.length -1].id) +1 :1

    const newItem = new listItem(itemId.toString(), newEntryText)

    FullList.addItem(newItem)

    template.render(FullList)
    
  })


  const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement

  clearItems.addEventListener('click', (): void => {
    FullList.clearList()
    template.clear()
  })

  FullList.load()
  template.render(FullList)
}

document.addEventListener("DOMContentLoaded", initApp)