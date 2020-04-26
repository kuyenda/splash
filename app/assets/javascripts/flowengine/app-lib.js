if (typeof app !== "undefined") {
  app.lib = {}
  app.lib.toString = (code) => {
    if (Array.isArray(code)) {
      return code.map(item => toString(item));
    } else if (typeof code == 'object') {
      let tmp = {};
      Object.keys(code).forEach(key => {
        tmp[key] = toString(code[key])
      });
      return tmp;
    } else {
      return code.toString().split('\n').join('').replace(/ +(?= )/gmi, '');
    }
  };
}