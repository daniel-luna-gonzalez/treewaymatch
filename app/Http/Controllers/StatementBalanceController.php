<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Mail;

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
            $sapnumber = $request->input("numero_sap");

            $xml = simplexml_load_file($cfdi->getRealPath());

            $diff = (float) $sapamount - (float)$xml["total"];

            if($diff > 0) {
                $this->email($sapnumber);
                return response()->json(["status" => false, "diff" => $diff]);
            }

            $diff = -1*(float)$diff;

            return response()->json(["status" => true, "diff" => $diff, "base64" => base64_encode(file_get_contents($pdf->getRealPath()))]);
        }catch(\Exception $e){
            return response()->json(["status" => false, "message" => "Ocurrió un error durante la operación"]);
        }
    }

    public function report(){
        return view("report", []);
    }

    public function email($numSap = null){
        try{
            Mail::send('email', ['sapnumber' => $numSap], function ($m) {
                $m->from(env("MAIL_FROM",'info@cs-docs.com'), env('MAIL_TITLE', 'CSDocs Tree way match'));

                $m->to(env("MAIL_TO"), env("MAIL_NAME"))->subject(env("MAIL_SUBJECT", "Error SAP"));
            });
        }catch (\Exception $e){
            echo "<pre>"; var_dump($e->getMessage()); die();

            logger("Error sending mail: ".$e->getMessage());
            return null;
        }
    }

}
