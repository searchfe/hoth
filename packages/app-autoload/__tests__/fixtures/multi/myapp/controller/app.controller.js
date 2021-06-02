const tslib = require("tslib");
const decorators = require("@hoth/decorators");
class AppController {
    getApp(req, reply) {
        reply.send('ok!');
    }
};
tslib.__decorate([
    decorators.GET("/"),
    tslib.__metadata("design:type", Function),
    tslib.__metadata("design:paramtypes", [Object, Object]),
    tslib.__metadata("design:returntype", void 0)
], AppController.prototype, "getApp", null);
AppController = tslib.__decorate([
    decorators.Controller('/app')
], AppController);
module.exports = AppController;
