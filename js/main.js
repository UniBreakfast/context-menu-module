const menuItems = {
    "Do something 1": () => console.log('Did something 1'),
    "Do something 2": () => console.log('Did something 2'),
    "Do something 3": () => console.log('Did something 3'),
    "Do something 4": () => console.log('Did something 4'),
    "Do something 5": () => console.log('Did something 5')
}

document.querySelectorAll('button').forEach(btn => addMenu(btn, menuItems))

contextMenu.onclick = () => {
    contextMenu.classList.toggle('small')
}
function addMenu(el, menuItems) {
    const glass = document.createElement("div")
    glass.className = 'glass'
    const menu = document.createElement('div')
    menu.className = 'contextMenu'
    const list = document.createElement("ul")
    const listItems = Object.entries(menuItems).map(buildLi)
    list.append(...listItems)
    glass.append(menu)
    menu.append(list)
    document.body.append(glass)
    
    toggleGlass()
    glass.onclick = e => {
        // if (e.target == glass) hideMenu()
        if (e.target == glass) toggleGlass()
    }
    el.onclick = showMenu

    menu.style.overflow = 'hidden'

    function buildLi([innerText, fn]) {
        const li = document.createElement('li')
        li.innerText = innerText
        li.onclick = () => {
            fn()
            // hideMenu()
            toggleGlass()
        }
        return li
    }

    function toggleGlass() {
        glass.classList.toggle('hidden')
    }

    function showMenu() {
        toggleGlass()
        const {height: listHeight, width: listWidth} = list.getBoundingClientRect()
        toggleGlass()
        const {left, top, width, height} = el.getBoundingClientRect()
        const bodyWidth = document.body.getBoundingClientRect().width
        const right = bodyWidth - left - width
        const bottom = innerHeight - top - height
        const menuLeft = left > right ? left > listWidth ? left - listWidth : 0 :
                         right > listWidth ? left + width : bodyWidth - listWidth
        const desired = (listHeight - height) / 2 
        const menuTop = top > desired && bottom > desired ? top - desired :
                        top > bottom ? innerHeight - listHeight : 0
        const listLeft = menuLeft < left ? menuLeft - left : 0
        const listTop = menuTop < top ? menuTop - top : 0

        list.style.left = listLeft + 'px'
        list.style.top = listTop + 'px'
        menu.style.top = top + 'px'
        menu.style.left = (left > right ? left : left + width) + 'px'
        menu.style.width = 0
        menu.style.height = height + 'px'
        toggleGlass()

        setTimeout(() => {
            menu.style.left = menuLeft + 'px'
            list.style.left = 0
            menu.style.width = listWidth + 'px'

            menu.ontransitionend = () => {
                menu.style.height = listHeight + 'px'
                menu.style.top = menuTop + 'px'
                list.style.top = 0
                menu.ontransitionend = null
            }
        }, 50)
    }

    function hideMenu() {
        const {top, height} = el.getBoundingClientRect()
        list.style.maxHeight = `${height}px`
        list.style.top = `${top}px`
        list.ontransitionend = () => {
            toggleGlass()
            list.ontransitionend = null
        }
    }
}