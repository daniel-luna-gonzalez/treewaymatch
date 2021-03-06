@extends('layouts.main')
@section("css")
    <link href="{{ asset('css/statementofbalance.css') }}" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/libraries/DataTables/datatables.css"/>
    <link rel="stylesheet" type="text/css" href="/libraries/DataTables/DataTables-1.10.16/css/jquery.dataTables.css"/>
    <link rel="stylesheet" type="text/css" href="/libraries/DataTables/DataTables-1.10.16/css/dataTables.bootstrap.css"/>
    <link rel="stylesheet" type="text/css" href="libraries/bootstrap3-dialog/src/css/bootstrap-dialog.css"/>
@endsection
@section('content')
    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        {{ Form::open(array("method" => "post",'url' => 'saprequest', 'files' => true, "id" => "saprequestform")) }}
            <div class="input-group">
                <input type="text" id="numero_sap" name="numero_sap" class="form-control" readonly="true">
                <span class="input-group-btn">
                <button class="btn btn-primary" type="button" id="saprequestbutton">Pedido SAP</button>
              </span>
            </div>
        <div class="input-group">
            <input type="hidden" id="saprequestamount" name="saprequestamount" class="form-control" readonly="true">
        </div>
            <div class="input-group">
                <label>CFDI</label>
                <input type="file" id="cfdi" name="cfdi" class="form-control" accept="text/xml">
            </div>
            <div class="input-group">
                <label>PDF</label>
                <input type="file" id="pdf" name="pdf" class="form-control" accept="application/pdf">
            </div>
        <br>
        <div class="col-lg-12 text-center">
            <input type="submit" id="uploadButton" class="btn btn-primary" value="Cargar">
        </div>
    {{Form::close()}}
        <br>
        <br>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
            <input type="button" class="btn btn-primary" onclick="window.location='{{ url("/report/") }}'" value="Reporte">
        </div>
</div>
<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
    <div class="output-detail">
        <textarea class="output-detail" id="output-detail" readonly></textarea>
    </div>
</div>

@endsection
@section("js")
<script type="text/javascript" src="libraries/DataTables/datatables.js"></script>
<script type="text/javascript" src="libraries/bootstrap3-dialog/src/js/bootstrap-dialog.js"></script>
<script src="{{ asset('js/statementofbalance.js') }}"></script>

    <script>
        $(document).ready(function(){
            var statementBalance = new StatementBalance();
            statementBalance.init("{{env("CSDOCS_WS_HOST")}}", "{{env("CSDOCS_WS_IDDIRECTORY")}}", "{{env("CSDOCS_WS_IDREPOSITORY")}}", "{{env("CSDOCS_WS_IDINSTANCE")}}");
        });
    </script>
@endsection