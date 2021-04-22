const validationNif = (rule: any, value: string, callback: any) => {
  if (value.length == 9) {
    if (
      ['1', '2', '3', '5', '6', '8'].includes(value[0]) ||
      ['45', '70', '71', '72', '77', '79', '90', '91', '98', '99'].includes(
        value.substring(0, 2),
      )
    ) {
      let aux = 0;
      for (let i = 0; i < value.length; i++) {
        if (i < 8) {
          aux = aux + Number(value[i]) * (9 - i);
        }
      }
      const modulo = aux % 11;
      if (modulo == 0 || modulo == 1) {
        aux = 0;
      } else {
        aux = 11 - modulo;
      }

      if (Number(value[8]) == aux) {
        callback();
      }
    }
  }

  return callback('Por favor digite um NIF válido!');
};

export default validationNif;
