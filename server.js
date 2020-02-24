//getting the express into our server.js
const express = require('express'); 

// creating a variable(const) to access the express
const server = express()   

// getting determinate URL req and then 
//response the URL req with res.send for the browser
server.get("/", function(req, res) {
     
     db.query(`select * from donors`, function(err, result){
     if(err) return res.send("Erro de banco de dados");
     	
     	const donors = result.rows;
     	return res.render("index.html", {donors})
     });
     
})

//Database conn
const pool = require('mysql').Pool;
const db = new Pool({
	
	user: 'root',
	password: '123456',
	host: 'localhost',
	database: 'donation'

});

//getting data from the form
server.post("/", function(req, res){
	 
	  const name = req.body.name; 
	  const email = req.body.email;
	  const blood = req.body.blood;

	  if(name == "" || email == "" || blood == ""){
	  	return res.send("Todos os campos são obrigatórios!");
	}

	  // put data into db

	 const query = `insert into donors 
	 (name, email, tipoSang) values (?,?,?)`

	 const values = [name, email, tipoSang];
	 
	 db.query(query, values, function(err){
	 
	 if(err) return res.send("Erro no banco de dados");
	
	});
	 

	  return res.redirect("/")
})

// listen on 3000 port
server.listen(3000, function(){
    console.log('Iniciei o servidor')
}) 


//Configurating server to catch the css and js files
server.use(express.static('public'))

// allow body 
server.use(express.urlencoded({extended:true}))


//Configurating the template engine
const nunjucks = require('nunjucks');
	nunjucks.configure('./', {
	express: server,
	noCache: true

})


