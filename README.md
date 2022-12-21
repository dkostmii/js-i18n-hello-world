# js-i18n-hello-world

This project includes a simple case for I18N translation in SPA app.

A language data is included in [home.js](./src/js/home.js) in `langs` array.

Logic for detecting language from `navigator.language` is also included.

Styling for i18n-translated elements is applied using `stylingSuffix` property in `langs` array and SASS class matching, as in [select.module.sass](./src/styles/select.module.sass) (styling suffix is `__i18n_ukr`):

```sass
.selection > .label
  font-family: 'Poppins'
  font-style: normal
  font-weight: 400
  font-size: 16px
  line-height: 24px
  /* identical to box height */

  /* OnBackground */
  color: $onBackground

  &__i18n_ukr
    font-family: 'Open Sans'
    font-style: normal
    font-weight: 400
    font-size: 16px
    line-height: 22px
    /* identical to box height */
```
