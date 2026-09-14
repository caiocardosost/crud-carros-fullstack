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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.carro.entity.Carro;
import app.carro.service.CarroService;

@RestController
@RequestMapping("/api/carro")
@CrossOrigin("*")
public class CarroController {
	
	//-----------INJEÇÃO DE DEPENDENCIA---------
	private CarroService carService;
	
	public CarroController(CarroService carServ) {
		this.carService = carServ;
	}
	
	//------------REQUISIÇÕES RECEBIDAS---------
	
	@PostMapping("/novo")
	public ResponseEntity<String> save(@RequestBody Carro carro){
		try {
			String retorno = this.carService.save(carro);
			return new ResponseEntity<String>(retorno, HttpStatus.OK);
			
		} catch (Exception e) {
			return new ResponseEntity<String>("Erro ao salvar", HttpStatus.BAD_REQUEST);

		}
	}
	
	
	@PutMapping("/editar/{id}")
	public ResponseEntity<String> edit(@RequestBody Carro carro, @PathVariable long id){
		try {
			String retorno = this.carService.edit(carro, id);
			return new ResponseEntity<String>(retorno, HttpStatus.OK);
			
		} catch (Exception e) {
			return new ResponseEntity<String>("Erro ao atualizar", HttpStatus.BAD_REQUEST);

		}
	}
	
	@DeleteMapping("/apagar/{id}")
	public ResponseEntity<String> delete(@PathVariable long id){
		try {
			String retorno = this.carService.deleteById(id);
			return new ResponseEntity<String>(retorno, HttpStatus.OK);
			
		} catch (Exception e) {
			return new ResponseEntity<String>("Erro ao deletar", HttpStatus.BAD_REQUEST);

		}
	}
	
	@GetMapping("/busca/{id}")
	public ResponseEntity<Carro> findById(@PathVariable long id){
		try {
			Carro retorno = this.carService.findById(id);
			return new ResponseEntity<Carro>(retorno, HttpStatus.OK);
			
		} catch (Exception e) {
			Carro retorno = null;
			return new ResponseEntity<Carro>(retorno, HttpStatus.BAD_REQUEST);

		}
	}
	
	@GetMapping("/carroslist")
	public ResponseEntity<List<Carro>> findAll(){
		try {
			List<Carro> retorno = this.carService.findAll();
			return new ResponseEntity<List<Carro>>(retorno, HttpStatus.OK);
			
		} catch (Exception e) {
			List<Carro> retorno = null;
			return new ResponseEntity<List<Carro>>(retorno, HttpStatus.BAD_REQUEST);

		}
	}
	
	@GetMapping("/buscaano")
	public ResponseEntity<List<Carro>> findByAno(@RequestParam int ano){
		try {
			List<Carro> retorno = this.carService.findByAno(ano);
			return new ResponseEntity<List<Carro>>(retorno, HttpStatus.OK);
			
		} catch (Exception e) {
			List<Carro> retorno = null;
			return new ResponseEntity<List<Carro>>(retorno, HttpStatus.BAD_REQUEST);

		}
	}
	
	@GetMapping("/buscaanopos")
	public ResponseEntity<List<Carro>> findByAnoPos(@RequestParam int ano){
		try {
			List<Carro> retorno = this.carService.findByAnoPos(ano);
			return new ResponseEntity<List<Carro>>(retorno, HttpStatus.OK);
			
		} catch (Exception e) {
			List<Carro> retorno = null;
			return new ResponseEntity<List<Carro>>(retorno, HttpStatus.BAD_REQUEST);

		}
	}


}
