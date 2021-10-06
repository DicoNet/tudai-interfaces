class Partida {
    constructor(canvas, ctx, canvasWidth, canvasHeight) {
        this.jugador1 = new Jugador("Jugador 1", 21);
        this.jugador2 = new Jugador("Jugador 2", 21);
        this.fichas = [];
        this.fichas2 = [];
        this.tablero = [];
        this.lastClickedFigure = null;
        this.isMouseDown = false;

        this.canvas = canvas;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.ctx = ctx;

        this.celdaX = canvasWidth / 3;
        this.celdaY = canvasHeight - 60;

        this.posX = canvasWidth - 40;
        this.posY = canvasHeight - 20;

        this.posX2 = 40;
        this.posY2 = canvasHeight - 20;
    }


    //celdaX = canvasWidth / 3;
    //celdaY = canvasHeight - 60;
    addCelda() {
        if (this.tablero.length != 0) {
            if (this.tablero.length % 7 != 0) {
                this.celdaX = this.celdaX + this.tablero[this.tablero.length - 1].getWidth();
                this.celdaY = this.celdaY;
            }
            else {
                this.celdaX = this.canvasWidth / 3;
                this.celdaY = this.celdaY - this.tablero[this.tablero.length - 1].getHeight();
            }
        }
        let celda = new Celda(this.celdaX, this.celdaY, this.ctx, null);
        this.tablero.push(celda);
    }
    completarTablero() {
        console.log("llego tablero");
        let cantCeldas = 42;

        for (let index = 0; index < cantCeldas; index++) {
            this.addCelda();
        }
    }
    dibujarTablero() {
        for (let index = 0; index < this.tablero.length; index++) {
            this.tablero[index].draw();
        }
    }


    completarFichas() {
        let cantFichas = 21;

        for (let index = 0; index < cantFichas; index++) {
            this.addFicha();
            this.addFicha2();
        }
    }

    dibujarFichas() {

        for (let index = 0; index < this.fichas2.length; index++) {
            this.fichas[index].draw();
            this.fichas2[index].draw();
        }
    }

    dibujar() {
        this.clearCanvas();
        this.dibujarTablero();
        this.dibujarFichas();
    }

    //posX = canvasWidth - 40;
    //posY = canvasHeight - 20;

    addFicha() {
        let color = 'red';
        if (this.fichas.length != 0) {
            if (this.fichas.length % 10 != 0) {
                this.posY = this.posY - 40;
            }
            else {
                this.posX = this.posX - 40;
                this.posY = this.canvasHeight - 20;
            }
        }

        let ficha = new Ficha(this.posX, this.posY, color, this.ctx);
        this.fichas.push(ficha);
    }

    //posX2 = 40;
    //posY2 = canvasHeight - 20;

    addFicha2() {
        let color = 'red';
        if (this.fichas2.length != 0) {
            if (this.fichas2.length % 10 != 0) {
                this.posY2 = this.posY2 - 40;
            }
            else {
                this.posX2 = this.posX2 + 40;
                this.posY2 = this.canvasHeight - 20;
            }
        }

        let ficha = new Ficha(this.posX2, this.posY2, color, this.ctx);
        this.fichas2.push(ficha);
    }

    clearCanvas() {
        console.log(this.ctx);
        this.ctx.fillStyle = '#F8F8FF';
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }


    findClickedFigure(x, y) {
        for (let index = 0; index < this.fichas.length; index++) {
            const element = this.fichas[index];
            if (element.isPointInside(x, y)) {
                return element;
            }
        }
    }
    onMouseDown(e) {
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
    onMouseUp(e) {
        isMouseDown = false;
    }
    onMouseMove(e) {
        if (isMouseDown && lastClickedFigure != null) {
            lastClickedFigure.setPosition(e.layerX, e.layerY);
            dibujar();
        }
    }


    iniciarPartida() {
        console.log(this.celdaX);
        this.completarTablero();
        this.completarFichas();
        this.dibujar();

        this.canvas.addEventListener('mousedown', onMouseDown, false);
        this.canvas.addEventListener('mouseup', onMouseUp, false);
        this.canvas.addEventListener('mousemove', onMouseMove, false);
    }
}