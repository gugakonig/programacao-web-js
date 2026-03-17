//Strings
let nome = "João"; //let permite que o valor da variável seja alterado posteriormente
const sobrenome = "Santos"; //const indica que o valor da variável é constante e não pode ser alterado
let templateString = `Olá, meu nome é ${nome} ${sobrenome}`; //template string permite a interpolação de variáveis dentro de uma string
//Sobrenome = "Nunes" ; TypeError: Assignment to constant variable. Não é possível alterar o valor de uma variável declarada com const
console.log(templateString); //Saída: Olá, meu nome é João Santos

//Number

let A = 2;
let B = 5.56;
let C = -3.14;
const PI = 3.14;
let potencia = A ** C;
console.log(typeof A);
console.log(typeof C);
console.log(`${A}^$${C}=${potencia}`); //Saída: 2^-3.14=0.125
