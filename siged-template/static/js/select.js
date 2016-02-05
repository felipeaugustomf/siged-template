function limpacampos() {
	// Limpando todos os campos do form.
	for ( var i = 0; i < frm_elements.length; i++) {
		field_type = frm_elements[i].type.toLowerCase();
		switch (field_type) {
		case "text":
		case "password":
		case "textarea":
		case "hidden":
			frm_elements[i].value = "";
			break;
		case "radio":
		case "checkbox":
			if (frm_elements[i].checked) {
				frm_elements[i].checked = false;
			}
			break;
		case "select-one":
		case "select-multi":
			frm_elements[i].selectedIndex = -1;
			break;
		default:
			break;
		}
	}
}


function Aparecer(tipo) {
	switch (tipo) {
	case 2:
		document.getElementById('juri').style.display = 'none';
		document.getElementById('soci').style.display = 'inherit';
		break;
	case 3:
		document.getElementById('juri').style.display = 'inherit';
		document.getElementById('soci').style.display = 'none';
		break;
	}
}


function updateUf(lookupUrl, parentSelectElementId, childSelectElementId) {
	
	var parentSelectRef = jQuery('#' + parentSelectElementId);
	var childSelectRef = jQuery('#' + childSelectElementId);

	jQuery.getJSON(lookupUrl, {
		paisId : parentSelectRef.val()
	}, function(data) {
		var html = '<option value="0">Selecione...</option>';
		var len = data.length;
		for ( var i = 0; i < len; i++) {
			html += '<option value="' + data[i].id + '">' + data[i].descricao
					+ '</option>';
		}

		childSelectRef.html(html);
	});
}


function updateCidade(lookupUrl, parentSelectElementId, childSelectElementId) {
	
	var parentSelectRef = jQuery('#' + parentSelectElementId);
	var childSelectRef = jQuery('#' + childSelectElementId);

	jQuery.getJSON(lookupUrl, {
		ufId : parentSelectRef.val()
	}, function(data) {
		var html = '<option value="0">Selecione...</option>';
		var len = data.length;
		for ( var i = 0; i < len; i++) {
			html += '<option value="' + data[i].id + '">' + data[i].descricao
					+ '</option>';
		}

		childSelectRef.html(html);
	});
}


function updateCidadeSelected(lookupUrl, parentSelectElementId, childSelectElementId, cidadeId) {
	
	var parentSelectRef = jQuery('#' + parentSelectElementId);
	var childSelectRef = jQuery('#' + childSelectElementId);

	jQuery.getJSON(lookupUrl, {
		ufId : parentSelectRef.val()
	}, function(data) {
		var html = '<option value="0">Selecione...</option>';
		var len = data.length;
		for ( var i = 0; i < len; i++) {
			if (data[i].id == cidadeId) {
				html += '<option value="' + data[i].id + '" selected>'
						+ data[i].descricao + '</option>';
			} else {
				html += '<option value="' + data[i].id + '">'
						+ data[i].descricao + '</option>';
			}
		}

		childSelectRef.html(html);
	});
}


function updateTurno(lookupUrl, parentSelectElementId, childSelectElementId) {
	
	var parentSelectRef = jQuery('#' + parentSelectElementId);
	var childSelectRef = jQuery('#' + childSelectElementId);
	
	jQuery.getJSON(lookupUrl, {
		moduloId : parentSelectRef.val()
	}, function(data) {
		var html = '';
		var len = data.turnos.length;
		for ( var i = 0; i < len; i++) {
			html += '<option value="' + data.turnos[i] + '">' + data.turnos[i]
					+ '</option>';
		}

		childSelectRef.html(html);
	});
}


/*
 * O último parâmetro de updateParticipante() é apenas pra determinar se a
 * primeira opção do select montado será "TODOS" ou "Selecione...". Quando
 * quiser "TODOS", passe true. E quando quiser "Selecione...", não passe nada.
 */
