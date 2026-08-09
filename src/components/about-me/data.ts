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
import hachiwarePfp from "../../assets/about-me/profiles/hachiware.svg";
import murdocPfp from "../../assets/about-me/profiles/murdoc.svg";
import zimPfp from "../../assets/about-me/profiles/zim.svg";
import type { Page } from "../../utils/parseImageConfig";

export type NavLink = { label: string; href?: string; navigateTo?: Page, hyperlink?: boolean };

export const NAV_LINKS: NavLink[] = [
    { label: "Home", navigateTo: "home"  },
    { label: "Socials", navigateTo: "social-media" },
    { label: "Digital", navigateTo: "digital" },
    { label: "Traditional", navigateTo: "traditional" },
    { label: "Shop", navigateTo: "commission" },
    { label: "7\\", href: "https://youtu.be/SqayDnQ2wmw?si=wSCyIyzGNIYscSGz" }, // link spotify
    { label: "MV", href: "https://youtu.be/WXR-bCF5dbM?si=fmFLWXkdMhq6A8Xb" }, // favorite gorliazz music video
    { label: "Animation", href: "https://youtu.be/f0g0jzm0mYA?si=--F9L6vPUCRamI5A" }, // favorite animation
    { label: "Inspiration", href: "https://www.jenniferxiao.com/", hyperlink: true }, // link website i inspired from
    { label: "DEVO", href: "https://youtu.be/fUJNty7Q76k?si=5_KeUp3PApK0NTS4" }, // link website i inspired from
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
    { label: "General", value: "I enjoy so many genres of music, including metal, electronic, swancore, new wave, and much more. I also play the bass guitar for a band. I love insects, especially hercules beetles. I also love plants, skateboards, Animal Crossing, aliens, liminal/industrial photography, Tetris, Gorillaz, Animal Jam, Minecraft, CDs, cassettes, old cameras/cars, and of course I love art." },
    {
        label: "Music",
        value:
            "Gorillaz, Aphex Twin, Oingo Boingo, DEVO, Hail the Sun, Dance Gavin Dance, Acrania, of Montreal, Circa Survive, Obywatel GC, Mella, Mr. Bungle, Paleface Swiss, ISMFOF, Knocked Loose, The Cure, Foxy Shazam, The Smiths, NIN, Soft Cell",
    },
    { label: "OC's", value: "Seven, Five, Dusk, Isum, Craig, Quill, Pitch, Debug, Rex, Slinky, Remy, Phi, Meep" },
    { label: "Television", value: "Invader Zim, Chiikawa, Aggretsuko, Saiki K, Smiling Friends, All Tim Burton movies & Studio Ghibli movies, Guardians of the Galaxy, Scott Pilgrim, Donnie Darko, Parks & Recs, House MD, TAWOG, Breaking Bad, Pokémon, Gorillaz MV's?" },
];

export type Friend = { name: string; href: string; pfp: string; alt: string; verifiedReason: string };

export const FRIENDS: Friend[] = [
    { name: "hachiware", href: "", pfp: hachiwarePfp, alt: "An's profile picture", verifiedReason: "Creator of SpaceHey" },
    { name: "zim", href: "", pfp: zimPfp, alt: "An's profile picture", verifiedReason: "Creator of SpaceHey" },
    { name: "murdoc", href: "/profile?id=2", pfp: murdocPfp, alt: "SpaceHey's profile picture", verifiedReason: "Official Brand Account" },
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
