class Celda {
    constructor(posx, posy, contexto, ficha) {

        if (ficha == null)
            this.Ficha = null; //poder poner una ficha dendtro de la celda
        else
            this.Ficha = ficha;
        this.posx = posx;
        this.posy = posy;
        this.imagenCelda = new Image();
        this.imagenCelda.src = "img/celda.png";
        this.imagenCelda.height = 60;
        this.imagenCelda.width = 60;
        this.ctx = contexto;
        this.width = 60;
        this.height = 60;
    }


    draw() {
        if (this.Ficha == null)
            this.ctx.drawImage(this.imagenCelda, this.posx, this.posy, this.imagenCelda.width, this.imagenCelda.height);
        else {
            this.ctx.drawImage(this.imagenCelda, this.posx, this.posy, this.imagenCelda.width, this.imagenCelda.height);
            this.Ficha.setPosition(this.posx + 30, this.posy + 30);
            this.Ficha.draw();
        }
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    isPointInside(x, y) {
        return !(x < this.posx || x > this.posx + this.width || y < this.posy || y > this.posy + this.height)
    };

    setPosition(x, y) {
        this.posx = x;
        this.posy = y;
    }

    getPosition() {
        return {
            x: this.getPosX,
            y: this.getPosY
        };
    }

    getPosX() {
        return this.posx;
    }

    getPosY() {
        return this.posy;
    }

}