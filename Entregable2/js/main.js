document.addEventListener("DOMContentLoaded", iniciar);

function iniciar() {
    "use strict"

    let canvas = document.getElementById("miCanvas");
    let ctx = canvas.getContext("2d");
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;

    const CANT_FIG = 42;

    let fichas = [];
    let fichas2 = [];
    let tablero = [];//temp
    let lastClickedFigure = null;
    let isMouseDown = false;

    /*  function addFigura() {
          //   addFicha();
          addCelda();
          drawFigure();
      }
  
      function addFiguras() {
          addFigura();
          if (celdas.length < CANT_FIG) {
              setTimeout(addFiguras, 333);
          }
      }
  
      setTimeout(() => {
          addFiguras();
      }, 333);*/







    let celdaX = canvasWidth / 3;
    let celdaY = canvasHeight - 60;
    function addCelda() {
        if (tablero.length == 0) {
            celdaX = celdaX;
            celdaY = celdaY;
        }
        else {
            if (tablero.length % 7 != 0) {
                celdaX = celdaX + tablero[tablero.length - 1].getWidth();
                celdaY = celdaY;
            }
            else {
                celdaX = canvasWidth / 3;
                celdaY = celdaY - tablero[tablero.length - 1].getHeight();
            }
        }
        let celda = new Celda(celdaX, celdaY, ctx, null);
        tablero.push(celda);
    }
    function completarTablero() {
        let cantCeldas = 42;

        for (let index = 0; index < cantCeldas; index++) {
            addCelda();
        }
    }
    function dibujarTablero() {
        for (let index = 0; index < tablero.length; index++) {
            tablero[index].draw();
        }
    }


    function completarFichas() {
        let cantFichas = 21;

        for (let index = 0; index < cantFichas; index++) {
            addFicha();
            addFicha2();
        }
    }

    function dibujarFichas() {

        for (let index = 0; index < fichas2.length; index++) {
            fichas[index].draw();
            fichas2[index].draw();
        }
    }

    function dibujar() {
        clearCanvas();
        dibujarTablero();
        dibujarFichas();
    }

    let posX = canvasWidth - 40;
    let posY = canvasHeight - 20;

    function addFicha() {
        let color = 'red';
        if (fichas.length != 0) {
            if (fichas.length % 10 != 0) {
                posY = posY - 40;
            }
            else {
                posX = posX - 40;
                posY = canvasHeight - 20;
            }
        }

        let ficha = new Ficha(posX, posY, color, ctx);
        fichas.push(ficha);
    }

    let posX2 = 40;
    let posY2 = canvasHeight - 20;

    function addFicha2() {
        let color = 'red';
        if (fichas2.length != 0) {
            if (fichas2.length % 10 != 0) {
                posY2 = posY2 - 40;
            }
            else {
                posX2 = posX2 + 40;
                posY2 = canvasHeight - 20;
            }
        }

        let ficha = new Ficha(posX2, posY2, color, ctx);
        fichas2.push(ficha);
    }

    function clearCanvas() {
        ctx.fillStyle = '#F8F8FF';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }


    function findClickedFigure(x, y) {
        for (let index = 0; index < fichas.length; index++) {
            const element = fichas[index];
            if (element.isPointInside(x, y)) {
                return element;
            }
        }
    }
    function onMouseDown(e) {
        isMouseDown = true;

        if (lastClickedFigure != null) {
            lastClickedFigure.setResaltado(false);
            lastClickedFigure = null;
        }

        let clickFig = findClickedFigure(e.layerX, e.layerY); //coordenadas de x e y adentro del canvans
        if (clickFig != null) {
            clickFig.setResaltado(true);
            lastClickedFigure = clickFig;
        }
        dibujar();
    }
    function onMouseUp(e) {
        isMouseDown = false;
    }
    function onMouseMove(e) {
        if (isMouseDown && lastClickedFigure != null) {
            lastClickedFigure.setPosition(e.layerX, e.layerY);
            dibujar();
        }
    }
    completarTablero();
    completarFichas();
    dibujar();

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMove, false);

}