"use strict";

/* Selecionando os elementos que serão manipulados */
const formulario = document.querySelector("form");

// Programação do Formspree 

async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: formulario.method,
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        status.innerHTML = "Seus dados foram enviados! Obrigado.";
        formulario.reset()
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
          } else {
            status.innerHTML = "Oops! Algo deu errado."
          }
        })
      }
    }).catch(error => {
      status.innerHTML = "Oops! Algo deu errado."
    });
  }
  formulario.addEventListener("submit", handleSubmit)