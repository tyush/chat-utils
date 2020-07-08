
const { Plugin } = require("powercord/entities");
const {
    getModule,
    messages,
    channels: { getChannelId },
} = require("powercord/webpack");
const { receiveMessage } = messages;

module.exports = class chatutils extends Plugin {
    startPlugin() {
        powercord.api.commands.registerCommand({
            command: "utils-emojify",
            aliases: ["emojify", "mock"],
            description: "Clap 👏 them 👏 cheeks!",
            usage: "{c} <emoji> <text>",
            executor: (args) => ({
                send: true,
                // result: console.log(args)
                // yeah, me and swish have the same code for this. we both made it together, so shut up if you're about to complain about copy-pasting
                result: this.emojify(args),
            }),
        });
        // powercord.api.commands.registerCommand({
        //   command: "dumpToFile",
        //   description: "Creates a txt file with the current conversation",
        //   usage: "{c} <output name>",
        //   executor: (args) => ({
        //     send: false,
        //     result: this.dumpToFile(args),
        //   }),
        // });
        // powercord.api.commands.registerCommand({
        //   command: "link",
        //   description: "Drop a link to a profile page",
        //   usage: "{c} <platform>",
        //   executor: (args) => ({
        //     send: false,
        //     result: this.linkBio(args),
        //   }),
        // });
        powercord.api.commands.registerCommand({
            command: "utils-fancify",
            aliases: ["fancify"],
            description: "Replace your text with fancy text.",
            usage: "{c} <text>",
            executor: (args) => ({
                send: true,
                result: this.replace(args),
            }),
        });
        powercord.api.commands.registerCommand({
            command: "utils-bios-set",
            aliases: ["setbio"],
            description: "Add an entry to your bios",
            usage: "{c} <platform>|<link>",
            executor: (args) => ({
                send: false,
                result: this.setBio(args),
            }),
        });
        powercord.api.commands.registerCommand({
            command: "utils-bios-view",
            aliases: ["viewbio"],
            description: "View your links",
            usage: "{c}",
            executor: (args) => ({
                send: false,
                result: this.viewDict(),
            }),
        });
        powercord.api.commands.registerCommand({
            command: "utils-bios-send",
            aliases: ["sendbio"],
            description: "Send an entry from your bios",
            usage: "{c} <platform>",
            executor: (args) => ({
                send: true,
                result: this.sendBio(args),
            }),
        });
        powercord.api.commands.registerCommand({
            command: "utils-wave",
            description: "Do that thing from youtube comments",
            usage: "{c} <text>",
            executor: (args) => ({
                send: true,
                result: this.triangleifier(args),
            }),
        });
    }

    emojify(args) {
        return args
            .join(" " + args[0] + " ")
            .substr(args.join().indexOf(args[0]) + 1)
            .substr(args.join().indexOf(args[0]) + 1)
            .substr(args.join().indexOf(args[0]) + 1)
            .substr(args.join().indexOf(args[0]) + 1);
    }

    dumpToFile(args) {
        // todo
        let d = new Date();
        let outputFileName =
            d.getDate() +
            "." +
            d.getMonth() +
            "." +
            d.getFullYear() +
            " " +
            d.getHours() +
            ":" +
            d.getMinutes();

        if (args[0] != null) {
            outputFileName = args[0];
        }
    }

    sendBio(args) {
        let bios = this.settings.get("bios");
        if (bios == undefined) {
            bios = new Array();
            bios["test"] = "Go and set your bios with .utils-bios-set platform|link";
        }

        if (args[0] in bios) {
            return args[0] + ": " + bios[args[0]];
        } else {
            powercord.api.notices.sendToast("No entry found for platform " + args[0]);
        }
    }

    setBio(args) {
        let bios = this.settings.get("bios");
        if (bios == undefined) {
            bios = new Array();
            bios["test"] = "Go and set your bios with .utils-bios-set platform|link";
        }

        let newargs = [];
        let text = args.join(" ");
        newargs[0] = text.substring(0, text.indexOf("|"));
        newargs[1] = text.substring(text.indexOf("|") + 1, text.length);

        if (newargs[0].length < 1 || newargs[1] == "|") {
            return "Value for both platform and link needed! .utils-bios-set platform|link";
        }

        bios[newargs[0]] = newargs[1];
        this.saveBios(bios);
        return "Entry " + newargs[0] + " created with value of " + newargs[1];
    }

    viewDict() {
		let result = '\r';
		var bios = this.settings.get("bios");
		if (bios == undefined) {
			bios = new Array();
            bios["test"] = "Go and set your bios with .utils-bios-set platform|link"
		}
		for(var abbrev in bios) {
			result += abbrev + ": " + bios[abbrev] + "\r";
		}
		return result;
	}

    saveBios(bios) {
        this.settings.set("bios", bios);
    }

    replace(args) {
        let fancyTextDict = {
            'a': "𝒶",
            'b': "𝒷",
            'c': "𝒸",
            'd': "𝒹",
            'e': "𝑒",
            'f': "𝒻",
            'g': "𝑔",
            'h': "𝒽",
            'i': "𝒾",
            'j': "𝒿",
            'k': "𝓀",
            'l': "𝓁",
            'm': "𝓂",
            'n': "𝓃",
            'o': "𝑜",
            'p': "𝓅",
            'q': "𝓆",
            'r': "𝓇",
            's': "𝓈",
            't': "𝓉",
            'u': "𝓊",
            'v': "𝓋",
            'w': "𝓌",
            'x': "𝓍",
            'y': "𝓎",
            'z': "𝓏",
            'A': "𝒜",
            'B': "𝐵",
            'C': "𝒞",
            'D': "𝒟",
            'E': "𝐸",
            'F': "𝐹",
            'G': "𝒢",
            'H': "𝐻",
            'I': "𝐼",
            'J': "𝒥",
            'K': "𝒦",
            'L': "𝐿",
            'M': "𝑀",
            'N': "𝒩",
            'O': "𝑂",
            'P': "𝒫",
            'Q': "𝒬",
            'R': "𝑅",
            'S': "𝒮",
            'T': "𝒯",
            'U': "𝒰",
            'V': "𝒱",
            'W': "𝒲",
            'X': "𝒳",
            'Y': "𝒴",
            'Z': "𝒵",
        };

        let string = args.join(" ");
        let newString = "";
        let letter = "";
        for (var letterIndex = 0; letterIndex < string.length; letterIndex++) {
            letter = string[letterIndex];
            if (letter in fancyTextDict) {
                newString += fancyTextDict[letter];
            } else {
                newString += letter;
            }
        }

        return newString;
    }

    triangleifier(args) {
        let text = args.join(' ');
        text = text.split("");
        let result = ".";

        let i = 0;
        while (i < text.length + 2) {        
            result += text.slice(0, i).join("");
            
            result += "\r";
            i++;
        }
        i = 1;
        while (i < text.length) {
            result += text.slice(0, text.length - i).join("");

            result += "\r";
            i++;
        }
        
        return result;
    }

    pluginWillUnload() {
        powercord.api.commands.unregisterCommand("utils-emojify");
        powercord.api.commands.unregisterCommand("utils-fancify");
        powercord.api.commands.unregisterCommand("utils-bios-set");
        powercord.api.commands.unregisterCommand("utils-bios-view");
        powercord.api.commands.unregisterCommand("utils-bios-send");
        powercord.api.commands.unregisterCommand("utils-wave");
    }
};