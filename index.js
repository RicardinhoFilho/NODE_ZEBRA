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




                          

                            if (err) throw err;
                            const codigo = formataBarCode(codigo_e_nome[0]);

                            data = data.replace("Codigo", codigo);
                            
                            let objeto1 = codigo_e_nome[1].substring(0, 25);
                            let objeto2 = codigo_e_nome[1].substring(25, 50);
                            if(codigo_e_nome[1].length > 25)
                            if((codigo_e_nome[1].substring(25) != " " ||  codigo_e_nome[1].substring(25) != "-" ||   codigo_e_nome[1].substring(25) != "_") &&(codigo_e_nome[1].substring(26) != " " ||  codigo_e_nome[1].substring(26) != "-" ||   codigo_e_nome[1].substring(26) != "_") ){
                                let aux = objeto1.split(" ");
                                
                                let determinante = aux[aux.length - 1];
                                console.log('Esta é o tamanho-> ', aux.length)
                                console.log('Esta é a determinante-> ', determinante)
                                objeto1 = objeto1.replace(determinante, "");
                                objeto2 = determinante + codigo_e_nome[1].substring(25, 50);
                            }

                            data = data.replace("Objeto1",objeto1);
                            data = data.replace("Objeto2", objeto2);

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