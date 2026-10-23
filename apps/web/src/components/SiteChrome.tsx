import type { ComponentType } from 'react'
import type { SiteSettings, SocialPlatform } from '@tracker/shared'
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaTelegram, FaXTwitter, FaYoutube } from 'react-icons/fa6'

const SOCIAL_ICONS: Record<SocialPlatform, { label: string; Icon: ComponentType<{ 'aria-hidden'?: boolean }> }> = {
  github: { label: 'GitHub', Icon: FaGithub },
  telegram: { label: 'Telegram', Icon: FaTelegram },
  linkedin: { label: 'LinkedIn', Icon: FaLinkedinIn },
  instagram: { label: 'Instagram', Icon: FaInstagram },
  facebook: { label: 'Facebook', Icon: FaFacebookF },
  youtube: { label: 'YouTube', Icon: FaYoutube },
  x: { label: 'X (Twitter)', Icon: FaXTwitter },
}

export function SiteHeader({ site }: { site?: SiteSettings }) {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <a href="/" className="brand">
          {site?.brandName ?? 'Internship Tracker'}
        </a>
        <ul className="nav-list">
          {site?.nav.map((link) => (
            <li key={link.href + link.label}>
              <a
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export function SiteFooter({ site }: { site?: SiteSettings }) {
  return (
    <footer className="footer" id="contacts">
      <div className="container footer-bottom">
        <span>{site?.footerText ?? '© Internship Tracker'}</span>
        {site && site.socials.length > 0 && (
          <ul className="footer-socials" aria-label="Соцмережі">
            {site.socials.map(({ platform, url }) => {
              const { label, Icon } = SOCIAL_ICONS[platform]
              return (
                <li key={platform + url}>
                  <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
                    <Icon aria-hidden />
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </footer>
  )
}