function updateParticipante(lookupUrl, parentSelectElementId, childSelectElementId, campoNaoObrigatorio) {
	
	var parentSelectRef = jQuery('#' + parentSelectElementId);
	var childSelectRef = jQuery('#' + childSelectElementId);

	jQuery.getJSON(lookupUrl, {
		eventoId : parentSelectRef.val()
	}, function(data) {
		var html;
		if (!campoNaoObrigatorio) {
			html = '<option value="0">Selecione...</option>';
		} else {
			html = '<option value="0">TODOS</option>';
		}
		var len = data.length;
		for ( var i = 0; i < len; i++) {
			html += '<option value="' + data[i].id + '">' + data[i].nomeCpf	+ '</option>';
		}

		childSelectRef.html(html);
	});
}

function updateParticipanteSelected(lookupUrl, parentSelectElementId, childSelectElementId, participanteId, campoNaoObrigatorio) {	
	
	var parentSelectRef = jQuery('#' + parentSelectElementId);
	var childSelectRef = jQuery('#' + childSelectElementId);

	jQuery.getJSON(lookupUrl, {
		eventoId : parentSelectRef.val()
	}, function(data) {
		var html;
		if (!campoNaoObrigatorio) {
			html = '<option value="0">Selecione...</option>';
		} else {
			html = '<option value="0">TODOS</option>';
		}
		var len = data.length;
		for ( var i = 0; i < len; i++) {
			if (data[i].id == participanteId) {
				html += '<option value="' + data[i].id + '" selected>'
						+ data[i].nomeCpf + '</option>';
			} else {
				html += '<option value="' + data[i].id + '">'
						+ data[i].nomeCpf + '</option>';
			}
		}

		childSelectRef.html(html);
	});
}

function updateParticipantePorNome(lookupUrl, nomeParticipanteId, selectId, erroId, participanteId, campoNaoObrigatorio, mostrarAlerta) {	
	
	var nome = jQuery('#' + nomeParticipanteId).val();
	var select = jQuery('#' + selectId);
	var erro = jQuery('#' + erroId);	
	
	if(nome.length > 2){	
	
		jQuery.blockUI({
			message : '<br /><img src="static/images/spinner.gif" /><h1>Aguarde ...</h1><br />'
		});		
		
		jQuery.ajax({
			url : lookupUrl ,
			data : {nome : replaceSpecialChars(nome)} ,
			success : function(data) {
				
				var html;			
				if (!campoNaoObrigatorio) {
					html = '<option value="0">Selecione...</option>';
				} else {
					html = '<option value="0">TODOS</option>';
				}
				
				var len = data.length;
				for ( var i = 0; i < len; i++) {
					if (data[i].id == participanteId) {
						html += '<option value="' + data[i].id + '" selected>'
								+ data[i].nomeCpf + '</option>';
					} else {
						html += '<option value="' + data[i].id + '">'
								+ data[i].nomeCpf + '</option>';
					}
				}
				
				if(len == 0){
					erro.html(' Nenhum participante encontrado');
				}else{
					erro.html('');
				}
		
				select.html(html);
			}
		});
		
	} else if(mostrarAlerta){
		alert("Digite pelo menos 3 caracteres!");		
	}	
}

function updateParticipantePorNomeSelectMultiple(lookupUrl, nomeParticipante, comboId, mostrarAlerta) {	
	
	var nome = jQuery('#' + nomeParticipante).val();
	var combo = jQuery('#' + comboId);
		
	if(nome.length > 2){
		
	
		jQuery.blockUI({
			message : '<br /><img src="static/images/spinner.gif" /><h1>Aguarde ...</h1><br />'
		});		
		
		jQuery.ajax({
			url : lookupUrl ,
			data : {nome : replaceSpecialChars(nome)} ,
			success : function(data) {
				
				var html;			
								
				var len = data.length;
				for ( var i = 0; i < len; i++) {
					html += '<option value="' + data[i].id + '">' + data[i].nomeCpf + '</option>';
				}
				
				if(len == 0){
					html = '<option id="naoEncontrado" class="error" disabled="disabled" value="" >Nenhum participante encontrado</option>';					
				}
		
				combo.html(html);
			}
		});
		
	} else if(mostrarAlerta){
		alert("Digite pelo menos 3 caracteres!");		
	}	
}

