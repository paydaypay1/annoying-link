import Header from './layout/Header'
import Navigation from './layout/Navigation'
import MainContent from './layout/MainContent'
import Footer from './layout/Footer'
import "./layout/Layout.css"

import './shared/CommonElements.css'
import './shared/Animations.css'
import 'animate.css'

const featureRoutes = [
  "/features/webdj",
  "/features/browserlab"
]
const isMinimalView = (featureRoutes.includes(window.location.pathname))

export default function App() {
  if ( isMinimalView ){
    return (
      <div className="layout">
        <MainContent/>
      </div>
    )
  } else {  
    return (
      <div className="layout">
        <Header />
        <Navigation />
        <MainContent />
        <Footer/>
      </div>
    )
  }
}
