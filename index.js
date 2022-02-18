const { exec, spawn } = require('child_process');
const fs = require('fs');
//const  setInterval = require('timers/promises');
const parametros = "./parametros.txt";
const prototipo = "./prototipo.txt";
const etiquetaFinal = "./Etiqueta.prn";
const executavel = "C:\\Users\\User\\Desktop\\ZEBRA-NODE\\helper.bat"


function defineEspacamentoBarras(cod) {
    let nCasasBarCode = 110;
    if (cod.length > 1) {
        for (let index = 0; index < cod.length; index++) {
            nCasasBarCode = nCasasBarCode - 10;

        }
    }
    return nCasasBarCode;
}

function defineEspacamentoObjeto(cod){
    let nCasas = 135;
    if (cod.length > 1) {
        for (let index = 0; index < cod.length; index++) {
            nCasas = nCasas - 2;

        }
    }
    return nCasas;
}
async function executa() {
    fs.readFile(parametros, 'utf8', function (err, data) {
        //console.log(data);

        let lista = data.split("\n")

        // lista.forEach((element) => {
        for (let index = 0; index < lista.length; index++) {
            // 

            async function teste() {
                await new Promise(r => setTimeout(() => {
                    console.log("Olha o timeout")
                    const element = lista[index];
                    const codigo_e_nome = element.split(",");

                    console.log(codigo_e_nome[0])// CÓDIGO
                    console.log(codigo_e_nome[1])// NOME

                    fs.readFile(prototipo, 'utf8', function (err, data) {






                        if (err) throw err;
                        let nCasasBarCode = defineEspacamentoBarras(codigo_e_nome[0]);
                        let nCasasObjeto =defineEspacamentoObjeto(codigo_e_nome[1]); 
                        data = data.replace("^FTO", `^FT${nCasasBarCode},63^A0N,20,20^FH\^CI28^FDObjeto^FS^CI27`)
                        data = data.replace("Codigo", codigo_e_nome[0]);
                        data = data.replace("Objeto", codigo_e_nome[1]);
                        data = data.replace("^BY", `^BY2,3,72^FT${nCasasBarCode},142^BCN,,Y,N`);
                        console.log(data)

                        fs.writeFile(etiquetaFinal, data, (err) => {
                            if (err) return console.log(err);
                            // await delay(1000)

                            exec(executavel, (err, stdout, stderr) => {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
                                console.log(stdout);
                            });


                        });


                    });
                }, 2000 * (index + 1)));
                //


            }


            teste()
        }


    });

    // });


}
executa();