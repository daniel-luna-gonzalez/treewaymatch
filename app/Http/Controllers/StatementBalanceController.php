<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StatementBalanceController extends Controller
{
    public function index(){
        return view("statementofbalances");
    }
}
