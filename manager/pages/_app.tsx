/* eslint-disable react/jsx-props-no-spreading */
import { css, Global } from '@emotion/react'
import '@src/css/tailwind.css'
import { store } from '@src/store/store'
import ParentApp from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import 'tippy.js/dist/tippy.css'

const globalCss = css`
  *:focus {
    outline: none !important;
  }

  html,
  body,
  #__next {
    height: 100%;
  }
`
class MyApp extends ParentApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider store={store}>
        <Global styles={globalCss} />
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default MyApp
