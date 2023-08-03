let block = document.getElementById('block')
let DATALOCAL = 'DATA'
let newData = JSON.parse(localStorage.getItem(DATALOCAL))

let movies = newData ? [...newData] : []

function createItem({ title, price, url, id }) {
	let li = document.createElement('li')
	li.className = 'items'

	let h1 = document.createElement('h1')
	h1.textContent = title
	h1.className = 'title'

	let imgs = document.createElement('img')
	imgs.src = url
	imgs.alt = 'error 500'
	imgs.className = 'imgs'

	let pricee = document.createElement('p')
	pricee.innerHTML = `${price} сом`
	pricee.className = 'price'

	let deleteBtn = document.createElement('button')
	deleteBtn.id = `${id}`
	deleteBtn.innerHTML = 'delete'
	deleteBtn.addEventListener('click', onDelete)
	li.append(imgs)
	li.append(h1)
	li.append(pricee)
	li.append(deleteBtn)

	return li
}
function addItem() {
	block.innerHTML = ''
	movies.map((el) => {
		let newItems = createItem(el)
		block.append(newItems)
	})

}

let addBtn = document.getElementById('add')
let titleInput = document.getElementById('titleInput')
let urlInput = document.getElementById('urlInput')
let priceInput = document.getElementById('priceInput')

let lasId = newData && newData[newData.length - 1].id + 1
let id = newData ? lasId : 0

addBtn.addEventListener('click', (event) => {
	event.preventDefault()
	let title = titleInput.value
	let url = urlInput.value
	let price = priceInput.value
	if (title.length > 0 && url.length > 0 && price.length > 0) {
		id++
		movies.push({ id, title, url, price })
		localStorage.setItem(DATALOCAL, JSON.stringify(movies))

		titleInput.value = ''
		urlInput.value = ''
		priceInput.value = ''

		addItem()
	}
})
const onDelete = (event) => {
	let argumentId = Number(event.target.id)
	let filteredData = movies.filter((el) => el.id !== argumentId)
	movies = filteredData
	localStorage.setItem(DATALOCAL, JSON.stringify(movies))
	addItem()
}
addItem()

// sessionStorage.setItem('USER', {})
// localStorage.setItem('admin', 'local')
