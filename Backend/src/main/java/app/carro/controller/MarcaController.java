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

import app.carro.entity.Marca;
import app.carro.service.MarcaService;

@RestController
@RequestMapping("/api/marca")
@CrossOrigin("*")
public class MarcaController {
	
	//-----------INJEÇÃO DE DEPENDENCIA---------

	private MarcaService marcaServ;
	
	public MarcaController (MarcaService marcaServ) {
		this.marcaServ = marcaServ;
		
	}
	
	@PostMapping("/nova")
	public ResponseEntity<String> save(@RequestBody Marca marca){
		try {
			String retorno = this.marcaServ.save(marca);
			return new ResponseEntity<String>(retorno, HttpStatus.OK);
			
		} catch (Exception e) {
			return new ResponseEntity<String>("Erro ao salvar", HttpStatus.BAD_REQUEST);

		}
	}
	
	@PutMapping("/editar/{id}")
	public ResponseEntity<String> edit(@RequestBody Marca marca, @PathVariable long id){
		try {
			String retorno = this.marcaServ.edit(marca, id);
			return new ResponseEntity<String>(retorno, HttpStatus.OK);
			
		} catch (Exception e) {
			return new ResponseEntity<String>("Erro ao atualizar", HttpStatus.BAD_REQUEST);

		}
	}
	
	@DeleteMapping("/apagar/{id}")
	public ResponseEntity<String> delete(@PathVariable long id){
		try {
			String retorno = this.marcaServ.deleteById(id);
			return new ResponseEntity<String>(retorno, HttpStatus.OK);
			
		} catch (Exception e) {
			return new ResponseEntity<String>("Erro ao deletar", HttpStatus.BAD_REQUEST);

		}
	}
	
	@GetMapping("/busca/{id}")
	public ResponseEntity<Marca> findById(@PathVariable long id){
		try {
			Marca retorno = this.marcaServ.findById(id);
			return new ResponseEntity<Marca>(retorno, HttpStatus.OK);
			
		} catch (Exception e) {
			Marca retorno = null;
			return new ResponseEntity<Marca>(retorno, HttpStatus.BAD_REQUEST);

		}
	}
	
	@GetMapping("/marcaslist")
	public ResponseEntity<List<Marca>> findAll(){
		try {
			List<Marca> retorno = this.marcaServ.findAll();
			return new ResponseEntity<List<Marca>>(retorno, HttpStatus.OK);
			
		} catch (Exception e) {
			List<Marca> retorno = null;
			return new ResponseEntity<List<Marca>>(retorno, HttpStatus.BAD_REQUEST);
		}
	}
	

}
