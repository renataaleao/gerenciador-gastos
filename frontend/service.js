const baseUrl = 'http://localhost:3000/gastos/'

$(document).ready(function(){

    $(".alert").hide();

    var dynamicURL = "";
    var method = "";

    $.ajax({
        type: 'GET',
        url: baseUrl,
        success: function(dados){
            dados.forEach(gastos => {
                const html = '<tr>' +
                                    '<td>' + gastos.id + '</td>' +
                                    '<td>' + gastos.nome + '</td>' +
                                    '<td>' + gastos.data + '</td>' +
                                    '<td>' + gastos.valor + '</td>' +
                                    '<td>' + '<button type="button" onClick="selecionar('+gastos.id+')"  class="btn btn-outline-primary">Selecionar</button>' + '</td>' +
                                    '<td>' + '<button type="button" onClick="deleteGasto('+gastos.id+')"  class="btn btn-outline-danger">Remover</button>' + '</td>' +
                             '</tr>'
                $("#dados-gastos").append(html)
            });
        }
    })

    $('#btnCadastro').click(function(){
        let gastosDados = {
            nome: $("#nome").val(),
            data: $("#data").val(),
            valor: $("#valor").val()
        }

        var idGasto = $("#id").val();
    
        if(gastosDados.nome == "" || gastosDados.data == "" || gastosDados.valor == ""){
            $(".alert-warning").fadeIn("slow").delay(2000).fadeOut(1000)
            $(".alert-success").hide()
        } else{
            if(!validar_data(gastosDados.data)) {
                $(".alert-danger").fadeIn("slow").delay(2000).fadeOut(1000)
                $(".alert-success").hide()
            } else {
                $.ajax({
                    type: 'POST',
                    url: baseUrl,
                    data: JSON.stringify(gastosDados),
                    contentType: 'application/json',
                    success: function() {
                        
                        $("#add").fadeIn("slow").delay(2000).fadeOut(1000)
                        $(".alert-warning").hide()
                        $(".alert-danger").hide()

                        reset();                      

                        setTimeout(function() {
                            window.location.href = "gastos.html";
                        }, 1000);
                    }
                })
            }
        }
        console.log(gastosDados);
    })

    $('#btnEditar').click(function() {
        let gasto = {
            nome: $("#nome").val(),
            data: $("#data").val(),
            valor: $("#valor").val(),
            id: $("#id").val()
        }
        
        $.ajax({
            type: 'PUT',
            url: baseUrl + gasto.id,
            contentType: 'application/json',
            data: JSON.stringify(gasto),
            success: function(gastos) {
                $("#nome").val(gastos.nome);
                $("#data").val(gastos.data);
                $("#valor").val(gastos.valor);
                $("#id").val(gastos.id);
        
                $("#editar").fadeIn("slow").delay(2000).fadeOut(1000)
        
                setTimeout(function() {
                    window.location.href = "gastos.html";
                }, 1000); 
        
            }
        });
    })

})

function validar_data(_data) {
    var padrao = new RegExp(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{4}\b/);
    return padrao.test(_data);
}

function deleteGasto(id){
    $.ajax({
        type: 'DELETE',
        url: baseUrl + id,
        contentType: 'application/json',
        success: function() {
            alert('Você deseja remover esse gasto?');
            $("#excluir").fadeIn("slow").delay(2000).fadeOut(1000)
            
            setTimeout(function() {
                window.location.href = "gastos.html";
            }, 1000);       
        }
    });
}

function selecionar(id){
    $.ajax({
        url: baseUrl + id,
        type: 'GET',
        contentType: 'application/json',
        success: function(dados) {
            $("#nome").val(dados.nome);
            $("#data").val(dados.data);
            $("#valor").val(dados.valor);
            $("#id").val(dados.id);
        }
    });
}

function reset(){
    $("#nome").val("");
    $("#data").val("");
    $("#valor").val("");
}




