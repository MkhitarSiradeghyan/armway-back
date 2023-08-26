"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugConvert = void 0;
const alph_am = ['ա', 'բ', 'գ', 'դ', 'ե', 'զ', 'է', 'ը', 'թ', 'ժ', 'ի', 'լ', 'խ', 'ծ', 'կ', 'հ', 'ձ', 'ղ', 'ճ', 'մ', 'յ', 'ն', 'շ', 'ո', 'չ', 'պ', 'ջ', 'ռ', 'ս', 'վ', 'տ', 'ր', 'ց', 'ու', 'փ', 'ք', 'և', 'օ', 'ֆ', 'Ա', 'Բ', 'Գ', 'Դ', 'Ե', 'Զ', 'Է', 'Ը', 'Թ', 'Ժ', 'Ի', 'Լ', 'Խ', 'Ծ', 'Կ', 'Հ', 'Ձ', 'Ղ', 'Ճ', 'Մ', 'Յ', 'Ն', 'Շ', 'Ո', 'Չ', 'Պ', 'Ջ', 'Ռ', 'Ս', 'Վ', 'Տ', 'Ր', 'Ց', 'ՈՒ', 'Փ', 'Ք', 'ԵՒ', 'Օ', 'Ֆ'];
const alph_en = ['a', 'b', 'g', 'd', 'e', 'z', 'e', 'y', 't', 'zh', 'i', 'l', 'x', 'ts', 'k', 'h', 'dz', 'gh', 'ch', 'm', 'y', 'n', 'sh', 'o', 'ch', 'p', 'j', 'r', 's', 'v', 't', 'r', 'ts', 'u', 'p', 'q', 'ev', 'o', 'f', 'A', 'B', 'G', 'D', 'E', 'Z', 'E', 'Y', 'T', 'Zh', 'I', 'L', 'X', 'Ts', 'K', 'H', 'Dz', 'Gh', 'Ch', 'M', 'Y', 'N', 'Sh', 'O', 'Ch', 'P', 'J', 'R', 'S', 'V', 'T', 'R', 'Ts', 'U', 'P', 'Q', 'Ev', 'O', 'F'];
const slugConvert = (str) => {
    const strArr = str.split('');
    const slugArr = strArr.map((letter) => {
        const index = alph_am.indexOf(letter);
        if (index !== -1) {
            return alph_en[index];
        }
        return letter;
    });
    return slugArr.join('');
};
exports.slugConvert = slugConvert;
//# sourceMappingURL=slugConvert.js.map