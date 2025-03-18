document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastroForm");
    const listaUsuarios = document.getElementById("listaUsuarios");
    const telefoneInput = document.getElementById("telefone");
    let usuarios = [];

    // Filtro para aceitar apenas números no campo telefone e formatar com ()
    telefoneInput.addEventListener("input", (event) => {
        let value = event.target.value.replace(/\D/g, ""); // Remove não numéricos
        if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos
        
        // Formatação (XX) XXXXX-XXXX
        if (value.length >= 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        }
        if (value.length >= 10) {
            value = `${value.slice(0, 10)}-${value.slice(10)}`;
        }
        event.target.value = value;
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const telefone = telefoneInput.value;

        const usuario = { id: Date.now(), nome, email, telefone };
        usuarios.push(usuario);
        atualizarTabela();
        form.reset();
    });

    function atualizarTabela() {
        listaUsuarios.innerHTML = "";
        usuarios.forEach(usuario => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${usuario.telefone}</td>
                <td>
                    <button onclick="editarUsuario(${usuario.id})">Editar</button>
                    <button onclick="deletarUsuario(${usuario.id})">Excluir</button>
                </td>
            `;
            listaUsuarios.appendChild(row);
        });
    }

    window.editarUsuario = (id) => {
        const usuario = usuarios.find(u => u.id === id);
        document.getElementById("nome").value = usuario.nome;
        document.getElementById("email").value = usuario.email;
        telefoneInput.value = usuario.telefone;
        usuarios = usuarios.filter(u => u.id !== id);
        atualizarTabela();
    };

    window.deletarUsuario = (id) => {
        usuarios = usuarios.filter(u => u.id !== id);
        atualizarTabela();
    };
});
