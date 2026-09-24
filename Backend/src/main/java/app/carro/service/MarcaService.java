package app.carro.service;

import java.util.List;

import org.springframework.stereotype.Service;

import app.carro.entity.Marca;
import app.carro.repository.MarcaRepository;

@Service
public class MarcaService {
	
	//----------INJEÇÃO DE DEPENDENCIA--------------
	private MarcaRepository marcaRepo;
	
	public MarcaService(MarcaRepository marcaRepo) {
		this.marcaRepo = marcaRepo;
	}
	
	//-----------METODOS CRUD------------
	public String save(Marca marca) {
		this.marcaRepo.save(marca);
		return "Marca salva com sucesso!";
	}
	
	public String edit(Marca marca, long id) {
		marca.setId(id);
		this.marcaRepo.save(marca);
		return "Marca editada com sucesso!";
	}
	
	public String deleteById(long id) {
		this.marcaRepo.deleteById(id);
		return "Marca deleta com sucesso!";
	}
	
	public Marca findById(long id) {
		return this.marcaRepo.findById(id).get();
	}
	
	public List<Marca> findAll(){
		return this.marcaRepo.findAll();
	}

}
