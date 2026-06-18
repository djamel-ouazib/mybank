<?php
// src/Enum/OperationTypeEnum.php
namespace App\Enum;

enum OperationTypeEnum: string
{
    case EXPENSE = 'expense';
    case INCOME  = 'income';
}