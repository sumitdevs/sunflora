/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './*.html'
  ],
  theme: {
    extend: {
      fontFamily:{
        ff_heading:["Frank Ruhl Libre", "serif"],
        ff_body:["Lato", "serif"]
      },
      colors:{
        clr_primary_900:"#1A3306",
        clr_accent_900:"#1A3306",
        clr_accent_800:"#004807",
        clr_accent_500:"#11A500",
        clr_accent_300:"#8FB745",
        clr_accent_100:"#DDFABA",
        clr_neutral_900:"#202020",
        clr_star_100:"#FFC736",
        clr_card_100:"#F2F8EC",
      },
    },
  },
  plugins: [],
}

