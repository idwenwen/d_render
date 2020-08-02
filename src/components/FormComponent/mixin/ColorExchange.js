const ColorExchange = {
  methods: {
    toHEX(color) {
      const reg = /^(rgb|RGB)/;
      if (reg.test(color)) {
        let strHex = "#";
        // 把RGB的3个数值变成数组
        const colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        // 转成16进制
        for (let i = 0; i < colorArr.length; i++) {
          let hex = Number(colorArr[i]).toString(16);
          if (hex === "0") {
            hex += hex;
          }
          strHex += hex;
        }
        return strHex;
      } else {
        return String(color);
      }
    },
    toRGB(col) {
      const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      // 把颜色值变成小写
      let color = col.toLowerCase();
      if (reg.test(color)) {
        // 如果只有三位的值，需变成六位，如：#fff => #ffffff
        if (color.length === 4) {
          let colorNew = "#";
          for (let i = 1; i < 4; i += 1) {
            colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
          }
          color = colorNew;
        }
        // 处理六位的颜色值，转为RGB
        let colorChange = [];
        for (let i = 1; i < 7; i += 2) {
          colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
        }
        return "RGBA(" + colorChange.join(",") + ',1' + ")";
      } else {
        return color;
      }
    }
  }
}

export default ColorExchange