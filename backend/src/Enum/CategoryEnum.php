<?php
// src/Enum/CategoryEnum.php
namespace App\Enum;

enum CategoryEnum: string
{
    case FOOD      = 'food';
    case TRANSPORT = 'transport';
    case SHOPPING  = 'shopping';
    case BILLS     = 'bills';
    case HEALTH    = 'health';
    case INCOME    = 'income';
}