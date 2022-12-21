import { addClassNames } from './i18n-styling'

import tri from '../img/tri.svg'

import style from '../styles/select.module.sass'

/**
 * Defines an option for `<select>` element.
 *
 * @typedef {Object} SelectOption
 * @property {string} name The human-readable name for option.
 * @property {string} value The value for option.
 * @property {string} styleSuffix A stylesheet suffix for element to which I18n is applied.
 * @property {boolean} isCurrent Indicates if option is current.
 */

function isSelectOption (option) {
  return (
    typeof option === 'object' &&
    'name' in option && typeof option.name === 'string' &&
    'value' in option && typeof option.value === 'string' &&
    'isCurrent' in option && typeof option.isCurrent === 'boolean'
  )
}

function hasExactlyOneCurrentOption (options) {
  if (!(Array.isArray(options) && options.every(o => isSelectOption(o)))) {
    throw new TypeError('Expected options to be array of SelectOption')
  }

  const currentOptions = options.filter(o => o.isCurrent)

  return currentOptions.length === 1
}

function hasNoDuplicateValues (options) {
  if (!(Array.isArray(options) && options.every(o => isSelectOption(o)))) {
    throw new TypeError('Expected options to be array of SelectOption')
  }

  return options.every(o =>
    options.filter(innero =>
      innero.value === o.value).length === 1)
}

function sortOptions (options) {
  if (!(Array.isArray(options) && options.every(o => isSelectOption(o)))) {
    throw new TypeError('Expected options to be array of SelectOption')
  }

  if (!hasNoDuplicateValues(options)) {
    throw new Error('options array contains duplicate option values')
  }

  const sortByValue = options => (
    options.map(o => o.value).sort().map(v => options.find(o => o.value === v)))

  const sortByCurrent = options => options.sort((a, b) => b.isCurrent - a.isCurrent)

  return sortByCurrent(sortByValue(options))
}

function Tri () {
  const triEl = document.createElement('img')
  triEl.classList.add(style.tri)
  triEl.src = tri

  return triEl
}

/**
 * Represents Selection component.
 *
 * @param {SelectOption[]} options An array of {@link SelectOption}.
 * @param {(SelectOption[]) => void} onChange A callback function, called after new item selected.
 *
 * @returns {HTMLDivElement} A container containing component's DOM tree.
 */
function Selection (options, onChange) {
  if (!hasNoDuplicateValues(options)) {
    throw new Error('options array contains duplicate option values')
  }

  if (!hasExactlyOneCurrentOption(options)) {
    options = options.map(o => { return { ...o, isCurrent: false } })
    options[0].isCurrent = true
  }

  options = sortOptions(options)

  let isActive = false

  const selectionContainer = document.createElement('div')
  selectionContainer.classList.add(style.selection, style.selection__hidden)

  const toggleSelection = () => {
    isActive = !isActive
    selectionContainer.classList.toggle(style.selection__hidden)
  }

  const selectionButton = document.createElement('div')
  selectionButton.classList.add(style.selection__button)

  selectionButton.addEventListener('click', toggleSelection)

  /**
   *
   * @param {SelectOption} o A select option.
   */
  const createOptionLabel = o => {
    const optionLabel = document.createElement('label')
    addClassNames(optionLabel, 'label', style, o)

    optionLabel.appendChild(document.createTextNode(o.name))
    optionLabel.addEventListener('click', () => {
      setCurrentOption(o)
      toggleSelection()
    })

    selectionContainer.appendChild(optionLabel)
  }

  const setCurrentOption = (newCurrentOption, init = false) => {
    while (selectionButton.firstChild) {
      selectionButton.removeChild(selectionButton.firstChild)
    }

    while (selectionContainer.firstChild) {
      selectionContainer.removeChild(selectionContainer.firstChild)
    }

    options = sortOptions(options.map(o => {
      if (o.value === newCurrentOption.value) {
        return { ...newCurrentOption, isCurrent: true }
      }

      return { ...o, isCurrent: false }
    }))

    const [currentOption, ...restOptions] = options

    const currentLabel = document.createElement('label')
    addClassNames(currentLabel, 'label', style, newCurrentOption)

    currentLabel.appendChild(document.createTextNode(currentOption.name))

    selectionButton.append(currentLabel, Tri())
    selectionContainer.appendChild(selectionButton)

    restOptions.forEach(createOptionLabel)

    if (!init && onChange instanceof Function) {
      onChange(options)
    }
  }

  const [currentOption] = options

  setCurrentOption(currentOption, true)

  return selectionContainer
}

export default Selection
