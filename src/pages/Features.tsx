import { Link } from 'react-router-dom'
import './Features.css'

interface FeatureItem {
  name: string;
  description: string;
  isActive: boolean;
  route: string;
}

const featureList: FeatureItem[] = [
  { name: "WebDJ", description: "A web-based DJing tool", isActive: true, route: "/features/webdj"},
  { name: "BrowserLab", description: "An embedded web browser mockup lab", isActive: true, route: "/features/browserlab" }
]

export default function Features() {
  return (
    <div className="home">
      <center><h1>Features</h1></center>
      <hr/>
      <div className="blob blob-teal">
        <div className="cards">
          { featureList.map(feature => (
            <div className="card" key={feature.name}>
              <h2>{feature.name}</h2>
              <span>Description: </span>
              <p>{feature.description}</p>
              <Link to={feature.route} className="btn btn-outline flex">Open →</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}