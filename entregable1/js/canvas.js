document.addEventListener("DOMContentLoaded", iniciar);

function iniciar() {


    /**
     * Creo el canvas y el contexto de trabajo.
     */
    let canvas = document.getElementById("miCanvas");
    let ctx = canvas.getContext("2d");
    let a = 255;
    let width = canvas.width;
    let height = canvas.height;

    let x = 0;
    let y = 0;


    function dibujando() {
        document.getElementById("colorLapiz").value = 'black';
        document.getElementById("colorLapiz").classList.remove("ocultar");
        let input = document.getElementById("inputsLapiz");
        ocultarInput(input);

        let dibujando = false;
        let rect = canvas.getBoundingClientRect();

        let colorLapiz = document.getElementById("colorLapiz");
        let grosorLapiz = document.getElementById("grosorLapiz");

        canvas.addEventListener('mousedown', function (e) {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            dibujando = true;
        });
        canvas.addEventListener('mousemove', function (e) {
            if (dibujando === true) {
                dibujar(x, y, e.clientX - rect.left, e.clientY - rect.top);
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;
            }
        });
        canvas.addEventListener('mouseup', function (e) {
            if (dibujando === true) {
                dibujar(x, y, e.clientX - rect.left, e.clientY - rect.top);
                x = 0;
                y = 0;
                dibujando = false;
            }
        });

        function dibujar(x1, y1, x2, y2) {
            ctx.beginPath();
            ctx.strokeStyle = colorLapiz.value;
            ctx.lineWidth = grosorLapiz.value;
            ctx.lineCap = "round";
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.closePath();
        }
    }


    function borrar() {
        document.getElementById("colorLapiz").classList.add("ocultar");
        document.getElementById("colorLapiz").value = '#ffffff';
    }
    document.getElementById("goma").addEventListener("click", borrar);
    document.getElementById("lapiz").addEventListener("click", dibujando);

    document.getElementById("imgElegida").addEventListener('change', cargarFoto);
    /**
     * Cargo la foto al canvas y aplico el filtro correspondiente.
     * @param {} e 
     */
    function cargarFoto(e) {
        if (document.getElementById("imgElegida").value != "") {
            //Resetear el canvas o a lo sumo ponerlo todo en blanco

            let file = e.target.files[0];

            let reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = readerEvent => {
                let content = readerEvent.target.result;

                let image = new Image();

                image.src = content;
                image.onload = function () {

                    width = Math.min(canvas.width / this.width, canvas.height / this.height) * this.width;
                    height = Math.min(canvas.width / this.width, canvas.height / this.height) * this.height;
                    mostrarImagen(this);

                    let imgData = ctx.getImageData(0, 0, width, height);

                    ctx.putImageData(imgData, 0, 0);
                }
                function mostrarImagen(imagen) {

                    ctx.drawImage(imagen, 0, 0, width, height);
                }

            }
            document.getElementById("imgElegida").value = "";
        }
    }

    let selectfiltro = document.getElementById("tipoFiltro");
    selectfiltro.addEventListener('click', AplicarFiltro);

    document.getElementById("filtro").addEventListener("click", function () {
        let input = document.getElementById("tipoFiltro");
        ocultarInput(input);
    });

    /**
     * Carga la imagen y la muestra en pantalla.
     */
    function AplicarFiltro() {

        let imgData = ctx.getImageData(0, 0, width, height);
        switch (selectfiltro.value) {
            case "-": {
                break;
            }
            case "escalaGrises": {
                filtroEscalaGrises(imgData, a);
                break;
            }
            case "binario": {
                filtroBinario(imgData, a);
                break;
            }
            case "binarioInverso": {
                filtroInvertido(imgData, a);
                break;
            }
            case "negativo": {
                filtroNegativo(imgData, a);
                break;
            }
            case "sepia": {
                FiltroSepia(imgData);
                break;
            }
            case "saturado": {
                let selectFiltro = document.getElementById("tipoFiltro");
                let saturado = document.getElementById("CantidadSaturado");
                ocultarInput(saturado);
                aparecerInput(selectFiltro);
                filtroSaturado();
                break;
            }
            case "blur": {
                let selectFiltro = document.getElementById("tipoFiltro");
                let blur = document.getElementById("CantidadBlur");
                ocultarInput(blur);
                aparecerInput(selectFiltro);
                filtroSaturado();
                break;
            }

        }
        ctx.putImageData(imgData, 0, 0);



    }

    //imagen();
    //let imgData = ctx.createImageData(width, height);

    // rectanguloGradiante(imgData, a);
    // ctx.putImageData(imgData, x, y) * 4;


    /**
     * Convierte la imagen en una imagen de escala de grises.
     */
    function filtroEscalaGrises(imgData, a) {

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let color1 = getRed(imgData, x, y);
                let color2 = getGreen(imgData, x, y);
                let color3 = getBlue(imgData, x, y);
                let gris = (color1 + color2 + color3) / 3;
                setPixel(imgData, x, y, gris, gris, gris, a);
            }
        }
    }

    function filtroNegativo(imgData, a) {

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let color1 = 255 - getRed(imgData, x, y);
                let color2 = 255 - getGreen(imgData, x, y);
                let color3 = 255 - getBlue(imgData, x, y);

                setPixel(imgData, x, y, color1, color2, color3, a);
            }
        }
    }

    function filtroBinario(imgData, a) {

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let color1 = getRed(imgData, x, y);
                let color2 = getGreen(imgData, x, y);
                let color3 = getBlue(imgData, x, y);
                let tono = 0;
                let promedio = (color1 + color2 + color3) / 3;
                if (promedio > 255 / 2) {
                    tono = 255;
                }
                else {
                    tono = 0;
                }
                setPixel(imgData, x, y, tono, tono, tono, a);
            }
        }
    }
    function filtroInvertido(imgData, a) {

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let color1 = getRed(imgData, x, y);
                let color2 = getGreen(imgData, x, y);
                let color3 = getBlue(imgData, x, y);
                let tono = 0;
                let promedio = (color1 + color2 + color3) / 3;
                if (promedio < 255 / 2) {
                    tono = 255;
                }
                else {
                    tono = 0;
                }
                setPixel(imgData, x, y, tono, tono, tono, a);
            }
        }
    }

    function FiltroSepia(ImgData) {
        for (let y = 0; y < ImgData.height; y++) {
            for (let x = 0; x < ImgData.width; x++) {
                let index = (x + ImgData.width * y) * 4;
                let luminosidadPixel = .3 * ImgData.data[index + 0] + .6 * ImgData.data[index + 0] + .1 * ImgData.data[index + 0];
                ImgData.data[index + 0] = Math.min(luminosidadPixel + 40, 255);
                ImgData.data[index + 1] = Math.min(luminosidadPixel + 15, 255);
                ImgData.data[index + 2] = luminosidadPixel;
            }
        }
        ctx.putImageData(ImgData, 0, 0);
    }
    //<-------------------------------------------<FILTROS AVANZADOS>------------------------------------------------------>
    document.getElementById("CantidadBlur").addEventListener("change", filtroBlur);
    function filtroBlur() {
        let ImgData = ctx.getImageData(0, 0, width, height);
        let cant_saturado = document.getElementById("CantidadBlur").value;
        cant_saturado = parseInt(cant_saturado, 10);
        let matriz = [[1, 2, 1],
        [2, 4, 2],
        [1, 2, 1]];
        let w = ImgData.width;
        let h = ImgData.height;

        for (let i = 0; i < cant_saturado; i++) {

            for (let x = 0; x < w; x++) {
                for (let y = 0; y < h; y++) {
                    let ul = ((x - 1 + w) % w + w * ((y - 1 + h) % h)) * 4; // location of the UPPER LEFT
                    let uc = ((x - 0 + w) % w + w * ((y - 1 + h) % h)) * 4; // location of the UPPER CENTER
                    let ur = ((x + 1 + w) % w + w * ((y - 1 + h) % h)) * 4; // location of the UPPER RIGHT
                    let ml = ((x - 1 + w) % w + w * ((y + 0 + h) % h)) * 4; // location of the LEFT
                    let mc = ((x - 0 + w) % w + w * ((y + 0 + h) % h)) * 4; // location of the CENTER PIXEL
                    let mr = ((x + 1 + w) % w + w * ((y + 0 + h) % h)) * 4; // location of the RIGHT
                    let ll = ((x - 1 + w) % w + w * ((y + 1 + h) % h)) * 4; // location of the LOWER LEFT
                    let lc = ((x - 0 + w) % w + w * ((y + 1 + h) % h)) * 4; // location of the LOWER CENTER
                    let lr = ((x + 1 + w) % w + w * ((y + 1 + h) % h)) * 4; // location of the LOWER RIGHT

                    p0 = ImgData.data[ul] * matriz[0][0]; // upper left
                    p1 = ImgData.data[uc] * matriz[0][1]; // upper mid
                    p2 = ImgData.data[ur] * matriz[0][2]; // upper right
                    p3 = ImgData.data[ml] * matriz[1][0]; // left
                    p4 = ImgData.data[mc] * matriz[1][1]; // center pixel
                    p5 = ImgData.data[mr] * matriz[1][2]; // right
                    p6 = ImgData.data[ll] * matriz[2][0]; // lower left
                    p7 = ImgData.data[lc] * matriz[2][1]; // lower mid
                    p8 = ImgData.data[lr] * matriz[2][2]; // lower right
                    let red = (p0 + p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8) / 16;

                    p0 = ImgData.data[ul + 1] * matriz[0][0]; // upper left
                    p1 = ImgData.data[uc + 1] * matriz[0][1]; // upper mid
                    p2 = ImgData.data[ur + 1] * matriz[0][2]; // upper right
                    p3 = ImgData.data[ml + 1] * matriz[1][0]; // left
                    p4 = ImgData.data[mc + 1] * matriz[1][1]; // center pixel
                    p5 = ImgData.data[mr + 1] * matriz[1][2]; // right
                    p6 = ImgData.data[ll + 1] * matriz[2][0]; // lower left
                    p7 = ImgData.data[lc + 1] * matriz[2][1]; // lower mid
                    p8 = ImgData.data[lr + 1] * matriz[2][2]; // lower right
                    let green = (p0 + p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8) / 16;

                    p0 = ImgData.data[ul + 2] * matriz[0][0]; // upper left
                    p1 = ImgData.data[uc + 2] * matriz[0][1]; // upper mid
                    p2 = ImgData.data[ur + 2] * matriz[0][2]; // upper right
                    p3 = ImgData.data[ml + 2] * matriz[1][0]; // left
                    p4 = ImgData.data[mc + 2] * matriz[1][1]; // center pixel
                    p5 = ImgData.data[mr + 2] * matriz[1][2]; // right
                    p6 = ImgData.data[ll + 2] * matriz[2][0]; // lower left
                    p7 = ImgData.data[lc + 2] * matriz[2][1]; // lower mid
                    p8 = ImgData.data[lr + 2] * matriz[2][2]; // lower right
                    let blue = (p0 + p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8) / 16;

                    ImgData.data[mc] = red;
                    ImgData.data[mc + 1] = green;
                    ImgData.data[mc + 2] = blue;
                    ImgData.data[mc + 3] = ImgData.data[lc + 3];
                }
            }
        }
        ctx.putImageData(ImgData, 0, 0);
    }


    function filtroSaturado() {
        let ImgData = ctx.getImageData(0, 0, width, height);
        let saturado = document.getElementById("CantidadSaturado").value;

        if (saturado > 1) {
            for (let y = 0; y < ImgData.height; y++) {
                for (let x = 0; x < ImgData.width; x++) {
                    let index = (x + ImgData.width * y) * 4;
                    let colorRgb = [ImgData.data[index + 0], ImgData.data[index + 1], ImgData.data[index + 2]]
                    let colorHsv = RGBtoHSV(colorRgb);
                    colorHsv[1] *= saturado;
                    let colorfinal = HSVtoRGB(colorHsv);
                    ImgData.data[index + 0] = colorfinal[0];
                    ImgData.data[index + 1] = colorfinal[1];
                    ImgData.data[index + 2] = colorfinal[2];
                }
            }
            ctx.putImageData(ImgData, 0, 0);
        }
    }

    document.getElementById("CantidadSaturado").addEventListener("change", filtroSaturado);
    function RGBtoHSV(color) {
        var r, g, b, h, s, v;
        r = color[0];
        g = color[1];
        b = color[2];
        min = Math.min(r, g, b);
        max = Math.max(r, g, b);


        v = max;
        delta = max - min;
        if (max != 0)
            s = delta / max;
        else {

            s = 0;
            h = -1;
            return [h, s, undefined];
        }
        if (r === max)
            h = (g - b) / delta;
        else if (g === max)
            h = 2 + (b - r) / delta;
        else
            h = 4 + (r - g) / delta;
        h *= 60;
        if (h < 0)
            h += 360;
        if (isNaN(h))
            h = 0;
        return [h, s, v];
    }

    function HSVtoRGB(color) {
        var i;
        var h, s, v, r, g, b;
        h = color[0];
        s = color[1];
        v = color[2];
        if (s === 0) {

            r = g = b = v;
            return [r, g, b];
        }
        h /= 60;
        i = Math.floor(h);
        f = h - i;
        p = v * (1 - s);
        q = v * (1 - s * f);
        t = v * (1 - s * (1 - f));
        switch (i) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            default:
                r = v;
                g = p;
                b = q;
                break;
        }
        return [r, g, b];
    }




    //<-------------------------------------------</FILTROS AVANZADOS>------------------------------------------------------>


    function guardarFoto() {

        let canvasURL = canvas.toDataURL();
        let a = document.createElement('a');
        a.href = canvasURL;
        a.download = "imagen";
        a.click();

    }
    document.querySelector(".guardar").addEventListener("click", guardarFoto);

    document.getElementById("cargarImg").addEventListener("click",mostrarElegirImagen);
    function mostrarElegirImagen(){
        let inputImg = document.getElementById("imgElegida");
        ocultarInput(inputImg);
    }

    function getRed(imgData, x, y) {
        let index = 0;
        index = (x + y * imgData.width) * 4;
        return imgData.data[index + 0];
    }
    function getGreen(imgData, x, y) {
        let index = 0;
        index = (x + y * imgData.width) * 4;
        return imgData.data[index + 1];
    }
    function getBlue(imgData, x, y) {
        let index = 0;
        index = (x + y * imgData.width) * 4;
        return imgData.data[index + 2];
    }


    function setPixel(imgData, x, y, r, g, b, a) {

        let index = 0;
        index = (x + y * imgData.width) * 4;
        imgData.data[index + 0] = r;
        imgData.data[index + 1] = g;
        imgData.data[index + 2] = b;
        imgData.data[index + 3] = a;

    }

    function ocultarInput(input) {
        document.getElementById("inputsLapiz").classList.add("ocultar");
        document.getElementById("grosorGomaDeBorrar").classList.add("ocultar");
        document.getElementById("CantidadSaturado").classList.add("ocultar");
        document.getElementById("CantidadBlur").classList.add("ocultar");
        document.getElementById("tipoFiltro").classList.add("ocultar");
        document.getElementById("imgElegida").classList.add("ocultar");

        input.classList.remove("ocultar");
    }
    function aparecerInput(input) {
        input.classList.remove("ocultar");
    }
}