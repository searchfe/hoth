const tslib = require("tslib");
const decorators = require("@hoth/decorators");
class AppController {
    getApp(req, reply) {
        reply.send('ok!');
    }
    fatal(req, reply) {
        throw new TypeError('some error');
    }
};
tslib.__decorate([
    decorators.GET("/"),
    tslib.__metadata("design:type", Function),
    tslib.__metadata("design:paramtypes", [Object, Object]),
    tslib.__metadata("design:returntype", void 0)
], AppController.prototype, "getApp", null);
tslib.__decorate([
    decorators.GET("/50x"),
    tslib.__metadata("design:type", Function),
    tslib.__metadata("design:paramtypes", [Object, Object]),
    tslib.__metadata("design:returntype", void 0)
], AppController.prototype, "fatal", null);
AppController = tslib.__decorate([
    decorators.Controller('/app')
], AppController);
module.exports = AppController;
