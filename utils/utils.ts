import moment from "moment";


export const MAIN_COLOR = "#f0c654";
export const TAB_INACTIVE_COLOR = "black";
export const TAB_ACTIVE_COLOR = "black";
export const BLACK_COLOR = "#111";
export const WHITE = "white";
export const PINK = "#F24822";
export const GRAY = "gray";
export const LIGHT_GRAY = "#e1e3e1";
export const LIGHT_GRAY_2 = "#faf8f7";
export const LIGHT_RED = "#f75e73";



// KEYS

export const LANG_STORE = "lang"

//DEFAULTS 
export const DEFAULT_LANGUAGE = "tr";

export const keyGenerator = (id:string) => {
    return "interest_"+id
}

moment.updateLocale('en', {
    relativeTime : {
        future: "in %s",
        past:   "%s ago",
        s  : 'a few seconds',
        ss : '%d seconds',
        m:  "a minute",
        mm: "%d minutes",
        h:  "an hour",
        hh: "%d hours",
        d:  "a day",
        dd: "%d days",
        w:  "a week",
        ww: "%d weeks",
        M:  "a month",
        MM: "%d months",
        y:  "a year",
        yy: "%d years"
    }
});

moment.updateLocale("tr", {
    relativeTime : {
        future: "%s içinde",
        past: "%s önce",
        s : 'birkaç saniye',
        ss : '%d saniye',
        m: "bir dakika",
        mm: "%d dakika",
        h: "bir saat",
        hh: "%d saat",
        d: "bir gün",
        dd: "%d gün",
        w: "bir hafta",
        ww: "%d hafta",
        M: "bir ay",
        MM: "%d ay",
        y: "bir yıl",
        yy: "%d yıl"
    }
})

export function setMomentLanguage(lang: string) {
    console.log("lang", lang);
    moment.locale(lang);
}


export function getTimeFromNow(date: string) {
    return moment(date).fromNow();
}


export function getDateFormat(dateStr: string) {
    try {
        const date = new Date(dateStr);
        
        const day = date.getDate() + 1;
        const month = date.getMonth() + 1

        return (day < 10 ? "0" + day : day) + "-" + (month < 10 ? "0" + month : month) + "-" + date.getFullYear() 
        // + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    } catch (error) {
        return "";
    }
}