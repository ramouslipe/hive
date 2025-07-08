-- Inserir usuários
INSERT INTO Usuario (nome, email, senha) VALUES
('Alice', 'alice@example.com', 'senha123'),
('Bob', 'bob@example.com', 'senha123'),
('Carol', 'carol@example.com', 'senha123');

-- Inserir desenvolvedoras
INSERT INTO Desenvolvedora (nome,email,senha) VALUES
('DevGames Studio','dev@ex.com','123123'),
('PixelArt Co.','pixa@ex.com','112233'),
('RealSoft','reals@ex.com','321321');

-- Inserir jogos
INSERT INTO Jogo (titulo, id_desenvolvedora, preco) VALUES
('Corrida Selvagem', 1, 59.90),
('Invasão Galáctica', 2, 39.99),
('Mundo Perdido', 3, 49.50),
('Blocos e Cubos', 2, 19.99);


-- Inserir bibliotecas dos usuários
INSERT INTO Biblioteca (id_usuario) VALUES
(1), (2), (3);

-- Inserir compras
INSERT INTO Compra (id_usuario) VALUES
(1), (1), (2);

-- Inserir itens nas compras
INSERT INTO Item_compra (id_compra, id_jogo) VALUES
(1, 1), -- Alice comprou Corrida Selvagem
(1, 2), -- Alice comprou Invasão Galáctica
(2, 4), -- Alice comprou Blocos e Cubos
(3, 3); -- Bob comprou Mundo Perdido

-- Inserir avaliações
INSERT INTO Avaliacao (comentario, id_usuario, id_jogo) VALUES
('Muito divertido!', 1, 1),
('Gráficos excelentes!', 1, 2),
('Poderia ter mais fases.', 2, 3),
('Viciante!', 1, 4),
('Curti demais!', 3, 4);

-- Inserir relação biblioteca-jogo (usuários têm os jogos que compraram)
INSERT INTO Biblioteca_Jogo (id_biblioteca, id_jogo) VALUES
(1, 1), (1, 2), (1, 4), -- Alice
(2, 3),                -- Bob
(3, 4);                -- Carol também tem Blocos e Cubos
