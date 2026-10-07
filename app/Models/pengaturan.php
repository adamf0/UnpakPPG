<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class pengaturan extends Model
{
    protected $table = 'pengaturan';
    public $timestamps = false;
    protected $fillable = ['link_wa', 'link_wa2'];
}
