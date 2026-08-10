import addIcon from "../../assets/about-me/icons/add.png";
import arrowRightIcon from "../../assets/about-me/icons/arrow_right.png";
import awardStarAddIcon from "../../assets/about-me/icons/award_star_add.png";
import commentIcon from "../../assets/about-me/icons/comment.png";
import emailIcon from "../../assets/about-me/icons/email.png";
import exclamationIcon from "../../assets/about-me/icons/exclamation.png";
import flagRedIcon from "../../assets/about-me/icons/flag_red.png";
import groupAddIcon from "../../assets/about-me/icons/group_add.png";
import sound1 from "../../assets/about-me/sfx/cat-meow.mp3"
import sound2 from "../../assets/about-me/sfx/fainted.mp3"
import sound3 from "../../assets/about-me/sfx/thunderstorm.mp3"
import sound4 from "../../assets/about-me/sfx/mlg-horns.mp3"
import sound5 from "../../assets/about-me/sfx/mario-kart-star.mp3"
import sound6 from "../../assets/about-me/sfx/minecraft-click.mp3"
import sound7 from "../../assets/about-me/sfx/minecraft-drinking.mp3"
import sound8 from "../../assets/about-me/sfx/chiikawa-unana.mp3"
import hachiwarePfp from "../../assets/about-me/profiles/hachiware.jpg";
import murdocPfp from "../../assets/about-me/profiles/murdoc.jpg";
import zimPfp from "../../assets/about-me/profiles/zim.svg";
import hachiwarePfpAlt from "../../assets/about-me/profiles/hachiware-alt.jpg";
import murdocPfpAlt from "../../assets/about-me/profiles/murdoc-alt.svg";
import zimPfpAlt from "../../assets/about-me/profiles/zim-alt.svg";

import hachiwareSound1 from "../../assets/about-me/profiles/hachiware-sound1.mp3";
import hachiwareSound2 from "../../assets/about-me/profiles/hachiware-sound2.mp3";
import hachiwareSound3 from "../../assets/about-me/profiles/hachiware-sound3.mp3";
import murdocSound1 from "../../assets/about-me/profiles/murdoc-sound1.mp3";
import murdocSound2 from "../../assets/about-me/profiles/murdoc-sound2.mp3";
import murdocSound3 from "../../assets/about-me/profiles/murdoc-sound3.mp3";
import zimSound1 from "../../assets/about-me/profiles/zim-sound1.mp3";
import zimSound2 from "../../assets/about-me/profiles/zim-sound2.mp3";
import zimSound3 from "../../assets/about-me/profiles/zim-sound3.mp3";
import type { Page } from "../../utils/parseImageConfig";

export type NavLink = { label: string; href?: string; navigateTo?: Page, hyperlink?: boolean };

export const NAV_LINKS: NavLink[] = [
    { label: "MV", href: "https://youtu.be/WXR-bCF5dbM?si=fmFLWXkdMhq6A8Xb" }, // favorite gorliazz music video
    { label: "Animation", href: "https://youtu.be/f0g0jzm0mYA?si=--F9L6vPUCRamI5A" }, // favorite animation
    { label: "7\\", href: "https://youtu.be/SqayDnQ2wmw?si=wSCyIyzGNIYscSGz" }, // link spotify
    { label: "Oingo", href: "https://youtu.be/l4ck-3K2eO8?si=QjKVCXhHYWrDHzKz" },
    { label: "DEVO", href: "https://youtu.be/fUJNty7Q76k?si=5_KeUp3PApK0NTS4" }, // link website i inspired from" },
       { label: "Cool!", href: "https://toandromedaandback.com/index" },
    { label: "Inspo 1", href: "https://www.jenniferxiao.com/" },
    { label: "Inspo 2", href: "https://leopardotted.neocities.org/" },
    { label: "Inspo 3", href: "https://www.are.na/evan-collins-1522646491/wacky-pomo" },
    { label: "Inspo 4", href: "https://frutigeraeroarchive.org/" },


    { label: "?", href: "https://youtu.be/H4dGpz6cnHo?si=4vXs-YnIrBkH1NJo" }, 
];

export type ContactAction = { label: string; icon: string; sfx: string };

