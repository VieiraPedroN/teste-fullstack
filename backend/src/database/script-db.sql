-- tabela para armazenar as clínicas
    CREATE TABLE clinicas (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        razao_social VARCHAR(255) NOT NULL,
        nome_fantasia VARCHAR(255) NOT NULL,
        cnpj VARCHAR(18) UNIQUE NOT NULL,
        data_inauguracao DATE NOT NULL,
        ativa BOOLEAN DEFAULT TRUE,
        regional_id UUID NOT NULL REFERENCES regionais(id),
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
    );

    CREATE INDEX idx_clinicas_cnpj ON clinicas(cnpj);

-- tabela para armazenar as especialidades
    CREATE TABLE especialidades (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        nome VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
    );

-- tabela para armazenar as especialidades das clínicas
    CREATE TABLE clinicas_especialidades (
        clinica_id UUID REFERENCES clinicas(id) ON DELETE CASCADE,
        especialidade_id UUID REFERENCES especialidades(id) ON DELETE CASCADE,
        PRIMARY KEY (clinica_id, especialidade_id)
    );

-- tabela para armazenar as regionais
  --CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE regionais (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        nome VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
    );

-- tabela para armazenar os usuários
  --CREATE TYPE tipo_usuario AS ENUM ('ADMIN', 'USER');

    CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL,
        ativo BOOLEAN DEFAULT TRUE,
        tipo tipo_usuario NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
    );
    
    CREATE INDEX idx_users_email ON users(email);
