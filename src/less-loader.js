import pify from 'pify'
import { localRequire, normalizePath } from './utils'

export default {
  name: 'less',
  test: /\.less$/,
  async process({ code }) {
    const less = localRequire('less')

    let { css, map } = await pify(less.render.bind(less))(code, {
      sourceMap: this.sourceMap && {},
      filename: this.id,
      relativeUrls: true
    })

    if (map) {
      map = JSON.parse(map)
      map.sources = map.sources.map(source => normalizePath(source))
    }

    return {
      code: css,
      map
    }
  }
}
