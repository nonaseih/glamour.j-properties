export default function SiteLoader({ visible }) {
  return (
    <div className={`site-loader${visible ? '' : ' site-loader--done'}`} aria-hidden="true">
      <div className="site-loader__progress" />
      <div className="site-loader__inner">
        <svg width="52" height="52" viewBox="0 0 30 30" fill="none">
          <circle cx="15" cy="15" r="13.5" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5"/>
          <clipPath id="sl-half"><rect x="0" y="0" width="15" height="30"/></clipPath>
          <circle cx="15" cy="15" r="13.5" fill="white" clipPath="url(#sl-half)"/>
        </svg>
        <div className="site-loader__text">
          <span className="site-loader__name">JAY. G™</span>
          <span className="site-loader__sub">Properties &amp; Rentals Co.</span>
        </div>
      </div>
      <div className="site-loader__track">
        <div className="site-loader__fill" />
      </div>
    </div>
  )
}
