//Serve para pular as etapas
var etapa = 1;
//Serve para identificar qual foi a primeira opção
var menuPrincipal = 0;

function abrirChatBot() 
{
	let chat = document.getElementById('chat-bot');
	chat.classList.remove("escondido");

	let container = document.getElementById('id-res-container');
	let input = document.getElementById('input-chat-bot');

	etapa = 1;
	menuPrincipal = 0;

	input.value = "";

	$('#id-res-container').html("");
	
	resBotMenuPrincipalPrimeiraVez(container);
}

function fecharChatBot() 
{	
	let input = document.getElementById('input-chat-bot');
	let chat = document.getElementById('chat-bot');
	chat.classList.add("escondido");

	etapa = 1;
	menuPrincipal = 0;

	input.value = "";

	$('#id-res-container').html("");
}

function resCliente(container, input) 
{
	setTimeout( function () {
		$(container).append(
			'<div class="row res-cliente">'+
        '<div class="col-9 res">'+
          '<span>'+input+'</span>'+
        '</div>'+
      '</div>'
	).animate({ scrollTop: 9999999999 }) }, 300);
}

function resBot(container, input, ms = 1100) 
{
	setTimeout( function () {
		$(container).append(
			'<div class="row res-bot">'+
        '<div class="col-9 res">'+
          '<span>'+
           input+
          '</span>'+
        '</div>'+
      '</div>'
	).animate({ scrollTop: 9999999999 }) }, ms);
}

function resBotMenuPrincipalPrimeiraVez(container)
{
	setTimeout( function () {
		$(container).append(
			'<div class="row res-bot">'+
		    '<div class="col-9 res">'+
		      '<span>'+
		        'Olá, tudo bem?<br>'+
		        'Eu sou o assistente virtual da Novatec Telecom, no que eu posso lhe ajudar:<br>'+
		        '<br>'+
		        '1 - Internet.<br>'+
		        '2 - Financeiro.<br>'+
		        '3 - Comercial.<br>'+
		        '<br>'+
		        'Responda com o numero correspondente.'+
		      '</span>'+
		    '</div>'+
		  '</div>'
	).animate({ scrollTop: 9999999999 }) }, 0);
}

function resBotMenuPrincipal(input, container, botEscrevendo)
{
	etapa = 1;
	menuPrincipal = 0;

	comportamentoPadraoBot(input, container, botEscrevendo);

	setTimeout( function () {
		$(container).append(
			'<div class="row res-bot">'+
		    '<div class="col-9 res">'+
		      '<span>'+
		        'Olá, tudo bem?<br>'+
		        'Eu sou o assistente virtual da Novatec Telecom, no que eu posso lhe ajudar:<br>'+
		        '<br>'+
		        '1 - Internet.<br>'+
		        '2 - Financeiro.<br>'+
		        '3 - Comercial.<br>'+
		        '<br>'+
		        'Responda com o numero correspondente.'+
		      '</span>'+
		    '</div>'+
		  '</div>'
	).animate({ scrollTop: 9999999999 }) }, 1100);
}

function botComecarEscrever(botEscrevendo)
{
	setTimeout( function () {
		botEscrevendo.classList.remove("escondido");
	}, 350);
}

function botPararEscrever(botEscrevendo)
{
	setTimeout( function () {
		botEscrevendo.classList.add("escondido");
	}, 1000);
}

function comportamentoPadraoBot(input, container, botEscrevendo)
{
	let inputDigitado = input.value;

	input.value = "";

	resCliente(container, inputDigitado);

	botComecarEscrever(botEscrevendo);

	botPararEscrever(botEscrevendo);
}

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
////			INTERACAO COM O BOT 										////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

function interagirChatBot() 
{
	let input = document.getElementById('input-chat-bot');
	let container = document.getElementById('id-res-container');
	let botEscrevendo = document.getElementById('bot-escrevendo');

	//Erro de nao enteder etapa 1
	if (
		etapa == '1' && 
		input.value != '1' &&
		input.value != '2' && 
		input.value != '3'
	) {
		comportamentoPadraoBot(input, container, botEscrevendo);

		let mensagem = 'Eu não entendi o que você quer, poderia digitar novamente o número correspondente.';

		resBot(container, mensagem);
	}

	//Guardar a primeira opcao escolhida
	if(etapa == '1') {
		menuPrincipal = input.value;
	}

	//Fazer isso para melhorar o desempenho
	//Ai o software so precisa carregar os IF da etapa escolhida
	//Assim evitar ter que percorrer todos os IF para pegar um la do final
	if (menuPrincipal == '1') {
		etapaInternet(input, container, botEscrevendo);
	}
	if (menuPrincipal == '2') {
		etapaFinanceiro(input, container, botEscrevendo);
	}
	if (menuPrincipal == '3') {
		etapaComercial(input, container, botEscrevendo);
	}
}

