package app.carro.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.carro.entity.Marca;

public interface MarcaRepository extends JpaRepository<Marca, Long> {

}
