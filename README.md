# Signature Pad Field for Filamentphp Forms

[![Latest Version on Packagist](https://img.shields.io/packagist/v/skuzalabs/filament-signature-pad.svg?style=flat-square)](https://packagist.org/packages/skuzalabs/filament-signature-pad)
[![GitHub Tests Action Status](https://img.shields.io/github/workflow/status/skuzalabs/filament-signature-pad/run-tests?label=tests)](https://github.com/skuzalabs/filament-signature-pad/actions?query=workflow%3Arun-tests+branch%3Amain)
[![GitHub Code Style Action Status](https://img.shields.io/github/workflow/status/skuzalabs/filament-signature-pad/Check%20&%20fix%20styling?label=code%20style)](https://github.com/skuzalabs/filament-signature-pad/actions?query=workflow%3A"Check+%26+fix+styling"+branch%3Amain)
[![Total Downloads](https://img.shields.io/packagist/dt/skuzalabs/filament-signature-pad.svg?style=flat-square)](https://packagist.org/packages/skuzalabs/filament-signature-pad)


![img.png](img.png)

A Signature Pad Field for the FilamentPHP Form Builder using [szimek/signature_pad](https://github.com/szimek/signature_pad)

## Installation

You can install the package via composer:

```bash
composer require savannabits/filament-signature-pad
```

## Usage

You can now use the SignaturePad field in your form builder. 
```php
    use Skuzalabs\SignaturePad\Forms\Components\Fields\SignaturePad;
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // ... Other fields
                SignaturePad::make('signature'), // Chain your field modifiers here
                // Other fields
            ]);
    }
```
You can also set the Signature Pad Options as shown below. [See SignaturePad Options Docs](https://github.com/szimek/signature_pad#options) for more details.
```php
    use Skuzalabs\SignaturePad\Forms\Components\Fields\SignaturePad;
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // ... Other fields
                SignaturePad::make('signature')
                    ->strokeMinWidth(1.0)
                    ->strokeMaxWidth(2.5)
                    ->strokeDotSize(2.0)
                    ->penColor('rgb(0,0,255)') // Blue
                    ->backgroundColor('rgba(0,0,0,0)'), // Black Transparent
                // Other fields
            ]);
    }
```
![img_1.png](img_1.png)

Upon Saving, the signature image is saved to the database as a png data url. Plans are underway to also support uploading the signature to the server as an image blob file.

## Testing

```bash
composer test
```

## Credits

- [Sam Maosa](https://github.com/savannabits)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
