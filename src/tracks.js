import imgSrc from "./assets/artwork.jpg";
import imgSrc2 from "./assets/artwork2.jpg";
import imgSrc3 from "./assets/artwork3.jpg";
import cali from "./assets/cali-wataboi.mp3";
import fifty from "./assets/50-tobylane.mp3";
import iwonder from "./assets/iwonder-dreamheaven.mp3";
const tracks = [
  {
    id: 1,
    title: "Pho Khong Em",
    artist: "Thai Dinh",
    audioSrc: require("./assets/PhoKhongEm-Thai Dinh.mp3"),
    image: imgSrc,
    duration: "4:40",
  },
  {
    id: 2,
    title: "Co Em Doi Bong Vui",
    artist: "Chillies",
    audioSrc: require("./assets/CoEmDoiBongVui-Chillies.mp3"),
    image: imgSrc2,
    duration: "4:07",
  },
  {
    id: 3,
    title: "Until You",
    artist: "Shayne Ward",
    audioSrc: require("./assets/Until You - Shayne Ward.mp3"),
    image: imgSrc3,
    duration: "4:08",
  },
  {
    id: 4,
    title: "Cali",
    artist: "Wataboi",
    audioSrc: cali,
    image: imgSrc,
    duration: "3:00",
  },
  {
    id: 5,
    title: "50",
    artist: "tobylane",
    audioSrc: fifty,
    image: imgSrc2,
    duration: "2:34",
  },
  {
    id: 6,
    title: "I Wonder",
    artist: "DreamHeaven",
    audioSrc: iwonder,
    image: imgSrc3,
    duration: "3:18",
  },
];
export default tracks;
