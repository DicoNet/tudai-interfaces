document.addEventListener("DOMContentLoaded", iniciar);

function iniciar() {
    "use strict"

    /*let ctx = canvas.getContext('2d');

    let width = canvas.width;
    let height = canvas.height;

    new ImageData(width, height);*/



    ejercicio1();

    /*Repaso Javascript: Definir una matriz de 100 elementos x 100 elementos y completarla con valores enteros random, y resuelva los siguientes incisos: 
 
 Escribir una función que retorne el valor máximo de toda la matriz 
 Escribir una función que retorne el valor máximo contenido en las filas pares y el valor mínimo en las filas impares 
 Calcular el valor promedio de cada fila y guardarlos en un arreglo. 
 */
    function ejercicio1() {
        let X = 100;
        let Y = 100;

        let matriz = [];

        for (let i = 0; i < X; i++) {
            for (let j = 0; j < Y; j++) {
                matriz[i, j] = Math.floor(Math.random() * (1000 - 1) + 1);
            }
        }

        let maxValor = ejercicio1A(matriz);
        console.log(maxValor);

        let maxfilaPar = ejercicio1B(matriz);
        console.log(maxfilaPar);

        let minfilaImpar = ejercicio1B2(matriz);
        console.log(minfilaImpar);

        let promedios = ejercicio1C(matriz);
        console.log(promedios);
    }

    function ejercicio1A(matriz) {
        let maxValor = 0;
        let X = 100;
        let Y = 100;

        for (let i = 0; i < X; i++) {
            for (let j = 0; j < Y; j++) {
                if (matriz[i, j] > maxValor) {
                    maxValor = matriz[i, j]
                }
            }
        }

        return maxValor;

    }

    function ejercicio1B(matriz) {
        let maxfilaPar = 0;
        let X = 100;
        let Y = 100;

        for (let i = 0; i < X; i++) {
            for (let j = 0; j < Y; j++) {
                if (j % 2 == 0 && matriz[i, j] > maxfilaPar) {
                    maxfilaPar = matriz[i, j]
                }
            }
        }

        return maxfilaPar;
    }

    function ejercicio1B2(matriz) {
        let minfilaImpar = 1000;
        let X = 100;
        let Y = 100;

        for (let i = 0; i < X; i++) {
            for (let j = 0; j < Y; j++) {
                if (j % 2 != 0 && matriz[i, j] < minfilaImpar) {
                    minfilaImpar = matriz[i, j]
                }
            }
        }

        return minfilaImpar;
    }

    function ejercicio1C(matriz) {
        let X = 100;
        let Y = 100;
        let promedios = [];
        let totalFila = 0;

        for (let i = 0; i < X; i++) {
            for (let j = 0; j < Y; j++) {
                totalFila += matriz[i, j];
            }
            promedios.push(totalFila / Y);
            totalFila = 0;
        }

        return promedios;
    }
}