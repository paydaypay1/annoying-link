export default function PrivacyPolicy() {
  return (
    <div className="privacy-policy">
      <span className="btn btn-lg btn-outline closePrivacyPolicy" onClick={(event: React.MouseEvent<HTMLSpanElement>): void => {console.log(event.target); document.querySelector(".privacy-policy")?.classList.add("is-hidden")}}>X</span>
        <h1>Information We Collect and Why</h1>
        <h4>
          We automatically collect and store certain information about your
          visit to maintain website security and improve your user experience.
        </h4>
        <h2>What we collect:</h2>
        <h3>IP Addresses (Anonymized): </h3>
        <p>We temporarily process your Internet Protocol (IP) address.</p>
        <h2>How we anonymize it: </h2>
        <p>
          We hash the IP address (MD5 cryptography standard) before any
          permanent storage.
        </p>
        <h2>Why we collect it:</h2>
        We use this anonymized location data for two specific purposes:
        <h3>Security: </h3>
        <p>
          We analyze geographic origin to detect and mitigate malicious
          activities like cyberattacks or automated bot traffic.
        </p>
        <h3>Usage Statistics: </h3>
        <p>
          We evaluate traffic trends by country or region to understand where
          our audience is located and optimize site performance.
        </p>
        <h2>Data Sharing and Retention:</h2>
        <p>
          Because the IP address is anonymized before storing, it cannot be
          linked to you personally. <strong>We do not sell this data.</strong>We
          only share it with our trusted analytics, hosting, and security
          partners. Anonymized logs are retained only as long as necessary for
          security audits and traffic trend analysis.
        </p>
    </div>
  )
}
