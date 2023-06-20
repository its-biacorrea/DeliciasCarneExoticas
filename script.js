"use strict";

let carousel = document.querySelector(".carousel");
let carouselContainer = carousel.querySelector(".carousel-container");
let carouselItems = carousel.querySelectorAll(".carousel-item");
let prevButton = carousel.querySelector(".carousel-prev");
let nextButton = carousel.querySelector(".carousel-next");
let indicators = carousel.querySelectorAll(".indicator");
let currentIndex = 0;

function moveToPrevSlide() {
  if (currentIndex === 0) {
    currentIndex = carouselItems.length - 1;
  } else {
    currentIndex--;
  }
  updateCarousel();
}

function moveToNextSlide() {
  if (currentIndex === carouselItems.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  updateCarousel();
}

function updateCarousel() {
  let translateX = currentIndex * -33.33;
  carouselContainer.style.transform = "translateX(" + translateX + "%)";
  updateIndicators();
}

function updateIndicators() {
  indicators.forEach(function(indicator, index) {
    if (index === currentIndex) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
}

prevButton.addEventListener("click", moveToPrevSlide);
nextButton.addEventListener("click", moveToNextSlide);

indicators.forEach(function(indicator, index) {
  indicator.addEventListener("click", function() {
    currentIndex = index;
    updateCarousel();
  });
});

window.addEventListener("scroll", function() {
  var slogan = document.querySelector(".slogan");
  var sloganPosition = slogan.getBoundingClientRect().top;
  var screenPosition = window.innerHeight / 1.5;

  if (sloganPosition < screenPosition) {
    slogan.classList.remove("fade-out");
  } else {
    slogan.classList.add("fade-out");
  }
});

let checks = document.getElementsByClassName("radio");

function marcarRadio() {
  if (!this.classList.contains("marcado")) {
    for (let j = 0; j < checks.length; j++) {
      checks[j].classList.remove("marcado");
      this.classList.add("marcado");
    }
  } else {
    this.classList.remove("marcado");
  }
}

for (let i = 0; i < checks.length; i++) {
  checks[i].addEventListener("click", marcarRadio);
}

let select = document.getElementById("lista");
let a = select.nextElementSibling;
let lis = document.querySelectorAll(".hide ul li");
let i = document.querySelector("i");
let outras = document.getElementById("outras");

function abrir(event) {
  select.classList.toggle("aberto");
  if (select.classList.contains("aberto")) {
    a.classList.remove("hide");
    i.classList.remove("fa-chevron-down");
    i.classList.add("fa-chevron-up");
  } else {
    a.classList.add("hide");
    i.classList.add("fa-chevron-down");
    i.classList.remove("fa-chevron-up");
  }
  select.firstElementChild.textContent = event.target.textContent;

  if (event.target.textContent === "Outras") {
    outras.classList.remove("hide");
  } else {
    outras.classList.add("hide");
  }
}

for (let i = 0; i < lis.length; i++) {
  lis[i].addEventListener("click", abrir);
}

select.addEventListener("click", abrir);

let checkboxes = document.getElementsByClassName("checkbox");
let marcarTodos = document.getElementById("todos");
let hifen = document.getElementById("hifen");

function marcarCheckbox() {
  if (!this.classList.contains("marcadoCheck")) {
    if (this === marcarTodos) {
      for (let checkbox of checkboxes) {
        checkbox.classList.add("marcadoCheck");
      }
      hifen.classList.add("fa-check");
      hifen.classList.remove("fa-minus");
    } else if (this === checkboxes[1] || this === checkboxes[2]) {
      checkboxes[0].classList.add("marcadoCheck");
      hifen.classList.remove("fa-check");
      hifen.classList.add("fa-minus");
      if (checkboxes[1].classList.contains("marcadoCheck") || checkboxes[2].classList.contains("marcadoCheck")) {
        hifen.classList.add("fa-check");
        hifen.classList.remove("fa-minus");
      }
    }
    this.classList.add("marcadoCheck");
  } else {
    if (this === marcarTodos) {
      if (checkboxes[1].classList.contains("marcadoCheck") || checkboxes[2].classList.contains("marcadoCheck")) {
        for (let checkbox of checkboxes) {
          checkbox.classList.remove("marcadoCheck");
        }
      }
      hifen.classList.add("fa-check");
      hifen.classList.remove("fa-minus");
    } else if (this === checkboxes[1] || this === checkboxes[2]) {
      hifen.classList.remove("fa-check");
      hifen.classList.add("fa-minus");
      if (!checkboxes[1].classList.contains("marcadoCheck") || !checkboxes[2].classList.contains("marcadoCheck")) {
        checkboxes[0].classList.remove("marcadoCheck");
      }
    }
    this.classList.remove("marcadoCheck");
  }
}

for (let checkbox of checkboxes) {
  checkbox.addEventListener("click", marcarCheckbox);
}

setTimeout(function() {
  marcarTodos.classList.add("js-fade");
  for (let checkbox of checkboxes) {
    checkbox.classList.add("js-fade");
  }
}, 1000);

const submit = document.getElementById("submit");
let valid;

function validFalse(campo, msgErro) {
  msgErro.classList.add("visible");
  campo.classList.add("invalid");
  msgErro.setAttribute("aria-hidden", false);
  msgErro.setAttribute("aria-invalid", true);
  return false;
}

function validTrue(campo, msgErro) {
  msgErro.classList.remove("visible");
  campo.classList.remove("invalid");
  msgErro.setAttribute("aria-hidden", true);
  msgErro.setAttribute("aria-invalid", false);
  return true;
}

function validarNome() {

  const campoNome = document.getElementById("nome");
  const erro = document.getElementById("nameErrorNome");
  const numPalavras = campoNome.value.split(" ").filter(word => word !== "");


  if (!campoNome.value) {
    return validFalse(campoNome, erro);
  }
  else if (numPalavras.length < 2) {
    return validFalse(campoNome, erro);
  } else {
    return validTrue(campoNome, erro);
  }

}

function validacaoEmail() {
  const campoEmail = document.getElementById("email");
  const erro = document.getElementById("nameErrorEmail");

  const usuario = campoEmail.value.substring(0, campoEmail.value.indexOf("@"));
  const dominio = campoEmail.value.substring(campoEmail.value.indexOf("@") + 1, campoEmail.value.length);

  if (
    (usuario.length >= 1) &&
    (dominio.length >= 3) &&
    (usuario.search("@") == -1) &&
    (dominio.search("@") == -1) &&
    (usuario.search(" ") == -1) &&
    (dominio.search(" ") == -1) &&
    (dominio.search(".") != -1) &&
    (dominio.indexOf(".") >= 1) &&
    (dominio.lastIndexOf(".") < dominio.length - 1)
  ) {
    return validTrue(campoEmail, erro)
  } else {
    return validFalse(campoEmail, erro)
  }

}

function validarTelefone() {
  const campoTelefone = document.getElementById("telefone");
  const telefone = campoTelefone.value;
  const caracteresIndesejados = /[-()\s]/g;
  const numeroLimpo = telefone.replace(caracteresIndesejados, "");
  const erro = document.getElementById("nameErrorTelefone");

  if (numeroLimpo.length === 11 && numeroLimpo.match(/^\d+$/)) {
    return validTrue(campoTelefone, erro);
  } else {
    return validFalse(campoTelefone, erro);
  }
}

function validarRadio() {
  const erro = document.getElementById("nameErrorRadio");
  let valid = false;
  for (let j = 0; j < checks.length; j++) {
    if (checks[j].classList.contains("marcado")) {
      valid = true;
      return validTrue(checks[0], erro);
      break;
    }
  }
  if (!valid) {
    return validFalse(checks[0], erro);
  }
}

function validarSelect() {
  const erro = document.getElementById("nameErrorSelect");
  if (
    select.textContent.includes("Bovina") ||
    select.textContent.includes("Suína") ||
    select.textContent.includes("Aves") ||
    select.textContent.includes("Frutos do Mar") ||
    select.textContent.includes("Outras")
  ) {
    return validTrue(select, erro);
  } else {
    return validFalse(select, erro);
  }
}

function validarCheckbox() {
  const erro = document.getElementById("nameErrorCheckbox");
  let valid = false;
  for (let j = 0; j < checkboxes.length; j++) {
    if (checkboxes[j].classList.contains("marcadoCheck")) {
      valid = true;
      return validTrue(checkboxes[0], erro);
      break;
    }
  }
  if (!valid) {
    return validFalse(checkboxes[0], erro);
  }
}

function validarMensagem() {
  const campoMensagem = document.getElementById("mensagem");
  const quantidadeCaracteres = campoMensagem.value.length;
  const erro = document.getElementById("nameErrorMensagem");

  if (quantidadeCaracteres >= 5) {
    return validTrue(campoMensagem, erro);
  } else {
    return validFalse(campoMensagem, erro);
  }
};

let form = document.getElementById("f1");

submit.addEventListener("click", function(e) {
  const isValid = validarNome() && validacaoEmail() && validarTelefone() && validarRadio() && validarSelect() && validarCheckbox() && validarMensagem();
  if (isValid) {
    alert("Formulário enviado com sucesso!");
    form.reset();
    for (let j = 0; j < checks.length; j++) {
      checks[j].classList.remove("marcado");
    }
    select.firstElementChild.textContent = "Escolha uma opção";
    outras.classList.add("hide");
    for (let checkbox of checkboxes) {
      checkbox.classList.remove("marcadoCheck");
    }

  }
});


