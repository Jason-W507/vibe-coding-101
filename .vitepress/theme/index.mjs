import DefaultTheme from 'vitepress/theme'
import ReadingProgressDemo from './components/ReadingProgressDemo.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ReadingProgressDemo', ReadingProgressDemo)
  }
}
