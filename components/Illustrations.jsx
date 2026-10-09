// All artwork is inline SVG so the project stays fully self-contained.

export function GiftBox({ wrap = "#ff8fb1", ribbon = "#fff", opened = false, shake = false, className = "" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`gift ${opened ? "is-open" : ""} ${shake ? "gift-shake" : ""} ${className}`}
      aria-hidden="true"
    >
      <ellipse cx="100" cy="184" rx="64" ry="8" fill="rgba(90,50,130,.16)" />
      <rect x="40" y="94" width="120" height="86" rx="14" fill={wrap} />
      <rect x="40" y="94" width="120" height="86" rx="14" fill="#fff" opacity=".12" />
      <rect x="40" y="150" width="120" height="30" rx="14" fill="#000" opacity=".06" />
      <rect x="90" y="94" width="20" height="86" fill={ribbon} />
      <g className="gift-lid">
        <rect x="30" y="66" width="140" height="34" rx="12" fill={wrap} />
        <rect x="30" y="66" width="140" height="34" rx="12" fill="#fff" opacity=".2" />
        <rect x="90" y="66" width="20" height="34" fill={ribbon} />
        <ellipse cx="78" cy="58" rx="22" ry="14" fill={ribbon} transform="rotate(-18 78 58)" />
        <ellipse cx="122" cy="58" rx="22" ry="14" fill={ribbon} transform="rotate(18 122 58)" />
        <ellipse cx="78" cy="58" rx="12" ry="7" fill={wrap} opacity=".35" transform="rotate(-18 78 58)" />
        <ellipse cx="122" cy="58" rx="12" ry="7" fill={wrap} opacity=".35" transform="rotate(18 122 58)" />
        <circle cx="100" cy="62" r="9" fill={ribbon} />
        <circle cx="100" cy="62" r="9" fill="none" stroke={wrap} strokeWidth="2" opacity=".5" />
      </g>
    </svg>
  );
}

export function Sock() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <path d="M44 10H74V60L96 76Q106 87 98 98Q92 105 80 105H54Q38 105 38 88Q38 76 44 66Z" fill="#fff" stroke="#c9b3ee" strokeWidth="3" strokeLinejoin="round" />
      <rect x="44" y="10" width="30" height="16" fill="#ff8fb1" />
      <rect x="44" y="34" width="30" height="7" fill="#b79cff" />
      <rect x="44" y="48" width="30" height="7" fill="#b79cff" />
      <path d="M44 88Q52 98 70 96" fill="none" stroke="#ffb78f" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export function Coupon() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <g transform="rotate(-6 60 60)">
        <path d="M12 34H108V50A8 8 0 0 0 108 66V82H12V66A8 8 0 0 0 12 50Z" fill="#fff4b8" stroke="#e7b94a" strokeWidth="3" strokeLinejoin="round" />
        <path d="M30 38V78" stroke="#e7b94a" strokeWidth="2" strokeDasharray="4 4" />
        <text x="70" y="55" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="17" fontWeight="700" fill="#7a5a10">ONE</text>
        <text x="70" y="72" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="17" fontWeight="700" fill="#7a5a10">SIGH</text>
        <path d="M20 52L20 64M16 58H24" stroke="#ff8fb1" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function Cloud() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <g fill="#fff" stroke="#cdbcf0" strokeWidth="3">
        <circle cx="42" cy="68" r="22" />
        <circle cx="68" cy="56" r="26" />
        <circle cx="88" cy="72" r="18" />
        <rect x="30" y="68" width="68" height="22" rx="11" />
      </g>
      <g fill="#fff">
        <circle cx="42" cy="68" r="19" />
        <circle cx="68" cy="56" r="23" />
        <circle cx="88" cy="72" r="15" />
        <rect x="32" y="70" width="64" height="18" rx="9" />
      </g>
      <circle cx="58" cy="72" r="3" fill="#3b2a4a" />
      <circle cx="78" cy="72" r="3" fill="#3b2a4a" />
      <path d="M62 80Q68 85 74 80" fill="none" stroke="#3b2a4a" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="52" cy="80" r="4" fill="#ffb3c8" opacity=".7" />
      <circle cx="84" cy="80" r="4" fill="#ffb3c8" opacity=".7" />
      <path d="M52 100v8M66 102v8M80 100v8" stroke="#9fd4ff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Duck() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <ellipse cx="62" cy="82" rx="38" ry="26" fill="#ffd84d" />
      <path d="M92 74Q108 66 106 52Q96 58 88 62Z" fill="#ffd84d" />
      <circle cx="46" cy="46" r="24" fill="#ffd84d" />
      <path d="M26 50Q12 52 16 60Q28 62 34 56Z" fill="#ff9a3c" />
      <circle cx="46" cy="42" r="3.5" fill="#3b2a4a" />
      <circle cx="47" cy="41" r="1.2" fill="#fff" />
      <path d="M62 86Q76 78 84 90Q70 98 56 94Z" fill="#f5c22a" />
      <path d="M44 70L50 76L44 92L38 76Z" fill="#7c5cd6" />
      <circle cx="30" cy="54" r="3.5" fill="#ff8fb1" opacity=".7" />
      <rect x="34" y="20" width="24" height="9" rx="2" fill="#3b2a4a" />
    </svg>
  );
}

