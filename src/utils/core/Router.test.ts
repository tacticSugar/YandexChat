import { expect } from 'chai'
import { Router } from './Router'
import { JSDOM } from 'jsdom'
import 'mocha'

import { Block } from './Block'

type Page = {
  classPage: string
}

export class Page1 extends Block<Page> {
  constructor(props: Page) {
    super('div', props)
  }

  render() {
    return this.compile('div page', {
      classPage: this.props.classPage,
    })
  }
}

export class Page2 extends Block<Page> {
  constructor(props: Page) {
    super('div', props)
  }

  render() {
    return this.compile('div page', {
      classPage: this.props.classPage,
    })
  }
}

const jsdom = new JSDOM(
  `<html>
     <body>
      <div id="root"></div>
     </body>
   </html>`,
  { url: 'https://localhost:3000/' }
)

window = jsdom.window as unknown as Window & typeof globalThis
document = jsdom.window.document

describe('Router', () => {
  const router = new Router()
  router.use('/sign-in', Page1, false).use('/error', Page2, false)

  it('Check adding', () => {
    router.start()
    router.go('/sign-in')
    router.go('/error')
    expect(router.history?.length).to.eq(3)
  })

  it('Check current route', () => {
    router.start()
    router.go('/error')
    expect(router.currentRoute?.pathname).to.eq('/error')
  })
})
