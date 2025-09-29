import bruxos from "../models/dados.js";

// Buscar todos os bruxos
const getAllBruxos = (req, res) => {
    const { id, nome, casa, idade } = req.query;
    let resultado = bruxos;

    if (nome) {
        resultado = resultado.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }
    if (id) {
        resultado = resultado.filter(b => b.id === parseInt(id));
    }

    res.status(200).json({
        total: resultado.length,
        bruxos: resultado
    });
};

// Buscar bruxo por ID
const getBruxoById = (req, res) => {
    const id = parseInt(req.params.id);
    const bruxo = bruxos.find(b => b.id === id);

    if (!bruxo) {
        return res.status(404).json({
            message: "Bruxo não encontrado"
        });
    }

    res.status(200).json(bruxo);
};

// Criar novo bruxo
const createBruxo = (req, res) => {
    const { nome, casa, idade, varinha } = req.body;

    if (!nome || !casa || !varinha) {
        return res.status(400).json({
            success: false,
            message: "Nome, casa e varinha são obrigatórios"
        });
    }

    const novoBruxo = {
        id: bruxos.length + 1,
        nome,
        casa,
        idade,
        varinha,
        qntdFeiticos: 0 // valor padrão
    };

    bruxos.push(novoBruxo);
    res.status(201).json({
        success: true,
        message: "Novo bruxo cadastrado com sucesso",
        bruxo: novoBruxo
    });
};

// Deletar bruxo
const deleteBruxo = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O ID fornecido é inválido"
        });
    }

    const bruxoParaRemover = bruxos.find(b => b.id === id);

    if (!bruxoParaRemover) {
        return res.status(404).json({
            success: false,
            message: `Bruxo com o ID ${id} não existe`
        });
    }

    const bruxosFiltrados = bruxos.filter(b => b.id !== id);
    bruxos.splice(0, bruxos.length, ...bruxosFiltrados);

    res.status(200).json({
        success: true,
        message: `O bruxo com ID ${id} foi removido com sucesso`
    });
};

// Atualizar bruxo
const updateBruxo = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, casa, idade, varinha } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O ID deve ser válido!"
        });
    }

    const bruxoExiste = bruxos.find(b => b.id === id);

    if (!bruxoExiste) {
        return res.status(404).json({
            success: false,
            message: `O bruxo com o ID ${id} não foi encontrado`
        });
    }

    const bruxosAtualizados = bruxos.map(b => b.id === id ? {
        ...b,
        ...(nome && { nome }),
        ...(casa && { casa }),
        ...(idade && { idade }),
        ...(varinha && { varinha })
    } : b);

    bruxos.splice(0, bruxos.length, ...bruxosAtualizados);
    const bruxoEditado = bruxos.find(b => b.id === id);

    res.status(200).json({
        success: true,
        message: "Bruxo atualizado com sucesso",
        bruxo: bruxoEditado
    });
};

export { getAllBruxos, getBruxoById, createBruxo, deleteBruxo, updateBruxo };
