document.addEventListener("DOMContentLoaded", iniciar);

function iniciar() {
    "use strict"

    /**
     * Creo el cambas y el contesto de trabajo.
     */
    let canvas = document.getElementById("miCanvas");
    let ctx = canvas.getContext("2d");
    let a = 255;
    let width = canvas.width;
    let height = canvas.height;

    let x = 0;
    let y = 0;


    function dibujando() {
        let dibujando = false;
        let rect = canvas.getBoundingClientRect();

        let colorLapiz = document.getElementById("colorLapiz");
        let grosorLapiz = document.getElementById("grosorLapiz");

        canvas.addEventListener('mousedown', function (e) {
            console.log(colorLapiz.value);
            console.log(grosorLapiz.value);
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
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.closePath();
        }
    }

    /* function borrar(){
        let dibujando = false;
        let rect = canvas.getBoundingClientRect();
    
        let grosorGoma = document.getElementById("grosorGoma");

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
            ctx.strokeStyle = 'white';
            ctx.lineWidth = grosorGoma.value;
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.closePath();
        }
    }*/
    function borrar() {
        console.log(document.getElementById("colorLapiz").value);
        document.getElementById("colorLapiz").value = '#ffffff';
    }
    let goma = document.getElementById("goma").addEventListener("click", borrar);
    let lapiz = document.getElementById("lapiz").addEventListener("click", dibujando);

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

                    mostrarImagen(this);
                    let imgData = ctx.getImageData(0, 0, width, height);
                    switch (selectfiltro.value) {
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
                    }
                    ctx.putImageData(imgData, 0, 0);
                }
                function mostrarImagen(imagen) {
                    ctx.drawImage(imagen, 0, 0);
                }

            }
            document.getElementById("imgElegida").value = "";
        }
    }

    let selectfiltro = document.getElementById("tipoFiltro");
    document.getElementById("tipoFiltro").addEventListener('click', imagen);

    /**
     * Carga la imagen y la muestra en pantalla.
     */
    function imagen() {

        let imagen = new Image();
        imagen.src = "img/paisaje.jpg";

        let imgData;
        imagen.onload = function () {
            mostrarImagen(this);
            imgData = ctx.getImageData(0, 0, width, height);
            switch (selectfiltro.value) {
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
            }
            ctx.putImageData(imgData, 0, 0);
        }
        function mostrarImagen(imagen) {
            ctx.drawImage(imagen, 0, 0);
        }
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




}
