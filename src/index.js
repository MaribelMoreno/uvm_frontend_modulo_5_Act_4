import _, { forEach } from 'lodash';
import './style.scss';
import imageResource from './clasificacion-de-los-animales.jpg';
import datos from './datos.csv';
import yaml from './datos.yaml';
import json5 from './datos.json5';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js').then(registration => {
            console.log("SW Registrado ", registration)
        }).catch(err => {
            console.log("SW No Registrado", err)
        });
    });
}

function componente() {

    const elemento = document.createElement('div');
    const h1 = document.createElement('h1');
    const divContainer = document.createElement('div');
    h1.innerHTML = _.join(['Animales', datos[0][0]], ' ');
    elemento.appendChild(h1);

    const image = new Image();
    image.src = imageResource;
    insertAfter(h1, image)



    let lastElementAux;
    datos[1].forEach((dato, index) => {
        if (index === 0) {
            let h2 = document.createElement('h2');
            h2.innerText = dato;
            divContainer.appendChild(h2);
            let p = document.createElement('p');
            p.innerText = datos[2][index];
            insertAfter(h2,p);
            lastElementAux = p;
        } else {
            let h2 = document.createElement('h2');
            h2.innerText = dato;
            insertAfter(lastElementAux,h2);
            let p = document.createElement('p');
            p.innerText = datos[2][index];
            insertAfter(h2,p);
            lastElementAux = p;
        }
    })

    insertAfter(image, divContainer);

    //Styles
    elemento.classList.add('divMain');
    h1.classList.add('titulo');
    console.log(datos);
    return elemento;
}

console.log(yaml.title);
console.log(json5.owner.name);

function insertAfter(e, i) {
    if (e.nextSibling) {
        e.parentNode.insertBefore(i, e.nextSibling);
    } else {
        e.parentNode.appendChild(i);
    }
}

document.body.appendChild(componente());