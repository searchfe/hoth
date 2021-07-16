const tslib = require("tslib");
const decorators = require("@hoth/decorators");
class AppController {
    getApp(req, reply) {
        reply.send('ok!');
    }
    fatal(req, reply) {
        throw new TypeError('some error');
    }
    getFoo(req, reply) {
        reply.send(req.foo || 'none');
    }
    getReq(req, reply) {
        reply.send(req.addReq || 'none');
    }
    getConfig(req, reply) {
        reply.send(req.$appConfig.get('foo') || 'none');
    }
    async getFile(req, reply) {
        const data = await req.file();
        const buffer = await data.toBuffer();
        reply.send(buffer ? buffer.toString() : 'none');
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
tslib.__decorate([
    decorators.GET("/foo"),
    tslib.__metadata("design:type", Function),
    tslib.__metadata("design:paramtypes", [Object, Object]),
    tslib.__metadata("design:returntype", void 0)
], AppController.prototype, "getFoo", null);
tslib.__decorate([
    decorators.GET("/req"),
    tslib.__metadata("design:type", Function),
    tslib.__metadata("design:paramtypes", [Object, Object]),
    tslib.__metadata("design:returntype", void 0)
], AppController.prototype, "getReq", null);
tslib.__decorate([
    decorators.GET("/config"),
    tslib.__metadata("design:type", Function),
    tslib.__metadata("design:paramtypes", [Object, Object]),
    tslib.__metadata("design:returntype", void 0)
], AppController.prototype, "getConfig", null);
tslib.__decorate([
    decorators.POST("/upload"),
    tslib.__metadata("design:type", Function),
    tslib.__metadata("design:paramtypes", [Object, Object]),
    tslib.__metadata("design:returntype", void 0)
], AppController.prototype, "getFile", null);
AppController = tslib.__decorate([
    decorators.Controller('/app')
], AppController);
module.exports = AppController;