//Interent
function etapaInternet(input, container, botEscrevendo)
{
	//Internet - Etapa 1 
	if (etapa == '1' && input.value == '1') {
		comportamentoPadraoBot(input, container, botEscrevendo);

		let html = 'Por favor escolha uma alternativa:<br> 1 - Sem Internet<br>2 - Internet Lenta';

		resBot(container, html);

		etapa += 1;
	}

	//Internet - Etapa 2 - Sem internet
	if (etapa == '2' && input.value == '1') {
		comportamentoPadraoBot(input, container, botEscrevendo);

		let html = 'Verifique se todos os cabos do modem estão devidamente ligados, '+
											'verifique se a antena está ligada (conectada a tomada). '+
											'Caso tudo esteja conectado, renicie o modem. Se ainda não voltar '+
											'entre em contato conosco via WhatsApp.<br><br>'+
											'<a href="https://api.whatsapp.com/send?phone=5515996160692&'+
											'text=Ol%C3%A1%2C%20estou%20sem%20internet%2C%20poderia%20'+
											'verificar%20para%20mim%20por%20favor%3F" class="btn btn-success btn-sm"'+
											'target="_blank">WhatsApp</a>';

		let voltar = 'Deseja voltar ao menu principal?<br>'+
									'1 - Sim<br>2 - Encerrar';

		resBot(container, html);
		resBot(container, voltar, );

		etapa += 1;
	}

	//Internet - Etapa 2 - Internet Lenta
	if (etapa == '2' && input.value == '2') {
		comportamentoPadraoBot(input, container, botEscrevendo);

		let html = 'Por favor meça a internet e veja quanto está chegando para você.<br><br>'+
											'<a href="https://www.speedtest.net/" class="btn btn-dark btn-sm"'+
											'target="_blank">SpeedTest</a>';

		let continuaLento = 'Após medir e verificou que está abaixo do que contratou '+
												'entre em contato conosco pelo WhatsApp<br><br>'+
												'<a href="https://api.whatsapp.com/send?phone=5515996160692&'+
												'text=Ol%C3%A1%2C%20tudo%20bem%3F%20minha%20internet%20est%C3%A1%20'+
												'lenta%2C%20poderia%20verificar%20para%20mim%20por%20favor%3F"'+
												'class="btn btn-success btn-sm"'+
												'target="_blank">WhatsApp</a>';

		let voltar = 'Deseja voltar ao menu principal?<br>'+
									'1 - Sim<br>2 - Encerrar';

		resBot(container, html);
		resBot(container, continuaLento);
		resBot(container, voltar);

		etapa += 1;
	}

	//Internet - Etapa 3 - Sem internet - Voltar Menu Principal
	if (etapa == '3' && input.value == '1') {
		resBotMenuPrincipal(input, container, botEscrevendo);
	}

	//Internet - Etapa 3 - Sem internet - Encerrar
	if (etapa == '3' && input.value == '2') {
		fecharChatBot();
	}
} //FIM etapaInternet

