# Cadastro de Carro
**RF** => Requisitos funcionais
Deve ser possivel cadastrar um novo carro
deve ser possível listar todas as categorias

**RN** => Regras de negócio
Não deve ser possível cadastrar um carro com uma placa já existente
O carro deve ser cadastrado com disponibilidade por padão
*Somente adiminstrador pode fazer o cadastro

# listagem de carros
**RF**
Deve ser possível listar todos os carros dispóniveis
deve ser possível listar todos os carros pelo nome da categoria
deve ser possível listar todos os carros pelo nome da marca
deve ser possível listar todos os carros pelo nome do carro

**RN**
O usuário não precisa estar logado no sistema


# Cadastro de Especificação no carro
**RF**
Deve ser possivel cadastrar uma especificação para um carro
Deve ser possivel listar todas as espeficações
Deve ser possivel listar todos os carros

**RN**
Não deve ser possível cadastrar um específicação para um carro não cadastrado
Não deve ser possível cadastrar um específicação já existes para um mesmo carro
O usurio responsável pelo cadastro de ser um usuário administrador


# cadastro de imagens do carro
Deve ser possível cdastrar a imagem do carro

**RNF** 
Utilizar o multer para upload dos arquivos

**RN** 
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
O usuário responsável pelo cadastro deve ser um usuário administrador

# Aluguel de carro

**RF** 
Deve ser possóvel cadastrar um aluguel

**RN** 
O aluguel deve ter duração mínimo de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
