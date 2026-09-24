package app.carro.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.carro.entity.Acessorio;

public interface AcessorioRepository extends JpaRepository<Acessorio, Long> {

}
