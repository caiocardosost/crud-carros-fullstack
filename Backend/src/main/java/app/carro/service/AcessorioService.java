package app.carro.service;

import java.util.List;

import org.springframework.stereotype.Service;

import app.carro.entity.Acessorio;
import app.carro.repository.AcessorioRepository;

@Service
public class AcessorioService {
	//----------INJEÇÃO DE DEPENDENCIA--------------
	private AcessorioRepository acessorioRepo;
	
	public AcessorioService(AcessorioRepository acessorioRepo) {
		this.acessorioRepo = acessorioRepo;
	}
	
	//-----------METODOS CRUD------------
	public String save(Acessorio acessorio) {
		this.acessorioRepo.save(acessorio);
		return "Acessorio salva com sucesso!";
	}
	
	public String edit(Acessorio acessorio, long id) {
		acessorio.setId(id);
		this.acessorioRepo.save(acessorio);
		return "Acessorio editada com sucesso!";
	}
	
	public String deleteById(long id) {
		this.acessorioRepo.deleteById(id);
		return "Acessorio deleta com sucesso!";
	}
	
	public Acessorio findById(long id) {
		return this.acessorioRepo.findById(id).get();
	}
	
	public List<Acessorio> findAll(){
		return this.acessorioRepo.findAll();
	}
	
}
