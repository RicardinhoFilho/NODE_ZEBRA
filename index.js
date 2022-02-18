const { exec, spawn } = require('child_process');
const fs = require('fs');
//const  setInterval = require('timers/promises');
const parametros = "./parametros.txt";
const prototipo = "./prototipo.txt";
const etiquetaFinal = "./Etiqueta.prn";
const executavel = "C:\\Users\\User\\Desktop\\ZEBRA-NODE\\helper.bat"


// exec('./helper.bat', (err, stdout, stderr) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(stdout);
//   });
async function executa() {
    fs.readFile(parametros, 'utf8', function (err, data) {
        //console.log(data);

        let lista = data.split("\n")

        // lista.forEach((element) => {
        for (let index = 0; index < lista.length; index++) {
            // 

           async function teste(){
                await new Promise(r => setTimeout(()=>{
                    console.log("Olha o timeout")
                    const element = lista[index];
                    const codigo_e_nome = element.split(",");

            console.log(codigo_e_nome[0])// CÓDIGO
            console.log(codigo_e_nome[1])// NOME

            fs.readFile(prototipo, 'utf8', function (err, data) {
                if (err) throw err;
                data = data.replace("Codigo", codigo_e_nome[0]);
                data = data.replace("Objeto", codigo_e_nome[1]);
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