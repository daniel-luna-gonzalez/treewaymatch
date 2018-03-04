<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class StatementBalanceController extends Controller
{
    public function index(){
        return view("statementofbalances");
    }

    public function saprequest(Request $request){
        $pdf = Input::file('pdf');
        $cfdi = Input::file('cfdi');
        $xml = simplexml_load_file($cfdi->getRealPath());


        echo "<pre>"; var_dump($pdf); die();
    }
}
