import Home from './js/home.js'

const appContainer = document.getElementById('app')

if (!(appContainer instanceof HTMLDivElement)) {
  throw new Error('div#app element is not found.')
}

Home(appContainer)