export const CONTACT_ACTIONS: ContactAction[] = [
    { label: "Add to Friends", icon: addIcon, sfx: sound1 },
    { label: "Add to Favorites", icon: awardStarAddIcon, sfx: sound2 },
    { label: "Send Message", icon: commentIcon, sfx: sound3 },
    { label: "Forward to Friend", icon: arrowRightIcon, sfx: sound8 },
    { label: "Instant Message", icon: emailIcon, sfx: sound4 },
    { label: "Block User", icon: exclamationIcon, sfx: sound5 },
    { label: "Add to Group", icon: groupAddIcon, sfx: sound6},
    { label: "Report User", icon: flagRedIcon, sfx: sound7  },
];

export type InterestRow = { label: string; value: string };

export const INTERESTS: InterestRow[] = [
    { label: "General", value: "I love music, beetles, skateboards, liminal/industrial photography, old internet/websites/games, physical media, old cameras/cars, thrift stores, and of course, art. I enjoy many genres of music, including metal, electronic, swancore, new wave, emo, and much more. I also play the bass guitar in a band!" },
    {
        label: "Music",
        value:
            "Gorillaz, Aphex Twin, Oingo Boingo, DEVO, Hail the Sun, Dance Gavin Dance, Acrania, of Montreal, Circa Survive, Obywatel GC, Mella, Mr. Bungle, Paleface Swiss, ISMFOF, Knocked Loose, The Cure, Foxy Shazam, The Smiths, NIN, Soft Cell",
    },
    { label: "OC's", value: "Seven, Five, Dusk, Isum, Craig, Quill, Pitch, Debug, Rex, Slinky, Remy, Phi, Meep" },
    { label: "Television", value: "Invader Zim, Chiikawa, Aggretsuko, Saiki K, Smiling Friends, All Tim Burton movies & Studio Ghibli movies, Guardians of the Galaxy, Scott Pilgrim, Donnie Darko, Parks & Recs, House MD, TAWOG, Breaking Bad, Pokémon, Gorillaz MV's?" },
];

export type Friend = { name: string; href: string; pfp: string; pfpAlt: string; alt: string; verifiedReason: string; sfx: string[] };

export const FRIENDS: Friend[] = [
    { name: "hachiware", href: "", pfp: hachiwarePfp, pfpAlt: hachiwarePfpAlt, alt: "An's profile picture", verifiedReason: "Creator of SpaceHey", sfx: [hachiwareSound1, hachiwareSound2, hachiwareSound3] },
    { name: "zim", href: "", pfp: zimPfp, pfpAlt: zimPfpAlt, alt: "An's profile picture", verifiedReason: "Creator of SpaceHey", sfx: [zimSound1, zimSound2, zimSound3] },
    { name: "murdoc", href: "/profile?id=2", pfp: murdocPfp, pfpAlt: murdocPfpAlt, alt: "SpaceHey's profile picture", verifiedReason: "Official Brand Account", sfx: [murdocSound1, murdocSound2, murdocSound3] },
];

export type Comment = { author: string; profileHref: string; pfp: string; alt: string; ago: string; commentHref: string; body: string };

export const COMMENTS: Comment[] = [
    {
        author: "hachiware",
        profileHref: "/profile?id=1",
        pfp: hachiwarePfp,
        alt: "chick's profile picture",
        ago: "a few seconds ago",
        commentHref: "/comment?id=1",
        body: "なんとかなれ",
    },
    {
        author: "murdoc",
        profileHref: "/profile?id=2",
        pfp: murdocPfp,
        alt: "murdoc's profile picture",
        ago: "2 days ago",
        commentHref: "/comment?id=2",
        body: "This is me, cutting an onion.",
    },
];

export type Blurb = { heading: string; body: string; itemProp?: string };

export const BLURBS: Blurb[] = [
    {
        heading: "About me:",
        body:
            "I enjoy creating art lots of art in many ways and mediums, such as animation, digital art, traditional art, photography, ceramics, and much more. I love music and letting it inspire my art while creating! My major focus is in original character creating/building, as well as animation.",
        itemProp: "description",
    },
    { heading: "Who I'd like to meet:", body: "Jamie Hewlett, Danny Dlfman, Neil Cicierega, Richard D James" },
];

export type ScaleNote = { freq: number; stem: "up" | "down" };

export const SCALE: ScaleNote[] = [
    {  freq: 261.63, stem: "up" },
    {  freq: 293.66, stem: "up" },
    {  freq: 329.63, stem: "up" },
    {  freq: 349.23, stem: "up" },
    {  freq: 392.0, stem: "up" },
    {  freq: 440.0, stem: "up" },
    {  freq: 493.88, stem: "down" },
    {  freq: 523.25, stem: "down" },
];
