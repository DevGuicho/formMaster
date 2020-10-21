const form = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");

const expresiones = {
  numbersAndLetters: /^[a-zA-ZÀ-ÿ0-9\.\#\s]{1,260}$/, // Letras, numeros, numeral y punto
  onlyLetters: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  curp: /^[A-Z0-9]{18}$/, // Letras, numeros, guion y guion_bajo
  password: /^.{4,12}$/, // 4 a 12 digitos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telephone: /^[0-9]{10}$/, // 7 a 14 numeros.
};
const fields = {
  name: false,
  lastName: false,
  birthPlace: false,
  adress: false,
  telephone: false,
  nacionality: false,
  curp: false,
  email: false,
  skype: false,
};
const validateForm = (e) => {
  switch (e.target.name) {
    case "name":
      validateField(expresiones.onlyLetters, e.target, "name");
      break;
    case "lastName":
      validateField(expresiones.onlyLetters, e.target, "lastName");
      break;
    case "birthPlace":
      validateField(expresiones.onlyLetters, e.target, "birthPlace");
      break;
    case "adress":
      validateField(expresiones.numbersAndLetters, e.target, "adress");
      break;
    case "telephone":
      validateField(expresiones.telephone, e.target, "telephone");
      break;
    case "nacionality":
      validateField(expresiones.onlyLetters, e.target, "nacionality");
      break;
    case "curp":
      validateField(expresiones.curp, e.target, "curp");
      break;
    case "email":
      validateField(expresiones.email, e.target, "email");
      break;
    case "skype":
      validateField(expresiones.email, e.target, "skype");
      break;
  }
};

const validateField = (expression, input, field) => {
  if (expression.test(input.value)) {
    document
      .getElementById(`${field}Group`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .querySelector(`#${field}Group .formulario__input--error`)
      .classList.remove("formulario__input-error-active");
    fields[field] = true;
  } else {
    document
      .getElementById(`${field}Group`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .querySelector(`#${field}Group .formulario__input--error`)
      .classList.add("formulario__input-error-active");
    fields[field] = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", (e) => validateForm(e));
  input.addEventListener("blur", (e) => validateForm(e));
});
form.addEventListener("submit", (e) => {
  let flag = false;
  e.preventDefault();
  for (const property in fields) {
    if (fields[property] === false) {
      console.log(`${property}: ${fields[property]}`);
      flag = true;
    }
  }
  if (flag) {
    document.getElementById("panelFor").classList.remove("disable");
    document
      .getElementById("panelFor")
      .classList.add("formulario__input-error-active");
  } else {
    document.getElementById("panelFor").classList.add("disable");
    document
      .getElementById("panelFor")
      .classList.remove("formulario__input-error-active");
  }
});
