import addIcon from "../../assets/about-me/icons/add.png";
import arrowRightIcon from "../../assets/about-me/icons/arrow_right.png";
import awardStarAddIcon from "../../assets/about-me/icons/award_star_add.png";
import commentIcon from "../../assets/about-me/icons/comment.png";
import emailIcon from "../../assets/about-me/icons/email.png";
import exclamationIcon from "../../assets/about-me/icons/exclamation.png";
import flagRedIcon from "../../assets/about-me/icons/flag_red.png";
import groupAddIcon from "../../assets/about-me/icons/group_add.png";

import hachiwarePfp from "../../assets/about-me/hachiware.svg";
import murdocPfp from "../../assets/about-me/murdoc.svg";
import zimPfp from "../../assets/about-me/zim.svg";

export type NavLink = { label: string; href: string; title?: string };

export const NAV_LINKS: NavLink[] = [
    { label: "Home", href: "#" },
    { label: "Browse", href: "#" },
    { label: "Search", href: "#" },
    { label: "Messages", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Bulletins", href: "#" },
    { label: "Forum", href: "#" },
    { label: "Groups", href: "#" },
    { label: "Favs", href: "#" },
    { label: "Invite", href: "#" },
    { label: "App", href: "#", title: "SpaceHey Mobile" },
    { label: "Shop", href: "#" },
];

export type ContactAction = { label: string; href: string; icon: string; nofollow?: boolean };

export const CONTACT_ACTIONS: ContactAction[] = [
    { label: "Add to Friends", href: "/addfriend?id=4544508", icon: addIcon, nofollow: true },
    { label: "Add to Favorites", href: "/addfavorite?id=4544508", icon: awardStarAddIcon, nofollow: true },
    { label: "Send Message", href: "#", icon: commentIcon, nofollow: true },
    { label: "Forward to Friend", href: "#", icon: arrowRightIcon, nofollow: true },
    { label: "Instant Message", href: "#", icon: emailIcon, nofollow: true },
    { label: "Block User", href: "/block?id=4544508", icon: exclamationIcon, nofollow: true },
    { label: "Add to Group", href: "/soon?new", icon: groupAddIcon },
    { label: "Report User", href: "/report?type=user&id=4544508", icon: flagRedIcon, nofollow: true },
];

export type InterestRow = { label: string; value: string };

export const INTERESTS: InterestRow[] = [
    { label: "General", value: "music, bass guitars, insects, plants, skateboards, gorillaz, animal crossing" },
    {
        label: "Music",
        value:
            "Gorillaz, Aphex Twin, Oingo Boingo, DEVO, Hail the Sun, Dance Gavin Dance, Acrania, of Montreal, Circa Survive, Obywatel GC, Mella, Mr. Bungle, Paleface Swiss, ISMFOF, Knocked Loose, The Cure, Foxy Shazam, The Smiths, NIN, Soft Cell",
    },
    { label: "OC's", value: "Seven, Five, Dusk, Isum, Craig, Quill, Pitch, Debug, Rex, Slinky, Remy, Phi, Meep" },
    { label: "Television", value: "invader zim, chiikawa, etc" },
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
            "I like to create lots of art in many ways, such as animation, digital art, traditional art, photography, ceramics, and much more. I love music and letting it inspire my art",
        itemProp: "description",
    },
    { heading: "Who I'd like to meet:", body: "Jamie Hewlett, Danny Dlfman, Neil Cicierega, Richard D James" },
];
