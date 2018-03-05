@extends('layouts.main')
@section("css")
    <link href="{{ asset('css/statementofbalance.css') }}" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/libraries/DataTables/datatables.css"/>
    <link rel="stylesheet" type="text/css" href="/libraries/DataTables/DataTables-1.10.16/css/jquery.dataTables.css"/>
    <link rel="stylesheet" type="text/css" href="/libraries/DataTables/DataTables-1.10.16/css/dataTables.bootstrap.css"/>
    <link rel="stylesheet" type="text/css" href="libraries/bootstrap3-dialog/src/css/bootstrap-dialog.css"/>
@endsection
@section('content')
    <table id="report" class="display">
        <thead>
            <tr>
                <th>Pedido</th>
                <th>Estatus</th>
                <th>Monto</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>001</td>
                <td>Aceptado y Registrado</td>
                <td>$20.00</td>
            </tr>
            <tr>
                <td>002</td>
                <td>Programado: 12/10/2018</td>
                <td>$12.50</td>
            </tr>
            <tr>
                <td>003</td>
                <td>Pagado en Fecha: 12/11/2018</td>
                <td>$15.20</td>
            </tr>
        </tbody>
    </table>
@endsection
@section("js")
    <script type="text/javascript" src="libraries/DataTables/datatables.js"></script>
    <script type="text/javascript" src="libraries/bootstrap3-dialog/src/js/bootstrap-dialog.js"></script>
    <script src="{{ asset('js/report.js') }}"></script>

    <script>
        $(document).ready(function(){
            var report = new Report();
            report.init();
        });
    </script>
@endsection