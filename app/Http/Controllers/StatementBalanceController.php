<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class StatementBalanceController extends Controller
{
    public function index(){
        return view("statementofbalances", ["CSDOCS_WS_HOST" => env("CSDOCS_WS_HOST")]);
    }

    public function saprequest(Request $request){
        try{
            $pdf = Input::file('pdf');
            $cfdi = Input::file('cfdi');

            $sapamount = $request->input("saprequestamount");
            $sapnumber = $request->input("saprequest");

            $xml = simplexml_load_file($cfdi->getRealPath());

            $diff = (float) $sapamount - (float)$xml["total"];

            if($diff > 0)
                return response()->json(["status" => false, "diff" => $diff]);

            $diff = -1*(float)$diff;

            return response()->json(["status" => true, "diff" => $diff, "base64" => base64_encode(file_get_contents($pdf->getRealPath()))]);
        }catch(\Exception $e){
            return response()->json(["status" => false, "message" => "Ocurrió un error durante la operación"]);
        }
    }

    public function report(){
        return view("report", []);
    }

}