function etapaFinanceiro(input, container, botEscrevendo)
{
	//Financeiro - Etapa 1 
	if (etapa == '1' && input.value == '2') {
		comportamentoPadraoBot(input, container, botEscrevendo);

		let html = 'Por favor escolha uma alternativa:<br> 1 - Já efetuei o pagamento, '+
								'porém estou sem sinal<br> 2 - Alterar data de vencimento';

		resBot(container, html);

		etapa += 1;
	}

	//Financeiro - Etapa 2 - Ja efetuei pagamento porem sem net
	if (etapa == '2' && input.value == '1') {
		comportamentoPadraoBot(input, container, botEscrevendo);

		let html = 'Esperar pelomenos 2 dias úteis para que o pagamento seja confirmado. '+
								'Caso já tenha passado esse prazo e mesmo assim ainda não '+
								'tenha retornado a internet '+
								'entre em contato conosco via WhatsApp.<br><br>'+
								'<a href="https://api.whatsapp.com/send?phone=5515996160692&'+
								'text=Realizei%20o%20pagamento%20mas%20ainda%20n%C3%A3o%20'+
								'voltou%20minha%20internet%2C%20poderia%20verificar%20para%'+
								'20mim%20por%20favor%3F" class="btn btn-success btn-sm"'+
								'target="_blank">WhatsApp</a>';

		let voltar = 'Deseja voltar ao menu principal?<br>'+
									'1 - Sim<br>2 - Encerrar';

		resBot(container, html);
		resBot(container, voltar, );

		etapa += 1;
	}

	//Financeiro - Etapa 2 - Alterar data de vencimento
	if (etapa == '2' && input.value == '2') {
		comportamentoPadraoBot(input, container, botEscrevendo);

		let html = 'Caso tenha perdido a data do pagamento, não tem problema '+
								'entre em contato conosco via WhatsApp.<br><br>'+
								'<a href="https://api.whatsapp.com/send?phone='+
								'5515996160692&text=Queria%20alterar%20a%20data'+
								'%20de%20pagamento%20do%20meu%20boleto%20por%20favor!" '+
								'class="btn btn-success btn-sm"'+
								'target="_blank">WhatsApp</a>';

		let voltar = 'Deseja voltar ao menu principal?<br>'+
									'1 - Sim<br>2 - Encerrar';

		resBot(container, html);
		resBot(container, voltar, );

		etapa += 1;
	}

	//Internet - Etapa 3 - Sem internet - Voltar Menu Principal
	if (etapa == '3' && input.value == '1') {
		resBotMenuPrincipal(input, container, botEscrevendo);
	}

	//Internet - Etapa 3 - Sem internet - Encerrar
	if (etapa == '3' && input.value == '2') {
		fecharChatBot();
	}
}// FIM ETAPA FINANCEIRO

function etapaComercial(input, container, botEscrevendo)
{
	//Comercial - Etapa 1 
	if (etapa == '1' && input.value == '3') {
		comportamentoPadraoBot(input, container, botEscrevendo);

		let html = 'Por favor escolha uma alternativa:<br> 1 - Falar com um atendente<br> '+
								'2 - Conhecer nossos planos';

		resBot(container, html);

		etapa += 1;
	}

	//Comercial - Etapa 2 - Falar com um atendente
	if (etapa == '2' && input.value == '1') {
		comportamentoPadraoBot(input, container, botEscrevendo);

		let html = 'Pelo nosso whatsapp você poderá tirar qualquer duvida referente aos '+
								'nossos serviços.<br><br>'+
								'<a href="https://api.whatsapp.com/send?phone=5515996160692&'+
								'text=Falar%20com%20um%20atendente!" class="btn btn-success btn-sm"'+
								'target="_blank">WhatsApp</a>';

		let voltar = 'Deseja voltar ao menu principal?<br>'+
									'1 - Sim<br>2 - Encerrar';

		resBot(container, html);
		resBot(container, voltar, );

		etapa += 1;
	}

	//Comercial - Etapa 2 - conhecer nossos planos
	if (etapa == '2' && input.value == '2') {
		comportamentoPadraoBot(input, container, botEscrevendo);

		let html = 'Temos diversos planos para atender você, clique no botão '+
											'abaixo para acessa-los.<br><br>'+
											'<a href="https://novatectelecom.net.br/planos" '+
											'class="btn btn-dark btn-sm"'+
											'target="_blank">Planos</a>';

		let voltar = 'Deseja voltar ao menu principal?<br>'+
									'1 - Sim<br>2 - Encerrar';

		resBot(container, html);
		resBot(container, voltar, );

		etapa += 1;
	}

	//Comercial - Etapa 3 - Sem internet - Voltar Menu Principal
	if (etapa == '3' && input.value == '1') {
		resBotMenuPrincipal(input, container, botEscrevendo);
	}

	//Comercial - Etapa 3 - Sem internet - Encerrar
	if (etapa == '3' && input.value == '2') {
		fecharChatBot();
	}
}// FIM ETAPA COMERCIAL