// ============================================================
//  ALL EDITABLE CONTENT LIVES HERE.
//  Search for "EDIT ME" to find the things you must change.
// ============================================================

export const CONFIG = {
  // ---------- EDIT ME: personalization ----------
  herName: "Noor",
  myName: "Murtaza",

  // Optional: put an image in /public (e.g. /public/her-photo.jpg) and set "/her-photo.jpg".
  // Leave "" to skip the photo.
  photo: "/Noor.jpg",
  photoCaption: "Happy Birthday Beautiful!",

  // Optional: one or two sentences in your own words, shown in the final reveal. Leave "" to skip.
  personalNote: "Benoor zindagi mein noor chahiye,  
Pur-ashob zindagi mein jeene ka shaoor chahiye,  
Ishq-o-mohabbat se waasta yun toh nahi mera,  
Zindagi mein bas suroor-e-noor chahiye.",

  // Optional: inside jokes, shown as small stickers in the final reveal. Example: ["The pizza incident"]
  insideJokes: [],

  // ---------- Browser tab ----------
  pageTitle: "Okay... I made you something",
  pageDescription: "A small birthday thing. Click everything.",

  // ---------- Landing ----------
  landing: {
    line1: "Okay... I made you something.",
    line2: "Don't judge me until you've clicked everything.",
    cta: "Fine, show me",
  },

  // ---------- The first present ----------
  present: {
    hint: "Tap the present",
    pokeLines: [
      "Hey. Careful with me.",
      "Okay, that tickled.",
      "I'm shy, stop poking.",
      "...fine. Open me.",
    ],
  },

  // ---------- Nested gifts (each box opens to a silly gift + a smaller box) ----------
  // item: sock | coupon | cloud | duck
  layers: [
    {
      id: "sock",
      wrap: "#ff8fb1",
      ribbon: "#fff7fb",
      item: "sock",
      title: "One (1) sock",
      caption: "Not a pair. Just one sock, with confidence.",
      next: "There's another box inside",
    },
    {
      id: "coupon",
      wrap: "#b79cff",
      ribbon: "#f6f1ff",
      item: "coupon",
      title: "Coupon: one dramatic sigh",
      caption: "Redeemable anytime. No refunds.",
      next: "Wait, another one?",
    },
    {
      id: "cloud",
      wrap: "#ffb78f",
      ribbon: "#fff4ec",
      item: "cloud",
      title: "A small personal cloud",
      caption: "Mostly harmless. Water it occasionally.",
      next: "Yes. Another box.",
    },
    {
      id: "duck",
      wrap: "#7fdcc3",
      ribbon: "#effff9",
      item: "duck",
      title: "A rubber duck CEO",
      caption: "Very busy. Mostly quacking. Tap him.",
      next: "Okay, that's enough boxes",
    },
  ],

  // A fake loading screen shown after this layer index has been opened (0-based)
  fakeout: {
    afterLayer: 1,
    title: "Loading your surprise...",
    stuck: "99%... still 99%...",
    reveal: "Kidding.",
    reveal2: "The surprise was making you wait.",
    cta: "Okay, rude. Next box",
  },

  // ---------- Two-choice moment ----------
  choice: {
    intro: "Okay, one last decision...",
    nice: "Be Nice",
    chaosLabels: [
      "Cause Chaos",
      "Wait, are you sure?",
      "Chaos is stretching...",
      "Fine. Chaos it is.",
    ],
    hint: "(Psst. The chaos button gives up eventually.)",
    niceResult: {
      title: "Suspiciously well-behaved.",
      body: "Noted. Gold star for you.",
    },
    chaosResult: {
      title: "Chaos delivered.",
      body: "Zero damage. Maximum style.",
    },
    next: "Open the last thing",
  },

  // ---------- Final reveal ----------
  finale: {
    introNice: "Okay, you've been very well-behaved.",
    introChaos: "Okay. Chaos over. Probably.",
    // {name} and {me} are replaced automatically.
    headline: "Happy Birthday, {name} 🎂",
    lines: [
      "I hope today is annoyingly, ridiculously good to you.",
      "Cake, good news, and zero boring moments.",
    ],
    candleHint: "Tap the candle and make a wish",
    wishLine: "Wish made. No takebacks.",
    signoff: "- {me}",
    secretBonus:
      "Bonus: you found every secret. Impressive. Slightly terrifying.",
    replay: "Replay the chaos",
  },

  // ---------- Hidden discoveries ----------
  secrets: {
    total: 5,
    foundToast: {
      sticker: "Secret found: a very clickable star ✨",
      title: "Secret found: you poked the title",
      shelf: "Secret found: you inspected the shelf",
      duck: "Secret found: the duck is annoyed",
      signoff: "Secret found: you tapped the signature",
    },
    stickerQuips: [
      "Ooh, shiny.",
      "That's just decoration. Or is it?",
      "Okay, you like clicking things.",
      "Nothing here. Probably.",
    ],
    shelfQuips: ["Do not shake the exhibits.", "Museum rules apply."],
    duckQuack: "Quack.",
    duckComplaint: "The duck has filed a complaint.",
  },
};

export const fill = (text) =>
  text.split("{name}").join(CONFIG.herName).split("{me}").join(CONFIG.myName);
