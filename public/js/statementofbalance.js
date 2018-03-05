

var StatementBalance = function(){
    this.init = function(CSDOCS_WS_HOST,  CSDOCS_WS_IDDOCUMENT, CSDOCS_WS_IDREPOSITORY, CSDOCS_WS_IDINSTANCE){
        console.log(CSDOCS_WS_HOST);
        $('#uploadButton').on("click", function(e){
            uploadDocuments(e, CSDOCS_WS_HOST,  CSDOCS_WS_IDDOCUMENT, CSDOCS_WS_IDREPOSITORY, CSDOCS_WS_IDINSTANCE);
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
                        var number = $(selected[0]).text();
                        var amount = $(selected[1]).text();
                        setSaprequestValue(number, amount);
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

    var setSaprequestValue = function(number, amount){
        $('#numero_sap').val(number);
        $('#saprequestamount').val(amount);
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

    var uploadDocuments = function(ev, CSDOCS_WS_HOST,  CSDOCS_WS_IDDOCUMENT, CSDOCS_WS_IDREPOSITORY, CSDOCS_WS_IDINSTANCE){
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

        if($('#numero_sap').val().length == 0) {
            status = false;
            $('#numero_sap').closest('.input-group').first().addClass("has-error");
        }
        else
            $('#numero_sap').closest('.input-group').first().removeClass("has-error");

        console.log(status);

        if(!status){
            ev.preventDefault();
            return;
        }

        console.log($("#saprequestform"));

        $("#saprequestform").submit(function(e) {
            console.log("submitting");

            e.preventDefault();

            var formData = new FormData(this);

            console.log(formData);

            $.ajax({
                url: "api/saprequest",
                method: 'POST',
                sync: false,
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                datatype: "json",
                success: function (data) {
                    console.log(data);
                    if(data.status){
                        var base64 = data.base64;
                        storeincsdocs(CSDOCS_WS_HOST, base64, CSDOCS_WS_IDDOCUMENT, CSDOCS_WS_IDREPOSITORY, CSDOCS_WS_IDINSTANCE);
                    } else{
                        log(data.message);
                    }

                },
                error: function(data){
                    console.log(data);
                },
            });
        });
    }

    var storeincsdocs = function(CSDOCS_WS_HOST, base64, CSDOCS_WS_IDDIRECTORY, CSDOCS_WS_IDREPOSITORY, CSDOCS_WS_IDINSTANCE){
        var data = {idDirectory: CSDOCS_WS_IDDIRECTORY, idRepository: CSDOCS_WS_IDREPOSITORY, idInstance: CSDOCS_WS_IDINSTANCE, metadata: $('#numero_sap').val(), file64: base64}

        console.log(data);

        $.ajax({
            url: CSDOCS_WS_HOST+"/api/document/store",
            method: 'POST',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            datatype: "json",
            success: function (data) {
                console.log(data);
            },

        });
    }

    var log = function(message){
        $('#output-detail').append(message);
    }

};