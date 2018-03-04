$(document).ready(function(){
    var statementBalance = new StatementBalance();
    statementBalance.init();
});

var StatementBalance = function(){
    this.init = function(){
        $('#uploadButton').on("click", function(e){
            e.preventDefault();
            uploadDocuments();
        });
        $('#saprequestbutton').on("click", function(){
            showSapRequest();
        });
    }

    var showSapRequest = function(){
        var content = $('<div>');

        BootstrapDialog.show({
            size: BootstrapDialog.SIZE_NORMAL,
            message: content,
            buttons: [
                {
                icon: 'glyphicon glyphicon-ban-circle',
                label: 'Seleccionar',
                cssClass: 'btn-primary',
                    action: function(dialog){
                        var tr = $('#saptable tbody').find('.selected').first();
                        var selected = tr.find("td");
                        var number = $(selected[1]).text();
                        $('#saprequest').val(number);
                        dialog.close();
                }
            }, {
                label: 'Cancelar',
                action: function(dialogItself){
                    dialogItself.close();
                }
            }],
            onshown: function(dialog){
                console.log("onshown");
                var table = getTable();
                content.append(table);
                var table = $("#saptable").DataTable();


                $('#saptable tbody').on( 'click', 'tr', function () {
                    if ( $(this).hasClass('selected') ) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                } );

            },
            onshow: function(dialog){
                console.log("onshow");
            }
        });
    }

    var getTable = function(){
        var tbody = $("<tbody>");
        var table = $('<table>', {"id": "saptable", class: "display"}).append(
            $('<thead>').append($('<tr>').append($('<th>').append("Número Sap")). append($('<th>').append("Monto")))
        ).append(tbody);

        $(sapnumbers).each(function(){
            var number = this;
            var tr = $('<tr>').append($('<td>').append(number.number)).append($('<td>').append(number.amount));
            tbody.append(tr);
        });


        return table;
    }

    var sapnumbers = [
        {"number": 1243242, "amount": 7120.08},
        {"number": 1244654, "amount": 7420.08},
        {"number": 7554654, "amount": 7020.08},
        {"number": 9524654, "amount": 7120.08},
        {"number": 2554754, "amount": 7120.08},
        {"number": 3553759, "amount": 7120.08},
        {"number": 4563322, "amount": 7120.08},
        {"number": 5577322, "amount": 7120.08},
    ];

    var uploadDocuments = function(){
        var status = true;
        if(document.getElementById("pdf").files.length == 0) {
            $('#pdf').closest('.input-group').first().addClass("has-error");
            status = false;
        }
        else
            $('#pdf').closest('.input-group').first().removeClass("has-error");

        if(document.getElementById("cfdi").files.length == 0) {
            status = false;
            $('#cfdi').closest('.input-group').first().addClass("has-error");
        }
        else
            $('#cfdi').closest('.input-group').first().removeClass("has-error");

        if($('#saprequest').val().length == 0) {
            status = false;
            $('#saprequest').closest('.input-group').first().addClass("has-error");
        }
        else
            $('#saprequest').closest('.input-group').first().removeClass("has-error");

        if(status)
            $('#saprequestform').submit();
    }
};