function updateParticipanteGasto(lookupUrl, parentSelectElementId, childSelectElementId) {
	
	var parentSelectRef = jQuery('#' + parentSelectElementId);
	var childSelectRef = jQuery('#' + childSelectElementId);

	jQuery.getJSON(lookupUrl, {
		eventoId : parentSelectRef.val()
	}, function(data) {
		var html = '<option value="0">Não se Aplica</option>';
		var len = data.length;
		for ( var i = 0; i < len; i++) {
			html += '<option value="' + data[i].id + '">' + data[i].nomeCpf
					+ '</option>';
		}

		childSelectRef.html(html);
	});
}


function updateParticipanteFrequencia(lookupUrl, parentSelectElementId,	childSelectElementId) {
	
	var parentSelectRef = jQuery('#' + parentSelectElementId);
	var childSelectRef = jQuery('#' + childSelectElementId);
	
	jQuery.getJSON(lookupUrl, {
		eventoId : parentSelectRef.val()
	}, function(data) {
		var html = '';
		var len = data.length;
		for ( var i = 0; i < len; i++) {
			html += '<option value="' + data[i].id + '">' + data[i].nomeCpf
			+ '</option>';
		}
		
		childSelectRef.html(html);
	});
}


function updateParticipanteNota(lookupUrl, parentSelectElementId, childSelectElementId) {
	
	var childSelectRef = jQuery('#' + childSelectElementId);

	jQuery.getJSON(lookupUrl, {
		eventoId : jQuery('#eventoId').val(),
		moduloId : jQuery('#moduloId').val()
	}, function(data) {
		var html = '<option value="0">Selecione...</option>';
		var len = data.length;
		for ( var i = 0; i < len; i++) {
			html += '<option value="' + data[i].id + '">' + data[i].nomeCpf
					+ '</option>';
		}

		childSelectRef.html(html);
	});
}


function updateParticipanteNotaGrid(lookupUrl, parentSelectElementId, childSelectElementId) {
	
	var childSelectRef = jQuery('#' + childSelectElementId);

	jQuery
			.getJSON(
					lookupUrl,
					{
						eventoId : jQuery('#eventoId').val(),
						moduloId : jQuery('#moduloId').val()
					},
					function(data) {

						var len = data.length;

						if (len > 0) {
							var html = '<table id="nota">'
									+ '<thead>'
									+ '<tr>'
									+ '<th><font color="black" size="1em">Evento</font></th>'
									+ '<th><font color="black" size="1em">Módulo</font></th>'
									+ '<th><font color="black" size="1em">Participante</font></th>'
									+ '<th><font color="black" size="1em">Nota</font></th>'
									+ '</tr>' + '<thead>' + '<tbody>';

							for ( var i = 0; i < len; i++) {
								var corDaLinha = "";
								corDaLinha = (i % 2 == 0) ? "odd" : "even";

								html += '<tr class="' + corDaLinha + '">';
								html += '<td>'
										+ jQuery('#eventoId').find('option')
												.filter(':selected').text()
										+ '</td>';
								html += '<td>'
										+ jQuery('#moduloId').find('option')
												.filter(':selected').text()
										+ '</td>';
								html += '<td>'
										+ data[i].nomeCpf
										+ '<input type="hidden" name="participanteId" value="'
										+ data[i].id + '"</td>';
								html += '<td><input type="text" name="nota" onkeypress="validate(event)" size="2" maxLength="4"/></td>';
								html += '</tr>';
							}

							html += '</tbody></table>';

							jQuery('#mensagem').hide();
							jQuery('#criar').removeAttr('disabled').css(
									'color', 'black');
							jQuery('#list').show();
							childSelectRef.html(html);

						} else {
							jQuery('#mensagem').html('Todas as notas deste módulo já foram atribuí­das.');
							jQuery('#mensagem').show();
							$('#criar').attr('disabled', 'disabled').css('color', '#c3c3c3');
							jQuery("list").hide();
						}
					});
}


