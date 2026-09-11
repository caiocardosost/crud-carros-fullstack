package app.carro.service;

import java.util.List;

import org.springframework.stereotype.Service;

import app.carro.entity.Carro;
import app.carro.repository.CarroRepository;

@Service
public class CarroService {
	//----------INJEÇÃO DE DEPENDENCIA DO REPOSITORIO----------
	private CarroRepository carroRepo;
	
	public CarroService(CarroRepository carroRepo){
		this.carroRepo = carroRepo;
	}
	
	//------------MÉTODOS CRUD-----------------
	
	public String save(Carro carro) {
		this.carroRepo.save(carro);
		return "Carro Salvo com Sucesso!";
	}
	
	public String edit(Carro carro, long id) {
		if (this.findById(id) != null){
			carro.setId(id);
			this.carroRepo.save(carro);
			return "Carro atualizado com sucesso!";	
		}
		return "Id invalido";
	}
	
	
	public String deleteById(long id) {
		this.carroRepo.deleteById(id);
		return "Carro removido com sucesso!";
	}
	
	public Carro findById(long id) {
		Carro carro = this.carroRepo.findById(id).get();
		return carro;
	}
	
	public List<Carro> findAll(){
		return this.carroRepo.findAll();
	}
	
	public List<Carro> findByAno (int ano) {
		List<Carro> carros = this.carroRepo.findByAno(ano);
		return carros;
	}
	
	public List<Carro> findByAnoPos (int ano) {
		List<Carro> carros = this.carroRepo.buscaAnoPos(ano);
		return carros;
	}
	
	

}
