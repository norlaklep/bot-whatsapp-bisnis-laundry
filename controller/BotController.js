const { Controller, Response } = require("pepesan");
const f = require("../utils/Formatter");

let activeUsers = {};

module.exports = class BotController extends Controller {
    async introduction(request) {
        return Response.menu.fromArrayOfString(
            [
                f("menu.Mabar"),
                f("menu.keperluan"),
                f("menu.chatBiasa"),
                f("menu.fkb")
            ],
            f("intro", [request.name]),
            f("template.menu")
        );
    }

    async Mabar(request) {
        return this.reply("Gas Mabar");
    }

    async keperluan(request) {
        activeUsers[request.sender] = false;
        return this.reply("Silakan jelaskan keperluan Anda.");
    }

    async chatBiasa(request) {
        activeUsers[request.sender] = false;
        return this.reply("Chatbot dinonaktifkan untuk chat biasa.");
    }


    static async checkActive(request) {
        if (activeUsers[request.sender] === false) {
            return false;
        }
        return true;

    }
}
