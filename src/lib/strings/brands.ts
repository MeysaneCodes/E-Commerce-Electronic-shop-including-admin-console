export class Electronics {
    static  BrandsMap:Record<string, string> = {
        APPLE: "APL",
        SAMSUNG: "SMS",
        GOOGLE: "GGL",
        XIAOMI: "XMI",
        ONEPLUS: "OPL",
        HUAWEI: "HWI",
        HONOR: "HNR",
        OPPO: "OPP",
        VIVO: "VVO",
        REALME: "RLM",
        SONY: "SNY",
        NOKIA: "NKA",
        MOTOROLA: "MTR",
        ASUS: "ASS",
        LENOVO: "LNV",
        LG: "LG",
        HTC: "HTC",
        ZTE: "ZTE",
        NOTHING: "NTH",
        FAIRPHONE: "FPN",
        BLACKBERRY: "BBR"
    };

    static ColorsMap: Record<string, string> = {
        // Core colors
        BLACK: "BLK",
        WHITE: "WHT",
        BLUE: "BLU",
        RED: "RED",
        GREEN: "GRN",
        YELLOW: "YLW",
        ORANGE: "ORG",
        PURPLE: "PRP",
        PINK: "PNK",

        // Metallic / premium
        SILVER: "SLV",
        GOLD: "GLD",
        BRONZE: "BRZ",
        COPPER: "CPR",
        TITANIUM: "TIT",
        GRAPHITE: "GPH",
        ALUMINUM: "ALU",

        // Apple-style / marketing colors
        MIDNIGHT: "BLK",
        STARLIGHT: "WHT",
        SPACEGRAY: "GRY",
        SPACEGREY: "GRY",
        NATURALTITANIUM: "NAT",
        BLUETITANIUM: "BLU",
        WHITETITANIUM: "WHT",
        BLACKTITANIUM: "BLK",

        // Neutral tones
        GRAY: "GRY",
        GREY: "GRY",
        BEIGE: "BEG",
        CREAM: "CRM",
        SAND: "SND",
        IVORY: "IVR",

        // Special finishes
        MATTEBLACK: "BLK",
        GLOSSYBLACK: "BLK",
        JETBLACK: "BLK",
        CARBONBLACK: "BLK",

        // Brand-specific variants
        SIERRABLUE: "BLU",
        PACIFICBLUE: "BLU",
        SKYBLUE: "BLU",
        NAVY: "BLU",

        FORESTGREEN: "GRN",
        MINT: "GRN",
        OLIVE: "GRN",

        ROSEGOLD: "GLD",
        CHAMPAGNE: "GLD",

        // Fallback generic
        DEFAULT: "UNK"
    };


    static Normalize(text: string): string {
        return text.toUpperCase().replace(/\s+/g, "").replace(/[^A-Z0-9]/g, "");
    }
     static getBrandCode(brand:string): string{
        const key = this.Normalize(brand);
        return this.BrandsMap[key] ?? key.slice(0,3);
    }

    static getColor(Color:string): string{
        const key = this.Normalize(Color);
        return this.ColorsMap[key] ?? key.slice(0,3);
    }


    static getModelCode(model: string): string {
        let m = model.toUpperCase().trim();
        // remove extra spaces
        m = m.replace(/\s+/g, " ");

        // ---------------- APPLE ----------------
        if (m.includes("IPHONE")) {
            const number = m.match(/\d+/)?.[0] || "";

            const isProMax = m.includes("PRO MAX");
            const isPro = m.includes("PRO") && !isProMax;

            return `IP${number}${isProMax ? "PM" : isPro ? "P" : ""}`;
        }

        // ---------------- SAMSUNG ----------------
        if (m.includes("GALAXY S")) {
            const number = m.match(/S(\d+)/)?.[1] || "";
            const isUltra = m.includes("ULTRA");

            return `S${number}${isUltra ? "U" : ""}`;
        }

        if (m.match(/A\d+/)) {
            return m.match(/A\d+/)?.[0] || "";
        }

        // ---------------- GOOGLE PIXEL ----------------
        if (m.includes("PIXEL")) {
            const number = m.match(/\d+/)?.[0] || "";
            const isPro = m.includes("PRO");

            return `P${number}${isPro ? "P" : ""}`;
        }

        // ---------------- ONEPLUS ----------------
        if (m.includes("ONEPLUS")) {
            const number = m.match(/\d+/)?.[0] || "";
            return `OP${number}`;
        }

        // ---------------- XIAOMI ----------------
        if (m.includes("XIAOMI")) {
            const number = m.match(/\d+/)?.[0] || "";
            const isPro = m.includes("PRO");

            return `X${number}${isPro ? "P" : ""}`;
        }

        // ---------------- REDMI ----------------
        if (m.includes("REDMI")) {
            const number = m.match(/\d+/)?.[0] || "";
            const isNote = m.includes("NOTE");
            const isPro = m.includes("PRO");

            return `R${isNote ? "N" : ""}${number}${isPro ? "P" : ""}`;
        }

        // ---------------- POCO ----------------
        if (m.includes("POCO")) {
            const number = m.match(/\d+/)?.[0] || "";
            const series = m.match(/[A-Z]\d+/)?.[0] || "";
            const isPro = m.includes("PRO");

            return `P${series || number}${isPro ? "P" : ""}`;
        }

        // ---------------- FALLBACK ----------------
        return m.replace(/[^A-Z0-9]/g, "").slice(0, 6);
    }
}