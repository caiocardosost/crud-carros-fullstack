package app.carro.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.carro.entity.Acessorio;
import app.carro.service.AcessorioService;

@RestController
@RequestMapping("api/acessorio")
@CrossOrigin("*")
public class AcessorioController {

	//-----------INJEÇÃO DE DEPENDENCIA---------
	
	private AcessorioService acessorioServ;
	
	public AcessorioController (AcessorioService acessorioServ) {
		this.acessorioServ = acessorioServ;
		
	}
	
	@PostMapping("/novo")
	public ResponseEntity<String> save(@RequestBody Acessorio acessorio){
		try {
			String retorno = this.acessorioServ.save(acessorio);
			return new ResponseEntity<String>(retorno, HttpStatus.OK);
			
		} catch (Exception e) {
			return new ResponseEntity<String>("Erro ao salvar", HttpStatus.BAD_REQUEST);

		}
	}
	
	@PutMapping("/editar/{id}")
	public ResponseEntity<String> edit(@RequestBody Acessorio acessorio, @PathVariable long id){
		try {
			String retorno = this.acessorioServ.edit(acessorio, id);
			return new ResponseEntity<String>(retorno, HttpStatus.OK);
			
		} catch (Exception e) {
			return new ResponseEntity<String>("Erro ao atualizar", HttpStatus.BAD_REQUEST);

		}
	}
	
	@DeleteMapping("/apagar/{id}")
	public ResponseEntity<String> delete(@PathVariable long id){
		try {
			String retorno = this.acessorioServ.deleteById(id);
			return new ResponseEntity<String>(retorno, HttpStatus.OK);
			
		} catch (Exception e) {
			return new ResponseEntity<String>("Erro ao deletar", HttpStatus.BAD_REQUEST);

		}
	}
	
	@GetMapping("/busca/{id}")
	public ResponseEntity<Acessorio> findById(@PathVariable long id){
		try {
			Acessorio retorno = this.acessorioServ.findById(id);
			return new ResponseEntity<Acessorio>(retorno, HttpStatus.OK);
			
		} catch (Exception e) {
			Acessorio retorno = null;
			return new ResponseEntity<Acessorio>(retorno, HttpStatus.BAD_REQUEST);

		}
	}
	
	@GetMapping("/acessorioslist")
	public ResponseEntity<List<Acessorio>> findAll(){
		try {
			List<Acessorio> retorno = this.acessorioServ.findAll();
			return new ResponseEntity<List<Acessorio>>(retorno, HttpStatus.OK);
			
		} catch (Exception e) {
			List<Acessorio> retorno = null;
			return new ResponseEntity<List<Acessorio>>(retorno, HttpStatus.BAD_REQUEST);
		}
	}


}