function updateParticipanteAprovado(lookupUrl, parentSelectElementId, childSelectElementId) {
	
	var parentSelectRef = jQuery('#' + parentSelectElementId);
	var childSelectRef = jQuery('#' + childSelectElementId);

	jQuery.getJSON(lookupUrl, {
		eventoId : parentSelectRef.val()
	}, function(data) {
		var html = '<option value="0">Selecione...</option>';
		var len = data.length;
		for ( var i = 0; i < len; i++) {
			html += '<option value="' + data[i].id + '">' + data[i].nomeCpf
					+ '</option>';
		}

		childSelectRef.html(html);
	});
}


function updateParticipanteSolicitacao(lookupUrl, parentSelectElementValue, childSelectElementId) {
	
	var childSelectRef = jQuery('#' + childSelectElementId);
	
	if(parentSelectElementValue > 0){
	
		jQuery.blockUI({
			message : '<br /><img src="static/images/spinner.gif" /><h1>Aguarde ...</h1><br />'
		});	
		
		jQuery.getJSON(lookupUrl, {
			participanteId : parentSelectElementValue
		}, function(data) {			
			var html = '<option value="0">Não se Aplica</option>';
			var len = data.length;
			for ( var i = 0; i < len; i++) {
				html += '<option value="' + data[i].id + '">' + data[i].cursoEData + '</option>';
			}	
			childSelectRef.html(html);
		});	
	}	
}


function updateModulo(lookupUrl, parentSelectElementId, childSelectElementId, campoNaoObrigatorio) {
	
	var parentSelectRef = jQuery('#' + parentSelectElementId);
	var childSelectRef = jQuery('#' + childSelectElementId);

	jQuery.getJSON(lookupUrl, {
		eventoId : parentSelectRef.val()
	}, function(data) {
		var html;
		if (!campoNaoObrigatorio) {
			html = '<option value="0">Selecione...</option>';
		} else {
			html = '<option value="0">TODOS</option>';
		}
		var len = data.length;
		for ( var i = 0; i < len; i++) {
			html += '<option value="' + data[i].id + '">' + data[i].titulo + '</option>';
		}
		childSelectRef.html(html);
	});
}


function updateModuloSelected(lookupUrl, parentSelectElementId,	childSelectElementId, modulo, campoNaoObrigatorio) {
	
	var parentSelectRef = jQuery('#' + parentSelectElementId);
	var childSelectRef = jQuery('#' + childSelectElementId);

	jQuery.getJSON(lookupUrl, {
		eventoId : parentSelectRef.val()
	}, function(data) {
		var html;
		if (!campoNaoObrigatorio) {
			html = '<option value="0">Selecione...</option>';
		} else {
			html = '<option value="0">TODOS</option>';
		}
		var len = data.length;
		for ( var i = 0; i < len; i++) {
			if (data[i].id == modulo) {
				html += '<option value="' + data[i].id + '" selected>'
						+ data[i].titulo + '</option>';
			} else {
				html += '<option value="' + data[i].id + '">' + data[i].titulo	+ '</option>';
			}
		}
		childSelectRef.html(html);
	});
}


function updateMunicipio(lookupUrl, parentSelectElementId, childSelectElementId, campoNaoObrigatorio) {
	
	var parentSelectRef = jQuery('#' + parentSelectElementId);
	var childSelectRef = jQuery('#' + childSelectElementId);
	
	jQuery.blockUI({
		message : '<br /><img src="static/images/spinner.gif" /><h1>Aguarde ...</h1><br />'
	});

	jQuery.getJSON(lookupUrl, {
		ufMunicipio : parentSelectRef.val()
	}, function(data) {
		var html;
		if (!campoNaoObrigatorio) {
			html = '<option value="0">Selecione...</option>';
		} else {
			html = '<option value="0">TODOS</option>';
		}
		var len = data.length;
		for ( var i = 0; i < len; i++) {
			html += '<option value="' + data[i].id + '">' + data[i].nome + '</option>';
		}

		childSelectRef.html(html);
	});
}


