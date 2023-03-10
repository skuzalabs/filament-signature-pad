<?php

namespace Skuzalabs\SignaturePad\Forms\Components\Fields;

use Filament\Forms\Components\Field;
use Skuzalabs\SignaturePad\Forms\Concerns;

class SignaturePad extends Field
{
    use Concerns\HasSignaturePadAttributes;

    protected string $view = 'filament-signature-pad::forms.components.fields.signature-pad';
}
