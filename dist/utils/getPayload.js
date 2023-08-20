"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayload = void 0;
const getPayload = (headers) => {
    const header = headers['authorization'];
    if (header !== undefined) {
        const token = header.split(' ')[1];
        return token;
    }
    else {
        return null;
    }
};
exports.getPayload = getPayload;
//# sourceMappingURL=getPayload.js.map