const { Router } = require("pepesan");
const BotController = require("./controller/BotController");
const f = require("./utils/Formatter");

const router = new Router();

router.middleware(BotController.checkActive).group(() => {
    router.menu(f("menu.Mabar"), [BotController, "Mabar"]);
});
router.menu(f("menu.keperluan"), [BotController, "keperluan"]);
router.menu(f("menu.chatBiasa"), [BotController, "chatBiasa"]);
router.keyword("*", [BotController, "introduction"]);

module.exports = router;
