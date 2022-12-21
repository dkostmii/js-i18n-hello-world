import i18n from 'roddeh-i18n'

import Select from './select.js'

import { addClassNames } from './i18n-styling'

import style from '../styles/home.module.sass'

/**
 * Defines a language data for application.
 *
 * @typedef {Object} Language
 * @property {string} name Human-readable language name.
 * @property {string} value Language short name.
 * @property {string} styleSuffix A stylesheet suffix for element to which I18n is applied.
 * @property {string | RegExp | (string | RegExp)[]} languageCodes An array of language codes mapped to this language.
 * Can be either {@link string} or {@link RegExp} or an array of {@link string} or {@link RegExp}.
 * @property {boolean} isCurrent Indicates if language is current.
 */

/**
 * An array of languages for applicaiton.
 * @type {Language[]}
 */
let langs = [{
  name: 'Eng',
  value: 'eng',
  styleSuffix: '',
  languageCodes: /en-*/g,
  dict: i18n.create({
    values: {
      'left-1': 'Home',
      'left-2': 'Peculiarities',
      'left-3': 'Guarantees',
      'left-4': 'Who will suit?',
      'left-5': 'FAQ',
      cta: 'Change crypto',
      'headline-title': 'Buy bitcoins and cryptocurrencies instantly and securely!',
      'headline-subtitle': 'Chaingex is simple and secure platform to build your crypto portfolio.'
    }
  }),
  isCurrent: true
}, {
  name: 'Укр',
  value: 'ukr',
  styleSuffix: '__i18n_ukr',
  languageCodes: /uk/g,
  dict: i18n.create({
    values: {
      'left-1': 'Головна сторінка',
      'left-2': 'Особливості',
      'left-3': 'Гарантії',
      'left-4': 'Кому підійде?',
      'left-5': 'FAQ',
      cta: 'Почати торгівлю',
      'headline-title': 'Купуйте біткоїни й криптовалюти швидко та надійно!',
      'headline-subtitle': 'Chaingex – проста та надійна платформа для вашого портфоліо.'
    }
  }),
  isCurrent: false
}, {
  name: 'Pl',
  value: 'pl',
  style_suffix: '__i18n_pl',
  languageCodes: /pl/g,
  dict: i18n.create({
    values: {
      'left-1': 'Strona główna',
      'left-2': 'Osobliwości',
      'left-3': 'Gwarancje',
      'left-4': 'Komu się przyda?',
      'left-5': 'FAQ',
      cta: 'Rozpocznij handel',
      'headline-title': 'Kupuj bitcoiny oraz kryptowaluty szybko i biezpiecznie!',
      'headline-subtitle': 'Chaingex jest prostą i biezpieczną platformą dla Twojego portfolio.'
    }
  }),
  isCurrent: false
}]

/**
 * Returns a current {@link Language}
 *
 * @returns {Language} An object containing data about current {@link Language}
 */
function getCurrentLanguage () {
  return langs.find(l => l.isCurrent)
}

/**
 *
 * @param {string} userLanguage
 * @param {Language} language
 *
 * @returns {boolean}
 */
function isMatchLanguage (userLanguage, language) {
  // Single string
  if (typeof language.languageCodes === 'string' || language.languageCodes instanceof String) {
    // Exact match
    return language.languageCodes === userLanguage
  }

  // Single RegExp
  if (language.languageCodes instanceof RegExp) {
    return language.languageCodes.test(userLanguage)
  }

  // Array of string or RegExp
  for (const code of language.languageCodes) {
    if (typeof code === 'string' || code instanceof String) {
      if (code === userLanguage) {
        // Exact match
        return true
      }
    }

    if (code instanceof RegExp) {
      if (code.test(userLanguage)) {
        return true
      }
    }
  }

  // No matches found
  return false
}

function mapUserLanguage () {
  const userLanguage = navigator.language || navigator.userLanguage

  for (const l of langs) {
    if (isMatchLanguage(userLanguage, l)) {
      return l
    }
  }

  return langs[0]
}

function detectUserLanguage () {
  const detectedLanguage = mapUserLanguage()

  langs = langs.map(l => {
    if (l.value === detectedLanguage.value) {
      return { ...detectedLanguage, isCurrent: true }
    }

    return { ...l, isCurrent: false }
  })
}
detectUserLanguage()

