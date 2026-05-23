import Header from './layout/Header'
import MainContent from './layout/MainContent'
import Footer from './layout/Footer'
import "./layout/Layout.css"

import './shared/CommonElements.css'
import './shared/Animations.css'

const isMinimalView = (window.location.pathname.startsWith('/features/'))

export default function App() {
  if ( isMinimalView ){
    return (
      <div className="layout">
        <MainContent/>
        <Footer/>
      </div>
    )
  } else {
    return (
      <div className="layout">
        <Header/>
        <MainContent />
        <Footer/>
      </div>
    )
  }
}
