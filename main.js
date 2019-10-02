const ALUNOS = "listaAlunos";
const RA = "ra";
const NOME = "nome";
const LINHA = "linha";
const BTN_CONFIRMAR = "btnConfirmar";
const BTN_CANCELAR = "btnCancelar";
let idAtual = 1;
let memoriaPreEdicao = new Map();

function novoAluno(ra,nome){
	let aluno = gerarAluno(ra,nome);
	let alunos = document.getElementById(ALUNOS);
	alunos.innerHTML += aluno;
}

function editarAluno(id){
	let ra = document.getElementById(RA+id);
	let nome = document.getElementById(NOME+id);
	let btnConfirmar = document.getElementById(BTN_CONFIRMAR+id);
	let btnCancelar = document.getElementById(BTN_CANCELAR+id);
	memoriaPreEdicao.set(LINHA+id,{ra: ra.value, nome: nome.value});
	ra.disabled=false;
	nome.disabled=false;
	btnConfirmar.hidden=false;
	btnCancelar.hidden=false;
}

function confirmarEdicao(id){
	let ra = document.getElementById(RA+id);
	let nome = document.getElementById(NOME+id);
	let btnConfirmar = document.getElementById(BTN_CONFIRMAR+id);
	let btnCancelar = document.getElementById(BTN_CANCELAR+id);
	ra.disabled=true;
	nome.disabled=true;
	btnConfirmar.hidden=true;
	btnCancelar.hidden=true;
	memoriaPreEdicao.delete(LINHA+id);
}

function cancelarEdicao(id){
	let ra = document.getElementById(RA+id);
	let nome = document.getElementById(NOME+id);
	let btnConfirmar = document.getElementById(BTN_CONFIRMAR+id);
	let btnCancelar = document.getElementById(BTN_CANCELAR+id);
	let aluno = memoriaPreEdicao.get(LINHA+id);
	ra.value = aluno.ra;
	nome.value = aluno.nome;
	ra.disabled=true;
	nome.disabled=true;
	btnConfirmar.hidden=true;
	btnCancelar.hidden=true;
	memoriaPreEdicao.delete(LINHA+id);
}

function excluirAluno(id){
	let aluno = document.getElementById(LINHA+id);
	aluno.remove();
	memoriaPreEdicao.delete(LINHA+id);
}

function gerarAluno(ra,nome){
	let id = idAtual++;
	return `
		<section id="${LINHA+id}" name="${LINHA+id}">
			<label for="${RA+id}">RA</label>
			<input type="number" id="${RA+id}" name="${RA+id}" value="${ra}" disabled/>

			<label for="${NOME+id}">Nome</label>
			<input type="text" id="${NOME+id}" name="${NOME+id}" value="${nome}" disabled/>
			<button type="button" onclick="editarAluno(${id})">
				Editar
			</button>
			<button type="button" onclick="excluirAluno(${id})">
				Excluir
			</button>
			<button type="button"
				id="${BTN_CONFIRMAR+id}"
				name="${BTN_CONFIRMAR+id}"
				onclick="confirmarEdicao(${id})" hidden>
				Confirmar
			</button>
			<button type="button"
				id="${BTN_CANCELAR+id}"
				name="${BTN_CANCELAR+id}"
				onclick="cancelarEdicao(${id})" hidden>
				Cancelar
			</button>
		</section>
	`;
}

