function getI18nClassName (styleModule, defaultClassName, styleSuffix) {
  if (!(defaultClassName in styleModule)) {
    throw new Error(`No .${defaultClassName} class in styleModule.`)
  }

  const key = defaultClassName + styleSuffix

  if (key in styleModule) {
    return styleModule[key]
  }

  return ''
}

/**
 * Adds all essential styling classes for element, including I18n ones.
 *
 * @param {HTMLElement} element An element instance to style.
 * @param {*} defaultClassName Default class name accessor in {@link styleModule}.
 * @param {*} styleModule SASS style module from `import style from './style.module.sass'` expression
 * @param {*} language A language to style {@link element} with.
 */
export function addClassNames (element, defaultClassName, styleModule, language) {
  if (!(element instanceof HTMLElement)) {
    throw new TypeError('Expected element to be HTMLElement')
  }

  element.classList.add(styleModule[defaultClassName])

  if (language.styleSuffix) {
    const i18nClassName = getI18nClassName(styleModule, defaultClassName, language.styleSuffix)

    if (i18nClassName) {
      element.classList.add(i18nClassName)
    }
  }
}