export const ITEMS = { sock: Sock, coupon: Coupon, cloud: Cloud, duck: Duck };

export function Sticker({ k }) {
  switch (k) {
    case "star":
      return (
        <svg viewBox="0 0 60 60" aria-hidden="true">
          <path d="M30 6L37 22L54 24L41 36L45 53L30 44L15 53L19 36L6 24L23 22Z" fill="#ffe28a" stroke="#fff" strokeWidth="3" strokeDasharray="5 4" strokeLinejoin="round" />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 60 60" aria-hidden="true">
          <path d="M30 52C8 36 8 14 22 12C27 12 30 16 30 18C30 16 33 12 38 12C52 14 52 36 30 52Z" fill="#ff9ec0" stroke="#fff" strokeWidth="3" />
        </svg>
      );
    case "balloon":
      return (
        <svg viewBox="0 0 60 90" aria-hidden="true">
          <ellipse cx="30" cy="30" rx="22" ry="26" fill="#b79cff" stroke="#fff" strokeWidth="3" />
          <ellipse cx="22" cy="20" rx="5" ry="8" fill="#fff" opacity=".45" transform="rotate(20 22 20)" />
          <path d="M30 56L26 62H34Z" fill="#b79cff" />
          <path d="M30 62C24 70 36 76 30 86" fill="none" stroke="#a590cc" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "balloon2":
      return (
        <svg viewBox="0 0 60 90" aria-hidden="true">
          <ellipse cx="30" cy="30" rx="22" ry="26" fill="#ffb78f" stroke="#fff" strokeWidth="3" />
          <ellipse cx="22" cy="20" rx="5" ry="8" fill="#fff" opacity=".45" transform="rotate(20 22 20)" />
          <path d="M30 56L26 62H34Z" fill="#ffb78f" />
          <path d="M30 62C36 70 24 76 30 86" fill="none" stroke="#c9a08a" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "sparkle":
      return (
        <svg viewBox="0 0 60 60" aria-hidden="true">
          <path d="M30 4C32 20 40 28 56 30C40 32 32 40 30 56C28 40 20 32 4 30C20 28 28 20 30 4Z" fill="#fff" stroke="#e5d6ff" strokeWidth="2" />
        </svg>
      );
    case "cloud":
      return (
        <svg viewBox="0 0 90 50" aria-hidden="true">
          <path d="M20 42A14 14 0 0 1 22 14A18 18 0 0 1 56 12A16 16 0 0 1 72 42Z" fill="#fff" opacity=".85" />
        </svg>
      );
    default:
      return null;
  }
}

export function Cake({ lit = true }) {
  return (
    <svg viewBox="0 0 200 190" aria-hidden="true" className="cake">
      <ellipse cx="100" cy="176" rx="80" ry="9" fill="rgba(90,50,130,.16)" />
      <rect x="28" y="110" width="144" height="62" rx="16" fill="#ffd9e6" />
      <rect x="28" y="150" width="144" height="22" rx="11" fill="#ffb7cf" />
      <rect x="46" y="76" width="108" height="42" rx="14" fill="#fff0f5" />
      <path d="M46 96Q56 112 68 96Q80 112 92 96Q104 112 116 96Q128 112 140 96Q148 108 154 96V92H46Z" fill="#ff9ec0" />
      <circle cx="62" cy="130" r="5" fill="#fff" />
      <circle cx="100" cy="134" r="5" fill="#b79cff" />
      <circle cx="138" cy="130" r="5" fill="#fff" />
      <rect x="95" y="46" width="10" height="34" rx="4" fill="#9be7d0" />
      <path d="M95 56L105 52M95 66L105 62M95 76L105 72" stroke="#fff" strokeWidth="3" />
      {lit ? (
        <g className="flame">
          <ellipse cx="100" cy="32" rx="9" ry="15" fill="#ffb347" />
          <ellipse cx="100" cy="36" rx="5" ry="9" fill="#fff2a8" />
        </g>
      ) : (
        <path className="smoke" d="M100 44C94 36 106 30 100 20C96 14 104 8 100 2" fill="none" stroke="#b9a8d8" strokeWidth="3" strokeLinecap="round" />
      )}
    </svg>
  );
}
