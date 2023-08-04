const alph_am = ['ա', 'բ', 'գ', 'դ', 'ե', 'զ', 'է', 'ը', 'թ', 'ժ', 'ի', 'լ', 'խ', 'ծ', 'կ', 'հ', 'ձ', 'ղ', 'ճ', 'մ', 'յ', 'ն', 'շ', 'ո', 'չ', 'պ', 'ջ', 'ռ', 'ս', 'վ', 'տ', 'ր', 'ց', 'ու', 'փ', 'ք', 'և', 'օ', 'ֆ'];
const alph_en = ['a', 'b', 'g', 'd', 'e', 'z', 'e', 'y', 't', 'zh', 'i', 'l', 'x', 'ts', 'k', 'h', 'dz', 'gh', 'ch', 'm', 'y', 'n', 'sh', 'o', 'ch', 'p', 'j', 'r', 's', 'v', 't', 'r', 'ts', 'u', 'p', 'q', 'ev', 'o', 'f'];

export const slugConvert = (str: string): string => {
    const strArr = str.split('');
    const slugArr = strArr.map((letter) => {
        const index = alph_am.indexOf(letter);
        if (index !== -1) {
            return alph_en[index];
        }
        return letter;
    });
    return slugArr.join('');
}