function updateMunicipioSelected(lookupUrl, parentSelectElementId, childSelectElementId, municipio, campoNaoObrigatorio) {
	
	var parentSelectRef = jQuery('#' + parentSelectElementId);
	var childSelectRef = jQuery('#' + childSelectElementId);

	if (parentSelectRef.val() != 0){		
		jQuery.blockUI({
			message : '<br /><img src="static/images/spinner.gif" /><h1>Aguarde ...</h1><br />'
		});
	}
	
	jQuery.getJSON(lookupUrl, {
		ufMunicipio : parentSelectRef.val()
	}, function(data) {
		var html;
		if (!campoNaoObrigatorio) {
			html = '<option value="0">Selecione...</option>';
		} else {
			html = '<option value="0">TODOS</option>';
		}
		var len = data.length;
		for ( var i = 0; i < len; i++) {
			if (data[i].id == municipio) {
				html += '<option value="' + data[i].id + '" selected>'
						+ data[i].nome + '</option>';
			} else {
				html += '<option value="' + data[i].id + '">' + data[i].nome + '</option>';
			}
		}

		childSelectRef.html(html);
	});
}


function updateEventoApurado(lookupUrl, parentSelectElementId, childSelectElementId) {

	var parentSelectRef = jQuery('select#' + parentSelectElementId);
	var childSelectRef = jQuery('#' + childSelectElementId);

	jQuery.blockUI({
		message : '<br /><img src="static/images/spinner.gif" /><h1>Aguarde ...</h1><br />'
	});
	
	jQuery.getJSON(lookupUrl,
	{
		id : parentSelectRef.val()
	},
	function(data) {	
			
		if (data) {
			html = '<span style="color: red; font-weight: bold;">Evento já apurado</span>';
		}else{
			var html = '<span style="color: red; font-weight: bold;">Evento não apurado</span>';
		}
		
		childSelectRef.html(html);
	});
	
}


function updateInstrutor(lookupUrl, parentSelectElementId, childSelectElementId) {
	
	var parentSelectRef = jQuery('#' + parentSelectElementId);
	var childSelectRef = jQuery('#' + childSelectElementId);

	jQuery.getJSON(lookupUrl, {
		moduloId : parentSelectRef.val()
	}, function(data) {
		var html = '<option value="0">Selecione...</option>';
		var len = data.length;
		for ( var i = 0; i < len; i++) {
			html += '<option value="' + data[i].id + '">' + data[i].nome + '</option>';
		}
		childSelectRef.html(html);
	});
}


function updateInstrutorByEventoId(lookupUrl, parentSelectElementId, childSelectElementId) {
	
	var parentSelectRef = jQuery('#' + parentSelectElementId);
	var childSelectRef = jQuery('#' + childSelectElementId);

	jQuery.getJSON(lookupUrl, {
		eventoId : parentSelectRef.val()
	}, function(data) {
		var html = '<option value="0">Selecione...</option>';
		var len = data.length;
		for ( var i = 0; i < len; i++) {
			html += '<option value="' + data[i].id + '">' + data[i].nome + '</option>';
		}

		childSelectRef.html(html);
	});
}


function updateResponsavelSetorAtivo(lookupUrl, parentSelectElementId, childSelectElementId) {
    
	var parentSelectRef = jQuery('#' + parentSelectElementId);
    var childSelectRef  = jQuery('#' + childSelectElementId);

    jQuery.getJSON(lookupUrl,
        {setorId: parentSelectRef.val()}, 
        function(data) {
        	var html = '';
        	var len = data.length;
        	if (len > 1)
        		html = '<option value="0">Selecione...</option>';
            for (var i = 0; i< len; i++) {
                html += '<option value="' + data[i].id + '">' + data[i].nome + '</option>';
            }

            childSelectRef.html(html);
        }
    );
}


function updateUsuariosBySetor(lookupUrl, parentSelectElementId, childSelectElementId) {
   
	var parentSelectRef = jQuery('#' + parentSelectElementId);
    var childSelectRef  = jQuery('#' + childSelectElementId);

    jQuery.getJSON(lookupUrl,
        {setorId: parentSelectRef.val()}, 
        function(data) {
        	var html = '';
        	var len = data.length;
       		html = '<option value="0">Selecione...</option>';
            for (var i = 0; i< len; i++) {
                html += '<option value="' + data[i].id + '">' + data[i].nome + '</option>';
            }

            childSelectRef.html(html);
        }
    );
}