/**
 * A callback to reload page. It is set to `null` before {@link Home} is called.
 *
 * @type {() => void | null}
 */
let reloadPage = null

/**
 * Loads a Home page.
 *
 * @param {HTMLDivElement} appContainer A `div#app` element.
 */
function Home (appContainer) {
  while (appContainer.firstChild) {
    appContainer.removeChild(appContainer.firstChild)
  }

  reloadPage = () => Home(appContainer)

  const header = Header()

  const main = document.createElement('main')
  main.appendChild(Headline())

  appContainer.append(header, main)

  if (!appContainer.classList.contains(style.app)) {
    appContainer.classList.add(style.app)
  }
}

function Headline () {
  const headline = document.createElement('div')
  headline.classList.add(style.headline)

  const titleContainer = document.createElement('div')
  titleContainer.classList.add(style.headline__container)

  const currentLanguage = getCurrentLanguage()

  const title = document.createElement('p')
  addClassNames(title, 'headline__title', style, currentLanguage)
  title.classList.add(style.headline__title)

  const titleCaption = currentLanguage.dict('headline-title')

  title.appendChild(
    document.createTextNode(titleCaption))

  const subtitle = document.createElement('p')
  addClassNames(subtitle, 'headline__subtitle', style, currentLanguage)

  const subtitleCaption = currentLanguage.dict('headline-subtitle')

  subtitle.appendChild(
    document.createTextNode(subtitleCaption))

  titleContainer.append(title, subtitle)

  const buttonCaption = currentLanguage.dict('cta')

  const button = Button(buttonCaption, 'large')

  headline.append(titleContainer, button)

  return headline
}

function Header () {
  const header = document.createElement('header')
  header.classList.add(style.header)

  const left = Left()
  const side = Side()

  header.append(left, side)

  return header
}

function Left () {
  const logo = Logo()
  const navigation = Navigation()

  const left = document.createElement('div')
  left.classList.add(style.header__left)

  left.appendChild(logo)
  left.appendChild(navigation)

  return left
}

function Side () {
  const side = document.createElement('div')
  side.classList.add(style.side)

  const buttonCaption = getCurrentLanguage().dict('cta')

  const changeCryptoButton = Button(buttonCaption, 'small')

  const languageSelection = Select(langs, updatedLangs => {
    langs = updatedLangs

    if (!(reloadPage instanceof Function)) {
      throw new Error('Unexpected error. Expected reloadPage to be defined function.')
    }

    reloadPage()
  })

  side.append(changeCryptoButton, languageSelection)

  return side
}

function Button (caption = '', type = 'small') {
  if (!(typeof caption === 'string' || caption instanceof String)) {
    throw new TypeError('Expected caption to be a string.')
  }

  const button = document.createElement('button')
  button.classList.add(style.button)

  button.appendChild(document.createTextNode(caption))

  switch (type) {
    case 'small':
      addClassNames(button, 'button__small', style, getCurrentLanguage())
      break
    case 'large':
      addClassNames(button, 'button__large', style, getCurrentLanguage())
      break

    default:
      throw new TypeError(`Unknown button type: ${type}`)
  }

  return button
}

function Navigation () {
  const navigation = document.createElement('nav')

  const navList = document.createElement('ul')
  navList.classList.add(style.navigation)

  navigation.appendChild(navList)

  const currentLanguage = getCurrentLanguage();

  [
    currentLanguage.dict('left-1'),
    currentLanguage.dict('left-2'),
    currentLanguage.dict('left-3'),
    currentLanguage.dict('left-4'),
    currentLanguage.dict('left-5')
  ].forEach(caption => {
    const listItem = document.createElement('li')
    addClassNames(listItem, 'navigation__item', style, getCurrentLanguage())

    const link = document.createElement('a')
    link.classList.add(style.navigation__link)
    link.appendChild(document.createTextNode(caption))

    listItem.appendChild(link)
    navList.appendChild(listItem)
  })

  return navigation
}

function Logo () {
  const logo = document.createElement('label')
  logo.classList.add(style.logo)
  logo.appendChild(document.createTextNode('Chaingex'))

  return logo
}

export default Home
