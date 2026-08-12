import logoImage from '../assets/logo.jpg';

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImage} alt="BiteHub logo" />
        <h1>BiteHub</h1>
      </div>
      <nav>
        <button>Cart (0) </button>
      </nav>
    </header>
  );
}
