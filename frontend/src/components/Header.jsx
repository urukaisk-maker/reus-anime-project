export default function Header({ profile }) {
  return (
    <header className="header">
      <div className="header-inner">
        <p className="kicker">// SECTOR REUS-TARRAGONA :: ONLINE</p>
        <h1 className="name">{profile.name}</h1>
        <p className="alias">@{profile.alias}</p>
        <h2 className="title">{profile.title}</h2>
        <p className="bio">{profile.bio}</p>
        <p className="location">📍 {profile.location}</p>
        <nav className="links">
          {profile.links.map((l) => (
            <a key={l.label} href={l.url} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
