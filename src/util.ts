/*
 * 문자열을 아스키코드로 변환하고 16비트로 변환하기
 */
export const convertTextTo16Bit = (text: string): string => {
    //0. 문자 들어옴

    const sixteenBitList = [];
    for (let i = 0; i < text.length; i++) {
        //1. 문자열 아스키코드 변환
        let charCode = text.charCodeAt(i);
        //2. 아스키코드 -> 16비트(2바이트)로 변환
        sixteenBitList.push(charCode.toString(2).padStart(16, "0"));
    }

    return sixteenBitList.join(" ");
};

/**
 * 8비트를 2진수로 만들고 만든 2진수로 아스키코드 변환
 * String.fromCharCode() 메서드는 UTF-16 코드 유닛의 시퀀스로부터 문자열을 생성해 반환
 */
export const convert8BitToAscii = (sixteenBit: string): string => {
    //0. 16비트 들어옴
    const sixteenBitList = sixteenBit.replaceAll(" ", "");

    //1. 8비트 변환
    const eightBitList = []; //16비트를 8비트로 만들어줌
    for (let i = 0; i < sixteenBitList.length; i += 16) {
        const current16Bit = sixteenBitList.substring(i, i + 16);
        const first8Bits = current16Bit.substring(0, 8);
        const second8Bits = current16Bit.substring(8, 16);

        eightBitList.push(first8Bits, second8Bits);
    }

    //4. 아스키문자 생성
    const ascii = [];
    for (let eightBit of eightBitList) {
        //2. 8비트 2진수를 10진수로 변환
        const unicode = parseInt(eightBit, 2);
        //3. 10진수를 해당하는 ASCII 문자로 변환
        ascii.push(String.fromCharCode(unicode));
    }
    return ascii.join("");
};

/**
 * 아스키코드 -> base64 변환
 * - btoa() 함수는 아스키코드를 base64 코드 변환
 * */
export const convertAsciiToBase64 = (ascii: string): string => {
    return btoa(ascii);
};

/**
 * base64 -> 아스키코드 변환
 * - atob() 함수는 Base64를 아스키 코드 변환
 * */
export const convertBase64ToAscii = (base64: string): string => {
    return atob(base64);
};

/**
 * 아스키문자열 -> 8비트 -> 16비트 -> UTF16 유니코드 -> 문자
 */
export const convertAsciiToUtf16 = (AsciiValue: string): string => {
    //0. 아스키 문자열 들어옴
    //1. 8비트 만들기
    const eightBitList = [];
    for (const ascii of AsciiValue) {
        const asciiNum = ascii.charCodeAt(0);
        const binary = asciiNum.toString(2);
        const fullBinary = binary.padStart(8, "0");
        eightBitList.push(fullBinary);
    }

    //2. 16비트 만들기
    const sixteenBitList = [];
    for (let i = 0; i < eightBitList.length - 1; i += 2) {
        sixteenBitList.push(`${eightBitList[i]}${eightBitList[i + 1]}`);
    }

    //3. 16비트 -> 유니코드 만들기
    const unicodeList = [];
    for (let sixteenBit of sixteenBitList) {
        unicodeList.push(parseInt(sixteenBit, 2));
    }

    //4. 유니코드 -> 문자복원하기
    const charCode = [];
    for (let unicode of unicodeList) {
        charCode.push(String.fromCharCode(unicode));
    }

    return charCode.join("");
};
