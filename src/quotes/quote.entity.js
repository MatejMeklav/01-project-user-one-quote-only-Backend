"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Quote = void 0;
var user_entity_1 = require("../../../../../../../src/users/user.entity");
var typeorm_1 = require("typeorm");
var Quote = /** @class */ (function () {
    function Quote() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], Quote.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], Quote.prototype, "description");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], Quote.prototype, "upVote");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], Quote.prototype, "downVote");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return user_entity_1.User; }),
        (0, typeorm_1.JoinColumn)()
    ], Quote.prototype, "user");
    Quote = __decorate([
        (0, typeorm_1.Entity)({
            orderBy: { upVote: 'DESC' }
        })
    ], Quote);
    return Quote;
}());
exports.Quote = Quote;