function valida_cpf(cpf) {

	var numeros, digitos, soma, i, resultado, digitos_iguais;
	cpf = cpf.replace(/\D/g, "");
	digitos_iguais = 1;
	if (cpf.length == 0)
		return true;
	else if (cpf.length < 11)
		return false;
	for (i = 0; i < cpf.length - 1; i++)
		if (cpf.charAt(i) != cpf.charAt(i + 1)) {
			digitos_iguais = 0;
			break;
		}
	if (!digitos_iguais) {
		numeros = cpf.substring(0, 9);
		digitos = cpf.substring(9);
		soma = 0;
		for (i = 10; i > 1; i--)
			soma += numeros.charAt(10 - i) * i;
		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		if (resultado != digitos.charAt(0))
			return false;
		numeros = cpf.substring(0, 10);
		soma = 0;
		for (i = 11; i > 1; i--)
			soma += numeros.charAt(11 - i) * i;
		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		if (resultado != digitos.charAt(1))
			return false;
		return true;
	} else
		return false;
}


function valida_email(email) {
	
	var emailValido=/^.+@.+\..{2,}$/;
	var illegalChars= /[\s\(\)\<\>\,\;\:\\\/\"\[\]]/;
	
	if(!emailValido.test(email) || email.match(illegalChars))
		return false;
	
	return true;
}


function desabilitaPeriodo() {

	if (document.getElementById('eventoId').value != 0) {
		updateParticipante(	'/ajax/procuraParticipantePorTipoEEvento?tipoId=1','eventoId', 'participanteId', true);
		document.getElementById("data1").disabled = true;
		document.getElementById("data2").disabled = true;
		document.getElementById("data1").value = "";
		document.getElementById("data2").value = "";
	} else {
		updateParticipante('/ajax/procuraParticipantePorTipo?tipoId=1','eventoId', 'participanteId', true);
		document.getElementById("data1").disabled = false;
		document.getElementById("data2").disabled = false;
	}
};


function desabilitaEvento() {
	if (document.getElementById("data1").value != ""
			|| document.getElementById("data2").value != "") {
		document.getElementById("eventoId").disabled = true;
	} else {
		document.getElementById("eventoId").disabled = false;
	}
};


function bloqueiaCamposInstrutor(cpf) {

	jQuery.getJSON(
		'/instrutor/bloqueiaCampos',
		{
			cpf : cpf
		},
		function(data) {
	
			if (document.getElementById('cpf').value == data.cpf) {
				document.getElementById('cpf').readOnly = true;
				document.getElementById('cpf').style.background = "#dff7ff";
			}
			if (document.getElementById('nome').value == data.nome) {
				document.getElementById('nome').readOnly = true;
				document.getElementById('nome').style.background = "#dff7ff";
			}
			if (document.getElementById('email').value == data.email) {
				document.getElementById('email').readOnly = true;
				document.getElementById('email').style.background = "#dff7ff";
			}
			if (document.getElementById('telefone').value == data.telefone) {
				document.getElementById('telefone').readOnly = true;
				document.getElementById('telefone').style.background = "#dff7ff";
			}
			if (document.getElementById('ufMunicipio').value == data.uf) {
				document.getElementById('ufMunicipio').style.background = "#dff7ff";
				document.getElementById('ufMunicipio').onmousedown = function(event) {
					event.preventDefault();
				};
			}
			if (document.getElementById('municipio').value == data.municipio) {
				document.getElementById('municipio').style.background = "#dff7ff";
				document.getElementById('municipio').onmousedown = function(event) {
					event.preventDefault();
				};
			}
			if (document.getElementById('nivelEscolaridadeId').value == data.escolaridade) {
				document.getElementById('nivelEscolaridadeId').style.background = "#dff7ff";
				document.getElementById('nivelEscolaridadeId').onmousedown = function(event) {
					event.preventDefault();
				};
			}
			if (document.getElementById('formacaoAcademicaId').value == data.formacao) {
				document.getElementById('formacaoAcademicaId').style.background = "#dff7ff";
				document.getElementById('formacaoAcademicaId').onmousedown = function(event) {
					event.preventDefault();
				};
			}
			if (document.getElementById('setorId') != null && document.getElementById('setorId').value == data.setorId) {
				document.getElementById('setorId').style.background = "#dff7ff";
				document.getElementById('setorId').onmousedown = function(event) {
					event.preventDefault();
				};
			}
	
		});
}


function existeInstrutor(cpf) {

	if (cpf != 0) {
		if (!valida_cpf(cpf)) {
			alert("CPF inválido");
			document.getElementById('cpf').value = "";
			document.getElementById('cpf').focus();
		} else {
			jQuery.getJSON(
			'/instrutor/procuraInstrutor',
			{
				cpf : cpf
			},
			function(data) {
				if (data != null) {
					if (data.situacao == 2) {
						alert("Seu cadastramento está em análise. Favor aguardar confirmação. Para mais informações, favor entrar em contato com o IPC.");
						document.getElementById('cpf').value = "";
						document.getElementById('cpf').focus();
					} else if (data.situacao == 1) {
						alert("Instrutor já cadastrado!");
						document.getElementById('cpf').value = "";
						document.getElementById('cpf').focus();
					}
				}
			});
		}
	}
}


function updateInscricaoComConfirmacaoPendente(lookupUrl, parentSelectElementId, childSelectElementId) {
	var parentSelectRef = jQuery('#' + parentSelectElementId);
	var childSelectRef = jQuery('#' + childSelectElementId);

	jQuery.getJSON(lookupUrl, {
		eventoId : parentSelectRef.val()
	}, function(data) {		
		var html = '';
		var len = data.length;
		for ( var i = 0; i < len; i++) {
			html += '<option value="' + data[i].id + '">'
					+ data[i].nomeCpfParticipante + '</option>';
		}

		childSelectRef.html(html);
	});
}


function transfereSelecionados(origem, destino) {

	var listaOrigem = document.getElementById(origem);
	var listaDestino = document.getElementById(destino);

	while (listaOrigem.selectedIndex != -1) {

		var itemSelecionado = listaOrigem.options[listaOrigem.selectedIndex];
		var texto = itemSelecionado.text;
		var valor = itemSelecionado.value;
		listaDestino.options[listaDestino.options.length] = new Option(texto, valor);
		listaOrigem.options[listaOrigem.selectedIndex] = null;
	}
}


function transfereTodos(origem, destino) {

	var listaOrigem = document.getElementById(origem);
	var listaDestino = document.getElementById(destino);

	for ( var i = 0; i < listaOrigem.options.length; i++) {
		var item = listaOrigem.options[i];		
		var texto = item.text;
		var valor = item.value;
		
		if(valor != ""){
			listaDestino.options[listaDestino.options.length] = new Option(texto, valor);
		}
	}

	listaOrigem.innerHTML = "";
}


function replaceSpecialChars(str) {
	
	var specialChars = [
					    {val:"a",let:"áàãâä"},
					    {val:"e",let:"éèêë"},
					    {val:"i",let:"íìîï"},
					    {val:"o",let:"óòõôö"},
					    {val:"u",let:"úùûü"},
					    {val:"c",let:"ç"},
					    {val:"A",let:"ÁÀÃÂÄ"},
					    {val:"E",let:"ÉÈÊË"},
					    {val:"I",let:"ÍÌÎÏ"},
					    {val:"O",let:"ÓÒÕÔÖ"},
					    {val:"U",let:"ÚÙÛÜ"},
					    {val:"C",let:"Ç"},
					    {val:"",let:"?!()"}
					    ];
	
	var $spaceSymbol = ' ';
	var regex;
	var returnString = str;
	for (var i = 0; i < specialChars.length; i++) {
		regex = new RegExp("["+specialChars[i].let+"]", "g");
		returnString = returnString.replace(regex, specialChars[i].val);
		regex = null;
	}
	return returnString.replace(/\s/g,$spaceSymbol);
}