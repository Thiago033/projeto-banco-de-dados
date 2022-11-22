SELECT * FROM usuario;
SELECT * FROM administrador;
SELECT * FROM editora;
SELECT * FROM livro;
SELECT * FROM livro_digital;
SELECT * FROM livro_fisico;
SELECT * FROM autor;
SELECT * FROM venda;
SELECT * FROM pedido;
SELECT * FROM entrega;
SELECT * FROM entrega_fisica;
SELECT * FROM entrega_digital;

#Listar o titulo do livro mais caro e seu valor
SELECT livro.titulo, preco FROM livro
WHERE preco = (
	SELECT MAX(preco) FROM livro 
);

#Listar todos livros digitais
SELECT * FROM livro 
INNER JOIN livro_digital ON livro.isbn = livro_digital.isbn;

#Listar todos livros fisicos
SELECT * FROM livro 
INNER JOIN livro_fisico ON livro.isbn = livro_fisico.isbn;

#Listar todos os titulos dos livros e seu numero de autores
SELECT livro.titulo, COUNT(*) AS numero_de_autores FROM livro
INNER JOIN autor ON livro.isbn = autor.isbn
GROUP BY autor.isbn, livro.isbn
HAVING COUNT(*);

#Listar todos titulos dos livros que tem mais de um autor
SELECT livro.titulo FROM livro
INNER JOIN autor ON livro.isbn = autor.isbn
GROUP BY autor.isbn, livro.isbn
HAVING COUNT(*) > 1;

#Listar todos os nomes dos autores que tem apenas livros digitais
SELECT autor.nome FROM autor
INNER JOIN livro_digital ON autor.isbn = livro_digital.isbn;

#Listar todos os nomes dos autores que tem apenas livros fisicos
SELECT autor.nome FROM autor
INNER JOIN livro_fisico ON autor.isbn = livro_fisico.isbn;

#Listar todos os nomes do autores que tem livros digitais E fisicos ao mesmo tempo
SELECT autor.nome FROM autor
INNER JOIN livro_fisico ON autor.isbn = livro_fisico.isbn
INNER JOIN livro_digital ON livro_fisico.isbn = livro_digital.isbn;