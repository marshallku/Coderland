import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__info">
        <a
          title="코더랜드 GitHub"
          href="https://github.com"
          target="_blank"
          rel="noreferrer noopener"
          className="footer__github-link"
        >
          <i className="icon-github" aria-label="코더랜드 GitHub" />
        </a>
        <div className="footer__copyright">© 2022 Coderland</div>
      </div>
    </footer>
  );
}
