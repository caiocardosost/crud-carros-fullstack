package app.carro.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import app.carro.entity.Carro;

public interface CarroRepository extends JpaRepository<Carro, Long> {
	
	public List<Carro> findByAno(int ano);
	
	@Query("SELECT c FROM Carro c WHERE c.ano > :ano")
	public List<Carro> buscaAnoPos(int ano);

}
