import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from  'fs'



menu()

function menu(){
      inquirer
        .prompt([
        {
          type: 'list',
          name: 'css',
          message: 'O que você deseja fazer?',
          choices: [
            'Adicionar CSS',
            'ver lista de propiedades',
            'Remover propiedade',
            'Sair',
          ],
        },
      ])
      .then((resposta) => {
        const resp= resposta['css']

        if(resp === 'Adicionar CSS'){
            Addprop()
         }else if(resp ==='ver lista de propiedades' ){
            getProp()
         }else if (resp === 'Remover propiedade'){
             droplist()
         }else if(resp === 'Sair'){
           sair()
         }
   
        })    
        .catch((err) => console.log(err));

}  



  function orderList(){
    getProp()
}



function Addprop(){
  inquirer
    .prompt([
      {
        name: 'prop',
        message: 'Digite uma propriedade CSS: '
      }

  ])
  .then((resposta)=>{
      const resp = resposta['prop'];

    if(resp === 'sair'){
      sair()
    }

    if(Chekprop(resp)){
      console.log(chalk.bgRed.black('essa propiedade já existe!!'));
      Addprop()
    }else{
      fs.appendFileSync('propiedades.txt',`${resp}\n`);
      console.log(chalk.bgGreen.black(`Propiedade ${resp} criada com sucesso`));
    }
    orderList()
})};     

function getProp() {
    
    const readFileLines = fs
    .readFileSync("propiedades.txt")
    .toString("UTF8")
    .split("\n");

  let str = readFileLines
    .sort()
    .toString()
    .replace(",", "")
    .replace(/,/g, "\n");

  const data = str;
  console.log(data);

  menu();
  
  }

  function Chekprop(resp) {
    const  newprop = fs.readFileSync("propiedades.txt").toString("UTF8").split("\n");
  
    if (newprop.includes(resp)) {
      return true;
    } else {
      return false;
    }
  }

function droplist(){
   inquirer
      .prompt([
        {
        name: 'delete',
        message: 'Digite a propiedade css que deseja excluir'
        }
      ])
      .then((resposta) => {
        const delet = resposta['delete']

        if(delet === 'sair'){
          sair();
        }    
        if(!Chekprop(delet)) {
          console.log("Apropriedade não existe");
          droplist();
        } else {
          const readFileLines = fs
            .readFileSync("propiedades.txt")
            .toString("UTF8")
            .split("\n");
  
          const str = readFileLines.toString().replace(delet, "");
          const strList = str.replace(/,/g, "\n");
          const data = strList.replace(/\n\n/, "\n");
  
          fs.writeFileSync("propiedades.txt", data);
          getProp();
        }
    });
}
  
  function sair(){
    console.log(chalk.bgGreen.black('Até a proxima'))
    process.exit()
  }
  







