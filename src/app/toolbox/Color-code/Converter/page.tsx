const convert = require("color-convert");
export class Converter {
  static rgb2hex = (R: string, G: string, B: string) => {
    let r = parseInt(R);
    let g = parseInt(G);
    let b = parseInt(B);

    const hex = convert.rgb.hex([r, g, b]);

    return {
      hex: hex,
    };
  };
  static rgb2cmyk = (R: string, G: string, B: string) => {
    let r = parseFloat(R);
    let g = parseFloat(G);
    let b = parseFloat(B);

    const cmyk = convert.rgb.cmyk([r, g, b]);
    return {
      c: cmyk[0].toString(),
      m: cmyk[1].toString(),
      y: cmyk[2].toString(),
      k: cmyk[3].toString(),
    };
  };
  static rgb2hsv = (R: string, G: string, B: string) => {
    let r = parseFloat(R);
    let g = parseFloat(G);
    let b = parseFloat(B);

    const hsv = convert.rgb.hsv([r, g, b]);
    return {
      h: hsv[0].toString(),
      s: hsv[1].toString(),
      v: hsv[2].toString(),
    };
  };

  static hex2rgb = (hex: string) => {
    const rgb = convert.hex.rgb(hex);
    return {
      r: rgb[0].toString(),
      g: rgb[1].toString(),
      b: rgb[2].toString(),
    };
  };

  static hex2cmyk = (hex: string) => {
    const cmyk = convert.hex.cmyk(hex);
    return {
      c: cmyk[0].toString(),
      m: cmyk[1].toString(),
      y: cmyk[2].toString(),
      k: cmyk[3].toString(),
    };
  };

  static hex2hsv = (hex: string) => {
    const hsv = convert.hex.hsv(hex);
    return {
      h: hsv[0].toString(),
      s: hsv[1].toString(),
      v: hsv[2].toString(),
    };
  };

  static cmyk2rgb = (C: string, M: string, Y: string, K: string) => {
    let c = parseFloat(C);
    let m = parseFloat(M);
    let y = parseFloat(Y);
    let k = parseFloat(K);

    const rgb = convert.cmyk.rgb([c, m, y, k]);
    return {
      r: rgb[0].toString(),
      g: rgb[1].toString(),
      b: rgb[2].toString(),
    };
  };

  static cmyk2hex = (C: string, M: string, Y: string, K: string) => {
    let c = parseFloat(C);
    let m = parseFloat(M);
    let y = parseFloat(Y);
    let k = parseFloat(K);

    const hex = convert.cmyk.hex([c, m, y, k]);

    return {
      hex: hex,
    };
  };

  static cmyk2hsv = (C: string, M: string, Y: string, K: string) => {
    let c = parseFloat(C);
    let m = parseFloat(M);
    let y = parseFloat(Y);
    let k = parseFloat(K);

    const hsv = convert.cmyk.hsv([c, m, y, k]);
    return {
      h: hsv[0].toString(),
      s: hsv[1].toString(),
      v: hsv[2].toString(),
    };
  };

  static hsv2rgb = (H: string, S: string, V: string) => {
    let h = parseFloat(H);
    let s = parseFloat(S);
    let v = parseFloat(V);

    const rgb = convert.hsv.rgb([h, s, v]);
    return {
      r: rgb[0].toString(),
      g: rgb[1].toString(),
      b: rgb[2].toString(),
    };
  };

  static hsv2cmyk = (H: string, S: string, V: string) => {
    let h = parseFloat(H);
    let s = parseFloat(S);
    let v = parseFloat(V);

    const cmyk = convert.hsv.cmyk([h, s, v]);
    return {
      c: cmyk[0].toString(),
      m: cmyk[1].toString(),
      y: cmyk[2].toString(),
      k: cmyk[3].toString(),
    };
  };

  static hsv2hex = (H: string, S: string, V: string) => {
    let h = parseFloat(H);
    let s = parseFloat(S);
    let v = parseFloat(V);

    const hex = convert.hsv.hex([h, s, v]);
    return {
      hex: hex,
    };
  };
}
