import moment from "moment";


export const MAIN_COLOR = "#f0c654";
export const TAB_INACTIVE_COLOR = "black";
export const TAB_ACTIVE_COLOR = "black";
export const BLACK_COLOR = "1E1E1E";
export const TOAST_COLOR = "#303030";
export const WHITE = "white";
export const LIGHT_WHITE = "##e0e0e0";
export const PINK = "#f75e73";
export const GRAY = "gray";
export const LIGHT_GRAY = "#e1e3e1";
export const LIGHT_GRAY_2 = "#faf8f7";
export const LIGHT_RED = "#F24822";
export const TEXT_BLACK = "#292828";
export const GREEN = "#3d8c35";

// NEW COLORS
export const MAIN_COLOR_2 = "#f5c62a";
export const LIGHT_RED_2 = "#e6572c";

// PADDİNG HORİZONTAL

export const CONTAİNER_HORİZONTAL = 20;

// BORDER RADIUS
export const BORDER_RADIUS_1 = 10;

// KEYS

export const LANG_STORE = "lang"

//DEFAULTS 
export const DEFAULT_LANGUAGE = "tr";

export const keyGenerator = (value:string,id:string) => {
    return value+"_"+id;
}


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

export function handleNavigation({navigation, routeString, id_1, id_2}:any){

    if(id_1 == id_2){
        navigation.push("Profile")
    }else{
        navigation.push(routeString, {id:id_2});

    }

}