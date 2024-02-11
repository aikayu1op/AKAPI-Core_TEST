import Config from "../../Config/index.js";
import { Command, replaceArgs } from "../../index.js";

Command.register({
    cmd: "help",
    usage: ["page<number>", "command<string>", ""],
    description: "コマンドの使い方や一覧を表示します。",
    permission: false,
    execute: (ev) =>{
        const getData = Command.getCmdData();
        const allCmd = Array.from(getData.keys()).sort();
        /**
         * @type {string}
         */
        let canShowHelp = [];
        allCmd.forEach(cmd =>{
            let checkCmd = getData.get(cmd);
            if(typeof checkCmd.permission === "boolean"){
                if(ev.sender.hasTag(Config.firstTag+Config.opTag) && checkCmd.permission)
                    checkCmd.usage.length > 0 ? checkCmd.usage.forEach(x => canShowHelp.push(`§b${Config.commandPrefix+checkCmd.cmd+" "+x}§r`)) : canShowHelp.push(`§b${Config.commandPrefix+checkCmd.cmd}§r`);
                else if(!checkCmd.permission)
                    checkCmd.usage.length > 0 ? checkCmd.usage.forEach(x => canShowHelp.push(Config.commandPrefix+checkCmd.cmd+" "+x)) : canShowHelp.push(Config.commandPrefix+checkCmd.cmd)
            }else if(typeof checkCmd.permission === "string" && ev.sender.hasTag(Config.firstTag+checkCmd.permission) || ev.sender.hasTag(Config.firstTag+Config.opTag))
                checkCmd.usage.length > 0 ? checkCmd.usage.forEach(x => canShowHelp.push(`§a${Config.commandPrefix+checkCmd.cmd+" "+x}§r`)) : canShowHelp.push(`§a${Config.commandPrefix+checkCmd.cmd}§r`);
        });
        const limitPage = Math.ceil(canShowHelp.length / Config.helpShowLimit);
        if(typeof ev.args[0] == "number" && !isNaN(ev.args[0])){
            if(ev.args[0] <= 0) ev.args[0] = 1;
            else if(ev.args[0] > limitPage){
                ev.sender.sendMessage(`最大ページが${limitPage}に対して、指定された値は${ev.args[0]}でした。${limitPage}以下を指定してください。`);
                return;
            }
            ev.sender.sendMessage(`§a--- ヘルプ ページの ${ev.args[0]} / ${limitPage} ページを表示 (${Config.commandPrefix}help <number> ) ---§f`);
            /**
             * @type {string[]}
             */
            let showCmd = [];
            for(let i = 0; i < Config.helpShowLimit; i++){
                let checkShow = canShowHelp[i+(ev.args[0]-1)*Config.helpShowLimit];
                if(!checkShow) break;
                showCmd.push(checkShow);
            }
            ev.sender.sendMessage(showCmd.join("\n"));
            return;
        }else if(typeof ev.args[0] == "string"){
            const getCmd = getData.get(ev.args[0]);
            if(!getData.has(ev.args[0])){
                ev.sender.sendMessage(replaceArgs(Config.invalidMessage, ev.args[0]));
                return;
            }else if(typeof getCmd.permission === "boolean" && getCmd.permission && !ev.sender.hasTag(Config.firstTag+Config.opTag)){
                ev.sender.sendMessage(replaceArgs(Config.invalidMessage, getCmd.cmd));
                return;
            }else if(typeof getCmd.permission === "string" && !ev.sender.hasTag(Config.firstTag+getCmd.permission) && !ev.sender.hasTag(Config.firstTag+Config.opTag)){
                ev.sender.sendMessage(replaceArgs(Config.invalidMessage, ev.args[0]));
                return;
            }
            if(typeof getCmd.permission === "boolean")
                ev.sender.sendMessage(`${getCmd.cmd}の説明\n    ${getCmd.description}\n使用例:\n${getCmd.usage.length > 0? getCmd.usage.map(x => x = " ".repeat(2)+Config.commandPrefix+getCmd.cmd+" "+x).join("\n") : " ".repeat(2)+Config.commandPrefix+getCmd.cmd}`);
            else
                ev.sender.sendMessage(`${getCmd.cmd}の説明\n    ${getCmd.description}\n使用例:\n${getCmd.usage.length > 0? getCmd.usage.map(x => x = " ".repeat(2)+Config.commandPrefix+getCmd.cmd+" "+x).join("\n") : " ".repeat(2)+Config.commandPrefix+getCmd.cmd}`);
            return;
        }else{
            ev.sender.sendMessage(`§a--- ヘルプ ページの 1 / ${limitPage} ページを表示 (${Config.commandPrefix}help <number> ) ---§f`);
            /**
             * @type {string[]}
             */
            let showCmd = [];
            for(let i = 0; i < Config.helpShowLimit; i++) showCmd.push(canShowHelp[i]);
            ev.sender.sendMessage(showCmd.join("\n"));
            return;
        }
    }
});