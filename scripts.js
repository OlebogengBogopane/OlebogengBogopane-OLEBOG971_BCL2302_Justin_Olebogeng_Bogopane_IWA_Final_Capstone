

import { authors, genres , books} from "./data.js" //import


const matches = books // added const
let page = 1;

if (!books && !Array.isArray(books)) throw new Error('Source required') 
if (!page && page.length < 2) throw new Error('Range must be an array with two numbers')

const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

const fragment = document.createDocumentFragment()
let startIndex = 0;
let endIndex = 36;
const extracted = books.slice(startIndex, endIndex)


//creates a book preview and extracts to innerHTML
for(let i = 0; i < extracted.length; i++) {
    const preview = document.createElement('dl')
   preview.className = 'preview'
   preview.dataset.id = books[i].id
   preview.dataset.title = books[i].title
   preview.dataset.image = books[i].image
   preview.dataset.subtitle = `${authors[books[i].author]} (${(new Date(books[i].published)).getFullYear})`
   preview.dataset.description = books[i].description 
   preview.dataset.genre = books[i].genres

preview.innerHTML= /*html*/ `
 <div>
 <image class='preview__image' src="${books[i].image}" alt=book pic"}/>
 </div>
 <div class='preview__info'>
 <dt class='preview__title'>${books[i].title}<dt>
 <dt class='preview__author'> By ${authors[books[i].author]}</dt>
 </div>`
 
    fragment.appendChild(preview)
}


const booklist1 = document.querySelector('[data-list-items]')
booklist1.appendChild(fragment)

const searchbutton = document.querySelector("[data-header-search]");
searchbutton.addEventListener('click', (event) => {
    document.querySelector("[data-search-overlay]").style.display ="block";
})  //search


const searchCancel = document.querySelector("[data-search-cancel]");
searchCancel.addEventListener('click',(event) =>{
document.querySelector("[data-search-overlay]").style.display = "none";
})//cancel search


const settingbutton = document.querySelector("[data-header-settings]")
settingbutton.addEventListener('click', (event) =>{
    document.querySelector("[data-settings-overlay]").style.display ="block";
})
const settingCancel = document.querySelector('[data-settings-cancel]')
settingCancel.addEventListener('click', (event) => {
document.querySelector("[data-settings-overlay]").style.display = "none";
})

const dataSettingsTheme = document.querySelector('[data-settings-theme]')
const saveButton = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary")
saveButton.addEventListener('click',(event)=> {
    event.preventDefault()  // savebutton


    // day and night themes 
if (dataSettingsTheme.value === 'day'){
    document.querySelector('body').style.setProperty('--color-dark',day.dark)
    document.querySelector('body').style.setProperty('--color-light', day.light)
    document.querySelector("data-settings-overlay").style.display = "none";
}
    if (dataSettingsTheme.value === 'night'){
        document.querySelector('body').style.setProperty('--color-dark',night.dark)
        document.querySelector('body').style.setProperty('--color-light', night.light)
        document.querySelector("data-settings-overlay").style.display = "none";
    }
})

const authorSelect = document.querySelector("[data-search-authors]");
for (const authorId in authors) {
  const optionElement = document.createElement('option')
  optionElement.value = authorId
  optionElement.textContent = authors[authorId]
  authorSelect.appendChild(optionElement)
}
const genreSelect = document.querySelector("[data-search-genres]");
for (const genreId in genres) {
  const optionElement = document.createElement('option')
  optionElement.value = genreId
  optionElement.textContent = genres[genreId]
  genreSelect.appendChild(optionElement)
}
const detailsToggle = (event) => {
    const overlay1 = document.querySelector('[data-list-active]');
    const title = document.querySelector('[data-list-title]')
    const subtitle = document.querySelector('[data-list-subtitle]')
    const description = document.querySelector('[data-list-description]')
    const image1 = document.querySelector('[data-list-image]')
    const imageblur = document.querySelector('[data-list-blur]')
    event.target.dataset.id ? overlay1.style.display = "block" : undefined ;
    event.target.dataset.description ? description.innerHTML = event.target.dataset.description : undefined; 
    event.target.dataset.subtitle ? subtitle.innerHTML = event.target.dataset.subtitle : undefined ;
    event.target.dataset.title ? title.innerHTML = event.target.dataset.title : undefined ;
    event.target.dataset.image ? image1.setAttribute ('src',event.target.dataset.image) : undefined;
    event.target.dataset.image ? imageblur.setAttribute('src',event.target.dataset.image) : undefined;
    
 }; 
 const detailsClose = document.querySelector('[data-list-close]')
 detailsClose.addEventListener('click', (event) => {
 document.querySelector("[data-list-active]").style.display = "none";
 })
 const bookclick = document.querySelector('[data-list-items]')
 bookclick.addEventListener('click', detailsToggle)




//

const showMoreButton = document.querySelector('[data-list-button]')
    // Update the text of the "Show More" button to display how many more items will be displayed
    const numItemsToShow = Math.min(books.length - endIndex,)
    const showMoreButtonText = `Show More <span style ="opacity: 0.5"> (${numItemsToShow})</span>`
    showMoreButton.innerHTML = showMoreButtonText;
showMoreButton.addEventListener('click', () => {
    const fragment = document.createDocumentFragment()
    startIndex += 36;
    endIndex += 36;
    const startIndex1 = startIndex
    const endIndex1 = endIndex
    
    const extracted = books.slice(startIndex1, endIndex1)
    for (const {author ,image, title, id , description, published} of extracted) {
        const preview = document.createElement('dl')
        preview.className = 'preview'
        preview.dataset.id = id
        preview.dataset.title = title
        preview.dataset.image = image
        preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
        preview.dataset.description = description
        // preview.dataset.genre = genres
        preview.innerHTML= /*html*/`
        <div>
        <image class='preview__image' src="${image}" alt="book pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'> By ${authors[author]}</dt>
        </div>`
        fragment.appendChild(preview)
    }
    const booklist1 = document.querySelector('[data-list-items]')
    booklist1.appendChild(fragment)

    
})