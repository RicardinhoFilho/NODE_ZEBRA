const { exec, spawn } = require('child_process');
const fs = require('fs');
//const  setInterval = require('timers/promises');
const parametros = "./parametros.txt";
const prototipo = "./prototipo.txt";
const etiquetaFinal = "./Etiqueta.prn";
let pastaTXT = "./pasta.txt"
let executavel = ""





//DEFINE ESPAÇAMENTO BARCODE - Começando com 110 e diminuindo 10 para cada caractere
function formataBarCode(cod) {
    if (!cod) {
        throw 'Código undefined';
    }

    let teste = '0000000000';
    return teste.substring(0, teste.length - cod.length) + cod;
}

async function executa() {
    fs.readFile(pastaTXT, 'utf8', function (err, data) {
        console.log(data)
        executavel = data + 'helper.bat';
        console.log(executavel);



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




                            console.log('objeto', codigo_e_nome[1].length)

                            if (err) throw err;
                            const codigo = formataBarCode(codigo_e_nome[0]);

                            data = data.replace("Codigo", codigo);
                            // data = data.replace("Objeto1", 
                            // `^FT55,58^A0N,17,18^FH\^CI28^FD${codigo_e_nome[1].substring(0, 25)}^FS^CI27`);
                            // data = data.replace("Objeto2",`^FT55,78^A0N,17,18^FH\^CI28^FD${codigo_e_nome[1].substring(25, 50)}^FS^CI27`);
                            data = data.replace("Objeto1",codigo_e_nome[1].substring(0, 25));
                            data = data.replace("Objeto2", codigo_e_nome[1].substring(25, 50));

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

    })
}

executa();

console.log(executavel)