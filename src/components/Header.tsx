import image from "../assets/dream-logo.png";

export default function Header() {
  return (
    <header>
      <div className="header-inner">
        <img
          src={image}
          className="logo"
          alt="DreamCatcher logo"
        />

        <h1>DreamCatcher</h1>
      </div>

      <p className="subtitle">
        Record your dreams and discover their meanings
      </p>
    </header>
  );
}