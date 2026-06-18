import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Get to Know Us</h3>
          <p>About Us</p>
          <p>Careers</p>
          <p>Press Releases</p>
        </div>

        <div className="footer-section">
          <h3>Connect With Us</h3>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>Twitter</p>
        </div>

        <div className="footer-section">
          <h3>Help</h3>
          <p>Your Account</p>
          <p>Returns Centre</p>
          <p>Customer Service</p>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Amazon Clone | Built with React
      </div>
    </footer>
  );
}

export default Footer;