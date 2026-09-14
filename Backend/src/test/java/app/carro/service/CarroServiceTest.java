package app.carro.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import app.carro.entity.Carro;
import app.carro.repository.CarroRepository;

@SpringBootTest
public class CarroServiceTest {
	
	//----------INJEÇÃO DE DEPENDENCIA------------//
	
	@Autowired
	CarroService carroServ;
	
	
	@MockitoBean
	CarroRepository carroRepo;
	
	//Testes de integração
	
	// Testando o metodo de salvamento
	@Test
	void cenario01() {
		Carro carro = new Carro();
		carro.setId(30);
		carro.setModelo("Saveiro");
		carro.setMarca("Volkswagen");
		carro.setCor("Branca");
		carro.setAno(2022);
		carro.setPreco(85000.00);
	    when(this.carroRepo.save(carro)).thenReturn(carro);
		String resposta = this.carroServ.save(carro);
		String esperado = "Carro Salvo com Sucesso!";
		assertEquals(esperado, resposta);
				
	}
	
	// Testando o metodo de find all
	@Test
	void cenario02() {
		List<Carro> lista = new ArrayList<>();
		Carro carro = new Carro();
		carro.setId(30);
		carro.setModelo("Saveiro");
		carro.setMarca("Volkswagen");
		carro.setCor("Branca");
		carro.setAno(2022);
		carro.setPreco(85000.00);
		lista.add(carro);
	    when(this.carroRepo.findAll()).thenReturn(lista);
		List<Carro> resposta = this.carroServ.findAll();
		assertEquals(1, resposta.size());
				
	}
	
	//Testando o metodo de edit
	
	@Test
	void cenario03() {
		Carro carro = new Carro();
		carro.setId(30);
		carro.setModelo("Saveiro");
		carro.setMarca("Volkswagen");
		carro.setCor("Branca");
		carro.setAno(2022);
		carro.setPreco(85000.00);
		Carro carro2 = new Carro();
		carro2.setId(32);
		carro.setId(30);
		carro.setModelo("Ecosport");
		carro.setMarca("Ford");
		carro.setCor("Prata");
		carro.setAno(2021);
		carro.setPreco(78000.00);
	    when(this.carroRepo.findById(30L)).thenReturn(Optional.of(carro));
	    when(this.carroRepo.save(carro)).thenReturn(carro2);

		String resposta = this.carroServ.edit(carro, 30L);
		assertEquals("Carro atualizado com sucesso!", resposta);
				
	}
}
